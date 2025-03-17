import React, { useEffect, useState } from "react";
import { Home, University, UserCheck, ShieldCheck } from "lucide-react";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { contractAbi, contractAddress } from "../ContractDetails/EduChain";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface FormData {
  uniName: string;
  address: string;
  role: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const connectedAcc = useAccount();
  const [formData, setFormData] = useState<FormData>({
    uniName: "",
    address: `${connectedAcc.address}`,
    role: "member",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { writeContract, isPending, data: hash } = useWriteContract();
  const { isSuccess: isConfirmed, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash
  });

  const { data }: { data: any[] | undefined, isPending: any, error: any } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "members",
    args: [`${connectedAcc.address}`]
  });

  useEffect(() => {
    const dummyData = data;
    if(dummyData ? dummyData[1] : false) {
      console.log('already registered');
      navigate(`/dashboard/${connectedAcc.address}`);
    }
  }, [data, navigate, connectedAcc.address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      await writeContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: "addMember",
        args: [formData.uniName, formData.address, formData.role, BigInt(1)]
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const toExplorer = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://explorer.sepolia.mantle.xyz/tx/${hash}`, '_blank');
  };

  useEffect(() => {
    if(isConfirmed){
      console.log("registered as a member");
    }
  },[isConfirmed]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 0px 8px rgba(20, 184, 166, 0.6)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Glass card effect */}
        <motion.div 
          className="backdrop-blur-lg bg-gray-900/60 rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(20, 184, 166, 0.25)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Header with animated gradient */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-400 opacity-90"></div>
            <motion.div 
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)]"
              animate={{ 
                backgroundPosition: ["0% 100%", "100% 0%"],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 8,
                repeatType: "reverse"
              }}
            ></motion.div>
            
            <div className="relative p-8 text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              >
                <div className="flex justify-center mb-4">
                  <motion.div 
                    className="bg-white/10 p-4 rounded-full backdrop-blur-sm"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ShieldCheck className="w-12 h-12 text-white" />
                  </motion.div>
                </div>
                <h2 className="text-3xl font-bold text-white">University Registration</h2>
                <p className="text-teal-100 mt-2 opacity-80">Secure your place in our academic blockchain</p>
              </motion.div>
            </div>
          </div>

          {/* Form Container */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="p-8 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* University Name Input */}
            <motion.div variants={itemVariants}>
              <label 
                htmlFor="uniName" 
                className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"
              >
                <University className="w-5 h-5 text-teal-400" />
                University Name
              </label>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <input
                  type="text"
                  id="uniName"
                  name="uniName"
                  value={formData.uniName}
                  onChange={handleChange}
                  placeholder="Enter your university name"
                  required
                  className="w-full px-4 py-3 bg-gray-800/70 text-white border border-gray-700 rounded-xl
                            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                            transition duration-300 ease-in-out placeholder-gray-500"
                />
              </motion.div>
            </motion.div>

            {/* Address Input */}
            <motion.div variants={itemVariants}>
              <label 
                htmlFor="address" 
                className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"
              >
                <Home className="w-5 h-5 text-teal-400" />
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={connectedAcc.address}
                disabled
                placeholder="Enter your university address"
                required
                className="w-full px-4 py-3 bg-gray-800/70 text-gray-400 border border-gray-700 rounded-xl
                          focus:outline-none focus:ring-2 focus:ring-teal-500 
                          transition duration-300 ease-in-out cursor-not-allowed"
              />
            </motion.div>

            {/* Role Select */}
            <motion.div variants={itemVariants}>
              <label 
                htmlFor="role" 
                className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"
              >
                <UserCheck className="w-5 h-5 text-teal-400" />
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-3 bg-gray-800/70 text-gray-400 border border-gray-700 rounded-xl
                           cursor-not-allowed 
                           focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="member">Member</option>
              </select>
            </motion.div>
            
            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-400 text-white py-3 rounded-xl
                          focus:outline-none focus:ring-2 
                          focus:ring-teal-500 focus:ring-opacity-50 
                          shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                {isPending ? 'Registering...' : 'Register'} 
              </motion.button>
            </motion.div>
            
            {hash && 
              <motion.div 
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-xl
                            focus:outline-none focus:ring-2 
                            focus:ring-blue-500 focus:ring-opacity-50 
                            shadow-lg" 
                  onClick={toExplorer}
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  View on Explorer
                </motion.button>
              </motion.div>
            }
            
            {isConfirming && 
              <motion.div 
                className="text-teal-300 text-center bg-gray-800/80 p-4 rounded-xl border border-teal-500/30"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="flex items-center justify-center gap-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <svg className="animate-spin h-5 w-5 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Waiting for confirmation...
                </motion.div>
              </motion.div>
            }
            
            {isConfirmed && 
              <motion.div 
                className="text-teal-300 text-center bg-gray-800/80 p-4 rounded-xl border border-teal-500/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Transaction confirmed
                </motion.div>
              </motion.div>
            }
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;