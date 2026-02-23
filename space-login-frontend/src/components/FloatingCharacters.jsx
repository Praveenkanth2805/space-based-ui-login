import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const FloatingCharacters = () => {
  const styles = useSpring({
    loop: true,
    to: [{ transform: 'translateY(-20px)' }, { transform: 'translateY(20px)' }],
    from: { transform: 'translateY(0px)' },
    config: { duration: 3000 }
  });

  return (
    <animated.div style={styles} className="absolute top-10 left-10 w-16 h-16 bg-white rounded-full flex items-center justify-center">
      🚀
    </animated.div>
  );
};

export default FloatingCharacters;