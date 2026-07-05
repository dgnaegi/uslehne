import styled from 'styled-components'

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.colors.surface};
  height: ${({ theme }) => theme.spacing.xl};
  flex: 1;
  max-width: 400px;
  flex-shrink: 0;
`

export const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border: none;
  outline: none;
  font-size: 0.82rem;
  font-weight: 600;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.font};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 400;
  }

  /* Remove native search cancel button */
  &::-webkit-search-cancel-button {
    display: none;
  }
`

export const ClearButton = styled.button`
  background: none;
  border: none;
  border-left: ${({ theme }) => theme.border};
  cursor: pointer;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textMuted};
  transition:
    color 0.1s,
    background 0.1s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.muted};
  }
`
