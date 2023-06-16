import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount } from "wagmi";
import CloudContracts from "../../../1.resources/2.js/0.global/2.contracts/cloudContracts";

const CartMain = ({ cart, setCart }) => {
    let { address } = useAccount();


    function removeFromCart(name) {
        cart = cart.filter(function (item) {
            return item.name != name;
        }
        );
        console.log(cart);
        setCart(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    return (
        <div className="">
            <div className="hidden lg:block">
                <p className="text-4xl font-bold">Cart</p>
                <p className="text-md mt-2 text-zinc-500 dark:text-zinc-400">You have {cart.length} items in your cart</p>
            </div>


            <div className="mt-8 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-2xl">
                <div className="px-8 py-4">
                    {cart.map((item, index) => (
                        <div key={index} className="py-6">
                            <CartItem item={item} removeFromCart={removeFromCart} setCart={setCart} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default CartMain;

const CartItem = ({ item, removeFromCart, setCart }) => {
    const [costEth, setCostEth] = useState(0);

    async function init() {
        let result = await CloudContracts().apeRegistrarContract.getCost(item.name, 1);
        setCostEth(parseFloat(result.toString()));
    }

    useEffect(() => {
        init();
    }, [])

    function changeDuration(type) {
        if (type == "plus") {
            item.duration = item.duration + 1;
        } else {
            if (item.duration > 1) {
                item.duration = item.duration - 1;
            }
        }
        let cart = JSON.parse(localStorage.getItem("cart"));
        //update cart at index
        cart = cart.map((cartItem, index) => {
            if (cartItem.name == item.name) {
                cartItem.duration = item.duration;
            }
            return cartItem;
        })
        localStorage.setItem("cart", JSON.stringify(cart));
        setCart(cart);
    }

    return (
        <div className="flex items-center">

            <a href={"/name/" + item.name} className="block w-16 h-16 rounded-lg flex flex-none">
                <img src={process.env.REACT_APP_API_URL + "/metadata/generateimage=" + item.name + ".ape?400"} className="w-16 h-16 rounded-lg object-cover" />
            </a>
            <div className="flex justify-between items-center w-full px-6">
                <a href={"/name/" + item.name} className="w-4/12">
                    <p className="text-md font-bold">{item.name}.ape</p>
                </a>
                <div className="flex items-center justify-between bg-zinc-200 dark:bg-zinc-700 px-4 py-3 rounded-full w-4/12">

                    <div className={`w-5 h-5 flex items-center justify-center rounded-full ${item.duration > 1 ? "bg-main" : "bg-zinc-400 dark:bg-zinc-600"}`} onClick={() => changeDuration("minus")}>
                        <FontAwesomeIcon icon={['fas', 'minus']} className="text-white text-sm" />
                    </div>
                    <div className="px-4">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.duration} year</p>
                    </div>
                    <div className="w-5 h-5 flex items-center justify-center bg-main rounded-full" onClick={() => changeDuration("plus")}>
                        <FontAwesomeIcon icon={['fas', 'plus']} className="text-white text-sm" />
                    </div>
                </div>
                <div className="w-4/12 flex justify-end">
                    <p className="text-md font-bold">{costEth == 0 ? "-" : (costEth * item.duration / 1e18).toFixed(4)} ETH</p>
                </div>
            </div>
            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 flex justify-center items-center rounded-full flex flex-none" onClick={() => removeFromCart(item.name)}>
                <FontAwesomeIcon icon={['fas', 'times']} className="text-zinc-500 dark:text-zinc-400 text-sm" />
            </div>
        </div>
    )
}