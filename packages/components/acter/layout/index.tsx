import React, { FC } from 'react'

import { ActerMenu } from '@acter/components/acter/layout/menu'
import { Layout } from '@acter/components/layout'

export const ActerLayout: FC = ({ children }) => (
  <Layout secondarySidebar={() => <ActerMenu />}>{children}</Layout>
)