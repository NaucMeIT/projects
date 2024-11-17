import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { apiV1 } from './stable-v1'
import { apiAuth } from '@nmit-coursition/api/auth'
import { apiDev } from '@nmit-coursition/api/dev'
import { apiOrder } from '@nmit-coursition/order'
import * as Sentry from '@sentry/bun'
import { Elysia } from 'elysia'

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Coursition API',
          version: '1.0.0',
          description:
            'Mix of API endpoints used to power Coursition and related apps. Also available as API for 3rd parties. Please contact me at syreanis@gmail.com for more information.',
        },
        tags: [
          {
            name: 'v1',
            description:
              "Stable endpoints in version 1 of API. Endpoints defined here won't be deleted, but might be marked as deprecated for following versions.",
          },
          {
            name: 'auth',
            description: 'Authentication endpoints. Used to authenticate users.',
          },
          {
            name: 'dev',
            description:
              'Expiremental endpoints. Used for testing new features and stability. Might be deleted or changed at any time.',
          },
        ],
      },
    }),
  )
  .onError(({ error, code }) => {
    if (code === 'NOT_FOUND') return
    Sentry.captureException(error)
  })
  .use(cors())
  .use(apiAuth)
  .use(apiOrder)
  .use(apiV1)
  .use(apiDev)
  .listen(3000)

export type App = typeof app
