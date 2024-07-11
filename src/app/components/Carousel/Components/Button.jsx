import React from "react";



const Button = () => {
    return (
        <div className="max-md:text-center max-md:ml-0 max-md:mb-0 max-md:flex max-md:items-center max-md:justify-center"> {/* Ajustăm containerul butonului pentru versiunea mobilă */}
            <button className="bg-white text-[#1E1E1E] w-[176px] h-[34px] font-semibold rounded-md text-[15px] max-lg:mt-1" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 700 }}>
                View Details
            </button>
        </div>
    )
}

export default Button;
