import { prisma, type cas__user } from 'coursition-db'
import { randomStringGenerator } from 'shared-utils'
import type { User, UserProfileRawRecord, UserProfileResponse } from './typescript'

export async function getUserProfile(apiKey: string): Promise<UserProfileResponse> {
  const profileRecords = await prisma.$queryRaw<UserProfileRawRecord[]>`
    SELECT
      u.id AS user_id,
      o.name AS organisation_name,
      o.slug AS organisation_slug,
      u.email,
      u.inserted_date,
      u.updated_date,
      u.synced_date,
      u.first_name || ' ' || u.last_name AS full_name,
      u.avatar_url,
      u.credit,
      u.credit_alert_lower_then,
      k.used_count_today AS key_used_count_today
    FROM cas__user u
    JOIN cas__organisation_api_key k ON k.user_id = u.id
    JOIN cas__organisation o ON o.id = u.organisation_id
    WHERE k.api_key = ${apiKey}`

  const profile = profileRecords[0] || undefined
  if (!profile) throw new Error(`User is not logged in.`)

  return {
    internalId: Number(profile.user_id),
    organisationName: profile.organisation_name,
    organisationSlug: profile.organisation_slug,
    email: profile.email,
    insertedDate: profile.inserted_date,
    updatedDate: profile.updated_date,
    syncedDate: profile.synced_date,
    fullName: profile.full_name,
    avatarUrl: profile.avatar_url,
    credit: profile.credit,
    creditAlertLowerThen: profile.credit_alert_lower_then,
    usedCountToday: profile.used_count_today,
  }
}

export async function validateSessionToken(sessionToken: string): Promise<string> {
  if (!sessionToken) return ''
  const userIdentityRecord = await prisma.cas__user_identity.findFirst({
    select: { user_id: true },
    where: { session: sessionToken, expired: false, expiration_date: { gte: new Date() } },
  })
  if (!userIdentityRecord) return ''

  const apiKeyRecord = await prisma.cas__organisation_api_key.findFirst({
    select: { api_key: true },
    where: { user_id: userIdentityRecord.user_id },
  })

  return apiKeyRecord?.api_key || (await createApiKey(userIdentityRecord.user_id))
}

export async function createApiKey(userId: bigint): Promise<string> {
  const user = await prisma.cas__user.findFirstOrThrow({ where: { id: userId } })
  const apiKey = await prisma.cas__organisation_api_key.create({
    data: {
      organisation_id: user.organisation_id,
      api_key: `PROD${randomStringGenerator(28)}`,
      used_count_today: 0,
      user_id: userId,
      is_active: true,
      is_deleted: false,
      inserted_date: new Date(),
      expiration_date: (() => {
        const date = new Date()
        date.setDate(date.getDate() + 7)
        return date
      })(),
      last_used_date: new Date(),
    },
  })

  return apiKey.api_key
}

export async function updateUser(userData: User, organisationId: number): Promise<cas__user> {
  const user =
    (await prisma.cas__user.findFirst({
      where: {
        AND: [{ OR: [{ workos_id: userData.id }, { email: userData.email }] }, { organisation_id: organisationId }],
      },
    })) ||
    (await prisma.cas__user.create({
      data: {
        organisation_id: organisationId,
        email: userData.email,
        inserted_date: new Date(userData.createdAt),
        updated_date: new Date(userData.updatedAt),
        synced_date: new Date(),
        workos_id: userData.id,
        credit: 0,
        lifetime_subscribe: false,
      },
    }))

  return prisma.cas__user.update({
    where: { id: user.id },
    data: {
      workos_id: userData.id,
      email: userData.email,
      inserted_date: new Date(userData.createdAt),
      updated_date: new Date(userData.updatedAt),
      synced_date: new Date(),
      first_name: userData.firstName || null,
      last_name: userData.lastName || null,
      avatar_url: userData.profilePictureUrl || null,
    },
  })
}

export async function storeUserSession(internalUserId: bigint, session: string) {
  if (!session) return
  await prisma.cas__user_identity.create({
    data: {
      user_id: internalUserId,
      session: session,
      expired: false,
      inserted_date: new Date(),
      expiration_date: (() => {
        const date = new Date()
        date.setHours(date.getHours() + 2)
        return date
      })(),
    },
  })
}

export async function invalidateSession(session: string) {
  await prisma.cas__user_identity.updateMany({
    where: { session },
    data: { expired: true },
  })
}

export async function addCreditRecord(userId: bigint, amount: number, description?: string) {
  const user = await prisma.cas__user.findFirstOrThrow({
    select: { id: true, credit: true },
    where: { id: userId },
  })

  const newAmount = user.credit + amount
  if (newAmount < 0) throw new Error('USER_CREDIT_CAN_NOT_BE_NEGATIVE')

  await prisma.cas__user_credit.create({
    data: {
      user_id: user.id,
      amount,
      description: (description || '').trim() || null,
      external_id: randomStringGenerator(16),
      inserted_date: new Date(),
    },
  })

  await recomputeUserCreditBalance(user.id)
}

export async function recomputeUserCreditBalance(userId: bigint): Promise<number> {
  const user = await prisma.cas__user.findFirstOrThrow({
    select: { id: true, credit: true, credit_alert_lower_then: true },
    where: { id: userId },
  })

  const creditSumRaw = await prisma.cas__user_credit.aggregate({
    _sum: { amount: true },
    where: { user_id: user.id },
  })
  const creditSum = Number(creditSumRaw._sum.amount || 0)

  await prisma.cas__user.update({
    data: { credit: creditSum, updated_date: new Date() },
    where: { id: user.id },
  })

  if (user.credit_alert_lower_then && user.credit < user.credit_alert_lower_then)
    reportLowCreditBalance(user.id, creditSum)

  return creditSum
}

export function reportLowCreditBalance(userId: bigint, currentBalance: number) {
  // TODO: Credits alerts (e.g. less than 10 % of your credits remains - could trigger some action like email)

  // eslint-disable-next-line no-console prepared for future use
  console.log(`Report credit usage`, userId, currentBalance)

  return true
}
