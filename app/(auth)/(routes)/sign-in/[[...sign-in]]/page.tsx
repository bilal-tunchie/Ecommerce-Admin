import SignInGuest from "@/components/sign-in-guest";
import { SignIn } from "@clerk/nextjs";


export default async function Page() {
    const userId = process.env.CLERK_GUEST_USER;

    return (
        <div>
            <SignIn />
            <SignInGuest />
        </div>
    );
};