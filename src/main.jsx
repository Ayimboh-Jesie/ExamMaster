import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import AuthProvider from "./context/AuthContext.jsx";
import {ModalProvider} from "./context/ModalContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
        <ModalProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ModalProvider>
    </PrimeReactProvider>
  </StrictMode>,
)
