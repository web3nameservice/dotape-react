import React, { useState, useContext, useEffect } from "react";

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
import Invest from "./partials/invest";

const Presale = ({ walletConnected, setWalletConnected }) => {
    let { address } = useAccount();
    const [domain, setDomain] = useState("");
    const [investModalOpen, setInvestModalOpen] = useState(false);
    const [investedAmount, setInvestedAmount] = useState(0);

    async function init() {
        let result = await getDomain(address);
        console.log(result);
        if (result != "null") {
            setDomain(result);
        }
    }

    async function checkInvestment() {
        let amount = await callW3Api("/presale/credits/get", { address: address });
        console.log(amount);
        setInvestedAmount(parseFloat(amount.toString()));
    }

    useEffect(() => {
        if (address != null && address != "" && address != undefined) {
            init();
            checkInvestment();
        }
    }, [address])

    useEffect(() => {
        document.title = "Presale - DOT APE";
    }, [])

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="">
                <div>
                    <Header />
                </div>
                <div id="about" className="min-w-screen flex justify-center items-start pb-20 pt-10 ">

                    <div className="w-full lg:w-[1280px] px-5 md:px-10 lg:px-28 2xl:px-0 lg:rounded-xl text-white">
                        <p className="text-3xl font-bold">PRESALE</p>

                        <p className="pt-4 text-lg text-main font-bold">The .APE presale is open for everyone to participate in.</p>

                        <div className="mt-4 bg-white/10 px-10 py-10 rounded-xl border-2 border-white/10">

                            {address == null ? (
                                <div>
                                    <p className="text-2xl font-bold">Presale</p>
                                    <p className="text-md mt-4">Connect your wallet to participate in the presale.</p>
                                    <div className="mt-8">
                                        <ConnectWallet />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="block md:flex justify-between items-center border-b-2 border-white/10 pb-6">
                                        <div>
                                            <p className="text-2xl font-semibold">Welcome {address != null ? domain == "" ? shortenaddress(address) : domain : ""}!</p>
                                            <p className="text-gray-400 text-sm pt-1">Use this portal to participate in .APE presale</p>
                                        </div>
                                        <div className="mt-4 md:mt-0">
                                            <ConnectWallet />
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <p className="text-md text-main font-bold">Your current credits: {investedAmount > 0 ? calculateZeroes(investedAmount / 1e18) : "0.00"} ETH</p>
                                    </div>
                                    <div className="pt-8">
                                        <p className="text-sm">Before you participate, please keep in mind:</p>
                                        <div className="pt-4">
                                            <Points text="You can participate using ETH or Apecoin." />
                                            <Points text="You can buy credits for any amount above 0.01 ETH or equivalent in Apecoin." />
                                            <Points text="After the presale ends, you will be able to register any number of domains equivalent to the amount of tokens you put in presale." />
                                            <Points text="You can buy credits as many times as you want." />
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <div className="bg-main px-4 py-2 rounded-full w-fit flex items-center gap-x-2" onClick={() => setInvestModalOpen(true)}>
                                            <p className="text-white text-sm">{investedAmount > 0 ? "Buy credits" : "Buy credits"}</p>
                                            <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-xs text-white" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* {Date.now() < endTime * 1000 ? (
                        <p className="text-main font-bold pt-8">Presale ends in : <span>{timeToString(endTime * 1000)}</span></p>
                    ) : (
                        <p className="text-main font-bold pt-8">Presale concluded</p>
                    )} */}
                            {/* <div>
                                <p className="text-lg">The presale has not started yet.</p>
                            </div> */}
                        </div>
                        {/* <p className="pt-8 text-lg text-white font-bold">What is the .APE presale?</p> */}
                        <p className="text-lg pt-8">This presale gives participants a unique chance to register .APE domains before they become available to the public. Anyone can participate in the presale and put in ETH to secure their position. </p>
                        <p className="text-lg pt-4">The participants will receive credits equivalent to the amount of ETH that they put in during the presale and these credits can be used to purchase .APE domains during the claim period. </p>


                    </div>

                    <Invest modalOpen={investModalOpen} setModalOpen={setInvestModalOpen} />
                </div>

            </div >
            <div className="">
                <Footer />
            </div>
        </div>
    );

}

export default Presale;

const Stats = ({ text, value }) => {

    return (
        <div className="flex justify-between items-center mt-1">
            <p className="text-md">{text}</p>
            <p className="text-md">{value}</p>
        </div>
    )
}

const Points = ({ text }) => {

    return (
        <div className="flex mt-2">
            <div>
                <FontAwesomeIcon icon={['fas', 'circle']} style={{ width: "30%" }} />
            </div>
            <div>
                <p className="text-sm">{text}</p>
            </div>
        </div>
    )
}