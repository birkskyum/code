import { getUpdateFunction } from 'src/lib/acter/get-update-function'
import { prepareActivityValues } from 'src/lib/acter/prepare-activity-values'
import { ExampleActivity, ExampleActer } from 'src/__fixtures__'

jest.mock('src/lib/acter/prepare-activity-values')

describe('getUpdateFunction', () => {
  let updateActivity
  let updateActer
  let mockedPrepareActivityValues

  beforeEach(() => {
    updateActivity = jest.fn()
    updateActer = jest.fn()
    mockedPrepareActivityValues = prepareActivityValues as jest.Mock
  })

  it('should update as an Activity when Acter is an Activity', async () => {
    mockedPrepareActivityValues.mockReturnValue({
      variables: {
        ExampleActivity,
      },
    })
    updateActivity.mockReturnValue({
      data: {
        updateActivity: {},
      },
    })

    await getUpdateFunction({
      acter: ExampleActivity.Acter,
      updateActivity,
      updateActer,
    })({})
    expect(updateActivity).toBeCalledTimes(1)
    expect(updateActer).toBeCalledTimes(0)
  })

  it('should update as an Acter when Acter is any other type', async () => {
    updateActer.mockReturnValue({
      data: {
        updateActer: {},
      },
    })
    await getUpdateFunction({
      acter: ExampleActer,
      updateActivity,
      updateActer,
    })({})
    expect(updateActivity).toBeCalledTimes(0)
    expect(updateActer).toBeCalledTimes(1)
  })
})