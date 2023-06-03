import React, { useState, useContext } from "react";
import BgImage from "../../../1.resources/3.files/images/4.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from "../../0.global/header/header";
import Img1 from "../../../1.resources/3.files/images/1.png";
import Img2 from "../../../1.resources/3.files/images/2.png";
import Img3 from "../../../1.resources/3.files/images/3.png";
import Img4 from "../../../1.resources/3.files/images/4.png";
import Img5 from "../../../1.resources/3.files/images/5.png";
import Img6 from "../../../1.resources/3.files/images/6.png";
import Img7 from "../../../1.resources/3.files/images/7.png";
import BgImg from "../../../1.resources/3.files/images/bg.gif";

import Ticker from "react-ticker";
import { useEffect } from "react";
import Footer from "../../0.global/footer/footer";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";

gsap.registerPlugin(PixiPlugin, MotionPathPlugin);

class Hero extends React.Component {

    componentDidMount() {
        class TextScramble {
            constructor(el) {
                this.el = el
                this.chars = '!<>-_\\/[]{}—=+*^?#________'
                this.update = this.update.bind(this)
            }
            setText(newText) {
                const oldText = this.el.innerText
                const length = Math.max(oldText.length, newText.length)
                const promise = new Promise((resolve) => this.resolve = resolve)
                this.queue = []
                for (let i = 0; i < length; i++) {
                    const from = oldText[i] || ''
                    const to = newText[i] || ''
                    const start = Math.floor(Math.random() * 40)
                    const end = start + Math.floor(Math.random() * 40)
                    this.queue.push({ from, to, start, end })
                }
                cancelAnimationFrame(this.frameRequest)
                this.frame = 0
                this.update()
                return promise
            }
            update() {
                let output = ''
                let complete = 0
                for (let i = 0, n = this.queue.length; i < n; i++) {
                    let { from, to, start, end, char } = this.queue[i]
                    if (this.frame >= end) {
                        complete++
                        output += to
                    } else if (this.frame >= start) {
                        if (!char || Math.random() < 0.28) {
                            char = this.randomChar()
                            this.queue[i].char = char
                        }
                        output += `<span class="dud">${char}</span>`
                    } else {
                        output += from
                    }
                }
                this.el.innerHTML = output
                if (complete === this.queue.length) {
                    this.resolve()
                } else {
                    this.frameRequest = requestAnimationFrame(this.update)
                    this.frame++
                }
            }
            randomChar() {
                return this.chars[Math.floor(Math.random() * this.chars.length)]
            }
        }

        // ——————————————————————————————————————————————————
        // Example
        // ——————————————————————————————————————————————————

        const phrases = [
            'bored.ape',
            'jimmy.ape',
            'emily.ape',
            'michael.ape',
            'mia.ape',
            'david.ape',
            'chris.ape',
            'robert.ape',
            'daniel.ape',
            'michelle.ape',
            'kim.ape',
            'jason.ape',
            'sarah.ape',
            'jennifer.ape',
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

        ]

        const el = document.querySelector('.text')
        const fx = new TextScramble(el)

        let counter = 0
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 800)
            })
            counter = (counter + 1) % phrases.length
        }

        next()

    }
    render() {
        return (
            <div className="">
                <div className="min-w-screen min-h-screen flex flex-col overflow-x-hidden basic" >
                    <div className="flex-none ">
                        <Header />
                    </div>
                    <div className="grow flex items-center justify-center ">

                        <div className="flex flex-col justify-center items-center mt-0 ">

                            <div className="w-full lg:w-[1280px] md:px-10 lg:px-0 py-10 pb-20" >
                                <div className="text text-white text-5xl md:text-9xl font-bold text-center">
                                    hello world
                                </div>
                                {/* <p className="text-white text-8xl font-bold pt-2 text-center">.Ape is your identity</p> */}
                                <p className="text-white text-center pt-8 md:pt-16 text-xl text-3xl md:text-4xl">Hey, what's your .ape?</p>

                                {/* <div className="flex justify-start items-start pt-8">
                                <div className="bg-main px-4 py-2 w-fit rounded-full flex items-center gap-x-2 z-0">
                                    <p className="text-white">Buy now</p>
                                    <FontAwesomeIcon icon={['fas', 'chevron-right']} className="text-white text-sm" />
                                </div>
                            </div> */}
                            </div>
                            {/* <div className="pb-20">
                                <ImageBanner />
                            </div> */}
                        </div>
                    </div>

                    {/* <div className="flex-none flex justify-center pb-10">
                <div>
                    <p className="text-white">Scroll down</p>
                    <div className="flex justify-center items-center">
                        <FontAwesomeIcon icon={['fas', 'chevron-down']} className="text-white text-lg pt-6 animate-bounce" />
                    </div>
                </div>
            </div> */}


                </div>
            </div>
        );
    }
}

export default Hero;


export const ImageBanner = ({ }) => {
    let carouselItems = [
        { "index": "1", "image": Img1 },
        { "index": "2", "image": Img2 },
        { "index": "3", "image": Img3 },
        { "index": "4", "image": Img4 },
        { "index": "5", "image": Img5 },
        { "index": "6", "image": Img6 },
        { "index": "7", "image": Img7 },
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

    const [array, setArray] = useState(phrases)
    const [refresh, setRefresh] = useState(0)


    useEffect(() => {
        setArray(phrases);
        setRefresh(refresh + 1)
    }, [])

    return (
        <div className="py-3 flex items-center" style={{}}>
            <div className="w-screen my-10" style={{}}>
                <Ticker style={{}} key={refresh} >
                    {({ index }) => (
                        <div className="">
                            <div style={{ display: "flex" }}>
                                <GetMapping array={array} />

                            </div>
                            {/* <div className="flex mt-10">
                                <GetMapping2 array={array} />
                            </div> */}
                            {/* <div className="flex mt-10 ml-40">
                                <GetMapping array={array} />

                            </div> */}
                            {/* <div className="flex mt-10">
                                <GetMapping2 array={array} />
                            </div>
                            <div className="flex mt-10">
                                <GetMapping2 array={array} />
                            </div>
                            <div className="flex mt-10">
                                <GetMapping2 array={array} />
                            </div> */}
                            {/* <div className="flex mt-10">
                                <GetMapping array={array} />

                            </div>
                            <div className="flex mt-10 ml-40">
                                <GetMapping array={array} />

                            </div> */}
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
            <img src={process.env.REACT_APP_API_URL + "/metadata/generateimage=" + item} className='w-80 h-80' style={{ borderRadius: "40px" }} />
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