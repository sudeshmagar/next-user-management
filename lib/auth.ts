import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { SessionWithTokens } from "@/types";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Mock authentication - replace with real API call
                if (credentials?.email === "admin@sudeshmagar.com" && credentials?.password === "Admin@123") {
                    return {
                        id: "1",
                        name: "Sudesh Rana Magar",
                        email: credentials?.email || "",
                        accessToken: "mock-access-token",
                        refreshToken: "mock-refresh-token"
                    };
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 15 * 60 // 15 minutes
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            return token;
        },
        async session({ session, token }) {
            (session as SessionWithTokens).accessToken = token.accessToken as string;
            (session as SessionWithTokens).refreshToken = token.refreshToken as string;
            return session;
        }
    },
    pages: {
        signIn: "/login",
        signOut: "/login"
    },
    cookies: {
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/"
            }
        }
    }
};

// Export the authOptions for getServerSession
export default authOptions;