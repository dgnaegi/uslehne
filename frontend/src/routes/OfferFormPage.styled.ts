import styled from 'styled-components'

export const ImagePreview = styled.img`
  max-width: 300px;
  max-height: 200px;
  object-fit: contain;
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: block;
`
