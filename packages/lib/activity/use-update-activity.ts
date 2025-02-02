import { UseMutationState } from 'urql'

import { prepareActivityValues } from '@acter/lib/acter/prepare-activity-values'
import { _updatePictures } from '@acter/lib/acter/update-acter-with-pictures'
import {
  ActivityVariables,
  CreateActivityData,
  HandleMethod,
} from '@acter/lib/activity/use-create-activity'
import { useTranslation } from '@acter/lib/i18n/use-translation'
import {
  UseMutationOptions,
  useNotificationMutation,
} from '@acter/lib/urql/use-notification-mutation'
import { Activity } from '@acter/schema'
import UPDATE_ACTIVITY from '@acter/schema/mutations/activity-update.graphql'

export type UpdateActivityData = {
  updateActivityCustom: Activity
}

type UpdateActivityOptions = UseMutationOptions<
  UpdateActivityData,
  ActivityVariables
>

/**
 * Custom hook that updates new activity
 * @param options
 * @returns handle method to update activity
 * @returns mutation results
 */
export const useUpdateActivity = (
  activity: Activity,
  options?: UpdateActivityOptions,
  isNewActivity?: boolean
): [
  UseMutationState<UpdateActivityData, ActivityVariables>,
  HandleMethod<CreateActivityData, ActivityVariables>
] => {
  const { t } = useTranslation('success-messages')

  const messageOptions = isNewActivity
    ? {}
    : { getSuccessMessage: () => t('activityUpdated') }

  const [mutationResult, updateActivity] = useNotificationMutation<
    UpdateActivityData,
    ActivityVariables
  >(UPDATE_ACTIVITY, { ...options, ...messageOptions })

  const handleUpdateActivity = async (
    updatedActivity: ActivityVariables
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    const acterId = activity?.Acter?.id
      ? activity?.Acter?.id
      : updatedActivity?.acterId

    if (!acterId) return

    const variables = {
      ...activity,
      ...updatedActivity,
      acterId,
    }

    const data = prepareActivityValues(variables)
    const dataWithPic = (await _updatePictures(data)) as ActivityVariables

    return updateActivity({
      ...dataWithPic,
    })
  }

  return [mutationResult, handleUpdateActivity]
}
