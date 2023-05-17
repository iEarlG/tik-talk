"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Button from "@/app/Components/Button";
import Input from "@/app/Components/Inputs/Input";
import AuthSocialBtn from "./AuthSocialBtn";

import { BsGithub, BsGoogle, BsMeta } from "react-icons/bs";

type authVariant = "Login" | "Register";

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<authVariant>("Login");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if (session?.status === "authenticated") {
        router.push("/users");
      }
    }, [session?.status, router]);
    


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
            axios.post("/api/register", data)
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false));
        }
        if (variant === "Login") {
            signIn("credentials", {
                ...data,
                redirect: false,
            })
            .then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid credentials");
                }

                if (callback?.ok && !callback?.error) {
                    toast.success("Logged in successfully");
                }
            })
            .finally(() => setIsLoading(false));
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, {
            redirect: false,
        })
        .then((callback) => {
            if (callback?.error) {
                toast.error("Invalid credentials!");
            }

            if (callback?.ok && !callback?.error) {
                toast.success("Logged in successfully");
            }
        })
        .finally(() => setIsLoading(false));
    };

    return ( 
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === "Register" && (
                        <Input label="Name" id="name" register={register} errors={errors} disabled={isLoading} />
                    )}
                    <Input label="Email Addres" id="email" type="email" register={register} errors={errors} disabled={isLoading} />
                    <Input label="Password" id="password" type="password" register={register} errors={errors} disabled={isLoading} />

                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === "Login" ? "Sign in" : "Register"}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute flex items-center inset-0">
                            <div className="w-full border-t border-gray-300" />
                        </div>

                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="flex mt-6 gap-2">
                        <AuthSocialBtn icon={BsGoogle} onClick={() => socialAction('google')} />
                        <AuthSocialBtn icon={BsGithub} onClick={() => socialAction('github')} />
                        <AuthSocialBtn icon={BsMeta} onClick={() => socialAction('meta')} />
                    </div>
                </div>

                <div className="flex justify-center gap-2 text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === "Login" ? "New to TikTalk?" : "Already have an account?"}
                    </div>

                    <div 
                        className="underline cursor-pointer" 
                        onClick={authVariantHandler}
                    >
                        {variant === "Login" ? "Create an Account" : "Sign in"}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default AuthForm;