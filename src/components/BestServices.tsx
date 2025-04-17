import React from 'react';
import { BookOpen, GraduationCap, Rocket } from 'lucide-react';

const BestServices: React.FC = () => {
  return (
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">THE BEST SERVICES</h2>
        <p className="text-lg text-gray-600 mb-12">Problems trying to resolve the conflict between</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex justify-center items-center h-16 w-16 bg-blue-200 rounded-full mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Wins</h3>
            <p className="text-gray-600 text-sm">Get your best looking smile now!</p>
          </div>
          <div>
            <div className="flex justify-center items-center h-16 w-16 bg-blue-200 rounded-full mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Concrete</h3>
            <p className="text-gray-600 text-sm">Defelicate is most focused in helping you discover your most beautiful smile</p>
          </div>
          <div>
            <div className="flex justify-center items-center h-16 w-16 bg-blue-200 rounded-full mx-auto mb-4">
              <Rocket className="h-8 w-8 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Hack Growth</h3>
            <p className="text-gray-600 text-sm">Overcame any hurdle or any other problem.</p>
          </div>
        </div>
      </div>
  );
};

export default BestServices;