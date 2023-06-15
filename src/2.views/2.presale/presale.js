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
                    
                             <div>
                                <p className="text-lg">Presale has ended</p>
                            </div> 
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
