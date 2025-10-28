import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn, logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(isLoggedIn());

  useEffect(() => {
    // simple listener for storage changes (multi-tab)
    const onStorage = () => setLogged(isLoggedIn());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    logout();
    setLogged(false);
    alert('Logged out');
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center bg-green-200 px-6 py-3 shadow-md">
      {/* Logo on left */}
      <div
        className="font-bold text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
      logo
      </div>
      <div className="flex space-x-6">
        <button onClick={() => navigate("/women")}>Women</button>
        <button onClick={() => navigate("/kids")}>Kids</button>
        <button onClick={() => navigate("/cart")}>Cart</button>
        <button onClick={() => navigate("/wishlist")}>Wishlist</button>
        {!logged ? (
          <button onClick={() => navigate("/login")}>Login / Signup</button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}
