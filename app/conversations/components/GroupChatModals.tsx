"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

import { User } from "@prisma/client";

import Modal from "@/app/Components/Modal";
import Input from "@/app/Components/Inputs/Input";
import SelectPeople from "@/app/Components/Inputs/SelectPeople";

interface GroupChatModalsProps {
    users: User[];
    isOpen?: boolean; 
    onClose: () => void; 
}

const GroupChatModals: React.FC<GroupChatModalsProps> = ({
    users,
    isOpen,
    onClose,
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, setValue, watch,
    formState: {
        errors,
    }} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: [],
        }
    });
    const members = watch("members");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/conversations", {
            ...data,
            isGroup: true,
        })
        .then(() => {
            router.refresh();
            onClose();
        })
        .catch(() => {
            toast.error("Failed to create group chat");
        })
        .finally(() => {
            setIsLoading(false);
        });
    }
    
    return ( 
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold text-gray-900 leading-6">Create a Group chat</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Add 2 or more friend to create a group chat</p>

                        <div className="flex flex-col gap-y-8 mt-10 ">
                            <Input 
                                register={register}
                                label="Group name"
                                id="name"
                                disabled={isLoading}
                                errors={errors}
                                required
                            />
                            <SelectPeople 
                                label="Members"
                                disabled={isLoading}
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name,
                                }))}
                                onChange={(value) => setValue("members", value, {
                                    shouldValidate: true,
                                })}
                                value={members}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
 
export default GroupChatModals;