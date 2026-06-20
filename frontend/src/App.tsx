import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import { Header } from './components/Header'
import { AuthModal } from './components/AuthModal'
import { PageWrapper, Button } from './components/Layout.styled'
import { OffersPage } from './routes/OffersPage'
import { OfferDetailPage } from './routes/OfferDetailPage'
import { OfferFormPage } from './routes/OfferFormPage'
import { MyOffersPage } from './routes/MyOffersPage'
import { TransactionsPage } from './routes/TransactionsPage'
import { InvitesPage } from './routes/InvitesPage'
import { ProfilePage } from './routes/ProfilePage'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, openAuthModal } = useAuth()
  if (isLoading) return null
  if (!user) {
    return (
      <PageWrapper style={{ textAlign: 'center', paddingTop: '64px' }}>
        <p>Bitte melde dich an.</p>
        <Button onClick={openAuthModal} style={{ marginTop: '16px' }}>
          Anmelden
        </Button>
      </PageWrapper>
    )
  }
  return <>{children}</>
}

function App() {
  const { isAuthModalOpen } = useAuth()

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
        <Route path="/login" element={<Navigate to="/offers" replace />} />
        <Route path="/register" element={<Navigate to="/offers" replace />} />
      </Routes>
    </>
  )
}

export default App
