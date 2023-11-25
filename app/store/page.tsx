import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { getStoreByGuest } from '@/actions/get-store-by-guest';
import { signOutGuest } from '@/actions/sign-out-guest';

export default async function DashboardLayout() {

    const guestStore = await getStoreByGuest();
    const guestId = guestStore?.guestId;

    const { userId } = auth();

    signOutGuest()

    if (!userId && !guestId) redirect('/sign-in');

    redirect('/');
};
