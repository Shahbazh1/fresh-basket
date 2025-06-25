// src/pages/CartPage.jsx
import React, { useEffect } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ cart, incQty, decQty, removeItem }) => {
  const navigate = useNavigate();

  // ✅ Calculate cart total
  const cartTotal = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  // ✅ Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Proceed to checkout (navigate to BuyerDetails)
  const handleCheckout = () => {
    if (cart.length === 0) return;
   navigate("/buyer-details", {
  state: {
    cart,
    total: cartTotal,
    clearCart: true, // just a flag, optional
  },
});

  };

  return (
    <div className="min-h-screen px-6 md:px-20 pt-24 pb-16 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8">
        Your <span className="text-green-600">Cart</span>
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          Your cart is empty.{" "}
          <Link to="/" className="text-green-600 underline">
            Go back shopping
          </Link>
        </div>
      ) : (
        <>
          {/* 🛒 CART ITEMS */}
          <div className="space-y-6 mb-10">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Rs. {item.price.toLocaleString()} each
                    </p>

                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => decQty(item)}
                        className="p-1 border rounded-l hover:bg-gray-100"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 border-t border-b">{item.qty}</span>
                      <button
                        onClick={() => incQty(item)}
                        className="p-1 border rounded-r hover:bg-gray-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    Rs. {(item.price * item.qty).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-red-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💵 TOTAL */}
          <div className="text-right text-xl font-semibold">
            Total: Rs. {cartTotal.toLocaleString()}
          </div>

          {/* ✅ CHECKOUT */}
          <div className="text-right mt-4">
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
