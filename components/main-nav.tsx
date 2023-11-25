"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/store/${params.storeId}`,
            label: 'Overview',
            active: pathname === `/store/${params.storeId}`,
        },
        {
            href: `/store/${params.storeId}/billboards`,
            label: 'Billboards',
            active: pathname.startsWith(`/store/${params.storeId}/billboards`) ,
        },
        {
            href: `/store/${params.storeId}/categories`,
            label: 'Categories',
            active: pathname.startsWith(`/store/${params.storeId}/categories`),
        },
        {
            href: `/store/${params.storeId}/sizes`,
            label: 'Sizes',
            active: pathname.startsWith(`/store/${params.storeId}/sizes`),
        },
        {
            href: `/store/${params.storeId}/colors`,
            label: 'Colors',
            active: pathname.startsWith(`/store/${params.storeId}/colors`),
        },
        {
            href: `/store/${params.storeId}/products`,
            label: 'Products',
            active: pathname.startsWith(`/store/${params.storeId}/products`),
        },
        {
            href: `/store/${params.storeId}/orders`,
            label: 'Orders',
            active: pathname.startsWith(`/store/${params.storeId}/orders`),
        },
        {
            href: `/store/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname.startsWith(`/store/${params.storeId}/settings`),
        },
    ]

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-primary',
                        route.active ? 'text-black dark:text-white' : 'text-muted-foreground',

                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
};