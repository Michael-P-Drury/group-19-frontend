"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Dashboard from "./dashboard";

export default function HomePage() {
  const router = useRouter();
  const [userData, setUserData] = useState({ username: "" });
  const jwtToken = Cookies.get("jwtToken");
  const [file, setFile] = useState<File | null>(null);

  const getUserData = async () => {
    const response = await fetch("http://127.0.0.1:8000/users/get_user_info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt_token: jwtToken }),
    });

    const data = await response.json();

    if (data.status === 200) {
      console.log(data.user_data.username);
      setUserData({ username: data.user_data.username });
    }
  };

  function handleFileUplaod(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);
  }

  async function handleFileUploadSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!file || typeof file === "string") return;

    const jwtToken = Cookies.get("jwtToken") || "";

    const formData = new FormData();

    formData.append("jwt_token", jwtToken);
    formData.append("file", file);

    const response = await fetch(
      "http://127.0.0.1:8000/users/upload_support_file",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    location.reload();

    if (data.status == 200) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  }

  useEffect(() => {
    if (!jwtToken) {
      router.push("/login");
    }
    async function handleDownloadTemplate(e: React.SyntheticEvent) {
      const response = await fetch(
        "http://127.0.0.1:8000/utils/download_template",
        {
          method: "POST",
          body: JSON.stringify({ jwt_token: jwtToken }),
        },
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "finance_template.csv");
      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    }

    async function handleMakeReccomendation(e: React.SyntheticEvent) {
      const response = await fetch(
        "http://127.0.0.1:8000/utils/make_suggestion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jwt_token: jwtToken }),
        },
      );

      const data = await response.json();

      location.reload();

      if (data.status == 200) {
        alert(data.reccomendation);
      } else {
        alert(data.message);
      }
    }

    getUserData();
  }, [router]);

  return (
    <div>
      <h1>Home Page</h1>

      <p>Username: {userData.username}</p>

      <button
        onClick={() => {
          Cookies.remove("jwtToken");
          router.push("/login");
        }}
      >
        {" "}
        Logout{" "}
      </button>

      <p>Upload new File:</p>

      <form onSubmit={handleFileUploadSubmit}>
        <input type="file" onChange={handleFileUplaod}></input>
        <button type="submit">Submit File</button>
      </form>
    </div>
  );
            <button onClick= {handleDownloadTemplate}>Download Template</button>

            <button onClick= {handleMakeReccomendation}>Make Reccomendation</button>

            <button onClick={() => {Cookies.remove('jwtToken'); router.push('/login');}}> Logout </button>

        </div>
    );

 // return <Dashboard />;
}
