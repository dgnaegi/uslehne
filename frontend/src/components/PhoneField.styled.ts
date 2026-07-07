import styled from 'styled-components'

export const InlineForm = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-left: ${({ theme }) => theme.spacing.sm};
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  & > div {
    margin-bottom: 0;
  }
`

export const TypeButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

export const TypeButton = styled.button<{ $active: boolean }>`
  flex: 1;
  min-width: 72px;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xs}`};
  border: ${({ theme }) => theme.border};
  background: ${({ theme, $active }) => ($active ? theme.colors.accent : 'transparent')};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 800;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.1s;

  &:hover {
    background: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.muted)};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`
