import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Message from '../../components/shared/Message';
import { addToCart, removeFromCart } from '../../slices/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart data from Redux
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Handler to update quantity (We re-dispatch addToCart with new qty)
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  // Handler to remove item
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // Handler for checkout button
  const checkoutHandler = () => {
    // If logged in, go to shipping. If not, go to login then shipping.
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Tribute Pile</h1>

      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty. The Overlord is displeased. <Link to='/' className="text-purple-600 font-bold hover:underline">Go back and submit tribute.</Link>
        </Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Cart Items (Takes up 8 columns) */}
          <div className="md:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {cartItems.map((item) => (
                <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  
                  {/* Image & Name */}
                  <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <Link to={`/product/${item._id}`} className="font-bold text-gray-800 hover:text-purple-600">
                      {item.name}
                    </Link>
                  </div>

                  {/* Price */}
                  <div className="font-semibold text-gray-700 w-full sm:w-auto mt-2 sm:mt-0 sm:ml-4">
                    ${item.price}
                  </div>

                  {/* Controls Wrapper */}
                  <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0 justify-between sm:justify-end">
                    
                    {/* Qty Selector */}
                    <select
                      className="border rounded p-2 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].slice(0, 10).map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>

                    {/* Delete Button */}
                    <button
                      type='button'
                      className="text-red-500 hover:text-red-700 p-2 transition-colors"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Summary Card (Takes up 4 columns) */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                Order Summary
              </h2>
              
              <div className="flex justify-between items-center mb-4 text-gray-600">
                <span>Total Items:</span>
                <span className="font-semibold">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              </div>

              <div className="flex justify-between items-center mb-6 text-2xl font-bold text-gray-900">
                <span>Subtotal:</span>
                <span>
                  ${cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </span>
              </div>

              <button
                type='button'
                className={`w-full py-3 rounded-lg font-bold text-purple-950 transition-all shadow-md 
                  ${cartItems.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-400 hover:shadow-lg'}`}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartPage;