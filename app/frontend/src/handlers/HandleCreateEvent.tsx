import { web3, BN } from "@coral-xyz/anchor";
import { toast } from "react-toastify";
import { getAnchorProgram } from "../utils/anchorUtils";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export const handleCreateEvent = async (
    e: React.FormEvent,
    title: string,
    description: string,
    date: string,
    time: string,
    location: string,
    ticketPrice: string,
    wallet: ReturnType<typeof useAnchorWallet>,
    resetForm: () => void, 
) => {
    e.preventDefault();

    if (!wallet?.publicKey) {
        toast.error("Wallet not Connected!!");
        return;
    }

    const { program, SystemProgram } = getAnchorProgram(wallet);

    const eventAccount = web3.Keypair.generate();

    try {
        const inputDateTime = new BN(new Date(`${date}T${time}`).getTime() / 1000); 
        const price = new BN(ticketPrice); 
        const txid = await program.methods
            .createEvent(title, description, inputDateTime, location, price)
            .accounts({
                event: eventAccount.publicKey,
                organizer: wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .signers([eventAccount])
            .rpc();

        toast.success("Event created successfully!");
        console.log(`Transaction ID: ${txid}`);

        resetForm(); 
    } catch (err) {
        toast.error("Failed to create event.");
        console.error("Failed to create event.", err);
    }
};
