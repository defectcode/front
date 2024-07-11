import React from 'react';
import Image from 'next/image';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center max-md:items-end justify-center mb-5 bg-black bg-opacity-75">
      <div className="relative bg-[#252525] rounded-lg py-5 max-md:p-10 max-md:mx-10 max-w-md mx-auto min-h-[400px] h-auto w-[380px] text-white shadow-lg">
        <button onClick={onClose} className="absolute top-0 right-0 mt-[37px] mr-5 text-white text-5xl">
          <Image src="/icons/close.svg" width={20} height={20} alt='close' />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
