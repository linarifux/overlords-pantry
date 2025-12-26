import { FaCat, FaFacebookF, FaTwitter, FaInstagram, FaTiktok, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0510] text-gray-300 border-t border-white/10 relative z-10">
      
      {/* Top Gradient Line for "Glow" effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* COLUMN 1: BRAND INFO */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <FaCat className="text-3xl text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-xl font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-amber-400 transition-all">
                THE OVERLORD'S PANTRY
              </span>
            </Link>
            <p className="text-sm text-purple-200/60 leading-relaxed max-w-xs">
              Premium tributes for the household deity. We provide the highest quality goods so you might be spared during the 3 AM revolution.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaTiktok />} />
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaFacebookF />} />
            </div>
          </div>

          {/* COLUMN 2: SHOP */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-amber-500"></span> Pantry
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <FooterLink to="/search/food">Fine Dining</FooterLink>
              <FooterLink to="/search/toys">Tactical Warfare (Toys)</FooterLink>
              <FooterLink to="/search/furniture">Thrones & Scratchers</FooterLink>
              <FooterLink to="/search/clothing">Humiliation (Apparel)</FooterLink>
              <FooterLink to="/products">View All Tributes</FooterLink>
            </ul>
          </div>

          {/* COLUMN 3: SUPPORT */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-purple-500"></span> Servant Support
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <FooterLink to="/profile">My Profile</FooterLink>
              <FooterLink to="/cart">View Hoard</FooterLink>
              <FooterLink to="/shipping">Zoomies Shipping Info</FooterLink>
              <FooterLink to="/returns">Ritual Returns</FooterLink>
              <li className="text-purple-200/40 cursor-not-allowed">Complaints (Ignored)</li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER / LEGAL */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-teal-500"></span> The Fine Print
            </h3>
            <p className="text-xs text-purple-200/50 mb-4 leading-relaxed">
              By using this site, you acknowledge that you do not own the cat; the cat owns you. All revenue goes directly to purchasing more sunbeams.
            </p>
            <div className="text-xs text-purple-200/30 font-mono mt-8">
              EST. {currentYear} • NO DOGS ALLOWED
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-purple-200/40">
          <p>&copy; {currentYear} The Overlord's Pantry. Authorized for Servant Usage Only.</p>
          <div className="flex items-center gap-1 group">
            <span>Made with</span>
            <FaHeart className="text-red-900 group-hover:text-red-500 group-hover:animate-ping transition-colors" />
            <span>(and Fear)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components for clean code
const FooterLink = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-400 hover:text-amber-400 hover:pl-2 transition-all duration-300 block"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ icon }) => (
  <a 
    href="#" 
    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-purple-900 hover:border-amber-500 hover:-translate-y-1 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;