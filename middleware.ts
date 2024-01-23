import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: [
        "/api/:path*",
        "/",
        "/store",
        "/store/a16be9bf-3ebb-44da-9070-2d96d007478d",
        "/store/a16be9bf-3ebb-44da-9070-2d96d007478d/:path*",
    ]
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
