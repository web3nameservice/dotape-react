import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LinksJSON } from "../../0.global/header/links";
import { tokenomics } from "../../0.global/tokenomics";
import { formatinusd } from "../../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion";
import { timeToString } from "../../../1.resources/2.js/0.global/0.smallfunctions/time";
import Bayc1 from "../../../1.resources/3.files/images/bayc1.webp";
import Bayc2 from "../../../1.resources/3.files/images/bayc2.webp";
import Bayc3 from "../../../1.resources/3.files/images/bayc3.webp";
import Bayc4 from "../../../1.resources/3.files/images/bayc4.webp";
import Bayc5 from "../../../1.resources/3.files/images/bayc5.webp";
import Bayc6 from "../../../1.resources/3.files/images/bayc6.webp";
import Bayc7 from "../../../1.resources/3.files/images/bayc7.webp";
import Bayc8 from "../../../1.resources/3.files/images/bayc8.webp";
import Bayc9 from "../../../1.resources/3.files/images/bayc9.webp";
import Bayc10 from "../../../1.resources/3.files/images/bayc10.webp";
import BaycLogo from "../../../1.resources/3.files/images/bayclogo.webp";
import Mayc1 from "../../../1.resources/3.files/images/mayc1.webp";
import Mayc2 from "../../../1.resources/3.files/images/mayc2.webp";
import Mayc3 from "../../../1.resources/3.files/images/mayc3.webp";
import Mayc4 from "../../../1.resources/3.files/images/mayc4.webp";
import Mayc5 from "../../../1.resources/3.files/images/mayc5.webp";
import Mayc6 from "../../../1.resources/3.files/images/mayc6.webp";
import Mayc7 from "../../../1.resources/3.files/images/mayc7.webp";
import Mayc8 from "../../../1.resources/3.files/images/mayc8.webp";
import Mayc9 from "../../../1.resources/3.files/images/mayc9.webp";
import Mayc10 from "../../../1.resources/3.files/images/mayc10.webp";
import MaycLogo from "../../../1.resources/3.files/images/mayclogo.webp";
import Bakc1 from "../../../1.resources/3.files/images/bakc1.webp";
import Bakc2 from "../../../1.resources/3.files/images/bakc2.webp";
import Bakc3 from "../../../1.resources/3.files/images/bakc3.webp";
import Bakc4 from "../../../1.resources/3.files/images/bakc4.webp";
import Bakc5 from "../../../1.resources/3.files/images/bakc5.webp";
import BakcLogo from "../../../1.resources/3.files/images/bakclogo.webp";
import Punk1 from "../../../1.resources/3.files/images/punk1.webp";
import Punk2 from "../../../1.resources/3.files/images/punk2.webp";
import Punk3 from "../../../1.resources/3.files/images/punk3.webp";
import Punk4 from "../../../1.resources/3.files/images/punk4.webp";
import Punk5 from "../../../1.resources/3.files/images/punk5.webp";
import Punk6 from "../../../1.resources/3.files/images/punk6.webp";
import Punk7 from "../../../1.resources/3.files/images/punk7.webp";
import Punk8 from "../../../1.resources/3.files/images/punk8.webp";
import Punk9 from "../../../1.resources/3.files/images/punk9.webp";
import Punk10 from "../../../1.resources/3.files/images/punk10.webp";
import PunkLogo from "../../../1.resources/3.files/images/punklogo.webp";
import $ from "jquery";
import { useRef } from "react";

const Loop = ({ collection }) => {
    console.log(collection);
    return (
        <div className="w-12/12">
            {collection == "bayc" ? (
                <ImageLoop initialImage={BaycLogo} altImages={`${Bayc1};${Bayc2};${Bayc3};${Bayc4};${Bayc5};${Bayc6};${Bayc7};${Bayc8};${Bayc9};${Bayc10}`} link="https://boredapeyachtclub.com/" />
            ) : collection == "mayc" ? (
                <ImageLoop initialImage={MaycLogo} altImages={`${Mayc1};${Mayc2};${Mayc3};${Mayc4};${Mayc5};${Mayc6};${Mayc7};${Mayc8};${Mayc9};${Mayc10}`} link="https://mutantapeyachtclub.com/" />
            ) : collection == "bakc" ? (
                <ImageLoop initialImage={BakcLogo} altImages={`${Bakc1};${Bakc2};${Bakc3};${Bakc4};${Bakc5}`} link="https://boredapekennelclub.com/" />
            ) : collection == "punks" ? (
                <ImageLoop initialImage={PunkLogo} altImages={`${Punk1};${Punk2};${Punk3};${Punk4};${Punk5};${Punk6};${Punk7};${Punk8};${Punk9};${Punk10}`} link="https://www.larvalabs.com/cryptopunks" />
            ) : (null)}
        </div>
    )
}


export default Loop;

class ImageLoop extends React.Component {
    constructor(props) {
        super(props);
        this.initialImage = this.props.initialImage;
        this.currentImage = this.initialImage;
        this.altImagesArray = [this.props.initialImage, ...this.props.altImages.split(";")];
        this.index = 0;
        this.loopTimeout = null;
    }

    handleMouseEnter = () => {
        this.index = 1; // Start with the first alternate image
        this.loopTimeout = setTimeout(this.loop, 100);
    };

    handleMouseLeave = () => {
        clearTimeout(this.loopTimeout);
        this.currentImage = this.initialImage;
        this.forceUpdate();
    };

    loop = () => {
        this.currentImage = this.altImagesArray[this.index];
        this.forceUpdate();

        if (this.index === this.altImagesArray.length - 1) {
            this.index = 1; // Restart from the first alternate image
        } else {
            this.index++;
        }

        this.loopTimeout = setTimeout(this.loop, 100);
    };

    componentWillUnmount() {
        clearTimeout(this.loopTimeout);
    }

    render() {
        return (
            <img
                src={this.currentImage}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                className="img-loop w-full rounded-3xl"
                alt="Gallery image"
            />
        );
    }
}
