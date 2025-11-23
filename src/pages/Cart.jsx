import React, { useContext, useState } from 'react';
import { DataContext } from '../context/data-context.js';
import { FaShoppingCart, FaTag, FaShippingFast, FaCheckCircle, FaTimesCircle, FaCreditCard } from 'react-icons/fa';

const COUPONS = {
  ZAP10: { type: 'percent', value: 10, label: '10% Off' },
  FREESHIP: { type: 'shipping', value: 0, label: 'Free Shipping' },
};
const SHIPPING_COST = 49;

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useContext(DataContext);
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;
  let shipping = SHIPPING_COST;

  if (appliedCoupon) {
    if (COUPONS[appliedCoupon]?.type === 'percent') {
      discount = subtotal * (COUPONS[appliedCoupon].value / 100);
    }
    if (COUPONS[appliedCoupon]?.type === 'shipping') {
      shipping = 0;
    }
  }
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponMsg(`Coupon applied: ${COUPONS[code].label}`);
    } else {
      setCouponMsg('Invalid coupon code.');
    }
  };

  const handlePayment = () => {
    setShowPayment(true);
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 2000);
  };

  const closeModal = () => {
    setShowPayment(false);
    setPaymentSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-black to-red-900 py-16 flex items-center justify-center relative overflow-hidden">
      {/* Animated floating shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-96 h-96 bg-red-600 opacity-30 rounded-full blur-3xl absolute -top-32 -left-32 animate-pulse"></div>
        <div className="w-72 h-72 bg-black opacity-30 rounded-full blur-2xl absolute -bottom-24 -right-24 animate-pulse"></div>
        <div className="w-40 h-40 bg-red-400 opacity-20 rounded-full blur-xl absolute top-1/2 left-1/4 animate-bounce"></div>
      </div>
      <div className="max-w-4xl w-full mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl px-10 py-12 border-2 border-red-600 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-10">
          <FaShoppingCart className="text-4xl text-red-600 drop-shadow-lg" />
          <h1 className="text-4xl font-extrabold text-red-600 text-center tracking-tight drop-shadow-lg">Your Cart</h1>
        </div>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <img src="/src/assets/empty-cart.png" alt="Empty Cart" className="w-40 h-40 mb-6 opacity-80" />
            <div className="text-center text-gray-500 text-xl">Your cart is empty.<br/>Start shopping to fill it up!</div>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200 relative z-10">
              {cart.map(item => (
                <div key={item.id} className="flex items-center py-8 gap-8 hover:bg-red-50 rounded-xl transition-all shadow-md bg-white/90">
                  <img src={item.image} alt={item.title} className="w-28 h-28 object-cover rounded-2xl border-2 border-red-200 shadow-lg" />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-black mb-2 flex items-center gap-2">
                      <FaTag className="text-red-400" /> {item.title}
                    </h2>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-extrabold text-red-600">${(item.price * item.quantity).toFixed(2)}</span>
                      <span className="text-xs text-gray-500">({item.quantity}x)</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="bg-black text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-800 transition-all flex items-center gap-1"
                        onClick={() => removeFromCart(item)}
                      >
                        <FaTimesCircle className="text-lg" /> -1
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition-all flex items-center gap-1"
                        onClick={() => addToCart(item)}
                      >
                        <FaCheckCircle className="text-lg" /> +1
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form className="mt-10 flex flex-col items-end gap-4 relative z-10" onSubmit={handleApplyCoupon}>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-red-500 text-lg shadow"
                />
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center gap-2">
                  <FaTag /> Apply
                </button>
              </div>
              {couponMsg && (
                <span className={`text-md font-semibold flex items-center gap-2 ${appliedCoupon ? 'text-green-600' : 'text-red-600'}`}>{appliedCoupon ? <FaCheckCircle /> : <FaTimesCircle />}{couponMsg}</span>
              )}
            </form>
            <div className="mt-10 flex flex-col items-end relative z-10">
              <div className="bg-black/80 text-white px-8 py-4 rounded-2xl shadow-lg text-xl font-bold mb-4 flex flex-col gap-2 w-full max-w-md backdrop-blur">
                <div className="flex justify-between items-center">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Discount:</span>
                  <span className="text-red-400">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><FaShippingFast /> Shipping:</span>
                  <span>{shipping === 0 ? <span className="text-green-400">Free</span> : `$${SHIPPING_COST}`}</span>
                </div>
                <div className="flex justify-between items-center text-2xl mt-2">
                  <span>Total:</span>
                  <span className="text-red-400">${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-extrabold text-xl shadow-xl transition-all tracking-wide mt-2 flex items-center gap-2" onClick={handlePayment}>
                <FaCreditCard className="text-2xl" /> Make Payment
              </button>
            </div>
            {/* Fake Payment Modal */}
            {showPayment && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center relative">
                  {!paymentSuccess ? (
                    <>
                      <FaCreditCard className="text-5xl text-red-600 mb-4 animate-pulse" />
                      <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-gray-600">Please wait while we process your order.</p>
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="text-5xl text-green-500 mb-4 animate-bounce" />
                      <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
                      <p className="text-gray-700 mb-4">Thank you for shopping with Zaptro.<br/>Your order has been placed.</p>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-bold text-lg shadow-lg transition-all" onClick={closeModal}>Continue Shopping</button>
                    </>
                  )}
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-2xl" onClick={closeModal}>&times;</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;