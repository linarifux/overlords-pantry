import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../../slices/ordersApiSlice';
import { clearCartItems } from '../../slices/cartSlice';
import CheckoutSteps from '../../components/shared/CheckoutSteps';
import Message from '../../components/shared/Message';
import Loader from '../../components/shared/Loader';
import { FaShippingFast, FaCreditCard, FaBoxOpen, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`); 
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      
      {/* Steps: All steps active/completed up to 4 */}
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN (Details) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Shipping Info */}
          <div className="bg-[#1a1025] p-8 rounded-[2rem] shadow-xl border border-white/5 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
              <div className="p-3 bg-purple-900/30 rounded-xl text-amber-400 border border-purple-500/20">
                <FaMapMarkerAlt size={20} />
              </div>
              <h2 className="text-xl font-black text-white tracking-wide">Delivery Coordinates</h2>
            </div>
            <p className="text-gray-300 ml-2">
              <span className="text-purple-400 font-bold uppercase text-xs tracking-wider block mb-1">Destination:</span>
              <span className="text-lg">
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </span>
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-[#1a1025] p-8 rounded-[2rem] shadow-xl border border-white/5">
            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
              <div className="p-3 bg-purple-900/30 rounded-xl text-amber-400 border border-purple-500/20">
                 <FaCreditCard size={20} />
              </div>
              <h2 className="text-xl font-black text-white tracking-wide">Method of Offering</h2>
            </div>
            <p className="text-gray-300 ml-2">
              <span className="text-purple-400 font-bold uppercase text-xs tracking-wider block mb-1">Selected Method:</span>
              <span className="text-lg font-bold text-white">{cart.paymentMethod}</span>
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-[#1a1025] p-8 rounded-[2rem] shadow-xl border border-white/5">
            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
              <div className="p-3 bg-purple-900/30 rounded-xl text-amber-400 border border-purple-500/20">
                <FaBoxOpen size={20} />
              </div>
              <h2 className="text-xl font-black text-white tracking-wide">The Hoard</h2>
            </div>
            
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <div className="divide-y divide-white/5">
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-4 hover:bg-white/5 transition-colors px-2 rounded-lg -mx-2">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-white/10" />
                      <Link to={`/product/${item._id}`} className="font-bold text-white hover:text-amber-400 transition-colors">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-gray-400 font-mono text-sm">
                      {item.qty} x ${item.price} = <span className="font-bold text-amber-400 text-lg ml-2">${(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN (Summary) */}
        <div className="lg:col-span-4">
          <div className="bg-[#1a1025] p-8 rounded-[2rem] shadow-2xl border border-white/5 sticky top-24">
            <h2 className="text-xl font-black text-white mb-8 text-center uppercase tracking-widest border-b border-white/10 pb-4">
              Final Ritual
            </h2>
            
            <div className="space-y-4 text-sm mb-8">
              <div className="flex justify-between text-gray-400">
                <span>Items Subtotal</span>
                <span className="text-white font-mono">${cart.itemsPrice}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Zoomies Shipping</span>
                <span className="text-white font-mono">${cart.shippingPrice}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Cat Tax</span>
                <span className="text-white font-mono">${cart.taxPrice}</span>
              </div>
              
              <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-end">
                <span className="font-bold text-gray-300 text-base">Total Tribute</span>
                <span className="text-3xl font-black text-amber-400 font-mono drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                  ${cart.totalPrice}
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-4">
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
              </div>
            )}

            <button
              type="button"
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg transform active:scale-95 flex items-center justify-center gap-2
                ${cart.cartItems.length === 0 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5' 
                  : 'bg-gradient-to-r from-amber-500 to-amber-400 text-purple-950 hover:to-white hover:shadow-amber-500/30'}`}
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              {isLoading ? <Loader /> : (
                <>
                  Submit Tribute <FaArrowRight />
                </>
              )}
            </button>
            
            <p className="text-xs text-center text-purple-300/40 mt-4">
              By clicking above, you surrender all rights to the box this comes in.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlaceOrderPage;