import Image from 'next/image';

const Icons = () => {
    return (
        <div className='max-lg:absolute max-lg:top-10 max-lg:right-5 mt-20 lg:mt-0 flex justify-end lg:justify-start gap-3'>
            <Image src="/imgs/sound.svg" width={30} height={1} alt='volume' className='w-auto h-10 items-center' />
            <Image src="/imgs/screen.svg" width={30} height={1} alt='screenSize' className='w-auto h-10 items-center' />
        </div>
    );
}

export default Icons;
