import { Link } from 'react-router-dom';
import { FaSignInAlt, FaTruck, FaCreditCard, FaCheckCircle, FaChevronRight } from 'react-icons/fa';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  
  // Definition of steps for easier mapping
  const steps = [
    { 
      label: 'Sign In', 
      link: '/login', 
      active: step1, 
      icon: <FaSignInAlt /> 
    },
    { 
      label: 'Shipping', 
      link: '/shipping', 
      active: step2, 
      icon: <FaTruck /> 
    },
    { 
      label: 'Payment', 
      link: '/payment', 
      active: step3, 
      icon: <FaCreditCard /> 
    },
    { 
      label: 'Place Order', 
      link: '/placeorder', 
      active: step4, 
      icon: <FaCheckCircle /> 
    },
  ];

  return (
    <nav className="w-full mb-12 relative z-10">
      <div className="flex justify-between items-center relative max-w-3xl mx-auto">
        
        {/* PROGRESS BAR BACKGROUND LINE */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 rounded-full transform -translate-y-1/2"></div>
        
        {/* Steps Loop */}
        {steps.map((step, index) => {
          // Logic: If the NEXT step is active, then THIS step is "Completed" (Green/Purple)
          // If THIS step is active but NEXT is not, then THIS step is "Current" (Amber)
          const isCompleted = index < steps.length - 1 && steps[index + 1].active;
          const isCurrent = step.active && !isCompleted;
          const isDisabled = !step.active;

          return (
            <div key={index} className="flex flex-col items-center relative group">
              
              {/* THE CIRCLE ICON */}
              {step.active ? (
                <Link 
                  to={step.link}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300 z-10 
                    ${isCurrent 
                      ? 'bg-amber-500 text-purple-900 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] scale-110' 
                      : 'bg-purple-900 text-green-400 border-green-500 hover:bg-green-500 hover:text-purple-900'
                    }`}
                >
                  {isCompleted ? <FaCheckCircle /> : step.icon}
                </Link>
              ) : (
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg bg-[#0f0716] border-2 border-gray-700 text-gray-600 z-10 cursor-not-allowed">
                  {step.icon}
                </div>
              )}

              {/* LABEL */}
              <span className={`mt-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300
                ${isCurrent ? 'text-amber-400 drop-shadow-md' : ''}
                ${isCompleted ? 'text-green-400' : ''}
                ${isDisabled ? 'text-gray-600' : ''}
              `}>
                {step.label}
              </span>
            </div>
          );
        })}

      </div>
    </nav>
  );
};

export default CheckoutSteps;