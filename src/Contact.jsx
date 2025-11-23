import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const shoppingBg = '/src/assets/banner1.jpg'; // Use your shopping-related image here

const Contact = () => {
  return (
    <div className="min-h-screen py-16 flex items-center justify-center relative overflow-hidden" style={{background: `linear-gradient(120deg, rgba(255,0,0,0.08), rgba(0,0,0,0.12)), url(${shoppingBg}) center/cover no-repeat`}}>
      {/* Animated floating shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-80 h-80 bg-red-600 opacity-30 rounded-full blur-3xl absolute -top-24 -left-24 animate-pulse"></div>
        <div className="w-60 h-60 bg-black opacity-30 rounded-full blur-2xl absolute -bottom-16 -right-16 animate-pulse"></div>
        <div className="w-32 h-32 bg-red-400 opacity-20 rounded-full blur-xl absolute top-1/2 left-1/4 animate-bounce"></div>
      </div>
      <div className="max-w-2xl w-full mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl px-10 py-12 border-2 border-red-600 relative z-10">
        <h1 className="text-4xl font-extrabold mb-8 text-red-600 text-center tracking-tight drop-shadow-lg flex items-center justify-center gap-3">
          <FaPaperPlane className="text-4xl" /> Contact Us
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          We'd love to hear from you! Reach out to us through any of the following ways:
        </p>
        <div className="space-y-6 mb-10">
          <div className="bg-red-50 rounded-xl p-6 shadow flex items-center gap-4">
            <FaEnvelope className="text-red-600 text-2xl" />
            <span className="text-red-600 text-2xl font-bold">Email:</span>
            <a href="mailto:zaptro.support@email.com" className="text-black text-lg font-semibold underline">zaptro.support@email.com</a>
          </div>
          <div className="bg-red-50 rounded-xl p-6 shadow flex items-center gap-4">
            <FaPhoneAlt className="text-red-600 text-2xl" />
            <span className="text-red-600 text-2xl font-bold">Phone:</span>
            <a href="tel:+1234567890" className="text-black text-lg font-semibold underline">+1 234 567 890</a>
          </div>
          <div className="bg-red-50 rounded-xl p-6 shadow flex items-center gap-4">
            <FaWhatsapp className="text-red-600 text-2xl" />
            <span className="text-red-600 text-2xl font-bold">WhatsApp:</span>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-black text-lg font-semibold underline">Chat on WhatsApp</a>
          </div>
          <div className="bg-red-50 rounded-xl p-6 shadow flex items-center gap-4">
            <FaMapMarkerAlt className="text-red-600 text-2xl" />
            <span className="text-red-600 text-2xl font-bold">Address:</span>
            <span className="text-black text-lg font-semibold">123 Zaptro Lane, E-Shop City, Country</span>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-md text-gray-700 mb-4">Or fill out our contact form below and we'll get back to you soon:</p>
          <form className="mt-6 space-y-4">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-red-500 shadow" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-red-500 shadow" />
            <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-red-500 shadow" />
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center gap-2 justify-center">
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;