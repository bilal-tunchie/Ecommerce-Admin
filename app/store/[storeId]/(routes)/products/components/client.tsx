"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { ProductColumn, columns } from "./columns";

interface ProductsClientProps {
    data: ProductColumn[];
    guestId?: string;
};

export const ProductsClient: React.FC<ProductsClientProps> = ({
    data,
    guestId
}) => {
    const params = useParams();
    const router = useRouter();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && <>
                <div className="flex items-center justify-between">
                    <div>
                        <Heading title={`Products (${data.length})`} description="Manage products for your store" />
                        {guestId && <p className="text-xs text-[#ff0000] mt-3">You can add maximum of 15 products</p>}
                    </div>
                    <Button onClick={() => router.push(`/store/${params.storeId}/products/new`)}>
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </div>
                <Separator />
                <DataTable searchKey="name" columns={columns} data={data} />
                <Heading title="API" description="API Calls for Products" />
                <Separator />
                <ApiList entityName="products" entityIdName="productId" />
            
            </>}
        </>
    );
};