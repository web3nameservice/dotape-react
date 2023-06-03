import React, { useState, useEffect, useContext } from "react";
import Home from "./2.views/1.home/home";
import Header from "./2.views/0.global/header/header";
import Footer from "./2.views/0.global/footer/footer";
import BgImg from "./1.resources/3.files/images/bg3.gif";
import Presale from "./2.views/2.presale/presale";
import Links from "./2.views/5.links/links";

class Main extends React.Component {


  render() {
    return (
      <div style={{}} className="min-h-screen bg-black" style={{ backgroundImage: `url(${BgImg})`, backgroundPosition: "center center", backgroundSize: "cover", backgroundAttachment: "fixed" }}>
        {window.location.pathname == "/links" ? <Links /> : (
          <div className="flex flex-col justify-between min-h-screen">

            <div>
              {window.location.pathname == "/" ? <Home /> : null}
              {window.location.pathname == "/presale" ? <Presale /> : null}

            </div>
          </div>
        )}


      </div >
    );
  }
}

export default Main;


