import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BgImg from "../../1.resources/3.files/images/bg2.png";
import Footer from "../0.global/footer/footer";
import { useAccount, useSigner } from "wagmi";
import { ConnectWallet } from "../0.global/wallet/connectWallet";
import { MoralisApi, callW3Api, callW3ExplorerApi, getDomain, getWnsDomain } from "../../1.resources/2.js/0.global/3.api/callW3Api";
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
import OpenseaLogo from "../../1.resources/3.files/images/opensea_gray.png";
import EtherscanLogo from "../../1.resources/3.files/images/etherscan_gray.png";
import OpenseaDarkLogo from "../../1.resources/3.files/images/opensea_darkgray.png";
import EtherscanDarkLogo from "../../1.resources/3.files/images/etherscan_darkgray.png";
import makeBlockie from 'ethereum-blockies-base64';
import { zeroAddress } from "../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import UpperTabs from "../7.mynames/partials/upperTabs";
import Logo from "../../1.resources/3.files/logo/logobg.png";
import { name } from "lodash.merge";
import MarketplaceUpper from "./upper/upper";
import MarketplaceLower from "./lower/lower";

const collectionAddress = "0x3679f68709DDA61c8CBd5FEF301C7C92B90c423d";

const Marketplace = ({ }) => {
    let { address } = useAccount();
    const { data: signer } = useSigner()
    const [isLoading, setIsLoading] = useState(true);
    const { darkMode, toggleDarkMode } = GlobalParams();

    useEffect(() => {
        document.title = "Marketplace - DOT APE";
    }, [])

    return (
        <div className="bg-white dark:bg-zinc-900 text-black dark:text-white h-full flex flex-col justify-between">
            <Main />
        </div >
    );

}

export default Marketplace;

const Main = ({ }) => {
    const [names, setNames] = useState([]);
    const { darkMode, toggleDarkMode } = GlobalParams();
    let { address } = useAccount();
    const [owners, setOwners] = useState(0);
    const [supply, setSupply] = useState(0);

    async function init() {
        console.time("getNames");
        let url = "https://api.opensea.io/api/v1/collection/dot-ape-domains/stats"
        let stats = (await (await fetch("https://api.opensea.io/api/v1/collection/dot-ape-domains/stats", {
            headers: {
                Accept: "application/json",
                "X-Api-Key": "a4fe8c6e08874716ab2db84cab28fb44"
            }
        })).json()).stats;
        console.timeEnd("getNames");
        console.log(stats);
        let supplyResult = parseFloat(stats.total_supply);
        setSupply(supplyResult);
        setOwners(stats.num_owners.toLocaleString('en-US'));
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <div>
            <MarketplaceUpper names={names} owners={owners} />
            <MarketplaceLower names={names} setNames={setNames} supply={supply} />
        </div>
    )
}

