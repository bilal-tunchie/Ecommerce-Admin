import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { getStoreByGuest } from '@/actions/get-store-by-guest';
import { signOutGuest } from '@/actions/sign-out-guest';

export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const guestStore = await getStoreByGuest();
    const guestId = guestStore?.guestId;

    const { userId } = auth();

    signOutGuest()
    
    if (!userId && !guestId) redirect('/sign-in');

    const store = await prismadb.store.findFirst({
        where: {
            userId: userId || guestId?.toString(),
        }
    });

    if (store) redirect(`/store/${store.id}`);

    return (
        <>{children}</>
    );
};
