// global styles
import "./App.css";
// ContextProviders
import { CartContextProvider } from "./hooks/useCart";
import { NetworksContextProvider } from "./hooks/useNetworks";
import { GroupContextProvider } from "./hooks/useGroup";
import { YoutubeContextProvider } from "./hooks/useYoutube";
import { SongsContextProvider } from "./hooks/useSongs";
import { SendMessageContextProvider } from "./hooks/useMessages";
import { CitiesContextProvider } from "./hooks/useCities";
import ModalContextProvider from "./hooks/useModal";
// routes
import { BrowserRouter } from "react-router-dom";
// views
import Layout from "./Layout";
import { LivesContextProvider } from "./hooks/useLives";
import { ShopContextProvider } from "./hooks/useShop";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ModalContextProvider>
          <CitiesContextProvider>
            <CartContextProvider>
              <GroupContextProvider>
                <NetworksContextProvider>
                  <YoutubeContextProvider>
                    <SongsContextProvider>
                      <LivesContextProvider>
                        <ShopContextProvider>
                          <SendMessageContextProvider>
                            <Layout />
                          </SendMessageContextProvider>
                        </ShopContextProvider>
                      </LivesContextProvider>
                    </SongsContextProvider>
                  </YoutubeContextProvider>
                </NetworksContextProvider>
              </GroupContextProvider>
            </CartContextProvider>
          </CitiesContextProvider>
        </ModalContextProvider>
      </BrowserRouter>
    </>
  );
}
