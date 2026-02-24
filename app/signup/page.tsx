'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function SignupPage() {

    const router = useRouter();
    const [formData, setFormData] = useState({ username: '', password: '', confirm_password: ''});

    useEffect(() => {
        const jwtToken = Cookies.get('jwt_token');
        if (jwtToken) {
            router.push('/');
        }
    }, [router]);

    const handleSignup = async (e: React.FormEvent) => {

        e.preventDefault()

        const response = await fetch('http://127.0.0.1:8000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.status == 200) {

            router.push('/login');
        }

        alert(data.status_message);

    };

    return (
        <div>
            <h1>Signup Page</h1>

            <form onSubmit={handleSignup}>
                <input placeholder="username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
                <input type="password" placeholder="password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <input type="password" placeholder="confirm password" onChange={(e) => setFormData({...formData, confirm_password: e.target.value})} />
                <button type="submit">Sign Up</button>
            </form>
            <p>To Login:</p>
            <a href="/login"><button type="button">Login</button></a>
        </div>
    );

}

