"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return; // Wait for session to load
        if (!session) redirect("/login");
    }, [session, status]);

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return <>{children}</>;
}