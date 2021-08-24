import { MiddlewareFn } from 'type-graphql'
import { NotificationQueueType } from '@acter/lib/constants'
import { postNotificationCreateQueue } from '@acter/jobs'

export const queueNotificationsMiddleware = (
  type: NotificationQueueType
): MiddlewareFn => async (_, next) => {
  const result = await next()

  if (!result?.id) {
    console.error('No ID to create notification', result)
    return
  }

  console.log('Adding to notification queue', type, result)

  postNotificationCreateQueue.add(type, { [type]: result })
}
