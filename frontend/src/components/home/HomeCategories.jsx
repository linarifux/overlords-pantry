import { FaPaw, FaFish, FaCouch, FaIcons } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Fine Dining', icon: <FaFish />, bg: 'bg-rose-100', text: 'text-rose-600' },
  { name: 'Weapons (Toys)', icon: <FaIcons />, bg: 'bg-teal-100', text: 'text-teal-600' },
  { name: 'Thrones', icon: <FaCouch />, bg: 'bg-amber-100', text: 'text-amber-600' },
  { name: 'Apparel', icon: <FaPaw />, bg: 'bg-indigo-100', text: 'text-indigo-600' },
];

const HomeCategories = () => {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Shop by Decree</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, index) => (
          <Link 
            to={`/search/${cat.name}`} 
            key={index}
            className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
          >
            <div className={`p-4 rounded-full mb-3 ${cat.bg} ${cat.text} text-3xl group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <span className="font-semibold text-gray-700 group-hover:text-gray-900">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeCategories;