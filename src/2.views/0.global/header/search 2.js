import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CloudContracts from "../../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { colors } from "../../../1.resources/1.css/colors";
// import Logo from "../../../1.resources/3.files/logo/logo2.png";

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
    const [searchActive, setSearchActive] = useState(false)
    const [searchDomain, setSearchDomain] = useState("")
    const [searchStatus, setSearchStatus] = useState("")
    const [searchStatusColor, setSearchStatusColor] = useState("")
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchLink, setSearchLink] = useState("")

    async function searchBar(value) {
        if (!value.includes(".")) {
            console.log(value);
            value = value.replace(" ", "").toLowerCase();
            if (value.length == 0) {
                setSearchActive(false);
            } else {
                setSearchActive(true);
            }
            setSearchLoading(true);
            setSearchDomain(value);
            setSearchLink("/name/" + value);
            let status;
            if (value.length < 3 || value.length > 15) {
                status = "Invalid";
            } else {
                let tokenId = await CloudContracts("eth", process.env.REACT_APP_NETWORK, "full").apeResolverContract.resolveNameToTokenId(value);
                if (tokenId != 0) {
                    status = "Registered";
                } else {
                    status = "Available";
                }
            }
            if (status != "Invalid") {
                setSearchStatusColor("#3482F6");
            } else {
                setSearchStatusColor("#606060");
            }
            setSearchStatus(status);
            setSearchLoading(false);
        }
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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            window.location = "/name/" + (searchDomain.replace(" ", "")).toLowerCase();
        }
    }
    return (
        <div id="searchDiv" className="w-full">
            <div className="bg-white dark:bg-dark800 rounded-xl flex flex-between items-center border-2 border-gray-200 dark:border-dark700" style={{ zIndex: "100000" }} id="headerSearch">
                <FontAwesomeIcon icon={['fas', 'fa-search']} className="pl-4 text-gray-500 dark:text-dark500" />
                <input id="searchInput" type="text" onChange={(e) => { searchBar(e.target.value) }} onKeyDown={handleKeyDown} value={searchDomain} placeholder="Search domains" className="bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-dark500 w-full outline-none pl-4 py-3 text-md" ></input>
                <FontAwesomeIcon icon={['fas', 'fa-angle-right']} className="pr-4 text-gray-500 dark:text-dark500" />
            </div>
            <div id="" style={{}} className="w-full">
                <div className="rounded-xl mt-2 bg-white dark:bg-dark800 z-10 absolute" id="headerSearchModal">
                    <div style={{ padding: "0%", display: searchActive ? "block" : "none" }} className="rounded-xl border-2 border-gray-200 dark:border-dark700 w-full">
                        <p className="text-xs text-gray-400 dark:text-dark500 font-bold border-b border-b-gray-200 dark:border-dark700 px-4 py-2">DOMAINS</p>
                        <a className="bg-white dark:bg-dark800 hover:bg-neutral-100 cursor-pointer flex justify-between items-center text-sm px-4 py-2 rounded-b-xl w-full" href={searchLink}>
                            <div style={{ width: "70%" }} className="flex items-center gap-x-3">
                                {/* <img src={Logo} className="w-5 h-5 bg-black rounded-lg" /> */}
                                <p>
                                    <span className="font-semibold text-black dark:text-white text-lg">{searchDomain}</span>
                                    <span className="text-black dark:text-white text-lg">.ape</span>
                                </p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end" }} className="">
                                <div style={{ display: searchLoading ? "block" : "none" }}>
                                    <FontAwesomeIcon icon={['fas', 'fa-circle-notch']} style={{ color: "#606060", fontSize: "100%" }} id="arrowicon" spin />
                                </div>
                                <p className="font-semibold" style={{ display: searchLoading ? "none" : "block", color: searchStatusColor }}>{searchStatus}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div >
    );

}