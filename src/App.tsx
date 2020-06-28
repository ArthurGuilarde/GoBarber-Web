import React from 'react'

import GlobalStyle from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/index'

import Providers from './hooks'
// import { AuthProvider } from './hooks/authContext'
// import { ToastProvider } from './hooks/toastContext'

function App() {
  return (
    <>
      <Providers>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Providers>

      <GlobalStyle />
    </>
  )
}

export default App
