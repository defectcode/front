import React from "react";

const details = [
  {
    title: 'Production Stages',
    info: 'Join us in every stage of series creation. Your support is crucial to our mission’s success.'
  }
];

const Title = () => {
  return (
    <div className="w-5/6 space-y-1 max-lg:-mt-40 max-md:-mt-32 max-sm:-mt-36 max-lg:text-center">
      <h1 className="text-7xl font-bold max-lg:text-4xl">{details[0].title}</h1>
      <p className="text-2xl max-lg:text-lg max-md:text-md max-sm:text-sm">{details[0].info}</p>
    </div>
  );
};

export default Title;
