import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 flex flex-col hover:shadow-2xl transition-shadow cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">${product.price}</p>
      <button
        onClick={(e) => {
          e.stopPropagation(); // ป้องกัน navigate เมื่อกดปุ่ม
          onAddToCart(product);
        }}
        className="mt-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
