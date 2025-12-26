import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../../slices/cartSlice';
import CheckoutSteps from '../../components/shared/CheckoutSteps';
import { FaCreditCard, FaPaypal, FaWallet, FaArrowRight } from 'react-icons/fa';

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
    <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
      
      {/* Steps: Sign In (Done), Shipping (Done), Payment (Active) */}
      <CheckoutSteps step1 step2 step3 />

      <div className="bg-[#1a1025] p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/5 relative overflow-hidden group">
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -z-10 group-hover:bg-purple-600/20 transition-all duration-700"></div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0f0716] border border-white/10 text-amber-400 rounded-2xl mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <FaWallet size={28} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Select Tribute Method
          </h1>
          <p className="text-purple-300/60 mt-2 font-medium">
            How shall you transfer your wealth to the Overlord?
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          
          {/* Option 1: PayPal */}
          <label 
            className={`relative flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 group/item ${
              paymentMethod === 'PayPal' 
                ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.15)]' 
                : 'border-white/10 bg-[#0f0716] hover:border-purple-500/50 hover:bg-white/5'
            }`}
          >
            <input
              type="radio"
              className="hidden"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            
            {/* Custom Radio Circle */}
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-5 transition-colors ${
               paymentMethod === 'PayPal' ? 'border-amber-400' : 'border-gray-600 group-hover/item:border-purple-400'
            }`}>
              {paymentMethod === 'PayPal' && <div className="w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>}
            </div>

            <div className="flex-1 flex items-center justify-between">
              <span className={`font-bold text-lg ${paymentMethod === 'PayPal' ? 'text-white' : 'text-gray-400 group-hover/item:text-white'}`}>
                PayPal / Credit Card
              </span>
              <FaPaypal className={`text-2xl transition-colors ${paymentMethod === 'PayPal' ? 'text-[#003087]' : 'text-gray-600'}`} />
            </div>
          </label>

          {/* Option 2: Stripe */}
          <label 
            className={`relative flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 group/item ${
              paymentMethod === 'Stripe' 
                ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.15)]' 
                : 'border-white/10 bg-[#0f0716] hover:border-purple-500/50 hover:bg-white/5'
            }`}
          >
            <input
              type="radio"
              className="hidden"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
             
            {/* Custom Radio Circle */}
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-5 transition-colors ${
               paymentMethod === 'Stripe' ? 'border-amber-400' : 'border-gray-600 group-hover/item:border-purple-400'
            }`}>
              {paymentMethod === 'Stripe' && <div className="w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>}
            </div>

            <div className="flex-1 flex items-center justify-between">
              <span className={`font-bold text-lg ${paymentMethod === 'Stripe' ? 'text-white' : 'text-gray-400 group-hover/item:text-white'}`}>
                Stripe / Debit Card
              </span>
              <FaCreditCard className={`text-2xl transition-colors ${paymentMethod === 'Stripe' ? 'text-indigo-400' : 'text-gray-600'}`} />
            </div>
          </label>

          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-amber-500 to-amber-400 text-purple-950 font-black py-4 px-6 rounded-xl hover:to-white hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
          >
            Continue to Final Ritual <FaArrowRight />
          </button>

        </form>
      </div>
    </div>
  );
};

export default PaymentPage;