import styled, { keyframes } from 'styled-components'

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`

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
  animation: ${fadeInDown} 0.4s ease both;

  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`
