import { Link } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';

const HomeFeatured = () => {
  return (
    <section className="py-20 bg-purple-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-800 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-600 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Text Side */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-2 block">
              The Royal Decree
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Reclaim Your <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-600">Furniture</span>
            </h2>
            <p className="text-purple-200 text-lg mb-8 leading-relaxed">
              Stop sacrificing your vintage sofa to the claws of the beast. Our "Iron Throne" scratchers are engineered to be 300% more appealing than your upholstery. It’s not just a toy; it’s an insurance policy.
            </p>
            <Link to="/search/Furniture" className="inline-flex items-center gap-2 bg-white text-purple-950 px-8 py-4 rounded-full font-bold hover:bg-amber-400 transition-colors shadow-lg">
              <FaPaw /> Shop Protection
            </Link>
          </div>

          {/* Image Side */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500 rounded-2xl rotate-3 transform translate-x-2 translate-y-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800" 
                alt="Cat scratching furniture" 
                className="relative rounded-2xl shadow-2xl w-full object-cover transform -rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeFeatured;