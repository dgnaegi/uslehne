import styled, { keyframes } from 'styled-components'

const overlayIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const boxIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: ${({ theme }) => theme.spacing.md};
  animation: ${overlayIn} 0.18s ease both;
`

export const ModalBox = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  box-shadow: ${({ theme }) => theme.shadowMd};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 420px;
  animation: ${boxIn} 0.22s ease both;
`

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const CloseBtn = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1;
  padding: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

export const EmailDisplay = styled.p`
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
`

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

export const InviteBonus = styled.p`
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.success};
`

export const BackBtn = styled.button`
  display: block;
  background: none;
  border: none;
  padding: 0;
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`
