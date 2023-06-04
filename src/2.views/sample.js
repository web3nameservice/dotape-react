import React, { useState, useContext, useEffect } from "react";
import Scramble from "./1.home/partials/scramble";



const Sample = ({ }) => {
    const [svgUrl, setSvgUrl] = useState(null);
    async function init() {
        const ALPHABET = '0123456789abcdef';


        function generateSVG() {
            const params = {
                quoteToken: "ETH",
                baseToken: "USDT",
                poolAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
                quoteTokenSymbol: "ETH",
                baseTokenSymbol: "USDT",
                feeTier: "0.05%",
                tickLower: -500,
                tickUpper: 500,
                tickSpacing: 5,
                overRange: 2,
                tokenId: 123456789,
                color0: "f37a23",
                color1: "c02aaa",
                color2: "aed2c5",
                color3: "756cc2",
                x1: "100",
                y1: "200",
                x2: "300",
                y2: "400",
                x3: "500",
                y3: "600"
            };




            const svgDefs = generateSVGDefs(params);

            const svg = svgDefs;

            return svg;
        }

        // Example usage
        function convertToBase64URL(svgString) {
            const svgData = btoa(svgString);
            const base64URL = `data:image/svg+xml;base64,${svgData}`;
            return base64URL;
        }
        const svgString = generateSVG();
        const base64URL = `data:image/svg+xml;base64,${btoa(svgString)}`;
        console.log(base64URL);
        setSvgUrl(base64URL);


    }
    useEffect(() => {
        init()
    }, [])
    return (
        <div className="">
            {/* <div className="min-w-screen min-h-screen flex flex-col overflow-x-hidden basic" >
                <div className="grow flex items-center justify-center ">

                    <div className="flex flex-col justify-center items-center mt-0 ">

                        <div className="w-full lg:w-[1280px] md:px-10 lg:px-0 py-10 pb-20" >
                            <div className="text text-white text-5xl md:text-9xl font-bold text-center">
                                <Scramble />
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div> */}
            <img src={svgUrl} />
        </div>
    );

}

export default Sample;


const generateSVGDefs = (params, size) => {
    const aspectRatio = 290 / 290; // Original aspect ratio
    const width = size;
    const height = size / aspectRatio;

    const svgDefs = `
    <svg width="290" height="290" viewBox="0 145 290 290" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <filter id="f1">
          <feImage result="p0" xlink:href="data:image/svg+xml;base64,${btoa(`<svg width='290' height='500' viewBox='0 0 290 500' xmlns='http://www.w3.org/2000/svg'><rect width='290px' height='500px' fill='#${params.color0}'/></svg>`)}" />
          <feImage result="p1" xlink:href="data:image/svg+xml;base64,${btoa(`<svg width='290' height='500' viewBox='0 0 290 500' xmlns='http://www.w3.org/2000/svg'><circle cx='${params.x1}' cy='${params.y1}' r='120px' fill='#${params.color1}'/></svg>`)}" />
          <feImage result="p2" xlink:href="data:image/svg+xml;base64,${btoa(`<svg width='290' height='500' viewBox='0 0 290 500' xmlns='http://www.w3.org/2000/svg'><circle cx='${params.x2}' cy='${params.y2}' r='120px' fill='#${params.color2}'/></svg>`)}" />
          <feImage result="p3" xlink:href="data:image/svg+xml;base64,${btoa(`<svg width='290' height='500' viewBox='0 0 290 500' xmlns='http://www.w3.org/2000/svg'><circle cx='${params.x3}' cy='${params.y3}' r='100px' fill='#${params.color3}'/></svg>`)}" />
          <feBlend mode="overlay" in="p0" in2="p1" />
          <feBlend mode="exclusion" in2="p2" />
          <feBlend mode="overlay" in2="p3" result="blendOut" />
          <feGaussianBlur in="blendOut" stdDeviation="42" />
        </filter>
        <path id="text-path-a" d="M40 12 H250 A28 28 0 0 1 278 40 V460 A28 28 0 0 1 250 488 H40 A28 28 0 0 1 12 460 V40 A28 28 0 0 1 40 12 z" />
        <path id="minimap" d="M234 444C234 457.949 242.21 463 253 463" />
        <filter id="top-region-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="24" />
        </filter>
        <linearGradient id="grad-up" x1="1" x2="0" y1="1" y2="0">
          <stop offset="0.0" stop-color="white" stop-opacity="1" />
          <stop offset=".9" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="grad-down" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0.0" stop-color="white" stop-opacity="1" />
          <stop offset="0.9" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="fade-up" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="url(#grad-up)" />
        </mask>
        <mask id="fade-down" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="url(#grad-down)" />
        </mask>
        <mask id="none" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="white" />
        </mask>
        <linearGradient id="grad-symbol">
          <stop offset="0.7" stop-color="white" stop-opacity="1" />
          <stop offset=".95" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="fade-symbol" maskContentUnits="userSpaceOnUse">
          <rect width="290px" height="200px" fill="url(#grad-symbol)" />
        </mask>
      </defs>
      <g clip-path="url(#corners)">
        <rect fill="#${params.color0}" x="0px" y="0px" width="290px" height="500px" />
        <rect style="filter: url(#f1)" x="0px" y="0px" width="290px" height="500px" />
        // <g style="filter:url(#top-region-blur); transform:scale(1.5); transform-origin:center top;">
        //   <rect fill="none" x="0px" y="0px" width="290px" height="500px" />
        //   <ellipse cx="50%" cy="0px" rx="180px" ry="120px" fill="#000" opacity="0.85" />
        // </g>
      </g>
    </svg>
  `;

    return svgDefs;
}

const generateSVGRareSparkle = () => {
    const svgRareSparkle = `
    <g style="transform:translate(226px, 392px)">
      <rect width="36px" height="36px" rx="8px" ry="8px" fill="none" stroke="rgba(255,255,255,0.2)" />
      <g>
        <path style="transform:translate(6px,6px)" d="M12 0L12.6522 9.56587L18 1.6077L13.7819 10.2181L22.3923 6L14.4341 '11.3478L24 12L14.4341 12.6522L22.3923 18L13.7819 13.7819L18 22.3923L12.6522 14.4341L12 24L11.3478 14.4341L6 22.39'23L10.2181 13.7819L1.6077 18L9.56587 12.6522L0 12L9.56587 11.3478L1.6077 6L10.2181 10.2181L6 1.6077L11.3478 9.56587L12 0Z" fill="white" />
        <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="10s" repeatCount="indefinite"/>
      </g>
    </g>`;
    return svgRareSparkle;
}