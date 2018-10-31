import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import loadDB from '../lib/firebase-db'
import { Header, List } from 'semantic-ui-react'

const PostLink = (props) => (
  <List.Item>
    <Link as={`/p/${props.id}`} href={`/post?id=${props.id}`}>
      <a>{props.title}</a>
    </Link>
  </List.Item>
)

const Index = ({ stories }) => (
  <Layout>
    <Header as='h1'>Hacker News - Latest</Header>
    <List bulleted>
      {stories.map(story => (
        <PostLink
          key={story.id}
          id={story.id}
          title={story.title}
        />
      ))}
    </List>
  </Layout>
)

Index.getInitialProps = async () => {
  const db = await loadDB()

  const ids = await db.child('topstories').once('value')
  let stories = await Promise.all(
    ids.val().slice(0, 10).map(id => db
      .child('item')
      .child(id)
      .once('value')
    )
  )

  stories = stories.map(s => s.val())

  return { stories }
}

export default Index
