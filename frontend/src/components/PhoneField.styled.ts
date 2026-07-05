import styled from 'styled-components'

export const SelectRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: stretch;

  & > select {
    flex: 1;
    min-width: 0;
  }
`

export const AddIconButton = styled.button`
  flex-shrink: 0;
  width: 36px;
  border: ${({ theme }) => theme.border};
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  transition: background 0.12s;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`

export const InlineForm = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-left: ${({ theme }) => theme.spacing.sm};
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`
