import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, University, ThumbsUp, AlertCircle } from "lucide-react";
import { useReadContract } from "wagmi";
import { contractAbi, contractAddress } from "../ContractDetails/EduChain";
import GetUniversityName from "./GetUniversityName";

const ProposalCard = ({ proposalId }: any) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  
  const { data }: { data: any[] | undefined } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "proposals",
    args: [proposalId],
  });
  
  let expiryDate, modifiedDate, modifiedTime;
  
  if (data) {
    expiryDate = new Date(parseInt(data[6]) * 1000);
    modifiedDate = `${expiryDate?.getUTCDate()}/${expiryDate?.getMonth() ? expiryDate?.getUTCMonth() : 0 + 1}/${expiryDate?.getFullYear()}`;
    modifiedTime = `${expiryDate?.getUTCHours()}:${expiryDate?.getUTCMinutes()}:${expiryDate?.getUTCSeconds()}`;
  }
  
  useEffect(() => {
    if (data) {
      const endTime = parseInt(data[6]) * 1000; // Convert to milliseconds
      
      const updateTimeLeft = () => {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance <= 0) {
          setTimeLeft("Expired");
          setIsExpired(true);
          return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h left`);
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m left`);
        } else {
          setTimeLeft(`${minutes}m left`);
        }
      };
      
      updateTimeLeft();
      const timer = setInterval(updateTimeLeft, 60000); // Update every minute
      
      return () => clearInterval(timer);
    }
  }, [data]);

  if (!data) {
    return (
      <motion.div 
        className="min-w-[400px] bg-teal-900/30 backdrop-blur-md border border-teal-500/20 rounded-lg shadow-xl overflow-hidden flex items-center justify-center p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-8 h-8 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-w-[400px] bg-gradient-to-br from-teal-900/80 to-gray-900/80 backdrop-blur-md border border-teal-500/20 rounded-lg shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <University className="mr-2 text-teal-400" size={24} />
            <div className="text-teal-100 font-medium">
              <GetUniversityName address={data[3]} />
            </div>
          </div>
          {/* <motion.span 
            className={`text-sm px-3 py-1 rounded-full font-medium ${
              isExpired ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {isExpired ? 'Expired' : 'Active'}
          </motion.span> */}
        </div>

        <h3 className="text-xl font-bold mb-2 text-white">{data[1]}</h3>
        <p className="text-teal-200/80 mb-4 line-clamp-3">{data[2].slice(0, 100)}{data[2].length > 100 ? '...' : ''}</p>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center text-teal-300">
            <Clock className="mr-2 text-teal-400" size={20} />
            <div className="flex flex-col text-sm">
              <span>{timeLeft}</span>
              <span className="text-xs opacity-70">{modifiedDate} at {modifiedTime}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-teal-300 bg-teal-900/40 px-3 py-1.5 rounded-lg">
            <ThumbsUp size={16} className="mr-2" />
            <span>{data[4]} Votes</span>
          </div>
          
          {!isExpired ? (
            <motion.button
              className="bg-teal-500 text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-teal-400 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Vote
            </motion.button>
          ) : (
            <div className="flex items-center gap-2 text-teal-300 bg-teal-900/40 py-2 px-4 rounded-lg">
              <AlertCircle size={16} />
              <span className="text-sm">Voting ended</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProposalCard;