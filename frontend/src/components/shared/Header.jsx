import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import {
  FaShoppingCart,
  FaUser,
  FaCat,
  FaCaretDown,
  FaSignOutAlt,
  FaUserCircle,
  FaSearch,
  FaHeart,
  FaGlobe,
  FaBars,
  FaTimes,
  FaChevronRight
} from "react-icons/fa";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  // Dropdown & Menu States
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Refs for clicking outside
  const userDropdownRef = useRef(null);
  const adminDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  // Define Shopping Categories
  const shopMenus = [
    { name: "Fine Dining", path: "/search/food" },
    { name: "Warfare (Toys)", path: "/search/toys" },
    { name: "Thrones", path: "/search/furniture" },
    { name: "Apparel", path: "/search/clothing" },
  ];

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setIsUserOpen(false);
      setIsMobileMenuOpen(false); // Close mobile menu on logout
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Close dropdowns if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // User Dropdown
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserOpen(false);
      }
      // Admin Dropdown
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target)) {
        setIsAdminOpen(false);
      }
      // Mobile Menu (Clicking outside the drawer closes it)
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        // Only close if we aren't clicking the toggle button
        if (!event.target.closest('.mobile-toggle-btn')) {
           setIsMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-black text-xs font-medium text-gray-400 py-2 border-b border-white/5 relative z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="hidden md:flex gap-4">
            <span className="hover:text-amber-400 cursor-pointer transition-colors">Support</span>
            <span className="hover:text-amber-400 cursor-pointer transition-colors">Store Locator</span>
          </div>
          <div className="flex-1 text-center text-amber-500/90 tracking-widest uppercase text-[10px] md:text-xs">
            Free shipping on orders over $50 (The Cat Insists)
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
              <FaGlobe /> <span>US / USD</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN GLASS HEADER */}
      <header className="sticky top-0 z-40 bg-[#0f0716]/80 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center gap-4">
            
            {/* LEFT: BRAND & MOBILE TOGGLE */}
            <div className="flex items-center gap-4 lg:gap-8">
              {/* Mobile Toggle Button */}
              <button 
                className="lg:hidden text-gray-300 hover:text-white text-xl mobile-toggle-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>

              {/* Logo */}
              <Link to="/" className="group flex items-center gap-2 text-xl md:text-2xl font-black tracking-tight text-white whitespace-nowrap">
                <FaCat className="text-3xl text-amber-400 group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                <span className="hidden sm:block group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-amber-400 transition-all">
                  OVERLORD'S PANTRY
                </span>
              </Link>

              {/* DESKTOP SHOPPING MENU (New) */}
              <div className="hidden lg:flex items-center gap-6">
                {shopMenus.map((menu) => (
                  <Link 
                    key={menu.name}
                    to={menu.path} 
                    className="text-sm font-bold text-gray-300 hover:text-amber-400 transition-colors uppercase tracking-wide"
                  >
                    {menu.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* CENTER: SEARCH BAR */}
            <div className="hidden md:flex flex-1 max-w-md relative group mx-4">
              <input 
                type="text" 
                placeholder="Search for tributes..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:bg-white/10 focus:border-amber-500/50 transition-all placeholder-gray-500"
              />
              <FaSearch className="absolute left-3.5 top-3 text-gray-500 group-focus-within:text-amber-400 transition-colors" />
            </div>

            {/* RIGHT: NAVIGATION ICONS */}
            <div className="flex items-center gap-4 md:gap-6">
              
              {/* ADMIN DROPDOWN */}
              {userInfo && userInfo.isAdmin && (
                <div className="relative hidden xl:block" ref={adminDropdownRef}>
                  <button 
                    onClick={() => setIsAdminOpen(!isAdminOpen)}
                    className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all border ${isAdminOpen ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'text-gray-400 border-transparent hover:text-white'}`}
                  >
                    Admin <FaCaretDown />
                  </button>
                  
                  {isAdminOpen && (
                    <div className="absolute right-0 mt-4 w-48 bg-[#1a1025]/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 py-2 animate-in fade-in zoom-in-95 duration-200">
                       {['Orders', 'Products', 'Users'].map((item) => (
                         <Link 
                           key={item}
                           to={`/admin/${item.toLowerCase().slice(0, -1)}list`}
                           className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                           onClick={() => setIsAdminOpen(false)}
                         >
                           {item}
                         </Link>
                       ))}
                    </div>
                  )}
                </div>
              )}

              {/* ICONS GROUP */}
              <div className="flex items-center gap-5 text-gray-300">
                
                {/* Search Icon (Mobile Only) */}
                <button className="md:hidden hover:text-amber-400 transition-colors">
                  <FaSearch className="text-xl" />
                </button>

                {/* Wishlist */}
                <Link to="/wishlist" className="hidden sm:block hover:text-red-400 transition-colors transform hover:scale-110 duration-200">
                  <FaHeart className="text-xl" />
                </Link>

                {/* Cart */}
                <Link to="/cart" className="relative hover:text-amber-400 transition-colors transform hover:scale-110 duration-200">
                  <FaShoppingCart className="text-xl" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2.5 -right-2.5 bg-amber-500 text-purple-950 text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#0f0716] shadow-lg animate-pulse">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                  )}
                </Link>

                {/* USER DROPDOWN (Desktop) */}
                <div className="relative pl-2 hidden lg:block" ref={userDropdownRef}>
                  {userInfo ? (
                    <>
                      <button 
                        onClick={() => setIsUserOpen(!isUserOpen)}
                        className="flex items-center gap-2 focus:outline-none group"
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${isUserOpen ? 'border-amber-400 bg-amber-400/10 text-amber-400' : 'border-white/10 bg-white/5 text-gray-300 group-hover:border-white/30 group-hover:text-white'}`}>
                          <FaUser className="text-sm" />
                        </div>
                      </button>

                      {isUserOpen && (
                        <div className="absolute right-0 mt-4 w-60 bg-[#1a1025]/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                          <div className="px-5 py-3 border-b border-white/5">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Signed in as</p>
                            <p className="text-sm font-bold text-white truncate">{userInfo.name}</p>
                            <p className="text-xs text-gray-400 truncate">{userInfo.email}</p>
                          </div>

                          <div className="py-2">
                            <Link 
                              to='/profile' 
                              className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                              onClick={() => setIsUserOpen(false)}
                            >
                              <FaUserCircle className="text-amber-500" /> Profile
                            </Link>
                          </div>

                          <div className="pt-2 border-t border-white/5">
                            <button 
                              onClick={logoutHandler}
                              className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                            >
                              <FaSignOutAlt /> Logout
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link 
                      to="/login" 
                      className="text-sm font-bold bg-white text-purple-950 px-5 py-2 rounded-full hover:bg-amber-400 transition-all shadow-lg hover:shadow-amber-400/20 whitespace-nowrap"
                    >
                      Sign In
                    </Link>
                  )}
                </div>

              </div>
            </div>
          </div>
        </nav>
        
        {/* 3. MOBILE MENU DRAWER (Slide in from Left) */}
        {/* Overlay */}
        <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} aria-hidden="true" />
        
        {/* Drawer */}
        <div ref={mobileMenuRef} className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-[#0f0716] border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-xl font-black text-white flex items-center gap-2">
                        <FaCat className="text-amber-400" /> MENU
                    </span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* Mobile Shop Links */}
                <div className="space-y-1 mb-8">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Departments</p>
                    {shopMenus.map((menu) => (
                        <Link 
                            key={menu.name}
                            to={menu.path} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 text-gray-200 font-medium transition-colors group"
                        >
                            {menu.name}
                            <FaChevronRight className="text-gray-600 group-hover:text-amber-400 text-xs" />
                        </Link>
                    ))}
                </div>

                {/* Mobile User Actions */}
                <div className="pt-6 border-t border-white/10">
                    {userInfo ? (
                        <>
                            <div className="flex items-center gap-3 mb-6 px-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-bold">
                                    {userInfo.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-bold">{userInfo.name}</p>
                                    <p className="text-xs text-gray-400">{userInfo.email}</p>
                                </div>
                            </div>
                            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl">Profile</Link>
                            {userInfo.isAdmin && (
                                <Link to="/admin/orderlist" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-amber-400 hover:bg-amber-400/10 rounded-xl">Admin Dashboard</Link>
                            )}
                            <button onClick={logoutHandler} className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl mt-2">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-white text-purple-950 font-bold py-3 rounded-xl hover:bg-amber-400 transition-colors">
                            Sign In / Register
                        </Link>
                    )}
                </div>
            </div>
        </div>

      </header>
    </>
  );
};

export default Header;