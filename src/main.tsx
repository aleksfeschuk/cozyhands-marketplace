import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./styles/main.scss";
import { CartProvider } from './context/CartProvider.tsx';
import { WishlistProvider } from './context/WishlistProvider.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider> 
  </StrictMode>,
)
