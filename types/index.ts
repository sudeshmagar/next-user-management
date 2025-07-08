// User data type
export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    dob?: Date;
    address?: string;
    status: 'active' | 'inactive' | 'pending';
    role: 'admin' | 'user' | 'manager';
}

// NextAuth session with tokens
export interface SessionWithTokens {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
    accessToken?: string;
    refreshToken?: string;
    expires: string;
}

// Form values for user creation/editing
export interface UserFormValues {
    name: string;
    email: string;
    phone: string;
    dob?: Date;
    address?: string;
    status: 'active' | 'inactive' | 'pending';
    role: 'admin' | 'user' | 'manager';
}

// API error response
export interface ApiError {
    message: string;
    statusCode: number;
}