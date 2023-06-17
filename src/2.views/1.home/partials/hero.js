import React, { useState, useContext } from "react";
import BgImage from "../../../1.resources/3.files/images/4.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from "../../0.global/header/header";
import Img0 from "../../../1.resources/3.files/images/nft/0.webp";
import Img1 from "../../../1.resources/3.files/images/nft/1.webp";
import Img2 from "../../../1.resources/3.files/images/nft/2.webp";
import Img3 from "../../../1.resources/3.files/images/nft/3.webp";
import Img4 from "../../../1.resources/3.files/images/nft/4.webp";
import Img5 from "../../../1.resources/3.files/images/nft/5.webp";
import Img6 from "../../../1.resources/3.files/images/nft/6.webp";
import Img7 from "../../../1.resources/3.files/images/nft/7.webp";
import Img8 from "../../../1.resources/3.files/images/nft/8.webp";
import Img9 from "../../../1.resources/3.files/images/nft/9.webp";
import Img10 from "../../../1.resources/3.files/images/nft/10.webp";

import BgBlank from "../../../1.resources/3.files/images/blank331.avif";
import Ticker from "react-ticker";
import { useEffect } from "react";
import Footer from "../../0.global/footer/footer";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
import Scramble from "./scramble";

gsap.registerPlugin(PixiPlugin, MotionPathPlugin);

class Hero extends React.Component {


    render() {
        return (
            <div className="" >
                <div className="w-full flex flex-col overflow-x-hidden" style={{ backgroundImage: `url(${BgBlank})`, backgroundPosition: "center center", backgroundSize: "cover", height: window.innerHeight }}>
                    <div className="grow flex items-center justify-center w-full h-full" >

                        <div className="flex flex-col justify-center items-center mt-0 ">

                            <div className="w-full lg:max-w-[1280px] px-5 md:px-10 lg:px-20 2xl:px-10 lg:rounded-xl pt-10">
                                <div className="text text-white text-5xl md:text-8xl lg:text-9xl font-bold text-center" >
                                    <Scramble />
                                </div>

                                {/* <p className="text-white text-8xl font-bold pt-2 text-center">.Ape is your identity</p> */}
                                <p className="text-white text-center pt-8 md:pt-12 text-xl text-3xl md:text-4xl ">Hey, what's your .ape?</p>

                                <div className="flex items-center justify-center">
                                    <a href="/search" className="bg-white px-4 py-2 rounded-full mt-8 text-main text-md flex items-center gap-x-2 flex-none font-semibold">
                                        <p>Register</p>
                                        <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-main text-md font-bold" />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="flex-none flex justify-center pb-10">
                        <div>
                            <p className="text-white">Scroll down</p>
                            <div className="flex justify-center items-center">
                                <FontAwesomeIcon icon={['fas', 'chevron-down']} className="text-white text-lg pt-6 animate-bounce" />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default Hero;


export const ImageBanner = ({ }) => {
    let carouselItems = [
        { "index": "0", "image": Img0 },
        { "index": "1", "image": Img1 },
        { "index": "2", "image": Img2 },
        { "index": "3", "image": Img3 },
        { "index": "4", "image": Img4 },
        { "index": "5", "image": Img5 },
        { "index": "6", "image": Img6 },
        { "index": "7", "image": Img7 },
        { "index": "8", "image": Img8 },
        { "index": "9", "image": Img9 },
        { "index": "10", "image": Img10 }
    ]

    const phrases = [
        'bored.ape',
        'jimmy.ape',
        'emily.ape',
        'michael.ape',
        'jennifer.ape',
        'david.ape',
        'chris.ape',
        'robert.ape',
        'daniel.ape',
        'michelle.ape',
        'kim.ape',
        'jason.ape',
        'sarah.ape',
        'andrew.ape',
        'joshua.ape',
        'william.ape',
        'joseph.ape',
        'sophia.ape',
        'ashley.ape',
        'james.ape',
        'olivia.ape',
        'isabella.ape',
        'ava.ape',
        'mia.ape'
    ]

    const [array, setArray] = useState(carouselItems)
    const [refresh, setRefresh] = useState(0)


    useEffect(() => {
        setArray(carouselItems);
        setRefresh(refresh + 1)
        //random array of 4

    }, [])

    return (
        <div className="py-3 flex items-center" style={{}}>
            <div className="w-full my-10" style={{}}>
                <Ticker style={{}} key={refresh} >
                    {({ index }) => (
                        <div className="">
                            <div style={{ display: "flex" }}>
                                <GetMapping array={array} />

                            </div>
                        </div>
                    )}
                </Ticker>
            </div>
        </div >
    );

}


const GetMapping = ({ array }) => {
    console.log(array)



    const mapping = array.map((item, index) =>
        <div key={index} className="w-80 h-80 mx-6">
            <img src={item.image} className='w-80 h-80' style={{ borderRadius: "10px" }} />
        </div >
    );
    return mapping;
}

export const GetMapping2 = ({ array }) => {
    const mapping = array.map((item, index) =>
        <div key={index} className="w-[400px] items-center justify-center mx-6">
            <p className="text-xl py-2 text-center">MADE BY APES FOR APES</p>
        </div >
    );
    return mapping;
}