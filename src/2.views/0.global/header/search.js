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
import { callW3Api } from "../../../1.resources/2.js/0.global/3.api/callW3Api";
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

    const [searchStatus, setSearchStatus] = useState(0)
    const [searchLoading, setSearchLoading] = useState(false)

    const [searchAddress, setSearchAddress] = useState(null);

    async function searchBar(value) {
        console.log(value);
        setSearchValue(value.toLowerCase());
        searchName(value);
        searchAccount(value);
    }

    async function searchAccount(value) {
        setSearchAddress(null);
        let validAddress;
        if (value.includes(".ape")) {
            console.log("searching .ape");
            let result = await (await fetch(process.env.REACT_APP_API_URL + "/resolve/name?resolve=.ape&name=" + value)).json();
            if (result.value != "null") {
                validAddress = result.value;
            }
        } else if (value.includes(".eth")) {
            console.log("searching .eth");
            let result = await (await fetch(process.env.REACT_APP_API_URL + "/resolve/name?resolve=.eth&name=" + value)).json();
            if (result.value != "null") {
                validAddress = result.value;
            }
        } else if (value.includes(".web3")) {
            console.log("searching .web3");
            let result = await (await fetch(process.env.REACT_APP_API_URL + "/resolve/name?resolve=.web3&name=" + value)).json();
            if (result.value != "null") {
                validAddress = result.value;
            }
        } else if (value.substring(0, 2) == "0x") {
            let result = isValidChecksum(value);
            if (result != "null") {
                validAddress = result;
            }
        } else {
            let result = await (await fetch(process.env.REACT_APP_API_URL + "/resolve/name?resolve=.ape&name=" + value + ".ape")).json();
            console.log(result);
            if (result.value != "null") {
                validAddress = result.value;
            }
        }
        if (validAddress != null) {
            setSearchAddress(validAddress);
        }
    }

    async function searchName(value) {
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
                <input id="searchInput" type="text" onChange={(e) => { searchBar(e.target.value) }} onKeyDown={handleKeyDown} value={searchValue} placeholder="Search domains" className="bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-dark500 w-full outline-none pl-4 py-3 text-md" ></input>
                <FontAwesomeIcon icon={['fas', 'fa-angle-right']} className="pr-4 text-gray-500 dark:text-dark500" />
            </div>
            <div id="" style={{}} className="w-full">
                <div className="rounded-xl border-2 border-gray-200 dark:border-dark700 rounded-xl mt-2 bg-white dark:bg-dark800 z-10 absolute drop-shadow-lg py-4 px-2" id="headerSearchModal" style={{ display: searchActive ? "block" : "none" }}>
                    <div className="w-full">
                        <p className="text-xs text-gray-400 dark:text-dark500 font-bold px-4 py-2">DOMAINS</p>
                        <a className="bg-white dark:bg-dark800 hover:bg-neutral-100 cursor-pointer flex justify-between items-center text-sm px-4 py-2 rounded-b-xl w-full" href={"/name/" + searchDomain}>
                            <div style={{ width: "70%" }} className="flex items-center gap-x-3">
                                <img src={Logo} className="w-10 h-10 bg-black rounded-lg" />
                                <div>
                                    <p>
                                        <span className="font-semibold text-black dark:text-white text-lg">{searchDomain}</span>
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
                    <div className="w-full mt-2" style={{ display: searchAddress != null ? "block" : "none" }}>
                        <p className="text-xs text-gray-400 dark:text-dark500 font-bold px-4 py-2">ACCOUNTS</p>
                        <a className="bg-white dark:bg-dark800 hover:bg-neutral-100 cursor-pointer flex justify-between items-center text-sm px-4 py-2 rounded-b-xl w-full" href={"/address/" + searchAddress}>
                            <div style={{ width: "70%" }} className="flex items-center gap-x-3">
                                <img src={makeBlockie(searchAddress == null ? zeroAddress : searchAddress)} className="w-10 h-10 bg-black rounded-lg" />
                                <div>
                                    <p className="font-semibold text-black dark:text-white text-lg">{searchDomain}</p>
                                    <p className="text-black dark:text-dark500 text-md">@{searchDomain}.ape</p>
                                </div>
                            </div>
                        </a>
                    </div>

                </div>
            </div>
        </div >
    );

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