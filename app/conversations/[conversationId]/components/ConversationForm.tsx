"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useConversation from "@/app/hooks/useConversation";

import { HiPhoto } from "react-icons/hi2";
import MessageInputs from "./MessageInputs";

const ConversationForm = () => {
    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue("message", "", {
            shouldValidate: true,
        });
        axios.post("/api/messages", {
            ...data,
            conversationId: conversationId
        });
    }

    return ( 
        <div className="w-full flex items-center py-4 px-4 bg-white border-t gap-2 lg:gap-4">
            <HiPhoto size={30} className="text-orange-500" />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex items-center gap-2 lg:gap-4"
            >
                <MessageInputs
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Type a message"
                />
            </form>
        </div>
    );
}
 
export default ConversationForm;