import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../../slices/productsApiSlice';
import Loader from '../shared/Loader';
import Message from '../shared/Message';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [current, setCurrent] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    // Only set interval if we have products
    if (!products || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    // Cleanup interval on unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, [products]);

  // Manual Navigation Handlers
  const nextSlide = () => {
    setCurrent(current === products.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? products.length - 1 : current - 1);
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    // FIX: Used explicit heights h-[300px] to prevent collapse
    // COLOR: bg-purple-950 for the "Royal Void" background
    <div className='relative w-full h-75 md:h-100 bg-purple-950 overflow-hidden mb-10 rounded-xl shadow-2xl group border border-purple-900'>
      
      {/* The Sliding Container */}
      <div 
        className='flex transition-transform duration-700 ease-in-out h-full'
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {products.map((product) => (
          <div key={product._id} className='min-w-full h-full relative flex items-center justify-center bg-purple-900'>
            
            <Link to={`/product/${product._id}`} className="flex flex-col md:flex-row items-center justify-center w-full h-full p-4 md:p-0">
              
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-full flex justify-center items-center p-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  // FIX: Standardized height classes
                  className='max-h-50 md:max-h-75 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]' 
                />
              </div>

              {/* Text/Caption Section */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 md:static md:bg-transparent md:backdrop-blur-none md:w-1/2 md:flex md:flex-col md:items-start md:justify-center md:pl-10">
                <h2 className='text-2xl md:text-4xl font-bold text-white mb-2 truncate max-w-full'>
                  {product.name}
                </h2>
                
                {/* COLOR: Amber text for price/action */}
                <p className='text-xl text-amber-400 font-bold mb-2'>
                  ${product.price}
                </p>
                
                <p className='text-purple-200 hidden md:block text-sm max-w-sm'>
                   {product.description.substring(0, 100)}...
                </p>
                
                {/* COLOR: Amber Button with Purple Text (High Contrast) */}
                <span className="mt-4 px-6 py-2 bg-amber-500 text-purple-950 rounded-full text-sm font-extrabold hidden md:inline-block hover:bg-amber-400 transition-colors shadow-lg hover:shadow-amber-500/20">
                  View Tribute
                </span>
              </div>

            </Link>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button 
        onClick={prevSlide}
        className='absolute top-1/2 left-4 -translate-y-1/2 bg-purple-950/50 text-white p-3 rounded-full hover:bg-amber-500 hover:text-purple-900 transition-all opacity-0 group-hover:opacity-100 z-10'
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button 
        onClick={nextSlide}
        className='absolute top-1/2 right-4 -translate-y-1/2 bg-purple-950/50 text-white p-3 rounded-full hover:bg-amber-500 hover:text-purple-900 transition-all opacity-0 group-hover:opacity-100 z-10'
      >
        <FaChevronRight size={20} />
      </button>

      {/* Bottom Indicators (Dots) */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
        {products.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            // COLOR: Active dot is Amber
            className={`w-3 h-3 rounded-full cursor-pointer transition-all border border-white/50 ${
              current === index ? 'bg-amber-500 scale-125 border-amber-500' : 'bg-transparent hover:bg-white/20'
            }`}
          ></div>
        ))}
      </div>

    </div>
  );
};

export default ProductCarousel;