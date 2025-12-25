import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../../slices/cartSlice';
import CheckoutSteps from '../../components/shared/CheckoutSteps';
import { FaTruck } from 'react-icons/fa';

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // Initialize state with existing data or empty string
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    // 1. Save to Redux/Local Storage
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    // 2. Move to next step
    navigate('/payment');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      
      {/* Progress Bar: Step 1 (Done) and Step 2 (Active) */}
      <CheckoutSteps step1 step2 />

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-4">
            <FaTruck size={20} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Where are we sending the tribute?</h1>
          <p className="text-gray-500 mt-2">Enter the coordinates for the Zoomies Delivery.</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              placeholder="123 Catnip Lane"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              placeholder="Meowtown"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Postal Code & Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                placeholder="12345"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                placeholder="United Kingdom of Cats"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 text-purple-950 font-bold py-3 px-4 rounded-lg hover:bg-amber-400 hover:shadow-lg transition-all transform hover:-translate-y-0.5 mt-4"
          >
            Continue to Payment
          </button>

        </form>
      </div>
    </div>
  );
};

export default ShippingPage;