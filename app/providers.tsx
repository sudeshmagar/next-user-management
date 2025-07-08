"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "@/lib/query-client";
import { ReactNode } from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Session} from "next-auth";

export function Providers({
                              children,
                              session
                          }: {
    children: ReactNode;
    session: Session | null;
}) {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>

        </SessionProvider>
    );
}