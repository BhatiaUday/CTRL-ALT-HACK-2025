import "./globals.css";
import AppWalletProvider from "../src/components/AppWalletProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <title>Pandas Ticket System</title>
                <meta name="description" content="The better platform for Tickets" />
                <AppWalletProvider>{children}</AppWalletProvider>
            </body>
        </html>
    );
}
