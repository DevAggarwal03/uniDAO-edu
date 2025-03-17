import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Components/Navbar';

const Courses = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<number | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCourseId, setHoveredCourseId] = useState<number | undefined>();

  const votedCourses = [
    {
      id: 1,
      courseName: 'Blockchain Fundamentals',
      university: 'Stanford University',
      department: 'Computer Science',
      votesReceived: 250,
      implementationDate: '2024-09-15'
    },
    {
      id: 2,
      courseName: 'AI Ethics and Governance',
      university: 'MIT',
      department: 'Technology and Society',
      votesReceived: 220,
      implementationDate: '2024-10-01'
    },
    {
      id: 3,
      courseName: 'Sustainable Development Technologies',
      university: 'UC Berkeley',
      department: 'Environmental Science',
      votesReceived: 185,
      implementationDate: '2024-11-15'
    },
    {
      id: 4,
      courseName: 'Quantum Computing Principles',
      university: 'CalTech',
      department: 'Physics',
      votesReceived: 210,
      implementationDate: '2025-01-10'
    }
  ];

  const CourseDetailsModal = ({ course, onClose }: { course: any, onClose: () => void }) => (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-gray-900 rounded-lg border border-blue-500/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-36 bg-gradient-to-r from-blue-900 to-indigo-900 flex items-center justify-center border-b border-blue-500/20">
            <h1 className="text-3xl font-bold text-white text-center px-6">
              {course.courseName}
            </h1>
          </div>
          
          <div className="p-8 text-gray-200">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-blue-400 mb-2">Course Details</h2>
                <p className="mb-2"><span className="font-medium text-gray-300">University:</span> {course.university}</p>
                <p><span className="font-medium text-gray-300">Department:</span> {course.department}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-blue-400 mb-2">Voting Information</h2>
                <p className="mb-2"><span className="font-medium text-gray-300">Votes Received:</span> {course.votesReceived}</p>
                <p><span className="font-medium text-gray-300">Implementation Date:</span> {course.implementationDate}</p>
              </div>
            </div>
            
            <motion.button 
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-3 rounded-lg transition duration-300 mt-4 font-medium"
              whileHover={{ backgroundColor: "#2563eb", scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close Details
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  const filteredCourses = votedCourses.filter(course => 
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200
      }
    }
  };

  return (
    <div className='flex flex-col gap-y-4 bg-gray-800 min-h-screen text-gray-200'>
      <Navbar/>
    
      <div className="min-h-screen mt-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6">
        {selectedCourseId && (
          <CourseDetailsModal 
            course={votedCourses.find(c => c.id === selectedCourseId)}
            onClose={() => setSelectedCourseId(undefined)}
          />
        )}

        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-300 mb-4">
              Approved Course Syllabi
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore the cutting-edge courses that have been democratically voted and approved by universities worldwide.
            </p>
          </motion.div>

          <motion.div 
            className="mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <motion.input 
                type="text" 
                placeholder="Search courses or universities..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-gray-800 border border-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300 placeholder-gray-500"
                initial={{ width: "80%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-3 top-3.5 text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>

          {filteredCourses.length === 0 ? (
            <motion.div 
              className="text-center text-gray-400 mt-10 bg-gray-800 p-8 rounded-xl shadow-md border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              No courses found matching your search.
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredCourses.map((course) => (
                <motion.div 
                  key={course.id}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredCourseId(course.id)}
                  onMouseLeave={() => setHoveredCourseId(undefined)}
                  className={`
                    min-h-[230px] flex flex-col justify-between py-3
                    bg-gray-800 rounded-lg overflow-hidden
                    transition duration-300 
                    ${hoveredCourseId === course.id 
                      ? 'shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-teal-500/30' 
                      : 'shadow-lg border border-gray-700'}
                    hover:cursor-pointer
                  `}
                  onClick={() => setSelectedCourseId(course.id)}
                  whileHover={{ 
                    y: -5,
                    transition: { 
                      type: "spring", 
                      stiffness: 300 
                    }
                  }}
                >
                  <div className="p-6 w-11/12 mx-auto">
                    <h2 className="text-xl font-bold text-teal-300 mb-2 transition">
                      {course.courseName}
                    </h2>
                    <div className="text-sm text-gray-300 mb-4">
                      <p className="mb-1">{course.university}</p>
                      <p>{course.department}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-teal-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.34c0 .806.668 1.46 1.506 1.46h4.006c.836 0 1.524-.655 1.524-1.46v-5.34a3.5 3.5 0 00-1.418-2.773l-2.832-2.14a.5.5 0 00-.596 0L7.418 7.56A3.5 3.5 0 006 10.333z" />
                        </svg>
                        {course.votesReceived} Votes
                      </span>
                      <span className="text-sm text-gray-400">
                        {course.implementationDate}
                      </span>
                    </div>
                  </div>
                  <motion.button 
                    className='w-11/12 mx-auto bg-blue-600 text-white py-2 rounded-lg font-medium'
                    whileHover={{ backgroundColor: "#2563eb" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;