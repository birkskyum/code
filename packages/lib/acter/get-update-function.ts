import { prepareActivityValues } from '@acter/lib/acter/prepare-activity-values'
import { updateActerWithPictures } from '@acter/lib/acter/update-acter-with-pictures'
import { ActivityVariables } from '@acter/lib/activity/use-create-activity'
import { ActerTypes } from '@acter/lib/constants'
import { Acter, Activity } from '@acter/schema'

const { ACTIVITY } = ActerTypes

//eslint-disable-next-line @typescript-eslint/no-explicit-any
type MutationFunction = (data: any) => Promise<any>

interface GetUpdateFunctionProps {
  acter: Acter
  updateActivity: MutationFunction
  updateActer: MutationFunction
}

export const getUpdateFunction = ({
  acter,
  updateActivity,
  updateActer,
}: GetUpdateFunctionProps) => async (
  variables: Partial<Acter> | Partial<Activity>
): Promise<Acter> => {
  switch (acter.ActerType.name) {
    case ACTIVITY: {
      // Prepare the variables as an Activity
      const formData = prepareActivityValues(variables as ActivityVariables)
      // Update it as an Acter with Pictures
      const res = await updateActerWithPictures({
        acter,
        formData,
        updateActer: updateActivity,
      })
      return res.data.updateActivityCustom.Acter
    }
    default: {
      const res = await updateActer(variables)
      return res.data.updateActerCustom
    }
  }
}
