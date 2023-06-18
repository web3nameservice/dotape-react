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
import makeBlockie from "ethereum-blockies-base64";
import { useAccount } from "wagmi";
import { callW3Api } from "../../../1.resources/2.js/0.global/3.api/callW3Api";
import { formatinusd } from "../../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import PrimaryName from "../partials/modals/primaryName";
import { VscVerifiedFilled } from "react-icons/vsc";

const MyNamesUpper = ({ names, userAddress, domain }) => {
    const { address } = useAccount();
    const { darkMode } = GlobalParams();
    const [primaryVisible, setPrimaryVisible] = useState(false);
    const [clipboardText, setClipboardText] = useState("");
    const [profile, setProfile] = useState(null);
    const [image, setImage] = useState(null);
    const [verified, setVerified] = useState(null);

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

    async function getProfile() {
        let result = await callW3Api("/profile/get", { address: userAddress });
        console.log(result);
        setProfile(result);
        if (result?.profile_image_url != null && result?.profile_image_url != "" && !result?.profile_image_url.includes("opensea-static")) {
            setImage(result.profile_image_url);
        }
        if (result?.profile_img_url != null && result?.profile_img_url != "" && !result?.profile_img_url.includes("opensea-static")) {
            setImage(result.profile_img_url);
        }
        console.log(result?.verified);
        if (result?.verified != "null") {
            setVerified(result.verified);
        }
    }

    useEffect(() => {
        if (userAddress != null && userAddress != "" && userAddress != "null") {
            getProfile();
        }
    }, [userAddress])

    return (
        <div id="about" className="w-full flex justify-center items-start pb-0 pt-8 ">
            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">
                <div className="flex flex-col-reverse md:flex-row justify-between items-start">
                    <div className="w-full mt-8 md:mt-0 flex justify-between items-start">
                        <div>
                            <div className="flex justify-center items-center w-28 h-28 bg-zinc-400 rounded-2xl" >
                                <img src={image != null ? image : makeBlockie(userAddress ? userAddress : "0x0000000000000000000000000000000000000000")} className="w-28 h-28 rounded-2xl aspect-square object-cover" />
                            </div>
                            <div className="mt-4 cursor-pointer" onClick={() => copyToClipboard(userAddress)}>
                                <div className="flex items-center gap-x-2 pt-2">
                                    {domain != "" && domain != "null" ? (
                                        <p className="text-3xl font-bold">{domain}</p>
                                    ) : (
                                        <p className="text-3xl font-bold">{shortenaddress(userAddress != null ? userAddress : "")}</p>
                                    )}
                                    {verified != null ? (
                                        <VscVerifiedFilled className={`${verified != null ? verified == 1 ? "text-main" : "text-main" : ""} text-2xl`} />
                                    ) : (null)}
                                </div>
                                <div className="flex items-center gap-x-2 rounded-full px-3 py-2 bg-gray-100 dark:bg-dark800 w-fit mt-2 cursor-pointer">
                                    <div className="bg-[#5E78DE] w-5 h-5 flex justify-center items-center rounded-full">
                                        <FontAwesomeIcon icon={["fab", "fa-ethereum"]} className="text-white" size="xs" />
                                    </div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-dark500">{shortenaddress(userAddress != null ? userAddress : "")}</p>
                                    {clipboardText != "" ? (
                                        <FontAwesomeIcon icon={['fas', 'fa-check']} className="text-green-500 dark:text-dark500" size="xs" />
                                    ) : (
                                        <FontAwesomeIcon icon={['fas', 'fa-copy']} className="text-gray-500 dark:text-dark500" size="xs" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex md:hidden flex-none">
                            <Credits userAddress={userAddress} />
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-4">
                        <div className="hidden md:flex flex-none">
                            <Credits userAddress={userAddress} />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <a className="flex justify-center items-center w-10 h-10 bg-gray-200 dark:bg-dark800 border dark:border-dark700 rounded-2xl" href={"https://opensea.io/" + userAddress} target="_blank">
                                {darkMode ? (
                                    <img src={OpenseaLogo} className="w-10 h-10" />
                                ) : (
                                    <img src={OpenseaDarkLogo} className="w-10 h-10" />
                                )}
                            </a>
                            <a className="flex justify-center items-center w-10 h-10 bg-gray-200 dark:bg-dark800 border dark:border-dark700 rounded-2xl" href={"https://etherscan.io/address/" + userAddress} target="_blank">
                                {darkMode ? (
                                    <img src={EtherscanLogo} className="w-10 h-10" />
                                ) : (
                                    <img src={EtherscanDarkLogo} className="w-10 h-10" />
                                )}
                            </a>
                        </div>
                        <div className="flex flex-none justify-end">
                            {userAddress?.toLowerCase() == address?.toLowerCase() ? (
                                <button className="bg-main text-white px-4 py-2 rounded-full flex items-center gap-x-2 flex-none" onClick={() => setPrimaryVisible(true)}>
                                    <p className="text-sm font-semibold">Primary name</p>
                                    <FontAwesomeIcon icon={['fas', 'fa-arrow-right']} className="text-sm" />
                                </button>
                            ) : (
                                (null)
                            )}
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 mt-8">
                    <div>
                        <p className="text-2xl font-semibold">{names.length}</p>
                        <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">total names owned</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">-</p>
                        <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">total names listed</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">-</p>
                        <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">primary name set</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">-</p>
                        <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">last activity</p>
                    </div>

                </div>

                {/* <button className="bg-zinc-400 text-white px-4 py-2 rounded-2xl mt-8" onClick={() => init()}>Init</button> */}
                <div className="flex items-center gap-x-2 border-b-2 border-black dark:border-white w-fit mt-8 pb-2">
                    <FontAwesomeIcon icon={['fas', 'box']} className="text-black dark:text-white text-md" />
                    <p className="text-md font-bold text-black dark:text-white">Collected</p>
                </div>
                <PrimaryName isOpen={primaryVisible} setIsOpen={setPrimaryVisible} names={names} />
            </div>
        </div>
    );

}

export default MyNamesUpper;

const Credits = ({ userAddress }) => {
    const [credits, setCredits] = useState(0);
    const [creditsLoading, setCreditsLoading] = useState(true);

    async function init() {
        setCreditsLoading(true);
        let result = await callW3Api("/presale/credits/get", { address: userAddress });
        console.log(result);
        setCredits(result);
        setCreditsLoading(false);
    }

    useEffect(() => {
        if (userAddress != null && userAddress != "") {
            init()
        }
    }, [userAddress])

    return (
        <div>
            {creditsLoading ? (
                null
            ) : (
                credits?.creditsLeft > 0 ? (
                    <div className="w-fit px-4 py-2 bg-[#1d2042] text-blue-500 rounded-2xl">
                        <p className="text-md font-bold text-center">{formatinusd(credits.creditsLeft)}</p>
                        <p className="text-sm text-center">in credits</p>
                    </div>
                ) : (
                    null
                )
            )}
        </div>
    )
}