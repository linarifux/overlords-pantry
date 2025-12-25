import { FaCat } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // CHANGE 1: bg-slate-900 -> bg-purple-950
    <footer className="bg-purple-950 text-purple-200 py-8 mt-auto border-t border-purple-800">
      <div className="container mx-auto px-4 text-center">
        
        <div className="flex justify-center items-center gap-2 mb-2">
          {/* CHANGE 2: text-indigo-400 -> text-amber-400 */}
          <FaCat className="text-amber-400 text-lg" />
          <span className="text-purple-100 font-semibold tracking-wider text-sm">
            THE OVERLORD'S PANTRY
          </span>
        </div>

        <p className="text-xs opacity-70">
          Copyright &copy; {currentYear} &mdash; Authorized for Servant Usage Only
        </p>
      </div>
    </footer>
  );
};

export default Footer;