import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb';
import { getStoreByGuest } from '@/actions/get-store-by-guest';

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

  if (!userId && !guestId ) redirect('/sign-in');

  const store = await prismadb.store.findFirst({ 
    where: {
      id: params.storeId,
      userId: userId || guestId?.toString(),
    }
  });

  if (!store) redirect('/');

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};