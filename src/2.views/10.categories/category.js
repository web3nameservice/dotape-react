import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount, useSigner } from "wagmi";
import CloudContracts from "../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { calculateZeroes, currentEthPrice, usdToEth } from "../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import { GlobalParams } from "../0.wrapper/darkMode";
import { zeroAddress } from "../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import UpperTabs from "../7.mynames/partials/upperTabs";
import InfiniteScroll from 'react-infinite-scroll-component';
import CategoryUpper from "./upper/upper";
import CategoryLower from "./lower/lower";


const Category = ({ }) => {
    const [total, setTotal] = useState(0);
    const [owners, setOwners] = useState(0);
    const [category, setCategory] = useState("");

    async function init() {
        let categoryName = window.location.pathname.replace("/category/", "").replace("-", " ");
        categoryName = categoryName.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        document.title = categoryName + " - DOT APE";
        setCategory(categoryName);
    }


    useEffect(() => {
        init();
    }, [])

    return (
        <div className="bg-white dark:bg-zinc-900 text-black dark:text-white h-full flex flex-col justify-between">
            <CategoryUpper total={total} owners={owners} category={category} />
            <CategoryLower total={total} setTotal={setTotal} category={category} />
        </div >
    );

}

export default Category;

