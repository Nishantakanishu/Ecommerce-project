import React, { useState, useContext } from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { DataContext } from '../context/data-context.js';

const ProductCard = ({product}) => {
  const { addToCart, removeFromCart, cart } = useContext(DataContext);
  const [added, setAdded] = useState(false);
  const cartItem = cart.find(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product);
  };

  return (
    <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-[350px] w-full flex flex-col justify-between'>
        <img src={product.image} alt="" className='bg-gray-100 aspect-square object-cover w-full h-[180px] rounded-xl'/>
        <h1 className='line-clamp-2 p-1 font-semibold'>{product.title}</h1>
        <p className='my-1 text-lg text-gray-800 font-bold'>${cartItem ? (product.price * cartItem.quantity).toFixed(2) : product.price}</p>
        <div className="flex gap-2">
          <button 
            className={`bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold transition-all ${added ? 'bg-green-600' : ''}`}
            onClick={handleAddToCart}
          >
            <IoCartOutline className='w-6 h-6'/>
            {added ? 'Added to Cart' : 'Add to Cart'}
            {cartItem && <span className="ml-2 bg-black text-white px-2 py-1 rounded-full text-xs">+{cartItem.quantity}</span>}
          </button>
          {cartItem && cartItem.quantity > 0 && (
            <button 
              className="bg-black px-3 py-2 text-lg rounded-md text-white flex items-center font-semibold"
              onClick={handleRemoveFromCart}
            >
              -1
            </button>
          )}
        </div>
    </div>
  )
}

export default ProductCard