"use client";

import { useRouter } from "next/navigation";
import React, { ReactElement, useState } from "react";

export default function LoginForm(): ReactElement {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    return <div>
        LoginForm
        </div>;
}   
