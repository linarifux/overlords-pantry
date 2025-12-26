import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../../slices/productsApiSlice';
import { addToCart } from '../../slices/cartSlice';
import Loader from '../../components/shared/Loader';
import Message from '../../components/shared/Message';
import { 
  FaArrowLeft, 
  FaShoppingCart, 
  FaStar, 
  FaBoxOpen, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaShieldAlt 
} from 'react-icons/fa';

const ProductPage = () => {
  const { id: productId } = useParams();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      
      {/* Back Button */}
      <Link to='/' className='inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors mb-8 font-bold tracking-wide group w-fit'>
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Retreat to Safety
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12'>
          
          {/* COLUMN 1: IMAGE (5 cols) */}
          <div className='lg:col-span-5'>
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 group bg-[#0f0716]">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-purple-500/10 blur-xl group-hover:bg-purple-500/20 transition-all duration-700"></div>
              
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-auto object-cover relative z-10 transform transition-transform duration-700 group-hover:scale-105'
              />
              
              {/* Badge */}
              {product.countInStock === 0 && (
                <div className="absolute top-6 left-6 z-20 bg-red-600 text-white text-xs font-black px-3 py-1 rounded shadow-lg uppercase tracking-widest -rotate-6">
                  Devoured
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 2: DETAILS (4 cols) */}
          <div className='lg:col-span-4 flex flex-col gap-6'>
            <div>
              <h1 className='text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-2'>
                {product.name}
              </h1>
              <div className='flex items-center gap-2 text-sm'>
                <div className="flex text-amber-400">
                   {[...Array(5)].map((_, i) => (
                     <FaStar key={i} className={i < Math.round(product.rating) ? "text-amber-400" : "text-gray-600"} />
                   ))}
                </div>
                <span className='text-purple-300 font-medium'>
                  {product.rating} ({product.numReviews} loyal servants)
                </span>
              </div>
            </div>

            <div className="h-px bg-white/10 w-full"></div>

            <div className="space-y-2">
              <span className='text-purple-400 font-bold uppercase text-xs tracking-wider'>Bribe Value</span>
              <p className='text-4xl font-black text-white font-mono flex items-start gap-1'>
                <span className="text-xl mt-1 text-gray-500">$</span>{product.price}
              </p>
            </div>

            <div className="space-y-2">
              <span className='text-purple-400 font-bold uppercase text-xs tracking-wider'>Overlord's Decree</span>
              <p className='text-gray-300 leading-relaxed text-lg'>
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto">
              <FaShieldAlt /> Authentic Tribute • 100% Cat Approved
            </div>
          </div>

          {/* COLUMN 3: ACTION PANEL (3 cols) */}
          <div className='lg:col-span-3'>
            <div className='bg-[#1a1025] rounded-[2rem] border border-white/10 shadow-2xl p-6 sticky top-24'>
              
              <div className="space-y-4 mb-6">
                <div className='flex justify-between items-center border-b border-white/5 pb-3'>
                  <span className='text-gray-400 font-medium'>Price</span>
                  <span className='font-bold text-white text-xl'>${product.price}</span>
                </div>

                <div className='flex justify-between items-center border-b border-white/5 pb-3'>
                  <span className='text-gray-400 font-medium'>Status</span>
                  <span className={`font-bold flex items-center gap-2 ${product.countInStock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {product.countInStock > 0 ? <FaCheckCircle /> : <FaTimesCircle />}
                    {product.countInStock > 0 ? 'Ready to Ship' : 'Consumed'}
                  </span>
                </div>

                {product.countInStock > 0 && (
                  <div className='space-y-2 pt-2'>
                    <span className='text-gray-400 font-medium text-sm block'>Tribute Quantity</span>
                    <div className="relative">
                      <select
                        className='w-full appearance-none bg-[#0f0716] border border-white/10 text-white rounded-xl py-3 pl-4 pr-8 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 cursor-pointer font-bold'
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].slice(0, 10).map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1} Units
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-amber-400">
                        <FaBoxOpen />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                className={`w-full py-4 px-6 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg transform active:scale-95 flex items-center justify-center gap-2
                  ${product.countInStock === 0 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5' 
                    : 'bg-gradient-to-r from-amber-500 to-amber-400 text-purple-950 hover:to-white hover:shadow-amber-500/40'}`}
                type='button'
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                {product.countInStock === 0 ? (
                  'Out of Stock' 
                ) : (
                  <>
                    <FaShoppingCart /> Add to Pile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;