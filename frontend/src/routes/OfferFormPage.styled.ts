import styled from 'styled-components'

export const ImagePreview = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: block;
`
