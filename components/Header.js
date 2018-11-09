import Link from 'next/link'
import { Menu } from 'semantic-ui-react'

const Header = () => (
  <Menu>
    <Link href="/">
      <a className="item">Home</a>
    </Link>
    <Link href="/about">
      <a className="item">About</a>
    </Link>
  </Menu>
)

export default Header
