import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import { Header } from './components/Header'
import { OffersPage } from './routes/OffersPage'
import { OfferDetailPage } from './routes/OfferDetailPage'
import { OfferFormPage } from './routes/OfferFormPage'
import { MyOffersPage } from './routes/MyOffersPage'
import { LoginPage } from './routes/LoginPage'
import { RegisterPage } from './routes/RegisterPage'
import { TransactionsPage } from './routes/TransactionsPage'
import { InvitesPage } from './routes/InvitesPage'
import { ProfilePage } from './routes/ProfilePage'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return null
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function App() {
  return (
    <>
      <Header />
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
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
      </Routes>
    </>
  )
}

export default App
