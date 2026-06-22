function FoodCard({ meal, onAddToCart, onClick }) {
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{meal.strMeal}</h3>
        <p className="text-gray-500 text-sm mb-3">{meal.strCategory}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">Rp 25.000</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(meal);
            }}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;