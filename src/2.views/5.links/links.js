import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from "../../1.resources/3.files/logo/logo500.png";
import { LinksJSON } from "../0.global/header/links";


const Links = ({ }) => {

    useEffect(() => {
        document.title = "Links - $WEWE";
    }, [])

    return (
        <div id="about" className="min-w-screen min-h-screen flex justify-center items-center">

            <div className="w-full min-h-screen sm:min-h-fit sm:w-[640px] bg-black px-10 lg:px-20 py-20 md:rounded-xl basic">


                <div className="flex flex-cols justify-center ">
                    <img src={Logo} className="w-40 h-40 md:w-28 md:h-28 rounded-2xl " />
                </div>
                <p className="text-3xl font-bold pt-4 text-center text-white">$WEWE</p>
                <p className="text-lg text-center pt-2 text-white">A memecoin by W3</p>

                <div className="pt-6 flex justify-center items-center gap-x-4">
                    <a href={LinksJSON.twitter} className="w-12 h-12 p-4 rounded-full bg-main w-fit flex justify-center items-center">
                        <FontAwesomeIcon icon={['fab', 'twitter']} className="text-white text-2xl" />
                    </a>
                    <a href={LinksJSON.telegram} className="w-12 h-12 p-4 rounded-full bg-main w-fit flex justify-center items-center">
                        <FontAwesomeIcon icon={['fab', 'telegram']} className="text-white text-2xl" />
                    </a>
                    <a href={LinksJSON.discord} className="w-12 h-12 p-4 rounded-full bg-main w-fit flex justify-center items-center">
                        <FontAwesomeIcon icon={['fab', 'discord']} className="text-white text-2xl" />
                    </a>
                </div>

                <div className="pt-8 flex flex-col gap-y-5">
                    <LinkBtn link={LinksJSON.uniswap} text="Buy now" />
                    <LinkBtn link="/" text="Website" />
                    {/* <LinkBtn link="/presale" text="Presale" /> */}

                    <LinkBtn link={LinksJSON.cmc} text="CoinMarketCap" />
                    <LinkBtn link={LinksJSON.etherscan} text="Etherscan" />
                </div>
            </div>


        </div>
    );

}

export default Links;

const LinkBtn = ({ link, text }) => {

    return (
        <div>
            <a href={link} >
                <div className="flex justify-between items-center bg-main px-8 py-4 w-full rounded-full flex items-center gap-x-2">
                    <p className="text-white">{text}</p>
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-white text-sm" />
                </div>
            </a>
        </div>
    );
}