import { ComposedGetServerSidePropsContext } from 'src/lib/compose-props'

import {
  GroupActerType,
  NetworkActerType,
  OrganizationActerType,
} from 'src/__fixtures__'

import { setActerType } from 'src/props/set-acter-type'

describe('setActerType', () => {
  let acterTypes = [GroupActerType, NetworkActerType, OrganizationActerType]
  let context = ({} as unknown) as ComposedGetServerSidePropsContext

  it('should return not found if acter type is not found', async () => {
    context = ({
      props: { acterTypes },
      params: { acterType: 'foos' },
    } as unknown) as ComposedGetServerSidePropsContext

    expect(await setActerType(context)).toStrictEqual(
      expect.objectContaining({
        notFound: true,
      })
    )
  })
  it('should set selected acter type as well as list of all acter types', async () => {
    context = ({
      props: { acterTypes },
      params: { acterType: 'organizations' },
    } as unknown) as ComposedGetServerSidePropsContext

    expect(await setActerType(context)).toStrictEqual({
      props: {
        acterType: OrganizationActerType,
      },
    })
  })
})