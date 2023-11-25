export default function authLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center pt-[200px]  h-full">
            {children}
        </div>
    )
}