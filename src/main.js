import React, { useState, useEffect, useContext } from "react";
import Home from "./2.views/1.home/home";
import Header from "./2.views/0.global/header/header";
import Footer from "./2.views/0.global/footer/footer";
import BgImg from "./1.resources/3.files/images/stars7.png";
import BgVid from "./1.resources/3.files/images/bg0.mp4";
import Presale from "./2.views/2.presale/presale";
import Links from "./2.views/5.links/links";
import Sample from "./2.views/sample";

class Main extends React.Component {


  render() {
    return (
      <div style={{}} className="min-h-screen bg-black text-white" style={{ backgroundImage: `url(${BgImg})`, backgroundPosition: "center center", backgroundSize: "cover", backgroundAttachment: "fixed" }}>
        {/* <div className="flex justify-center items-start">
          <video autoPlay muted loop id="myVideo" className="fixed z-0 h-screen">
            <source src={BgVid} type="video/mp4" className="" />
            <img src={BgImg} alt="Alternate Image" />
          </video>
        </div> */}
        <div className="flex flex-col justify-between min-h-screen">

          <div>
            {window.location.pathname == "/" ? <Home /> : null}
            {window.location.pathname == "/presale" ? <Presale /> : null}
            {window.location.pathname == "/sample" ? <Sample /> : null}

          </div>
        </div>

      </div >
    );
  }
}

export default Main;


