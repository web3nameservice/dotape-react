import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Twitter from "../../../1.resources/3.files/images/twitter.webp";
import Discord from "../../../1.resources/3.files/images/discord.webp";
import Etherscan from "../../../1.resources/3.files/images/etherscan.webp";
import Opensea from "../../../1.resources/3.files/images/opensea.webp";

export const LinksJSON = {
    twitter: "https://twitter.com/DotApeLabs",
    telegram: "https://t.me/",
    discord: "https://discord.gg/Kedp5xQxDN",
    etherscan: "https://etherscan.io/address/0x3679f68709dda61c8cbd5fef301c7c92b90c423d",
    cmc: "",
    uniswap: "",
    opensea: "https://opensea.io/collection/dot-ape-domains"
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
