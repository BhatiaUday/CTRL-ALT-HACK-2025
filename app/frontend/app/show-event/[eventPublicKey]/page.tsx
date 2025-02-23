"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getAnchorProgram } from "../../../src/utils/anchorUtils";
import { handleCopyToClipboard } from "../../../src/utils/various";
import { handleBuyTicket } from "../../../src/handlers/HandleBuyTicket";
import { handleCreateNft } from "../../../src/handlers/HandleCreateNft";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import Layout from "../../../src/components/Layout";
import QRCode from "qrcode.react";

const TicketCard = ({ ticket, wallet, eventPublicKey, setTickets, getCurrentOwner, qrCodeRefs }) => (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 
                    transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
        <div className="space-y-4">
            {/* Price and Date */}
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-black/20 rounded-lg border border-purple-500/10">
                    <p className="text-purple-400 text-sm mb-1">Price Paid</p>
                    <p className="text-gray-300 font-bold">
                        {(ticket.account.price.toNumber() / 1_000_000_000).toFixed(3)} SOL
                    </p>
                </div>
                <div className="text-center p-4 bg-black/20 rounded-lg border border-purple-500/10">
                    <p className="text-purple-400 text-sm mb-1">Purchase Date</p>
                    <p className="text-gray-300 font-bold">
                        {new Date(ticket.account.dateOfPurchase.toNumber() * 1000).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Buyer Info */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-purple-400">Original Buyer:</span>
                    <span className="text-gray-300 bg-black/30 px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-purple-500/10"
                          onClick={() => handleCopyToClipboard(ticket.account.owner.toBase58())}>
                        {ticket.account.owner.toBase58().slice(0, 4)}...{ticket.account.owner.toBase58().slice(-4)}
                    </span>
                </div>
                {ticket.account.nftMint && (
                    <div className="flex items-center gap-2">
                        <span className="text-purple-400">Current Owner:</span>
                        <CurrentOwnerDisplay mintAddress={ticket.account.nftMint} getCurrentOwner={getCurrentOwner} />
                    </div>
                )}
            </div>

            {/* NFT Section */}
            {ticket.account.nftMint ? (
                <div className="mt-4 p-4 bg-black/20 rounded-lg border border-purple-500/10">
                    <p className="text-purple-400 text-center mb-2">NFT Ticket</p>
                    <p className="text-gray-300 text-sm text-center mb-3 break-all">
                        {ticket.account.nftMint.toBase58()}
                    </p>
                    <div ref={(el) => {qrCodeRefs.current[ticket.account.nftMint.toBase58()] = el}}
                         onClick={() => handleDownloadQrCode(ticket.account.nftMint.toBase58())}
                         className="cursor-pointer mx-auto flex justify-center hover:scale-105 transition-transform"
                         title="Click to download QR code">
                        <QRCode value={ticket.account.nftMint.toBase58()} 
                                size={120}
                                level="H"
                                includeMargin={true}
                                className="rounded-lg"
                        />
                    </div>
                </div>
            ) : (
                ticket.account.owner.equals(wallet?.publicKey) && (
                    <button onClick={() => handleCreateNft(ticket.publicKey, wallet, eventPublicKey, setTickets)}
                            className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg
                                     text-white hover:opacity-90 transition-all duration-300
                                     shadow-md hover:shadow-purple-500/20">
                        Generate NFT Ticket
                    </button>
                )
            )}
        </div>
    </div>
);

const ShowEvent: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const eventPublicKey = pathname.split("/").pop(); // Récupère la clé publique de l'URL

    const [eventDetails, setEventDetails] = useState<any>(null);
    const [tickets, setTickets] = useState<any[]>([]);
    const wallet = useAnchorWallet();

    const qrCodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        const fetchEventDetails = async () => {
            if (!wallet?.publicKey || !eventPublicKey) {
                return;
            }

            const { program } = getAnchorProgram(wallet);

            try {
                const event = await program.account.event.fetch(new PublicKey(eventPublicKey));
                setEventDetails(event);

                // Récupère les tickets associés à l'événement.
                const accounts = await program.account.ticket.all([
                    {
                        memcmp: {
                            offset: 8, // Taille de l'en-tête de l'account.
                            bytes: eventPublicKey,
                        },
                    },
                ]);
                setTickets(accounts.map(({ publicKey, account }) => ({ publicKey, account })));
            } catch (err) {
                router.push("/");
            }
        };

        fetchEventDetails();
    }, [wallet, eventPublicKey]);

    const handleDownloadQrCode = (nftMint: string) => {
        const qrCodeCanvas = qrCodeRefs.current[nftMint]?.querySelector("canvas");
        if (qrCodeCanvas) {
            const link = document.createElement("a");
            link.href = qrCodeCanvas.toDataURL("image/png");
            link.download = `qrcode-${nftMint}.png`;
            link.click();
        }
    };

    const getCurrentOwner = async (nftMint: PublicKey) => {
        const connection = new Connection(clusterApiUrl('devnet'));
        try {
            const tokenAccounts = await connection.getTokenLargestAccounts(nftMint);
            const largestAccount = tokenAccounts.value[0];
            const accountInfo = await connection.getParsedAccountInfo(largestAccount.address);
            
            if (accountInfo.value && 'parsed' in accountInfo.value.data) {
                const { owner } = accountInfo.value.data.parsed.info;
                return new PublicKey(owner);
            }
        } catch (error) {
            console.error('Error fetching current owner:', error);
        }
        return null;
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Event Details Card */}
                {eventDetails && (
                    <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8 mb-12">
                        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-purple-600 
                                     bg-clip-text text-transparent mb-6">
                            {eventDetails.title}
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-4">
                                <p className="text-gray-300">
                                    <span className="text-purple-400">Description:</span> {eventDetails.description}
                                </p>
                                <p className="text-gray-300">
                                    <span className="text-purple-400">Date:</span>{' '}
                                    {new Date(eventDetails.date.toNumber() * 1000).toLocaleString()}
                                </p>
                                <p className="text-gray-300">
                                    <span className="text-purple-400">Location:</span> {eventDetails.location}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-300">
                                    <span className="text-purple-400">Price:</span>{' '}
                                    {(eventDetails.ticketPrice.toNumber() / 1_000_000_000).toFixed(3)} SOL
                                </p>
                                <p className="text-gray-300">
                                    <span className="text-purple-400">Organizer:</span>{' '}
                                    <span className="bg-black/30 px-3 py-1 rounded-lg cursor-pointer hover:bg-purple-500/10"
                                          onClick={() => handleCopyToClipboard(eventDetails.organizer.toBase58())}
                                          title={eventDetails.organizer.toBase58()}>
                                        {eventDetails.organizer.toBase58().slice(0, 4)}...{eventDetails.organizer.toBase58().slice(-4)}
                                    </span>
                                </p>
                            </div>
                        </div>
                        
                        <button
                            onClick={(e) => handleBuyTicket(e, eventPublicKey!, eventDetails, wallet, setTickets)}
                            className="w-full max-w-md mx-auto block py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-800 
                                     rounded-lg text-white text-lg font-semibold hover:opacity-90 transition-all duration-300
                                     shadow-md hover:shadow-purple-500/20">
                            Purchase Ticket
                        </button>
                    </div>
                )}

                {/* Tickets Section */}
                {tickets.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-purple-600 
                                     bg-clip-text text-transparent mb-8">
                            Ticket History
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {tickets.map((ticket, index) => (
                                <TicketCard
                                    key={index}
                                    ticket={ticket}
                                    wallet={wallet}
                                    eventPublicKey={eventPublicKey!}
                                    setTickets={setTickets}
                                    getCurrentOwner={getCurrentOwner}
                                    qrCodeRefs={qrCodeRefs}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

// Update CurrentOwnerDisplay component to match theme
const CurrentOwnerDisplay = ({ mintAddress, getCurrentOwner }) => {
    const [currentOwner, setCurrentOwner] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrentOwner = async () => {
            const owner = await getCurrentOwner(mintAddress);
            if (owner) {
                setCurrentOwner(owner.toBase58());
            }
        };
        fetchCurrentOwner();
    }, [mintAddress]);

    return (
        <span className="text-gray-300 bg-black/30 px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-purple-500/10"
              onClick={() => currentOwner && handleCopyToClipboard(currentOwner)}>
            {currentOwner ? `${currentOwner.slice(0, 4)}...${currentOwner.slice(-4)}` : 'Loading...'}
        </span>
    );
};

export default ShowEvent;
