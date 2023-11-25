import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { getStoreByGuest } from '@/actions/get-store-by-guest';

export const signOutGuest = async () => {

    const guestStore = await getStoreByGuest();
    const guestId = guestStore?.guestId;

    const { userId } = auth();

    if (userId && guestId) {
        await prismadb.store.updateMany({
            where: {
                guestId: guestId.toString()
            },
            data: {
                guestId: null
            }
        })
    }
};
