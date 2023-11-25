import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import prismadb from "@/lib/prismadb";
import { getStoreByGuest } from '@/actions/get-store-by-guest';
import FixedNotification from "./ui/fixed-notification";
import SignOutGuest from "@/components/sign-out-guest"
import { ResponsiveModal } from "./modals/responsive-modal";


const Navbar = async () => {
    const guestStore = await getStoreByGuest();
    const guestId = guestStore?.guestId;

    const { userId } = auth();

    if (!userId && !guestId) redirect('/sign-in');

    const stores = await prismadb.store.findMany({
        where: {
            userId: userId || guestId?.toString(),
        }
    });

    return ( 
        <div className="border-b">
            {guestId && <FixedNotification note="As a guest you only have acess to modify Categories and Products."/>}
            <ResponsiveModal />
            <div className="flex h-16 items-center justify-between px-4">
                <StoreSwitcher items={stores} />
                <MainNav className="mx-6" />
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    {guestId && <SignOutGuest />}
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;