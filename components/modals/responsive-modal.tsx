"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";

export const ResponsiveModal = ({
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 830) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [open]);

    return (
        <>
            {isMounted && <Modal
                title="This dashboard is intended for larger screens"
                description="Please understand that the web design may not be responsive on smaller screens."
                isOpen={open}
                onClose={() => setOpen(false)}
            >
            </Modal>}
        </>
    );
};