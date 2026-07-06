import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Offer } from '../api/types'
import { IconBox, IconMapPin } from '../icons'
import { useSwipeRight } from '../hooks/useSwipeRight'
import {
  Card,
  CardImage,
  CardOverlay,
  TypeBadge,
  CardTitle,
  CardMeta,
  CardZip,
  CardOwner,
  SwipeHint,
} from './OfferCard.styled'

interface Props {
  offer: Offer
  onSwipeRight?: () => void
}

export function OfferCard({ offer, onSwipeRight }: Props) {
  const { t } = useTranslation('common')
  const {
    swipeX,
    threshold,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
    onClickCapture,
  } = useSwipeRight(onSwipeRight ?? (() => {}))

  const isDragging = swipeX > 0
  const progress = swipeX / threshold

  return (
    <Card
      as={Link}
      to={`/offers/${offer.id}`}
      onTouchStart={onSwipeRight ? onTouchStart : undefined}
      onTouchMove={onSwipeRight ? onTouchMove : undefined}
      onTouchEnd={onSwipeRight ? onTouchEnd : undefined}
      onTouchCancel={onSwipeRight ? onTouchCancel : undefined}
      onClickCapture={onSwipeRight ? onClickCapture : undefined}
      style={
        isDragging
          ? {
              transform: `translateX(${swipeX}px) rotate(${swipeX * 0.012}deg)`,
              transition: 'none',
              willChange: 'transform',
            }
          : {
              transform: 'none',
              transition: 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }
      }
    >
      {isDragging && <SwipeHint $progress={progress}>ANFRAGEN</SwipeHint>}
      <CardImage $type={offer.type}>
        {offer.imageRef.startsWith('data:image/svg') ? (
          <IconBox size={64} aria-hidden="true" />
        ) : (
          <img src={offer.imageRef} alt={offer.title} />
        )}
      </CardImage>
      <CardOverlay>
        <TypeBadge $type={offer.type}>{t(`offerType.${offer.type}`)}</TypeBadge>
        <CardTitle>{offer.title}</CardTitle>
        <CardMeta>
          <CardZip>
            <IconMapPin size={14} /> {offer.address.zip} {offer.address.city}
          </CardZip>
          <CardOwner>@{offer.owner.username}</CardOwner>
        </CardMeta>
      </CardOverlay>
    </Card>
  )
}
