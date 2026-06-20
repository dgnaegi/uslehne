import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { GlobalStyle } from './GlobalStyle'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HealthCheck } from './components/HealthCheck'
import { ItemList } from './components/ItemList'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Hero />
      <HealthCheck />
      <ItemList />
    </ThemeProvider>
  )
}

export default App
