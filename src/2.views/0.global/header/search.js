import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CloudContracts from "../../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { colors } from "../../../1.resources/1.css/colors";
import makeBlockie from "ethereum-blockies-base64";
import { zeroAddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import Logo from "../../../1.resources/3.files/logo/logobg.webp";
import { currentEthPrice, ethToUsd, usdToEth } from "../../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import { ethers } from "ethers";
import { callW3Api, getDomain } from "../../../1.resources/2.js/0.global/3.api/callW3Api";
import { shortenaddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/global";
import { VscVerifiedFilled } from "react-icons/vsc";
const punycode = require('punycode/');

class HeaderSearch extends React.Component {

    componentDidMount() {
        document.getElementById("headerSearchModal").style.width = document.getElementById("headerSearch").offsetWidth + "px";
    }
    render() {
        return (
            <HeaderSearchFunc />
        )
    }
}


export default HeaderSearch;


const HeaderSearchFunc = ({ }) => {
    const [ethPrice, setEthPrice] = useState(0);
    const [cost, setCost] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [searchActive, setSearchActive] = useState(false)
    const [searchDomain, setSearchDomain] = useState("")
    const [isSearchAddress, setIsSearchAddress] = useState(false)
    const [searchStatus, setSearchStatus] = useState(0)
    const [searchLoading, setSearchLoading] = useState(false)

    const [searchAddresses, setSearchAddresses] = useState([]);

    async function searchBar(value) {
        console.log(value);
        setSearchValue(value.toLowerCase());
        searchName(value);
        searchAccount(value);
    }

    async function searchAccount(value) {
        setSearchAddresses([]);

        if (value.substring(0, 2) == "0x") {
            let result = isValidChecksum(value);
            if (result != "null") {
                setSearchAddresses([{ resolver: "0x", address: result }]);
                setSearchActive(true);
            }
        } else {
            let result = await (await fetch(process.env.REACT_APP_API_URL + "/resolve/name?name=" + value + ".ape")).json();
            console.log(result);
            if (result.value.length > 0) {
                setSearchAddresses(result.value);
                setSearchActive(true);
            }
        }
    }

    useEffect(() => {
        console.log(searchAddresses);
    }, [searchAddresses])

    async function searchName(value) {
        setIsSearchAddress(false);
        if (isValidChecksum(value) == "null") {
            value = value.split(".")[0].replaceAll(" ", "").replaceAll(".", "").toLowerCase();
            if (value.length == 0) {
                setSearchActive(false);
            } else {
                setSearchActive(true);
            }
            setSearchLoading(true);
            setSearchDomain(value);
            setDomainCost(value);
            let status;
            if (value.length < 3 || value.length > 15) {
                status = 0;
            } else {
                let tokenId = await CloudContracts("eth", process.env.REACT_APP_NETWORK, "full").apeResolverContract.resolveNameToTokenId(value);
                if (tokenId != 0) {
                    status = 1;
                } else {
                    status = 2;
                }
            }
            setSearchStatus(status);
            setSearchLoading(false);
        } else {
            setIsSearchAddress(true);
        }
    }

    async function setDomainCost(value) {
        let cost = await getUsdCost(value);
        cost = (1 / ethPrice) * cost;
        setCost(cost);
    }

    useEffect(() => {
        document.body.addEventListener('click', (event) => {
            try {
                let ids = []
                event.path.map((item) => {
                    ids.push(item.id);
                })
                if (!ids.includes("searchButton") && !ids.includes("searchDiv")) {
                    try {
                        setSearchActive(false);
                    } catch (e) { }
                }
            } catch (e) { }
        });
    }, [])

    useEffect(() => {
        currentEthPrice().then((res) => {
            setEthPrice(res);
        })
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            window.location = "/name/" + (searchDomain.replace(" ", "")).toLowerCase();
        }
    }
    return (
        <div id="searchDiv" className="w-full">
            <div className="bg-white dark:bg-dark800 rounded-xl flex flex-between items-center border-2 border-gray-200 dark:border-dark700" style={{ zIndex: "100000" }} id="headerSearch">
                <FontAwesomeIcon icon={['fas', 'fa-search']} className="pl-4 text-gray-500 dark:text-dark500" />
                <input id="searchInput" type="text" onChange={(e) => { searchBar(e.target.value) }} onKeyDown={handleKeyDown} value={searchValue} placeholder="Search domains, and accounts" className="bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-dark500 w-full outline-none pl-4 py-3 text-md" ></input>
                <FontAwesomeIcon icon={['fas', 'fa-angle-right']} className="pr-4 text-gray-500 dark:text-dark500" />
            </div>
            <div id="" style={{}} className="w-full">
                <div className="rounded-xl border-2 border-gray-200 dark:border-dark700 rounded-xl mt-2 bg-white dark:bg-dark800 z-10 absolute drop-shadow-lg pt-2 pb-4 px-2" id="headerSearchModal" style={{ display: searchActive ? "block" : "none" }}>
                    {!isSearchAddress ? (
                        <div className="w-full mt-2">
                            <p className="text-xs text-gray-400 dark:text-dark500 font-bold px-4 py-2">DOMAINS</p>
                            <a className="bg-white dark:bg-dark800 hover:bg-neutral-100 cursor-pointer flex justify-between items-center text-sm px-4 py-2 rounded-b-xl w-full" href={"/name/" + searchDomain}>
                                <div style={{ width: "70%" }} className="flex items-center gap-x-3">
                                    <img src={Logo} className="w-10 h-10 bg-black rounded-lg" />
                                    <div className="overflow-x-hidden">
                                        <p className="truncate overflow-x-hidden">
                                            <span className="font-semibold text-black dark:text-white text-lg truncate">{searchDomain}</span>
                                            <span className="text-black dark:text-white text-lg">.ape</span>
                                        </p>
                                        <p className="text-black dark:text-dark500 text-md">{cost == 0 ? "-" : searchStatus == 1 ? "-" : cost.toFixed(4)} ETH</p>
                                    </div>
                                </div>
                                <div className="flex flex-end">
                                    {searchLoading ? (
                                        <FontAwesomeIcon icon={['fas', 'fa-circle-notch']} style={{ color: "#606060", fontSize: "100%" }} id="arrowicon" spin />
                                    ) : (
                                        <div className="flex items-center gap-x-2">
                                            <FontAwesomeIcon icon={['fas', 'fa-circle']} className={searchStatus == "0" ? "text-dark500" : searchStatus == "2" ? "text-yellow-500" : "text-main"} size="2xs" />
                                            <p className={`font-semibold ${searchStatus == "0" ? "text-dark500" : searchStatus == "2" ? "text-yellow-500" : "text-main"}`}>{searchStatus == 0 ? "Invalid" : searchStatus == "2" ? "Available" : "Registered"}</p>
                                        </div>
                                    )}
                                </div>
                            </a>
                        </div>
                    ) : (null)}

                    {searchAddresses.length > 0 ? (
                        <div className="w-full mt-2">
                            <p className="text-xs text-gray-400 dark:text-dark500 font-bold px-4 py-2">ACCOUNTS</p>
                            {searchAddresses.map((item, index) => (
                                <div key={index}>
                                    <Accounts item={item} searchValue={searchValue} />
                                </div>
                            ))}
                        </div>
                    ) : (null)}


                </div>
            </div>
        </div >
    );

}

const Accounts = ({ item, searchValue }) => {
    const [profile, setProfile] = useState(null);
    const [image, setImage] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [primaryName, setPrimaryName] = useState(null);

    async function getProfile(address) {
        let result = await callW3Api("/profile/get", { address: address });
        console.log(result);
        setProfile(result);
        if (result?.profile_image_url != null && result?.profile_image_url != "" && !result?.profile_image_url.includes("opensea-static")) {
            setImage(result.profile_image_url);
        }
        // if (result?.profile_img_url != null && result?.profile_img_url != "" && !result?.profile_img_url.includes("opensea-static")) {
        //     setImage(result.profile_img_url);
        // }
        setRefresh(refresh + 1);
    }

    async function getPrimaryName(address) {
        if (item.resolver != "0x") {
            setPrimaryName(searchValue.split(".")[0] + item.resolver);
        } else {
            let result = await getDomain(address);
            console.log(result);
            if (result != "null") {
                setPrimaryName(result);
            }
        }
    }

    useEffect(() => {
        setProfile(null);
        setImage(null);
        if (item != "" && item != null && item != "null") {
            getProfile(item.address);
            getPrimaryName(item.address);
        }
    }, [item])



    return (
        <a className="bg-white dark:bg-dark800 hover:bg-neutral-100 cursor-pointer flex justify-between items-center text-sm px-4 py-2 rounded-b-xl w-full" href={"/address/" + item.address}>
            <div style={{ width: "70%" }} className="flex items-center gap-x-3">
                <img src={image != null ? image : makeBlockie(item.address == null ? zeroAddress : item.address)} className="w-10 h-10 bg-black rounded-lg" key={refresh} />
                <div>
                    <div className="flex items-center gap-x-2">
                        <p className="font-semibold text-black dark:text-white text-lg">{primaryName == null ? shortenaddress(item.address) : primaryName.split(".")[0]}</p>
                        {profile?.verified != null ? (profile?.verified != "null" ? (
                            <VscVerifiedFilled className={`${profile?.verified == "1" ? "text-main" : "text-main"} text-lg`} />
                        ) : (null)) : (null)}
                    </div>
                    <p className="text-black dark:text-dark500 text-md">@{primaryName == null ? shortenaddress(item.address) : primaryName}</p>
                </div>
            </div>
        </a>
    )
}

async function getUsdCost(name) {
    if (name.length == 3) {
        return 640;
    } else if (name.length == 4) {
        return 120;
    } else if (name.length == 5) {
        return 50;
    } else if (name.length >= 6) {
        return 10;
    } else {
        return 0;
    }
}

function isValidChecksum(address) {
    try {
        return ethers.utils.getAddress(address);
    } catch (e) {
        return "null";
    }
}