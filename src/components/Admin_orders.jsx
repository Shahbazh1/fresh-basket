import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { format } from "date-fns";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const orderList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(orderList);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      console.error("❌ Error updating status:", err);
      alert("Failed to update status");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-100 via-white to-blue-100">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
        Admin Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-green-800">
                  Order ID: {order.id}
                </h3>
                <p className="text-sm text-gray-500">
                  {order.createdAt?.seconds
                    ? format(
                        new Date(order.createdAt.seconds * 1000),
                        "dd MMM yyyy, hh:mm a"
                      )
                    : "Unknown time"}
                </p>
              </div>

              {/* 🛒 Order Items */}
              <div className="mb-4 space-y-3">
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border-b pb-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-contain border"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Rs. {item.price} x {item.qty}
                      </p>
                    </div>
                    <div className="font-semibold">
                      Rs. {item.total?.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-bold text-right mb-4">
                Total Amount: Rs. {order.totalAmount?.toLocaleString() || "N/A"}
              </p>

              {/* 👤 Buyer Info */}
              <div className="text-sm text-gray-700 mb-4">
                <p>
                  <strong>Buyer Name:</strong> {order.buyer?.name || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong> {order.buyer?.phone || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {order.buyer?.address || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {order.buyer?.email || "N/A"}
                </p>
              </div>

              {/* 🔄 Order Status Control */}
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">
                  Current Status:
                  <span className="ml-2 px-2 py-1 bg-green-100 rounded">
                    {order.status || "Processing"}
                  </span>
                </p>

                <select
                  value={order.status || "Processing"}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border px-3 py-1 rounded"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
