import React, { createContext, useContext, useEffect, useState } from "react";
import { watchAccount } from '@wagmi/core'
import { useAccount } from 'wagmi'
const AuthContext = createContext();

function AuthProvider({ children }) {
    const { address, isConnecting, isDisconnected, isReconnecting } = useAccount()
    const [accountInfo, setAccountInfo] = useState(null);

    watchAccount((account) => {
        console.log("changed", account.address, address);

        if (account.address != null && account.address != "" && account.address != undefined) {
            localStorage.setItem("walletConnected", "true");
            if (address == null || address == "" || address == undefined) {
                window.location.reload();
            } else {
                if (account.address != address) {
                    localStorage.clear();
                    window.location = "/";
                }
            }
        }
    })

    async function refreshAccount(details) {
        localStorage.setItem("accountStorage", JSON.stringify(details));
        setAccountInfo(details);
    }

    return (
        <AuthContext.Provider value={{ accountInfo, refreshAccount }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth }