import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const POST =  async (req: Request,
    { params }: { params: { storeId: string }}) => {
    try {

        const { userId }  = auth();
        if(!userId) new Response("Unauthenticated", { status: 401 });
        
        const { label, imageUrl } = await req.json() // extract from body
        if(!label) new Response("Label is required", { status: 400 });
        if(!imageUrl) new Response("Image is required", { status: 400 });

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        
        if (userId !== null) {

            const storeByUserId = await prismadb.store.findFirst({
                where: {
                    id: params.storeId,
                    userId,
                }
            });
            
            if (!storeByUserId) {
                return new NextResponse("Unauthorized", { status: 405 });
            }
            
            const billboard = await prismadb.billboard.create({
                data: {
                    label,
                    imageUrl,
                    storeId: params.storeId

                },
            });
            return NextResponse.json(billboard);

        }

    }catch(error) {
        console.log('[BILLBOARD_POST]',error);
        return new NextResponse('Internal error', { status: 500})
    }
}

export const GET =  async (req: Request,
    { params }: { params: { storeId: string }}) => {
    try {
        const { userId }  = auth();
        if(!userId) new Response("Unauthenticated", { status: 401 });

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(billboards);

    }catch(error) {
        console.log('[BILLBOARDS_GET]',error);
        return new NextResponse('Internal error', { status: 500})
    }
}