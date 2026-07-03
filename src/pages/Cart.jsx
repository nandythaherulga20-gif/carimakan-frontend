import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, removeFromCart, clearCart } from '../services/api';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCart()
      .then(res => setCart(res.data.cart))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    setCart(prev => prev.filter(item => item.idMeal !== id));
  };

  const handleClear = async () => {
    await clearCart();
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) return (
    <div className="text-center mt-20 text-gray-500">⏳ Sedang memuat...</div>
  );

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        Kembali
      </button>

      <h1 className="text-2xl font-bold mb-6">🛒 Keranjang Belanja</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>Keranjang kosong</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Mulai Belanja
          </button>
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.idMeal} className="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-4">
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-bold">{item.strMeal}</h3>
                <p className="text-blue-600">Rp {item.price.toLocaleString()}</p>
                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemove(item.idMeal)}
                className="text-red-500 hover:text-red-700"
              >
                Hapus
              </button>
            </div>
          ))}

          <div className="bg-white rounded-xl shadow p-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Total:</span>
              <span className="text-blue-600 font-bold text-xl">
                Rp {total.toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleClear}
              className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Kosongkan Keranjang
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;