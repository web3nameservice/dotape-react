import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { shortenaddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/global";
import OpenseaLogo from "../../../1.resources/3.files/images/opensea_gray.webp";
import EtherscanLogo from "../../../1.resources/3.files/images/etherscan_gray.webp";
import OpenseaDarkLogo from "../../../1.resources/3.files/images/opensea_darkgray.webp";
import EtherscanDarkLogo from "../../../1.resources/3.files/images/etherscan_darkgray.webp";
import { collectionAddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import { GlobalParams } from "../../0.wrapper/darkMode";
import Logo from "../../../1.resources/3.files/logo/logobg.webp";

const MarketplaceUpper = ({ names, owners, tabSelected, setTabSelected }) => {
    const { darkMode } = GlobalParams();
    const [clipboardText, setClipboardText] = useState("");

    async function copyToClipboard(text) {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            setClipboardText("copied");
            //wait 2 seconds and then reset
            setTimeout(() => {
                setClipboardText("");
            }, 2000);
        } else {
            console.log("clipboard not supported");
        }
    }

    return (
        <div id="about" className="flex justify-center items-start pb-0 pt-8 ">
            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">
                <div className="flex justify-between items-start">
                    <div className="w-full">
                        <div className="flex justify-center items-center w-24 h-24 bg-zinc-400 rounded-2xl" >
                            <img src={Logo} className="w-24 h-24 rounded-2xl" />
                        </div>
                        <div className="mt-4 cursor-pointer" onClick={() => copyToClipboard(collectionAddress)}>
                            <p className="text-3xl font-bold">Dot Ape</p>
                            <div className="flex items-center gap-x-2 rounded-full px-3 py-2 bg-gray-100 dark:bg-dark800 w-fit mt-2 cursor-pointer">
                                <div className="bg-[#5E78DE] w-5 h-5 flex justify-center items-center rounded-full">
                                    <FontAwesomeIcon icon={["fab", "fa-ethereum"]} className="text-white" size="xs" />
                                </div>
                                <p className="text-xs font-semibold text-gray-500 dark:text-dark500">{shortenaddress(collectionAddress)}</p>
                                {clipboardText != "" ? (
                                    <FontAwesomeIcon icon={['fas', 'fa-check']} className="text-green-500 dark:text-dark500" size="xs" />
                                ) : (
                                    <FontAwesomeIcon icon={['fas', 'fa-copy']} className="text-gray-500 dark:text-dark500" size="xs" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <div className="flex items-center gap-x-4">
                            <a className="flex justify-center items-center w-10 h-10 bg-gray-200 dark:bg-dark800 border dark:border-dark700 rounded-2xl" href={"https://opensea.io/" + collectionAddress} target="_blank">
                                {darkMode ? (
                                    <img src={OpenseaLogo} className="w-10 h-10" />
                                ) : (
                                    <img src={OpenseaDarkLogo} className="w-10 h-10" />
                                )}
                            </a>
                            <a className="flex justify-center items-center w-10 h-10 bg-gray-200 dark:bg-dark800 border dark:border-dark700 rounded-2xl" href={"https://etherscan.io/address/" + collectionAddress} target="_blank">
                                {darkMode ? (
                                    <img src={EtherscanLogo} className="w-10 h-10" />
                                ) : (
                                    <img src={EtherscanDarkLogo} className="w-10 h-10" />
                                )}
                            </a>
                        </div>

                    </div>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 mt-8">
                    <div>
                        <p className="text-2xl font-semibold">{names.length}</p>
                        <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">total names</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">{owners != 0 ? owners : "-"}</p>
                        <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">total owners</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">-</p>
                        <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">total names listed</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">-</p>
                        <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">floor price</p>
                    </div>

                </div>

                <div className="flex items-center gap-x-12 w-fit mt-8">
                    <div className={`flex items-center gap-x-2  w-fit pb-2 ${tabSelected == "items" ? "border-b-2 border-white" : "border-b-2 border-transparent"}`} onClick={() => setTabSelected("items")}>
                        <FontAwesomeIcon icon={['fas', 'box']} className={` text-sm ${tabSelected == "items" ? "text-white" : "text-dark500"}`} />
                        <p className={`text-md font-bold ${tabSelected == "items" ? "text-white" : "text-dark500"}`}>Items</p>
                    </div>
                    <div className={`flex items-center gap-x-2  w-fit pb-2 ${tabSelected == "activity" ? "border-b-2 border-white" : "border-b-2 border-transparent"}`} onClick={() => setTabSelected("activity")}>
                        <FontAwesomeIcon icon={['fas', 'chart-line']} className={` text-sm ${tabSelected == "activity" ? "text-white" : "text-dark500"}`} />
                        <p className={`text-md font-bold ${tabSelected == "activity" ? "text-white" : "text-dark500"}`}>Activity</p>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default MarketplaceUpper;