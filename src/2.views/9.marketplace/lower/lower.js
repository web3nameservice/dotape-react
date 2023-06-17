import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { shortenaddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/global";
import OpenseaLogo from "../../../1.resources/3.files/images/opensea_gray.png";
import EtherscanLogo from "../../../1.resources/3.files/images/etherscan_gray.png";
import OpenseaDarkLogo from "../../../1.resources/3.files/images/opensea_darkgray.png";
import EtherscanDarkLogo from "../../../1.resources/3.files/images/etherscan_darkgray.png";
import { collectionAddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import { GlobalParams } from "../../0.wrapper/darkMode";
import Logo from "../../../1.resources/3.files/logo/logobg.png";
import UpperTabs from "../../7.mynames/partials/upperTabs";
import InfiniteScroll from 'react-infinite-scroll-component';
import CloudContracts from "../../../1.resources/2.js/0.global/2.contracts/cloudContracts";

const MarketplaceLower = ({ names, setNames, supply }) => {
    const { darkMode } = GlobalParams();

    async function getNames(supply) {
        let totalSupply = supply;
        //let totalSupply = await CloudContracts().apeErc721Contract.totalSupply();
        let tokenIds = []
        for (let i = totalSupply; i >= 1; i--) {
            if (i == 1) {
                break;
            }
            tokenIds.push(i);
        }
        console.log(tokenIds);
        setNames(tokenIds);
    }

    useEffect(() => {
        console.log(supply);
        if (supply > 0) {
            getNames(supply);
        }
    }, [supply])

    return (
        <div id="about" className="w-full flex justify-center items-start pb-10 pt-4 bg-white dark:bg-zinc-900 min-h-screen border-t-2 border-zinc-200 dark:border-zinc-800">

            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">

                <div className="mt-0 ">
                    <UpperTabs />
                    {names.length > 0 ? (
                        <Names names={names} setNames={setNames} />
                    ) : (
                        <NamesSkeleton />
                    )}

                </div>
            </div>

        </div>
    );

}

export default MarketplaceLower;


const Names = ({ names, setNames }) => {
    const [namesLeft, setNamesLeft] = useState(names);
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    async function fetchNext() {
        console.log("fetching next");
        if (namesLeft.length === 0) {
            setHasMore(false);
        } else {
            let newItems = namesLeft.slice(0, 12);
            let remainingNames = namesLeft.slice(12);
            setItems([...items, ...newItems]);
            setNamesLeft(remainingNames);
        }
    }

    useEffect(() => {
        fetchNext();
    }, []);

    return (
        <div>
            {names.length > 0 ? (
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchNext}
                    hasMore={hasMore}
                    scrollableTarget="scrollableDiv"
                    loader={<NamesSkeleton />}
                    scrollThreshold={0.2}
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 mt-8 w-full ">
                        {items.map((name, index) => (
                            <div key={index} className="w-full " >
                                <NamesMap name={name} />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            ) : (null)}
        </div>
    )
}

const NamesMap = ({ name }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [metadata, setMetadata] = useState(null);
    const [alink, setAlink] = useState(null);

    async function init() {
        let metadata = await (await fetch(process.env.REACT_APP_API_URL + "/metadata/db?tokenid=" + name)).json();
        setMetadata(metadata);
        setAlink("/name/" + metadata?.name?.substring(0, metadata?.name?.indexOf(".")));
    }
    useEffect(() => {
        init();
    }, [])
    return (
        <a href={alink} className="w-full">
            <div className="bg-white dark:bg-dark800 border-2 dark:border border-gray-200 dark:border-dark700 rounded-2xl w-full" >
                <div className="flex justify-center items-center px-2 pt-2 w-full">
                    <img src={metadata?.image} className="rounded-xl" style={{ display: imageLoaded ? "block" : "none" }} onLoad={() => setImageLoaded(true)} />
                    <div className="animate-pulse rounded-xl w-full aspect-square bg-dark700" style={{ display: imageLoaded ? "none" : "block" }}></div>
                </div>
                <div className="w-full mt-4 px-3 pb-3">
                    <div className="flex justify-between items-center gap-x-4">
                        <p className="text-md text-main text-gray-500 dark:text-dark500">Name</p>
                        <p className="text-md font-semibold truncate">{metadata != null ? metadata.name : "-"}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2 gap-x-4">
                        <p className="text-md text-main text-gray-500 dark:text-dark500 truncate">Expiration</p>
                        <p className="text-md font-semibold text-gray-500 dark:text-dark500 truncate">-</p>
                    </div>
                </div>
                <div className="pb-10 border-t-2 dark:border-t border-gray-200  dark:border-dark700">
                </div>
            </div>
        </a>
    )
}

export const NamesSkeleton = ({ }) => {
    const [tokens, setTokens] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 mt-8 w-full ">
            {tokens.map((name, index) => (
                <div key={index} className="w-full " >
                    <div className="bg-white dark:bg-dark800 border-2 dark:border border-gray-200 dark:border-dark700 rounded-2xl w-full" >
                        <div className="flex justify-center items-center px-2 pt-2 w-full">
                            <div className="animate-pulse rounded-xl w-full aspect-square bg-dark700" style={{}}></div>
                        </div>
                        <div className="w-full mt-4 px-3 pb-3">
                            <div className="flex justify-between items-center">
                                <p className="text-md text-main text-gray-500 dark:text-dark500">Name</p>
                                <p className="text-md font-semibold ">{"-"}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-md text-main text-gray-500 dark:text-dark500">Expiration</p>
                                <p className="text-md font-semibold text-gray-500 dark:text-dark500">-</p>
                            </div>
                        </div>
                        <div className="pb-10 border-t-2 dark:border-t border-gray-200  dark:border-dark700">
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}