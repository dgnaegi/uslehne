import styled from 'styled-components'

export const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    padding-right: ${({ theme }) => theme.spacing.xxl};
  }
`

export const EyeBtn = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius};
  }
`
