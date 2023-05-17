"use client";

const EmptyState = () => {
    return ( 
        <div className="h-full flex justify-center items-center px-4 py-10 sm:px-6 lg:px-8 bg-gray-100">
            <div className="flex flex-col text-cent items-center">
                <h3
                    className="mt-2 text-2xl font-semibold text-neutral-900"
                >Select a chat or create a new conversation</h3>
            </div>
        </div>
    );
}
 
export default EmptyState;