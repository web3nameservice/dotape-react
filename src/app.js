import React, { useState, useEffect, useContext } from "react";
import "./1.resources/2.js/0.global/0.smallfunctions/imports_css";
import Main from "./main";
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { AuthProvider } from "./3.components/1.wrappers/1.auth";

const App = ({ }) => {
  const { chains, provider } = configureChains(
    [mainnet],
    [jsonRpcProvider({
      rpc: (chain) => ({
        http: (JSON.parse(process.env.REACT_APP_CHAINSTACK_ETHEREUM_MAINNET_FULL_ARRAY)).links[0],
      }),
    })]
  );

  const { connectors } = getDefaultWallets({
    appName: 'WNS (Web3 Name Service)',
    chains
  });

  const wagmiClient = createClient({
    autoConnect: localStorage.getItem("walletConnected") == null ? false : true,
    connectors,
    provider
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} >
        <AuthProvider>
          <Main />
        </AuthProvider>
      </RainbowKitProvider>
    </WagmiConfig>

  );

}

export default App;

