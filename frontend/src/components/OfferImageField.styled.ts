import styled from 'styled-components'

export const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const ImagePreview = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  display: block;
`

export const ReplaceImageButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  cursor: pointer;
  padding: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.75);
  }
`

export const DeleteImageButton = styled(ReplaceImageButton)`
  right: ${({ theme }) => `calc(32px + ${theme.spacing.xs} + ${theme.spacing.xs})`};

  &:hover {
    background: ${({ theme }) => theme.colors.danger};
  }
`

export const UploadOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
`
