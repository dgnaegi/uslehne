import styled from 'styled-components'

export const HeroSection = styled.section`
  background: ${({ theme }) => theme.colors.accent};
  border-bottom: ${({ theme }) => theme.border};
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.xxl}`};
  text-align: center;

  @media (max-width: 600px) {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`};
  }
`

export const Tagline = styled.p`
  font-family: ${({ theme }) => theme.fontComic};
  font-size: 2.5rem;
  letter-spacing: 0.05em;

  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`
