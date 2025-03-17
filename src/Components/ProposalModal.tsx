import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Check, FileText } from 'lucide-react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractAbi, contractAddress } from '../ContractDetails/EduChain';

const ProposalModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(7); // Default 7 days
  
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("sendingReq")
    try {
      writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'createSyllabusProposal',
        args: [title, description], // Convert days to seconds
      });
    } catch (error) {
      console.error("Error creating proposal:", error);
    }
  };

  const closeModal = () => {
    if (!isPending && !isConfirming) {
      setIsOpen(false);
      // Reset form if successful
      if (isSuccess) {
        setTitle('');
        setDescription('');
        setDuration(7);
      }
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-gray-900 font-medium py-2.5 px-5 rounded-lg shadow-lg transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={20} />
        <span>New Proposal</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-teal-800 to-gray-900 rounded-xl border border-teal-500/30 shadow-xl w-full max-w-md overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                disabled={isPending || isConfirming}
                className="absolute right-4 top-4 text-teal-200 hover:text-white disabled:opacity-50 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="text-teal-400" size={28} />
                  <h2 className="text-2xl font-bold text-white">Create New Proposal</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-teal-200 mb-1">
                      Proposal Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="Enter a descriptive title"
                      className="w-full px-4 py-3 bg-teal-900/50 border border-teal-600/30 rounded-lg text-white placeholder-teal-300/50 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-teal-200 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={5}
                      placeholder="Explain your syllabus proposal in detail"
                      className="w-full px-4 py-3 bg-teal-900/50 border border-teal-600/30 rounded-lg text-white placeholder-teal-300/50 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-teal-200 mb-1">
                      Voting Duration (days)
                    </label>
                    <select
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-teal-900/50 border border-teal-600/30 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                      <option value="3">3 days</option>
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button onClick={handleSubmit} className='flex w-full justify-center bg-teal-400 py-2 rounded-xl hover:scale-105 ease-in-out transition-all'>
                      {isPending || isConfirming ? (
                        <>
                          <div className="w-5 h-5 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>{isConfirming ? "Confirming..." : "Submitting..."}</span>
                        </>
                      ) : isSuccess ? (
                        <>
                          <Check size={20} />
                          <span>Proposal Created!</span>
                        </>
                      ) : (
                        <>
                          <Plus size={20} />
                          <span>Create Proposal</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProposalModal;