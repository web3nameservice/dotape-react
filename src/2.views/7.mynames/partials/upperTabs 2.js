import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UpperTabs = ({ sorting, setSorting, type }) => {
    let items = [
        { "name": "Recently Created", "link": () => setSorting("recent"), "icon": "" },
        { "name": "Oldest Items", "link": () => setSorting("asoldestc"), "icon": "" },
    ]
    return (
        <div className="my-4 flex justify-between items-center gap-x-2">
            <div className="onlyvertcenter p-2 pl-4 rounded-xl w-full bg-white dark:bg-dark800 border-2 dark:border border-gray-200 dark:border-dark700">
                <FontAwesomeIcon icon={['fas', 'fa-search']} className="text-gray-500 dak:text-dark500" />
                <input type="text" className="font-semibold text-sm w-full bg-transparent outline-none ml-4 py-1" placeholder="Type to search for a domain" />
            </div>
            <DropdownItem name={sorting == "asc" ? items[0].name : sorting == "desc" ? items[1].name : sorting == "recent" ? items[2].name : sorting == "oldest" ? items[3].name : items[0].name} subheading="Sort by" items={items} width="100%" left="0%" />
        </div >
    )
}

export default UpperTabs;


export const DropdownItem = ({ name, subheading, items, width, left }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="dropdown w-[300px] p-3 ml-2 rounded-xl bg-white dark:bg-dark800 border-2 dark:border border-gray-200 dark:border-dark700" >
            <div className="flex items-center justify-between" onClick={() => setIsOpen(!isOpen)}>
                <p className="cursor-pointer font-semibold text-sm">{name}</p>
                <FontAwesomeIcon icon={['fas', "fa-angle-down"]} style={{ fontSize: "80%" }} />
            </div>
            <div>
                <div id="" className="absolute shadowDiv mt-4 bg-white dark:bg-dark800 border border-gray-200 dark:border-dark700 rounded-lg drop-shadow-2xl" style={{ display: isOpen ? "block" : "none", width: width, left: left }}>
                    <p className="text-gray-500 dark:text-dark500 px-4 py-2 text-sm font-semibold border-b border-b-gray-200 dark:border-dark700">{subheading}</p>
                    {items.map((item, index) => (
                        <div key={index} onClick={() => setIsOpen(!isOpen)}>
                            <div className="px-4 py-3 flex items-center cursor-pointer border-b border-b-gray-200 dark:border-dark700 hover:bg-gray-100">
                                {item.icon != "" ?
                                    (
                                        <div style={{ width: "15%" }}>
                                            <FontAwesomeIcon icon={['fas', item.icon]} style={{ fontSize: "80%" }} />
                                        </div>
                                    ) : (
                                        <div style={{ width: "0%" }}>
                                        </div>
                                    )}
                                <div style={{ width: "85%" }}>
                                    <p className="font-semibold text-sm">{item.name}</p>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}