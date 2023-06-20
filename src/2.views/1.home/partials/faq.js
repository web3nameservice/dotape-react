import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Faq = ({ }) => {


    let array = [
        { question: "What is DotApe?", answer: <p>DotApe is a blockchain-based, decentralized naming system, making it simpler to map machine-readable data, like crypto addresses and DNS addresses, to easy-to-remember names like 'adam.ape.' It's an intuitive way to navigate the blockchain world. Learn more in our <a href='https://docs.dotape.io' target='_blank' className='text-main cursor-pointer'>docs.</a></p> },
        { question: "How does DotApe function?", answer: <p>DotApe operates through smart contracts on the Ethereum blockchain, offering a seamless, trustless environment. With transactions validated by Ethereum validators, it ensures a secure and integrity-rich system. Find out more in our <a href='https://docs.dotape.io' target='_blank' className='text-main cursor-pointer'>docs.</a></p> },
        { question: "Can I transfer or sell my domain?", answer: "Absolutely! The domain you create, stored in your crypto wallet post-minting, can be transferred or sold freely. Use the DotApe marketplace or platforms like OpenSea to list and sell your domain, or entertain offers from prospective buyers." },
        { question: "What is the cost?", answer: "DotApe domain prices depend on the length of the domain name and will be visible on the registration page.", answer2: <p>3 Characters: $640<br /> 4 Characters: $160<br />5 Characters: $50<br />6+Characters: $10</p> },
        { question: "Do I need to renew my domain?", answer: "Yes, DotApe domains are subject to renewal after the expiry period." },
        { question: "Need assistance? ", answer: "Reach out to us with any queries on our Twitter page or at contact@dotape.io. We're here to help!" },
    ]

    return (
        <div className="flex justify-center items-center pb-0 md:pb-20 lg:pb-20 pt-0 lg:pt-20 bg-black" id="questions">
            <div className='w-full bg-dark900 flex justify-center py-28'>
                <div className='md:w-[768px] ' id="" >
                    <p className='font-bold text-4xl md:text-7xl text-start md:text-center px-10 md:px-0 text-white'>Questions?</p>
                    <p className='text-3xl md:text-3xl text-start md:text-center text-neutral-500 mt-4 px-10 md:px-0 text-neutral-400'>We're here to help</p>

                    <div className='mt-16'>
                        {array.map((item, index) => (
                            <div key={index}>
                                <Mapping item={item} index={index} />
                            </div>
                        )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faq;

const Mapping = ({ item }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div>
            <div className="px-10 md:px-20 lg:px-4 py-6 border-b-2 border-b-neutral-700">
                <div className="flex justify-between items-center cursor-pointer text-white hover:text-main" onClick={() => setIsOpen(!isOpen)}>
                    <p className="font-semibold text-2xl">{item.question}</p>
                    <FontAwesomeIcon icon={isOpen ? "minus" : "plus"} className="" />
                </div>
                <div className={`mt-4 text-xl text-neutral-400 ${isOpen ? "block" : "hidden"}`}>
                    {item.answer}
                    <br />
                    <br />
                    {item.answer2}
                </div>


            </div>

        </div>
    )
}