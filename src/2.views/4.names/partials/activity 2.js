import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount } from "wagmi";
import { getDomain } from "../../../1.resources/2.js/0.global/3.api/callW3Api";
import { shortenaddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/global";
import { timeToString } from "../../../1.resources/2.js/0.global/0.smallfunctions/time";

const Activity = ({ tokenId }) => {
    let { address } = useAccount();
    const [activity, setActivity] = useState([]);

    async function init() {
        console.log("finbding");
        let result = await (await fetch(`https://deep-index.moralis.io/api/v2/nft/0x3679f68709dda61c8cbd5fef301c7c92b90c423d/${tokenId}/transfers?chain=eth&format=decimal`, {
            headers: {
                Accept: "application/json",
                "X-Api-Key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImQ1MDQ1YjYwLTI3MjUtNDU2NS05NjJhLTM0NzI1ZmNiNjY1MCIsIm9yZ0lkIjoiMTQ0MjE2IiwidXNlcklkIjoiMTQzODYxIiwidHlwZUlkIjoiZWE4ZDZiNzMtNDBhYi00ZmMyLThmY2EtNTVmNTM1MzNhMzA1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODMwNzIwMjEsImV4cCI6NDgzODgzMjAyMX0.dpS0-7G5V1fpb7U98Oz3r5slP920m5UzlHPjLaF68-E"
            }
        })).json();

        result = result.result;

        //sort by block_number
        result.sort(function (a, b) {
            return b.block_number - a.block_number;
        });
        setActivity(result);
        console.log(result);
    }

    useEffect(() => {
        if (tokenId != null && tokenId != "" && tokenId != "0" && tokenId != 0) {
            init();
        }
    }, [tokenId])

    let css = {
        "header": "text-sm font-semibold text-zinc-500 dark:text-dark500",
        div: "w-1/5 flex items-center justify-start gap-x-2"
    }
    let titles = ["Type", "From", "To", "Price", "Time"]
    return (
        <div className="bg-white dark:bg-dark800 border-2 dark:border border-zinc-200 dark:border-dark700 rounded-2xl px-6 py-6 mt-8">
            <p className="text-md font-semibold">Activity</p>
            <p className="text-sm mt-2 text-zinc-500 dark:text-dark500">{tokenId == 0 ? "Latest activity will appear once the name is registered" : "Latest activity on the Blockchain"}</p>
            {activity.length > 0 ? (
                <div className="">
                    <div className="pl-4 py-4 flex item-center justify-between border-b-2 border-zinc-200 dark:border-dark700">
                        {titles.map((item, index) => (
                            <div key={index} className={css.div} >
                                <p className={css.header}>{item}</p>
                            </div>
                        ))}
                    </div>

                    {activity.map((item, index) => (
                        <div className="pl-4 py-4 flex item-center justify-between border-b-2 border-zinc-200 dark:border-dark700" key={index}>
                            <div className={css.div}>
                                {item.from_address == "0x0000000000000000000000000000000000000000" ? (
                                    <FontAwesomeIcon icon={['fas', 'fa-bolt-lightning']} className="text-zinc-500 dark:text-dark500" />
                                ) : (
                                    <FontAwesomeIcon icon={['fas', 'right-left']} className="text-zinc-500 dark:text-dark500" />
                                )}
                                <p className="text-zinc-500 dark:text-dark500">{item.from_address == "0x0000000000000000000000000000000000000000" ? "Mint" : "Transfer"}</p>
                            </div>
                            <div className={css.div}>
                                <GetDomain address={item.from_address} />
                            </div>
                            <div className={css.div}>
                                <GetDomain address={item.to_address} />
                            </div>
                            <div className={css.div}>
                                <p>{(item.value / 1e18).toFixed(4)} ETH</p>
                            </div>
                            <div className={css.div}>
                                <a href={"https://etherscan.io/tx/" + item.transaction_hash} target="_blank" className="text-main">{timeToString(new Date(item.block_timestamp).getTime())}</a>
                                <FontAwesomeIcon icon={['fas', 'chevron-right']} className="text-main text-sm" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (null)}
        </div>
    );

}

export default Activity;

const GetDomain = ({ address }) => {
    const [domain, setDomain] = useState(shortenaddress(address));

    useState(() => {
        getDomain(address).then((result) => {
            if (result != "null") {
                setDomain(result);
            }
        })
    }, [address])

    return (
        <div>
            <a href={"/address/" + address} className="text-main">{domain}</a>
        </div>
    )
}
