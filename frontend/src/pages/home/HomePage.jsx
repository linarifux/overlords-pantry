import { useGetProductsQuery } from '../../slices/productsApiSlice';
import Loader from '../../components/shared/Loader';
import Message from '../../components/shared/Message';
import ProductCarousel from '../../components/product/ProductCarousel';
import HomeCategories from '../../components/home/HomeCategories';
import HomeTestimonials from '../../components/home/HomeTestimonials';
import HomeFeatured from '../../components/home/HomeFeatured'; // <-- Import NEW
import HomeFAQ from '../../components/home/HomeFAQ'; // <-- Import NEW
import { Link } from 'react-router-dom';
import { FaShippingFast, FaShieldAlt, FaCrown, FaPaperPlane, FaArrowRight, FaShoppingCart } from 'react-icons/fa';

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {/* 1. HERO */}
      <ProductCarousel />

      {/* 2. CATEGORIES */}
      <HomeCategories />

      {/* 3. FEATURED STORY (New) */}
      <HomeFeatured />

      {/* 4. PRODUCT GRID */}
      <section id="products" className="py-20 container mx-auto px-4">
        <div className="flex items-end justify-between mb-10 border-b border-gray-200 pb-4">
          <div>
            <span className="text-purple-600 font-bold tracking-wider uppercase text-sm">The Collection</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Latest Tributes</h2>
          </div>
          <Link to="/products" className="group flex items-center text-purple-700 font-bold hover:text-purple-900 transition-colors">
            View All <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform text-amber-500"/>
          </Link>
        </div>
        
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                <Link to={`/product/${product._id}`} className="relative block overflow-hidden bg-gray-100 h-64">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                  />
                  {product.countInStock === 0 ? (
                     <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">Sold Out</div>
                  ) : (
                    <div className="absolute top-3 right-3 bg-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md opacity-0 group-hover:opacity-100 transition-opacity">In Stock</div>
                  )}
                </Link>
                <div className="p-6 flex flex-col grow">
                  <div className="mb-2">
                    <div className="flex text-amber-400 text-sm mb-1">
                       {'★'.repeat(Math.round(product.rating))}
                       <span className="text-gray-200">{'★'.repeat(5 - Math.round(product.rating))}</span>
                     </div>
                  </div>
                  <Link to={`/product/${product._id}`} className="grow">
                    <h3 className="text-lg font-bold text-gray-800 hover:text-purple-700 transition-colors line-clamp-2 leading-tight">{product.name}</h3>
                  </Link>
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
                    <div>
                      <span className="text-xs text-gray-400 font-medium uppercase display-block">Price</span>
                      <span className="text-xl font-extrabold text-gray-900 block">${product.price}</span>
                    </div>
                    <Link to={`/product/${product._id}`} className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-sm">
                      <FaShoppingCart size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. TRUST SIGNALS */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl text-center group hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaShippingFast size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Zoomies Speed</h3>
              <p className="text-gray-500">Dispatched faster than your cat running at 3 AM.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl text-center group hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaShieldAlt size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fort Knox Security</h3>
              <p className="text-gray-500">Encrypted payments. Guarded by elite tabbies.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl text-center group hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaCrown size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Royal Quality</h3>
              <p className="text-gray-500">Only the finest for your household deity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION (New) */}
      <HomeFAQ />

      {/* 7. TESTIMONIALS */}
      <HomeTestimonials />

      {/* 8. NEWSLETTER */}
      <section className="container mx-auto px-4 mb-20 mt-20">
        <div className="bg-linear-to-br from-purple-900 via-purple-800 to-indigo-900 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500 opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 p-4 rounded-full mb-6 backdrop-blur-md border border-white/10">
              <FaPaperPlane className="text-amber-400 text-2xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Join the Secret Society</h2>
            <p className="text-purple-200 mb-8 text-lg">
              Get notified when we restock. <span className="text-sm opacity-70 block mt-1">No spam. The cat hates spam.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="Enter your email..." className="grow px-6 py-4 rounded-xl text-gray-900 bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/50 shadow-lg placeholder-gray-400" />
              <button className="bg-amber-500 hover:bg-amber-400 text-purple-950 px-8 py-4 rounded-xl font-extrabold transition-all shadow-lg hover:shadow-amber-500/20 whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;