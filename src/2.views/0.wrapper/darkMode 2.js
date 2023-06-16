import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [darkMode, setDarkMode] = useState(true);

    async function toggleDarkMode() {
        if (localStorage.getItem("darkMode") === "true") {
            localStorage.removeItem("darkMode");
        } else {
            localStorage.setItem("darkMode", "true");
        }
        setDarkMode(localStorage.getItem("darkMode") === "true" ? true : false);
        console.log(darkMode)
    }

    useEffect(() => {
        // Add any desired logic or side effects here
    }, []);

    return (
        <GlobalContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </GlobalContext.Provider>
    );
}

const GlobalParams = () => {
    return useContext(GlobalContext);
};

export { GlobalProvider, GlobalParams };
