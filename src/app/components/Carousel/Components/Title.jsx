import React from "react";

const details = [
  {
    title: 'Production Stages',
    info: 'Be part of every stage of our series production.View more details now'
  }
];

const Title = () => {
  return (
    <div className="space-y-1 max-lg:-mt-14 max-lg:text-center max-md:mt-8 max-md:p-0">
      <h1 className="text-4xl font-bold max-lg:text-4xl max-md:text-2xl" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600 }}>
        {details[0].title}
      </h1>
      <p className="text-lg max-lg:text-lg max-md:text-md text-[#FFFFFF] max-sm:text-[16px] max-md:leading-5" style={{ fontFamily: 'Ek Mukta, sans-serif', fontWeight: 400 }}>
        {details[0].info}
      </p>
    </div>
  );
};

export default Title;
