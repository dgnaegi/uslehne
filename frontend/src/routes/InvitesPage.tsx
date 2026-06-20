import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Invite } from '../api/types'
import { inviteApi } from '../api/endpoints'
import { useAuth } from '../auth/AuthContext'
import { PageWrapper, PageTitle, Button, ErrorMsg } from '../components/Layout.styled'
import { InviteCard, InviteCode, InviteStatus, InviteActions, TopBar } from './InvitesPage.styled'

const getInviteBase = () => `${window.location.origin}/register?invite=`

export function InvitesPage() {
  const { t } = useTranslation(['invites', 'common'])
  const { user } = useAuth()
  const [invites, setInvites] = useState<Invite[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    inviteApi
      .list()
      .then(({ invites: i }) => setInvites(i))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate() {
    try {
      const { invite } = await inviteApi.create()
      setInvites((prev) => [invite, ...prev])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Fehler')
    }
  }

  async function handleCopy(code: string) {
    await navigator.clipboard.writeText(`${getInviteBase()}${code}`)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  const atLimit = user?.role !== 'ADMIN' && invites.length >= 3

  return (
    <PageWrapper>
      <TopBar>
        <PageTitle>{t('invites:title')}</PageTitle>
        <Button onClick={handleCreate} disabled={atLimit}>
          {atLimit ? t('invites:limitReached') : t('invites:createInvite')}
        </Button>
      </TopBar>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {loading ? (
        <p>{t('common:actions.loading')}</p>
      ) : invites.length === 0 ? (
        <p>{t('invites:noInvites')}</p>
      ) : (
        invites.map((invite) => (
          <InviteCard key={invite.id}>
            <div>
              <InviteCode>
                {getInviteBase()}
                {invite.code}
              </InviteCode>
              <InviteStatus $used={!!invite.usedById}>
                {invite.usedById ? t('invites:used') : t('invites:unused')} —{' '}
                {t('invites:kudosNote', { kudos: invite.kudos })}
              </InviteStatus>
            </div>
            <InviteActions>
              {!invite.usedById && (
                <Button $variant="secondary" onClick={() => handleCopy(invite.code)}>
                  {copied === invite.code ? t('invites:copied') : t('invites:copyLink')}
                </Button>
              )}
            </InviteActions>
          </InviteCard>
        ))
      )}
    </PageWrapper>
  )
}
