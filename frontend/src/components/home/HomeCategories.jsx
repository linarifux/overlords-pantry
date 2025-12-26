import { FaPaw, FaFish, FaCouch, FaMouse } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const categories = [
  { 
    name: 'Fine Dining', 
    id: 'food',
    description: 'Sustain the Beast',
    icon: <FaFish />, 
    gradient: 'from-rose-500 to-red-600', 
    textStyles: 'text-rose-400',
    bgStyles: 'bg-rose-900/20 border-rose-500/20'
  },
  { 
    name: 'Warfare (Toys)', 
    id: 'toys',
    description: 'For 3AM Chaos',
    icon: <FaMouse />, 
    gradient: 'from-teal-400 to-emerald-600', 
    textStyles: 'text-teal-400',
    bgStyles: 'bg-teal-900/20 border-teal-500/20'
  },
  { 
    name: 'Royal Thrones', 
    id: 'furniture',
    description: 'Surfaces to Shed On',
    icon: <FaCouch />, 
    gradient: 'from-amber-400 to-orange-600', 
    textStyles: 'text-amber-400',
    bgStyles: 'bg-amber-900/20 border-amber-500/20'
  },
  { 
    name: 'Humiliation (Apparel)', 
    id: 'clothing',
    description: 'They Will Resent You',
    icon: <FaPaw />, 
    gradient: 'from-indigo-500 to-purple-600', 
    textStyles: 'text-indigo-400',
    bgStyles: 'bg-indigo-900/20 border-indigo-500/20'
  },
];

const HomeCategories = () => {
  return (
    <section className="container mx-auto px-4 py-24 relative z-10">
      <div className="flex flex-col items-center mb-16">
        <span className="bg-purple-900/30 border border-purple-500/30 text-amber-400 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.2)] mb-4">
          Department Selection
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white text-center tracking-tight">
          Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">Decree</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <Link 
            to={`/search/${cat.id}`}
            key={index}
            className="group relative h-72 overflow-hidden rounded-[2.5rem] bg-[#1a1025] border border-white/5 shadow-2xl shadow-purple-900/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-500 flex flex-col justify-between p-8 hover:-translate-y-2"
          >
            {/* 1. HOVER GRADIENT LAYER (Hidden by default, fades in) */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

            {/* 2. BACKGROUND ICON (Watermark effect) */}
            <div className={`absolute -right-6 -bottom-6 text-9xl transition-all duration-700 transform group-hover:scale-125 group-hover:-rotate-12 opacity-5 group-hover:opacity-20 text-white`}>
              {cat.icon}
            </div>

            {/* 3. CONTENT */}
            <div className="relative z-10">
              {/* Icon Circle */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-all duration-500 border ${cat.bgStyles} ${cat.textStyles} group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.2)]`}>
                {cat.icon}
              </div>
              
              {/* Text */}
              <h3 className="text-2xl font-black text-white transition-colors duration-300 leading-tight group-hover:drop-shadow-md">
                {cat.name}
              </h3>
              <p className="mt-3 text-sm font-medium text-gray-400 group-hover:text-white/90 transition-colors duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transform">
                {cat.description}
              </p>
            </div>

            {/* 4. ARROW (Appears on hover) */}
            <div className="relative z-10 self-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
               <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                 <span className="text-xl font-bold">→</span>
               </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeCategories;