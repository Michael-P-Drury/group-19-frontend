'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
  

export default function HomePage() {

    const router = useRouter();
    const [userData, setUserData] = useState({ username: '' });
    const jwtToken = Cookies.get('jwtToken');

    const getUserData = async () => {
        const response = await fetch('http://127.0.0.1:8000/users/get_user_info', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ jwt_token: jwtToken }),
        });

        const data = await response.json();

        if (data.status === 200) {
            console.log(data.user_data.username)
            setUserData({username: data.user_data.username});
        }

    };

    useEffect(() => {
        
        if (!jwtToken) {
            router.push('/login');
        }

        getUserData();
    }, [router]);

    

    return (
        <div>
            <h1>Home Page</h1>

            <p>Username: {userData.username}</p>

        </div>
    );

}

