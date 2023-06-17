import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount } from "wagmi";
import Logo from "../1.resources/3.files/logo/logobg.webp"
import { GlobalParams } from "../2.views/0.wrapper/darkMode";
import { ConnectWallet } from "../2.views/0.global/wallet/connectWallet";
import { adminsLowerCase } from "../1.resources/2.js/0.global/0.smallfunctions/prepends";

const Sidebar = ({ sidebarOpened, setSidebarOpened }) => {
    let { address } = useAccount();
    const { darkMode, toggleDarkMode } = GlobalParams();

    let css = (link) => { return `${sidebarOpened ? "text-md" : "text-xl"} font-semibold ${window.location.pathname.includes(link) ? 'text-black dark:text-white' : 'text-gray-500 dark:text-neutral-400'}` }

    let links = [
        { name: "Search", link: "/search", icon: ['fas', 'fa-search'] },
        { name: "Avatars", link: "/avatars", icon: ['fas', 'fa-image'] },
    ]

    let links2 = [
        { name: "My names", link: "/mynames", icon: ['fas', 'fa-user'] },
        { name: "Cart", link: "/cart", icon: ['fas', 'fa-shopping-bag'] },
    ]

    let links3 = [
        { name: "Categories", link: "/categories", icon: ['fas', 'fa-layer-group'] },
        { name: "Marketplace", link: "/marketplace", icon: ['fas', 'fa-store'] },
    ]

    let links4 = [
        { name: "Reserve", link: "/admin/reserve", icon: ['fas', 'fa-lock'] },
    ]


    return (
        <div className={`text-black dark:text-white py-5 flex flex-1 flex-col h-screen overflow-y-hidden ${sidebarOpened ? "px-5" : "px-3"}`}>
            <div className="flex flex-col overflow-y-hidden">
                <div className="">
                    <a href="/">
                        <img src={darkMode ? Logo : Logo} className="w-12 h-12 md:w-10 md:h-10 rounded-lg" />
                        {sidebarOpened ? (
                            <p className="text-lg font-bold mt-3">Dot Ape</p>
                        ) : (null)}
                    </a>
                </div>
                <div className="flex flex-col flex-1 overflow-y-scroll">
                    <div className="mt-8">
                        {sidebarOpened ? (
                            <p className="text-xs font-semibold text-neutral-400">EXPLORE</p>
                        ) : (null)}
                        <LinksMapping links={links} css={css} sidebarOpened={sidebarOpened} />
                    </div>

                    <div className="mt-8">
                        {sidebarOpened ? (
                            <p className="text-xs font-semibold text-neutral-400">MARKET</p>
                        ) : (null)}
                        <LinksMapping links={links3} css={css} sidebarOpened={sidebarOpened} />
                    </div>

                    <div className="mt-8">
                        {sidebarOpened ? (
                            <p className="text-xs font-semibold text-neutral-400">ACCOUNT</p>
                        ) : (null)}
                        <LinksMapping links={links2} css={css} sidebarOpened={sidebarOpened} />
                    </div>

                    {adminsLowerCase.includes(address?.toLowerCase()) ? (
                        <div className="mt-8">
                            {sidebarOpened ? (
                                <p className="text-xs font-semibold text-neutral-400">ADMIN</p>
                            ) : (null)}
                            <LinksMapping links={links4} css={css} sidebarOpened={sidebarOpened} />
                        </div>
                    ) : (null)}
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-end ">
                {sidebarOpened ? (
                    <div >
                        {address != null ? (
                            <div className="mt-8">
                                <ConnectWallet format={"text"} />
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-dark900 rounded-2xl px-4 py-4 border-2 border-gray-200 dark:border-dark800">
                                <p className="text-sm text-gray-500 dark:text-neutral-400 balance-text">Connect your wallet to get started</p>
                                <div className="mt-2">
                                    <ConnectWallet format={"text"} />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (<div className="flex items-center justify-center">
                    {address != null ? (
                        <div className="mt-8">
                            <ConnectWallet type={"mobile"} />
                        </div>
                    ) : (
                        <div>
                            <ConnectWallet type={"mobile"} />
                        </div>
                    )}
                </div>)}
            </div>
        </div>
    );

}

export default Sidebar;

const LinksMapping = ({ links, css, sidebarOpened }) => {

    let mapping = links.map((link, index) => {
        return (
            <div className={`flex items-center gap-x-3 py-3 cursor-pointer ${sidebarOpened ? "justify-start" : "justify-center"}`} key={index} onClick={() => window.location = link.link}>
                <div className="w-[20px] flex items-center justify-center">
                    <FontAwesomeIcon icon={link.icon} className={css(link.link)} />
                </div>
                {sidebarOpened ? (
                    <p className={`text-md font-semibold ${window.location.pathname.includes(link.link) ? 'text-black dark:text-white' : 'text-gray-500 dark:text-neutral-400'} `}>{link.name}</p>
                ) : (null)}
            </div>
        )
    })
    return mapping;
}
