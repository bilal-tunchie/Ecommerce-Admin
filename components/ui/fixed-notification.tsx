"use client"

import { X } from "lucide-react";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface FixedNotificationProps {
    note: string;
    link?: boolean;
    href?: string;
};

const FixedNotification:React.FC<FixedNotificationProps> = ({note, link, href}) => {
    const [isHidden, setIsHidden] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    return (
        <>
            {isMounted && 
            
            <div className={cn("flex justify-between items-center w-full bg-[#3498db] text-white py-1 px-3 text-center z-50 text-xs rounded-md", isHidden && "hidden",)}>
                <div className="w-full text-center flex justify-center items-center gap-x-2">
                    <p>{note}</p>
                    {/* params.storeId */}
                    {link && <Button className="h-[1.1rem] p-0"> 
                        <Link href={String(href)} target="_blank" className="flex items-center gap-x-1 h-[1.1rem] w-full px-2 py-4 text-md">
                                Store
                            <ExternalLink size={15} />
                        </Link>
                    </Button>}
                </div>
                <Button 
                    className="ml-auto p-1 h-[1.1rem]"
                    onClick={() => setIsHidden(true)}
                >
                    <X size={15}/>
                </Button>
            </div>
            }
        </>
    )
}

export default FixedNotification;