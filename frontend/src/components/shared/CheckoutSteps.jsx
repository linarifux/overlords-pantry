import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  // Helper to determine styling
  const getLinkStyle = (isActive, isCompleted) => {
    if (isActive) return "text-amber-500 font-bold border-b-2 border-amber-500 pb-1"; // Current Step
    if (isCompleted) return "text-purple-700 font-semibold hover:text-purple-900";   // Done Step
    return "text-gray-400 cursor-not-allowed"; // Future Step
  };

  return (
    <nav className="flex justify-center items-center gap-4 md:gap-8 mb-8 text-sm md:text-base">
      
      {/* Step 1: Sign In */}
      <div className={getLinkStyle(false, step1)}>
        {step1 ? <Link to='/login'>Sign In</Link> : <span>Sign In</span>}
      </div>

      <div className="text-gray-300">&gt;</div>

      {/* Step 2: Shipping */}
      <div className={getLinkStyle(step2, step1 && step2)}>
        {step2 ? <Link to='/shipping'>Shipping</Link> : <span>Shipping</span>}
      </div>

      <div className="text-gray-300">&gt;</div>

      {/* Step 3: Payment */}
      <div className={getLinkStyle(step3, step2 && step3)}>
        {step3 ? <Link to='/payment'>Payment</Link> : <span>Payment</span>}
      </div>

      <div className="text-gray-300">&gt;</div>

      {/* Step 4: Place Order */}
      <div className={getLinkStyle(step4, step3 && step4)}>
        {step4 ? <Link to='/placeorder'>Place Order</Link> : <span>Place Order</span>}
      </div>

    </nav>
  );
};

export default CheckoutSteps;