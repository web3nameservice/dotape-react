import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount, useSigner } from "wagmi";
import CloudContracts from "../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { calculateZeroes, currentEthPrice, usdToEth } from "../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import { GlobalParams } from "../0.wrapper/darkMode";
import { teamAddress, zeroAddress } from "../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import InfiniteScroll from 'react-infinite-scroll-component';
import { collection, onSnapshot, orderBy, query, where, limit, startAfter, getDocs, startAt } from "firebase/firestore";
import { db } from "../../1.resources/2.js/0.global/1.firebase/firebase";
import { timeToString } from "../../1.resources/2.js/0.global/0.smallfunctions/time";
import { shortenaddress } from "../../1.resources/2.js/0.global/0.smallfunctions/global";
import { callW3Api, getDomain } from "../../1.resources/2.js/0.global/3.api/callW3Api";
import makeBlockie from "ethereum-blockies-base64";
import { Variables } from "../../1.resources/2.js/0.global/2.contracts/variables";
import { ethers } from "ethers";
import AddReserve from "./partials/add";
import EditReserve from "./partials/edit";

const Reserve = ({ }) => {
    const [tabSelected, setTabSelected] = useState("reserved");
    const [reservedTotal, setReservedTotal] = useState(0);
    const { data: signer } = useSigner()
    const [addModal, setAddModal] = useState(false);
    async function init() {

    }

    useEffect(() => {
        init();
    }, [])

    async function airdrop() {
        let result = await callW3Api("/admin/get/reserve", { type: "airdrops" });

        console.log(result);

        let tuple = []
        for (let i = 2; i < result.length; i++) {
            if (result[i].name.length > 2) {
                let duration = result[i].duration == 1000 ? 10 : result[i].duration;
                tuple.push([result[i].name, result[i].address, duration]);
            }
        }
        console.log(tuple);

        let registrarContract = new ethers.Contract(Variables().apeRegistrarAddr, Variables().apeRegistrarAbi, signer);
        let tx = await registrarContract.registerTeam(tuple);

    }

    return (
        <div className="bg-white dark:bg-zinc-900 text-black dark:text-white h-full flex flex-col justify-start">
            <div id="about" className="w-full flex justify-center items-start pb-0 pt-8 border-b-2 border-dark700">
                <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">
                    <div className="flex justify-between items-center w-full">
                        <div>
                            <p className="text-3xl font-bold">Admin Panel</p>
                            <p className="text-md font-normal mt-2 text-dark500">This section is reserved for admins only</p>
                        </div>
                        <div>
                            <button className="bg-main text-white rounded-full px-4 py-3 flex items-center gap-x-1 w-fit" onClick={() => setAddModal(true)}>
                                <p className="text-sm font-semibold">Add</p>
                                <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-white text-sm" />
                            </button>
                            {/* <button className="bg-main text-white px-4 py-2 rounded-full" onClick={() => airdrop()}>Airdrop</button> */}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-x-4 mt-8">
                        <div>
                            <p className="text-2xl font-semibold">{reservedTotal}</p>
                            <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">reserve</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-x-12 w-fit mt-8">
                        <div className={`flex items-center gap-x-2  w-fit pb-2 ${tabSelected == "reserved" ? "border-b-2 border-white" : "border-b-2 border-transparent"}`} onClick={() => setTabSelected("reserved")}>
                            <FontAwesomeIcon icon={['fas', 'tag']} className={` text-sm ${tabSelected == "reserved" ? "text-white" : "text-dark500"}`} />
                            <p className={`text-md font-bold ${tabSelected == "reserved" ? "text-white" : "text-dark500"}`}>Reserved</p>
                        </div>
                    </div>
                </div>

            </div >

            <div>
                <div style={{ display: tabSelected == "reserved" ? "block" : "none" }}>
                    <Lower type={"reserved"} setReservedTotal={setReservedTotal} />
                </div>
            </div>
            <AddReserve isOpen={addModal} setIsOpen={setAddModal} />

        </div>
    );

}

export default Reserve;

const Lower = ({ type, setAirdropsTotal, setReservedTotal, setTeamTotal }) => {
    const [names, setNames] = useState([]);
    const [search, setSearch] = useState("");
    const [searchItems, setSearchItems] = useState([]);

    useEffect(() => {

        callW3Api("/admin/get/reserve", { type: "reserved" }).then((res) => {
            setNames(res);
            setReservedTotal(res.length);
        });
    }, [])

    let headings = ["Name", "Address", "Duration", "Status"]
    let css = {
        div: "w-3/12 flex items-center gap-x-2",
    }

    async function goSearch() {
        if (search == "") {
            setSearchItems([]);
        } else {
            let newItems = names.filter((name) => name.name.toLowerCase().includes(search.toLowerCase()));
            setSearchItems(newItems);
        }
    }

    return (
        <div id="about" className="w-full flex justify-center items-start pb-0 pt-8">
            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl">
                <div className="mt-0">
                    {names.length > 0 ? (
                        <div>
                            <div className="flex justify-between items-center gap-x-4">
                                <div className="w-full">
                                    <UpperTabs search={search} setSearch={setSearch} goSearch={goSearch} />
                                </div>
                                <div className="flex-none my-4">
                                    <button className="bg-main text-white rounded-full px-4 py-2 flex items-center gap-x-1 w-fit " onClick={() => goSearch()}>Search</button>
                                </div>
                            </div>
                            <div className="flex items-center w-full border-b-2 border-dark700 py-4">
                                {headings.map((heading, index) => (
                                    <div key={index} className={css.div}>
                                        <p className="text-dark500 text-sm font-bold">{heading}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="" style={{ display: searchItems.length > 0 ? "none" : "block" }}>
                                <AllNamesMap names={names} />
                            </div>
                            <div className="" style={{ display: searchItems.length > 0 ? "block" : "none" }}>
                                <AllSearchItemsMap names={searchItems} />
                            </div>
                        </div>
                    ) : (
                        (null)
                    )}
                </div>
            </div>
        </div>
    )
}

const AllSearchItemsMap = ({ names }) => {
    const [editReserveOpen, setEditReserveOpen] = useState(false);
    const [editItemSelected, setEditItemSelected] = useState(0);

    return (
        <div>
            {names.map((name, index) => (
                <div key={index}>
                    <NamesMap name={name} index={index} setEditItemSelected={setEditItemSelected} setEditReserveOpen={setEditReserveOpen} />
                    <EditReserve isOpen={editReserveOpen} setIsOpen={setEditReserveOpen} editItem={names[editItemSelected]} />
                </div>
            ))}
        </div>
    )
}

const AllNamesMap = ({ names }) => {
    const [namesLeft, setNamesLeft] = useState(names);
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [editReserveOpen, setEditReserveOpen] = useState(false);
    const [editItemSelected, setEditItemSelected] = useState(0);

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
                    scrollThreshold={0.8}
                >
                    <div className="">
                        {items.map((name, index) => (
                            <div key={index}>
                                <NamesMap name={name} index={index} setEditItemSelected={setEditItemSelected} setEditReserveOpen={setEditReserveOpen} />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            ) : (null)}
            <EditReserve isOpen={editReserveOpen} setIsOpen={setEditReserveOpen} editItem={items[editItemSelected]} />
        </div>
    )
}

const NamesMap = ({ name, index, setEditItemSelected, setEditReserveOpen }) => {
    const { address } = useAccount();
    const [domain, setDomain] = useState(name?.address.toLowerCase() == teamAddress.toLowerCase() ? "team" : shortenaddress(name?.address ? name.address : ""));
    const [removeLoading, setRemoveLoading] = useState(false);
    const [removeError, setRemoveError] = useState(false);
    useEffect(() => {
        setDomain(name?.address.toLowerCase() == teamAddress.toLowerCase() ? "team" : shortenaddress(name?.address ? name.address : ""));
    }, [name])

    let css = {
        div: "w-3/12 flex items-center gap-x-2",
        p: ""
    }

    async function removeName() {
        setRemoveLoading(true);
        let result = await callW3Api("/admin/remove/reserve", { name: name.name, signature: localStorage.getItem("accountSignature" + address) });
        if (result == "ok") {
            setRemoveLoading(false);
            window.location.reload();
        } else {
            setRemoveLoading(false);
            setRemoveError(true);
        }
    }

    return (
        <div className="flex items-center w-full border-b-2 border-dark700 py-4">
            <div className={css.div}>
                <p className="text-white font-bold">{name.name}.ape</p>
            </div>
            <div className={css.div}>
                <img src={makeBlockie(name.address)} className="w-5 h-5 rounded-full" />
                <a className="text-main" href={"https://etherscan.io/address/" + name.address} target="_blank">{domain}</a>
                <FontAwesomeIcon icon={['fas', 'chevron-right']} className="text-main" size="xs" />
            </div>
            <div className={css.div}>
                <p className={css.p}>{name.duration} years</p>
            </div>
            <div className="flex items-center gap-x-10">
                <button className="bg-main text-white rounded-full px-4 py-2 flex items-center gap-x-1 w-fit" onClick={() => { setEditItemSelected(index); setEditReserveOpen(true) }} >Edit</button>
                {removeLoading ? (
                    <FontAwesomeIcon icon={['fas', 'circle-notch']} className="text-main animate-spin" />

                ) : (
                    removeError ? (
                        <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} className="text-red-500 dark:text-red-500" />
                    ) : (
                        <div className="w-10 h-10 flex justify-center items-center bg-dark800 rounded-full" onClick={() => removeName()}>
                            <FontAwesomeIcon icon={['fas', 'xmark']} className="text-gray-500 dark:text-dark500" />
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

const UpperTabs = ({ search, setSearch, goSearch }) => {

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            goSearch();
        }
    }

    return (
        <div className="my-4 flex justify-between items-center gap-x-2">
            <div className="onlyvertcenter p-2 pl-4 rounded-xl w-full bg-white dark:bg-dark800 border-2 dark:border border-gray-200 dark:border-dark700">
                <FontAwesomeIcon icon={['fas', 'fa-search']} className="text-gray-500 dak:text-dark500" />
                <input type="text" className="font-semibold text-sm w-full bg-transparent outline-none ml-4 py-1" placeholder="Type to search for a domain" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
            </div>
        </div >
    )
}