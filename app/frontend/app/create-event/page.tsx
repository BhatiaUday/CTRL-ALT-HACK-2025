"use client";

import React, { useState, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { web3 } from "@coral-xyz/anchor";
import { handleCreateEvent } from "../../src/handlers/HandleCreateEvent";
import Layout from "../../src/components/Layout";

const CreateEvent: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [ticketPrice, setTicketPrice] = useState<string>("");
    const [ticketPriceInSOL, setTicketPriceInSOL] = useState<string>("");
    const wallet = useAnchorWallet();

    useEffect(() => {
        const priceInLamports = parseFloat(ticketPrice);
        if (!isNaN(priceInLamports)) {
            setTicketPriceInSOL((priceInLamports / web3.LAMPORTS_PER_SOL).toFixed(9));
        } else {
            setTicketPriceInSOL("");
        }
    }, [ticketPrice]);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setDate("");
        setTime("");
        setLocation("");
        setTicketPrice("");
        setTicketPriceInSOL("");
    };

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
                <div className="max-w-2xl w-full space-y-8 p-8 my-12 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 shadow-lg">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                            Create an Event
                        </h1>
                        <p className="text-gray-300">
                            Create your unique event on the Solana blockchain and securely sell tickets as NFTs.
                        </p>
                    </div>

                    <form className="space-y-6"
                          onSubmit={(e) => handleCreateEvent(e, title, description, date, time, location, ticketPrice, wallet, resetForm)}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-purple-400 mb-2">Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-black/30 border border-purple-500/20 rounded-lg
                                             placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-2 
                                             focus:ring-purple-500/40 focus:border-transparent transition-colors"
                                    placeholder="Event Title"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-purple-400 mb-2">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-black/30 border border-purple-500/20 rounded-lg
                                             placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-2 
                                             focus:ring-purple-500/40 focus:border-transparent transition-colors"
                                    placeholder="Event Description"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="date" className="block text-purple-400 mb-2">Date</label>
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-black/30 border border-purple-500/20 rounded-lg
                                                 text-gray-200 focus:outline-none focus:ring-2 
                                                 focus:ring-purple-500/40 focus:border-transparent transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="time" className="block text-purple-400 mb-2">Time</label>
                                    <input
                                        id="time"
                                        name="time"
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-black/30 border border-purple-500/20 rounded-lg
                                                 text-gray-200 focus:outline-none focus:ring-2 
                                                 focus:ring-purple-500/40 focus:border-transparent transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-purple-400 mb-2">Location</label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-black/30 border border-purple-500/20 rounded-lg
                                             placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-2 
                                             focus:ring-purple-500/40 focus:border-transparent transition-colors"
                                    placeholder="Event Location"
                                />
                            </div>

                            <div>
                                <label htmlFor="ticketPrice" className="block text-purple-400 mb-2">Ticket Price (Lamports)</label>
                                <input
                                    id="ticketPrice"
                                    name="ticketPrice"
                                    type="number"
                                    value={ticketPrice}
                                    onChange={(e) => setTicketPrice(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-black/30 border border-purple-500/20 rounded-lg
                                             placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-2 
                                             focus:ring-purple-500/40 focus:border-transparent transition-colors"
                                    placeholder="Enter price in Lamports"
                                />
                                {ticketPrice && (
                                    <span className="mt-2 block text-purple-400 text-sm">
                                        ≈ {ticketPriceInSOL} SOL
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg
                                     text-white font-semibold hover:opacity-90 transition-all duration-300
                                     shadow-md hover:shadow-purple-500/20"
                        >
                            Create Event
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CreateEvent;
