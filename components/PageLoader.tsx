import React from 'react';

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
};

export default PageLoader;
