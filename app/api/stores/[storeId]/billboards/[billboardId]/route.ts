import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';


export async function GET(
    req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {
        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        });
    
        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARD_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};


export const PATCH =  async (req: Request,
    { params }: { params: { storeId: string, billboardId: string }}) => {
    try {
        const { userId }  = auth();
        if(!userId) new Response("Unauthenticated", { status: 401 });
        
        const { label, imageUrl } = await req.json() // extract from body
        if(!label) new Response("Label is required", { status: 400 });
        if(!imageUrl) new Response("Image is required", { status: 400 });

        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
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
            
            const billboard = await prismadb.billboard.update({
                where:{
                    id: params.billboardId
                },
                data: {
                    label,
                    imageUrl,
                },
            });
            return NextResponse.json(billboard);
        }

    }catch(error) {
        console.log('[BILLBOARD_PATCH]',error);
        return new NextResponse('Internal error', { status: 500})
    }
}

export const DELETE =  async (
    req: Request,
    { params }: { params: { billboardId: string, storeId: string } }
) => {
    try {
        const { userId }  = auth();
        if(!userId) new Response("Unauthenticated", { status: 401 });

        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        if (userId !== null){

            const storeByUserId = await prismadb.store.findFirst({
                where: {
                    id: params.storeId,
                    userId,
                }
            });

            if (!storeByUserId) {
                return new NextResponse("Unauthorized", { status: 405 });
            }

            const billboard = await prismadb.billboard.delete({
                where: {
                    id: params.billboardId,
                }
            });
        
            return NextResponse.json(billboard);
        }

    }catch(error) {
        console.log('[BILLBOARD_DELETE]',error);
        return new NextResponse('Internal error', { status: 500})
    }
}