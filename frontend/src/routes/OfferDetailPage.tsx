import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Offer } from '../api/types'
import { offerApi } from '../api/endpoints'
import { useAuth } from '../auth/AuthContext'
import { Button } from '../components/Layout.styled'
import { RequestDialog } from '../components/RequestDialog'
import {
  DetailWrapper,
  ImageBlock,
  InfoBlock,
  MetaRow,
  TypeBadge,
  BackLink,
  ActionRow,
} from './OfferDetailPage.styled'

export function OfferDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation(['offers', 'common'])
  const { user, openAuthModal } = useAuth()
  const navigate = useNavigate()
  const [offer, setOffer] = useState<Offer | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    if (!id) return
    offerApi
      .get(id)
      .then(({ offer: o }) => setOffer(o))
      .catch(() => navigate('/offers'))
  }, [id, navigate])

  if (!offer) return <p style={{ padding: '32px' }}>{t('common:actions.loading')}</p>

  const kudos = offer.type === 'LEND' ? 1 : 5
  const isOwner = user?.id === offer.ownerId

  function handleRequest() {
    if (!user) { openAuthModal(); return }
    setShowDialog(true)
  }

  async function handleArchive() {
    if (!id) return
    await offerApi.update(id, { status: 'ARCHIVED' })
    navigate('/my-offers')
  }

  async function handleDelete() {
    if (!id) return
    if (!window.confirm(t('offers:deleteConfirm'))) return
    await offerApi.delete(id)
    navigate('/my-offers')
  }

  return (
    <DetailWrapper>
      <BackLink onClick={() => navigate(-1)}>{t('common:actions.back')}</BackLink>
      <ImageBlock>
        {offer.imageRef.startsWith('data:image/svg') ? (
          <span>📦</span>
        ) : (
          <img src={offer.imageRef} alt={offer.title} />
        )}
      </ImageBlock>
      <InfoBlock>
        <TypeBadge $type={offer.type}>{t(`common:offerType.${offer.type}`)}</TypeBadge>
        <h1>{offer.title}</h1>
        <p>{offer.description}</p>
        <MetaRow>
          <span>📍 {offer.address.zip}</span>
          <span>{t('offers:postedBy', { username: offer.owner.username })}</span>
        </MetaRow>
        <MetaRow>
          <span>
            {offer.type === 'LEND'
              ? t('offers:kudosCost', { count: kudos })
              : t('offers:kudosEarn', { count: kudos })}
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
              <Button $variant="danger" onClick={handleDelete}>
                {t('offers:deleteButton')}
              </Button>
            </>
          )}
        </ActionRow>
      </InfoBlock>
      {showDialog && <RequestDialog offerId={offer.id} onClose={() => setShowDialog(false)} />}
    </DetailWrapper>
  )
}
