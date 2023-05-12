import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
                src="/Logos.png"
                alt="Logo"
                height="58"
                width="58"
                className="mx-auto w-auto"
            />
            <h2 className="mt-6 text-center text-2xl font-[600] tracking-tight text-neutral-900">
                Sign in to your account
            </h2>
        </div>

        <AuthForm />
    </div>
  );
};
