import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMealDetail, addToCart } from '../services/api';

function FoodDetail({ setCartCount }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealDetail(id)
      .then(res => setMeal(res.data.meals[0]))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
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

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  if (loading) return (
    <div className="text-center mt-20 text-gray-500">⏳ Sedang memuat...</div>
  );

  if (!meal) return (
    <div className="text-center mt-20 text-red-500">Makanan tidak ditemukan</div>
  );

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        Kembali
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-72 object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold">{meal.strMeal}</h1>
              <p className="text-gray-500">{meal.strCategory} • {meal.strArea}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">Rp 25.000</p>
              <button
                onClick={handleAddToCart}
                className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                + Keranjang
              </button>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-6 mb-3">Bahan-bahan</h2>
          <ul className="grid grid-cols-2 gap-2">
            {getIngredients(meal).map((item, index) => (
              <li key={index} className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                {item}
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3">Cara Memasak</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {meal.strInstructions}
          </p>
        </div>
      </div>
    </main>
  );
}

export default FoodDetail;