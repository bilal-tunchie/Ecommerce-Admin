"use client"

import { Button } from "./ui/button";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const SignOutGuest = () => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const signoutTimeout = setTimeout(async() => {
          // Call API route to sign the guest user out
            onSubmit(process.env.CLERK_GUEST_USER!)
        }, 30 * 60 * 1000); // 30 minutes in milliseconds
    
        return () => clearTimeout(signoutTimeout);
    }, []);

    const onSubmit = async(id: string) => {
        try {
            setLoading(true);
            await axios.patch('/api');
            window.location.assign(`/sign-in`);
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={() => onSubmit(process.env.CLERK_GUEST_USER!)} disabled={loading} >Sign In</Button> 
    )
}

export default SignOutGuest;