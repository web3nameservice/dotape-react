import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BgImg from "../../1.resources/3.files/images/bg2.png";
import Footer from "../0.global/footer/footer";
import { useAccount } from "wagmi";
import { ConnectWallet } from "../0.global/wallet/connectWallet";
import { callW3Api, getDomain, getWnsDomain } from "../../1.resources/2.js/0.global/3.api/callW3Api";
import { shortenaddress } from "../../1.resources/2.js/0.global/0.smallfunctions/global";
import CloudContracts from "../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { calculateZeroes } from "../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import { getCloudProvider } from "../../1.resources/2.js/0.global/2.contracts/cloudProvider";
import { timeToString } from "../../1.resources/2.js/0.global/0.smallfunctions/time";
import Header from "../0.global/header/header";
import EmptyImg from "../../1.resources/3.files/images/empty_nft.png";
import Titles from "./partials/titles";
import Image from "./partials/image";
import Price from "./partials/price";
import Details from "./partials/details";
import { colors } from "../../1.resources/1.css/colors";
import { GlobalParams } from "../0.wrapper/darkMode";
import Registered from "./partials/registered";
import Mappings from "./partials/mappings";
import Activity from "./partials/activity";
import { teamAddress, zeroAddress } from "../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import { ens_normalize } from '@adraffy/ens-normalize';

const Names = ({ }) => {
    let { address } = useAccount();
    const [name, setName] = useState("");
    const [tokenId, setTokenId] = useState(0);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isReserved, setIsReserved] = useState(false);
    const [reservedAddress, setReservedAddress] = useState("");
    const [reservedDomain, setReservedDomain] = useState("");
    const [reservedLoading, setReservedLoading] = useState(true);
    let [owner, setOwner] = useState("");
    let [unsupported, setUnsupported] = useState(false);

    async function checkRegistered(_name) {
        let result = await CloudContracts().apeResolverContract.resolveNameToTokenId(_name);
        console.log(result.toString());
        if (result.toString() != "0") {
            setIsRegistered(true);
            setTokenId(result.toString());
            setIsLoading(false);
        } else {
            setIsLoading(false);
            let isReservedResult = await callW3Api("/presale/isReserved", { name: _name });
            if (isReservedResult) {
                setIsReserved(isReservedResult == "null" ? false : true);
                setReservedAddress(isReservedResult == "null" ? teamAddress : isReservedResult);
                if (isReservedResult != "null") {
                    let reservedDomainResult = await getDomain(isReservedResult);
                    console.log(reservedDomainResult);
                    if (reservedDomainResult != "null") {
                        setReservedDomain(reservedDomainResult);
                    } else {
                        setReservedDomain(shortenaddress(isReservedResult));
                    }
                }
            }
            setReservedLoading(false);
        }
    }


    useEffect(() => {
        let _name = decodeURIComponent(window.location.pathname.split("/")[2]);
        _name = _name.split(".")[0];
        _name = _name.toLowerCase();
        _name = _name.replace(" ", "");
        // _name = ens_normalize(_name);
        document.title = _name + ".ape - DOT APE";
        console.log(_name.length);
        if (_name.length < 3) {
            setUnsupported(true);
        } else {
            setName(_name);
            checkRegistered(_name);
        }
    }, [])


    return (

        <div id="about" className="h-full flex justify-center items-start pb-10 pt-8 bg-zinc-100 dark:bg-dark900 text-black dark:text-white">

            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">

                <div className="block lg:flex gap-x-10">
                    <div className="w-full lg:w-4/12 hidden lg:block">
                        <div className="sticky top-[100px]">
                            <Image name={name} tokenId={tokenId} />
                            <Details name={name} />
                        </div>
                    </div>
                    <div className="w-full lg:w-8/12">
                        <div className="bg-white dark:bg-dark800 border-2 dark:border border-zinc-200 dark:border-dark700 rounded-2xl px-10 py-10">
                            <Titles name={name} owner={owner} tokenId={tokenId} isLoading={isLoading} />
                            <div className="mt-8 block lg:hidden">
                                <Image name={name} tokenId={tokenId} />
                            </div>
                            {unsupported ? (
                                <Unsupported />
                            ) : (
                                isLoading ? (
                                    <div className="mt-8">
                                        <GetSkeletons paramsArray={['1']} />
                                    </div>
                                ) : (
                                    tokenId == 0 ? (
                                        <Price name={name} isReserved={isReserved} reservedAddress={reservedAddress} reservedDomain={reservedDomain} reservedLoading={reservedLoading} />
                                    ) : (
                                        <div>
                                            <Registered tokenId={tokenId} owner={owner} setOwner={setOwner} name={name} />
                                            <Mappings tokenId={tokenId} owner={owner} name={name} />
                                        </div>
                                    )
                                )
                            )}
                        </div>
                        <div className="mt-8 block lg:hidden">
                            <Details name={name} />
                        </div>
                        <Activity tokenId={tokenId} />
                    </div>
                </div>

            </div>
        </div >

    );

}

export default Names;

const Unsupported = () => {

    return (
        <div className="mt-8 border border-dark700 rounded-2xl px-10 py-10">
            <p className="text-2xl font-bold">Oops, this name is unsupported</p>
            <p className="text-md mt-3 text-gray-500 dark:text-dark500">Make sure the name follows the following rules:</p>
            <div className="mt-4">
                <div className="flex items-center gap-x-2 rounded-full px-0 py-1 bg-gray-100 dark:bg-dark800 w-fit mt-2 cursor-pointer">
                    <div className="bg-gray-500 dark:bg-dark700 w-5 h-5 flex justify-center items-center rounded-full">
                        <FontAwesomeIcon icon={['fas', 'fa-check']} className="text-gray-500 dark:text-dark500" size="xs" />
                    </div>
                    <p className="text-md text-gray-500 dark:text-dark500">Name should not be less than 3 characters in length</p>
                </div>
                <div className="flex items-center gap-x-2 rounded-full px-0 py-1 bg-gray-100 dark:bg-dark800 w-fit mt-2 cursor-pointer">
                    <div className="bg-gray-500 dark:bg-dark700 w-5 h-5 flex justify-center items-center rounded-full">
                        <FontAwesomeIcon icon={['fas', 'fa-check']} className="text-gray-500 dark:text-dark500" size="xs" />
                    </div>
                    <p className="text-md text-gray-500 dark:text-dark500">Name should not contain "." or blank spaces</p>
                </div>
                <div className="flex items-center gap-x-2 rounded-full px-0 py-1 bg-gray-100 dark:bg-dark800 w-fit mt-2 cursor-pointer">
                    <div className="bg-gray-500 dark:bg-dark700 w-5 h-5 flex justify-center items-center rounded-full">
                        <FontAwesomeIcon icon={['fas', 'fa-check']} className="text-gray-500 dark:text-dark500" size="xs" />
                    </div>
                    <p className="text-md text-gray-500 dark:text-dark500">Name should not have uppercase characters</p>
                </div>
            </div>
        </div>
    )
}

const GetSkeletons = ({ paramsArray }) => {
    const { darkMode, toggleDarkMode } = GlobalParams();

    const Mapping = paramsArray.map((item, index) => {
        return (
            <div key={index} style={{ borderRadius: "20px" }} className="mt-6">
                <SkeletonTheme baseColor={darkMode ? colors.zinc700 : colors.zinc200} highlightColor={darkMode ? colors.zinc800 : colors.zinc300} >
                    <Skeleton count={1} style={{
                        paddingTop: "100px",
                        paddingBottom: "100px",
                        borderRadius: "20px",
                    }} />
                </SkeletonTheme>
            </div>
        )
    }
    );
    return Mapping;
}