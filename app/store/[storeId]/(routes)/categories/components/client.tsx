"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, CategoryColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface CategoriesClientProps {
    data: CategoryColumn[];
    guestId?: string;
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({
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
                        <Heading title={`Categories (${data.length})`} description="Manage categories for your store" />
                        {guestId && <p className="text-xs text-[#ff0000] mt-3">You can add maximum of 5 categories</p>}
                    </div>
                    <Button onClick={() => router.push(`/store/${params.storeId}/categories/new`)}>
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </div>
                <Separator />
                <DataTable searchKey="name" columns={columns} data={data} />
                <Heading title="API" description="API Calls for Categories" />
                <Separator />
                <ApiList entityName="categories" entityIdName="categoryId" />
            </>}
        </>
    );
};