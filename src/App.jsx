import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FoodDetail from './pages/FoodDetail';
import Cart from './pages/Cart';

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home setCartCount={setCartCount} />} />
          <Route path="/detail/:id" element={<FoodDetail setCartCount={setCartCount} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;