import React from 'react'
import { render, screen } from '@testing-library/react'
import { ComposedGetServerSidePropsContext } from 'src/lib/compose-props'
import { NextRouter } from 'next/router'

jest.mock('@apollo/client', () => ({
  useMutation: () => [() => void 0, { loading: false, error: false }],
}))
jest.mock('next-auth/client')
jest.mock('src/lib/apollo')

import {
  NewActerPage,
  getServerSideProps,
  _handleOnComplete,
  _handleSubmit,
} from 'src/pages/[acterType]/new'

import { Acter, ActerType } from '@generated/type-graphql'
import {
  ExampleActer,
  GroupActerType,
  NetworkActerType,
  OrganizationActerType,
  UserActerType,
} from 'src/__fixtures__'

describe('NewActerPage', () => {
  describe('_handleSubmit', () => {
    it('should create a function that sends Acter data as variables', async () => {
      const createActerFn = jest.fn()
      const onSubmitFn = _handleSubmit(createActerFn, UserActerType)
      onSubmitFn({ name: ExampleActer.name } as Acter)

      const { name, slug } = ExampleActer
      expect(createActerFn).toHaveBeenCalledWith({
        variables: {
          acterTypeId: UserActerType.id,
          name,
        },
      })
    })
  })

  describe('_handleOnComplete', () => {
    it('should redirect to the Acter page', () => {
      const push = jest.fn()
      const onCompleteFn = _handleOnComplete(
        ({ push } as unknown) as NextRouter,
        OrganizationActerType
      )
      onCompleteFn({
        createActer: { ...ExampleActer, ActerType: OrganizationActerType },
      })
      expect(push).toHaveBeenCalledWith('/organizations/my-organization')
    })
  })

  it('should reneder the new acter page', () => {
    render(<NewActerPage acterType={{ name: 'organization' } as ActerType} />)
  })
})