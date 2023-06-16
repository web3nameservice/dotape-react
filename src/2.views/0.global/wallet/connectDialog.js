import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ConnectWallet } from "./connectWallet";
import makeBlockie from "ethereum-blockies-base64";
import { zeroAddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/prepends";


const ConnectDialog = ({ }) => {


    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col justify-start items-start bg-gray-100 dark:bg-dark800 w-[550px] mx-5 md:mx-0 py-20 px-10 md:px-20 rounded-2xl" style={{}}>
                <BlockiesGif />
                <div className="pt-10">
                    <p className="text-2xl font-bold">Hey there! Connect your wallet to get started</p>
                    <p className="text-md mt-3 text-gray-500 dark:text-dark500">By connecting your wallet, you can:</p>
                    <div className="mt-4">
                        <div className="flex items-center gap-x-2 rounded-full px-0 py-1 bg-gray-100 dark:bg-dark800 w-fit mt-2 cursor-pointer">
                            <div className="bg-gray-500 dark:bg-dark700 w-5 h-5 flex justify-center items-center rounded-full">
                                <FontAwesomeIcon icon={['fas', 'fa-check']} className="text-gray-500 dark:text-dark500" size="xs" />
                            </div>
                            <p className="text-md text-gray-500 dark:text-dark500">Register new .ape names</p>
                        </div>
                        <div className="flex items-center gap-x-2 rounded-full px-0 py-1 bg-gray-100 dark:bg-dark800 w-fit mt-2 cursor-pointer">
                            <div className="bg-gray-500 dark:bg-dark700 w-5 h-5 flex justify-center items-center rounded-full">
                                <FontAwesomeIcon icon={['fas', 'fa-check']} className="text-gray-500 dark:text-dark500" size="xs" />
                            </div>
                            <p className="text-md text-gray-500 dark:text-dark500">View and manage names in your collection</p>
                        </div>
                        <div className="flex items-center gap-x-2 rounded-full px-0 py-1 bg-gray-100 dark:bg-dark800 w-fit mt-2 cursor-pointer">
                            <div className="bg-gray-500 dark:bg-dark700 w-5 h-5 flex justify-center items-center rounded-full">
                                <FontAwesomeIcon icon={['fas', 'fa-check']} className="text-gray-500 dark:text-dark500" size="xs" />
                            </div>
                            <p className="text-md text-gray-500 dark:text-dark500">Edit your profile (primary name)</p>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <ConnectWallet />
                </div>
            </div>
        </div>
    );

}


export default ConnectDialog;

export const BlockiesGif = ({ }) => {
    const [address, setAddress] = useState(zeroAddress);

    useEffect(() => {
        let interval = setInterval(() => {
            let add = "0x";
            for (let i = 0; i < 40; i++) {
                add += Math.floor(Math.random() * 16).toString(16);
            }
            setAddress(add);
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="w-24 h-24 flex justify-center items-center">
            <img src={makeBlockie(address)} className="w-24 h-24 rounded-2xl" />
        </div>
    )
}


