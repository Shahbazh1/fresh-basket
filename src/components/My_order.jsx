import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { format } from "date-fns";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) return;

      try {
        const q = query(
          collection(db, "orders"),
          where("userEmail", "==", userEmail),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(list);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  if (!userEmail) {
    return <p className="text-center mt-10 text-gray-600">Please login to view your orders.</p>;
  }

  if (loading) {
    return <p className="text-center mt-10">Loading your orders...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-100 via-white to-blue-100">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have not placed any orders yet.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow p-6 space-y-4">
              {/* 📦 Status */}
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">
                  <strong>Status:</strong>{" "}
                  <span className="bg-green-100 px-2 py-1 rounded">
                    {order.status || "Processing"}
                  </span>
                </p>
                {order.createdAt?.toDate && (
                  <p className="text-sm text-gray-500">
                    {format(order.createdAt.toDate(), "dd MMM yyyy, hh:mm a")}
                  </p>
                )}
              </div>

              {/* 🛒 Items */}
              {Array.isArray(order.items) ? (
                <>
                  <h3 className="text-lg font-semibold">Ordered Items:</h3>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 border-b pb-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.qty} kg</p>
                        <p className="text-sm text-gray-600">
                          Price: Rs {item.price} × {item.qty} ={" "}
                          <strong>Rs {item.price * item.qty}</strong>
                        </p>
                      </div>
                    </div>
                  ))}
                  <p className="text-right font-bold">Total: Rs {order.totalAmount}</p>
                </>
              ) : (
                // Fallback for older/single product orders
                <div className="flex items-center gap-4 border-b pb-2">
                  <img
                    src={order.product?.image}
                    alt={order.product?.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div>
                    <p className="font-medium">{order.product?.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {order.product?.qty} kg
                    </p>
                    <p className="text-sm text-gray-600">
                      Total: Rs {order.product?.qty * order.product?.price}
                    </p>
                  </div>
                </div>
              )}

              {/* 👤 Buyer Info */}
              <div className="text-sm text-gray-700 mt-2 space-y-1">
                <p><strong>Your Name:</strong> {order.buyer?.name || "N/A"}</p>
                <p><strong>Phone:</strong> {order.buyer?.phone || "N/A"}</p>
                <p><strong>Address:</strong> {order.buyer?.address || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
