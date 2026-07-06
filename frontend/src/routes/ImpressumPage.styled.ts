import styled from 'styled-components'
import { Button } from '../components/Layout.styled'

export const P = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  max-width: 680px;
`

export const BackButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`
