import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MemberDashboard } from "../Components/Navbar";
import SliderMenu from "../Components/SliderMenu";
import { contractAbi, contractAddress } from "../ContractDetails/EduChain";
import { useReadContract } from "wagmi";
import { Search, Users, Award, ChevronRight } from "lucide-react";

const AllMembers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]);

  const {
    data,
    isPending,
    error,
  }: { data: any[] | undefined; isPending: any; error: any } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getAllMembers",
    args: [],
  });

  useEffect(() => {
    if (data) {
      setFilteredMembers(
        data.filter((member) =>
          member.universityName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [data, searchTerm]);

  if (isPending) {
    console.log("isPending");
  }
  if (error) {
    console.log("error: ", error);
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col gap-y-6 bg-gradient-to-br from-teal-900 via-teal-800 to-gray-900 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <MemberDashboard />
      <div className="relative pt-20">
        <SliderMenu />
        <motion.div 
          className="max-w-5xl mx-auto px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Users className="text-teal-400" size={32} />
            <h1 className="text-3xl font-bold text-white">DAO Members</h1>
          </div>

          {/* Search Bar */}
          <div className="mb-8 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-teal-500" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-teal-900/30 backdrop-blur-md border border-teal-500/30 text-white pl-12 pr-4 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-teal-300/50 transition-all"
            />
          </div>

          {/* University List */}
          {isPending ? (
            <motion.div 
              className="w-full flex justify-center items-center py-20"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-teal-300">Loading members...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={container}
              initial="hide"
              animate="show"
            >
              {data && filteredMembers.length > 0 ? (
                filteredMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="bg-gradient-to-br from-teal-900/70 to-gray-900/70 backdrop-blur-md border border-teal-500/20 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-white">
                          {member.universityName}
                        </h2>
                        {member.role === "Admin" && (
                          <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <Award size={14} />
                            Admin
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center mb-4 bg-teal-900/40 rounded-lg px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-teal-200 text-sm">Role</span>
                          <span className="text-white font-medium">{member.role}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-teal-200 text-sm">Voting Weight</span>
                          <span className="text-white font-medium">{parseInt(member.votingWeight)}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="bg-teal-900/30 rounded-lg px-3 py-2 w-full overflow-hidden">
                          <p className="text-teal-300 text-sm font-mono truncate">{member.EduAddress}</p>
                        </div>
                        <ChevronRight className="text-teal-500 ml-2" size={20} />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="col-span-2 flex flex-col items-center justify-center py-16 text-center"
                  variants={item}
                >
                  <div className="bg-teal-800/40 rounded-full p-5 mb-4">
                    <Search size={40} className="text-teal-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
                  <p className="text-teal-200 max-w-md">
                    No universities match your search criteria. Try adjusting your search terms.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AllMembers;