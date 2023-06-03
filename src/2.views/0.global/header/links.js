import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from "../../../1.resources/3.files/logo/logo.png"
import Twitter from "../../../1.resources/3.files/images/twitter.png";
import Telegram from "../../../1.resources/3.files/images/telegram.png";
import Discord from "../../../1.resources/3.files/images/discord.png";
import Etherscan from "../../../1.resources/3.files/images/etherscan.png";
import Uniswap from "../../../1.resources/3.files/images/uniswap.png";
import Cmc from "../../../1.resources/3.files/images/cmc.png";
import Opensea from "../../../1.resources/3.files/images/opensea.png";

export const LinksJSON = {
    twitter: "https://twitter.com/WEWEmemecoin",
    telegram: "https://t.me/WEWEmemecoin",
    discord: "https://discord.gg/Kedp5xQxDN",
    etherscan: "https://etherscan.io/token/0x1e917e764BC34d3BC313fe8159a6bD9d9FFD450d",
    cmc: "https://coinmarketcap.com/currencies/wewe/",
    uniswap: "https://app.uniswap.org/#/tokens/ethereum/0x1e917e764bc34d3bc313fe8159a6bd9d9ffd450d",
    opensea: "https://opensea.io/collection/wewe-meme-coin"
}

const Links = ({ }) => {
    let className = "w-8 h-8 rounded-full bg-black";
    useEffect(() => {
    }, [])
    return (
        <div className="flex justify-center items-center gap-x-4">
            <a href={LinksJSON.twitter} target={"_blank"}>
                <img src={Twitter} className={className} />
            </a>
            <a href={LinksJSON.discord} target={"_blank"}>
                <img src={Discord} className={className} />
            </a>
            <a href={LinksJSON.opensea} target={"_blank"}>
                <img src={Opensea} className={className} />
            </a>
            <a href={LinksJSON.etherscan} target={"_blank"}>
                <img src={Etherscan} className={className} />
            </a>

        </div>
    );

}


export default Links;
