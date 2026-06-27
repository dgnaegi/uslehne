import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { UserProfile, LedgerReason } from '../api/types'
import { userApi } from '../api/endpoints'
import { PageWrapper } from '../components/Layout.styled'
import { StarRating } from '../components/StarRating'
import {
  ProfileHeader,
  Username,
  JoinDate,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  SectionTitle,
  HistoryList,
  HistoryItem,
  HistoryDelta,
  HistoryReason,
  HistoryDate,
  EmptyNote,
} from './UserProfilePage.styled'

const REASON_LABEL: Record<LedgerReason, string> = {
  INVITE_BONUS: 'Einladungsbonus',
  LEND_EARN: 'Verleihen',
  BORROW_SPEND: 'Ausleihen',
  GIVE_EARN: 'Verschenken',
  RECEIVE_SPEND: 'Erhalten',
  ADMIN_ADJUST: 'Anpassung',
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

export function UserProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (!id) return
    userApi.getProfile(id).then(({ user }) => setProfile(user)).catch(() => navigate('/offers'))
  }, [id, navigate])

  if (!profile) return null

  return (
    <PageWrapper>
      <ProfileHeader>
        <Username>{profile.username}</Username>
        <JoinDate>Dabei seit {fmt(profile.createdAt)}</JoinDate>
        {profile.ratingCount > 0 && (
          <StarRating value={profile.avgStars} count={profile.ratingCount} readOnly />
        )}
      </ProfileHeader>

      <StatsGrid>
        <StatCard>
          <StatLabel>Sterne Ø</StatLabel>
          <StatValue>
            {profile.avgStars !== null ? profile.avgStars.toFixed(1) : '—'}
          </StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Karma</StatLabel>
          <StatValue>{profile.kudosBalance}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Verschenkt</StatLabel>
          <StatValue>{profile.offersGiven}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Ausgeliehen</StatLabel>
          <StatValue>{profile.offersTaken}</StatValue>
        </StatCard>
      </StatsGrid>

      <SectionTitle>Karma-Verlauf</SectionTitle>
      {profile.kudoHistory.length === 0 ? (
        <EmptyNote>Noch keine Karma-Aktivität.</EmptyNote>
      ) : (
        <HistoryList>
          {profile.kudoHistory.map((entry) => (
            <HistoryItem key={entry.id}>
              <HistoryDelta $positive={entry.delta > 0}>
                {entry.delta > 0 ? '+' : ''}
                {entry.delta}
              </HistoryDelta>
              <HistoryReason>{REASON_LABEL[entry.reason]}</HistoryReason>
              <HistoryDate>{fmt(entry.createdAt)}</HistoryDate>
            </HistoryItem>
          ))}
        </HistoryList>
      )}
    </PageWrapper>
  )
}
