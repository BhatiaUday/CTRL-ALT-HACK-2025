import React, { useState } from "react";
import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FaBars, FaTimes } from "react-icons/fa";
import BalanceDisplay from "./wallet/BalanceDisplay";
import NetworkName from "./wallet/NetworkName";
import Image from "next/image";

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed w-full bg-black/30 backdrop-blur-md border-b border-purple-500/20 p-4 z-[100]">
            <div className="container px-0 mx-auto flex justify-between items-center">
                <ul className="hidden md:flex justify-between items-center list-none p-0 m-0 w-full">
                    {/* Left section */}
                    <div className="flex items-center gap-6">
                        <li>
                            <Link 
                                href="/create-event" 
                                className="text-gray-200 font-medium tracking-wide no-underline p-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300 ease-in-out"
                            >
                                Create an Event
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/list-events" 
                                className="text-gray-200 font-medium tracking-wide no-underline p-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300 ease-in-out"
                            >
                                List of Events
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/verify-nft" 
                                className="text-gray-200 font-medium tracking-wide no-underline p-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300 ease-in-out"
                            >
                                Verify an NFT
                            </Link>
                        </li>
                    </div>

                    {/* Center logo with text */}
                    <li className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-3 group hover:scale-110 transition-transform duration-300">
                            <Image
                                src="/pandas.png"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="rounded-full border border-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300"
                            />
                            <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-purple-600 
                                         bg-clip-text text-transparent uppercase tracking-normal">
                                PANDAS
                            </span>
                        </Link>
                    </li>

                    {/* Right section - adjusted spacing */}
                    <div className="flex items-center gap-3">
                        <li>
                            <span className="bg-purple-500/30 backdrop-blur-sm text-white font-medium tracking-wider rounded-lg px-3 py-1.5 border border-purple-500/30">
                                <NetworkName />
                            </span>
                        </li>
                        <li>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 font-medium">
                                <BalanceDisplay />
                            </span>
                        </li>
                        <li>
                            <WalletMultiButton style={{}} />
                        </li>
                    </div>
                </ul>

                {/* Mobile menu button with centered logo and text */}
                <div className="md:hidden flex justify-between items-center w-full px-0">
                    <button onClick={toggleMenu} className="text-gray-200 hover:text-purple-400 focus:outline-none transition-colors">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <Link href="/" className="flex items-center gap-2 group hover:scale-110 transition-transform duration-300">
                        <Image
                            src="/pandas.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="rounded-full border border-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300"
                        />
                        <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-purple-600 
                                     bg-clip-text text-transparent uppercase tracking-normal">
                            PANDAS
                        </span>
                    </Link>
                    <div className="w-8">{/* Spacer to center logo */}</div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <ul className="md:hidden flex flex-col items-center list-none p-0 m-0 bg-black/50 backdrop-blur-md border-t border-purple-500/20">
                    <li className="w-full text-center p-4">
                        <Link href="/" className="flex justify-center" onClick={toggleMenu}>
                            <Image
                                src="/pandas.jpeg"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="rounded-full border border-purple-500/20"
                            />
                        </Link>
                    </li>
                    <li className="w-full text-center">
                        <Link 
                            href="/create-event" 
                            className="block text-gray-200 font-medium tracking-wide no-underline p-3 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300 ease-in-out"
                            onClick={toggleMenu}
                        >
                            Create an Event
                        </Link>
                    </li>
                    <li className="w-full text-center">
                        <Link 
                            href="/list-events" 
                            className="block text-gray-200 font-medium tracking-wide no-underline p-3 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300 ease-in-out"
                            onClick={toggleMenu}
                        >
                            List of Events
                        </Link>
                    </li>
                    <li className="w-full text-center">
                        <Link 
                            href="/verify-nft" 
                            className="block text-gray-200 font-medium tracking-wide no-underline p-3 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300 ease-in-out"
                            onClick={toggleMenu}
                        >
                            Verify an NFT
                        </Link>
                    </li>
                    <li className="w-full text-center mt-4">
                        <span className="bg-purple-500/50 backdrop-blur-sm text-white rounded-md font-semibold px-3 py-1">
                            <NetworkName />
                        </span>
                    </li>
                    <li className="w-full text-center mt-2">
                        <span className="text-purple-400 p-2">
                            <BalanceDisplay />
                        </span>
                    </li>
                    <li className="w-full text-center mt-2 mb-2">
                        <WalletMultiButton />
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default NavBar;
