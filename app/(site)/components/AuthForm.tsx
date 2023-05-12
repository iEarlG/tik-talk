"use client";

import Button from "@/app/Components/Button";
import Input from "@/app/Components/Inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type authVariant = "Login" | "Register";

const AuthForm = () => {
    const [variant, setVariant] = useState<authVariant>("Login");
    const [isLoading, setIsLoading] = useState(false);

    const authVariantHandler = useCallback(() => {
        if (variant === "Login") { 
            setVariant("Register");
        } else { 
            setVariant("Login");
        }
    }, [variant]);

    const { register, handleSubmit, 
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === "Register") {
            // Route register
        }
        if (variant === "Login") {
            // Route Login
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);

        // Route social action sign in
    };

    return ( 
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === "Register" && (
                        <Input label="Name" id="name" register={register} errors={errors} />
                    )}
                    <Input label="Email Addres" id="email" type="email" register={register} errors={errors} />
                    <Input label="Password" id="password" type="password" register={register} errors={errors} />

                    <div>
                        <Button>Test</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default AuthForm;