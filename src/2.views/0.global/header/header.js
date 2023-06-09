import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from "../../../1.resources/3.files/logo/logo_white2.png"
import Links from "./links";
import { ConnectWallet } from "../wallet/connectWallet";


const Header = ({ }) => {

    useEffect(() => {
    }, [])
    return (
        <div style={{}} className="flex justify-center py-4">
            <div className="w-full lg:w-[1280px] px-5 md:px-10 lg:px-28 2xl:px-0">
                <div className="flex justify-between items-center md:px-0 " style={{ zIndex: 1000000 }}>
                    <div className="flex justify-start items-center gap-x-8">
                        <a href="/" className="flex justify-center md:justify-start items-center gap-x-4">
                            <img src={Logo} className="w-12 h-12 md:w-10 md:h-10" />
                            {/* <p className="text-2xl text-white">.APE</p> */}
                        </a>
                        <div className="flex items-center justify-center md:justify-start gap-x-6 mt-2 md:mt-0">
                            {/* <a href={window.location.pathname == "/" ? "#about" : "/#about"} className="flex items-center gap-x-2">
                            <p className="text-lg text-white">About</p>
                        </a> */}
                            {/* <a href="/about" className="flex items-center gap-x-2">
                                <p className="text-lg text-white">About</p>
                            </a> */}
                            <a href="/presale" className="flex items-center gap-x-2 hidden md:block">
                                <p className="text-lg text-white">Presale</p>
                            </a>
                            <a href="/generator" className="flex items-center gap-x-2">
                                <p className="text-lg text-white">Generator</p>
                            </a>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-x-8 sm:mt-0">

                        {/* <a href="/presale" className="bg-main px-4 py-2 w-fit rounded-full flex items-center gap-x-2 whitespace-nowrap">
                            <p className="text-white">Buy now</p>
                            <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-white text-sm" />
                        </a> */}
                        <ConnectWallet />
                    </div>
                </div >
            </div>
        </div >
    );

}


export default Header;
