import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaShoppingCart, FaArrowRight, FaGem } from 'react-icons/fa';
import Message from '../../components/shared/Message';
import { addToCart, removeFromCart } from '../../slices/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="container mx-auto px-4 py-12 relative z-10">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-purple-900/30 rounded-xl text-amber-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <FaShoppingCart size={24} />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Your Tribute <span className="text-purple-400">Pile</span>
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-[#1a1025] border border-white/5 rounded-[2rem] p-12 text-center shadow-2xl">
          <div className="inline-block p-6 rounded-full bg-white/5 mb-6 text-gray-500">
             <FaShoppingCart size={48} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">The Hoard is Empty</h2>
          <p className="text-purple-300/60 mb-8 max-w-md mx-auto">
            The Overlord is displeased with your lack of offerings. Rectify this immediately before the 3 AM zoomies begin.
          </p>
          <Link 
            to='/' 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-900 text-white px-8 py-3 rounded-xl font-bold hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg hover:shadow-purple-500/30"
          >
            Find Tributes <FaArrowRight />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-[#1a1025] rounded-[2rem] shadow-2xl border border-white/5 overflow-hidden">
              <div className="p-6 md:p-8 space-y-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="group flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl border border-white/5 bg-[#0f0716]/50 hover:bg-[#0f0716] hover:border-purple-500/30 transition-all duration-300">
                    
                    {/* Image */}
                    <div className="relative flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl border border-white/10" />
                      <div className="absolute inset-0 bg-black/20 rounded-xl group-hover:bg-transparent transition-all"></div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left w-full">
                      <Link to={`/product/${item._id}`} className="text-lg font-bold text-white hover:text-amber-400 transition-colors line-clamp-1">
                        {item.name}
                      </Link>
                      <p className="text-sm text-purple-400/80 font-mono mt-1 mb-3 sm:mb-0">
                        Price per unit: ${item.price}
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end bg-[#1a1025] p-2 rounded-xl border border-white/5">
                      
                      {/* Custom Dark Select */}
                      <div className="relative">
                        <select
                          className="appearance-none bg-[#0f0716] text-white border border-white/10 rounded-lg py-2 pl-4 pr-8 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 cursor-pointer font-mono text-sm"
                          value={item.qty}
                          onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                        >
                          {[...Array(item.countInStock).keys()].slice(0, 10).map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        type='button'
                        className="text-gray-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-900/20 transition-all"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Summary Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#1a1025] rounded-[2rem] shadow-2xl border border-white/5 p-8 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
                <FaGem className="text-amber-400" /> Receipt Summary
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-gray-400 text-sm">
                  <span>Total Offerings:</span>
                  <span className="font-mono text-white bg-white/5 px-2 py-1 rounded">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Bribe Value:</span>
                  <span className="text-2xl font-black text-amber-400 font-mono drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                    ${cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type='button'
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg transform active:scale-95
                  ${cartItems.length === 0 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5' 
                    : 'bg-gradient-to-r from-amber-500 to-amber-400 text-purple-950 hover:to-white hover:shadow-amber-500/30'}`}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Commence Ritual (Checkout)
              </button>
              
              <p className="text-xs text-center text-purple-300/40 mt-4">
                *Satisfaction guaranteed, or we will hiss loudly.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartPage;