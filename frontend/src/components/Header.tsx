import { Nav, Logo, NavLinks } from './Header.styled'

export function Header() {
  return (
    <Nav>
      <Logo>
        us<span>lehne</span>
      </Logo>
      <NavLinks>
        <a href="#">Home</a>
        <a href="#">About</a>
      </NavLinks>
    </Nav>
  )
}
