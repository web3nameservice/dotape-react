import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ConnectWallet } from "../wallet/connectWallet";
import { GlobalParams } from "../../0.wrapper/darkMode.js";
import HeaderSearch from "./search";
import { useAccount } from "wagmi";
import { callW3Api } from "../../../1.resources/2.js/0.global/3.api/callW3Api";
import { formatinusd } from "../../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import Sidebar from "../../../4.sidebar/sidebar";

const Header = ({ }) => {
    let { address } = useAccount();
    const { darkMode, toggleDarkMode } = GlobalParams();
    const [mobileSidebar, setMobileSidebar] = useState(false);

    return (
        <div style={{}} className={`flex justify-center py-0 md:py-3 border-none md:border-b-2 dark:border-b border-zinc-200 dark:border-dark700 bg-white  w-full bg-transparent md:dark:bg-dark900 z-50`}>
            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">
                <div className="flex justify-between items-center md:px-0 gap-x-4 w-full" style={{ zIndex: 1000000 }}>
                    <div className="flex-none block md:hidden py-3 md:py-0">
                        <div className="h-10 flex items-center justify-center" onClick={() => setMobileSidebar(!mobileSidebar)}>
                            <FontAwesomeIcon icon={['fas', 'bars']} className="text-zinc-500 dark:text-white md:dark:text-neutral-400 text-lg" />
                        </div>
                    </div>

                    {window.location.pathname != "/search" ? (
                        <div className="w-full hidden md:block">
                            <HeaderSearch />
                        </div>
                    ) : (<div />)}



                    <div className="hidden md:flex justify-end items-center gap-x-0 sm:mt-0 ">
                        <div className="flex justify-between gap-x-0">
                            <a className="bg-zinc-100 dark:bg-dark800 w-10 h-10 border border-zinc-200 dark:border-dark700 rounded-2xl flex justify-center items-center" href="/cart">
                                <FontAwesomeIcon icon={['fas', 'fa-shopping-bag']} className="text-zinc-500 dark:text-neutral-400 text-lg" />
                            </a>
                        </div>

                    </div>
                </div >
            </div>
            <div className={`w-screen h-screen bg-black/50 backdrop-blur-lg z-0 fixed ${mobileSidebar ? "fade-effect" : ""} `} style={{ display: mobileSidebar ? "block" : "none", opacity: mobileSidebar ? 1 : 0 }} onClick={() => setMobileSidebar(false)}>

            </div>
            <div style={{ width: "100%", display: mobileSidebar ? "block" : "none" }} className={window.innerWidth < 1000 ? (mobileSidebar ? "slider slide-in block lg:hidden  top-[0px] " : "slider slide-out block lg:hidden  top-[0px]") : ""}>
                <MobileSidebar setMobileSidebar={setMobileSidebar} />
            </div>
        </div >
    );

}


export default Header;

const MobileSidebar = ({ setMobileSidebar }) => {

    return (
        <div className="">
            <div className="w-[240px] min-h-screen bg-black absolute shadow z-50 fixed">
                <Sidebar sidebarOpened={true} setSidebarOpened={setMobileSidebar} />
            </div>
        </div>
    )
}


