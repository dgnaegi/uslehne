import { Link } from 'react-router-dom'
import { Footer } from './AppFooter.styled'

export function AppFooter() {
  return (
    <Footer>
      © {new Date().getFullYear()} uslehne.ch &nbsp;·&nbsp; <Link to="/ueber-uns">Über uns</Link>
      &nbsp;·&nbsp;
      <Link to="/datenschutz">Datenschutz</Link>
      &nbsp;·&nbsp;
      <Link to="/impressum">Impressum</Link>
    </Footer>
  )
}
