import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount } from "wagmi";
import CloudContracts from "../../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import Register from "./register";
import { ConnectWallet } from "../../0.global/wallet/connectWallet";

const CartSidebar = ({ cart }) => {
    let { address } = useAccount();
    const [costLoading, setCostLoading] = useState(false);
    const [costEth, setCostEth] = useState(0);
    const [registerModal, setRegisterModal] = useState(false);

    async function init() {
        setCostLoading(true);
        let costs = await Promise.all(
            cart.map(async (item) => {
                return CloudContracts().apeRegistrarContract.getCost(item.name, item.duration);
            })
        )
        let total = 0;
        costs.forEach((cost) => {
            total = total + parseFloat(cost.toString());
        }
        );
        setCostEth(total);
        setCostLoading(false);
    }

    useEffect(() => {
        init();
    }, [cart])


    return (
        <div className="lg:min-h-screen bg-white dark:bg-zinc-800 w-full rounded-2xl border-2 border-zinc-200 dark:border-zinc-700">
            <div className="px-8 py-8">
                <div className="flex items-start gap-x-4">
                    <img src={process.env.REACT_APP_API_URL + "/metadata/generateimage=" + cart[0].name + ".ape?400"} className="w-16 h-16 rounded-xl" />
                    <div>
                        <p className="text-xl font-bold">Dot Ape</p>
                        <p className="text-md mt-1 text-zinc-500 dark:text-zinc-400">{cart.length} items</p>
                    </div>
                </div>

                <div className="mt-8 border-t-2 border-zinc-200 dark:border-zinc-700 pt-8">
                    <div className="flex items-center justify-between">
                        <p className="text-md text-zinc-500 dark:text-zinc-400">Subtotal</p>
                        <p className="text-md text-zinc-500 dark:text-zinc-400">{costEth == 0 ? "-" : (costEth / 1e18).toFixed(4)} ETH</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-md text-zinc-500 dark:text-zinc-400">Gas</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">Estimated in your wallet</p>
                    </div>
                    <div className="border-t-2 border-zinc-200 dark:border-zinc-700 pt-4 mt-8">
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-md text-zinc-500 dark:text-zinc-400">Total</p>
                        {!costLoading ? (
                            <p className="text-2xl font-bold text-main">{costEth == 0 ? "-" : (costEth / 1e18).toFixed(4)} ETH</p>
                        ) : (
                            <FontAwesomeIcon icon={['fas', 'circle-notch']} className="text-main text-2xl animate-spin" />
                        )}
                    </div>

                    {/* <div className="mt-8">
                        <div className="flex items-center justify-start gap-x-4">
                            <FontAwesomeIcon icon={['fas', 'info-circle']} className="text-main text-sm" />
                            <p className="text-sm text-main font-semibold">Public registration is not open yet</p>
                        </div>
                    </div> */}

                    <div className="mt-8">
                        {address != null && address != "" ? (
                            <button className="bg-main text-white rounded-full px-4 py-3 flex items-center gap-x-2" onClick={() => setRegisterModal(true)}>
                                <p className="text-sm font-bold">Register</p>
                                <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-white text-sm" />
                            </button>
                        ) : (
                            <ConnectWallet />
                        )}

                    </div>
                </div>
                <Register cart={cart} isOpen={registerModal} setIsOpen={setRegisterModal} costEth={costEth} />
            </div>

        </div >
    );

}

export default CartSidebar;

