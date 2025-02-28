import { web3, BN } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { toast } from "react-toastify";
import { getAnchorProgram, getNetworkUrl } from "../utils/anchorUtils";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
// Imports ajoutés pour le NFT :
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";
import { findMasterEditionPda, findMetadataPda, mplTokenMetadata, MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";

export const handleCreateNft = async (
    ticketPublicKey: PublicKey,
    wallet: ReturnType<typeof useAnchorWallet>,
    eventPublicKey: string,
    setTickets: React.Dispatch<React.SetStateAction<any[]>>,
) => {
    if (!wallet?.publicKey) {
        toast.error("Veuillez connecter votre portefeuille !");
        return;
    }

    const { program } = getAnchorProgram(wallet);

    // Fetch event details
    try {
        const event = await program.account.event.fetch(new PublicKey(eventPublicKey));
        // Get current number of tickets for this event
        const ticketAccounts = await program.account.ticket.all([
            {
                memcmp: {
                    offset: 8,
                    bytes: eventPublicKey,
                },
            },
        ]);
        const ticketNumber = ticketAccounts.length;

        // Initialisation de UMI avec les identités de portefeuille et le module mplTokenMetadata.
        const umi = createUmi(getNetworkUrl(process.env.NEXT_PUBLIC_REACT_APP_SOLANA_NETWORK!)).use(mplTokenMetadata()).use(walletAdapterIdentity(wallet));

        // Génération d'une nouvelle paire de clés pour le mint (NFT).
        const mint = web3.Keypair.generate();

        // Dérivez le compte d'adresse de jeton associé à l'atelier monétaire.
        // Calculer l'adresse du compte de token associé pour le mint.
        const associatedTokenAccount = await getAssociatedTokenAddress(mint.publicKey, wallet.publicKey);

        // Dérivez le compte de metadata PDA.
        // Calculer l'adresse du compte de metadata pour le mint.
        let metadataAccount = findMetadataPda(umi, {
            mint: publicKey(mint.publicKey),
        })[0];

        // Dérivez l'édition principale PDA.
        // Calculer l'adresse du compte de master edition pour le mint.
        let masterEditionAccount = findMasterEditionPda(umi, {
            mint: publicKey(mint.publicKey),
        })[0];

        // Définir les informations du metadata pour le NFT.
        const metadata = {
            name: `${event.title} #${ticketNumber}`,
            symbol: event.title.toUpperCase().substring(0, 10), // Limit symbol to 10 characters
            uri: "https://raw.githubusercontent.com/Yashaswini-Sharma/image/refs/heads/main/json.json",
        };

        try {
            // Appeler l'instruction create_nft du programme Anchor.
            const txid = await program.methods
                .createNft(metadata.name, metadata.symbol, metadata.uri)
                .accounts({
                    signer: wallet.publicKey, // Signataire de la transaction.
                    mint: mint.publicKey, // Clé publique du mint (NFT).
                    associatedTokenAccount: associatedTokenAccount, // Compte de token associé au mint.
                    metadataAccount: metadataAccount, // Compte de metadata.
                    masterEditionAccount: masterEditionAccount, // Compte de master edition.
                    tokenProgram: TOKEN_PROGRAM_ID, // Programme de token SPL.
                    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID, // Programme de token associé SPL.
                    tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID, // Programme de metadata de token.
                    systemProgram: SystemProgram.programId, // Programme système Solana.
                    rent: web3.SYSVAR_RENT_PUBKEY, // Sysvar pour les frais de location.
                    ticket: ticketPublicKey, // Compte du ticket.
                })
                .signers([mint]) // Signer la transaction avec la clé du mint.
                .rpc();

            toast.success("NFT generated successfully!");
            console.log(`Transaction ID: ${txid}`);

            // Mettre à jour les tickets après la création du NFT.
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
            toast.error("Failed to create NFT.");
            console.error("Failed to create NFT.", err);
        }
    } catch (err) {
        toast.error("Failed to create NFT.");
        console.error("Failed to create NFT.", err);
    }
};
