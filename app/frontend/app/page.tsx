"use client";

import React from "react";
import Link from "next/link";
import Layout from "../src/components/Layout";
import Image from "next/image";
import { FaCheck, FaTimes } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8 
                    hover:shadow-purple-500/10 hover:scale-105 hover:bg-purple-900/10
                    transition-all duration-300 text-center group">
        <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 
                       bg-clip-text text-transparent mb-3">
            {title}
        </h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
);

const ComparisonCell = ({ isPositive, text }: { isPositive: boolean; text: string }) => (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
        <div className={`rounded-full p-2 ${isPositive ? 'bg-purple-500/20' : 'bg-red-500/20'}`}>
            {isPositive ? (
                <FaCheck className="w-4 h-4 text-purple-400" />
            ) : (
                <FaTimes className="w-4 h-4 text-red-400" />
            )}
        </div>
        <span className={`text-sm ${isPositive ? 'text-gray-200' : 'text-gray-400'} text-center`}>
            {text}
        </span>
    </div>
);

const Home: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen py-12 px-4 relative">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto relative">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                                Own Your Fraud-Free
                            </span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-400">
                                Ticketing Experience
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Tired of scams, counterfeit tickets, and scalper markups? 
                            <span className="font-bold text-purple-400"> Pandas </span> 
                            is the decentralized NFT ticketing revolution that puts 
                            <span className="italic"> you </span> 
                            in control. Built on 
                            <span className="font-semibold text-purple-400"> Solana blockchain</span>, 
                            we guarantee 
                            <span className="font-bold"> 100% authentic tickets</span>, 
                            <span className="font-bold"> zero intermediaries</span>, and 
                            <span className="font-bold"> instant, fraud-proof transactions</span>.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link
                                href="/create-event"
                                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl 
                                         text-white font-semibold text-lg hover:opacity-90 transition-all duration-300
                                         shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.45)]"
                            >
                                Get Started Now
                            </Link>
                            <Link
                                href="/list-events"
                                className="px-8 py-4 border border-purple-500/20 rounded-xl text-purple-400 font-semibold 
                                         text-lg hover:bg-purple-500/10 transition-all duration-300"
                            >
                                Explore Events
                            </Link>
                        </div>
                    </div>

                    {/* Why Pandas Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                            🔥 Why Pandas?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon="🎟️"
                                title="NFT Tickets, Real Ownership"
                                description="Every ticket is a unique NFT stored on an immutable blockchain—no duplicates, no fraud. Prove authenticity in seconds."
                            />
                            <FeatureCard
                                icon="⚡"
                                title="Gas-Efficient & Lightning-Fast"
                                description="Optimized smart contracts enable instant trades with minimal fees. Keep more of your money."
                            />
                            <FeatureCard
                                icon="🔒"
                                title="Unbreakable Security"
                                description="Automated smart contracts eliminate scams. Ticket data lives on decentralized storage—tamper-proof and permanent."
                            />
                            <FeatureCard
                                icon="💸"
                                title="Fair Pricing & Royalties"
                                description="Dynamic pricing and automated royalties ensure organizers earn from resales, while fans avoid scalper markups."
                            />
                            <FeatureCard
                                icon="🤖"
                                title="Anti-Bot Protection"
                                description="Cryptographic verification and decentralized queues prioritize real fans over bots."
                            />
                            <FeatureCard
                                icon="🌟"
                                title="Collectible Moments"
                                description="NFT tickets aren't just access passes—they're digital collectibles. Showcase them in your wallet forever."
                            />
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                            Pandas vs. Traditional Ticketing
                        </h2>
                        <div className="max-w-6xl mx-auto overflow-x-auto">
                            <table className="w-full bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 table-fixed">
                                <colgroup>
                                    <col className="w-1/3" />
                                    <col className="w-1/3" />
                                    <col className="w-1/3" />
                                </colgroup>
                                <thead>
                                    <tr className="border-b border-purple-500/20">
                                        <th className="p-6 text-center text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                                            Feature
                                        </th>
                                        <th className="p-6 text-center text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                                            Pandas (Web3)
                                        </th>
                                        <th className="p-6 text-center text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                                            Traditional Platforms
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-purple-500/10 hover:bg-purple-900/10 transition-colors">
                                        <td className="p-6 text-center font-medium text-gray-300">Fraud Prevention</td>
                                        <td className="p-6">
                                            <ComparisonCell isPositive={true} text="Blockchain verification" />
                                        </td>
                                        <td className="p-6">
                                            <ComparisonCell isPositive={false} text="QR codes (easily faked)" />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-purple-500/10 hover:bg-purple-900/10 transition-colors">
                                        <td className="p-6 text-center font-medium text-gray-300">Resale Royalties</td>
                                        <td className="p-6">
                                            <ComparisonCell isPositive={true} text="Auto-paid via smart contracts" />
                                        </td>
                                        <td className="p-6">
                                            <ComparisonCell isPositive={false} text="Lost to scalpers" />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-purple-500/10 hover:bg-purple-900/10 transition-colors">
                                        <td className="p-6 text-center font-medium text-gray-300">Transparency</td>
                                        <td className="p-6">
                                            <ComparisonCell isPositive={true} text="All transactions public" />
                                        </td>
                                        <td className="p-6">
                                            <ComparisonCell isPositive={false} text="Hidden fees" />
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-purple-900/10 transition-colors">
                                        <td className="p-6 text-center font-medium text-gray-300">Ownership</td>
                                        <td className="p-6">
                                            <ComparisonCell isPositive={true} text="Permanent NFT in your wallet" />
                                        </td>
                                        <td className="p-6">
                                            <ComparisonCell isPositive={false} text="Temporary PDF/QR code" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="text-center mb-20">
                        <blockquote className="text-xl italic text-gray-300 mb-4">
                            "Pandas made resale stress-free. I sold my concert ticket in minutes—no scams, no fees!"
                        </blockquote>
                        <cite className="text-purple-400 font-semibold">— Sarah L., Early Adopter</cite>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                            Ready to Transform Ticketing?
                        </h2>
                        <p className="text-gray-300 mb-8 text-lg">
                            No intermediaries. No fraud. Just unforgettable experiences.
                        </p>
                        <Link
                            href="/create-event"
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl 
                                     text-white font-semibold text-lg hover:opacity-90 transition-all duration-300
                                     shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.45)]"
                        >
                            Connect Wallet to Start
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
