import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-teal-500/10 p-2 py-[0.5px] rounded-lg">
          <GraduationCap className="text-teal-300 mb-2" size={36} />
          </div>
          <h1 className="text-xl font-bold text-white">EduGovernance</h1>
        </motion.div>

        <motion.div 
          className="hidden md:flex items-center space-x-8 text-neutral-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, staggerChildren: 0.1 }}
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/register">Register</NavLink>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="ml-2"
          >
            <CustomConnectButton />
          </motion.div>
        </motion.div>
        
        {/* Mobile menu button - shown on small screens */}
        <motion.button 
          className="md:hidden text-white p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.button>
      </div>
    </motion.nav>
  );
};

// Custom styled nav link with hover effects
const NavLink = ({ to, children }: {to: string, children: any}) => {
  return (
    <motion.button 
      className="relative font-medium text-sm tracking-wide py-2"
      whileHover={{ color: "#14b8a6" }} // Teal color on hover
    >
      <Link to={to}>
        {children}
      </Link>
      <motion.span 
        className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

// Custom styled connect button wrapper
const CustomConnectButton = () => {
  return (
    <div className="bg-neutral-800 p-0.5 rounded-lg border border-neutral-700 hover:border-teal-500/50 transition-colors duration-300">
      <ConnectButton 
        showBalance={false}
        chainStatus="icon"
        accountStatus="address"
      />
    </div>
  );
};

export const MemberDashboard = () => {
  // Reusing the same navbar style for consistency
  return <Navbar />;
};

export default Navbar;