import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative bg-[#252525] rounded-lg p-8 max-w-lg mx-auto min-h-[450px] h-auto text-white shadow-lg">
        <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-white text-2xl">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
