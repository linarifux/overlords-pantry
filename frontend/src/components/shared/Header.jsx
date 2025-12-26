import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaCat,
  FaCaretDown,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  // State for User Dropdown
  const [isUserOpen, setIsUserOpen] = useState(false);
  const userDropdownRef = useRef(null);

  // State for Admin Dropdown
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const adminDropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setIsUserOpen(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Close dropdowns if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close User Menu if clicked outside
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserOpen(false);
      }
      // Close Admin Menu if clicked outside
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target)) {
        setIsAdminOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

          {/* ADMIN MENU (Click to Toggle) */}
          {userInfo && userInfo.isAdmin && (
            <div className="relative" ref={adminDropdownRef}>
               <button 
                 onClick={() => setIsAdminOpen(!isAdminOpen)}
                 className="flex items-center gap-1 text-amber-400 font-bold hover:text-amber-300 transition-colors focus:outline-none"
               >
                 Admin <FaCaretDown className={`text-xs transition-transform ${isAdminOpen ? 'rotate-180' : ''}`} />
               </button>
               
               {/* Admin Dropdown Content */}
               {isAdminOpen && (
                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 text-gray-800 border border-gray-100 animate-in fade-in zoom-in-95 duration-200 z-50">
                    <Link 
                      to="/admin/orderlist" 
                      className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700"
                      onClick={() => setIsAdminOpen(false)}
                    >
                      Orders
                    </Link>
                    <Link 
                      to="/admin/productlist" 
                      className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700"
                      onClick={() => setIsAdminOpen(false)}
                    >
                      Products
                    </Link>
                    <Link 
                      to="/admin/userlist" 
                      className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700"
                      onClick={() => setIsAdminOpen(false)}
                    >
                      Users
                    </Link>
                 </div>
               )}
            </div>
          )}

          {/* User Menu (Click to Toggle) */}
          {userInfo ? (
            <div className="relative" ref={userDropdownRef}>
              <button 
                onClick={() => setIsUserOpen(!isUserOpen)}
                className="flex items-center gap-2 hover:text-amber-400 transition-colors focus:outline-none"
              >
                <FaUser className="text-lg" />
                <span className="font-semibold">{userInfo.name}</span>
                <FaCaretDown className={`text-xs transition-transform ${isUserOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {isUserOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-2 text-gray-800 border border-gray-100 animate-in fade-in zoom-in-95 duration-200 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-bold truncate text-purple-700">{userInfo.email}</p>
                  </div>

                  <Link 
                    to='/profile' 
                    className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                    onClick={() => setIsUserOpen(false)}
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
            // LOGGED OUT
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