import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { getStoreByGuest } from '@/actions/get-store-by-guest';
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const guestStore = await getStoreByGuest();
        const guestId = guestStore?.guestId;
        const count = await prismadb.category.count();

        const { userId } = auth();

        const body = await req.json();

        const { name, billboardId } = body;
        
        if (guestId && count >= 5) {
            return new NextResponse("Can not add more than 5 categories", { status: 400 });
        }

        if (!userId && !guestId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("Billboard ID is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: userId || guestId?.toString(),
            },
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("[CATEGORIES_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId,
            },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.log("[CATEGORIES_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
