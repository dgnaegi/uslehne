import styled from 'styled-components'

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.border};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  outline: none;
  transition: border-color 0.12s ease-out;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

export const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.border};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  resize: vertical;
  min-height: 100px;
  outline: none;
  transition: border-color 0.12s ease-out;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  padding-right: 36px;
  border: ${({ theme }) => theme.border};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231a1a1a' stroke-width='2' fill='none' stroke-linecap='square'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  appearance: none;
  cursor: pointer;
  outline: none;
  transition: border-color 0.12s ease-out;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const Label = styled.label`
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

export const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.03em;
`

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
