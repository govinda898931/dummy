"use client";

import React, {useState} from "react";
import {signIn} from "next-auth/react";
import Link from "next/link";
import {LoginForm} from "@/components/login-form";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            callbackUrl: "/application/dashboard",
        });
    };

    return(
        <>
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                        <div className="relative z-20 flex items-center text-lg font-medium h-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-6 w-6"
                            >
                                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                            </svg>
                            Acme Inc
                        </div>
                        <div className="relative z-20 mt-auto">
                            <blockquote className="space-y-2">
                                <p className="text-lg">
                                    &ldquo;This library has saved me countless hours of work and
                                    helped me deliver stunning designs to my clients faster than
                                    ever before.&rdquo;
                                </p>
                                <footer className="text-sm">Sofia Davis</footer>
                            </blockquote>
                        </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <LoginForm
                            formData={formData}
                            setFormData={setFormData}
                            handleSubmit={handleSubmit}
                        />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}