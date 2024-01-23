import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const POST =  async (req: Request) => {
    console.log(process.env.STORE_ID_FOR_GUEST_USER)
    try {
        const store = await prismadb.store.update({
            where: {
                id: process.env.STORE_ID_FOR_GUEST_USER
            },
            data: {
                guestId: process.env.CLERK_GUEST_USER
            },
        });
        return NextResponse.json(store);

    }catch(error) {
        console.log('[STORES_POST]',error);
        return new NextResponse('Internal error', { status: 500})
    }
}

export const PATCH =  async (req: Request) => {
    try {

        const store = await prismadb.store.updateMany({
            where: {
                guestId: process.env.CLERK_GUEST_USER
            },
            data: {
                guestId: null
            },
        });
        return NextResponse.json(store);

    }catch(error) {
        console.log('[STORES_POST]',error);
        return new NextResponse('Internal error', { status: 500})
    }
}