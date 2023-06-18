import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount } from "wagmi";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import CloudContracts from "../../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { getCloudProvider } from "../../../1.resources/2.js/0.global/2.contracts/cloudProvider";
import Register from "./modal/register";
import { ConnectWallet } from "../../0.global/wallet/connectWallet";
import PresaleRegister from "./modal/presaleRegister";
import { shortenaddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/global";
import makeBlockie from "ethereum-blockies-base64";
import { formatinusd, usdToEth } from "../../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import { callW3Api } from "../../../1.resources/2.js/0.global/3.api/callW3Api";
import { teamAddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/prepends";

const Price = ({ name, isReserved, reservedAddress, reservedDomain, reservedLoading }) => {
    let { address } = useAccount();
    const [duration, setDuration] = useState(1);
    const [primaryName, setPrimaryName] = useState(true);
    const [costEth, setCostEth] = useState(0);
    const [initLoading, setInitLoading] = useState(true);
    let [registerModal, setRegisterModal] = useState(false);
    const [isCart, setIsCart] = useState(false);
    const [cartSucess, setCartSucess] = useState(false);
    const [totalCredits, setTotalCredits] = useState(0);
    const [creditsLeft, setCreditsLeft] = useState(0);
    const [presaleLoading, setPresaleLoading] = useState(true);
    const [presaleModal, setPresaleModal] = useState(false);

    function changeDuration(param) {
        if (param == "plus") {
            setDuration(duration + 1);
        } else {
            if (duration > 1) {
                setDuration(duration - 1);
            }
        }
    }

    async function init() {
        setInitLoading(true);
        let [result1] = await Promise.all([
            CloudContracts().apeRegistrarContract.getCost(name, 1)
        ])
        setCostEth(parseFloat(result1.toString()));
        if (address.toLowerCase() == teamAddress.toLowerCase()) {
            setCostEth(0);
        }
        setInitLoading(false);
    }
    useEffect(() => {
        if (name.length > 2 && !name.includes(".")) {
            init();
        }
    }, [name])

    useEffect(() => {
        let cart = localStorage.getItem("cart");
        if (cart != null) {
            cart = JSON.parse(cart);
            let cartnames = cart.map((item) => {
                return item.name;
            })
            if (cartnames.includes(name)) {
                setIsCart(true);
            } else {
                setIsCart(false);
            }
        }
    }, [name])

    function addToCart() {
        let cart = localStorage.getItem("cart");
        if (cart == null) {
            cart = [{ name: name, duration: duration }];
        } else {
            cart = JSON.parse(cart);
            let cartnames = cart.map((item) => {
                return item.name;
            })
            if (!cartnames.includes(name)) {
                cart.push({ name: name, duration: duration });
            }

        }
        localStorage.setItem("cart", JSON.stringify(cart));
        setIsCart(true);
        setCartSucess(true);
    }

    async function checkPresale() {
        setPresaleLoading(true);
        let credits = await callW3Api("/presale/credits/get", { address: address });
        setTotalCredits(credits.totalCredits);
        let left = await usdToEth(credits.creditsLeft);
        setCreditsLeft(parseFloat(left) * 1e18);
        setPresaleLoading(false);
    }

    useEffect(() => {
        if (address != null) {
            checkPresale();
        }
    }, [address])

    return (
        <div className="my-8">
            <div className="border-0 md:dark:border border-zinc-200 dark:border-dark700 bg-zinc-100 dark:bg-dark800 rounded-2xl px-0 md:px-8 py-8 pb-10">

                <p className="text-2xl font-bold">Register</p>


                <div className="border-2 dark:border border-zinc-300 dark:border-dark600 px-2 py-2 rounded-full mt-8">
                    <div className="w-full flex justify-between items-center">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${duration > 1 ? "bg-main" : "bg-dark500 dark:bg-dark600"}`} onClick={() => changeDuration("minus")}>
                            <FontAwesomeIcon icon={['fas', 'minus']} className="text-white text-sm" />
                        </div>
                        <div>
                            <p className="text-lg font-bold">{duration} year</p>
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center bg-main rounded-full" onClick={() => changeDuration("plus")}>
                            <FontAwesomeIcon icon={['fas', 'plus']} className="text-white text-sm" />
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-x-2">
                    <FontAwesomeIcon icon={['fas', 'info-circle']} className="text-zinc-500 dark:text-dark500 text-sm" />
                    <p className="text-sm text-zinc-500 dark:text-dark500">Extending for multiple years will save money on gas fees.</p>
                </div>

                <div>
                    {/* <div className="flex justify-between items-center mt-8">
                        <p className="text-md text-zinc-500 dark:text-dark500">Price</p>
                        <p className="text-md text-zinc-500 dark:text-dark500">{costEth == 0 ? "-" : (costEth * duration / 1e18).toFixed(4)} ETH</p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <p className="text-md text-zinc-500 dark:text-dark500">Est. gas fees</p>
                        <p className="text-md text-zinc-500 dark:text-dark500">{gas == 0 ? "-" : (gas / 1e18).toFixed(4)} ETH</p>
                    </div> */}

                    <div className="flex justify-between items-center mt-8">
                        <p className="text-xl font-bold">Price</p>
                        <div>
                            <p className="text-xl font-bold">{costEth == 0 ? "-" : (((costEth * duration)) / 1e18).toFixed(4)} ETH</p>
                        </div>
                    </div>

                </div>

                {address != null ? (
                    <div className="flex justify-between items-center mt-8 px-4 py-4 rounded-2xl border-2 dark:border border-zinc-300 dark:border-dark600" onClick={() => setPrimaryName(!primaryName)}>
                        <div className="w-10/12">
                            <p className="text-md text-black dark:text-white font-semibold">Use as primary name</p>
                            <p className="text-sm text-zinc-500 dark:text-dark500 mt-1">This allows dApps to display it as your profile when connected to them. You can only have one primary name per address.</p>
                        </div>
                        {primaryName ? (
                            <div className="w-10 bg-main rounded-full flex justify-end px-1 py-1" >
                                <FontAwesomeIcon icon="circle" className="text-white" />
                            </div>
                        ) : (
                            <div className="w-10 bg-dark500 rounded-full flex justify-start px-1 py-1" >
                                <FontAwesomeIcon icon="circle" className="text-white" />
                            </div>
                        )}
                    </div>
                ) : (
                    null
                )}


                {cartSucess ? (
                    <div className='flex items-center justify-start gap-x-2 mt-8'>
                        <FontAwesomeIcon icon={['fas', 'fa-check-circle']} className="text-main text-sm" />
                        <p className='text-sm font-bold text-center text-main'>Successfully added to cart</p>
                    </div>
                ) : (null)}

                {/* <div className="mt-8">
                    <div className="flex items-center justify-start gap-x-4">
                        <FontAwesomeIcon icon={['fas', 'info-circle']} className="text-main text-sm" />
                        <p className="text-sm text-main font-semibold">Registration is only active for presale participants</p>
                    </div>
                </div> */}

                {address == null ? (
                    <div className="mt-8">
                        <div className="mt-8">
                            <ConnectWallet />
                        </div>
                    </div>
                ) : (
                    reservedLoading ? (
                        <div className="mt-8">
                            <FontAwesomeIcon icon={['fas', 'circle-notch']} className="text-main text-sm animate-spin" />
                        </div>
                    ) : (
                        isReserved ? (
                            reservedAddress?.toLowerCase() == address?.toLowerCase() ? (
                                <div className="mt-8">
                                    <div className="flex items-center justify-start gap-x-4">
                                        <FontAwesomeIcon icon={['fas', 'info-circle']} className="text-main text-sm" />
                                        <p className="text-sm text-main font-semibold">Registration for this name is reserved for your address.</p>
                                    </div>
                                    <button className=" bg-main rounded-full px-4 py-3 text-white font-semibold w-fit text-sm mt-8 flex items-center gap-x-2" onClick={() => setRegisterModal(true)}>
                                        <p>Register</p>
                                        <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-white text-sm" />
                                    </button>
                                </div>) : (
                                <div className="mt-8">
                                    <div className="flex items-center justify-start gap-x-4">
                                        <FontAwesomeIcon icon={['fas', 'info-circle']} className="text-main text-sm" />
                                        <div className="flex items-center justify-start gap-x-2">
                                            <p className="text-sm text-main font-semibold">Registration for this name is reserved for</p>
                                            <a href={"/address/" + reservedAddress} className="flex items-center justify-start gap-x-2 bg-blueInfoBg px-4 py-2 rounded-full cursor-pointer">
                                                <img src={makeBlockie(reservedAddress)} className="w-4 h-4 rounded-full" />
                                                <p className="text-sm text-main font-normal">{reservedDomain}</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="flex items-center gap-x-2 mt-8">
                                <button className=" bg-main rounded-full px-4 py-3 text-white font-semibold w-fit text-sm" onClick={() => setRegisterModal(true)}>Register</button>
                                {isCart ? (null) : (
                                    <button className=" rounded-full px-4 py-3 text-main font-semibold w-fit text-sm" onClick={() => addToCart()}>Add to Cart</button>
                                )}
                            </div>)
                    )
                )}

                {address ? (presaleLoading || initLoading ? (
                    <div className="mt-0">
                        {null}
                    </div>
                ) : (
                    !isReserved && totalCredits > 0 && creditsLeft > 0 ? (
                        <div className="mt-8">
                            <button className="rounded-full text-main font-semibold w-fit text-sm mt-8 flex items-center gap-x-2" onClick={() => setPresaleModal(true)}>
                                <p>Register using credits</p>
                                <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-main text-sm" />
                            </button>
                        </div>
                    ) : (null)
                )
                ) : (null)}


                <Register name={name} isOpen={registerModal} setIsOpen={setRegisterModal} costEth={costEth} duration={duration} primaryName={primaryName} creditsLeft={creditsLeft} />
                <PresaleRegister name={name} isOpen={presaleModal} setIsOpen={setPresaleModal} costEth={costEth} duration={duration} primaryName={primaryName} creditsLeft={creditsLeft} />
            </div>
        </div>
    );

}

export default Price;

