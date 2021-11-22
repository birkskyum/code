import React, { FC } from 'react'

import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'

import { SectionContainer } from '@acter/components/group/sections/container'
import { ZeroMessage } from '@acter/components/group/sections/zero-message'
import { useActer } from '@acter/lib/acter/use-acter'

export const DescriptionSection: FC = () => {
  const classes = useStyles()

  const { acter } = useActer()
  if (!acter) return null

  return (
    <SectionContainer title="About" buttonText="Edit Description" hideAddIcon>
      {acter?.description.length === 0 ? (
        <ZeroMessage
          primaryText="There is currently no description written for this group."
          secondaryText="Do you want to add a description?"
          buttonText="Add Description"
        />
      ) : (
        <div className={classes.description}>
          <Typography className={classes.text}>{acter.description}</Typography>
        </div>
      )}
    </SectionContainer>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      height: theme.spacing(6.5),
      wordBreak: 'break-all',
      overflow: 'hidden',
      display: '-webkit-box',
      boxOrient: 'vertical',
      lineClamp: 3,
    },
    text: {
      fontWeight: theme.typography.fontWeightLight,
      fontSize: 12,
      color: theme.palette.secondary.main,
    },
  })
)