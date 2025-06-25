import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ added useLocation
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // ✅ to access location.state

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Check if redirected from Buy Now
      if (location.state?.redirectTo) {
        navigate(location.state.redirectTo, {
          state: {
            product: location.state.product,
            qty: location.state.qty,
          },
        });
      } else {
        navigate("/buyer-details");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100">
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">Create an Account</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded border border-gray-300 focus:ring-2 focus:ring-green-300"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded border border-gray-300 focus:ring-2 focus:ring-green-300"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-6 rounded border border-gray-300 focus:ring-2 focus:ring-green-300"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
        >
          Sign Up
        </button>

        <p className="text-center mt-6 text-sm text-gray-700">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-green-700 font-medium hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
