"use client";

import { Fragment, useMemo } from "react";
import { format } from "date-fns";
import { Conversation, User } from "@prisma/client";
import { Dialog, Transition } from "@headlessui/react";

import { IoClose } from "react-icons/io5";
import { RiDeleteBin5Fill } from "react-icons/ri";

import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/Components/Avatar";

interface ProfileDrawerProps {
    data: Conversation & {
        users: User[];
    }
    isOpen: boolean;
    onClose: () => void;
};

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    data,
    isOpen,
    onClose
}) => {
    const otherUser = useOtherUser(data);

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), "PP");
    }, [otherUser.createdAt]);

    const headName = useMemo(() => {
        return data.name || otherUser.name;
    }, [data.name, otherUser.name]);

    const activeStatus = useMemo(() => {
        if (data.isGroup) {
            return (
                `${data.users.length} members`
            );
        }

        return "Active";
    }, [data]);

    return ( 
        <Transition.Root
            show={isOpen}
            as={Fragment}
        >
            <Dialog
                onClose={onClose}
                as="div"
                className="relative z-50"
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-40" /> 
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="fixed flex max-w-full pointer-events-none inset-y-0 right-0 pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                                    <div className="flex flex-col h-full overflow-y-scroll py-6 bg-white shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <div className="flex items-start justify-end">
                                                <div className="flex h-7 items-center ml-3 ">
                                                    <button 
                                                        onClick={onClose}
                                                        type="button" 
                                                        className="rounded-md bg-white text-gray-400 hover:text-orange-500"
                                                    >
                                                        <span className="sr-only">Close</span>
                                                        <IoClose size={24} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative flex-1 mt-6 px-4 sm:px-6">
                                            <div className="flex flex-col items-center">
                                                <div className="mb-2">
                                                    <Avatar user={otherUser} />
                                                </div>
                                                <span>{headName}</span>
                                                <div className="text-sm text-gray-500">{activeStatus}</div>
                                                <div className="flex gap-10 my-8">
                                                    <div
                                                        onClick={() => {}}
                                                        className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-75"
                                                    >
                                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100">
                                                            <RiDeleteBin5Fill size={20} />
                                                        </div>
                                                        <span className="text-sm font-light text-neutral-600">Delete Conversation</span>
                                                    </div>
                                                </div>

                                                <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                                                    <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                                        {!data.isGroup && (
                                                            <div>
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                    Email
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                    {otherUser.email}
                                                                </dd>
                                                            </div>
                                                        )}
                                                        {!data.isGroup && (
                                                            <>
                                                                <hr />
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                        Joined
                                                                    </dt>
                                                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                        <time dateTime={joinedDate}>{joinedDate}</time>
                                                                    </dd>
                                                                </div>
                                                            </>
                                                        )}
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
 
export default ProfileDrawer;