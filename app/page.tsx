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
    const [file, setFile] = useState <File | null>(null);

    const [sector, setSector] = useState('');
    const [startDate, setStartDate] = useState('');
    const [clientRisk, setClientRisk] = useState(0);

    // Initialize with all expected keys
    const [userData, setUserData] = useState<UserData>({ 
      username: '', 
      sector: '', 
      monthsInBusiness: 0, 
      clientRisk: 0 
    });
    

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

    function handleFileUplaod(e: React.FormEvent<HTMLInputElement>) {
      const target = e.target as HTMLInputElement & {
        files: FileList;
      }

      setFile(target.files[0]);
    }

    async function handleFileUploadSubmit(e: React.SyntheticEvent) {
      e.preventDefault();

      if (!file || typeof file === 'string') return;

      const jwtToken = Cookies.get('jwtToken') || "";

      const formData = new FormData();
      
      formData.append('jwt_token', jwtToken);
      formData.append('file', file);

      const response = await fetch('http://127.0.0.1:8000/utils/upload_support_file', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      location.reload()

      alert(data.message);

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



    async function handleDownloadTemplate(e: React.SyntheticEvent) {

      const response = await fetch('http://127.0.0.1:8000/utils/download_template', {
        method: 'POST',
        body: JSON.stringify({ jwt_token: jwtToken }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'finance_template.csv');
      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    }

    async function handleMakeReccomendation(e: React.SyntheticEvent) {

      const response = await fetch('http://127.0.0.1:8000/utils/make_suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jwt_token: jwtToken }),
      });

      const data = await response.json();

      location.reload()

      if (data.status == 200) {
        alert(data.reccomendation);
      }
      else {
        alert(data.message);
      }
      
    }


    useEffect(() => {
        
        if (!jwtToken) {
            router.push('/login');
        }

        getUserData();
    }, [router]);

    
    const handleLogout = () => {
      Cookies.remove('jwtToken');
      router.push('/login');
    };


    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
      }
    }


    return (
   
      
      <div className="centered-page-div">
        {/* nav bar */}
        <nav className="navbar sticky-top bg-body-tertiary">
          <div className="container-fluid">
            <div className="d-flex align-items-center gap-4">
              <h1 className="page-header ps-3">Budget For You</h1>
              <ul className="nav navbar-nav flex-row gap-3">
                <li><a className="nav-link" href="#">Home</a></li>
                <li><a className="nav-link" href="#">Dashboard</a></li>
              </ul>
            </div>
            <div className="dropdown-css">
              <button className="btn btn-primary" type="button">Account</button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item active" href="#">Update or View Your Information</a></li>
                <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <br></br>

        
        
        <div className="container py-4">
          {/* left side */}
          <div className="row p-3">
            <div className="col-lg-6">
              <div className="card border-1 shadow-sm p-4 m-4">
                <h5 className="fw-bold mb-3 border-bottom pb-2">Business Profile</h5>
                <div className="mb-2">
                  <label className="d-block">Username:</label>
                  <span className="fw-bold">{userData.username}</span>
                </div>
                <div className="mb-2">
                  <label className="d-block">Sector:</label>
                  <span className="fw-bold">{userData.sector || 'Not set'}</span>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label className="d-block">Months in Business:</label>
                    <span className="fw-bold">{userData.monthsInBusiness || 0}</span>
                  </div>
                  <div className="col-md-6">
                    <label className="d-block">Client Concentration Risk:</label>
                    <span className="fw-bold">{userData.clientRisk || 0}/10</span>
                  </div>
                </div>
              </div>

              <div className="card border-1 shadow-sm p-4 m-4">
                <h5 className="fw-bold mb-3 border-bottom pb-2">Update Information</h5>
                <form onSubmit={handleInfoSubmit}>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter business sector"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="">Client Risk Level: {clientRisk}</label>
                    <input
                      className="form-range"
                      type="range"
                      min="0"
                      max="10"
                      value={clientRisk}
                      onChange={(e) => setClientRisk(Number(e.target.value))}
                    />
                  </div>
                  <button className="btn btn-primary w-100 fw-bold" type="submit">Submit Info</button>
                </form>
              </div>
            </div>
          
      
          
          {/* right side */}
            <div className="col-lg-6">
              <div className="card border-1 shadow-sm p-4 m-4">
                <h5 className="fw-bold mb-3 border-bottom pb-2">Upload Support Files</h5>
                <div className="mb-3">
                  <button className="btn btn-primary w-100 fw-bold" onClick= {handleDownloadTemplate}>Download Template</button>
                </div>
                <div className="mb-3">
                  <form onSubmit={handleFileUploadSubmit}>
                    <input className="form-control" type="file" onChange={handleFileChange} />
                    <br></br>
                    <button className="btn btn-secondary w-100" type="submit" disabled={!file}>Submit File</button>
                  </form>
                </div>
              </div>
              <div className="m-4">
                  <button className="btn btn-secondary w-100 fw-bold" onClick= {handleMakeReccomendation}>Make Forecast</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    );
}

