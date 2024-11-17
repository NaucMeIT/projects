import { formatApiErrorResponse } from './utils'
import {
  AUTH_COOKIES_NAME,
  getUserProfile,
  invalidateSession,
  storeUserSession,
  updateUser,
  validateSessionToken,
} from 'coursition-auth'
import { secretsEnv } from '@nmit-coursition/env'
import { WorkOS } from '@workos-inc/node'
import { Redacted } from 'effect'
import { Elysia } from 'elysia'

const workos = new WorkOS(Redacted.value(secretsEnv.WORKOS_API_KEY), {
  clientId: Redacted.value(secretsEnv.WORKOS_CLIENT_ID),
})

export const apiAuth = new Elysia({ prefix: '/auth', tags: ['auth'] })
  .get('/ping', () => ({ status: 'PONG' }))
  .get('/login', ({ request, redirect }) => {
    const protocol = request.headers.get('x-forwarded-proto') || 'http'
    const host = request.headers.get('host')
    const baseUrl = host ? `${protocol}://${host}` : 'http://localhost:3000'

    const authorizationUrl = workos.userManagement.getAuthorizationUrl({
      provider: 'authkit',
      redirectUri: `${baseUrl}/auth/callback`,
      clientId: Redacted.value(secretsEnv.WORKOS_CLIENT_ID),
    })

    return redirect(authorizationUrl)
  })
  .get('/callback', async ({ request, query, error, redirect, cookie }) => {
    const organisationId = 1 // TODO
    const code = String(query['code'] || '')

    if (!code) throw error(400, formatApiErrorResponse(request, 'No code provided.'))

    try {
      const authenticateResponse = await workos.userManagement.authenticateWithCode({
        clientId: Redacted.value(secretsEnv.WORKOS_CLIENT_ID),
        code,
        session: {
          sealSession: true,
          cookiePassword: Redacted.value(secretsEnv.WORKOS_COOKIE_PASSWORD),
        },
      })

      const { user, sealedSession } = authenticateResponse
      const internalUser = await updateUser(user, organisationId)

      cookie[AUTH_COOKIES_NAME]?.set({
        value: sealedSession || '',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      })

      await storeUserSession(internalUser.id, sealedSession || '')

      return redirect('/')
    } catch (error) {
      // eslint-disable-next-line no-console debug info
      console.log('dump error', error)
      throw error
    }
  })
  .get('/logout', async ({ redirect, cookie }) => {
    const sessionData = cookie[AUTH_COOKIES_NAME]?.toString()
    if (!sessionData) return redirect('/login')

    try {
      const session = workos.userManagement.loadSealedSession({
        sessionData,
        cookiePassword: Redacted.value(secretsEnv.WORKOS_COOKIE_PASSWORD),
      })

      const url = await session.getLogoutUrl()
      cookie[AUTH_COOKIES_NAME]?.remove()
      await invalidateSession(sessionData)

      return redirect(url)
    } catch (error) {
      // eslint-disable-next-line no-console debug info
      console.error(error)
      return redirect('/login')
    }
  })
  .get('/profile', async ({ headers, cookie }) => {
    const session = cookie[AUTH_COOKIES_NAME]?.toString() || ''
    const apiKeyRaw = headers['authorization'] || ''
    const apiKey = apiKeyRaw || (await validateSessionToken(session))

    return getUserProfile(apiKey)
  })
