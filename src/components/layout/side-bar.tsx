import React, { FC } from 'react'
import { useRouter } from 'next/router'
import {
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  AddCircleOutline as AddIcon,
  Home as HomeIcon,
} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    list: {
      margin: 0,
      padding: 0,
    },
    listItem: {
      margin: 0,
      padding: 0,
    },
  })
)

interface SideBarProps {
  /**
   * Width of the sidebar
   */
  width: number
}

export const SideBar: FC<SideBarProps> = ({ width }) => {
  const classes = useStyles({ width })
  const router = useRouter()
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      classes={{ paper: classes.drawer }}
    >
      <Toolbar />
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <IconButton color="inherit" onClick={() => router.push('/dashboard')}>
            <HomeIcon fontSize="large" />
          </IconButton>
        </ListItem>
        <ListItem className={classes.listItem}>
          <IconButton
            color="inherit"
            onClick={() => router.push('/organizations/new')}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </ListItem>
        <Divider />
      </List>
    </Drawer>
  )
}
