import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center max-md:items-end justify-center mb-5 bg-black bg-opacity-75">
      <div className="relative bg-[#252525] rounded-lg p-8 max-md:p-10 max-md:mx-10 max-w-md w-auto mx-auto min-h-[400px] h-auto max-md: text-white shadow-lg">
        <button onClick={onClose} className="absolute top-0 right-0 mt-[27px] mr-4 text-white text-5xl">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
