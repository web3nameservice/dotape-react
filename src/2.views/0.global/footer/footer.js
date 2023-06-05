import React from 'react';
import Logo from "../../../1.resources/3.files/logo/logo_white2.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Links from '../header/links';

const Footer = () => {

    return (
        <div className='flex justify-center items-center pb-2 pt-6 '>
            <div className='w-full lg:w-[1280px] mx-10  lg:px-28 2xl:px-0' style={{ zIndex: 1000000 }}>

                <div className='md:flex justify-between items-center md:items-start'>
                    <div className='hidden md:block flex-col items-center md:items-start '>
                        <a href="/" className="flex items-center gap-x-2">
                            <img src={Logo} className="w-12 h-12 md:w-10 md:h-10" />
                            {/* <p className="text-2xl text-white ">.APE</p> */}
                        </a>
                        <p className='text-white text-xs mt-4'>© DOT APE Labs, 2023</p>

                    </div>

                    <div className='text-center md:text-right mt-2 md:mt-0'>
                        <Links />
                        <p className='text-white text-sm mt-6 md:mt-4' >Email: contact@dotape.io</p>

                    </div>
                </div>
                <div className='text-center pt-4'>

                </div>
            </div>

        </div>
    )
}

export default Footer;
