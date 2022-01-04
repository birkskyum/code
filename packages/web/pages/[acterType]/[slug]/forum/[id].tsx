import { NextPageWithLayout } from 'pages/_app'

import { ActerPost } from '@acter/components/acter/posts/post'
import { Head } from '@acter/components/atoms/head'
import { ActerLayout } from '@acter/components/layout/acter'
import { useActerTitle } from '@acter/lib/acter/use-title'

export const PostPage: NextPageWithLayout = () => {
  const { title } = useActerTitle('post')
  return (
    <>
      <Head title={title} />
      <ActerPost />
    </>
  )
}

PostPage.getLayout = (page) => <ActerLayout>{page}</ActerLayout>

export default PostPage
