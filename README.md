# Mock Next.js Site

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Authentication**: Integrated NextAuth.js for secure authentication
- **Dashboard**: Protected dashboard area
- **User Management**: Create and manage users
- **Protected Routes**: Route protection for authenticated sections
- **Modern UI**: Ant Design components with TailwindCSS styling
- **Extended UI library**: Used custom antd extended library in client, (Button, Card, Toaster)
- **Type Safety**: Full TypeScript support

## Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Ant Design Documentation](https://ant.design)
- [TanStack Query Documentation](https://tanstack.com/query)

## Authentication Flow & Token Handling

### Authentication Implementation

The project uses NextAuth.js for authentication with JWT (JSON Web Tokens) strategy. The authentication flow is implemented as follows:

1. **Login Process**:
   - Users navigate to `/login`
   - Credentials are submitted to NextAuth.js endpoint
   - NextAuth.js validates credentials and creates a session
   - Upon successful authentication, user is redirected to dashboard

2. **Token Management**:
   - JWT tokens are automatically handled by NextAuth.js
   - Tokens are stored securely in HTTP-only cookies
   - Session tokens are refreshed automatically
   - Token expiration and rotation are managed by NextAuth.js

3. **Protected Routes**:
   - Dashboard and user management routes are protected
   - `protected-route.tsx` component ensures authenticated access
   - Unauthenticated users are redirected to login

4. **Session Handling**:
   - Sessions are maintained using NextAuth.js session management
   - Session data is available through `useSession` hook
   - Auto-refresh of sessions when approaching expiration

### API Security

- All API routes under `/api` are protected
- JWT verification is performed automatically
- CSRF protection is enabled by default
- Secure cookie handling for session storage

### Environment Variables Required

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```