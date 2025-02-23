import React from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import ClientOnly from "./ClientOnly";
import NavBar from "./NavBar";
import Image from "next/image";
import { AnimatedTooltip } from "./AnimatedTooltip";

interface LayoutProps {
    children: React.ReactNode;
}

const teamMembers = [
    {
        id: 1,
        name: "Ayush",
        designation: "Developer",
        image: "/Ayush.jpeg"
    },
    {
        id: 2,
        name: "Tushar",
        designation: "Developer",
        image: "/Tushar.jpeg"
    },
    {
        id: 3,
        name: "Uday",
        designation: "Developer",
        image: "/Uday.jpeg"
    },
    {
        id: 4,
        name: "Yashaswini",
        designation: "Developer",
        image: "/Yashaswini.jpeg"
    }
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const wallet = useAnchorWallet();

    const contextClass = {
        success: "bg-blue-600",
        error: "bg-red-600",
        info: "bg-gray-600",
        warning: "bg-orange-400",
        default: "bg-indigo-600",
        dark: "bg-white-600 font-gray-300",
    };

    return (
        <div className="min-h-screen w-full bg-black bg-[radial-gradient(circle_at_center,_rgba(147,51,234,0.3)_0%,_rgba(0,0,0,1)_70%)] flex flex-col">
            <ClientOnly>
                <NavBar />
                <div className="flex-grow flex flex-col py-12 px-8 pt-20">
                    {wallet?.publicKey ? (
                        <>
                            {children}
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={true}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                toastClassName={(context) => contextClass[context?.type || "default"] + " overflow-hidden"}
                                bodyClassName={() => "text-sm font-white font-med block p-3"}
                                className="toast-container"
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-xl text-gray-300 mb-4">Please connect your wallet to continue.</p>
                        </div>
                    )}
                </div>
                <footer className="mt-auto bg-black/40 border-t border-purple-500/20 p-8">
                    <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-purple-400">Built with</span>
                            <span className="text-red-500">♥</span>
                            <span className="text-purple-400">by</span>
                            <div className="flex items-center">
                                <AnimatedTooltip items={teamMembers} />
                            </div>
                        </div>
                        <div className="text-sm text-gray-400">
                            Powered by Solana Blockchain
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            © {new Date().getFullYear()} Pandas. All rights reserved.
                        </div>
                    </div>
                </footer>
            </ClientOnly>
        </div>
    );
};

export default Layout;
