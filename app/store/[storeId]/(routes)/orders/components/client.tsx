"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, OrderColumn } from "./columns";
import FixedNotification from "@/components/ui/fixed-notification";
import { useParams } from "next/navigation";

interface OrderClientProps {
    data: OrderColumn[];
    href: string;
    guestStoreId: string;
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data,
    href,
    guestStoreId
}) => {
    const params = useParams()

    return (
        <>
            {params.storeId === guestStoreId && <FixedNotification 
                note={`Make order in store and see the reflection here:`}
                link={true}
                href={href}
            />}
            <Heading title={`Orders (${data.length})`} description="Manage orders for your store" />
            <Separator />
            <DataTable searchKey="products" columns={columns} data={data} />
        </>
    );
};