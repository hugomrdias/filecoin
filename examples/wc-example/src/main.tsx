import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
