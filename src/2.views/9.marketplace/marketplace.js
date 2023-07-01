import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useAccount, useSigner } from "wagmi";
import { GlobalParams } from "../0.wrapper/darkMode";
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
    const [tabSelected, setTabSelected] = useState("items");

    async function init() {
        console.time("getNames");
        let url = "https://api.opensea.io/api/v1/collection/dot-ape-domains/stats"
        // let stats = (await (await fetch("https://api.opensea.io/api/v1/collection/dot-ape-domains/stats", {
        //     headers: {
        //         Accept: "application/json",
        //         "X-Api-Key": "a4fe8c6e08874716ab2db84cab28fb44"
        //     }
        // })).json()).stats;
        // console.timeEnd("getNames");
        // console.log(stats);
        // let supplyResult = parseFloat(stats.total_supply);
        // setSupply(supplyResult);
        // setOwners(stats.num_owners.toLocaleString('en-US'));
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <div>
            <MarketplaceUpper names={names} owners={owners} tabSelected={tabSelected} setTabSelected={setTabSelected} />
            <MarketplaceLower names={names} setNames={setNames} supply={supply} tabSelected={tabSelected} />
        </div>
    )
}

