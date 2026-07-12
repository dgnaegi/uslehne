import styled from 'styled-components'
import { Button } from '../components/Layout.styled'

export const BackButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

export const H2 = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`

export const P = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  max-width: 680px;
`

export const Ul = styled.ul`
  padding-left: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  max-width: 680px;

  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`
