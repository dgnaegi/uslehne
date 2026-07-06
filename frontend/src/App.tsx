import { Routes, Route, Navigate, useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from './auth/AuthContext'
import { Header } from './components/Header'
import { AuthModal } from './components/AuthModal'
import { AuthPrompt, Button } from './components/Layout.styled'
import { OffersPage } from './routes/OffersPage'
import { OfferDetailPage } from './routes/OfferDetailPage'
import { OfferFormPage } from './routes/OfferFormPage'
import { MyOffersPage } from './routes/MyOffersPage'
import { TransactionsPage } from './routes/TransactionsPage'
import { InvitesPage } from './routes/InvitesPage'
import { ProfilePage } from './routes/ProfilePage'
import { UserProfilePage } from './routes/UserProfilePage'
import { PrivacyPage } from './routes/PrivacyPage'
import { ImpressumPage } from './routes/ImpressumPage'
import { ForgotPasswordPage } from './routes/ForgotPasswordPage'
import { ResetPasswordPage } from './routes/ResetPasswordPage'
import { AdminPage } from './routes/AdminPage'
import { AppFooter } from './components/AppFooter'
import { BugReportButton } from './components/BugReportButton'

function RegisterRedirect() {
  const [params] = useSearchParams()
  const invite = params.get('invite')
  const navigate = useNavigate()
  const { openAuthModal } = useAuth()

  useEffect(() => {
    openAuthModal()
    navigate(invite ? `/offers?invite=${invite}` : '/offers', { replace: true })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, openAuthModal } = useAuth()
  if (isLoading) return null
  if (!user) {
    return (
      <AuthPrompt>
        <p>Bitte melde dich an.</p>
        <Button onClick={openAuthModal}>Anmelden</Button>
      </AuthPrompt>
    )
  }
  return <>{children}</>
}

function App() {
  const { isAuthModalOpen, user } = useAuth()

  return (
    <>
      <Header />
      {isAuthModalOpen && <AuthModal />}
      <Routes>
        <Route path="/" element={<Navigate to="/offers" replace />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route
          path="/offers/new"
          element={
            <PrivateRoute>
              <OfferFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/offers/:id/edit"
          element={
            <PrivateRoute>
              <OfferFormPage />
            </PrivateRoute>
          }
        />
        <Route path="/offers/:id" element={<OfferDetailPage />} />
        <Route
          path="/my-offers"
          element={
            <PrivateRoute>
              <MyOffersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <TransactionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/invites"
          element={
            <PrivateRoute>
              <InvitesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Navigate to="/offers" replace />} />
        <Route path="/register" element={<RegisterRedirect />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route path="/datenschutz" element={<PrivacyPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
      <AppFooter />
      {user && <BugReportButton />}
    </>
  )
}

export default App
