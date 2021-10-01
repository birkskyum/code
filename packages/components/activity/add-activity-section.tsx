import React, { FC, useState } from 'react'

import dynamic from 'next/dynamic'

import { Box, Button, createStyles, withStyles, Theme } from '@material-ui/core'
import { AddSharp as AddIcon } from '@material-ui/icons'

import { Drawer } from '@acter/components/util/drawer'
import { LoadingSpinner } from '@acter/components/util/loading-spinner'
import { getLandingPageTab } from '@acter/lib/acter/get-landing-page-tab'
import { useActer } from '@acter/lib/acter/use-acter'
import { useCreateActivity } from '@acter/lib/activity/use-create-activity'
import { ActerMenu } from '@acter/lib/constants'
import { useUser } from '@acter/lib/user/use-user'
import { userHasRoleOnActer } from '@acter/lib/user/user-has-role-on-acter'
import { ActerConnectionRole } from '@acter/schema'

const AddActivity = dynamic(() =>
  import('@acter/components/activity/form').then((mod) => mod.ActivityForm)
)

export const AddActivitySection: FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [drawerHeading, setDrawerHeading] = useState('')

  const handleOnClick = () => setOpenDrawer(true)
  const handleClose = () => setOpenDrawer(false)

  const { acter, loading: acterLoading } = useActer()
  const { user, loading: userLoading } = useUser()
  const [createActivity] = useCreateActivity({ onCompleted: handleClose })

  if (acterLoading || userLoading) return <LoadingSpinner />
  if (!acter) return null

  const tab = getLandingPageTab()

  if (tab !== ActerMenu.ACTIVITIES) return null

  const canCreateActivity = userHasRoleOnActer(
    user,
    ActerConnectionRole.MEMBER,
    acter
  )

  if (!canCreateActivity) return null

  return (
    <>
      <StyledContainer>
        <StyledButton onClick={handleOnClick}>
          <AddIcon fontSize="inherit" style={{ fontSize: 17 }} /> New Activity
        </StyledButton>
      </StyledContainer>

      <Drawer
        heading={drawerHeading}
        open={openDrawer}
        handleClose={handleClose}
      >
        <AddActivity
          organiserActerId={acter.id}
          setDrawerHeading={setDrawerHeading}
          onSubmit={createActivity}
        />
      </Drawer>
    </>
  )
}

const StyledContainer = withStyles(
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  })
)(Box)

const StyledButton = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      marginRight: theme.spacing(3),
      minWidth: '100px',
      height: theme.spacing(3.5),
      backgroundColor: theme.palette.secondary.main,
      color: theme.colors.white,
      fontWeight: theme.typography.fontWeightRegular,
      textTransform: 'capitalize',
      '&:hover': {
        backgroundColor: theme.colors.grey.dark,
      },
    },
  })
)(Button)