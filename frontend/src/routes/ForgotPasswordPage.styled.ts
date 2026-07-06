import styled from 'styled-components'

export const FormWrapper = styled.form`
  max-width: 480px;
`

export const SuccessBox = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.success};
  font-weight: 600;
  max-width: 480px;
  margin-top: ${({ theme }) => theme.spacing.md};
`
