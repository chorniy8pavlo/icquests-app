'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

type Web3LoaderProps = {
  message?: string;
  minDisplayTime?: number;
};

const Web3Loader = ({ 
  message = 'Loading...', 
  minDisplayTime = 2500 
}: Web3LoaderProps) => {
  
  // Ensure loader stays visible for minimum display time
  useEffect(() => {
    const timer = setTimeout(() => {
      // Minimum time has passed
    }, minDisplayTime);
    
    return () => clearTimeout(timer);
  }, [minDisplayTime]);
  
  return (
    <div className="fixed inset-0 bg-[#121212] flex flex-col items-center justify-center z-50">
      <div className="relative">
        {/* Logo Animation Container */}
        <div className="mb-12 relative flex justify-center">
          {/* Main Logo Animation */}
          <motion.div
            animate={{ 
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 10,
              ease: "linear",
              repeat: Infinity
            }}
            className="w-36 h-36 flex items-center justify-center"
          >
            <motion.svg 
              width="100" 
              height="100" 
              viewBox="0 0 22 22" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <g clipPath="url(#clip0_logo)">
                <motion.path 
                  d="M0 14.0347C0 13.935 0.0196263 13.8363 0.0577583 13.7443C0.0958904 13.6522 0.151781 13.5686 0.22224 13.4981C0.292699 13.4277 0.376346 13.3718 0.468405 13.3336C0.560464 13.2955 0.659132 13.2759 0.758776 13.2759H9.48245V22.0002H0.758776C0.557536 22.0002 0.364538 21.9203 0.22224 21.778C0.0799422 21.6357 0 21.4427 0 21.2415L0 14.0347ZM9.48267 13.2761H21.2414C21.4426 13.2762 21.6355 13.3561 21.7778 13.4983C21.92 13.6406 21.9999 13.8335 22 14.0347V21.2415C22 21.4427 21.9201 21.6357 21.7778 21.778C21.6355 21.9203 21.4425 22.0002 21.2412 22.0002H18.3938C18.1875 22.0002 17.9835 21.9581 17.794 21.8766C17.6046 21.795 17.4338 21.6757 17.292 21.5259L9.48245 13.2759L9.48267 13.2761Z" 
                  fill="#98CE00"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.path 
                  d="M0 0.758776C0 0.557536 0.0799422 0.364538 0.22224 0.22224C0.364538 0.0799422 0.557536 0 0.758776 0L8.72412 0C8.92536 0 9.11836 0.0799422 9.26066 0.22224C9.40296 0.364538 9.4829 0.557536 9.4829 0.758776V13.2759L0.434612 4.06327C0.156076 3.77957 1.5696e-05 3.39788 0 3.00031L0 0.758551V0.758776Z" 
                  fill="#98CE00"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                  }}
                />
              </g>
              <defs>
                <clipPath id="clip0_logo">
                  <rect width="22" height="22" fill="white"/>
                </clipPath>
              </defs>
            </motion.svg>
          </motion.div>
          
          {/* Shadow effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0.2 }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <svg 
              width="105" 
              height="105" 
              viewBox="0 0 22 22" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-20"
            >
              <g clipPath="url(#clip0_logo_shadow)">
                <path 
                  d="M0 14.0347C0 13.935 0.0196263 13.8363 0.0577583 13.7443C0.0958904 13.6522 0.151781 13.5686 0.22224 13.4981C0.292699 13.4277 0.376346 13.3718 0.468405 13.3336C0.560464 13.2955 0.659132 13.2759 0.758776 13.2759H9.48245V22.0002H0.758776C0.557536 22.0002 0.364538 21.9203 0.22224 21.778C0.0799422 21.6357 0 21.4427 0 21.2415L0 14.0347ZM9.48267 13.2761H21.2414C21.4426 13.2762 21.6355 13.3561 21.7778 13.4983C21.92 13.6406 21.9999 13.8335 22 14.0347V21.2415C22 21.4427 21.9201 21.6357 21.7778 21.778C21.6355 21.9203 21.4425 22.0002 21.2412 22.0002H18.3938C18.1875 22.0002 17.9835 21.9581 17.794 21.8766C17.6046 21.795 17.4338 21.6757 17.292 21.5259L9.48245 13.2759L9.48267 13.2761Z" 
                  fill="#98CE00"
                />
                <path 
                  d="M0 0.758776C0 0.557536 0.0799422 0.364538 0.22224 0.22224C0.364538 0.0799422 0.557536 0 0.758776 0L8.72412 0C8.92536 0 9.11836 0.0799422 9.26066 0.22224C9.40296 0.364538 9.4829 0.557536 9.4829 0.758776V13.2759L0.434612 4.06327C0.156076 3.77957 1.5696e-05 3.39788 0 3.00031L0 0.758551V0.758776Z" 
                  fill="#98CE00"
                />
              </g>
              <defs>
                <clipPath id="clip0_logo_shadow">
                  <rect width="22" height="22" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </motion.div>
          
          {/* Outer pulsing outline */}
          <motion.div 
            className="absolute -inset-4 border-2 border-[#98CE00]/20 rounded-full"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity
            }}
          />
        </div>
        
        {/* Message */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a4d02c] to-[#8bc220] mb-2">
            {message}
          </h2>
          
          <div className="flex justify-center space-x-1 mt-4">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#98CE00]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0
              }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-[#98CE00]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.2
              }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-[#98CE00]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.4
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Web3Loader; 