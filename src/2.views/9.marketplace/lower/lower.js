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
import NamesDiv from "../partials/names";
import Activity from "../partials/activity";

const MarketplaceLower = ({ names, setNames, supply, tabSelected }) => {
    const { darkMode } = GlobalParams();



    return (
        <div id="about" className="w-full flex justify-center items-start pb-10 pt-4 bg-white dark:bg-zinc-900 min-h-screen border-t-2 border-zinc-200 dark:border-zinc-800">

            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">

                {tabSelected == "items" ? (
                    <div className="mt-0 " style={{ display: tabSelected == "items" ? "block" : "none" }}>
                        <NamesDiv names={names} setNames={setNames} supply={supply} />
                    </div>
                ) : (
                    <div style={{ display: tabSelected == "activity" ? "block" : "none" }}>
                        <Activity />
                    </div>
                )}

            </div>

        </div>
    );

}

export default MarketplaceLower;
