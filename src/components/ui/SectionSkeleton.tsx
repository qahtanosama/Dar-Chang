export function SectionSkeleton() {
    return (
        <div className="w-full animate-pulse bg-primary-dark min-h-[50vh] flex flex-col justify-center items-center py-24 space-y-8">
            <div className="h-12 w-3/4 max-w-lg bg-white/5 rounded-full" />
            <div className="h-4 w-5/6 max-w-2xl bg-white/5 rounded-full" />
            <div className="h-4 w-4/6 max-w-xl bg-white/5 rounded-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl pt-12 px-6">
                <div className="h-64 bg-white/5 rounded-2xl w-full" />
                <div className="h-64 bg-white/5 rounded-2xl w-full" />
                <div className="h-64 bg-white/5 rounded-2xl w-full" />
            </div>
        </div>
    );
}
