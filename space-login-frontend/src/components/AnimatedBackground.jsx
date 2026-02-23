import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
          }}
        ></div>
      ))}
      <style>{`
        @keyframes twinkle {
          from {opacity: 0.2;}
          to {opacity: 1;}
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;