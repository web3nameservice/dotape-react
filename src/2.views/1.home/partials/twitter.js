import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Links, { LinksJSON } from "../../0.global/header/links";
import { tokenomics } from "../../0.global/tokenomics";
import { formatinusd } from "../../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import { timeToString } from "../../../1.resources/2.js/0.global/0.smallfunctions/time";
import { TwitterTimelineEmbed } from 'react-twitter-embed';


const Twitter = ({ }) => {


    return (
        <div id="about" className="min-w-screen min-h-screen flex justify-center items-center">

            <div className="w-full lg:w-[1280px]  px-0 py-10 lg:rounded-xl basic flex flex-col lg:flex-row justify-between items-center">

                <div className="w-full  md:w-[600px] h-[600px] md:h-[800px] bg-white rounded-xl">
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="WEWEmemecoin"
                        options={{ height: window.innerWidth < 786 ? 600 : 800 }}
                    />
                </div>
                <div className="w-full md:w-[600px] bg-main h-[500px] md:h-[800px] rounded-xl px-20 py-20 mt-20 lg:mt-0">
                    <p className="text-6xl md:text-8xl font-bold text-white">Follow $WEWE on Twitter</p>
                    <a href="https://twitter.com/WEWEmemecoin" target="_blank" className="flex items-center gap-x-2 mt-12 bg-white px-4 py-2 rounded-full w-fit">
                        <p className="text-main">Go to Twitter</p>
                        <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-lg text-main" />
                    </a>
                </div>

            </div>

        </div>
    );

}

export default Twitter;
