import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Providers } from "./providers";
import "@ant-design/v5-patch-for-react-19"
import "./globals.css";
import "@sudeshmagar/antd-extended-lib/dist/assets/index.css"
import type { Metadata } from "next";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "User Management App",
    description: "Next.js + NextAuth + Ant Design",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
        <body className={inter.className}>

        <Providers session={session}>
            <AntdRegistry>{children}</AntdRegistry>
        </Providers>
        </body>
        </html>
    );
}