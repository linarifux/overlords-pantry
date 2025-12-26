import { FaInfoCircle, FaCheckCircle, FaExclamationCircle, FaExclamationTriangle } from 'react-icons/fa';

const Message = ({ variant, children }) => {
  
  // Configuration for different alert types
  const variants = {
    danger: {
      styles: 'bg-red-950/30 border-red-500/50 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.1)]',
      icon: <FaExclamationCircle className="text-red-500 text-xl" />,
      glow: 'bg-red-500/10'
    },
    success: {
      styles: 'bg-green-950/30 border-green-500/50 text-green-200 shadow-[0_0_15px_rgba(34,197,94,0.1)]',
      icon: <FaCheckCircle className="text-green-500 text-xl" />,
      glow: 'bg-green-500/10'
    },
    warning: {
      styles: 'bg-amber-950/30 border-amber-500/50 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
      icon: <FaExclamationTriangle className="text-amber-500 text-xl" />,
      glow: 'bg-amber-500/10'
    },
    info: {
      styles: 'bg-blue-950/30 border-blue-500/50 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.1)]',
      icon: <FaInfoCircle className="text-blue-400 text-xl" />,
      glow: 'bg-blue-500/10'
    },
    // Adding a 'purple' variant for general site announcements
    primary: {
        styles: 'bg-purple-950/30 border-purple-500/50 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.1)]',
        icon: <FaInfoCircle className="text-purple-400 text-xl" />,
        glow: 'bg-purple-500/10'
    }
  };

  // Default to info if variant not found
  const activeVariant = variants[variant] || variants.info;

  return (
    <div className={`relative flex items-start gap-4 p-5 rounded-2xl border backdrop-blur-md mb-6 animate-fade-in-up overflow-hidden ${activeVariant.styles}`} role="alert">
      
      {/* Background Ambient Glow */}
      <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full blur-[40px] ${activeVariant.glow}`}></div>
      
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5 relative z-10">
        {activeVariant.icon}
      </div>

      {/* Content */}
      <div className="text-sm md:text-base font-medium leading-relaxed relative z-10">
        {children}
      </div>
    </div>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;