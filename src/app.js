import "./polyfills.js";
import React, { useState, useEffect, useContext } from "react";
import "./1.resources/2.js/0.global/0.smallfunctions/imports_css";
import Main from "./main";
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme, lightTheme, Theme, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { AuthProvider } from "./3.components/1.wrappers/1.auth";
import { GlobalProvider } from "./2.views/0.wrapper/darkMode.js";
import { GlobalParams } from "./2.views/0.wrapper/darkMode.js";
import { colors } from "./1.resources/1.css/colors.js";
import merge from 'lodash.merge';
import { LoginProvider } from "./2.views/0.wrapper/login.js";
import { injectedWallet, rainbowWallet, metaMaskWallet, coinbaseWallet, walletConnectWallet, trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
const App = ({ }) => {
  const { chains, provider } = configureChains(
    [mainnet],
    [jsonRpcProvider({
      rpc: (chain) => ({
        http: (JSON.parse(process.env.REACT_APP_CHAINSTACK_ETHEREUM_MAINNET_FULL_ARRAY)).links[0],
      }),
    })]
  );

  // const { connectors } = getDefaultWallets({
  //   appName: 'Dot Ape',
  //   chains
  // });

  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        injectedWallet({ chains }),
        metaMaskWallet({ chains }),
        coinbaseWallet({ chains, appName: 'Dot Ape' }),

        walletConnectWallet({ chains }),
      ],
    },
    {
      groupName: 'Others',
      wallets: [
        trustWallet({ chains }),
        ledgerWallet({ chains }),
        rainbowWallet({ chains }),
      ],
    },
  ]);

  const wagmiClient = createClient({
    autoConnect: localStorage.getItem("walletConnected") == null ? false : true,
    connectors,
    provider
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <AuthProvider>
        <GlobalProvider>
          <LoginProvider>
            <MainApp chains={chains} />
          </LoginProvider>
        </GlobalProvider>
      </AuthProvider>
    </WagmiConfig >

  );

}

export default App;

const myDarkTheme = merge(darkTheme({
  fontStack: "system",
  borderRadius: "large"
}), {
  colors: {
    accentColor: colors.main,
    modalBackground: "rgb(24 24 27)",
  }
});

const MainApp = ({ chains }) => {
  const { darkMode } = GlobalParams();

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#000";
    } else {
      document.body.style.backgroundColor = "#F9F9F9";
    }
  }, [darkMode])
  return (
    <div className={darkMode ? "dark" : "dark"}>
      <RainbowKitProvider chains={chains} theme={darkMode ? myDarkTheme : lightTheme({
        fontStack: "system",
        borderRadius: "large"
      })} >
        <Main />
      </RainbowKitProvider>
    </div>
  )
}

