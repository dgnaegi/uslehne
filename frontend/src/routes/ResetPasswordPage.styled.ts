import styled from 'styled-components'
import { Link } from 'react-router-dom'

export { FormWrapper, SuccessBox } from './ForgotPasswordPage.styled'

export const SuccessLink = styled(Link)`
  color: ${({ theme }) => theme.colors.success};
  font-weight: 700;
`
