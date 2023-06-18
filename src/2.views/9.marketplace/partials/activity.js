import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { shortenaddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/global";
import OpenseaLogo from "../../../1.resources/3.files/images/opensea_gray.png";
import EtherscanLogo from "../../../1.resources/3.files/images/etherscan_gray.png";
import OpenseaDarkLogo from "../../../1.resources/3.files/images/opensea_darkgray.png";
import EtherscanDarkLogo from "../../../1.resources/3.files/images/etherscan_darkgray.png";
import { collectionAddress, zeroAddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import { GlobalParams } from "../../0.wrapper/darkMode";
import Logo from "../../../1.resources/3.files/logo/logobg.png";
import UpperTabs from "../../7.mynames/partials/upperTabs";
import InfiniteScroll from 'react-infinite-scroll-component';
import CloudContracts from "../../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { timeToString } from "../../../1.resources/2.js/0.global/0.smallfunctions/time";
import { callW3Api, getDomain } from "../../../1.resources/2.js/0.global/3.api/callW3Api";
import { VscVerifiedFilled } from "react-icons/vsc";

const Activity = ({ }) => {
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [cursor, setCursor] = useState("");

    async function fetchNext() {
        console.log("fetching next");

        let result = await (await fetch(`https://deep-index.moralis.io/api/v2/nft/0x3679f68709DDA61c8CBd5FEF301C7C92B90c423d/transfers?chain=eth&format=decimal&limit=20&cursor=${cursor}`, {
            headers: {
                Accept: "application/json",
                "X-Api-Key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImNiMmVmZDJjLTdjNWYtNGFlMC04NThmLWMzMjY0N2RiNDFiMSIsIm9yZ0lkIjoiMTQ0MjE2IiwidXNlcklkIjoiMTQzODYxIiwidHlwZUlkIjoiMTQyYzUxYWEtYmRhYi00MjkyLWE0NDctODY1YWY1NDNjNTEzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODY4Njg1ODcsImV4cCI6NDg0MjYyODU4N30.q34uo6fwK30ufvnTmgfiOuFaQyBckCeO1fRGDllneXA"
            }
        })).json();
        console.log(result);
        if (result.result.length > 0) {
            setCursor(result.cursor);

            setItems(prevItems => [...prevItems, ...result.result]);
        } else {
            setHasMore(false);
        }

        console.log(result);

        console.log("fetched");
    }

    useEffect(() => {
        fetchNext();
    }, []);

    let headings = [
        "Type", "Item", "From", "To", "Time"
    ]
    return (
        <div>
            <InfiniteScroll
                dataLength={items.length}
                next={fetchNext}
                hasMore={hasMore}
                scrollableTarget="scrollableDiv"
                loader={<ActivitySkeleton />}
                scrollThreshold={0.5}
            >
                <div className="min-w-[900px] mt-2 w-full h-full">
                    <div className="w-full flex items-center gap-x-8 py-4 border-b border-dark800">
                        {headings.map((name, index) => (
                            <div key={index} className={index == 0 || index == 4 ? "w-2/12" : index == 1 ? "w-4/12" : "w-3/12"}>
                                <p className="text-md text-gray-500 dark:text-dark500 font-semibold">{name}</p>
                            </div>
                        ))}
                    </div>
                    {items.map((name, index) => (
                        <div key={index} className="w-full" >
                            <ActivityMapping item={name} />
                        </div>
                    ))}
                </div>
            </InfiniteScroll >
            <ActivitySkeleton />
        </div >
    )
}

export default Activity;

const ActivityMapping = ({ item }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/metadata/db?tokenid=" + item.token_id).then((result) => {
            result.json().then((result) => {
                setMetadata(result);
            })
        })
    }, [])

    return (
        <div className="flex items-center gap-x-8 py-4 border-b border-dark800">
            <div className="flex items-center gap-x-2 w-2/12">
                {item.from_address == zeroAddress ? (
                    <FontAwesomeIcon icon={['fas', 'fa-bolt-lightning']} className="text-dark500 text-md" />
                ) : (
                    <FontAwesomeIcon icon={['fas', 'fa-arrow-right']} className="text-dark500 text-md" />
                )}
                <p className="text-md text-gray-500 dark:text-dark500">{item.from_address == zeroAddress ? "Minted" : "Transferred"}</p>
            </div>
            <a className="flex items-center gap-x-4 w-4/12" href={"/name/" + metadata?.name?.split(".")[0]}>
                <img src={metadata?.image} className="w-16 h-16 rounded-lg" style={{ display: imageLoaded ? "block" : "none" }} onLoad={() => setImageLoaded(true)} />
                <div className="animate-pulse rounded-lg w-16 h-16 bg-dark700" style={{ display: imageLoaded ? "none" : "block" }}></div>
                <div className="truncate">
                    <p className="text-lg font-semibold truncate">{metadata?.name}</p>
                    <p className="text-md text-gray-500 dark:text-dark500">#{item.token_id}</p>
                </div>
            </a>
            <div className="w-3/12">
                <GetDomain name={item.from_address} />
            </div>
            <div className="w-3/12">
                <GetDomain name={item.to_address} />
            </div>
            <a className="w-2/12 flex items-center gap-x-2" target="_blank" href={"https://etherscan.io/tx/" + item.transaction_hash}>
                <p className="text-main">{timeToString(new Date(item.block_timestamp).getTime())}</p>
                <FontAwesomeIcon icon={['fas', 'fa-chevron-right']} className="text-main text-md" />
            </a>
        </div>
    )
}

const GetDomain = ({ name }) => {
    const [domain, setDomain] = useState(null);
    const [verified, setVerified] = useState(null);
    useEffect(() => {
        if (name != zeroAddress) {
            getDomain(name).then((result) => {
                if (result != "null") {
                    setDomain(result);
                }
            })
        }
    }, [])

    useEffect(() => {
        if (name != zeroAddress) {
            callW3Api("/profile/get", { address: name }).then((result) => {
                setVerified(result?.verified);
            })
        }
    }, [])

    return (
        <a className="gap-x-2 flex items-center" href={"/address/" + name}>
            <p className="text-main">{domain == null ? shortenaddress(name) : domain}</p>
            {verified != null && verified != "null" && name != zeroAddress ? (
                <VscVerifiedFilled className={`${verified == "1" ? "text-main" : "text-main"} text-md`} />
            ) : (null)}
        </a>
    )
}


const ActivitySkeleton = ({ }) => {
    const [tokens, setTokens] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    return (
        <div className="mt-8 w-full ">
            {tokens.map((name, index) => (
                <div key={index} className="w-full animate-pulse py-8 bg-dark800 my-4" >

                </div>
            ))}
        </div>
    )
}