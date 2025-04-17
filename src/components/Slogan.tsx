import React from 'react';
import Image from 'next/image';

const Slogan: React.FC = () => {
  return (
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:px-36">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg overflow-hidden shadow-md">
            <Image
              src="https://picsum.photos/400/600?random=1"
              alt="Gülen bir kişi"
              width={400}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <Image
              src="https://picsum.photos/400/600?random=2"
              alt="Gülen bir kişi"
              width={400}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold text-blue-800 mb-6">Yaptığımız işi seviyoruz</h2>
          <p className="text-lg text-gray-600">Aralarındaki çatışmayı çözmeye çalışırken karşılaşılan sorunlar Klasik fiziğin iki ana alanı: Newton mekaniği</p>
        </div>
      </div>
  );
};

export default Slogan;