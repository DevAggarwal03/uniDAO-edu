import { useState } from 'react';
import { Menu, X, ChevronsLeft, GraduationCap, Users, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';

const SliderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const connectedAcc = useAccount();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <div className="fixed left-0 top-0 h-full z-50">
      {/* Toggle Button */}
      <motion.button 
        onClick={toggleMenu} 
        className="fixed left-4 top-4 z-60 bg-teal-700 hover:bg-teal-600 text-white p-2 rounded-lg shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Sliding Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed left-0 top-0 h-full w-72 text-white backdrop-blur-lg bg-teal-900/70 border-r border-teal-500/30 shadow-xl"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="p-8 relative h-full flex flex-col">
              {/* Collapse Button */}
              <motion.button 
                onClick={toggleMenu} 
                className="absolute top-4 right-4 p-2 hover:bg-teal-700/60 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Collapse Menu"
              >
                <ChevronsLeft size={24} />
              </motion.button>

              <GraduationCap className="text-teal-300 mb-2" size={36} />
              <motion.h2 
                className="text-2xl font-bold mb-10 text-teal-100"
                variants={menuItemVariants}
              >
                EduGovernance
              </motion.h2>
              
              <nav className="flex-1">
                <ul className="space-y-6">
                  <motion.li variants={menuItemVariants}>
                    <Link 
                      to={`/dashboard/${connectedAcc.address}`} 
                      className="flex items-center gap-3 text-teal-100 hover:text-teal-300 transition-colors py-2 px-3 rounded-lg hover:bg-teal-800/50"
                    >
                      <Home size={20} />
                      <span>Dashboard</span>
                    </Link>
                  </motion.li>
                  <motion.li variants={menuItemVariants}>
                    <Link 
                      to={'/dashboard/AllMembers'} 
                      className="flex items-center gap-3 text-teal-100 hover:text-teal-300 transition-colors py-2 px-3 rounded-lg hover:bg-teal-800/50"
                    >
                      <Users size={20} />
                      <span>All Members</span>
                    </Link>
                  </motion.li>
                </ul>
              </nav>
              
              <motion.div 
                variants={menuItemVariants}
                className="mt-auto bg-teal-800/40 backdrop-blur-sm rounded-lg p-4 border border-teal-700/30"
              >
                <p className="text-xs text-teal-300 font-medium">Connected Account</p>
                <p className="text-teal-100 text-sm truncate mt-1">
                  {connectedAcc.address ? connectedAcc.address : "Not connected"}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SliderMenu;