import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { GlobalStyle } from './GlobalStyle'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { OfferGrid } from './components/OfferGrid'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Hero />
      <OfferGrid />
    </ThemeProvider>
  )
}

export default App
