import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BgImg from "../../1.resources/3.files/images/bg2.png";
import Footer from "../0.global/footer/footer";
import { useAccount, useSigner } from "wagmi";
import { ConnectWallet } from "../0.global/wallet/connectWallet";
import { callW3Api, getDomain, getWnsDomain } from "../../1.resources/2.js/0.global/3.api/callW3Api";
import { shortenaddress } from "../../1.resources/2.js/0.global/0.smallfunctions/global";
import CloudContracts from "../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { calculateZeroes } from "../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import { getCloudProvider } from "../../1.resources/2.js/0.global/2.contracts/cloudProvider";
import { timeToString } from "../../1.resources/2.js/0.global/0.smallfunctions/time";
import Header from "../0.global/header/header";
import EmptyImg from "../../1.resources/3.files/images/empty_nft.png";
import { colors } from "../../1.resources/1.css/colors";
import { GlobalParams } from "../0.wrapper/darkMode";
import BlankBg from "../../1.resources/3.files/images/blank33.png";
import { ethers } from "ethers";
import { Variables } from "../../1.resources/2.js/0.global/2.contracts/variables";
import UpperTabs from "./partials/upperTabs";
import makeBlockie from 'ethereum-blockies-base64';
import { zeroAddress } from "../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import MyNamesUpper from "./upper/upper";
import MyNamesLower from "./lower/lower";
import ConnectDialog from "../0.global/wallet/connectDialog";

const MyNames = ({ }) => {
    let { address } = useAccount();
    const { data: signer } = useSigner()
    const [isLoading, setIsLoading] = useState(true);
    const [userAddress, setUserAddress] = useState("");
    const [domain, setDomain] = useState("");
    const { darkMode, toggleDarkMode } = GlobalParams();

    useEffect(() => {
        document.title = "My Names - DOT APE";
        if (window.location.pathname.includes("mynames")) {
            if (address) {
                setUserAddress(address);
                getDomain(address).then((res) => {
                    setDomain(res);
                })
            }
        }
        if (window.location.pathname.includes("/address/")) {
            let add = window.location.pathname.split("/address/")[1];
            setUserAddress(add);
            getDomain(add).then((res) => {
                setDomain(res);
            }
            )
        }
    }, [address])

    useEffect(() => {
        if (domain != "" && domain != "null" && domain != null) {
            document.title = domain + " (" + shortenaddress(userAddress) + ") - DOT APE";
        } else {
            document.title = shortenaddress(userAddress) + " - DOT APE";
        }
    }, [userAddress, domain])


    return (
        <div className="bg-white dark:bg-zinc-900 text-black dark:text-white h-full flex flex-col justify-between">

            {userAddress != "" && userAddress != "null" && userAddress != null ? (
                <Main userAddress={userAddress} domain={domain} />
            ) : (
                <ConnectDialog />
            )}

        </div >
    );

}

export default MyNames;


const Main = ({ userAddress, domain }) => {
    const [names, setNames] = useState([]);
    const { darkMode, toggleDarkMode } = GlobalParams();
    let { address } = useAccount();

    return (
        <div>
            <MyNamesUpper names={names} userAddress={userAddress} domain={domain} />
            <MyNamesLower names={names} userAddress={userAddress} setNames={setNames} />
        </div>
    )
}