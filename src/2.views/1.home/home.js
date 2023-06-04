import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Hero, { GetMapping2, ImageBanner } from "./partials/hero";
import BgImg from "../../1.resources/3.files/images/bg2.png";
import Ethereum from "../../1.resources/3.files/images/eth2.png";
import Apecoin from "../../1.resources/3.files/images/apecoin2.gif";
import Adam from "../../1.resources/3.files/images/adam.png";
import Pran from "../../1.resources/3.files/images/pran.png";
import Vincent from "../../1.resources/3.files/images/vincent.png";
import Patrick from "../../1.resources/3.files/images/patrick.jpg";
import Manuel from "../../1.resources/3.files/images/manuel.jpg";
import Andre from "../../1.resources/3.files/images/andre.jpg";
import KongKong from "../../1.resources/3.files/images/kongkong.jpg";
import Footer from "../0.global/footer/footer";
import { ethers } from "ethers";
import Twitter from "./partials/twitter";
import Header from "../0.global/header/header";
import Loop from "./partials/loop";
import Ticker from "react-ticker";


const Home = ({ walletConnected, setWalletConnected }) => {


    return (
        <div >

            <div className="sticky top-0 z-0">
                <Hero />
            </div>
            {/* <About />
            <Twitter /> */}
            <div className="bg-black/80 backdrop-blur-3xl">
                <div className="w-screen flex items-center justify-center py-10 pt-20  relative  z-10 ">
                    <div>
                        <div className="w-screen flex items-center justify-center ">
                            <div className="w-full lg:w-[1280px] text-white lg:rounded-xl px-5 md:px-10 lg:px-20">
                                <div className="py-10">
                                    <p className="text-7xl md:text-8xl lg:text-9xl font-bold" style={{ lineHeight: window.innerWidth < 786 ? "100px" : "160px" }}>Welcome to .APE Domains</p>
                                    <p className="text-4xl pt-16">A digital frontier specifically designed for the innovative, exclusive, and groundbreaking community of all degens ape members and supporters.</p>
                                </div>

                            </div>
                        </div>
                        <div className="py-8">
                            <ImageBanner />
                        </div>
                        <div className="w-screen flex items-center justify-center ">

                            <div className="w-full lg:w-[1280px] text-white lg:rounded-xl px-5 md:px-10 lg:px-28">
                                <div className="py-10">
                                    {/* <p className="text-6xl md:text-8xl font-bold">.APE for BAYC</p> */}
                                    {/* <p className="text-6xl md:text-8xl font-bold pt-2">.APE for MAYC</p> */}
                                    {/* <p className="text-6xl md:text-8xl font-bold pt-2">.APE for BAKC</p> */}
                                    {/* <p className="text-6xl md:text-8xl font-bold pt-2">.APE for PUNKS</p> */}
                                    {/* <p className="text-6xl md:text-8xl font-bold pt-2">.APE for MEEBITS</p> */}
                                    <p className="text-3xl md:text-6xl lg:text-7xl font-bold pt-8">.APE for all degens</p>
                                    <p className="text-3xl md:text-6xl lg:text-7xl font-bold pt-8">.APE for all fam</p>
                                    <p className="text-3xl md:text-6xl lg:text-7xl font-bold pt-8">.APE for all apes</p>
                                    <p className="text-3xl md:text-6xl lg:text-7xl font-bold pt-8">.APE for everyone</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 mt-20 md:gap-10 lg:gap-20 py-18 pt-5 md:pt-20">
                                        <div className="rounded-3xl bg-[#3F6CEB] px-6 md:px-10 pt-12 md:pt-2 pb-12 md:pb-10 flex flex-col justify-center items-center">
                                            <img src={Ethereum} className="rounded-3xl w-8/12" />
                                            <p className="md:text-5xl lg:text-6xl font-bold pt-4">Built on</p>
                                            <p className="md:text-5xl lg:text-6xl font-bold pt-4">Ethereum</p>
                                        </div>
                                        <div className="rounded-3xl bg-[#000] px-4 py-10 flex flex-col justify-center items-center mt-10 md:mt-0">
                                            <p className="md:text-5xl lg:text-6xl font-bold pt-4">Powered by</p>
                                            <p className="md:text-5xl lg:text-6xl font-bold pt-4">Apecoin</p>
                                            <img src={Apecoin} className="rounded-3xl w-10/12 pt-6" />
                                        </div>
                                        {/* <Loop collection={"bayc"} /> */}
                                        {/* <Loop collection={"mayc"} />
                                        <Loop collection={"bakc"} />
                                        <Loop collection={"punks"} /> */}
                                    </div>

                                    <div className="pt-40">
                                        <p className="text-4xl md:text-4xl break-word">.APE empowers the ape inside everyone to establish their unique identity in the decentralised web with a .APE domain. </p>
                                        <p className="text-4xl md:text-4xl pt-24 break-word">.APE domains are designed to be as unique as the apes they represent, leveraging the power of blockchain technology to guarantee their ownership and authenticity. </p>
                                    </div>


                                </div>

                                <div className="mt-20 bg-white/20 text-white px-5 md:px-10 lg:px-20 pt-20 pb-20">
                                    <p className="text-3xl font-bold">INFRASTUCTURE</p>

                                    <div className="pt-8">
                                        <p className="text-xl font-semibold">Protocol Logic</p>
                                        <p className="text-lg pt-2">The .Ape protocol is open-source MIT licensed consisting of audited EVM smart contracts and subgraphs to enable the decentralized purchase and transfer of .Ape domains. These pieces make up the logic of the domain protocol allowing anyone to register domains with the .ape extension. The smart contracts are deployed on Etherum blockchain to allow the first-party purchase of domains. All smart contracts and .Ape manager app, including the stable price oracle will be maintained by the .Ape team.</p>
                                    </div>

                                    <div className="pt-16">
                                        <p className="text-xl font-semibold">.APE Manager App</p>
                                        <p className="text-lg pt-2">The .APE web app enables the use of the .APE protocol. This web app provides utilities to interact with the .ape registrar and allows users to purchase and manage domains from a web browser.</p>
                                    </div>

                                    <div className="pt-16">
                                        <p className="text-xl font-semibold">Domain Resolver</p>
                                        <p className="text-lg pt-2">The APEjs package and APIs will allow developers to easily natively resolve .ape domains in their dApps, allowing for .ape domains to be used in place of wallet addresses on virtually any dApp. This package will be lightweight and easy to be integrated on top of ENSjs, ethers.js, and web3.js. </p>
                                    </div>


                                    <div className="pt-20">
                                        <p className="text-3xl font-bold">SPECIFICATIONS</p>
                                        <div className="pt-4">

                                            <Points text="Blockchain: Ethereum" linkText="" link="" />
                                            <Points text="Token Standard: ERC-721" linkText="" link="" />
                                            <Points text="Contract Address: TBA" linkText="" link="" />
                                            <Points text="Registration: Renewal" linkText="" link="" />
                                        </div>
                                    </div>

                                    <div className="pt-20">
                                        <p className="text-3xl font-bold">PRICING</p>
                                        <div className="pt-4">
                                            <Points text="3 characters: $640 yearly" linkText="" link="" />
                                            <Points text="4 characters: $120 yearly" linkText="" link="" />
                                            <Points text="5 characters: $50 yearly" linkText="" link="" />
                                            <Points text="6+ characters: $10 yearly" linkText="" link="" />
                                        </div>
                                    </div>

                                    <div className="pt-20">
                                        <p className="text-3xl font-bold">PRESALE</p>
                                        <div className="pt-4">
                                            <p className="text-lg pt-0">This presale gives participants a unique chance to register .APE domains before they become available to the public. Anyone can participate in the presale and put in ETH to secure their position. </p>
                                            <p className="text-lg pt-4">The participants will receive credits equivalent to the amount of ETH that they put in during the presale and these credits can be used to purchase .APE domains during the claim period. This pre-sale will take place right here on our website, ensuring a seamless, secure, and user-friendly experience. After the presale claim period is over, the registration for the public will start. </p>
                                        </div>
                                    </div>

                                    <div className="pt-20">
                                        <p className="text-3xl font-bold">TEAM</p>
                                        <div className="pt-4">
                                            <p className="text-lg">The .APE team is a group of passionate and dedicated apes who are committed to the success of the .APE project. We are a team of developers, designers, and marketers who are all passionate about the ape community and the NFT space. The team behind WNS (Web3 Name Service) have been onboarded for technical development of .APE domains and we are excited to be a part of this innovative project and look forward to working with the community to make .APE domains a success.</p>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 gap-x-8 md:gap-x-0 gap-y-6">
                                            <div>
                                                <img src={Pran} className="rounded-2xl w-40" />
                                                <p className="text-lg font-semibold pt-2">pran.ape</p>
                                                <p className="text-md pt-1">Product Team</p>
                                            </div>
                                            <div>
                                                <img src={Adam} className="rounded-2xl w-40" />
                                                <p className="text-lg font-semibold pt-2">adam.ape</p>
                                                <p className="text-md pt-1">Development Team</p>
                                            </div>
                                            <div>
                                                <img src={Patrick} className="rounded-2xl w-40" />
                                                <p className="text-lg font-semibold pt-2">patrick.ape</p>
                                                <p className="text-md pt-1">Business Team</p>
                                            </div>
                                            <div>
                                                <img src={Vincent} className="rounded-2xl w-40" />
                                                <p className="text-lg font-semibold pt-2">vincent.ape</p>
                                                <p className="text-md pt-1">Business Team</p>
                                            </div>

                                            <div>
                                                <img src={Andre} className="rounded-2xl w-40" />
                                                <p className="text-lg font-semibold pt-2">andre.ape</p>
                                                <p className="text-md pt-1">Communications Team</p>
                                            </div>
                                            <div>
                                                <img src={KongKong} className="rounded-2xl w-40" />
                                                <p className="text-lg font-semibold pt-2">kongkong.ape</p>
                                                <p className="text-md pt-1">Communications Team</p>
                                            </div>
                                            <div>
                                                <img src={Manuel} className="rounded-2xl w-40" />
                                                <p className="text-lg font-semibold pt-2">manuel.ape</p>
                                                <p className="text-md pt-1">Development Team</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="w-full my-0 bg-white/20 text-white pb-6" style={{}}>
                                        <Ticker style={{}} >
                                            {({ index }) => (
                                                <div className="">
                                                    <div style={{ display: "flex" }} className="">
                                                        <GetMapping2 array={Array.from({ length: 40 }, () => Math.floor(Math.random() * 40))} />
                                                    </div>
                                                </div>
                                            )}
                                        </Ticker>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>

        </div >
    );

}

export default Home;

const Points = ({ text, linkText, link }) => {

    return (
        <div className="flex mt-2">
            <div>
                <FontAwesomeIcon icon={['fas', 'circle']} style={{ width: "30%" }} />
            </div>
            <div className="flex items-center gap-x-2">
                <p className="text-lg">{text}</p>
                <a href={link} className="text-lg text-main">{linkText}</a>
            </div>
        </div>
    )
}
