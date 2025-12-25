import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16">
      
      {/* 1. The Visual Evidence */}
      <div className="relative mb-8 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <img 
          src="https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=400" 
          alt="Guilty Cat" 
          className="relative w-64 h-64 object-cover rounded-full border-4 border-white shadow-2xl"
        />
        <div className="absolute bottom-0 right-0 bg-white p-3 rounded-full shadow-lg text-amber-500 text-2xl animate-bounce">
          <FaExclamationTriangle />
        </div>
      </div>

      {/* 2. The "Professional" Error Code */}
      <h1 className="text-9xl font-extrabold text-gray-200 tracking-widest select-none">
        404
      </h1>

      {/* 3. The Humorous Explanation */}
      <div className="bg-white px-8 py-6 rounded-2xl shadow-xl -mt-10 relative z-10 max-w-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          We Suspect Foul Play
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          The page you are looking for has been knocked off the digital table. 
          The Overlord claims it was "in the way," but we believe it has been 
          dragged under the sofa with the missing hair ties.
        </p>

        {/* 4. The Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-purple-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-800 transition-all shadow-lg hover:shadow-purple-900/30"
          >
            <FaHome /> Retreat to Safety
          </Link>
          <a 
            href="mailto:support@overlordspantry.com" 
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            Report the Incident
          </a>
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-400 italic">
        (Error Code: CAT_ON_KEYBOARD)
      </p>

    </div>
  );
};

export default NotFoundPage;