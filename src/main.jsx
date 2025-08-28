import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UserProvider from './assets/Context/UserContext.jsx'
import PetsProvider from './assets/Context/PetContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <UserProvider>
        <PetsProvider>
          <App />
        </PetsProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)