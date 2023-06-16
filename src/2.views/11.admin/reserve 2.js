import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount, useSigner } from "wagmi";
import CloudContracts from "../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { calculateZeroes, currentEthPrice, usdToEth } from "../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import { GlobalParams } from "../0.wrapper/darkMode";
import { zeroAddress } from "../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import UpperTabs from "../7.mynames/partials/upperTabs";
import InfiniteScroll from 'react-infinite-scroll-component';
import { collection, onSnapshot, orderBy, query, where, limit, startAfter, getDocs, startAt } from "firebase/firestore";
import { db } from "../../1.resources/2.js/0.global/1.firebase/firebase";
import { timeToString } from "../../1.resources/2.js/0.global/0.smallfunctions/time";
import { shortenaddress } from "../../1.resources/2.js/0.global/0.smallfunctions/global";
import { callW3Api, getDomain } from "../../1.resources/2.js/0.global/3.api/callW3Api";
import makeBlockie from "ethereum-blockies-base64";


const Reserve = ({ }) => {
    const [tabSelected, setTabSelected] = useState("airdrops");
    const [airdropsTotal, setAirdropsTotal] = useState(0);
    const [reservedTotal, setReservedTotal] = useState(0);
    const [teamTotal, setTeamTotal] = useState(0);

    async function init() {

    }

    useEffect(() => {
        init();
    }, [])

    return (
        <div className="bg-white dark:bg-zinc-900 text-black dark:text-white h-full flex flex-col justify-start">
            <div id="about" className="w-full flex justify-center items-start pb-0 pt-8 border-b-2 border-dark700">
                <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">
                    <p className="text-3xl font-bold">Admin Panel</p>
                    <p className="text-md font-normal mt-2 text-dark500">This section is reserved for admins only</p>

                    <div className="grid grid-cols-4 gap-x-4 mt-8">
                        <div>
                            <p className="text-2xl font-semibold">{airdropsTotal}</p>
                            <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">airdrops</p>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">{reservedTotal}</p>
                            <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">reserve</p>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">{teamTotal}</p>
                            <p className="text-sm font-semibold mt-2 text-gray-500 dark:text-dark500">team</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-x-12 w-fit mt-8">
                        <div className={`flex items-center gap-x-2  w-fit pb-2 ${tabSelected == "airdrops" ? "border-b-2 border-white" : "border-b-2 border-transparent"}`} onClick={() => setTabSelected("airdrops")}>
                            <FontAwesomeIcon icon={['fas', 'paper-plane']} className={`text-xs ${tabSelected == "airdrops" ? "text-white" : "text-dark500"}`} />
                            <p className={`text-md font-bold ${tabSelected == "airdrops" ? "text-white" : "text-dark500"}`}>Airdrops</p>
                        </div>
                        <div className={`flex items-center gap-x-2  w-fit pb-2 ${tabSelected == "reserved" ? "border-b-2 border-white" : "border-b-2 border-transparent"}`} onClick={() => setTabSelected("reserved")}>
                            <FontAwesomeIcon icon={['fas', 'tag']} className={` text-sm ${tabSelected == "reserved" ? "text-white" : "text-dark500"}`} />
                            <p className={`text-md font-bold ${tabSelected == "reserved" ? "text-white" : "text-dark500"}`}>Reserved</p>
                        </div>
                        <div className={`flex items-center gap-x-2  w-fit pb-2 ${tabSelected == "team" ? "border-b-2 border-white" : "border-b-2 border-transparent"}`} onClick={() => setTabSelected("team")}>
                            <FontAwesomeIcon icon={['fas', 'user-plus']} className={` text-sm ${tabSelected == "team" ? "text-white" : "text-dark500"}`} />
                            <p className={`text-md font-bold ${tabSelected == "team" ? "text-white" : "text-dark500"}`}>Team</p>
                        </div>
                    </div>
                </div>

            </div >

            <div>
                <div style={{ display: tabSelected == "airdrops" ? "block" : "none" }}>
                    <Lower type={"airdrops"} setAirdropsTotal={setAirdropsTotal} setReservedTotal={setReservedTotal} setTeamTotal={setTeamTotal} />
                </div>
                <div style={{ display: tabSelected == "reserved" ? "block" : "none" }}>
                    <Lower type={"reserved"} setAirdropsTotal={setAirdropsTotal} setReservedTotal={setReservedTotal} setTeamTotal={setTeamTotal} />
                </div>
                <div style={{ display: tabSelected == "team" ? "block" : "none" }}>
                    <Lower type={"team"} setAirdropsTotal={setAirdropsTotal} setReservedTotal={setReservedTotal} setTeamTotal={setTeamTotal} />
                </div>
            </div>
        </div>
    );

}

export default Reserve;

const Lower = ({ type, setAirdropsTotal, setReservedTotal, setTeamTotal }) => {
    const [names, setNames] = useState([]);

    useEffect(() => {
        console.log("type", type);
        callW3Api("/admin/get/reserve", { type: type }).then((res) => {
            setNames(res);

            if (type == "airdrops") {
                setAirdropsTotal(res.length);
            } else if (type == "reserved") {
                setReservedTotal(res.length);
            } else if (type == "team") {
                setTeamTotal(res.length);
            }
        });
    }, [])

    let headings = ["Name", "Address", "Duration", "Status"]
    let css = {
        div: "w-3/12 flex items-center gap-x-2",
    }
    return (
        <div id="about" className="w-full flex justify-center items-start pb-0 pt-8">
            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl">
                {names.length > 0 ? (
                    <div>
                        <div className="flex items-center w-full border-b-2 border-dark700 py-4">
                            {headings.map((heading, index) => (
                                <div key={index} className={css.div}>
                                    <p className="text-dark500 text-sm font-bold">{heading}</p>
                                </div>
                            ))}
                        </div>
                        {names.map((name, index) => (
                            <div key={index}>
                                <NamesMap name={name} />
                            </div>
                        ))}
                    </div>
                ) : (
                    (null)
                )}
            </div>
        </div>
    )
}

const NamesMap = ({ name }) => {
    const [domain, setDomain] = useState(shortenaddress(name?.address ? name.address : ""));

    useEffect(() => {
        // getDomain(name?.address).then((res) => {
        //     if (res != "null") {
        //         setDomain(res);
        //     }
        // })
    }, [])

    let css = {
        div: "w-3/12 flex items-center gap-x-2",
        p: ""
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
            <div>
                <p className={css.p}>{"-"}</p>
            </div>
        </div>
    )
}