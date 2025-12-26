import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle, FaSearch } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-12 relative z-10 overflow-hidden">
      
      {/* 1. BACKGROUND GLOWS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>

      {/* 2. THE VISUAL EVIDENCE */}
      <div className="relative mb-8 group">
        {/* Massive 404 Text behind image */}
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[16rem] font-black text-[#1a1025] select-none z-0 drop-shadow-[0_0_2px_rgba(255,255,255,0.1)] leading-none">
          404
        </h1>

        <div className="relative z-10">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          <img 
            src="https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=400" 
            alt="Guilty Cat" 
            className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-[#1a1025] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute bottom-4 right-4 bg-[#0f0716] p-4 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] text-amber-500 text-3xl animate-bounce border border-white/10">
            <FaExclamationTriangle />
          </div>
        </div>
      </div>

      {/* 3. THE EXPLANATION CARD */}
      <div className="bg-[#1a1025] p-8 md:p-10 rounded-[3rem] shadow-2xl border border-white/5 relative z-20 max-w-xl mx-auto backdrop-blur-xl">
        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
          We Suspect <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">Foul Play</span>
        </h2>
        
        <p className="text-purple-200/80 leading-relaxed mb-8 text-lg">
          The page you are looking for has been <strong className="text-white">knocked off the digital table</strong>. 
          The Overlord claims it was "in the way," but we believe it has been 
          dragged under the sofa with the missing hair ties.
        </p>

        {/* 4. ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-700 to-purple-900 text-white px-8 py-4 rounded-xl font-bold hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1"
          >
            <FaHome /> Retreat to Safety
          </Link>
          <Link 
            to="/products" 
            className="flex items-center justify-center gap-2 bg-[#0f0716] text-gray-300 border border-white/10 px-8 py-4 rounded-xl font-bold hover:bg-white/5 hover:text-white transition-colors hover:border-amber-500/30"
          >
            <FaSearch /> Search for Scraps
          </Link>
        </div>
      </div>

      <p className="mt-8 text-xs font-mono text-purple-500/50 uppercase tracking-widest">
        System Status: CONSUMED_BY_VOID
      </p>

    </div>
  );
};

export default NotFoundPage;