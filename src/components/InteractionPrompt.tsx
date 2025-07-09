import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractionPromptProps {
  area: string | null;
}

const areaLabels: Record<string, string> = {
  desk: 'Các dự án đã làm',
  door: 'Liên hệ + Tải CV',
  bookshelf: 'Blog / Nhật ký học tập',
  lab: 'Playground - thử nghiệm code',
};

const promptVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export default function InteractionPrompt({ area }: InteractionPromptProps) {
  return (
    <AnimatePresence>
      {area && (
        <motion.div
          variants={promptVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-2xl text-black text-lg z-50 border border-gray-200/50"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>
              Nhấn <kbd className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">Enter</kbd> để xem: 
              <span className="font-semibold ml-1">{areaLabels[area] || area}</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 