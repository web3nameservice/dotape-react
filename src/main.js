import React, { useState, useEffect, useContext } from "react";
import Home from "./2.views/1.home/home";
import Header from "./2.views/0.global/header/header";
import Footer from "./2.views/0.global/footer/footer";
import BgImg from "./1.resources/3.files/images/stars7.webp";
import BgVid from "./1.resources/3.files/images/bg0.mp4";
import Presale from "./2.views/2.presale/presale";
import Links from "./2.views/5.links/links";
import Generator from "./2.views/3.generator/generator";
import Names from "./2.views/4.names/names";
import Cart from "./2.views/6.cart/cart";
import MyNames from "./2.views/7.mynames/mynames";
import Sidebar from "./4.sidebar/sidebar";
import Search from "./2.views/8.search/search";
import Marketplace from "./2.views/9.marketplace/marketplace";
import Category from "./2.views/10.categories/category";
import Categories from "./2.views/10.categories/categories";
import Reserve from "./2.views/11.admin/reserve";

const Main = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpened, setSidebarOpened] = useState(true);

  useEffect(() => {
    if (window.location.pathname == "/") {
      setSidebarOpened(false);
    } else {
      setSidebarOpened(true);
    }
  }, [window.location.pathname])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 1024) {
      setSidebarOpened(false);
    } else {
      if (window.location.pathname != "/") {
        setSidebarOpened(true);
      }
    }
  }, [windowWidth]);

  return (
    <div style={{}} className="min-h-screen w-screen bg-gray-100 dark:bg-black flex items-start">
      <div className="flex-none h-screen hidden md:block" style={{ width: sidebarOpened ? "220px" : "" }}>
        <Sidebar sidebarOpened={sidebarOpened} setSidebarOpened={setSidebarOpened} />
      </div>
      <div className="h-screen w-full md:py-2 md:pr-2 ">
        <div className="w-full h-full border-2 dark:border border-gray-200 dark:border-neutral-800 md:rounded-2xl overflow-hidden overflow-y-scroll flex flex-col" id="scrollableDiv">
          {window.location.pathname == "/" ? (
            null
          ) : (
            <div className="sticky top-0 flex flex-none w-full relative z-50">
              <Header />
            </div>
          )}

          <div className="flex flex-col flex-1 w-full">
            {window.location.pathname == "/" ? <Home /> : null}
            {window.location.pathname == "/search" ? <Search /> : null}
            {window.location.pathname == "/presale" ? <Presale /> : null}
            {window.location.pathname == "/avatars" ? <Generator /> : null}
            {window.location.pathname.includes("/name") ? <Names /> : null}
            {window.location.pathname == "/cart" ? <Cart /> : null}
            {window.location.pathname == "/mynames" ? <MyNames /> : null}
            {window.location.pathname.includes("/address/") ? <MyNames /> : null}
            {window.location.pathname == "/marketplace" ? <Marketplace /> : null}
            {window.location.pathname == "/categories" ? <Categories /> : null}
            {window.location.pathname.includes("/category/") ? <Category /> : null}
            {window.location.pathname.includes("/admin/reserve") ? <Reserve /> : null}
          </div>
        </div>
      </div>

    </div >
  );
}

export default Main;


