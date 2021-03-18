import React, { FC } from 'react'
import { Box, createStyles, withStyles, Theme } from '@material-ui/core'
import { Modal } from 'src/components/util/modal'
import { Button, ButtonsContainer } from 'src/components/styled'

import { Acter } from '@schema'

export interface ActerDeleteConfirmDialogProps {
  /**
   * The acter to delete
   */
  acter: Acter
  /**
   * Callback for Cancel button click
   */
  onCancel: (any?) => any
  /**
   * Callback for Delete button click
   */
  onSubmit: (any?) => any
}

export const ActerDeleteConfirmDialog: FC<ActerDeleteConfirmDialogProps> = ({
  acter,
  onCancel,
  onSubmit,
}) => (
  <Modal handleModalClose={onCancel}>
    <ContentContainer>
      Are you sure you want to delete "{acter.name}"?
      <ButtonsContainer>
        <Button variant="outlined" color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <DeleteButton variant="contained" color="secondary" onClick={onSubmit}>
          Delete
        </DeleteButton>
      </ButtonsContainer>
    </ContentContainer>
  </Modal>
)

const ContentContainer = withStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
    },
  })
)(Box)

const DeleteButton = withStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      '&.hover': {
        backgroundColor: theme.palette.error.light,
      },
    },
  })
)(Button)