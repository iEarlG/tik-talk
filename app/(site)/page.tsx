import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8 bg-gray-700">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
                src="/Logo.png"
                alt="Logo"
                height="108"
                width="108"
                className="mx-auto w-auto"
            />
            <h2 className="mt-6 text-center text-1xl font-[600] tracking-tight text-white">
                Sign in to your account
            </h2>
        </div>
    </div>
  );
};
