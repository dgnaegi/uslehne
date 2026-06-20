import styled from 'styled-components'

export const Section = styled.section`
  background: ${({ theme }) => theme.colors.pastelBlue};
  border-bottom: ${({ theme }) => theme.border};
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.xl}`};
  display: flex;
  justify-content: center;
`

export const SearchBar = styled.input`
  width: 100%;
  max-width: 560px;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  font-size: 1rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.font};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 400;
  }

  &:focus {
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
`
