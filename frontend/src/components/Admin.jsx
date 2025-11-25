import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // If user not logged in or not admin → redirect
    if (!user || user.role !== "ADMIN") {
      navigate("/home");   // kick them out
    }
  }, [navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin! Only you can see this page.</p>
    </div>
  );
};

export default Admin;
