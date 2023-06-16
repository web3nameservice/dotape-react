import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BgImg from "../../1.resources/3.files/images/bg2.png";
import Footer from "../0.global/footer/footer";
import { useAccount } from "wagmi";
import { ConnectWallet } from "../0.global/wallet/connectWallet";
import { callW3Api, getDomain, getWnsDomain } from "../../1.resources/2.js/0.global/3.api/callW3Api";
import { shortenaddress } from "../../1.resources/2.js/0.global/0.smallfunctions/global";
import CloudContracts from "../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { calculateZeroes } from "../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import { getCloudProvider } from "../../1.resources/2.js/0.global/2.contracts/cloudProvider";
import { timeToString } from "../../1.resources/2.js/0.global/0.smallfunctions/time";
import Header from "../0.global/header/header";
import EmptyImg from "../../1.resources/3.files/images/empty_nft.png";
import { colors } from "../../1.resources/1.css/colors";
import { GlobalParams } from "../0.wrapper/darkMode";
import CartMain from "./partials/main";
import CartSidebar from "./partials/sidebar";
import { zeroAddress } from "../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import { BlockiesGif } from "../0.global/wallet/connectDialog";

const Cart = ({ }) => {
    let { address } = useAccount();
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState([]);

    async function init() {
        if (localStorage.getItem("cart")) {
            let result = JSON.parse(localStorage.getItem("cart"));
            //remove duplicates
            let unique = result.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i);
            let names = unique.map((item) => { return item.name });
            let isRegistered = await CloudContracts().apeResolverContract.resolveNameBatch(names);
            //remove items who address is not zeroAddress
            let filtered = unique.filter((item, index) => {
                return isRegistered[index] == zeroAddress;
            })
            setCart(filtered);
            setIsLoading(false);
            localStorage.setItem("cart", JSON.stringify(filtered));
        } else {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        document.title = "Cart - DOT APE";
        init();
    }, [])


    return (
        <div id="about" className="h-full flex justify-center items-start pb-10 pt-8 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white">

            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">
                {!isLoading ? (
                    cart.length > 0 ? (
                        <div>
                            <div className="lg:hidden gap-x-10">
                                <div className="block lg:hidden">
                                    <p className="text-4xl font-bold">Cart</p>
                                    <p className="text-md mt-2 text-zinc-500 dark:text-zinc-400">You have {cart.length} items in your cart</p>
                                </div>
                                <div className="w-full mt-8">
                                    <CartSidebar cart={cart} setCart={setCart} />
                                </div>
                                <div className="w-full mt-10">
                                    <CartMain cart={cart} setCart={setCart} />
                                </div>
                            </div>
                            <div className="hidden lg:flex justify-between items-start gap-x-10">
                                <div className="w-full lg:w-7/12">
                                    <CartMain cart={cart} setCart={setCart} />
                                </div>
                                <div className="w-full lg:w-5/12">
                                    <CartSidebar cart={cart} setCart={setCart} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <EmptyCart />
                    )
                ) : (
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-dark800 w-[550px] py-20 px-20 rounded-2xl" style={{}}>
                            <BlockiesGif />
                            <div className="pt-10">
                                <p className="text-2xl font-bold text-center">Loading your cart...</p>
                                <p className="text-md mt-3 text-gray-500 dark:text-dark500 text-center">Checking if items are still available</p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>

    );

}

export default Cart;

const EmptyCart = ({ }) => {

    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col justify-start items-start bg-gray-100 dark:bg-dark800 w-[550px] py-20 px-20 rounded-2xl" style={{}}>
                <BlockiesGif />
                <div className="pt-10">
                    <p className="text-2xl font-bold">Oops, Your cart is empty</p>
                    <p className="text-md mt-3 text-gray-500 dark:text-dark500">Try adding .ape names to your cart:</p>
                    <div className="mt-4">
                        <div className="flex items-center gap-x-2 rounded-full px-0 py-1 bg-gray-100 dark:bg-dark800 w-fit mt-2 cursor-pointer">
                            <div className="bg-gray-500 dark:bg-dark700 w-5 h-5 flex justify-center items-center rounded-full">
                                <p className="text-gray-500 dark:text-dark500">1</p>
                            </div>
                            <p className="text-md text-gray-500 dark:text-dark500">Search for a .ape name</p>
                        </div>
                        <div className="flex items-center gap-x-2 rounded-full px-0 py-1 bg-gray-100 dark:bg-dark800 w-fit mt-2 cursor-pointer">
                            <div className="bg-gray-500 dark:bg-dark700 w-5 h-5 flex justify-center items-center rounded-full">
                                <p className="text-gray-500 dark:text-dark500">2</p>
                            </div>
                            <p className="text-md text-gray-500 dark:text-dark500">Select the time period you want to register for</p>
                        </div>
                        <div className="flex items-center gap-x-2 rounded-full px-0 py-1 bg-gray-100 dark:bg-dark800 w-fit mt-2 cursor-pointer">
                            <div className="bg-gray-500 dark:bg-dark700 w-5 h-5 flex justify-center items-center rounded-full">
                                <p className="text-gray-500 dark:text-dark500">3</p>
                            </div>
                            <p className="text-md text-gray-500 dark:text-dark500">Add it to your cart</p>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button onClick={() => window.location = "/search"} className="bg-main text-white rounded-full px-4 py-2 text-md font-bold flex items-center gap-x-2 flex-none">
                        <FontAwesomeIcon icon={['fas', 'fa-search']} className="" />
                        <p>Search</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

const GetSkeletons = ({ paramsArray }) => {
    const { darkMode, toggleDarkMode } = GlobalParams();

    const Mapping = paramsArray.map((item, index) => {
        return (
            <div key={index} style={{ borderRadius: "20px" }} className="mt-6">
                <SkeletonTheme baseColor={darkMode ? colors.zinc700 : colors.zinc200} highlightColor={darkMode ? colors.zinc800 : colors.zinc300} >
                    <Skeleton count={1} style={{
                        paddingTop: "100px",
                        paddingBottom: "100px",
                        borderRadius: "20px",
                    }} />
                </SkeletonTheme>
            </div>
        )
    }
    );
    return Mapping;
}