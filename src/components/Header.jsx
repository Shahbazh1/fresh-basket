import React, { useEffect, useState } from "react";
import { ShoppingBasket, ShoppingCart, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const ADMIN_EMAIL = "admin@gmail.com";

const Header = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleNavClick = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 bg-amber-50 flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-6 font-bold gap-4">
      {/* 🛒 Logo */}
      <div className="flex items-center gap-2">
        <ShoppingBasket className="w-6 h-6 text-green-600" />
        <h1 className="text-2xl text-green-800 font-bold">Fresh Basket</h1>
      </div>

      {/* 🌐 Nav Links */}
      <nav className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-10 text-green-900 text-sm md:text-base">
        <button onClick={() => handleNavClick("home")} className="hover:text-green-600">Home</button>
        <button onClick={() => handleNavClick("shop")} className="hover:text-green-600">Shop</button>
        <button onClick={() => handleNavClick("categories")} className="hover:text-green-600">Categories</button>
        <button onClick={() => handleNavClick("about")} className="hover:text-green-600">About</button>
        <button onClick={() => handleNavClick("contact")} className="hover:text-green-600">Contact</button>

        {/* 📦 My Orders (User Only) */}
        {currentUser && currentUser.email !== ADMIN_EMAIL && (
          <button onClick={() => navigate("/my-orders")} className="hover:text-green-600">
            My Orders
          </button>
        )}

        {/* 🛠 Admin Orders */}
        {currentUser?.email === ADMIN_EMAIL && (
          <button onClick={() => navigate("/admin-orders")} className="hover:text-red-600">
            Admin Orders
          </button>
        )}

        {/* 🛒 Cart at the END */}
        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
          <ShoppingCart className="w-6 h-6 text-green-700" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>

        {/* 🔐 Login / Logout */}
        {!currentUser ? (
          <button
            onClick={() => navigate("/signin")}
            className="flex items-center gap-1 bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition"
          >
            <LogIn size={16} />
            <span className="text-sm font-medium">Login</span>
          </button>
        ) : (
          <button
            onClick={() => signOut(auth)}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
