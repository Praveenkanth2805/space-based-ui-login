import React from 'react';

const MiniSpaceGame = ({ progress }) => {
  return (
    <div className="relative w-full h-4 bg-gray-600 mt-3 rounded">
      <div
        className="absolute top-0 left-0 h-4 bg-green-400 rounded"
        style={{ width: `${Math.min(progress * 10, 100)}%` }}
      ></div>
    </div>
  );
};

export default MiniSpaceGame;