import { useNavigate } from 'react-router-dom';

function Header({ cartCount = 0 }) {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          🍽️ CariMakan
        </h1>
        <button
          onClick={() => navigate('/cart')}
          className="bg-white text-blue-600 px-3 py-1 rounded-full font-semibold hover:bg-gray-100"
        >
          🛒 {cartCount}
        </button>
      </div>
    </header>
  );
}

export default Header;