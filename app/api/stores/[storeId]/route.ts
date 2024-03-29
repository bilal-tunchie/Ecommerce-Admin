import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const GET =  async (req: Request,
    { params }: { params: { storeId: string }}) => {
    try {
        const { userId }  = auth();
        if(!userId) new Response("Unauthenticated", { status: 401 });

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prismadb.store.findMany({
            where: {
                id: params.storeId,
            }
        });

        return NextResponse.json(store);

    }catch(error) {
        console.log('[store_GET]',error);
        return new NextResponse('Internal error', { status: 500})
    }
}

export const PATCH =  async (req: Request,
    { params }: { params: { storeId: string } }) => {
    try {
        const { userId }  = auth();
        if(!userId) new Response("Unauthenticated", { status: 401 });
        
        const { name } = await req.json() // extract from body
        if(!name) new Response("Name is required", { status: 400 });

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }
        
        if (userId !== null) {
            const store = await prismadb.store.updateMany({
                where: {
                    id: params.storeId,
                    userId
                },
                data: {
                    name
                },
            });
            return NextResponse.json(store);
        }

    }catch(error) {
        console.log('[STORE_PATCH]',error);
        return new NextResponse('Internal error', { status: 500})
    }
}


export const DELETE =  async (req: Request, { params }: { params: { storeId: string } }) => {
    try {
        const { userId }  = auth();
        if(!userId) new Response("Unauthenticated", { status: 401 });
        
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }
        
        if (userId !== null) {
            const store = await prismadb.store.deleteMany({
                where: {
                    id: params.storeId,
                    userId
                },
            });
            return NextResponse.json(store);
        }

    }catch(error) {
        console.log('[STORE_DELETE]',error);
        return new NextResponse('Internal error', { status: 500})
    }
}