function Header({ cartCount = 0 }) {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🍽️ CariMakan</h1>
        <div className="bg-white text-blue-600 px-3 py-1 rounded-full font-semibold">
          🛒 {cartCount}
        </div>
      </div>
    </header>
  );
}

export default Header;