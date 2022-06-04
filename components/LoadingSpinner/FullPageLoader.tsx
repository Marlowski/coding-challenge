import LoadingSpinner from "./index";

export default function FullPageLoader() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-primary bg-secondary">
            <LoadingSpinner />
            <p className="mt-2">Loading...</p>
        </div>
    )
}