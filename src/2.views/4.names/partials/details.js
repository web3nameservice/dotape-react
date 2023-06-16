import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount } from "wagmi";
import { shortenaddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/global";

const Details = ({ name }) => {
    let { address } = useAccount();
    const [isACII, setIsASCII] = useState(true);

    useEffect(() => {
        if (name) {
            let isASCII = /^[\x00-\x7F]*$/.test(name);
            setIsASCII(isASCII);
        }
    }, [name])

    return (
        <div>
            {!isACII ? (
                <div className="bg-white dark:bg-dark800 border-2 dark:border border-zinc-200 dark:border-dark700 rounded-2xl px-6 py-6 mt-8">
                    <div className="flex items-center gap-x-2">
                        <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} className="text-main dark:text-main" size="xs" />
                        <p className="text-md font-semibold text-main">Non-ASCII characters</p>
                    </div>
                    <p className="text-sm font-normal text-dark500 mt-2">This name contains non-ASCII characters. There may be characters that look identical or very similar to other characters.</p>
                    <div className="flex items-center gap-x-2 mt-2">
                        <a href="https://support-kb.ens.domains/en/articles/7901658-homoglyphs" target="_blank" className="text-sm font-normal text-blue-500 dark:text-main">Learn more</a>
                        <FontAwesomeIcon icon={['fas', 'chevron-right']} className="text-blue-500 dark:text-main" size="xs" />
                    </div>
                </div>
            ) : (null)}
            <div className="bg-white dark:bg-dark800 border-2 dark:border border-zinc-200 dark:border-dark700 rounded-2xl px-6 py-6 mt-8">
                <p className="text-md font-semibold">Details</p>

                <div className="mt-4">
                    <Points text="The name will need to be renewed after the registration period ends." />
                    <Points text="The name will appear in your wallet after the transaction goes through on the Blockchain." />
                </div>
            </div>
        </div>
    );

}

export default Details;

const Points = ({ text }) => {

    return (
        <div className="flex items-center gap-x-2 mt-4">
            <FontAwesomeIcon icon={['fas', 'circle']} className="text-zinc-500 dark:text-dark500" size="2xs" />
            <p className="text-sm text-zinc-500 dark:text-dark500">{text}</p>
        </div>
    )
}

