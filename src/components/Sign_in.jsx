import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect to homepage
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-indigo-100">
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Log In</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white/80 placeholder-gray-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white/80 placeholder-gray-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🟡 Forgot Password Link */}
        <div className="text-right mb-4">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-green-700 hover:underline focus:outline-none"
          >
            Forgot Password?
          </button>
        </div>

        <button
          onClick={handleSignin}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
        >
          Sign In
        </button>

        {/* 🟢 Sign Up Prompt */}
        <p className="text-center mt-6 text-sm text-gray-700">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-green-700 font-medium hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
