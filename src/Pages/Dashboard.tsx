import { motion } from "framer-motion";
import SyllabusProposalVoting from "../Components/AllProposals";
import { MemberDashboard } from "../Components/Navbar";
import SliderMenu from "../Components/SliderMenu";

const Dashboard = () => {
  return (
    <motion.div 
      className="flex flex-col gap-y-6 min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <MemberDashboard />
      <div className="flex mt-20 flex-col justify-center items-center px-4">
        <SliderMenu />
        <motion.div
          className="w-full max-w-7xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <SyllabusProposalVoting />
        </motion.div>
      </div>
    </motion.div>
  );
};
 
export default Dashboard;