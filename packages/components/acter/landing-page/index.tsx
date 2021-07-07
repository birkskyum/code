import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Grid, Box, makeStyles, createStyles, Theme } from '@material-ui/core'
import {
  HeaderSection,
  HeaderSectionProps,
} from '@acter/components/acter/landing-page/header-section'
import {
  InfoSection,
  InfoSectionProps,
} from '@acter/components/acter/landing-page/info-section'
import { ActivitiesList } from '@acter/components/activity/list'
import {
  MembersSection,
  MembersSectionProps,
} from '@acter/components/acter/landing-page/members-section'
import { PostList, PostListProps } from '@acter/components/posts'
import { ActerMenu } from '@acter/lib/constants'
import { getLandingPageTab } from '@acter/lib/acter/get-landing-page-tab'

const { ACTIVITIES, MEMBERS, FORUM } = ActerMenu

export type ActerLandingProps = HeaderSectionProps &
  InfoSectionProps &
  MembersSectionProps &
  PostListProps

export const ActerLanding: FC<ActerLandingProps> = ({
  acter,
  interestTypes,
  posts,
  user,
  onJoin,
  onLeave,
  onConnectionStateChange,
  loading,
  onPostSubmit,
  onPostDelete,
  onPostUpdate,
}) => {
  const classes = useStyles({})
  const router = useRouter()
  const tab = getLandingPageTab(router, FORUM)

  return (
    <Grid className={classes.header} container>
      <HeaderSection
        acter={acter}
        user={user}
        onJoin={onJoin}
        onLeave={onLeave}
        loading={loading}
      />
      <Grid container spacing={2} className={classes.content}>
        <Grid className={classes.main} item xs={12} sm={12} md={8} xl={10}>
          <Box role="tabpanel" hidden={tab !== ACTIVITIES}>
            <ActivitiesList acter={acter} user={user} />
          </Box>
          <Box role="tabpanel" hidden={tab !== MEMBERS}>
            <MembersSection
              acter={acter}
              user={user}
              onConnectionStateChange={onConnectionStateChange}
            />
          </Box>
          <Box
            role="tabpanel"
            hidden={tab !== FORUM}
            className={classes.postList}
          >
            <PostList
              user={user}
              acter={acter}
              posts={posts}
              onPostSubmit={onPostSubmit}
              onPostDelete={onPostDelete}
              onPostUpdate={onPostUpdate}
            />
          </Box>
        </Grid>
        <Grid className={classes.info} item xs={12} sm={12} md={4} xl={2}>
          <InfoSection acter={acter} interestTypes={interestTypes} />
        </Grid>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(2),
    },
    content: {
      marginRight: theme.spacing(0.5),
    },
    menu: {
      order: 1,
    },
    main: {
      order: 2,
    },
    info: {
      order: 3,
    },
    postList: {
      marginLeft: 10,
    },
  })
)