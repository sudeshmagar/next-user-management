import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    /**
     * Extends the built-in session types
     */
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role?: string;
        };
        accessToken?: string;
        refreshToken?: string;
        error?: string;
    }

    /**
     * Extends the built-in user types
     */
    interface User {
        id: string;
        name: string;
        email: string;
        role?: string;
        accessToken?: string;
        refreshToken?: string;
    }
}

declare module "next-auth/jwt" {
    /**
     * Extends the built-in JWT types
     */
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        error?: string;
        user?: {
            id: string;
            name: string;
            email: string;
            role?: string;
        };
    }
}