import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../../slices/cartSlice';
import CheckoutSteps from '../../components/shared/CheckoutSteps';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      
      {/* Steps: Sign In (Done), Shipping (Done), Payment (Active) */}
      <CheckoutSteps step1 step2 step3 />

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-4">
            <FaCreditCard size={20} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">How will you pay tribute?</h1>
          <p className="text-gray-500 mt-2">Select your method of offering.</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          
          <legend className="text-lg font-medium text-gray-900 mb-4">Select Method</legend>

          {/* Option 1: PayPal */}
          <div 
            className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
              paymentMethod === 'PayPal' 
                ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' 
                : 'border-gray-200 hover:border-purple-200'
            }`}
            onClick={() => setPaymentMethod('PayPal')}
          >
            <input
              type="radio"
              className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="ml-3 flex items-center gap-2">
              <FaPaypal className="text-blue-600 text-xl" />
              <span className="font-bold text-gray-800">PayPal or Credit Card</span>
            </div>
          </div>

          {/* Option 2: Stripe (Visual only for now) */}
          <div 
            className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
              paymentMethod === 'Stripe' 
                ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' 
                : 'border-gray-200 hover:border-purple-200'
            }`}
            onClick={() => setPaymentMethod('Stripe')}
          >
            <input
              type="radio"
              className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="ml-3 flex items-center gap-2">
              <FaCreditCard className="text-indigo-600 text-xl" />
              <span className="font-bold text-gray-800">Stripe / Debit Card</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 text-purple-950 font-bold py-3 px-4 rounded-lg hover:bg-amber-400 hover:shadow-lg transition-all transform hover:-translate-y-0.5 mt-8"
          >
            Continue to Final Review
          </button>

        </form>
      </div>
    </div>
  );
};

export default PaymentPage;