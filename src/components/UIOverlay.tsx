import React from 'react';
import { InteractiveContent } from '../data/types';

interface UIOverlayProps {
  activeInteraction: InteractiveContent | null;
  onClose: () => void;
}

const UIOverlay: React.FC<UIOverlayProps> = ({ activeInteraction, onClose }) => {
  if (!activeInteraction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {activeInteraction.title}
        </h2>
        <p className="text-gray-600 mb-6">
          {activeInteraction.content}
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default UIOverlay; 