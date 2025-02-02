import { NonEmptyArray, UseMiddleware } from 'type-graphql'

import { NotificationQueueType } from '@acter/lib/constants'
import {
  relationResolvers,
  FindFirstActerResolver,
  FindUniqueActerResolver,
  FindManyActerTypeResolver,
  FindManyActerConnectionResolver,
  FindManyActivityResolver,
  FindManyActivityTypeResolver,
  FindUniqueInviteResolver,
  FindManyInviteResolver,
  FindManyNotificationResolver,
  FindManyLinkResolver,
  FindFirstNotificationResolver,
  FindUniquePostResolver,
  FindManyPostResolver,
  FindManyInterestTypeResolver,
  FindUniqueUserResolver,
  UpdateActerResolver,
  CreatePostResolver,
  DeleteActerConnectionResolver,
  DeleteLinkResolver,
  DeletePostReactionResolver,
  DeletePostMentionResolver,
  DeletePostResolver,
  UpdateInviteResolver,
  CreateManyInviteResolver,
  CreateLinkResolver,
  UpdateLinkResolver,
  UpdateNotificationResolver,
  UpdateManyNotificationResolver,
  CreateManyPostResolver,
  CreatePostReactionResolver,
  CreatePostMentionResolver,
  UpdatePostResolver,
  UpdateUserResolver,
  ResolversEnhanceMap,
} from '@acter/schema/generated'

import { CheckActerExists } from '../middlewares/check-acter-exists'
import { CheckUserAccess } from '../middlewares/check-user-access'
import { QueueInviteEmail } from '../middlewares/queue-invite-email'
import { QueueNotificationsMiddleware } from '../middlewares/queue-notifications'
import { ActerResolver } from './acter'
import { ActerConnectionResolver } from './acter-connection'
import { ActivitiesResolver } from './activities'
import { HealthCheckResolver } from './health'
import { SearchResolver } from './search'

export { applyResolversEnhanceMap } from '@acter/schema/generated'

export const resolversEnhanceMap: ResolversEnhanceMap = {
  Acter: {
    findFirstActer: [UseMiddleware(CheckActerExists, CheckUserAccess)],
  },
  Invite: {
    createManyInvite: [UseMiddleware(QueueInviteEmail)],
    updateInvite: [UseMiddleware(QueueInviteEmail)],
  },
  Post: {
    createPost: [
      UseMiddleware(
        QueueNotificationsMiddleware(NotificationQueueType.NEW_POST)
      ),
    ],
  },
  // TODO Fix Mention notifications
  // PostMention: {
  //   createPostMention: [
  //     UseMiddleware(
  //       QueueNotificationsMiddleware(NotificationQueueType.NEW_MENTION)
  //     ),
  //   ],
  // },
}

//eslint-disable-next-line @typescript-eslint/ban-types
export const resolvers: NonEmptyArray<Function> = [
  ...relationResolvers,
  FindFirstActerResolver,
  FindUniqueActerResolver,
  FindManyActerTypeResolver,
  FindManyActerConnectionResolver,
  FindManyActivityResolver,
  FindManyActivityTypeResolver,
  FindUniqueInviteResolver,
  FindManyInviteResolver,
  FindManyNotificationResolver,
  FindManyLinkResolver,
  FindFirstNotificationResolver,
  FindUniquePostResolver,
  FindManyPostResolver,
  FindManyInterestTypeResolver,
  FindUniqueUserResolver,
  UpdateActerResolver,
  CreatePostResolver,
  DeleteActerConnectionResolver,
  DeleteLinkResolver,
  DeletePostReactionResolver,
  DeletePostMentionResolver,
  DeletePostResolver,
  UpdateInviteResolver,
  CreateManyInviteResolver,
  CreateLinkResolver,
  UpdateLinkResolver,
  UpdateNotificationResolver,
  UpdateManyNotificationResolver,
  CreateManyPostResolver,
  CreatePostReactionResolver,
  CreatePostMentionResolver,
  UpdatePostResolver,
  UpdateUserResolver,
  // custom
  ActerResolver,
  ActerConnectionResolver,
  HealthCheckResolver,
  SearchResolver,
  ActivitiesResolver,
]
