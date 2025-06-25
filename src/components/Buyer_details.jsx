import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function BuyerDetails({ setCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, qty: initialQty, cart = [] } = location.state || {};

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // ✅ Allow dynamic quantity update for each item
  const [items, setItems] = useState(
    product
      ? [{ ...product, qty: initialQty || 1 }]
      : cart.map((item) => ({ ...item }))
  );

  // ✅ Calculate total
  const totalAmount = items.reduce((acc, item) => acc + item.qty * item.price, 0);

  const handleQtyChange = (index, newQty) => {
    const updatedItems = [...items];
    updatedItems[index].qty = parseInt(newQty) || 1;
    setItems(updatedItems);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill in all fields (Name, Phone, Address) before placing the order.");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to place an order.");
      navigate("/signin");
      return;
    }

    const order = {
      items: items.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        image: item.image,
        total: item.qty * item.price,
      })),
      buyer: {
        name,
        phone,
        address,
        email: user.email,
      },
      userEmail: user.email,
      totalAmount,
      status: "Processing",
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "orders"), order);
      localStorage.removeItem("cart");
      if (window.setCart) {
        window.setCart([]);
      }
      setCart([]);
      alert("Order placed successfully!");
      navigate("/my-orders");
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  if (!items || items.length === 0) {
    return <p className="text-center mt-10">No product selected.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Buyer Details</h2>

        <div className="mb-6 space-y-4">
          <h3 className="text-lg font-semibold mb-2">Order Summary:</h3>
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border-b pb-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-contain" />
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-600">Rs. {item.price} per kg</p>
                <div className="flex items-center gap-2 mt-1">
                  <label className="text-sm">Qty (kg):</label>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => handleQtyChange(index, e.target.value)}
                    className="w-16 px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>
              <div className="font-semibold">Rs. {item.price * item.qty}</div>
            </div>
          ))}
          <p className="text-right font-bold mt-2">Total: Rs. {totalAmount}</p>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded border border-gray-300 focus:ring-2 focus:ring-green-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 mb-4 rounded border border-gray-300 focus:ring-2 focus:ring-green-300"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="Full Address"
          className="w-full p-3 mb-6 rounded border border-gray-300 focus:ring-2 focus:ring-green-300"
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
