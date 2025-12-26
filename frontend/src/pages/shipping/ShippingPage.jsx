import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../../slices/cartSlice';
import CheckoutSteps from '../../components/shared/CheckoutSteps';
import { FaTruck, FaMapMarkerAlt, FaCity, FaGlobe, FaArrowRight, FaMapPin } from 'react-icons/fa';

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
      
      {/* Progress Bar: Step 1 (Done) and Step 2 (Active) */}
      <CheckoutSteps step1 step2 />

      <div className="bg-[#1a1025] p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/5 relative overflow-hidden group">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-[80px] -z-10 group-hover:bg-amber-600/20 transition-all duration-700"></div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0f0716] border border-white/10 text-amber-400 rounded-2xl mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <FaTruck size={28} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Delivery Coordinates
          </h1>
          <p className="text-purple-300/60 mt-2 font-medium">
            Where shall we dispatch the Zoomies Squad?
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          
          {/* Address */}
          <div className="space-y-2 group/input">
            <label className="text-gray-400 font-bold text-sm uppercase tracking-wider ml-1 group-focus-within/input:text-amber-400 transition-colors">Street Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-600 group-focus-within/input:text-amber-400 transition-colors" />
              </div>
              <input
                type="text"
                required
                className="block w-full pl-11 pr-4 py-4 bg-[#0f0716] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm font-medium shadow-inner"
                placeholder="e.g. 123 Catnip Lane"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* City */}
          <div className="space-y-2 group/input">
            <label className="text-gray-400 font-bold text-sm uppercase tracking-wider ml-1 group-focus-within/input:text-amber-400 transition-colors">City / Territory</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaCity className="text-gray-600 group-focus-within/input:text-amber-400 transition-colors" />
              </div>
              <input
                type="text"
                required
                className="block w-full pl-11 pr-4 py-4 bg-[#0f0716] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm font-medium shadow-inner"
                placeholder="e.g. Meowtown"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          {/* Postal Code & Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 group/input">
              <label className="text-gray-400 font-bold text-sm uppercase tracking-wider ml-1 group-focus-within/input:text-amber-400 transition-colors">Postal Code</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaMapPin className="text-gray-600 group-focus-within/input:text-amber-400 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-11 pr-4 py-4 bg-[#0f0716] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm font-medium shadow-inner font-mono"
                  placeholder="e.g. 12345"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2 group/input">
              <label className="text-gray-400 font-bold text-sm uppercase tracking-wider ml-1 group-focus-within/input:text-amber-400 transition-colors">Country</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaGlobe className="text-gray-600 group-focus-within/input:text-amber-400 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-11 pr-4 py-4 bg-[#0f0716] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm font-medium shadow-inner"
                  placeholder="e.g. United Kingdom"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-amber-500 to-amber-400 text-purple-950 font-black py-4 px-6 rounded-xl hover:to-white hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
          >
            Continue to Payment <FaArrowRight />
          </button>

        </form>
      </div>
    </div>
  );
};

export default ShippingPage;