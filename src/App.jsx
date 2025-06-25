// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './components/Home';
import './App.css';
import Shop from './components/Shop';
import Categories from './components/Categories';
import AboutUs from './components/About_us';
import Customer_feedback from './components/Customer_feedback';
import Features from './components/Features';
import Contact from './components/Contact';
import Header from './components/Header';
import CategoryPage from "./components/Category_page";
import Fruits from "./data/Fruits";
import Vegetables from "./data/Vegetable";
import Cart from './components/Cart';
import AboutDetail from './components/About_detail';
import SignIn from './components/Sign_in';
import SignUp from './components/Sign_up';
import BuyerDetails from './components/Buyer_details';
import AdminOrders from './components/Admin_orders';
import MyOrders from './components/My_order';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const incQty = (item) => {
    setCart((prev) =>
      prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p))
    );
  };

  const decQty = (item) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, qty: Math.max(1, p.qty - 1) } : p
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Router>
      <Header cartCount={cartCount} setShowCart={setShowCart} />

      <Routes>
        <Route path="/" element={
          <main>
            <section id="home"><Home /></section>
            <Features />
            <section id="shop"><Shop /></section>
            <section id="categories"><Categories /></section>
            <section id="about"><AboutUs /></section>
            <section id="feedback"><Customer_feedback /></section>
            <section id="contact"><Contact /></section>
          </main>
        } />
        <Route path="/about_detail" element={<AboutDetail />} />
        <Route path="/buyer-details" element={<BuyerDetails setCart={setCart} />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route path="/my-orders" element={<MyOrders />} />

        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}


        <Route path="/fruits" element={
          <CategoryPage
            title="Fruits"
            cart={cart}
            setCart={setCart}
            defaultCategory="fruits"
          />
        } />
        <Route path="/vegetables" element={
          <CategoryPage
            title="Vegetables"
            cart={cart}
            setCart={setCart}
            defaultCategory="vegetables"
          />
        } />
          <Route path="/species" element={
          <CategoryPage
            title="Species"
            cart={cart}
            setCart={setCart}
            defaultCategory="species"
          />
        } />
          <Route path="/nuts" element={
          <CategoryPage
            title="Nuts"
            cart={cart}
            setCart={setCart}
            defaultCategory="nuts"
          />
        } />
        {/* ✅ Add the missing generic route */}
        <Route path="/category" element={
          <CategoryPage
            title="All Categories"
            cart={cart}
            setCart={setCart}
          />
        } />
        <Route path="/cart" element={
          <Cart
            cart={cart}
            setCart={setCart}
            incQty={incQty}
            decQty={decQty}
            removeItem={removeItem}
            setShowCart={setShowCart}
          />
        } />
      </Routes>
    </Router>
  );
}

export default App;
