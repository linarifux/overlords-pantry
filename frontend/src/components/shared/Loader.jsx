import { FaCat } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[50vh] w-full relative z-50">
      
      {/* Container for the Spinner */}
      <div className="relative w-24 h-24">
        
        {/* 1. Outer Glow Blob */}
        <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-xl animate-pulse"></div>

        {/* 2. Outer Spinning Ring (Purple/Amber) */}
        <div className="absolute inset-0 rounded-full border-[6px] border-t-purple-600 border-r-amber-500 border-b-purple-900 border-l-transparent animate-spin shadow-[0_0_20px_rgba(168,85,247,0.3)]"></div>

        {/* 3. Center Icon (Pulsing Cat) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <FaCat className="text-4xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
        </div>
      </div>

      {/* 4. Loading Text */}
      <div className="mt-8 text-center space-y-2">
        <h3 className="text-lg font-bold text-white tracking-[0.2em] uppercase animate-pulse">
          Summoning
        </h3>
        
        {/* Bouncing Dots */}
        <div className="flex gap-2 justify-center">
           <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
           <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
           <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;