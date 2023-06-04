"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";

import { User } from "@prisma/client";

import Modal from "../Modal";
import Input from "../Inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps {
    currentUser: User; 
    isOpen?: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    currentUser,
    isOpen,
    onClose
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, setValue, watch, 
        formState: { 
            errors 
        }} = useForm<FieldValues>({
            defaultValues: {
                name: currentUser?.name,
                image: currentUser?.image,
            }
        });

    const image = watch("image");

    const handleUpload = (result: any) => {
        setValue("image", result?.info?.secure_url, {
            shouldValidate: true,
        });
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/settings", data)
        .then(() => {
            router.refresh();
            onClose();
        })
        .catch(() => {
            toast.error("Something went wrong");
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
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Edit your profile</p>

                        <div className="flex flex-col gap-y-8 mt-10">
                            <Input 
                                id="name"
                                label="Name"
                                errors={errors}
                                disabled={isLoading}
                                register={register}
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Photo</label>

                                <div className="flex items-center gap-x-3 mt-2 ">
                                    <Image 
                                        src={image || currentUser?.image || "/placeholder.jpg"}
                                        alt="avatar"
                                        width="48"
                                        height="48"
                                        className="rounded-full"
                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset="bupuuh3y"
                                    >
                                        <Button
                                            disabled={isLoading}
                                            secondary
                                            type="button"
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-6 gap-x-6">
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            Upload
                        </Button>
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
 
export default SettingsModal;