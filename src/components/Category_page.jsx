import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { auth } from "../firebase"; // ✅ Required for auth check

import Fruits from "../data/Fruits";
import Vegetables from "../data/Vegetable";
import Nuts from "../data/Nuts";
import Species from "../data/Spices";
import Cart from "./Cart";

const CATEGORIES = [
  { id: "fruits", name: "Fruits", image: "/genral_images/fruits.png" },
  { id: "vegetables", name: "Vegetables", image: "/genral_images/vegetables.png" },
  { id: "fresh_nuts", name: "Fresh Nuts", image: "/genral_images/fresh_nuts.png" },
  { id: "species", name: "Species", image: "/genral_images/spices.png" },
  { id: "dairy", name: "Dairy", image: "/genral_images/dairy.png" },
  { id: "meat", name: "Meat", image: "/genral_images/meat.png" },
];

const bgColors = [
  "bg-yellow-50", "bg-green-50", "bg-blue-50", "bg-pink-50",
  "bg-purple-50", "bg-lime-50", "bg-rose-50",
];

const productMap = {
  fruits: Fruits,
  vegetables: Vegetables,
  fresh_nuts: Nuts,
  species: Species,
};

export default function CategoryPage({ cart, setCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { category: incomingCategory = "fruits", searchTerm = "" } = location.state || {};

  const [category, setCategory] = useState(incomingCategory);
  const [showCart, setShowCart] = useState(false);
  const [filterTerm, setFilterTerm] = useState(searchTerm);

  useEffect(() => {
    setCategory(incomingCategory);
    setFilterTerm(searchTerm);
    const section = document.getElementById("categories");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [incomingCategory, searchTerm]);

  const products = useMemo(() => {
    const all = productMap[category] || [];
    if (filterTerm?.trim()) {
      const lower = filterTerm.toLowerCase();
      return all.filter((item) => item.name.toLowerCase().includes(lower));
    }
    return all;
  }, [category, filterTerm]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((p) => p.id === item.id);
      if (existing) {
        return prevCart.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      } else {
        return [...prevCart, { ...item, qty: 1 }];
      }
    });
  };

  const incQty = (item) => {
    setCart((prev) => prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p)));
  };

  const decQty = (item) => {
    setCart((prev) => prev.map((p) => (p.id === item.id ? { ...p, qty: Math.max(1, p.qty - 1) } : p)));
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <main className="min-h-screen pb-24 bg-white">
      {/* Category Switcher */}
      <section className="px-6 md:px-20 mt-20" id="categories">
        <h2 className="text-center text-3xl font-bold mb-10">
          Categ<span className="text-green-600">ories</span>
        </h2>
        <div className="flex justify-center gap-6 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id);
                setFilterTerm("");
              }}
              className={`w-36 h-36 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition text-sm font-semibold ${
                category === cat.id
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-green-600 hover:text-green-600"
              }`}
            >
              <img src={cat.image} alt={cat.name} className="w-12 h-12 object-contain" />
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Product Cards */}
      <section className="px-6 md:px-20 mt-20 scroll-mt-32" id="categories">
        <h2 className="text-center text-3xl font-bold mb-12">
          Fresh <span className="text-green-600 capitalize">{category}</span>
        </h2>

        {filterTerm && (
          <p className="text-center text-gray-600 mb-8">
            Showing results for: <span className="font-medium text-black">"{filterTerm}"</span>
          </p>
        )}

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((item, i) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative rounded-2xl p-6 overflow-hidden flex flex-col shadow-md hover:shadow-lg transition duration-300 ${
                bgColors[i % bgColors.length]
              }`}
            >
              <button className="absolute top-4 right-4 p-1.5 border border-gray-300 rounded-full hover:bg-green-50 transition">
                <Heart size={18} className="text-green-600" />
              </button>

              <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-contain mb-4 transition-transform duration-300"
                />
              </motion.div>

              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="uppercase tracking-wide text-gray-500">{category}</span>
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, idx) => (
                    <Star key={idx} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-green-600 font-semibold mt-1 mb-4 text-base">Rs: {item.price}</p>

              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => {
                    const user = auth.currentUser;
                    if (user) {
                      navigate("/buyer-details", { state: { product: item, qty: 1 } });
                    } else {
                      navigate("/signup", {
                        state: {
                          redirectTo: "/buyer-details",
                          product: item,
                          qty: 1,
                        },
                      });
                    }
                  }}
                  className="flex-1 bg-green-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-green-700 transition"
                >
                  Buy now
                </button>

                <button
                  onClick={() => addToCart(item)}
                  className="flex-1 border border-green-600 text-green-600 rounded-lg py-2 text-sm font-medium hover:bg-green-600 hover:text-white transition"
                >
                  Add to cart
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {products.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No items found for <strong>{filterTerm}</strong>.
          </p>
        )}
      </section>

      {/* Floating Cart Button */}
      {cart.length > 0 && !showCart && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          <ShoppingCart size={18} />
          <span className="text-sm">
            {cartCount} item{cartCount > 1 && "s"} in cart
          </span>
        </button>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <Cart
          cart={cart}
          setShowCart={setShowCart}
          incQty={incQty}
          decQty={decQty}
          removeItem={removeItem}
        />
      )}
    </main>
  );
}
