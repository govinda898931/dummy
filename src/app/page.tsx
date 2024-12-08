"use client";

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        console.log("Attempting to redirect to /auth/login");
        router.push('/auth/login');
    }, [router]);

    return null;
}

