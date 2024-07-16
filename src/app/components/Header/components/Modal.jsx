import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const ModalNavBar = ({ isOpen, onClose, children }) => {
  const [marginTop, setMarginTop] = useState('');


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center max-md:items-end justify-center bg-black bg-opacity-75">
      <div className={`relative bg-[#252525] rounded-lg pt-5 min-h-[400px] h-auto max-md:mb-5 max-w-[380px] w-[344px] text-white shadow-lg flex items-center justify-center`}>
        <button onClick={onClose} className="absolute top-0 right-0 mt-[26px] mr-5 text-white text-5xl">
          <Image src="/icons/close.svg" width={10} height={10} alt='close' className='w-3 h-auto'/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalNavBar;
