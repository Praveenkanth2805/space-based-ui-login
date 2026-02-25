import { useState, useEffect, useRef } from 'react'   // ← FIXED: added useRef here
import { useSpring, animated } from '@react-spring/web'
import axios from 'axios'
import AnimatedBackground from './components/AnimatedBackground'
import FloatingCharacters from './components/FloatingCharacters'
import MiniSpaceGame from './components/MiniSpaceGame'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const API_URL = 'http://127.0.0.1:8000/api'

function Planet({ orbitRadius, size, color, roughness = 0.7, metalness = 0.1, emissive = '#000000', emissiveIntensity = 0, orbitSpeed = 1, spinSpeed = 0.5 }) {
  const ref = useRef()   // ← now works because useRef is imported

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Orbit around sun
    ref.current.position.x = orbitRadius * Math.cos(time * orbitSpeed)
    ref.current.position.z = orbitRadius * Math.sin(time * orbitSpeed)
    // Self rotation
    ref.current.rotation.y += 0.01 * spinSpeed
  })

  return (
    <group ref={ref}>
      <Sphere args={[size, 48, 48]}>
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </Sphere>
    </group>
  )
}

function SolarSystem3D({ onClose }) {
  return (
    <div className="fixed inset-0 z-60 bg-black">
      <Canvas camera={{ position: [0, 40, 100], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={5} color="white" />
        <pointLight position={[50, 50, 50]} intensity={2} color="#ffcc99" />

        {/* Sun */}
        <Sphere args={[6, 64, 64]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#ffdd00"
            emissive="#ff6600"
            emissiveIntensity={2.5}
            roughness={0.15}
            metalness={0.1}
          />
        </Sphere>

        {/* Mercury */}
        <Planet orbitRadius={12} size={1} color="#aaaaaa" roughness={0.95} metalness={0.4} orbitSpeed={4.0} spinSpeed={1.5} />

        {/* Venus */}
        <Planet orbitRadius={18} size={2.2} color="#e0c080" roughness={0.8} metalness={0.05} emissive="#ffcc88" emissiveIntensity={0.2} orbitSpeed={2.6} spinSpeed={0.4} />

        {/* Earth */}
        <Planet orbitRadius={26} size={2.3} color="#3a7bd5" roughness={0.65} metalness={0.05} emissive="#44aaff" emissiveIntensity={0.12} orbitSpeed={1.9} spinSpeed={1.0} />

        {/* Mars */}
        <Planet orbitRadius={35} size={1.5} color="#c95a3d" roughness={0.9} metalness={0.2} orbitSpeed={1.4} spinSpeed={0.9} />

        {/* Jupiter */}
        <Planet orbitRadius={55} size={5.5} color="#d9b38c" roughness={0.5} metalness={0.25} emissive="#ffcc99" emissiveIntensity={0.15} orbitSpeed={0.8} spinSpeed={2.5} />

        <Stars radius={600} depth={120} count={18000} factor={8} saturation={0} fade speed={0.2} />
        <OrbitControls enableZoom enablePan enableRotate autoRotate autoRotateSpeed={0.4} />
      </Canvas>

      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-70 px-8 py-4 bg-red-700/90 hover:bg-red-800 rounded-2xl text-xl font-bold text-white shadow-2xl transition-all"
      >
        Back to Dashboard
      </button>
    </div>
  )
}

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isForgot, setIsForgot] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSolarSystem, setShowSolarSystem] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const rocketLaunch = useSpring({
    from: { transform: 'translateX(0px) rotate(0deg)' },
    to: success && !isLoggedIn ? { transform: 'translateX(800px) translateY(-300px) rotate(-45deg)' } : { transform: 'translateX(0px) rotate(0deg)' },
    config: { tension: 80, friction: 20 },
  })

  const planet1Spring = useSpring({
    from: { x: -120 },
    to: { x: 120 },
    loop: { reverse: true },
    config: { duration: 28000 },
  })

  const planet2Spring = useSpring({
    from: { x: 100 },
    to: { x: -100 },
    loop: { reverse: true },
    config: { duration: 34000 },
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await axios.post(`${API_URL}/login/`, { username, password })
      if (res.data.success) {
        setSuccess(res.data.message)
        setCurrentUser(username)
        setIsLoggedIn(true)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      setShake(true)
      setTimeout(() => setShake(false), 600)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const res = await axios.post(`${API_URL}/register/`, { username, email, password })
      if (res.data.success) {
        setSuccess('Account created! Logging you in...')
        setTimeout(() => {
          setCurrentUser(username)
          setIsLoggedIn(true)
          setIsSignUp(false)
        }, 1500)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  const handleForgot = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess('Reset instructions sent! Check your email 📧')
      setIsForgot(false)
    } catch {
      setError('Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser('')
    setUsername('')
    setPassword('')
    setEmail('')
    setSuccess('')
    setError('')
    setIsForgot(false)
    setIsSignUp(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <AnimatedBackground />

      {showSolarSystem ? (
        <SolarSystem3D onClose={() => setShowSolarSystem(false)} />
      ) : isLoggedIn ? (
        <div className="relative w-full max-w-4xl mx-auto z-40 my-8 p-6 bg-indigo-950/80 rounded-3xl shadow-2xl backdrop-blur-lg border border-cyan-500/30">
          <animated.div className="absolute -left-16 -top-16 text-7xl opacity-70" style={planet1Spring}>🪐</animated.div>
          <animated.div className="absolute -right-12 bottom-12 text-6xl opacity-80" style={planet2Spring}>🌑</animated.div>

          <div className="text-8xl mb-6 mx-auto w-fit animate-bounce-slow">🧑‍🚀</div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-300 text-center">
            Welcome back, Astronaut {currentUser}!
          </h1>

          <p className="text-lg md:text-xl mb-8 text-cyan-200 text-center">
            Mission Control • All Systems Nominal
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/5 p-5 rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
              <div className="text-sm mb-2 text-cyan-300">Fuel Level</div>
              <div className="w-full bg-white/10 rounded-full h-5 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 h-5 w-[92%] animate-pulse" />
              </div>
              <div className="text-right text-sm mt-1 font-bold">92%</div>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20">
              <div className="text-sm mb-2 text-purple-300">Oxygen</div>
              <div className="w-full bg-white/10 rounded-full h-5 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-400 via-purple-300 to-pink-500 h-5 w-[98%] animate-pulse" />
              </div>
              <div className="text-right text-sm mt-1 font-bold">98%</div>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-green-500/30 shadow-lg shadow-green-500/20">
              <div className="text-sm mb-2 text-green-300">Shield</div>
              <div className="w-full bg-white/10 rounded-full h-5 overflow-hidden">
                <div className="bg-gradient-to-r from-green-400 via-green-300 to-emerald-500 h-5 w-[85%] animate-pulse" />
              </div>
              <div className="text-right text-sm mt-1 font-bold">85%</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <button
              onClick={() => setShowSolarSystem(true)}
              className="px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30"
            >
              View Solar System
            </button>

            <button
              onClick={handleLogout}
              className="px-10 py-5 bg-red-600/80 hover:bg-red-700 rounded-2xl text-lg font-bold transition"
            >
              Log Out
            </button>
          </div>
        </div>
      ) : isSignUp ? (
        <div className={`glass rounded-3xl p-10 w-full max-w-md z-50 shadow-2xl transition-all ${shake ? 'animate-shake' : ''}`}>
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold tracking-widest mb-2">JOIN THE FLEET</h1>
            <p className="text-cyan-300 text-sm">Create your cosmic identity</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-cyan-200">Astronaut ID</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400"
                placeholder="e.g. star_explorer42"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-cyan-200">Cosmic Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400"
                placeholder="you@galaxy.mail"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-cyan-200">Create Secret Code</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400"
                placeholder="••••••••"
                required
              />
            </div>

            <MiniSpaceGame password={password} />

            {error && <p className="text-red-400 text-center font-medium animate-pulse">{error}</p>}
            {success && <p className="text-green-400 text-center font-medium">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 py-4 rounded-2xl font-bold text-lg tracking-widest transition-all disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="animate-spin text-2xl">🪐</span>
                  Creating Account...
                </div>
              ) : 'Join the Space Fleet'}
            </button>

            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className="text-cyan-300 hover:text-cyan-200 text-sm underline block mx-auto mt-4"
            >
              ← Already have an account? Login
            </button>
          </form>
        </div>
      ) : isForgot ? (
        <div className={`glass rounded-3xl p-10 w-full max-w-md z-50 shadow-2xl transition-all ${shake ? 'animate-shake' : ''}`}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-widest mb-2">Reset Password</h1>
            <p className="text-cyan-300 text-sm">Enter your cosmic email</p>
          </div>

          <form onSubmit={handleForgot} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-cyan-200">Cosmic Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400"
                placeholder="you@starfleet.com"
                required
              />
            </div>

            {error && <p className="text-red-400 text-center font-medium">{error}</p>}
            {success && <p className="text-green-400 text-center font-medium">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 py-4 rounded-2xl font-bold text-lg tracking-widest disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="animate-spin text-2xl">🪐</span>
                  Sending...
                </div>
              ) : 'SEND RESET BEACON'}
            </button>

            <button
              type="button"
              onClick={() => setIsForgot(false)}
              className="text-cyan-300 hover:text-cyan-200 text-sm underline block mx-auto mt-4"
            >
              ← Back to Login
            </button>
          </form>
        </div>
      ) : (
        <div className={`glass rounded-3xl p-10 w-full max-w-md z-50 shadow-2xl transition-all ${shake ? 'animate-shake' : ''}`}>
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold tracking-widest mb-2">SPACE LOGIN</h1>
            <p className="text-cyan-300 text-sm">Enter the cosmos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-cyan-200">Astronaut ID (Username)</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400"
                placeholder="e.g. neil_armstrong"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-cyan-200">Secret Code (Password)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400"
                placeholder="••••••••"
                required
              />
            </div>

            <MiniSpaceGame password={password} />

            {error && <p className="text-red-400 text-center font-medium animate-pulse">{error}</p>}
            {success && <p className="text-green-400 text-center font-medium">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 py-4 rounded-2xl font-bold text-lg tracking-widest transition-all active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="animate-spin text-2xl">🪐</span>
                  Launching...
                </div>
              ) : 'LAUNCH MISSION'}
            </button>

            <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm mt-6">
              <button
                type="button"
                onClick={() => setIsForgot(true)}
                className="text-cyan-300 hover:text-cyan-200 underline"
              >
                Forgot password?
              </button>
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-cyan-300 hover:text-cyan-200 underline"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

      {!isLoggedIn && <FloatingCharacters mousePos={mousePos} />}

      {success && !isLoggedIn && (
        <animated.div
          style={rocketLaunch}
          className="fixed bottom-20 right-20 text-8xl z-20 pointer-events-none"
        >
          🚀
        </animated.div>
      )}
    </div>
  )
}

export default App