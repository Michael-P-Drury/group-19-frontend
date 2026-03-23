'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Define an interface for your user data
interface UserData {
  username: string;
  sector?: string;
  monthsInBusiness?: number;
  clientRisk?: number;
}

export default function HomePage() {
  const router = useRouter();
  const jwtToken = Cookies.get('jwtToken');
  
  // Initialize with all expected keys
  const [userData, setUserData] = useState<UserData>({ 
    username: '', 
    sector: '', 
    monthsInBusiness: 0, 
    clientRisk: 0 
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [sector, setSector] = useState('');
  const [startDate, setStartDate] = useState('');
  const [clientRisk, setClientRisk] = useState(0);

  const getUserData = async () => {
    if (!jwtToken) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/users/get_user_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jwt_token: jwtToken }),
      });

      const data = await response.json();

      if (data.status === 200) {
        setUserData({
          username:         data.user_data.username,
          sector:           data.user_data.sector,
          monthsInBusiness: data.user_data.months_in_business,
          clientRisk:       data.user_data.client_risk
        });
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };


  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  async function handleFileUploadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('jwt_token', jwtToken || "");
    formData.append('file', file);

    const response = await fetch('http://127.0.0.1:8000/users/upload_support_file', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    alert(data.message);
    
    // Instead of location.reload(), just refresh the data
    getUserData(); 
  }

  async function handleInfoSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!jwtToken) return;
    
    console.log("handling info submit");

    try {
      const response = await fetch('http://127.0.0.1:8000/users/update_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jwt_token:           jwtToken,
          sector:              sector,
          business_start_date: startDate,
          client_risk:         clientRisk,
        }),
      });
        
      console.log(response);

      if (response.ok) {
        alert("Information updated successfully!");
        getUserData();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update information.");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  useEffect(() => {
    if (!jwtToken) {
      router.push('/login');
    } else {
      getUserData();
    }
  }, [jwtToken, router]);

  const handleLogout = () => {
    Cookies.remove('jwtToken');
    router.push('/login');
  };

  return (
    <div className="centered-page-div">
      <h1 className="page-header">Account Page</h1>

      <div className="general-page-section">
        <p className="account-items">Username: {userData.username}</p>
        <p className="account-items">Sector: {userData.sector || 'Not set'}</p>
        <p className="account-items">Months in Business: {userData.monthsInBusiness || 0}</p>
        <p className="account-items">Client Concentration Risk: {userData.clientRisk || 0}</p>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="general-page-selection">
        <p>Update Information:</p>
        <form onSubmit={handleInfoSubmit}>
          <input
            className="input-sector"
            type="text"
            placeholder="Enter business sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          />

          <input
            className="input-business-start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            className="input-client-risk"
            type="range"
            min="0"
            max="10"
            value={clientRisk}
            onChange={(e) => setClientRisk(Number(e.target.value))}
          />
          <p>Client Risk Level: {clientRisk}</p>
          <button type="submit">Submit Info</button>
        </form>

        <hr />
        <p>Upload Support File:</p>
        <form onSubmit={handleFileUploadSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit" disabled={!file}>Submit File</button>
        </form>
      </div>
    </div>
  );
}

