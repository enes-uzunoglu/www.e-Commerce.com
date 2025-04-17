import React from 'react';
import Image from 'next/image';

const Slider: React.FC = () => {
  return (
    <div className="container relative overflow-hidden rounded-lg shadow-lg mx-auto ">
      <div className="relative bg-gradient-to-b from-cyan-200 to-blue-300 py-16 px-10 flex items-center justify-between lg:flex-row flex-col text-center lg:text-left">
        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start max-w-md">
          <p className="text-sm text-blue-600 font-semibold tracking-wider uppercase mb-2">
            SUMMER 2020
          </p>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            NEW <span className="text-blue-600">COLLECTION</span>
          </h2>
          <p className="text-gray-600 text-base mb-6 leading-relaxed">
            We know how large objects will act, but things on a small scale.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-md">
            SHOP NOW
          </button>
        </div>

        {/* Image Section */}
        <div className="relative w-full max-w-lg lg:mt-0 mt-8">
  <div className="relative w-full h-64 rounded-full bg-white overflow-hidden shadow-lg">
    <Image
      src="/images/slider/happyWoman.svg"
      alt="Happy Woman"
      layout="fill"
      objectFit="cover"
    />
  </div>
</div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-8 left-10 bg-white rounded-full w-8 h-8 opacity-70"></div>
      <div className="absolute bottom-6 right-12 bg-purple-300 rounded-full w-4 h-4 opacity-70"></div>
    </div>
  );
};

export default Slider;