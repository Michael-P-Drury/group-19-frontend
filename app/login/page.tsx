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

        const response = await fetch('http://127.0.0.1:8000/auth/login', {
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
        <div className="d-flex align-items-center justify-content-center min-vh-100">
            <div className="w-100" style={{ maxWidth: '380px' }}>
                <h1>Login</h1>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input className="form-control" placeholder="username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
                    </div>

                    <div className="mb-3">
                        <input className="form-control" type="password" placeholder="password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    </div>

                    <button className="btn btn-primary w-100" type="submit">Sign In</button>
                </form>

                <p className="text-right mt-3">Create an account:</p>
                <a href="/signup">
                    <button className="btn btn-secondary w-100" type="button">Sign Up</button>
                </a>
            </div>
        </div>
    );

}

