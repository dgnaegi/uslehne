import styled, { css } from 'styled-components'

const contactValue = css`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 1rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.02em;
`

export const ContactAnchor = styled.a`
  ${contactValue}
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

export const ContactPlain = styled.span`
  ${contactValue}
`
