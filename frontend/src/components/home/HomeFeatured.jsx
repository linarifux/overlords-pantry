import { Link } from 'react-router-dom';
import { FaPaw, FaShieldAlt, FaStar, FaCheckCircle } from 'react-icons/fa';

const HomeFeatured = () => {
  return (
    <section className="py-24 md:py-32 bg-gray-900 relative overflow-hidden group">
      
      {/* 1. ANIMATED BACKGROUND BLOBS */}
      {/* Fixed: changed bg-linear-to-r to bg-gradient-to-r for standard Tailwind */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-700 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-700 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      {/* Floating Paw Print Parallax */}
      <div className="absolute top-1/4 left-10 text-purple-800/30 text-[10rem] animate-float opacity-0 md:opacity-100 select-none">
        <FaPaw className="transform rotate-12"/>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
          {/* 2. IMAGE SIDE - 3D TILT & STAT BADGE */}
          <div className="w-full md:w-1/2 perspective-1000">
            {/* Added 'group-hover' to container to trigger tilt */}
            <div className="relative transform transition-transform duration-700 group-hover:rotate-y-6 group-hover:rotate-x-2 preserve-3d">
              
              {/* Back Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-500 rounded-[2rem] blur-xl opacity-50 transform translate-x-4 translate-y-4 transition-all duration-700"></div>
              
              {/* Main Image Card */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=1000" 
                  alt="Cat scratching furniture" 
                  className="w-full h-[500px] object-cover transform scale-105 transition-transform duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
                
                {/* NEW: Floating 'Sofas Saved' Badge */}
                <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 shadow-lg animate-fade-in-up animation-delay-300">
                  <div className="bg-green-500 text-white p-2 rounded-full">
                    <FaCheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-none">1,240+</p>
                    <p className="text-gray-300 text-xs font-medium uppercase tracking-wider">Sofas Saved</p>
                  </div>
                </div>

                {/* Sparkle Icon */}
                <div className="absolute top-6 right-6 text-amber-300 text-4xl animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <FaStar />
                </div>
              </div>
            </div>
          </div>

          {/* 3. TEXT SIDE - GLASSMORPHISM */}
          <div className="w-full md:w-1/2 text-center md:text-left p-8 md:p-12 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 shadow-2xl opacity-0 animate-fade-in-up animation-delay-300 relative overflow-hidden">
            
            {/* Subtle Gradient Overlay on Card */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

            <span className="relative inline-flex items-center gap-2 bg-purple-900/80 text-amber-400 font-bold px-4 py-2 rounded-full uppercase text-[10px] tracking-widest mb-8 border border-amber-400/20 shadow-lg">
              <FaShieldAlt /> The Royal Decree
            </span>
            
            <h2 className="relative text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Reclaim Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-purple-500 animate-gradient-x">
                Living Room
              </span>
            </h2>
            
            <p className="relative text-purple-200/90 text-lg md:text-xl mb-10 leading-relaxed font-medium">
              Stop sacrificing your vintage sofa to the claws of the beast. Our "Iron Throne" scratchers are engineered to be <strong className="text-white">300% more appealing</strong> than your upholstery.
            </p>
            
            <Link to="/search/Furniture" className="group/btn relative inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-2xl font-black text-lg overflow-hidden shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:-translate-y-1">
              <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-purple-900 transition-colors">
                <FaPaw /> Shop Protection
              </span>
              
              {/* Button Glitch/Scan Effect */}
              <div className="absolute inset-0 bg-amber-400 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2 skew-x-12 -translate-x-full group-hover/btn:animate-shimmer"></div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeFeatured;