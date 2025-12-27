import { Link } from 'react-router-dom';
import { FaCat, FaBolt, FaMoon, FaArrowRight, FaFire, FaBoxOpen } from 'react-icons/fa';
import { useState } from 'react';

const HomeHero = () => {
  const [activeMood, setActiveMood] = useState('Hungry');

  return (
    <section className="container mx-auto px-4 py-8">
      {/* FIX 1: Changed 'h-150' to 'h-[600px]' 
         (h-150 isn't a default class, so the grid height was collapsing) 
      */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-150">
        
        {/* BLOCK 1: MAIN FEATURE */}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] bg-purple-900 shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"></div>
          
          {/* FIX 2: Changed 'bg-linear-to-t' to 'bg-gradient-to-t' */}
          <div className="absolute inset-0 bg-linear-to-t from-purple-950 via-purple-900/60 to-transparent opacity-90"></div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
            <span className="inline-block bg-amber-400 text-purple-900 font-black text-xs px-3 py-1 rounded-full uppercase tracking-widest w-fit mb-4 animate-pulse">
              Restock Alert
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-none mb-4">
              The Red Dot <br/> 
              {/* FIX 3: Changed 'bg-linear-to-r' to 'bg-gradient-to-r' */}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-pink-500">
                9000
              </span>
            </h1>
            <p className="text-purple-200 text-lg mb-8 max-w-md line-clamp-2">
              Automated laser precision. Keep the beast distracted while you finally eat dinner in peace.
            </p>
            <div className="flex gap-4">
              <Link to="/product/red-dot-id" className="bg-white text-purple-900 px-8 py-3 rounded-xl font-bold hover:bg-amber-400 hover:scale-105 transition-all shadow-lg flex items-center gap-2">
                Buy Tribute <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>

        {/* BLOCK 2: MOOD SELECTOR */}
        <div className="md:col-span-2 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-gray-800 mb-1 flex items-center gap-2">
              Current Mood <span className="text-gray-300 font-normal text-sm">(Select to filter)</span>
            </h3>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { id: 'Hungry', icon: <FaCat />, label: 'Starving', color: 'hover:bg-orange-100 hover:text-orange-600' },
                { id: 'Zoomies', icon: <FaBolt />, label: 'Chaos', color: 'hover:bg-purple-100 hover:text-purple-600' },
                { id: 'Sleepy', icon: <FaMoon />, label: 'Napping', color: 'hover:bg-indigo-100 hover:text-indigo-600' },
              ].map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setActiveMood(mood.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300
                    ${activeMood === mood.id 
                      ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-inner scale-95' 
                      : `border-gray-100 text-gray-400 ${mood.color}`
                    }`}
                >
                  <span className="text-2xl mb-2">{mood.icon}</span>
                  <span className="text-xs font-bold uppercase">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BLOCK 3: FLASH DEAL */}
        <div className="bg-amber-400 rounded-[2.5rem] p-6 relative overflow-hidden group hover:shadow-xl transition-all">
          <FaFire className="absolute -bottom-4 -right-4 text-9xl text-amber-500 opacity-50 rotate-12 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                 <span className="bg-white/30 backdrop-blur text-purple-900 font-bold text-[10px] px-2 py-1 rounded-lg">FLASH DEAL</span>
                 <span className="font-mono font-bold text-purple-900">02:14:59</span>
              </div>
              <h3 className="text-3xl font-black text-purple-900 mt-4 leading-tight">Salmon <br/>Snaps</h3>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-black text-white drop-shadow-md">$4.99</span>
              <button className="bg-purple-900 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* BLOCK 4: NEW ARRIVAL */}
        <div className="bg-indigo-900 rounded-[2.5rem] p-6 text-white relative overflow-hidden group">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548802673-380ab8ebc427?auto=format&fit=crop&w=500&q=60')] bg-cover opacity-20 group-hover:opacity-30 transition-opacity"></div>
           <div className="relative z-10 flex flex-col h-full justify-between">
             <div className="flex items-center gap-2 text-indigo-200">
               <FaBoxOpen /> <span className="text-xs font-bold uppercase tracking-wider">Just Landed</span>
             </div>
             <div>
               <h4 className="text-xl font-bold mb-1">Catnip Bubbles</h4>
               <p className="text-indigo-200 text-sm mb-4">It's chemistry, but for cats.</p>
               <Link to="/products" className="text-amber-400 text-sm font-bold hover:underline flex items-center gap-1">
                 View Details <FaArrowRight size={12} />
               </Link>
             </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default HomeHero;