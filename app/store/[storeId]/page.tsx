import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { getStoreByGuest } from '@/actions/get-store-by-guest';
import { signOutGuest } from '@/actions/sign-out-guest';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {

  const guestStore = await getStoreByGuest();
  const guestId = guestStore?.guestId;

  const { userId } = auth();

  signOutGuest()

  if (!userId && !guestId) redirect('/sign-in');

  const store = await prismadb.store.findFirst({ 
    where: {
      id: params.storeId,
      userId: userId || guestId?.toString(),
    }
  });

  if (!store) redirect('/');

  if((userId && store) || (guestId && store))  redirect(`/store/${store.id}`); 

  return null
};
