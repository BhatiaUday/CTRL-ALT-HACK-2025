import { toast } from "react-toastify";

export const handleCopyToClipboard = (publicKey: string) => {
    navigator.clipboard.writeText(publicKey).then(
        () => {
            toast.info("Public Key copied to clipboards");
        },
        (err) => {
            console.error("Failed to copy public key:", err);
        },
    );
};
