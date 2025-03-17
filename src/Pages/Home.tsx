import { BookOpen, Users, Shield, ChevronRight, ArrowRight, Database, Globe, Zap } from "lucide-react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Home = () => {
  const [, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Database className="w-8 h-8 text-teal-500" />,
      title: "Collaborative Syllabus Creation",
      description:
        "Develop curriculum through democratic participation and voting systems that ensure quality and relevance.",
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      title: "Transparent Governance",
      description: "Every stakeholder has a voice in defining the future direction of educational initiatives.",
    },
    {
      icon: <Zap className="w-8 h-8 text-teal-500" />,
      title: "Role-Based Participation",
      description: "Contributions are valued based on academic expertise while maintaining democratic principles.",
    },
  ];

  const processSteps = [
    {
      title: "Propose",
      description: "Submit syllabus proposals backed by educational rationale and learning objectives",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Review",
      description: "Community members evaluate, suggest improvements, and refine proposals",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Vote",
      description: "Weighted voting process where expertise and contributions determine influence",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Execute",
      description: "Approved syllabi are implemented with transparent tracking of outcomes",
      icon: <ArrowRight className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <Navbar />
      
      {/* Hero Section - Asymmetrical Split Design */}
      <header className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "60px 60px"
            }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
            {/* Left content area - takes 7/12 on large screens */}
            <div 
              className="lg:col-span-7 z-30 flex flex-col justify-center p-8 lg:p-16"
            >
              <div className="inline-block mb-4 py-1 px-3 bg-teal-500/10 border border-teal-500/20 rounded-full">
                <span className="text-teal-400 text-sm font-medium">Revolutionary Education Model</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block">Decentralized</span>
                <span className="block text-teal-400">Academic Governance</span>
              </h1>
              
              <p className="text-xl mb-8 text-neutral-400 max-w-2xl">
                A blockchain-powered platform reimagining how academic communities collaborate to create the future of education.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <motion.button 
                  className="flex items-center gap-2 bg-teal-500 text-neutral-900 px-6 py-3 rounded font-medium hover:bg-teal-400 transition duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Join the DAO</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
                
                <motion.button 
                  className="flex items-center gap-2 bg-neutral-800 text-neutral-200 border border-neutral-700 px-6 py-3 rounded font-medium hover:bg-neutral-700 transition duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Explore Platform</span>
                </motion.button>
              </div>
              
              <div className="mt-12">
                <p className="text-neutral-500 text-sm uppercase tracking-wider mb-4">Trusted by academics from</p>
                <div className="flex flex-wrap gap-8 items-center">
                  {['Harvard', 'MIT', 'Stanford', 'Berkeley'].map((name, i) => (
                    <div key={i} className="text-neutral-400 font-medium">{name}</div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right visual area - takes 5/12 on large screens */}
            <motion.div 
              className="lg:col-span-5 flex items-center justify-center relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Abstract shapes and visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Large circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-4 border-teal-500/20 animate-slow-spin"></div>
                  
                  {/* Inner circle with glow */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-teal-500/10 border border-teal-500/30 shadow-[0_0_40px_rgba(20,184,166,0.3)] animate-pulse"></div>

                    <div    
                      className="absolute w-3 h-3 rounded-full bg-teal-500"
                      style={{
                        top: `${30 + 0.2 * 40}%`,
                        left: `${30 + 0.3 * 40}%`,
                        animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`
                      }}
                    ></div>
                    <div    
                      className="absolute w-3 h-3 rounded-full bg-teal-500"
                      style={{
                        top: `${30 + 0.4 * 40}%`,
                        left: `${30 + 0.6 * 40}%`,
                        animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`
                      }}
                    ></div>
                    <div    
                      className="absolute w-3 h-3 rounded-full bg-teal-500"
                      style={{
                        top: `${30 + 0.4 * 40}%`,
                        left: `${30 + 0.9 * 40}%`,
                        animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`
                      }}
                    ></div>
                    <div    
                      className="absolute w-3 h-3 rounded-full bg-teal-500"
                      style={{
                        top: `${30 + 0.7 * 40}%`,
                        left: `${30 + 0.3 * 40}%`,
                        animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`
                      }}
                    ></div>
                    <div    
                      className="absolute w-3 h-3 rounded-full bg-teal-500"
                      style={{
                        top: `${30 + 0.7 * 40}%`,
                        left: `${30 + 0.7 * 40}%`,
                        animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`
                      }}
                    ></div>
                    <div    
                      className="absolute w-3 h-3 rounded-full bg-teal-500"
                      style={{
                        top: `${30 + 0.2 * 40}%`,
                        left: `${30 + 0.7 * 40}%`,
                        animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`
                      }}
                    ></div>
                    <div    
                      className="absolute w-3 h-3 rounded-full bg-teal-500"
                      style={{
                        top: `${30 + 0.5 * 40}%`,
                        left: `${30 + 0.1 * 40}%`,
                        animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`
                      }}
                    ></div>

                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Features Section - Minimalist Cards */}
      <section className="py-24 bg-neutral-950 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Core Platform Features</h2>
              <p className="text-neutral-400 max-w-lg">Our decentralized approach transforms traditional education through three foundational pillars.</p>
            </div>
            <a href="#" className="hidden md:flex items-center text-teal-400 hover:text-teal-300 transition">
              <span>Learn more about our technology</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-teal-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-3 bg-neutral-800 inline-block rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-neutral-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Timeline Style */}
      <section className="py-24 bg-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Syllabus Creation Process</h2>
            <p className="text-neutral-400">Our decentralized governance model ensures that educational content is created collaboratively with input from all stakeholders.</p>
          </div>
          
          <div className="relative">
            {/* Vertical line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-700 transform -translate-x-1/2"></div>
            
            <div className="space-y-12 md:space-y-0">
              {processSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col md:flex-row md:justify-between items-center md:items-start relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {/* Content that alternates sides */}
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:order-last md:text-left md:pl-16'}`}>
                    <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-neutral-400">{step.description}</p>
                  </div>
                  
                  {/* Circle in the middle */}
                  <div className="my-4 md:my-0 z-10 p-4 bg-neutral-800 rounded-full border-4 border-neutral-900">
                    {step.icon}
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="md:w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Split Design */}
      <section className="py-24 bg-gradient-to-br from-teal-900 to-neutral-900 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-neutral-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">Join the Academic Revolution</h2>
              <p className="text-xl text-neutral-300 mb-8">
                Become part of a pioneering community that's reshaping the landscape of education through decentralized governance and collective wisdom.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Access to cutting-edge educational resources",
                  "Participate in shaping future curricula",
                  "Connect with leading minds in your field"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 text-teal-400">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.33333 8L7.33333 10L10.6667 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="text-neutral-300">{benefit}</span>
                  </li>
                ))}
              </ul>
              <motion.button 
                className="flex items-center gap-2 bg-neutral-100 text-neutral-900 px-8 py-4 rounded font-medium hover:bg-white transition duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Join the Community</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="rounded-xl overflow-hidden bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 p-8">
                <div className="text-center mb-8">
                  <div className="inline-block p-3 bg-teal-500/10 rounded-full mb-3">
                    <Users className="w-6 h-6 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Community Growth</h3>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    { value: "12K+", label: "Active Members" },
                    { value: "87+", label: "Universities" },
                    { value: "230+", label: "Courses Created" },
                    { value: "50+", label: "Countries" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 bg-neutral-800 rounded-lg">
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-neutral-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* Testimonial */}
                <blockquote className="border-l-2 border-teal-500 pl-4 italic text-neutral-300">
                  "This platform has transformed how we develop educational content, making it truly representative of diverse perspectives and needs."
                </blockquote>
                <div className="mt-4 text-sm text-neutral-400">
                  — Dr. Sarah Chen, Educational Innovation Lead
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* CSS for animations */}
      <style>{`
        @keyframes slow-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-slow-spin {
          animation: slow-spin 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;