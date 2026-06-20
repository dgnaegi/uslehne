import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { GlobalStyle } from './GlobalStyle'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ItemList } from './components/ItemList'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Hero />
      <ItemList />
    </ThemeProvider>
  )
}

export default App
