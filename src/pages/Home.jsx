import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FoodCard from '../components/FoodCard';
import { searchMeals, addToCart } from '../services/api';

function Home({ setCartCount }) {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    searchMeals(query)
      .then(res => setMeals(res.data.meals || []))
      .catch(() => setError('Gagal memuat data'))
      .finally(() => setLoading(false));
  }, [query]);

  const handleAddToCart = async (meal) => {
    try {
      await addToCart({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        price: 25000,
      });
      setCartCount(prev => prev + 1);
      alert(`${meal.strMeal} ditambahkan ke keranjang!`);
    } catch (err) {
      alert('Gagal menambahkan ke keranjang');
    }
  };

  return (
    <main className="flex-1 container mx-auto px-4 pb-8">
      <SearchBar query={query} onSearch={setQuery} />
      {loading && (
        <p className="text-center text-gray-500 mt-10">⏳ Sedang memuat...</p>
      )}
      {error && (
        <p className="text-center text-red-500 mt-10">{error}</p>
      )}
      {!loading && !error && meals.length === 0 && (
        <p className="text-center text-gray-500 mt-10">Makanan tidak ditemukan</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {meals.map(meal => (
          <FoodCard
            key={meal.idMeal}
            meal={meal}
            onAddToCart={handleAddToCart}
            onClick={() => navigate(`/detail/${meal.idMeal}`)}
          />
        ))}
      </div>
    </main>
  );
}

export default Home;