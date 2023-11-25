"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const SignInGuest = () => {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (id: string) => {
    try {
        setLoading(true);
        const response = await axios.post('/api', id);
        toast.success('Signed In as guest');
        window.location.assign(`/store/${response.data.id}`);
    } catch (error) {
        toast.error('Something went wrong');
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <p className="my-10 mx-auto w-fit text-lg">OR</p>
      <Button 
        disabled={loading}
        className=" text-xl w-full py-6"
        onClick={() => onSubmit(process.env.CLERK_GUEST_USER!)}
      >
          Sign In as Guest
      </Button>
    </>
  )
}

export default SignInGuest;