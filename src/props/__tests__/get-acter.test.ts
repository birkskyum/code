import { ComposedGetServerSidePropsContext } from 'src/lib/compose-props'

import { OrganizationActerType, ExampleActer } from 'src/__fixtures__'

import { getActer } from 'src/props'

jest.mock('src/lib/apollo')

let emptyContext = ({} as unknown) as ComposedGetServerSidePropsContext
let goodContext = ({
  props: {
    acterType: OrganizationActerType,
  },
  params: {
    slug: ExampleActer.slug,
  },
} as unknown) as ComposedGetServerSidePropsContext

describe('getActer', () => {
  it('should return not found when there is missing data', async () => {
    ;[
      emptyContext,
      { ...emptyContext, props: {} },
      { ...emptyContext, props: { acterType: {} } },
      { ...emptyContext, props: { acterType: { id: null } } },
      { ...emptyContext, params: {} },
      { ...emptyContext, params: { slug: '' } },
    ].forEach(async (ctx) => {
      expect(await getActer(ctx)).toStrictEqual(
        expect.objectContaining({ notFound: true })
      )
    })
  })

  it('should return an error if the acter query fails', async () => {
    const error = 'there was an error'
    require('src/lib/apollo').__setApolloQueryResponse({ error })

    expect(await getActer(goodContext)).toStrictEqual(
      expect.objectContaining({ props: { error } })
    )
  })

  it('should return an Acter', async () => {
    require('src/lib/apollo').__setApolloQueryResponse({
      data: { getActer: ExampleActer },
    })
    expect(await getActer(goodContext)).toStrictEqual(
      expect.objectContaining({ props: { acter: ExampleActer } })
    )
  })
})