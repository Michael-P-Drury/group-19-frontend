'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


export default function LoginPage() {

    const router = useRouter();

    const [formData, setFormData] = useState({ username: '', password: '' });

    useEffect(() => {
        const jwtToken = Cookies.get('jwtToken');
        if (jwtToken) {
            router.push('/');
        }
    }, [router]);


    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault()

        const response = await fetch('http://127.0.0.1:8000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.status == 200) {
            Cookies.set('jwtToken', data.jwt_token);

            router.push('/');
        }

        alert(data.status_message);

    };


    return (
        <div>
            <h1>Login Page</h1>

            <form onSubmit={handleLogin}>
                <input placeholder="username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
                <input type="password" placeholder="password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button type="submit">Sign In</button>
            </form>
            <p>Create account:</p>
            <a href="/signup"><button type="button">Signup</button></a>
        </div>
    );

}

