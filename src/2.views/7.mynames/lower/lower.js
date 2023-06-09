import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { shortenaddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/global";
import { GlobalParams } from "../../0.wrapper/darkMode";
import Logo from "../../../1.resources/3.files/logo/logobg.png";
import UpperTabs from "../../7.mynames/partials/upperTabs";
import InfiniteScroll from 'react-infinite-scroll-component';
import CloudContracts from "../../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { BlockiesGif } from "../../0.global/wallet/connectDialog";
import { useAccount, useSigner } from "wagmi";
import { NamesSkeleton } from "../../9.marketplace/partials/names";

const MyNamesLower = ({ names, setNames, userAddress }) => {
    const { address } = useAccount();
    const { darkMode } = GlobalParams();
    const [namesLoading, setNamesLoading] = useState(true);
    async function init(userAddress) {
        console.time("get all tokens");
        let result = await CloudContracts().apeResolverContract.getAllTokensOfOwner(userAddress);
        console.timeEnd("get all tokens");
        console.log(result);
        setNames(result);
        setNamesLoading(false);
    }

    useEffect(() => {
        console.log(userAddress);
        if (userAddress != "" && userAddress != "null" && userAddress != null) {
            init(userAddress);
        }
    }, [userAddress])

    return (
        <div id="about" className="w-full flex justify-center items-start pb-10 pt-4 bg-white dark:bg-zinc-900 min-h-screen border-t-2 border-zinc-200 dark:border-zinc-800">

            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">

                <div className="mt-0 ">

                    {namesLoading ? (
                        <div>
                            <UpperTabs />
                            <NamesSkeleton />
                        </div>
                    ) : (
                        names.length > 0 ? (
                            <div>
                                <UpperTabs />
                                <Names userAddress={userAddress} names={names} setNames={setNames} />
                            </div>
                        ) : (
                            <div className="flex justify-start items-start w-full h-full">
                                <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-dark800 w-full py-16 px-16 md:px-20 mt-6 rounded-2xl" style={{}}>
                                    <div className="block md:flex items-center gap-x-10">
                                        <BlockiesGif />
                                        <div>
                                            <p className="text-2xl font-bold mt-8 md:mt-0">Oops, no names found!</p>
                                            <p className="text-md text-dark500 mt-2">{address?.toLowerCase() == userAddress?.toLowerCase() ? "Try registering a name for your collection" : "User has no names in their collection"}</p>
                                            {address?.toLowerCase() == userAddress?.toLowerCase() ? (
                                                <div className="text-main font-semibold flex items-center gap-x-2 mt-6 md:mt-3" onClick={() => window.location = "/search"}>
                                                    <p>Search</p>
                                                    <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-main" />
                                                </div>
                                            ) : (null)}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                    }
                </div>
            </div>

        </div>
    );

}

export default MyNamesLower;


const Names = ({ userAddress, names, setNames }) => {
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
                        {names.map((name, index) => (
                            <div key={index} className="w-full " >
                                <NamesMap name={name} />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            ) : (
                null
            )
            }
        </div >
    )
}

const NamesMap = ({ name }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [metadata, setMetadata] = useState(null);
    const [alink, setAlink] = useState(null);

    async function init() {
        let metadata = await (await fetch(process.env.REACT_APP_API_URL + "/metadata/db?tokenid=" + name.tokenId)).json();
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