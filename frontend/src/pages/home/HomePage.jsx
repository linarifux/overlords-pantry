import { useGetProductsQuery } from '../../slices/productsApiSlice';
import Loader from '../../components/shared/Loader';
import Message from '../../components/shared/Message';
import HomeCategories from '../../components/home/HomeCategories';
import HomeTestimonials from '../../components/home/HomeTestimonials';
import HomeFeatured from '../../components/home/HomeFeatured';
import HomeFAQ from '../../components/home/HomeFAQ';
import HomeHero from '../../components/home/HomeHero'; 
import { Link } from 'react-router-dom';
import { 
  FaShippingFast, FaShieldAlt, FaCrown, FaPaperPlane, 
  FaArrowRight, FaShoppingCart, FaStar 
} from 'react-icons/fa';
import MarqueeBar from '../../components/home/MarqueeBar';




const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    // 1. GLOBAL THEME: Deep Purple Background & Light Text
    <div className="bg-[#0f0716] min-h-screen text-gray-100 overflow-x-hidden selection:bg-amber-400 selection:text-purple-900">
      
      {/* 0. BREAKING NEWS TICKER */}
      <MarqueeBar />

      {/* 1. HERO */}
      <div className="relative z-10">
        <HomeHero />
      </div>

      {/* 2. CATEGORIES */}
      {/* Wrapper to ensure background continuity if component is transparent */}
      <div className="relative z-10">
        <HomeCategories />
      </div>

      {/* 3. FEATURED STORY */}
      <HomeFeatured />

      {/* 4. PRODUCT GRID - "THE TRIBUTE COLLECTION" */}
      <section id="products" className="py-24 relative">
        
        {/* Glowing Background Blobs (Adjusted for Dark Mode) */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-purple-800/50 pb-8">
            <div>
              <span className="bg-purple-900/50 border border-purple-500/30 text-amber-300 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                Approved by Management
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mt-4 tracking-tight drop-shadow-xl">
                Fresh <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">Tributes</span>
              </h2>
            </div>
            <Link to="/products" className="group mt-6 md:mt-0 flex items-center gap-2 bg-white text-purple-950 px-8 py-3 rounded-full font-bold hover:bg-amber-400 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)]">
              View Entire Pantry <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>
          
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error?.data?.message || error.error}</Message>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                // DARK CARD DESIGN
                <div key={product._id} className="group relative bg-[#1a1025] rounded-4xl border border-purple-800/50 hover:border-amber-500/50 overflow-hidden shadow-xl hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] transition-all duration-500 flex flex-col h-full">
                  
                  {/* Image Area with Inner Glow */}
                  <div className="relative h-72 overflow-hidden bg-[#0a0510]">
                    <Link to={`/product/${product._id}`}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      {/* Vignette Overlay for drama */}
                      <div className="absolute inset-0 bg-linear-to-t from-[#1a1025] via-transparent to-transparent opacity-80"></div>
                    </Link>
                    
                    {/* Status Badges - Neon Style */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.countInStock === 0 ? (
                        <span className="bg-red-600/90 text-white text-[10px] font-black px-3 py-1 rounded border border-red-400 uppercase tracking-widest shadow-[0_0_15px_rgba(220,38,38,0.6)] rotate-3">
                          Devoured
                        </span>
                      ) : (
                        <span className="bg-black/60 backdrop-blur-md border border-purple-500/50 text-amber-300 text-[10px] font-black px-3 py-1 rounded uppercase tracking-widest shadow-lg">
                          Available for Hunt
                        </span>
                      )}
                    </div>

                    {/* Quick Add Button */}
                    {product.countInStock > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                        <Link 
                          to={`/product/${product._id}`}
                          className="w-full flex items-center justify-center gap-2 bg-amber-500 text-purple-950 py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                        >
                          <FaShoppingCart size={14} /> Add to Hoard
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Content Area - Dark & Sleek */}
                  <div className="p-6 flex flex-col grow relative z-10">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex text-amber-400 text-sm drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
                         <FaStar size={12} />
                         <span className="ml-1 font-bold text-white">{product.rating}</span>
                      </div>
                      <span className="text-xs text-purple-300/60 font-medium">({product.numReviews} purrs)</span>
                    </div>
                    
                    <Link to={`/product/${product._id}`} className="grow">
                      <h3 className="text-lg font-bold text-gray-100 hover:text-amber-400 transition-colors line-clamp-2 leading-tight tracking-wide">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="mt-6 flex items-end justify-between border-t border-purple-800/30 pt-4">
                       <div className="flex flex-col">
                         <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Bribe Cost</span>
                         <span className="text-2xl font-black text-white drop-shadow-md">${product.price}</span>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-700 group-hover:border-amber-500 transition-colors">
                          <FaArrowRight className="text-purple-400 group-hover:text-amber-400 -rotate-45 group-hover:rotate-0 transition-all" size={12} />
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. TRUST SIGNALS - Dark Theme */}
      <section className="py-20 bg-[#0a0510] border-t border-purple-900 relative">
         {/* Subtle pattern */}
         <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [bg-size:16px_16px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-black text-white mb-2">The Royal Guarantee</h3>
            <p className="text-purple-300">We serve at the pleasure of the Crown.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TrustCard 
              icon={<FaShippingFast size={32} />}
              title="Zoomies Logistics"
              desc="Dispatched faster than your cat running from a bath."
              color="text-teal-300"
              bg="bg-teal-900/20"
              border="border-teal-800/50"
              glow="hover:shadow-[0_0_30px_rgba(45,212,191,0.2)]"
            />
             <TrustCard 
              icon={<FaShieldAlt size={32} />}
              title="Fort Knox Security"
              desc="Payments guarded by elite hissing cobras (and Stripe)."
              color="text-purple-300"
              bg="bg-purple-900/20"
              border="border-purple-800/50"
              glow="hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            />
             <TrustCard 
              icon={<FaCrown size={32} />}
              title="Your Majesty's Approval"
              desc="If the Overlord hates it, we accept ritual sacrifice (returns)."
              color="text-amber-300"
              bg="bg-amber-900/20"
              border="border-amber-800/50"
              glow="hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]"
            />
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      {/* Ensure HomeFAQ handles dark mode internally or receives props, otherwise it might look bright */}
      <div className="dark text-white"> 
         <HomeFAQ />
      </div>

      {/* 7. TESTIMONIALS */}
      <HomeTestimonials />

      {/* 8. NEWSLETTER - "THE SECRET SOCIETY" */}
      <section className="container mx-auto px-4 pb-24 pt-10">
        <div className="bg-linear-to-br from-[#1a0b2e] via-purple-950 to-black border border-purple-800/50 rounded-[3rem] p-10 md:p-20 text-center text-white shadow-[0_0_50px_rgba(88,28,135,0.3)] relative overflow-hidden group">
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 opacity-10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity duration-700"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 opacity-10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 group-hover:opacity-20 transition-opacity duration-700"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 p-5 rounded-3xl mb-8 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)] transform rotate-3 group-hover:rotate-6 transition-transform">
              <FaPaperPlane className="text-amber-400 text-3xl drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
              Join the Secret Society<br/> of <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500 drop-shadow-sm">Can Openers</span>
            </h2>
            <p className="text-purple-200/80 mb-10 text-xl font-medium">
              Get notified when we restock. We promise not to spam (the cat sleeps 18 hours a day anyway).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto p-2 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl">
              <input 
                type="email" 
                placeholder="Enter your human email..." 
                className="grow px-6 py-4 rounded-xl text-white bg-transparent focus:outline-none focus:bg-white/5 placeholder-gray-400 font-medium transition-colors" 
              />
              <button className="bg-amber-500 hover:bg-white text-purple-950 px-8 py-4 rounded-xl font-extrabold transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] whitespace-nowrap transform hover:-translate-y-1">
                Sublime & Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Updated Dark Theme Trust Cards
const TrustCard = ({ icon, title, desc, color, bg, border, glow }) => (
  <div className={`bg-[#130b1b] p-10 rounded-[2.5rem] text-center group transition-all duration-300 border ${border} relative overflow-hidden ${glow}`}>
    <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-white/20 to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
    <div className={`inline-flex items-center justify-center w-20 h-20 ${bg} ${color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_0_15px_currentColor] opacity-90`}>
      {icon}
    </div>
    <h3 className="text-xl font-black text-white mb-3 tracking-wide">{title}</h3>
    <p className="text-purple-300/70 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default HomePage;