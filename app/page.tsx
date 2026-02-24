'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
  

export default function HomePage() {

    const router = useRouter();

    useEffect(() => {
        const jwtToken = Cookies.get('jwtToken');
        if (!jwtToken) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );

}

