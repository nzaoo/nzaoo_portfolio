import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { skills } from '../data/skills';

interface UIOverlayProps {
  area: string | null;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delay: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 50,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const areaContent: Record<string, React.ReactNode> = {
  desk: (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Dự án đã làm</h2>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg text-gray-800">{project.name}</h3>
            <p className="text-gray-600 mt-2">{project.description}</p>
            {project.tags && (
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  ),
  door: (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Liên hệ & CV</h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Thông tin liên hệ</h3>
          <p className="text-gray-600">Email: your.email@example.com</p>
          <p className="text-gray-600">GitHub: github.com/yourusername</p>
          <p className="text-gray-600">LinkedIn: linkedin.com/in/yourprofile</p>
        </div>
        <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          Tải CV (PDF)
        </button>
      </div>
    </div>
  ),
  bookshelf: (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog & Nhật ký học tập</h2>
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Bài viết gần đây</h3>
          <p className="text-gray-600">Chưa có bài viết nào. Sẽ cập nhật sớm!</p>
        </div>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Đang học</h3>
          <p className="text-gray-700">React Three Fiber, Three.js, Animation</p>
        </div>
      </div>
    </div>
  ),
  lab: (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Playground - Thử nghiệm code</h2>
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Demo nhỏ</h3>
          <p className="text-gray-600">Các thử nghiệm và demo sẽ được thêm vào đây.</p>
        </div>
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Kỹ năng hiện tại</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill) => (
              <span key={skill.id} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

export default function UIOverlay({ area, onClose }: UIOverlayProps) {
  return (
    <AnimatePresence>
      {area && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl p-6 min-w-[320px] max-w-[90vw] max-h-[80vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {areaContent[area] || <div className="text-gray-600">Khu vực chưa có nội dung.</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 