import { useSpring, animated } from '@react-spring/web'

export default function FloatingCharacters({ mousePos }) {
  const { x = 0, y = 0 } = mousePos || { x: window.innerWidth / 2, y: window.innerHeight / 2 }

  const astroSpring = useSpring({
    x: (x / window.innerWidth - 0.5) * 80,
    y: (y / window.innerHeight - 0.5) * 60,
    config: { tension: 120, friction: 14 },
  })

  const rocketSpring = useSpring({
    x: (x / window.innerWidth - 0.5) * -100,
    y: (y / window.innerHeight - 0.5) * -70,
    config: { tension: 100, friction: 16 },
  })

  const alienSpring = useSpring({
    x: (x / window.innerWidth - 0.5) * 60,
    y: (y / window.innerHeight - 0.5) * 90,
    config: { tension: 90, friction: 18 },
  })

  return (
    <>
      <animated.div
        style={astroSpring}
        className="fixed left-[15%] top-[20%] text-7xl z-10 pointer-events-none transition-transform duration-200"
      >
        🧑‍🚀
      </animated.div>

      <animated.div
        style={rocketSpring}
        className="fixed left-[70%] top-[35%] text-6xl z-10 pointer-events-none transition-transform duration-200"
      >
        🚀
      </animated.div>

      <animated.div
        style={alienSpring}
        className="fixed right-[12%] top-[55%] text-6xl z-10 pointer-events-none transition-transform duration-200"
      >
        👽
      </animated.div>
    </>
  )
}