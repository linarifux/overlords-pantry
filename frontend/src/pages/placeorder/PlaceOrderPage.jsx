import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../../slices/ordersApiSlice';
import { clearCartItems } from '../../slices/cartSlice';
import CheckoutSteps from '../../components/shared/CheckoutSteps';
import Message from '../../components/shared/Message';
import Loader from '../../components/shared/Loader';
import { FaShippingFast, FaCreditCard, FaBoxOpen } from 'react-icons/fa';

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
      // We will create this page next: Order Success/Details
      navigate(`/order/${res._id}`); 
    } catch (err) {
      console.error('the error is', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* All steps active */}
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN (Details) */}
        <div className="md:col-span-8 space-y-8">
          
          {/* Shipping Info */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
              <FaShippingFast className="text-purple-600 text-xl" />
              <h2 className="text-xl font-bold text-gray-800">Shipping</h2>
            </div>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">Address: </span>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
              <FaCreditCard className="text-purple-600 text-xl" />
              <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
            </div>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">Method: </span>
              {cart.paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
              <FaBoxOpen className="text-purple-600 text-xl" />
              <h2 className="text-xl font-bold text-gray-800">Order Items</h2>
            </div>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <div className="divide-y divide-gray-100">
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                      <Link to={`/product/${item._id}`} className="font-medium text-gray-800 hover:text-purple-600">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-gray-600 text-sm">
                      {item.qty} x ${item.price} = <span className="font-bold text-gray-900">${(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN (Summary) */}
        <div className="md:col-span-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Order Summary</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span>${cart.itemsPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${cart.shippingPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${cart.taxPrice}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${cart.totalPrice}</span>
              </div>
            </div>

            {error && (
              <div className="mt-4">
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
              </div>
            )}

            <button
              type="button"
              className={`w-full mt-6 py-3 rounded-xl font-bold text-purple-950 transition-all shadow-md
                ${cart.cartItems.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-400 hover:shadow-lg hover:-translate-y-0.5'}`}
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              {isLoading ? <Loader /> : 'Place Order'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlaceOrderPage;