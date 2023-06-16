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
        <div className="">

            <div className="sticky top-0 overflow-x-hidden">
                <Hero />
            </div>
            {/* <About />
            <Twitter /> */}
            <div className="bg-black relative text-black dark:text-white z-10">
                <div className="w-full flex items-center justify-center py-10 pt-20">
                    <div>
                        <div className="w-full flex items-center justify-center ">
                            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">
                                <div className="py-10">
                                    <p className="text-7xl md:text-8xl lg:text-9xl font-bold" style={{ lineHeight: window.innerWidth < 786 ? "100px" : "160px" }}>DOT APE</p>
                                    <p className="text-3xl md:text-4xl pt-0 text-neutral-400 breal-word">A decentralised naming service designed specifically for the innovative, exclusive, and groundbreaking community of all degen ape members and supporters.</p>
                                </div>

                            </div>
                        </div>
                        <div className="py-8">
                            <ImageBanner />
                        </div>
                        <div className="w-full flex items-center justify-center ">

                            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">
                                <div className="pt-10">
                                    {/* <p className="text-6xl md:text-8xl font-bold">.APE for BAYC</p> */}
                                    {/* <p className="text-6xl md:text-8xl font-bold pt-2">.APE for MAYC</p> */}
                                    {/* <p className="text-6xl md:text-8xl font-bold pt-2">.APE for BAKC</p> */}
                                    {/* <p className="text-6xl md:text-8xl font-bold pt-2">.APE for PUNKS</p> */}
                                    {/* <p className="text-6xl md:text-8xl font-bold pt-2">.APE for MEEBITS</p> */}
                                    <div className="flex">
                                        <div className="">
                                            <p className="text-3xl md:text-6xl lg:text-7xl font-semibold pt-8">.ape for all degens 🤡</p>
                                            <p className="text-3xl md:text-6xl lg:text-7xl font-semibold pt-8">.ape for all fam 🫂</p>
                                            <p className="text-3xl md:text-6xl lg:text-7xl font-semibold pt-8">.ape for all apes 🦍</p>
                                            <p className="text-3xl md:text-6xl lg:text-7xl font-semibold pt-8">.ape for everyone 🌍</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 mt-20 md:gap-10 lg:gap-20 py-18 pt-5 md:pt-20 px-0 md:px-0">
                                        <div className="rounded-3xl bg-[#3F6CEB] px-6 md:px-10 pt-12 md:pt-2 pb-12 md:pb-10 flex flex-col justify-center items-center">
                                            <img src={Ethereum} className="rounded-3xl w-8/12" />
                                            <p className="text-5xl lg:text-6xl font-semibold pt-4">Built on</p>
                                            <p className="text-5xl lg:text-6xl font-semibold pt-4">Ethereum</p>
                                        </div>
                                        <div className="rounded-3xl bg-[#000] px-4 py-10 flex flex-col justify-center items-center mt-10 md:mt-0">
                                            <p className="text-5xl lg:text-6xl font-semibold pt-4">Fueled by</p>
                                            <p className="text-5xl lg:text-6xl font-semibold pt-4">Apecoin</p>
                                            <img src={Apecoin} className="rounded-3xl w-10/12 pt-6" />
                                        </div>
                                        {/* <Loop collection={"bayc"} /> */}
                                        {/* <Loop collection={"mayc"} />
                                        <Loop collection={"bakc"} />
                                        <Loop collection={"punks"} /> */}
                                    </div>

                                    <div className="pt-16 md:pt-40">
                                        <p className="text-4xl md:text-4xl break-word  px-0 md:px-20 lg:px-40">.APE empowers the ape inside everyone to establish their unique identity in the decentralised web with a .APE domain. </p>
                                        {/* <p className="text-4xl md:text-4xl pt-24 break-word text-center px-40">.APE domains are designed to be as unique as the apes they represent, leveraging the power of blockchain technology to guarantee their ownership and authenticity. </p> */}
                                    </div>

                                    <div className="px-0">
                                        <div className="my-20 md:my-40 bg-dark900 py-20 px-5 md:px-20 rounded-2xl">
                                            <p className="text-6xl text-center font-bold uppercase">Pricing for all</p>
                                            <div className="grid grid-cols-2 gap-x-5 md:gap-x-20 gap-y-10 md:gap-y-20 mt-20">
                                                <div className="bg-dark800 rounded-xl px-5 lg:px-20 py-16 lg:py-16 flex flex-col justify-center">
                                                    <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center pt-6">$640</p>
                                                    <p className="text-md md:text-lg text-center pt-2 text-dark500">per year</p>
                                                    <p className="text-md md:text-2xl text-center pt-0 pt-6">3 characters</p>
                                                </div>
                                                <div className="bg-dark800 rounded-xl px-5 lg:px-20 py-16 lg:py-16 flex flex-col justify-center">
                                                    <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center pt-6">$120</p>
                                                    <p className="text-md md:text-lg text-center pt-2 text-dark500">per year</p>
                                                    <p className="text-md md:text-2xl text-center pt-0 pt-6">4 characters</p>
                                                </div>
                                                <div className="bg-dark800 rounded-xl px-5 lg:px-20 py-16 lg:py-16 flex flex-col justify-center">
                                                    <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center pt-6">$50</p>
                                                    <p className="text-md md:text-lg text-center pt-2 text-dark500">per year</p>
                                                    <p className="text-md md:text-2xl text-center pt-0 pt-6">5 characters</p>
                                                </div>
                                                <div className="bg-dark800 rounded-xl px-5 lg:px-20 py-16 lg:py-16 flex flex-col justify-center">
                                                    <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center pt-6">$10</p>
                                                    <p className="text-md md:text-lg text-center pt-2 text-dark500">per year</p>
                                                    <p className="text-md md:text-2xl text-center pt-0 pt-6">6+ characters</p>
                                                </div>
                                            </div>
                                            <p className="text-2xl md:text-center text-neutral-400 pt-10 px-5 md:px-10 md:px-10 lg:px-28">The cost of .APE domains correlates directly with the number of characters in the domain name. The registration cost is priced yearly with renewals required for maintaining ownership after the registration period ends. </p>
                                        </div>

                                    </div>
                                </div>

                                <div className="mt-0 bg-black text-white px-5 md:px-0 pt-10 pb-20">
                                    <div className="pt-0">
                                        <p className="text-6xl font-bold">TEAM</p>
                                        <div className="pt-4">
                                            <p className="text-xl md:text-3xl leading-relaxed text-neutral-400">The .APE team is a group of passionate and dedicated apes who are committed to the success of the .APE project. We are a team of developers, designers, and marketers who are all passionate about the ape community and the NFT space. DotApe's inception is the brainchild of the seasoned <a href="https://domains.w3.one" target="_blank" className="text-main" >W3 Team</a> behind Web3 Name Service (WNS). </p>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 gap-x-8 lg:gap-x-0 gap-y-8">
                                            <div>
                                                <img src={Pran} className="rounded-2xl w-60" />
                                                <p className="text-lg font-semibold pt-3">pran.ape</p>
                                                <p className="text-md pt-1 text-neutral-400">Product Team</p>
                                            </div>
                                            <div>
                                                <img src={Adam} className="rounded-2xl w-60" />
                                                <p className="text-lg font-semibold pt-3">adam.ape</p>
                                                <p className="text-md pt-1 text-neutral-400">Development Team</p>
                                            </div>
                                            <div>
                                                <img src={Patrick} className="rounded-2xl w-60" />
                                                <p className="text-lg font-semibold pt-3">patrick.ape</p>
                                                <p className="text-md pt-1 text-neutral-400">Business Team</p>
                                            </div>
                                            <div>
                                                <img src={Vincent} className="rounded-2xl w-60" />
                                                <p className="text-lg font-semibold pt-3">vincent.ape</p>
                                                <p className="text-md pt-1 text-neutral-400">Business Team</p>
                                            </div>

                                            <div>
                                                <img src={Andre} className="rounded-2xl w-60" />
                                                <p className="text-lg font-semibold pt-3">andre.ape</p>
                                                <p className="text-md pt-1 text-neutral-400">Communications Team</p>
                                            </div>
                                            <div>
                                                <img src={KongKong} className="rounded-2xl w-60" />
                                                <p className="text-lg font-semibold pt-3">konkong.ape</p>
                                                <p className="text-md pt-1 text-neutral-400">Communications Team</p>
                                            </div>
                                            <div>
                                                <img src={Manuel} className="rounded-2xl w-60" />
                                                <p className="text-lg font-semibold pt-3">manuel.ape</p>
                                                <p className="text-md pt-1 text-neutral-400">Development Team</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="w-full my-0 text-white pb-6" style={{}}>
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
                                <div className="pt-6">
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div>
                    <Footer />
                </div> */}
            </div>

        </div >
    );

}

export default Home;

const Points = ({ text, linkText, link }) => {

    return (
        <div className="flex mt-2 justify-start gap-x-3 items-center">
            <div>
                <FontAwesomeIcon icon={['fas', 'fa-circle']} className="" size="2xs" />
            </div>
            <div className="flex items-center gap-x-2">
                <p className="text-lg">{text}</p>
                <a href={link} className="text-lg text-main">{linkText}</a>
            </div>
        </div>
    )
}
