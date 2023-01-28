import "./App.scss";

// import bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.esm";

// import wagmi
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import UserContext from '../src/components/User/User';
import MintAmount from '../src/components/MintAmount/MintAmount';
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { createContext, useContext, useState } from 'react';
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: "3ZQBXyExaivxlmFi6dMbfEE9dqAt5m_y" }),
    publicProvider(),
  ]
);
const user = {
  name: 'Kwame',
  toMint: "WETH"
}
// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

// import router
import MainRouter from "./router";

// import context
import { ConnectWalletModalContextProvider } from "./contexts/ConnectWalletModalContext";

// import components
import ConnectWalletModal from "./components/ConnectWalletModal";
const CurrentUserContext = UserContext
const MintAmountContext = MintAmount
const App = () => {
  const [currentUser, setCurrentUser] = useState("Wrapped Ethereum (WETH)");
  const [mintAmount, setMintAmount] = useState(1);
  return (
    <CurrentUserContext.Provider
    value={{
      currentUser,
      setCurrentUser
    }}
  >
        <MintAmountContext.Provider
    value={{
      mintAmount,
      setMintAmount
    }}
  >


    <WagmiConfig client={client}>
      <ConnectWalletModalContextProvider>
        <div className="App">
          <MainRouter />
        </div>
        <ConnectWalletModal />
      </ConnectWalletModalContextProvider>
    </WagmiConfig>
    </MintAmountContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
