"use client";
// import React from 'react'

import { ChevronRight } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

interface PathStructureProps {
    name: string;
    pageName: string
}

export const PathStructure: React.FC<PathStructureProps> = ({
    name, pageName
}) => {

    const params = useParams();
    const router = useRouter();

    return (
        <div className="flex items-center">
            <Button 
                variant="link" 
                className="p-0 pr-2 opacity-40"
                onClick={() => router.push(`/store/${params.storeId}/${pageName}`)}
            >
                {pageName[0].toUpperCase() + pageName.slice(1)}
            </Button>
            <ChevronRight className="h-4 w-4" />
            <Button 
                variant="link" 
                className="p-0 pl-2"
            >
                {name}
            </Button>
        </div>
    )
}
