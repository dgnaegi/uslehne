import styled from 'styled-components'

export const Section = styled.section`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `0 ${theme.spacing.xl} ${theme.spacing.xl}`};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`

export const Button = styled.button<{ $loading?: boolean }>`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: opacity 0.2s, transform 0.1s;

  &:hover:not(:disabled) {
    opacity: 0.85;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`

export const Status = styled.span<{ $ok?: boolean | null }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme, $ok }) =>
    $ok === null ? theme.colors.textMuted : $ok ? '#16a34a' : '#dc2626'};
`
