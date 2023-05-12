"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean;
}


const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled,
 }) => {
    return (
        <div className="">
            <label htmlFor={id} className="block text-sm font-semibold leading-6 text-neutral-900">
                {label}
            </label>

            <div className="mt-2">
                <input 
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={clsx(`form-input block w-full rounded-md 
                    border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400
                    focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6`, 
                    errors[id] && "focus:ring-rose-600",
                    disabled && "opacity-50 cursor-default")}
                />
            </div>
        </div>
    );
}
 
export default Input;