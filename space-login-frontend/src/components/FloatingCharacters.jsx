import { useSpring, animated } from '@react-spring/web'

export default function FloatingCharacters() {
  const astro1 = useSpring({
    from: { y: 80, rotate: -12 },
    to: { y: 40, rotate: 12 },
    loop: { reverse: true },
    config: { tension: 90, friction: 18 }
  })

  const rocket1 = useSpring({
    from: { y: 300, x: -30, rotate: -25 },
    to: { y: 220, x: 30, rotate: 25 },
    loop: { reverse: true },
    config: { tension: 70, friction: 22 }
  })

  const alien = useSpring({
    from: { y: 520, rotate: 8 },
    to: { y: 460, rotate: -8 },
    loop: { reverse: true },
    config: { tension: 110, friction: 15 }
  })

  return (
    <>
      <animated.div style={astro1} className="fixed left-[15%] top-[20%] text-7xl z-10 pointer-events-none">🧑‍🚀</animated.div>
      <animated.div style={rocket1} className="fixed left-[70%] top-[35%] text-6xl z-10 pointer-events-none">🚀</animated.div>
      <animated.div style={alien} className="fixed right-[12%] top-[55%] text-6xl z-10 pointer-events-none">👽</animated.div>
    </>
  )
}