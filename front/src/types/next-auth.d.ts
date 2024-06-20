import nextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id ?: number,
            role ?: string,
        }
    }
}