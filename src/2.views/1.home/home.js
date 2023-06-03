import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Hero, { GetMapping2, ImageBanner } from "./partials/hero";
import BgImg from "../../1.resources/3.files/images/bg2.png";
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
                <div className="w-screen flex items-center justify-center py-20  relative  z-10 ">
                    <div>
                        <div className="w-screen flex items-center justify-center ">
                            <div className="w-full lg:w-[1280px] text-white lg:rounded-xl px-5 md:px-0">
                                <div className="py-10">
                                    <p className="text-7xl md:text-9xl font-bold">Welcome to .APE Domains</p>
                                    <p className="text-4xl pt-8">A digital frontier specifically designed for the innovative, exclusive, and groundbreaking community of Bored Ape Yacht Club (BAYC), Mutant Ape Yatch Club (MAYC) and other ape members and supporters.</p>
                                </div>

                            </div>
                        </div>
                        <div>
                            <ImageBanner />
                        </div>
                        <div className="w-screen flex items-center justify-center ">

                            <div className="w-full lg:w-[1280px] text-white lg:rounded-xl px-5 md:px-0">
                                <div className="py-10">
                                    <p className="text-6xl md:text-8xl font-bold">.APE for BAYC</p>
                                    <p className="text-6xl md:text-8xl font-bold pt-2">.APE for MAYC</p>
                                    {/* <p className="text-6xl md:text-8xl font-bold pt-2">.APE for BAKC</p> */}
                                    <p className="text-6xl md:text-8xl font-bold pt-2">.APE for PUNKS</p>
                                    {/* <p className="text-6xl md:text-8xl font-bold pt-2">.APE for MEEBITS</p> */}
                                    <p className="text-6xl md:text-8xl font-bold pt-2">.APE for all apes</p>
                                    <p className="text-6xl md:text-8xl font-bold pt-2">.APE for everyone</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 mt-20 gap-10">
                                        <Loop collection={"bayc"} />
                                        <Loop collection={"mayc"} />
                                        <Loop collection={"bakc"} />
                                        <Loop collection={"punks"} />
                                    </div>

                                    <div className="pt-20">
                                        <p className="text-4xl md:text-6xl break-all">.APE empowers the BAYC / MAYC community members and other ape supporters to establish their unique identity in the decentralised web with a .APE domain. </p>
                                        <p className="text-4xl md:text-6xl pt-16 break-all">.APE domains are designed to be as unique as the apes they represent, leveraging the power of blockchain technology to guarantee their ownership and authenticity. </p>
                                    </div>


                                </div>

                                <div className="pt-10 bg-white/20 text-white px-5 md:px-20 py-20">
                                    <p className="text-3xl font-bold">INFRASTUCTURE</p>

                                    <div className="pt-8">
                                        <p className="text-xl font-semibold">Protocol Logic</p>
                                        <p className="text-lg pt-2">The .Ape protocol is open-source MIT licensed consisting of audited EVM smart contracts and subgraphs to enable the decentralized purchase and transfer of .Ape domains. These pieces make up the logic of the domain protocol allowing anyone to register domains with the .ape extension. The smart contracts are deployed on Etherum blockchain to allow the first-party purchase of domains. All smart contracts and .Ape manager app, including the stable price oracle will be maintained by the .Ape team.</p>
                                    </div>

                                    <div className="pt-4">
                                        <p className="text-xl font-semibold">.APE Manager App</p>
                                        <p className="text-lg pt-2">The .APE web app enables the use of the .APE protocol. This web app provides utilities to interact with the .ape registrar and allows users to purchase and manage domains from a web browser.</p>
                                    </div>

                                    <div className="pt-8">
                                        <p className="text-xl font-semibold">Domain Resolver</p>
                                        <p className="text-lg pt-2">The APEjs package and APIs will allow developers to easily natively resolve .ape domains in their dApps, allowing for .ape domains to be used in place of wallet addresses on virtually any dApp. This package will be lightweight and easy to be integrated on top of ENSjs, ethers.js, and web3.js. </p>
                                    </div>


                                    <div className="pt-10">
                                        <p className="text-3xl font-bold">SPECIFICATIONS</p>
                                        <div className="pt-4">
                                            <Points text="Blockchain: Ethereum" linkText="" link="" />
                                            <Points text="Token Standard: ERC-721" linkText="" link="" />
                                            <Points text="Contract Address: TBA" linkText="" link="" />
                                            <Points text="Registration: Renewal" linkText="" link="" />
                                        </div>
                                    </div>

                                    <div className="pt-10">
                                        <p className="text-3xl font-bold">PRICING</p>
                                        <div className="pt-4">
                                            <Points text="3 characters: $640 yearly" linkText="" link="" />
                                            <Points text="4 characters: $120 yearly" linkText="" link="" />
                                            <Points text="5 characters: $50 yearly" linkText="" link="" />
                                            <Points text="6+ characters: $10 yearly" linkText="" link="" />
                                        </div>
                                    </div>

                                    <div className="pt-10">
                                        <p className="text-3xl font-bold">PRESALE</p>
                                        <div className="pt-4">
                                            <p className="text-lg pt-0">This presale gives participants a unique chance to register .APE domains before they become available to the public. Anyone can participate in the presale and put in ETH to secure their position. </p>
                                            <p className="text-lg pt-4">The participants will receive credits equivalent to the amount of ETH that they put in during the presale and these credits can be used to purchase .APE domains during the claim period. This pre-sale will take place right here on our website, ensuring a seamless, secure, and user-friendly experience. After the presale claim period is over, the registration for the public will start. </p>
                                        </div>
                                    </div>

                                    <div className="pt-10">
                                        <p className="text-3xl font-bold">TEAM</p>
                                        <div className="pt-4">
                                            <p className="text-lg">The .APE team is a group of passionate and dedicated apes who are committed to the success of the .APE project. We are a team of developers, designers, and marketers who are all passionate about the ape community and the NFT space. The team behind WNS (Web3 Name Service) have been onboarded for technical development of .APE domains and we are excited to be a part of this innovative project and look forward to working with the community to make .APE domains a success.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-10">
                                    <div className="w-full my-0 bg-white/20 text-white" style={{}}>
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
