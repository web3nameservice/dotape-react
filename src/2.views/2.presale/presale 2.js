import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BgImg from "../../1.resources/3.files/images/bg2.png";
import Footer from "../0.global/footer/footer";
import { useAccount } from "wagmi";
import { ConnectWallet } from "../0.global/wallet/connectWallet";
import { callW3Api, getDomain, getWnsDomain } from "../../1.resources/2.js/0.global/3.api/callW3Api";
import { shortenaddress } from "../../1.resources/2.js/0.global/0.smallfunctions/global";
import CloudContracts from "../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { calculateZeroes } from "../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import { getCloudProvider } from "../../1.resources/2.js/0.global/2.contracts/cloudProvider";
import { timeToString } from "../../1.resources/2.js/0.global/0.smallfunctions/time";
import Header from "../0.global/header/header";
import Invest from "./partials/invest";
import ConnectDialog from "../0.global/wallet/connectDialog";
import makeBlockie from "ethereum-blockies-base64";

const Presale = ({ walletConnected, setWalletConnected }) => {
    let { address } = useAccount();


    useEffect(() => {
        document.title = "Presale - DOT APE";
    }, [])

    return (
        <div id="about" className="h-full flex justify-center items-start pb-20 pt-10 bg-gray-100 dark:bg-dark900 text-black dark:text-white">

            {address == null ? (
                <ConnectDialog />
            ) : (
                <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">
                    <p className="text-3xl font-bold">PRESALE</p>

                    <div className="mt-4">
                        <div className="flex items-center gap-x-2 bg-dark800 w-fit px-4 py-3 rounded-full">
                            <img src={makeBlockie(address)} className="w-5 h-5 rounded-lg" />
                            <p className="text-sm">{shortenaddress(address)}</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="grid grid-cols-4 gap-x-4 mt-8">
                            <div>
                                <p className="text-2xl font-semibold">0.01 ETH</p>
                                <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">total credits left</p>
                            </div>
                            <div>
                                <p className="text-2xl font-semibold">2</p>
                                <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">total reserved names</p>
                            </div>
                        </div>
                    </div>
                </div >
            )}
        </div >
    );

}

export default Presale;

const Stats = ({ text, value }) => {

    return (
        <div className="flex justify-between items-center mt-1">
            <p className="text-md">{text}</p>
            <p className="text-md">{value}</p>
        </div>
    )
}

const Points = ({ text }) => {

    return (
        <div className="flex mt-2">
            <div>
                <FontAwesomeIcon icon={['fas', 'circle']} style={{ width: "30%" }} />
            </div>
            <div>
                <p className="text-sm">{text}</p>
            </div>
        </div>
    )
}