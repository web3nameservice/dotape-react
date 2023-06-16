import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InfiniteScroll from 'react-infinite-scroll-component';
import UpperTabs from "../../7.mynames/partials/upperTabs";
import CloudContracts from "../../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { currentEthPrice } from "../../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import { zeroAddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/prepends";

const CategoryLower = ({ names, setNames }) => {



    return (
        <div>
            <div id="about" className="min-w-screen flex justify-center items-start pb-10 pt-4 bg-white dark:bg-zinc-900 min-h-screen border-t-2 border-zinc-200 dark:border-zinc-800">

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
        </div >
    );

}

export default CategoryLower;


const Names = ({ names, setNames }) => {
    const [namesLeft, setNamesLeft] = useState(names);
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [ethPrice, setEthPrice] = useState(0);
    async function fetchNext() {
        console.log("fetching next");
        if (namesLeft.length === 0) {
            setHasMore(false);
        } else {
            let newItems = namesLeft.slice(0, 12);
            let remainingNames = namesLeft.slice(12);
            let isRegistered = await CloudContracts().apeResolverContract.resolveNameBatch(newItems);

            newItems = newItems.map((name, index) => {
                return {
                    name: name,
                    owner: isRegistered[index]
                }
            })
            setItems(prevItems => [...prevItems, ...newItems]);
            setNamesLeft(remainingNames);
        }
        console.log("fetched");
    }

    useEffect(() => {
        fetchNext();
    }, []);

    useEffect(() => {
        currentEthPrice().then(price => {
            setEthPrice(price);
        })
    }, [])
    return (
        <div>
            <InfiniteScroll
                dataLength={items.length}
                next={fetchNext}
                hasMore={hasMore}
                scrollableTarget="scrollableDiv"
                loader={<NamesSkeleton />}
                scrollThreshold={0.2}
            >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 mt-8 w-full h-full">
                    {items.map((name, index) => (
                        <div key={index} className="w-full " >
                            <NamesMap name={name} ethPrice={ethPrice} />
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div >
    )
}

const NamesMap = ({ name, ethPrice }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [metadata, setMetadata] = useState(null);
    const [alink, setAlink] = useState(null);

    function getRegistrationCost() {
        let usd;
        if (name.name.length == 3) {
            usd = 640;
        } else if (name.name.length == 4) {
            usd = 120;
        } else if (name.name.length == 5) {
            usd = 50;
        } else if (name.name.length >= 6) {
            usd = 10;
        }
        return (usd / ethPrice).toFixed(4);
    }

    return (
        <a href={"/name/" + name.name} className="w-full">
            <div className="bg-white dark:bg-dark800 border-2 dark:border border-gray-200 dark:border-dark700 rounded-2xl w-full" >
                <div className="flex justify-center items-center px-2 pt-2 w-full">
                    <img src={process.env.REACT_APP_API_URL + "/metadata/generateimage=" + name.name + ".ape"} className="rounded-xl" style={{ display: imageLoaded ? "block" : "none" }} onLoad={() => setImageLoaded(true)} />
                    <div className="animate-pulse rounded-xl w-full aspect-square bg-dark700" style={{ display: imageLoaded ? "none" : "block" }}></div>
                </div>
                <div className="w-full mt-4 px-3 pb-3">
                    <div className="flex justify-between items-center">
                        <p className="text-md text-main text-gray-500 dark:text-dark500 ">Name</p>
                        <p className="text-md font-semibold truncate">{name.name + ".ape"}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2 gap-x-4">
                        <p className="text-md text-main text-gray-500 dark:text-dark500">Price</p>
                        <p className={`text-md text-end font-semibold truncate ${name.owner != zeroAddress ? 'text-gray-500 dark:text-dark500' : 'text-black dark:text-white'}`}>{name.owner != zeroAddress ? "Registered" : getRegistrationCost() + " ETH"}</p>
                    </div>
                </div>
                <div className="pb-10 border-t-2 dark:border-t border-gray-200  dark:border-dark700">
                </div>
            </div>
        </a>
    )
}

const NamesSkeleton = ({ }) => {
    const [tokens, setTokens] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    return (
        <div className="grid grid-cols-4 gap-10 mt-8 w-full ">
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