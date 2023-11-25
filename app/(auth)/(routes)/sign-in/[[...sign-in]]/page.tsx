import SignInGuest from "@/components/sign-in-guest";
import { SignIn } from "@clerk/nextjs";

export default async function Page() {

    return (
        <div>
            <SignIn />
            <SignInGuest />
        </div>
    );
};