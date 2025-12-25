import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useDispatch } from 'react-redux'; // Added useDispatch
import { useGetProductDetailsQuery } from '../../slices/productsApiSlice';
import { addToCart } from '../../slices/cartSlice'; // Added addToCart action
import Loader from '../../components/shared/Loader';
import Message from '../../components/shared/Message';

const ProductPage = () => {
  const { id: productId } = useParams();
  
  const dispatch = useDispatch(); // Hook to fire actions
  const navigate = useNavigate(); // Hook to move pages

  const [qty, setQty] = useState(1);

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    // 1. Dispatch the action to Redux
    dispatch(addToCart({ ...product, qty }));
    
    // 2. Redirect to Cart Page
    navigate('/cart');
  };

  return (
    <>
      <Link className='btn btn-light my-3 text-gray-600 hover:text-gray-900' to='/'>
        &larr; Retreat to Safety
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          
          {/* Column 1: Image */}
          <div className='md:col-span-2'>
            <img
              src={product.image}
              alt={product.name}
              className='w-full rounded-lg shadow-lg hover:opacity-95 transition-opacity'
            />
          </div>

          {/* Column 2: Details */}
          <div className='md:col-span-1 flex flex-col gap-4'>
            <h3 className='text-2xl font-bold text-gray-800'>{product.name}</h3>
            
            <div className='border-b border-gray-200 pb-2'>
              <span className='text-amber-500 font-bold'>
                {product.rating} Stars
              </span> 
              <span className='text-gray-500 text-sm ml-2'>
                (from {product.numReviews} loyal servants)
              </span>
            </div>

            <p className='text-xl font-semibold text-gray-900'>Price: ${product.price}</p>
            
            <p className='text-gray-600 leading-relaxed'>
              <span className='font-bold block mb-1'>Overlord's Decree:</span>
              {product.description}
            </p>
          </div>

          {/* Column 3: Buy Box */}
          <div className='md:col-span-1'>
            <div className='border border-gray-200 rounded-lg shadow-md p-4 bg-white'>
              
              <div className='flex justify-between border-b border-gray-100 pb-2 mb-2'>
                <span className='text-gray-600'>Cost:</span>
                <span className='font-bold'>${product.price}</span>
              </div>

              <div className='flex justify-between border-b border-gray-100 pb-2 mb-2'>
                <span className='text-gray-600'>Status:</span>
                <span className={`font-bold ${product.countInStock > 0 ? 'text-teal-600' : 'text-red-600'}`}>
                  {product.countInStock > 0 ? 'Ready to Ship' : 'The Void has Consumed It'}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className='flex justify-between items-center border-b border-gray-100 pb-2 mb-4'>
                  <span className='text-gray-600'>Tribute Size:</span>
                  <select
                    className='border rounded p-1 bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500'
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].slice(0, 10).map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                className={`w-full py-2 px-4 rounded font-bold transition-colors duration-200 shadow-md
                  ${product.countInStock === 0 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-amber-500 hover:bg-amber-600 text-purple-950'}`}
                type='button'
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                {product.countInStock === 0 ? 'Out of Stock' : 'Add to Tribute Pile'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;