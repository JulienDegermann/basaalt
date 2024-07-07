// global styles
import './App.css';

// ContextProviders
import { CartContextProvider } from './hooks/useCart';
import { NetworksContextProvider } from './hooks/useNetworks';
import { GroupContextProvider } from './hooks/useGroup';
import { YoutubeContextProvider } from './hooks/useYoutube';
import { SongsContextProvider } from './hooks/useSongs';

// routes
import { BrowserRouter } from 'react-router-dom';

// views
import Layout from './Layout';
import { LivesContextProvider } from './hooks/useLives';
import { ShopContextProvider } from './hooks/useShop';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <CartContextProvider>
          <GroupContextProvider>
            <NetworksContextProvider>
              <YoutubeContextProvider>
                <SongsContextProvider>
                  <LivesContextProvider>
                    <ShopContextProvider>
                      <Layout />
                    </ShopContextProvider>
                  </LivesContextProvider>
                </SongsContextProvider>
              </YoutubeContextProvider>
            </NetworksContextProvider>
          </GroupContextProvider>
        </CartContextProvider>
      </BrowserRouter>
    </>
  )
}