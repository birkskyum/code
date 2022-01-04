import { NextPageWithLayout } from 'pages/_app'

import { ActerMembers } from '@acter/components/acter/members'
import { Head } from '@acter/components/atoms/head'
import { ActerLayout } from '@acter/components/layout/acter'
import { useActerTitle } from '@acter/lib/acter/use-title'

export const ActerMembersPage: NextPageWithLayout = () => {
  const { title } = useActerTitle('members')
  return (
    <>
      <Head title={title} />
      <ActerMembers />
    </>
  )
}

ActerMembersPage.getLayout = (page) => <ActerLayout>{page}</ActerLayout>

export default ActerMembersPage
