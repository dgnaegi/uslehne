import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IconBox, IconMapPin } from '../icons'
import type { Offer } from '../api/types'
import { offerApi } from '../api/endpoints'
import { useAuth } from '../auth/AuthContext'
import { Button } from '../components/Layout.styled'
import { RequestDialog } from '../components/RequestDialog'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { ImageLightbox } from '../components/ImageLightbox'
import { JsonLd } from '../components/JsonLd'
import { usePageMeta } from '../hooks/usePageMeta'
import { buildOfferJsonLd } from '../utils/offerJsonLd'
import {
  DetailWrapper,
  ImageBlock,
  InfoBlock,
  MetaRow,
  TypeBadge,
  ActionRow,
} from './OfferDetailPage.styled'

export function OfferDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation(['offers', 'common'])
  const { user, logout, openAuthModal } = useAuth()
  const navigate = useNavigate()
  const [offer, setOffer] = useState<Offer | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [showLightbox, setShowLightbox] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (!id) return
    offerApi
      .get(id)
      .then(({ offer: o }) => setOffer(o))
      .catch(() => navigate('/offers'))
  }, [id, navigate])

  const actionWord = offer?.type === 'LEND' ? 'Ausleihen' : 'Verschenken'
  usePageMeta(
    offer
      ? `${offer.title} – ${actionWord} in ${offer.address.city ?? offer.address.zip} | uslehne.ch`
      : 'uslehne.ch',
    offer
      ? `${offer.description.slice(0, 150)} – Kostenlos ${actionWord.toLowerCase()} in ${[offer.address.zip, offer.address.city].filter(Boolean).join(' ')} auf uslehne.ch.`
      : undefined,
  )
  const offerJsonLd = useMemo(() => (offer ? buildOfferJsonLd(offer) : null), [offer])

  if (!offer) return null

  const karma = offer.type === 'LEND' ? 1 : 2
  const isOwner = user?.id === offer.ownerId

  function handleRequest() {
    if (!user) {
      logout()
      openAuthModal()
      return
    }
    setShowDialog(true)
  }

  async function handleArchive() {
    if (!id) return
    await offerApi.update(id, { status: 'ARCHIVED' })
    navigate('/my-offers')
  }

  async function handleDelete() {
    if (!id) return
    setShowDeleteConfirm(false)
    await offerApi.delete(id)
    navigate('/my-offers')
  }

  return (
    <DetailWrapper>
      {offerJsonLd && <JsonLd json={offerJsonLd} />}
      <ImageBlock>
        {offer.imageRef.startsWith('data:image/svg') ? (
          <IconBox size={80} aria-hidden="true" />
        ) : (
          <img src={offer.imageRef} alt={offer.title} onClick={() => setShowLightbox(true)} />
        )}
      </ImageBlock>
      <InfoBlock>
        <TypeBadge $type={offer.type}>{t(`common:offerType.${offer.type}`)}</TypeBadge>
        <h1>{offer.title}</h1>
        <p>{offer.description}</p>
        <MetaRow>
          <span>
            <IconMapPin size={14} /> {offer.address.zip}
          </span>
          <Link to={`/users/${offer.ownerId}`}>@{offer.owner.username}</Link>
        </MetaRow>
        <MetaRow>
          <span>
            {offer.type === 'LEND'
              ? t('offers:karmaCost', { count: karma })
              : t('offers:karmaEarn', { count: karma })}
          </span>
        </MetaRow>
        <ActionRow>
          {!isOwner && offer.status === 'AVAILABLE' && (
            <Button onClick={handleRequest}>
              {user ? t('offers:requestButton') : t('offers:requestButtonGuest')}
            </Button>
          )}
          {isOwner && (
            <>
              <Button $variant="secondary" onClick={() => navigate(`/offers/${offer.id}/edit`)}>
                {t('offers:editButton')}
              </Button>
              <Button $variant="secondary" onClick={handleArchive}>
                {t('offers:archiveButton')}
              </Button>
              <Button $variant="danger" onClick={() => setShowDeleteConfirm(true)}>
                {t('offers:deleteButton')}
              </Button>
            </>
          )}
        </ActionRow>
      </InfoBlock>
      {showDialog && (
        <RequestDialog
          offerId={offer.id}
          offerType={offer.type}
          onClose={() => setShowDialog(false)}
        />
      )}
      {showLightbox && (
        <ImageLightbox
          src={offer.imageRef}
          alt={offer.title}
          onClose={() => setShowLightbox(false)}
        />
      )}
      {showDeleteConfirm && (
        <ConfirmDialog
          title={t('offers:deleteTitle')}
          message={t('offers:deleteConfirm')}
          confirmLabel={t('common:actions.delete')}
          danger
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </DetailWrapper>
  )
}
