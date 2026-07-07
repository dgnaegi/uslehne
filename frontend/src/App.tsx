import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from './auth/AuthContext'
import { Header } from './components/Header'
import { AuthModal } from './components/AuthModal'
import { AuthPrompt, Button } from './components/Layout.styled'
import { AppFooter } from './components/AppFooter'
import { BugReportButton } from './components/BugReportButton'

const OffersPage = lazy(() => import('./routes/OffersPage').then((m) => ({ default: m.OffersPage })))
const OfferDetailPage = lazy(() =>
  import('./routes/OfferDetailPage').then((m) => ({ default: m.OfferDetailPage })),
)
const OfferFormPage = lazy(() =>
  import('./routes/OfferFormPage').then((m) => ({ default: m.OfferFormPage })),
)
const MyOffersPage = lazy(() =>
  import('./routes/MyOffersPage').then((m) => ({ default: m.MyOffersPage })),
)
const TransactionsPage = lazy(() =>
  import('./routes/TransactionsPage').then((m) => ({ default: m.TransactionsPage })),
)
const InvitesPage = lazy(() =>
  import('./routes/InvitesPage').then((m) => ({ default: m.InvitesPage })),
)
const ProfilePage = lazy(() =>
  import('./routes/ProfilePage').then((m) => ({ default: m.ProfilePage })),
)
const UserProfilePage = lazy(() =>
  import('./routes/UserProfilePage').then((m) => ({ default: m.UserProfilePage })),
)
const PrivacyPage = lazy(() =>
  import('./routes/PrivacyPage').then((m) => ({ default: m.PrivacyPage })),
)
const UeberUnsPage = lazy(() =>
  import('./routes/UeberUnsPage').then((m) => ({ default: m.UeberUnsPage })),
)
const ImpressumPage = lazy(() =>
  import('./routes/ImpressumPage').then((m) => ({ default: m.ImpressumPage })),
)
const ForgotPasswordPage = lazy(() =>
  import('./routes/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })),
)
const ResetPasswordPage = lazy(() =>
  import('./routes/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })),
)
const AdminPage = lazy(() =>
  import('./routes/AdminPage').then((m) => ({ default: m.AdminPage })),
)

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
  const { isAuthModalOpen } = useAuth()
  const location = useLocation()
  const showFooter = location.pathname !== '/offers'

  return (
    <>
      <Header />
      {isAuthModalOpen && <AuthModal />}
      <Suspense>
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
          <Route path="/ueber-uns" element={<UeberUnsPage />} />
          <Route path="/datenschutz" element={<PrivacyPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </Suspense>
      {showFooter && <AppFooter />}
      <BugReportButton />
    </>
  )
}

export default App
