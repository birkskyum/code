import React from 'react'
import { Meta, Story } from '@storybook/react'
import {
  ActerSettings,
  ActerSettingsProps,
} from 'src/components/acter/settings'

import { ExampleActer } from 'src/__fixtures__'

export default {
  title: 'acter/Settings',
  component: ActerSettings,
  argTypes: {
    onSettingsChange: { action: 'submitted' },
  },
} as Meta

const Template: Story<ActerSettingsProps> = (props) => (
  <ActerSettings {...props} />
)

export const Main = Template.bind({})
Main.args = {
  acter: ExampleActer,
}