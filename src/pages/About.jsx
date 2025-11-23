import React from 'react';
import { FaStore, FaStar, FaBolt, FaShippingFast, FaSmile } from 'react-icons/fa';

const shoppingBg = '/src/assets/banner1.jpg'; // Use your shopping-related image here

const About = () => {
  return (
    <div className="min-h-screen py-16 flex items-center justify-center relative overflow-hidden" style={{background: `linear-gradient(120deg, rgba(255,0,0,0.08), rgba(0,0,0,0.12)), url(${shoppingBg}) center/cover no-repeat`}}>
      {/* Animated floating shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-80 h-80 bg-red-600 opacity-30 rounded-full blur-3xl absolute -top-24 -left-24 animate-pulse"></div>
        <div className="w-60 h-60 bg-black opacity-30 rounded-full blur-2xl absolute -bottom-16 -right-16 animate-pulse"></div>
        <div className="w-32 h-32 bg-red-400 opacity-20 rounded-full blur-xl absolute top-1/2 left-1/4 animate-bounce"></div>
      </div>
      <div className="max-w-3xl w-full mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl px-10 py-12 border-2 border-red-600 relative z-10">
        <h1 className="text-4xl font-extrabold mb-8 text-red-600 text-center tracking-tight drop-shadow-lg flex items-center justify-center gap-3">
          <FaStore className="text-4xl" /> About Zaptro
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Welcome to <span className="font-bold text-red-600">Zaptro</span>, your one-stop destination for a seamless online shopping experience! At Zaptro, we bring you a wide range of high-quality products, from electronics and fashion to home essentials and more. Our mission is to make shopping easy, enjoyable, and affordable for everyone.
        </p>
        <p className="text-md text-gray-600 mb-8 text-center">
          Zaptro is designed with user convenience in mind, offering intuitive navigation, secure payment options, and fast delivery. We are committed to providing excellent customer service and ensuring that every purchase meets your expectations.
        </p>
        <ul className="list-none pl-0 text-gray-700 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <li className="flex items-center gap-3 bg-red-50 rounded-xl p-4 shadow"><FaStar className="text-red-400" /> <span className="font-semibold">Wide selection of products</span></li>
          <li className="flex items-center gap-3 bg-red-50 rounded-xl p-4 shadow"><FaBolt className="text-red-400" /> <span className="font-semibold">Exclusive deals and discounts</span></li>
          <li className="flex items-center gap-3 bg-red-50 rounded-xl p-4 shadow"><FaSmile className="text-red-400" /> <span className="font-semibold">Safe and secure checkout</span></li>
          <li className="flex items-center gap-3 bg-red-50 rounded-xl p-4 shadow"><FaShippingFast className="text-red-400" /> <span className="font-semibold">Fast and reliable shipping</span></li>
        </ul>
        <p className="text-md text-gray-700 text-center">
          <span className="font-semibold text-red-700">Thank you for choosing Zaptro.</span> We look forward to serving you and making your shopping experience truly exceptional!
        </p>
      </div>
    </div>
  );
};

export default About;