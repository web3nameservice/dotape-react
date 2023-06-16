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
import AdamApe from "../../1.resources/3.files/images/nft/adam.webp";
import PranApe from "../../1.resources/3.files/images/nft/pran.webp";
import AdamdyorApe from "../../1.resources/3.files/images/nft/adamdyor.webp";
import VincentApe from "../../1.resources/3.files/images/nft/vincent.webp";
import EmptyImg from "../../1.resources/3.files/images/empty_nft.png";
import LoginModal from "../0.global/wallet/loginSignature";
import { LoginParams } from "../0.wrapper/login";

const Generator = ({ walletConnected, setWalletConnected }) => {
    let { address } = useAccount();
    const defaultTokenId = 8562;
    const defaultName = "adam";
    const [tokenId, setTokenId] = useState(defaultTokenId);
    const [name, setName] = useState(defaultName);
    const [image, setImage] = useState(AdamApe);
    const [imgLoading, setImgLoading] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [versionSelected, setVersionSelected] = useState(1);
    const [refresh, setRefresh] = useState(0);
    const [collection, setCollection] = useState("bayc");
    const { setLoginModalOpen } = LoginParams();

    useEffect(() => {
        document.title = "Avatars - DOT APE";
    }, [])

    function changeTokenId(e) {
        console.log(e.target.value);
        if (e.target.value == "" || e.target.value == null || e.target.value == undefined || e.target.value < 0) {
            setTokenId("");
        } else {
            setTokenId(e.target.value);
        }
    }

    function changeName(e) {
        console.log(e.target.value);
        if (e.target.value == "" || e.target.value == null || e.target.value == undefined || e.target.value.length > 20 || e.target.value.includes(".") || e.target.value.includes(" ")) {
            setName("");
        } else {
            setName(e.target.value);
        }
    }

    // async function checkSignature() {
    //     let signature = localStorage.getItem("accountSignature");
    //     console.log("signature", signature);
    //     if (signature == null || signature == "" || signature == undefined || signature == "null") {
    //         setLoginModalOpen(true);
    //     }

    // }

    async function generate() {
        if (name != "" && tokenId != "" && name.length >= 3) {
            let signature = localStorage.getItem("accountSignature");
            if (signature == null || signature == "" || signature == undefined || signature == "null") {
                setLoginModalOpen(true);
            } else {
                setImgLoading(true);
                setImgError(false);
                let signature = localStorage.getItem("accountSignature");
                let link;
                if (versionSelected == 1) {
                    link = process.env.REACT_APP_API_URL + `/generator/bg-name-color?collection=${collection}&tokenid=${tokenId}&name=${name}&signature=${signature}`
                } else {
                    link = process.env.REACT_APP_API_URL + `/generator/bg-name?collection=${collection}&tokenid=${tokenId}&name=${name}&signature=${signature}`
                }
                setImage(link);
                setRefresh(refresh + 1);
            }
        }
    }

    const handleOnload = () => {
        setImgLoading(false);
    }

    const handleOnError = () => {
        setImgLoading(false);
        setImage(EmptyImg);
        setImgError(true);
    }

    const changeVersion = (e) => {
        setVersionSelected(e.target.value);
    }

    const changeCollection = (e) => {
        if (e.target.value == 1) {
            setCollection("bayc");
        } else {
            setCollection("mayc");
        }
    }

    return (

        <div id="about" className="h-full flex justify-center items-start pb-10 pt-10 bg-white dark:bg-dark900 text-black dark:text-white">

            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">

                {/* <div>
                            <Banner />
                        </div> */}

                <div className="pt-0">
                    <p className="text-4xl font-bold text-start">Generate avatars</p>
                    <p className="text-md text-start pt-2 text-gray-500 dark:text-neutral-500">Generate avatars for your NFTs to share on social media</p>
                </div>

                <div className="mt-8 block lg:flex items-center">
                    <div className="w-full lg:w-6/12">
                        {imgLoading ? <div className="flex justify-center items-center w-full aspect-square bg-neutral-800">
                            <FontAwesomeIcon icon={['fas', 'circle-notch']} className="text-white text-2xl animate-spin" />
                        </div> : (null)}

                        {/* {!imgLoading ? ( */}
                        <img src={image} onLoad={handleOnload} onError={handleOnError} className="w-full rounded-2xl" style={{ display: imgLoading ? "none" : "block" }} key={refresh} />
                        {/* ) : (null)} */}

                        {imgLoading ? (null) : (
                            <p className="text-xs text-start pt-4 text-gray-500 dark:text-neutral-400">Right click and save image to download</p>
                        )}
                    </div>
                    <div className="w-full lg:w-6/12 px-0 lg:px-20 mt-10 lg:mt-0">
                        <p className="text-md text-gray-500 dark:text-neutral-400">Select version:</p>

                        <div className="flex items-center pt-2">
                            <select className="bg-zinc-100 dark:bg-dark800 border-2 border-zinc-200 dark:border-dark700 text-black dark:text-white text-lg w-full text-center rounded-xl py-2 outline-none" onChange={changeVersion}>
                                <option value="1">Matching Background</option>
                                <option value="2">.Ape Background</option>
                            </select>
                        </div>

                        <p className="text-md text-gray-500 dark:text-neutral-400 mt-10">Select collection:</p>
                        <div className="flex items-center pt-2">
                            <select className="bg-zinc-100 dark:bg-dark800 border-2 border-zinc-200 dark:border-dark700 text-black dark:text-white text-lg w-full text-center rounded-xl py-2" onChange={changeCollection}>
                                <option value="1">BAYC</option>
                                <option value="2">MAYC</option>
                            </select>
                        </div>

                        <p className="text-md text-gray-500 dark:text-neutral-400 mt-10">Enter your token id:</p>
                        <div className="flex items-center pt-2">
                            <input type="number" className="bg-zinc-100 dark:bg-dark800 border-2 border-zinc-200 dark:border-dark700 text-black dark:text-white text-lg w-full text-center rounded-xl py-2" value={tokenId} onChange={changeTokenId} />
                        </div>

                        <p className="text-md text-gray-500 dark:text-neutral-400 mt-10">Enter your .ape name:</p>
                        <div className="flex items-center pt-2">
                            <input type="text" className="bg-zinc-100 dark:bg-dark800 border-2 border-zinc-200 dark:border-dark700 text-black dark:text-white text-lg w-full text-center rounded-xl py-2" value={name} onChange={changeName} />
                        </div>
                        {imgError ? (
                            <div className="mt-10">
                                <p className="text-sm">We could not verify your ownership of this token.</p>
                            </div>
                        ) : (null)}
                        {address ? (
                            <div className="mt-10">
                                <p className="text-sm">In order to protect the IP rights of holders, only the NFT owner can generate an avatar for their token.</p>
                                <button type="button" onClick={() => generate()} className='bg-main text-white rounded-full p-3 px-4 text-sm whitespace-nowrap z-0 flex items-center gap-x-2 mt-6'>
                                    <p>Generate</p>
                                    <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-white text-sm" />
                                </button>
                            </div>
                        ) : (
                            <div className="mt-10">
                                <p className="text-sm">In order to protect the IP rights of holders, connect your wallet to verify that you own the NFT.</p>
                                <div className="mt-8">
                                    <ConnectWallet />
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>

    );

}

export default Generator;

const Banner = () => {
    const phrases = [
        { name: 'adam', token: '8562', image: AdamApe },
        { name: 'pran', token: '1547', image: PranApe },
        { name: 'halo', token: '1950', image: AdamdyorApe },
        { name: 'vincent', token: '3956', image: VincentApe },
    ]

    return (
        <div className="grid grid-cols-4 gap-x-8">
            {phrases.slice(0, 4).map((phrase, index) => (
                <div key={index} className="flex justify-center items-center">
                    <img src={phrase.image} className="w-full rounded-xl" />
                </div>
            ))}
        </div>
    )
}
