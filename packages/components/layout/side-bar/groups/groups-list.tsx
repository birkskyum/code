import React, { FC } from 'react'
import {
  Box,
  createStyles,
  makeStyles,
  ListItem,
  Theme,
  Typography,
} from '@material-ui/core'
import { Acter } from '@acter/schema/types'
import { Link } from '@acter/components/util/anchor-link'
import { acterAsUrl } from '@acter/lib/acter/acter-as-url'

export interface GroupsList {
  acters: Acter[]
}

export const GroupsList: FC<GroupsList> = ({ acters }) => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      {acters.map((acter) => (
        <ListItem className={classes.item} key={acter.id}>
          <Link href={acterAsUrl(acter)}>
            <Typography className={classes.name} variant="body2">
              # {acter.name}
            </Typography>
          </Link>
        </ListItem>
      ))}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    item: {
      '& a': {
        color: theme.palette.secondary.contrastText,
        textDecoration: 'none',
        textTransform: 'capitalize',
        '&:hover': {
          color: '#fff',
        },
      },
    },
    name: {
      fontWeight: theme.typography.fontWeightLight,
      fontSize: '0.8rem',
    },
  })
)