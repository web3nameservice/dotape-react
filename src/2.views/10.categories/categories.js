import React, { useState, useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeaderSearch from "../0.global/header/search";
import { GlobalParams } from "../0.wrapper/darkMode";


const Categories = ({ }) => {
    const { darkMode } = GlobalParams();

    useEffect(() => {
        document.title = "Categories - DOT APE";
    }, [])

    return (
        <div className={`h-full w-full flex flex-col justify-between bg-white dark:bg-dark900`}>
            <div className=" w-full h-full relative flex justify-center">
                <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl">
                    <div className="w-12/12 py-10">
                        <div className="mt-0">
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

export default Categories;

export function CategoriesDiv() {

    let items = [
        { "name": "999 Club", subheading: "000-999", "link": "/category/premium", "icon": "fa-star", color: "#F2A840" },
        { "name": "3 Letters", subheading: "abc / 123", "link": "/category/premium", "icon": "fa-star", color: "#F2A840" },
        { "name": "10k Club", subheading: "1000-9999", "link": "/category/premium", "icon": "fa-star", color: "#773FDD" },
        { "name": "100k Club", subheading: "10000-9999", "link": "/category/premium", "icon": "fa-star", color: "#1EBE82" },
        { "name": "Dictionary", subheading: "A-Z", "link": "/category/dictionary", "icon": "fa-book", color: "#EF4146" },
        { "name": "First Names", subheading: "John / Michael", "link": "/category/names", "icon": "fa-users", color: "#F2A840" },
        { "name": "Countries", subheading: "Germany / France", "link": "/category/countries", "icon": "fa-globe", color: "#1EBE82" },
        { "name": "Cities", subheading: "London / Paris", "link": "/category/cities", "icon": "fa-city", color: "#4176ee" }]
    return (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-6 gap-8 ">

                {items.map((item, index) => (
                    <a key={index} href={"/category/" + item.name.toLowerCase().replace(" ", "-")} className="cursor-pointer">
                        <div className="pt-10 pb-10 px-10 md:px-10 bg-gray-100 dark:bg-dark800 hover:bg-gray-200 hover:dark:bg-dark700 rounded-2xl" >
                            <div className={`w-16 h-16 bg-[${item.color}] flex justify-center items-center`} style={{ backgroundColor: item.color, borderRadius: "18px" }}>
                                <FontAwesomeIcon icon={['fas', item.icon]} style={{ fontSize: "150%" }} className="text-gray-100" />
                            </div>
                            <p className="text-black dark:text-white font-semibold text-2xl pt-10">{item.name}</p>
                            <p className="text-gray-500 dark:text-dark500 pt-2 text-md">{item.subheading}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div >


    );
}