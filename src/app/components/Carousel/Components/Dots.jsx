import React from "react";


const Dots = ({ total, current }) => {
    return (
      <div className="flex justify-center space-x-2 absolute bottom-0 max-md:bottom-20">
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={`block w-3 h-3 rounded-full ${index === current ? 'bg-white' : 'bg-gray-400'}`}
          ></span>
        ))}
      </div>
    );
  };

export default Dots;