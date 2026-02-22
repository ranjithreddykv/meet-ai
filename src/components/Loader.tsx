import React from 'react'

const Loader = () => {
  return (
    <div className="flex space-x-2">
      <div className="h-3 w-3 bg-gray-700 rounded-full animate-bounce"></div>
      <div className="h-3 w-3 bg-gray-700 rounded-full animate-bounce delay-150"></div>
      <div className="h-3 w-3 bg-gray-700 rounded-full animate-bounce delay-300"></div>
    </div>
  );
}

export default Loader
