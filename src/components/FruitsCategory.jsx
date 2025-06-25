import React, { useState, useMemo } from "react";

import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Example data – replace with an API call if you have one.
 * Each product must have a unique `id`.
 */
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl p-4 shadow ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-2 ${className}`}>{children}</div>
);


const FRUITS = [
  {
    id: 1,
    name: "Apple",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=360&q=80",
    price: 10,
  },
  {
    id: 2,
    name: "Banana",
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e12e?auto=format&fit=crop&w=360&q=80",
    price: 6,
  },
  {
    id: 3,
    name: "Orange",
    image: "https://images.unsplash.com/photo-1584306677683-730b0cc5dcb8?auto=format&fit=crop&w=360&q=80",
    price: 8,
  },
  {
    id: 4,
    name: "Strawberry",
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=360&q=80",
    price: 12,
  },
  {
    id: 5,
    name: "Pineapple",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=360&q=80",
    price: 15,
  },
  {
    id: 6,
    name: "Mango",
    image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=360&q=80",
    price: 14,
  },
  {
    id: 7,
    name: "Kiwi",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=360&q=80",
    price: 11,
  },
  {
    id: 8,
    name: "Grapes",
    image: "https://images.unsplash.com/photo-1606313579098-2f7a0e7a22ee?auto=format&fit=crop&w=360&q=80",
    price: 9,
  },
];

export default function FruitsCategory() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  /**
   * Memoised filtered list based on the search query.
   */
  const filteredFruits = useMemo(() => {
    const q = search.toLowerCase();
    return FRUITS.filter((fruit) => fruit.name.toLowerCase().includes(q));
  }, [search]);

  function handleAddToCart(product) {
    setCart((prev) => {
      // if already in cart, ignore to keep it simple
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  }

  return (
    <section className="flex flex-col gap-6 px-4 md:px-8 lg:px-16 pb-16">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8">
        <h1 className="text-3xl font-bold tracking-tight">Fresh Fruits</h1>

        {/* Search bar */}
        <div className="w-full md:w-80 lg:w-96 relative">
          <input
            type="text"
            placeholder="Search fruits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-14 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <ShoppingCart className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" size={20} />
        </div>
      </header>

      {/* Product grid */}
      <motion.div
        layout
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filteredFruits.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No fruits found.</p>
        )}

        {filteredFruits.map((fruit) => (
          <motion.div layout key={fruit.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="group relative shadow-md hover:shadow-lg transition-shadow rounded-2xl overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center text-center gap-4">
                {/* Favourite icon */}
                <button
                  className="absolute right-3 top-3 text-gray-400 hover:text-red-500 transition"
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} />
                </button>

                {/* Image */}
                <img
                  src={fruit.image}
                  alt={fruit.name}
                  className="h-40 w-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Name & price */}
                <div className="flex flex-col gap-1 items-center">
                  <span className="font-medium text-lg">{fruit.name}</span>
                  <span className="text-green-600 font-semibold">${fruit.price}</span>
                </div>

                {/* Add to cart */}
                <button
                  className="mt-auto w-full flex gap-2"
                  onClick={() => handleAddToCart(fruit)}
                >
                  <ShoppingCart size={18} /> Add to cart
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Simple cart summary – optional */}
      {cart.length > 0 && (
        <aside className="fixed bottom-4 right-4 z-50 bg-green-600 text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-3">
          <ShoppingCart size={20} />
          <span>{cart.length} item{cart.length > 1 && "s"} in cart</span>
        </aside>
      )}
    </section>
  );
}
