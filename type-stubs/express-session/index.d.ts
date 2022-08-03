import { SessionData } from "express-session";

declare module 'express-session' {
    export interface SessionData {
        user_id?: number,
        username?: string,
        role?: string,
        loggedIn?: boolean
    }
}