import React, { createContext, useContext, useEffect, useState } from "react";
import LoginModal from "../0.global/wallet/loginSignature";

const LoginContext = createContext();

function LoginProvider({ children }) {
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    return (
        <LoginContext.Provider value={{ setLoginModalOpen }}>
            <div>
                {children}
                <LoginModal isOpen={loginModalOpen} setIsOpen={setLoginModalOpen} />
            </div>
        </LoginContext.Provider>
    );
}

const LoginParams = () => {
    return useContext(LoginContext);
};

export { LoginProvider, LoginParams };
