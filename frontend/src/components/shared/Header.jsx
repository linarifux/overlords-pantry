import { useState, useRef, useEffect } from 'react'; // Added hooks for dropdown logic
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaCat, FaCaretDown, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Redux hooks
import { useLogoutMutation } from '../../slices/usersApiSlice'; // API Hook
import { logout } from '../../slices/authSlice'; // Local State Action

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth); // Get logged in user

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // To detect clicks outside

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  // Logout Handler
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); // 1. Kill cookie on backend
      dispatch(logout());             // 2. Kill local info
      setIsDropdownOpen(false);
      navigate('/login');             // 3. Redirect
    } catch (err) {
      console.error(err);
    }
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-purple-950 text-white shadow-lg sticky top-0 z-50 border-b border-purple-800">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-wider hover:text-amber-400 transition-colors">
          <FaCat className="text-2xl text-amber-400" />
          <span>THE OVERLORD'S PANTRY</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          
          {/* Cart Link */}
          <Link to="/cart" className="flex items-center gap-1 hover:text-amber-400 transition-colors">
            <div className="relative">
              <FaShoppingCart className="text-xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-purple-900 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </div>
            <span className="hidden sm:block">Cart</span>
          </Link>

          {/* Conditional Auth Rendering */}
          {userInfo ? (
            // LOGGED IN: Show Dropdown
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:text-amber-400 transition-colors focus:outline-none"
              >
                <FaUser className="text-lg" />
                <span className="font-semibold">{userInfo.name}</span>
                <FaCaretDown className={`text-xs transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-2 text-gray-800 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-bold truncate text-purple-700">{userInfo.email}</p>
                  </div>

                  <Link 
                    to='/profile' 
                    className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FaUserCircle /> Profile
                  </Link>

                  <button 
                    onClick={logoutHandler}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // LOGGED OUT: Show Sign In
            <Link to="/login" className="flex items-center gap-1 hover:text-amber-400 transition-colors">
              <FaUser className="text-xl" />
              <span className="hidden sm:block">Sign In</span>
            </Link>
          )}
          
        </div>
      </nav>
    </header>
  );
};

export default Header;