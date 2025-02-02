import React, { FC, useState } from 'react'

import {
  Box,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core'

import clsx from 'clsx'

import { ActersList } from '@acter/components/user/profile/info/part-of/acters-list'
import { useTranslation } from '@acter/lib/i18n/use-translation'
import { useUser } from '@acter/lib/user/use-user'
import { ActerConnectionRole } from '@acter/schema'

const { MEMBER, ADMIN } = ActerConnectionRole

interface PartOfProps {
  acterId?: string
}

export const PartOf: FC<PartOfProps> = ({ acterId }) => {
  const classes = useStyles()
  const { user } = useUser(acterId && { acterId })
  const { t } = useTranslation()
  const tabs = [ADMIN, MEMBER]
  const [currentTab, setCurrentTab] = useState<number>(tabs.indexOf(ADMIN))

  if (!user) return null

  const handleChange = (_, tab: number) => setCurrentTab(tab)

  return (
    <Box className={clsx(classes.section, acterId && classes.sidebarSection)}>
      <Typography className={classes.heading}>Part of</Typography>
      <Tabs value={currentTab} onChange={handleChange}>
        {tabs.map((tab, i) => (
          <Tab
            className={classes.tab}
            label={t(tab)}
            id={tab}
            key={`tab-${i}`}
          />
        ))}
      </Tabs>
      {tabs[currentTab] === ADMIN && <ActersList user={user} role={ADMIN} />}
      {tabs[currentTab] === MEMBER && <ActersList user={user} role={MEMBER} />}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      backgroundColor: theme.colors.white,
      minHeight: 300,
      borderRadius: 5,
      padding: '10px 22px',
    },
    sidebarSection: {
      width: 526,
      marginLeft: 40,
      backgroundColor: theme.colors.toolbar.main,
    },
    heading: {
      marginTop: 10,
      color: theme.colors.blue.mediumGrey,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: '0.9rem',
    },
    tab: {
      textTransform: 'capitalize',
      fontSize: '1rem',
    },
  })
)
