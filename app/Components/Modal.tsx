"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { GrFormClose } from "react-icons/gr";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ 
    isOpen,
    onClose,
    children
}) => {
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
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center text-center p-4 sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative w-full sm:w-full sm:max-w-lg transform overflow-hidden rounded-lg bg-white 
                                px-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6"
                            >
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block z-10">
                                    <button 
                                        type="button" 
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <GrFormClose 
                                            className="h-6 w-6"
                                        />
                                    </button>
                                </div>

                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
 
export default Modal;