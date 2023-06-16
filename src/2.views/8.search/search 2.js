import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeaderSearch from "../0.global/header/search";
import { GlobalParams } from "../0.wrapper/darkMode";
import { CategoriesDiv } from "../10.categories/categories";


const Search = ({ }) => {
    const { darkMode } = GlobalParams();

    useEffect(() => {
        document.title = "Search - DOT APE";
    }, [])

    return (
        <div className={`h-full w-full flex flex-col justify-between bg-white dark:bg-dark900`}>
            <div className=" w-full h-full relative flex justify-center">
                <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl ">
                    <div className="w-12/12 py-10">
                        <p className="text-4xl font-bold text-start text-black dark:text-white">Search</p>
                        <p className="text-md text-start text-gray-500 dark:text-neutral-500 mt-1">Search for a .ape name</p>
                        <div className="w-full flex justify-center items-center mt-4">
                            <HeaderSearch />
                        </div>

                        <div className="mt-28">
                            <p className="text-4xl font-bold text-start text-black dark:text-white mt-0">Explore Categories</p>
                            <p className="text-md text-start text-gray-500 dark:text-neutral-500 mt-1">Browse through our categories</p>

                            <div className="mt-0">
                                <CategoriesDiv />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );

}

export default Search;