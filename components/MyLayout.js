import Header from './Header'
import '../semantic/dist/semantic.min.css'
import { Container } from 'semantic-ui-react'

const Layout = (props) => (
  <Container>
    <Header />
    {props.children}
  </Container>
)

export default Layout
