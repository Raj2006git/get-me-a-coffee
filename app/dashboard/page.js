"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    credentials: "",
    profilePicture: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        username: session.user.username || session.user.name || "",
        credentials: "",
        profilePicture: "",
      });
    }
  }, [status, session, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Profile updated successfully ✅");
      } else {
        alert("Failed to update ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  if (status === "loading") {
    return (
      <div className="text-white flex justify-center items-center min-h-[70vh]">
        Loading your dashboard...
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="text-white flex flex-col justify-center items-center min-h-[70vh] gap-6">
      <h1 className="font-bold text-3xl">Welcome to your Dashboard</h1>

      <div className="flex gap-5.5 items-center">
        <label className="font-bold">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-gray-800 p-2 rounded-lg w-[28vw]"
        />
      </div>

      <div className="flex gap-5.5 items-center">
        <label className="font-bold">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="bg-gray-800 p-2 rounded-lg w-[28vw]"
        />
      </div>

      <div className="flex gap-5.5 items-center">
        <label className="font-bold">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="bg-gray-800 p-2 rounded-lg w-[28vw]"
        />
      </div>

      <div className="flex gap-5.5 items-center">
        <label className="font-bold">RazorPay Credentials</label>
        <input
          type="text"
          name="credentials"
          value={formData.credentials}
          onChange={handleChange}
          className="bg-gray-800 p-2 rounded-lg w-[25vw]"
        />
      </div>

      <div className="flex gap-5.5 items-center">
        <label className="font-bold">Profile Picture</label>
        <input
          type="text"
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleChange}
          className="bg-gray-800 p-2 rounded-lg w-[25vw]"
        />
      </div>

      <button
        onClick={handleSave}
        className="p-2 m-2 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-bl font-medium text-sm px-5 py-2.5 text-center cursor-pointer"
      >
        Save
      </button>
    </div>
  );
};

export default Dashboard;
