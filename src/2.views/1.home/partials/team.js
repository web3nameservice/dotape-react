import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Adam from "../../../1.resources/3.files/images/adam.avif";
import Pran from "../../../1.resources/3.files/images/pran.avif";
import Vincent from "../../../1.resources/3.files/images/vincent.avif";
import Patrick from "../../../1.resources/3.files/images/patrick.avif";
import Manuel from "../../../1.resources/3.files/images/manuel.avif";
import Andre from "../../../1.resources/3.files/images/andre.avif";
import KongKong from "../../../1.resources/3.files/images/kongkong.avif";

const Team = ({ }) => {


    return (
        <div className="">
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
    );

}

export default Team;
