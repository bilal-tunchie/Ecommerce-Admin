import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const POST =  async (req: Request) => {
    try {
        const { userId }  = auth();
        if(!userId) new Response("Unauthenticated", { status: 401 });
        
        const { name } = await req.json() // extract from body
        if(!name) new Response("Name is required", { status: 400 });
        
        if (userId !== null) {
            const store = await prismadb.store.create({
                data: {
                    name,
                    userId,
                },
            });
            return NextResponse.json(store);
        }

    }catch(error) {
        console.log('[STORES_POST]',error);
        return new NextResponse('Internal error', { status: 500})
    }
}