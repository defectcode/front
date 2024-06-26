'use client'
import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const DynamicVideoPlayer = dynamic(() => import('./VideoPlayer'), { ssr: false });

const Icons = ({ isMuted, toggleMute }) => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const handleScreenClick = () => {
    setIsVideoVisible(true);  // Arată videoul
    document.body.classList.add('overflow-hidden');
  };

  const handleClose = () => {
    setIsVideoVisible(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <div className='max-lg:absolute max-lg:top-10 max-lg:right-5 mt-20 lg:mt-0 flex justify-end lg:justify-start gap-3'>
      <button onClick={toggleMute} className='w-auto h-10 items-center relative'>
        <Image src={isMuted ? "/imgs/muted.svg" : "/imgs/sound.svg"} width={30} height={30} alt='volume' className='w-auto h-10 items-center' />
        {isMuted}
      </button>
      <button onClick={handleScreenClick} className='w-auto h-10 items-center'>
        <Image src="/imgs/screen.svg" width={30} height={30} alt='screenSize' className='w-auto h-10 items-center' />
      </button>
      {isVideoVisible && (
        <DynamicVideoPlayer
          videoId="IRsFc2gguEg"
          onClose={handleClose}
          isMuted={isMuted}
        />
      )}
    </div>
  );
};

export default Icons;
