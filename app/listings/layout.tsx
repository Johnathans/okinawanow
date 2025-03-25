export default function ListingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="listings-layout">
            {children}
        </div>
    );
}
