"use server";

/**
 * Imports necessary modules and types for the login functionality.
 */
import { getPayload } from "payload"; // Function to interact with the payload API
import config from "@/payload.config"; // Configuration for the payload
import cookie, { cookies } from "next/headers"; // Cookie handling for Next.js
import { Customer } from "@/payload-types"; // Type definition for Customer
import { Result } from "node_modules/payload/dist/auth/operations/login";

/**
 * Interface representing the parameters required for login.
 */
interface LoginParams {
    email: string; // User's email address
    password: string; // User's password
}

/**
 * Interface representing the response structure from the login function.
 */
export interface LoginResponse {
    success: boolean; // Indicates if the login was successful
    error?: string; // Optional error message if login fails
}

/**
 * Type representing the result of a successful login, including token and user information.
 */
export type Login = {
    exp?: number; // Optional expiration time of the token
    token?: string; // Optional authentication token
    user?: Customer; // Optional user information
}

/**
 * Asynchronous function to handle user login.
 * @param {LoginParams} params - The login parameters containing email and password.
 * @returns {Promise<LoginResponse>} - A promise that resolves to the login response.
 */
export async function login({email, password}: LoginParams): Promise<LoginResponse> {
    const payload = await getPayload({config}); // Initialize payload with the provided config
    try {
        // Attempt to log in the user with the provided credentials
        const result: Result = await payload.login({collection: "customers", data: {email, password}}); 
        if(result.token) {
            const cookieStore = await cookies(); // Access the cookie store
            // Set the authentication token in a secure, HTTP-only cookie
            cookieStore.set("payload-token", result.token, {
                httpOnly: true, // Prevents client-side access to the cookie
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                path: "/", // Cookie is valid for the entire site
            });
            
            return {success: true}; // Return success response
        } else {
            return {success: false, error: "Invalid email or password"}; // Return failure response
        }
    } catch (error) {
        console.error("Error logging in", error); // Log any errors that occur during login
        return {success: false, error: "Invalid email or password"}; // Return failure response
    }
}
