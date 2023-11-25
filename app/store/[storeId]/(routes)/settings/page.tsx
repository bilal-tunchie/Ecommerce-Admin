import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getStoreByGuest } from '@/actions/get-store-by-guest';
import prismadb from "@/lib/prismadb";

import { SettingsForm } from "./components/settings-form";

const SettingsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const guestStore = await getStoreByGuest();
    const guestId = guestStore?.guestId;

    const { userId } = auth();

    if (!userId && !guestId) redirect('/sign-in');

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId || guestId?.toString(),
        }
    });

    if (!store) redirect('/');

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    );
}

export default SettingsPage;