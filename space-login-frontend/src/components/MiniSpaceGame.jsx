import { useSpring, animated } from '@react-spring/web'

export default function MiniSpaceGame({ password }) {
  const progress = Math.min((password.length / 12) * 100, 100)

  const rocketStyle = useSpring({
    transform: `translateX(${progress * 2.8}px)`,
    config: { mass: 1, tension: 180, friction: 12 }
  })

  const strength = password.length > 10 ? 'STRONG' : password.length > 6 ? 'MEDIUM' : 'WEAK'
  const strengthColor = password.length > 10 ? 'bg-emerald-400' : password.length > 6 ? 'bg-amber-400' : 'bg-red-400'

  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs mb-1 text-cyan-200">
        <span>LAUNCH PROGRESS</span>
        <span className={strength === 'STRONG' ? 'text-emerald-400' : strength === 'MEDIUM' ? 'text-amber-400' : 'text-red-400'}>
          {strength}
        </span>
      </div>

      <div className="h-3 bg-white/10 rounded-full relative overflow-hidden">
        <div className={`h-3 rounded-full transition-all duration-300 ${strengthColor}`} style={{ width: `${progress}%` }} />
        <animated.div
          style={rocketStyle}
          className="absolute -top-4 text-4xl transition-all"
        >
          🚀
        </animated.div>
      </div>

      <div className="text-[10px] text-center mt-1 text-white/50">Type longer password → rocket flies faster!</div>
    </div>
  )
}