import prismadb from '@/lib/prismadb';

export const getStoreByGuest = async () => {
    const guestStore = await prismadb.store.findFirst({
        where: {
            guestId: process.env.CLERK_GUEST_USER, 
        }
    })

    return guestStore;
}
