"use client";

import React, { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Layout from "../../src/components/Layout";
import { handleVerifyNft } from "../../src/handlers/HandleVerifyNft";

const VerifyNft: React.FC = () => {
    const [eventPublicKey, setEventPublicKey] = useState<string>("");
    const [nftPublicKey, setNftPublicKey] = useState<string>("");
    const wallet = useAnchorWallet();

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
                <div className="max-w-md w-full space-y-8 p-10 my-12 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 shadow-lg">
                    <h1 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                        Verify an NFT
                    </h1>
                    <p className="text-gray-300 text-center">
                        For a given event, ensure the authenticity of a specific NFT.
                    </p>
                    <form className="space-y-6" onSubmit={(e) => handleVerifyNft(e, nftPublicKey, eventPublicKey, wallet)}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <input
                                    id="eventPublicKey"
                                    name="eventPublicKey"
                                    type="text"
                                    value={eventPublicKey}
                                    onChange={(e) => setEventPublicKey(e.target.value)}
                                    required
                                    className="relative block w-full px-4 py-3 bg-black/30 border border-purple-500/20 
                                             placeholder-gray-400 text-gray-200 rounded-t-lg focus:outline-none 
                                             focus:ring-2 focus:ring-purple-500/40 focus:border-transparent
                                             transition-colors"
                                    placeholder="Event Public Key"
                                />
                            </div>
                            <div>
                                <input
                                    id="nftPublicKey"
                                    name="nftPublicKey"
                                    type="text"
                                    value={nftPublicKey}
                                    onChange={(e) => setNftPublicKey(e.target.value)}
                                    required
                                    className="relative block w-full px-4 py-3 bg-black/30 border border-purple-500/20 
                                             placeholder-gray-400 text-gray-200 rounded-b-lg focus:outline-none 
                                             focus:ring-2 focus:ring-purple-500/40 focus:border-transparent
                                             transition-colors"
                                    placeholder="NFT Public Key"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-6 rounded-lg text-white
                                         bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90
                                         transition-all duration-300 shadow-md hover:shadow-purple-500/20"
                            >
                                Verify NFT
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default VerifyNft;
