import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProposalModal from './ProposalModal';
import { contractAbi, contractAddress } from '../ContractDetails/EduChain';
import { useReadContract } from 'wagmi';
import ProposalCard from './ProposalCard';
import { BookOpen, Plus } from 'lucide-react';

const SyllabusProposalVoting = () => {
  const [, setCurrentTime] = useState(new Date());
  const [proposalIDS, ] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // getting the no of proposals
  const { data: noOfProposals, isLoading: contractLoading }: { data: any[] | undefined, isLoading: boolean } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "proposalCounter",
    args: [],
  });

  console.log(noOfProposals)

  useEffect(() => {
    if (!contractLoading && noOfProposals) {
      setIsLoading(false);
    }
  }, [contractLoading, noOfProposals]);
  
  useEffect(() => {
    if(noOfProposals){
      const ids = [];
      for(let i = 0; i < parseInt(noOfProposals.toString()); i++){
        ids.push(i+1);
      }
      proposalIDS.length = 0;
      proposalIDS.push(...ids);
    }
  }, [noOfProposals, proposalIDS]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="rounded-xl backdrop-blur-md bg-teal-900/30 border border-teal-500/20 shadow-xl p-8 w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-10">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BookOpen className="text-teal-400" size={32} />
          <h1 className="text-3xl font-bold text-white">
            University Course Syllabus DAO
          </h1>
        </motion.div>
        <ProposalModal />
      </div>

      {isLoading ? (
        <motion.div 
          className="w-full flex justify-center items-center py-20"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-teal-300">Loading proposals...</p>
          </div>
        </motion.div>
      ) : noOfProposals && parseInt(noOfProposals.toString()) > 0 ? (
        <motion.div 
          className="grid z-20 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="show"
          animate="show"
        >
          {proposalIDS.map(proposal => (
            <motion.div key={proposal} variants={item}>
              <ProposalCard proposalId={proposal} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="flex flex-col items-center justify-center py-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-teal-800/40 rounded-full p-5 mb-4">
            <Plus size={40} className="text-teal-300" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Proposals Yet</h3>
          <p className="text-teal-200 max-w-md">
            Create the first proposal to improve university courses and start the voting process.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SyllabusProposalVoting;