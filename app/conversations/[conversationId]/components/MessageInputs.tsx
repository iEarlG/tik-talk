"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputsProps {
    id: string;
    errors: FieldErrors;
    register: UseFormRegister<FieldValues>;
    required?: boolean;
    placeholder?: string;
    type?: string;
}

const MessageInputs: React.FC<MessageInputsProps> = ({
    id,
    errors,
    register,
    required,
    placeholder,
    type
}) => {


    return ( 
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                autoComplete={id}
                {...register(id, { required })}
                placeholder={placeholder}
                className="w-full text-black font-light py-2 px-4 bg-neutral-100 rounded-full
                focus:outline-none"
            />
        </div>
    );
}
 
export default MessageInputs;