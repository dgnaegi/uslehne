import styled from 'styled-components'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
  text-align: center;
`

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.7;
  max-width: 500px;
  margin: 0 auto;
`

export function Hero() {
  return (
    <Section>
      <Title>
        will<span>kommen</span>
      </Title>
      <Subtitle>uslehne.ch — einfach, schön, funktional.</Subtitle>
    </Section>
  )
}
