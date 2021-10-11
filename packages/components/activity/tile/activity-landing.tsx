import React, { useState, FC } from 'react'

import dynamic from 'next/dynamic'

import { ActerDeleteConfirmDialog } from '@acter/components/acter/delete-confirm-dialog'
import { ActivityDetails } from '@acter/components/activity'
import { Drawer } from '@acter/components/util/drawer'
import { LoadingSpinner } from '@acter/components/util/loading-spinner'
import { useActer } from '@acter/lib/acter/use-acter'
import { useDeleteActer } from '@acter/lib/acter/use-delete-acter'
import { useUpdateActivity } from '@acter/lib/activity/use-update-activity'
import { ActionButton } from '@acter/lib/constants'

const { DELETE, EDIT } = ActionButton

const EditActivity = dynamic(() =>
  import('@acter/components/activity/form').then((mod) => mod.ActivityForm)
)

interface ActivityLandingProps {
  acterId: string
  openDrawer: boolean
  handleCloseDrawer: () => void
}
export const ActivityLanding: FC<ActivityLandingProps> = ({
  acterId,
  openDrawer,
  handleCloseDrawer,
}) => {
  if (!acterId) return null

  const [drawerHeading, setDrawerHeading] = useState<string>('')
  const [action, setAction] = useState<ActionButton>(null)

  const handleClose = () => {
    setDrawerHeading('')
    handleCloseDrawer()
  }

  const { acter, loading: acterLoading } = useActer({ acterId })
  const [updateActivity] = useUpdateActivity({ onCompleted: handleClose })
  const [deleteActivity] = useDeleteActer({ onCompleted: handleClose })

  return (
    <Drawer
      acter={acter}
      heading={drawerHeading}
      open={openDrawer}
      handleClose={handleClose}
      actionButtons={[EDIT, DELETE]}
      setAction={setAction}
    >
      {acterLoading ? (
        <LoadingSpinner />
      ) : action === EDIT ? (
        <EditActivity
          acter={acter}
          onSubmit={updateActivity}
          setDrawerHeading={setDrawerHeading}
        />
      ) : action === DELETE ? (
        <ActerDeleteConfirmDialog
          acter={acter}
          onCancel={handleClose}
          onSubmit={() => deleteActivity(acter.id)}
        />
      ) : (
        <ActivityDetails acter={acter} />
      )}
    </Drawer>
  )
}
