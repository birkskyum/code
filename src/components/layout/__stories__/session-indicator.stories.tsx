import { Story, Meta, forceReRender } from '@storybook/react'

import { SessionIndicator } from 'src/components/layout/session-indicator'

import { ExampleUser } from 'src/__fixtures__/user/example-user'
import { decorator as NextAuthMockDecorator } from 'src/__mocks__/next-auth'

export default {
  title: 'layout/UserSession',
  component: SessionIndicator,
  decorators: [NextAuthMockDecorator],
  parameters: {
    nextAuth: {
      user: null,
    },
  },
} as Meta

export const LoggedOut: Story = () => <SessionIndicator />

export const LoggedIn: Story = () => <SessionIndicator />
LoggedIn.parameters = {
  nextAuth: {
    user: ExampleUser,
  },
}