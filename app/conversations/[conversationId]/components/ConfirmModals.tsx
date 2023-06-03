"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import axios from "axios";

import { FiAlertOctagon } from "react-icons/fi";

import useConversation from "@/app/hooks/useConversation";
import Modal from "@/app/Components/Modal";
import Button from "@/app/Components/Button";

interface ConfirmModalsProps {
    isOpen?: boolean;
    onClose: () => void;
}

const ConfirmModals: React.FC<ConfirmModalsProps> = ({
    isOpen,
    onClose
}) => {
    const router = useRouter();
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(() => {
        setIsLoading(true);
        axios.delete(`/api/conversations/${conversationId}`)
        .then(() => {
            onClose();
            router.push("/conversations");
            router.refresh();
        })
        .catch(() => {
            toast.error("Failed to delete conversation");
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [conversationId, router, onClose]);

    return ( 
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="sm:flex sm:items-start">
                <div className="flex mx-auto h-12 w-12 sm:mx-0 sm:h-10 sm:w-10 items-center justify-center shrink-0 rounded-full bg-red-100">
                    <FiAlertOctagon className="h-6 w-6 text-red-600" />
                </div>

                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                        as="h3"
                        className="text-base font-medium leading-6 text-gray-900"
                    >
                        Delete Conversation
                    </Dialog.Title>
                    <div className="mt-1">
                        <p className="text-sm text-gray-500">Are you really sure you want to delete this conversation?</p>
                    </div>
                </div>
            </div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Button
                    disabled={isLoading}
                    danger
                    onClick={onDelete}
                >
                    Delete
                </Button>
                <Button
                    disabled={isLoading}
                    secondary
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );
}
 
export default ConfirmModals;