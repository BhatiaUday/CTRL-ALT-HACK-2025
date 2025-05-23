import { Connection, Commitment, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Program, AnchorProvider, web3, Idl, setProvider } from "@coral-xyz/anchor";
import { Wallet } from "@coral-xyz/anchor/dist/cjs/provider";
import idl from "./nft_ticketing.json";

const { SystemProgram } = web3;

if (!process.env.NEXT_PUBLIC_REACT_APP_SOLANA_NETWORK || !process.env.NEXT_PUBLIC_REACT_APP_SOLANA_COMMITMENT) {
    throw new Error("NEXT_PUBLIC_REACT_APP_SOLANA_NETWORK and NEXT_PUBLIC_REACT_APP_SOLANA_COMMITMENT must be defined");
}

export const getNetworkUrl = (network: string): string => {
    switch (network) {
        case "localnet":
            return "http://127.0.0.1:8899";
        case "devnet-custom-rpc":
            return "http://127.0.0.1:8899";
        case "devnet":
            return "https://api.devnet.solana.com";
        case "testnet":
            return "https://api.testnet.solana.com";
        case "mainnet":
            return "https://api.mainnet-beta.solana.com";
        default:
            throw new Error(`Unsupported network: ${network}`);
    }
};

export const getNetworkAdapterUrl = (network: string): string => {
    switch (network) {
        case "localnet":
            return "http://127.0.0.1:8899";
        case "devnet-custom-rpc":
            if (process.env.DEVNET_CUSTOM_RPC_URL) {
                return JSON.parse(process.env.DEVNET_CUSTOM_RPC_URL);
            }
            return clusterApiUrl(WalletAdapterNetwork.Devnet);
        case "devnet":
            return clusterApiUrl(WalletAdapterNetwork.Devnet);
        case "testnet":
            return clusterApiUrl(WalletAdapterNetwork.Testnet);
        case "mainnet":
            return clusterApiUrl(WalletAdapterNetwork.Mainnet);
        default:
            throw new Error(`Unsupported network: ${network}`);
    }
};

const network = process.env.NEXT_PUBLIC_REACT_APP_SOLANA_NETWORK!;
const networkUrl = getNetworkAdapterUrl(network); // URL du validateur.

const opts = {
    preflightCommitment: process.env.NEXT_PUBLIC_REACT_APP_SOLANA_COMMITMENT as Commitment,
};

export const getAnchorProgram = (wallet: Wallet) => {
    if (!wallet) {
        throw new Error("Wallet not connected");
    }

    const connection = new Connection(networkUrl, opts.preflightCommitment);

    const provider = new AnchorProvider(connection, wallet, opts);
    setProvider(provider);

    const program = new Program(idl as Idl, provider);

    return { program, provider, connection, SystemProgram };
};
