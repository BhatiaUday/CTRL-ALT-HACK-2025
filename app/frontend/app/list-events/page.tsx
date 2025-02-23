"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getAnchorProgram } from "../../src/utils/anchorUtils";
import { PublicKey } from "@solana/web3.js";
import idl from "../../src/idl/nft_ticketing.json";
import Layout from "../../src/components/Layout";

const shortenAddress = (address: string, chars = 4) => {
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

const EventCard = ({ event }: { event: any }) => {
    return (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden 
                        transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group text-center">
            {/* Image Container */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                    src="/placeholder.png"
                    alt={event.accountData.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            
            {/* Content Container */}
            <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 
                             bg-clip-text text-transparent">
                    {event.accountData.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 text-sm line-clamp-2">
                    {event.accountData.description}
                </p>
                
                {/* Details */}
                <div className="space-y-2 border-t border-purple-500/20 pt-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm">
                            <span className="text-purple-400">Date:</span>
                            <span className="text-gray-300 ml-2">
                                {new Date(event.accountData.date.toNumber() * 1000).toLocaleString()}
                            </span>
                        </p>
                        <p className="text-sm">
                            <span className="text-purple-400">Location:</span>
                            <span className="text-gray-300 ml-2">{event.accountData.location}</span>
                        </p>
                        <p className="text-sm">
                            <span className="text-purple-400">Price:</span>
                            <span className="text-gray-300 ml-2">
                                {(event.accountData.ticketPrice.toNumber() / 1_000_000_000).toFixed(3)} SOL
                            </span>
                        </p>
                    </div>
                </div>
                
                {/* Action Button */}
                <Link
                    href={`/show-event/${event.publicKey.toBase58()}`}
                    className="block w-full text-center py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-800 
                             rounded-lg text-white text-sm hover:opacity-90 transition-all duration-300
                             shadow-md hover:shadow-purple-500/20"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

const ListEvents: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const wallet = useAnchorWallet();

    useEffect(() => {
        const fetchEvents = async () => {
            if (!wallet?.publicKey) {
                return;
            }

            // Récupère le programme Anchor et le Provider.
            const { connection, program } = getAnchorProgram(wallet);

            try {
                // Récupère les comptes du programme.
                const accounts = await connection.getProgramAccounts(new PublicKey(idl.address));

                // Récupère les données de chaque compte événement.
                const eventAccounts = await Promise.all(
                    accounts.map(async ({ pubkey, account }) => {
                        try {
                            // Décoder les données du compte avec fetch.
                            const fetchedAccountData = await program.account.event.fetch(pubkey);

                            return {
                                publicKey: pubkey,
                                accountData: fetchedAccountData,
                            };
                        } catch (e) {
                            return null;
                        }
                    }),
                );

                // Filtre les comptes valides et met à jour l'état.
                setEvents(eventAccounts.filter((account) => account !== null));
            } catch (err) {
                console.error("Failed to fetch events.", err);
            }
        };

        fetchEvents();
    }, [wallet]);

    return (
        <Layout>
            <div className="py-8 px-4">
                <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-6">
                    List of Events
                </h1>
                <p className="text-gray-300 text-lg text-center mb-12 max-w-2xl mx-auto">
                    Discover all the events created on the <span className="text-purple-400">Solana blockchain</span>. 
                    Hover over an event to learn more.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {events.map((event, index) => (
                        <EventCard key={index} event={event} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ListEvents;
