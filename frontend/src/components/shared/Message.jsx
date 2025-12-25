const Message = ({ variant, children }) => {
  // Variant can be 'danger' (red), 'success' (green), 'info' (blue)
  const getColors = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-700';
    }
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${getColors()}`} role="alert">
      <p>{children}</p>
    </div>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;