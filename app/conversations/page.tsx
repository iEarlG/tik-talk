"use client";

import clsx from "clsx";

import useConversation from "../hooks/useConversation";
import EmptyState from "../Components/EmptyState";

const Home = () => {
    const { isOpen } = useConversation();

    return (
        <div className={clsx(`h-full lg:pl-80 lg:block`,
        isOpen ? "block" : "hidden")}>
            <EmptyState />
        </div>
    );
}

export default Home;