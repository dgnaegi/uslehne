import styled from 'styled-components'

export const HintWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1.5px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.surface};
`

export const HintFrames = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`

export const HintLabel = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin: 0;
`
