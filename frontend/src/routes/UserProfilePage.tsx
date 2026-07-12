import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { UserProfile } from '../api/types'
import { userApi } from '../api/endpoints'
import { REASON_LABEL, fmtDate } from '../utils/ledger'
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

export function UserProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (!id) return
    userApi
      .getProfile(id)
      .then(({ user }) => setProfile(user))
      .catch(() => navigate('/offers'))
  }, [id, navigate])

  if (!profile) return null

  return (
    <PageWrapper>
      <ProfileHeader>
        <Username>{profile.username}</Username>
        <JoinDate>Dabei seit {fmtDate(profile.createdAt)}</JoinDate>
        {profile.ratingCount > 0 && (
          <StarRating value={profile.avgStars} count={profile.ratingCount} readOnly />
        )}
      </ProfileHeader>

      <StatsGrid>
        <StatCard>
          <StatLabel>Sterne Ø</StatLabel>
          <StatValue>{profile.avgStars !== null ? profile.avgStars.toFixed(1) : '—'}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Karma</StatLabel>
          <StatValue>{profile.karmaBalance}</StatValue>
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

      {profile.karmaHistory !== undefined && (
        <>
          <SectionTitle>Karma-Verlauf</SectionTitle>
          {profile.karmaHistory.length === 0 ? (
            <EmptyNote>Noch keine Karma-Aktivität.</EmptyNote>
          ) : (
            <HistoryList>
              {profile.karmaHistory.map((entry) => (
                <HistoryItem key={entry.id}>
                  <HistoryDelta $positive={entry.delta > 0}>
                    {entry.delta > 0 ? '+' : ''}
                    {entry.delta}
                  </HistoryDelta>
                  <HistoryReason>{REASON_LABEL[entry.reason]}</HistoryReason>
                  <HistoryDate>{fmtDate(entry.createdAt)}</HistoryDate>
                </HistoryItem>
              ))}
            </HistoryList>
          )}
        </>
      )}
    </PageWrapper>
  )
}
