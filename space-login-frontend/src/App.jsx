import { useState, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import axios from 'axios'
import AnimatedBackground from './components/AnimatedBackground'
import FloatingCharacters from './components/FloatingCharacters'
import MiniSpaceGame from './components/MiniSpaceGame'

const API_URL = 'http://127.0.0.1:8000/api'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isForgot, setIsForgot] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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

  // Small animated planets for dashboard
  const planet1 = useSpring({
    from: { x: -200, y: -100 },
    to: { x: 200, y: 100 },
    loop: { reverse: true },
    config: { duration: 25000 }
  })

  const planet2 = useSpring({
    from: { x: 150, y: 50 },
    to: { x: -150, y: -150 },
    loop: { reverse: true },
    config: { duration: 30000 }
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
      await new Promise(r => setTimeout(r, 1500))
      setSuccess('Reset link sent! Check email 📧')
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

      {isLoggedIn ? (
        <div className="relative w-full max-w-4xl mx-auto z-40 my-8 p-6 bg-indigo-950/80 rounded-3xl shadow-2xl backdrop-blur-lg border border-cyan-500/30">
          {/* Animated background planets */}
          <animated.div className="absolute -left-20 -top-20 text-8xl opacity-60" style={planet1}>🪐</animated.div>
          <animated.div className="absolute -right-16 bottom-10 text-7xl opacity-70" style={planet2}>🌑</animated.div>

          {/* Cute astronaut character */}
          <div className="text-8xl mb-6 mx-auto w-fit animate-bounce-slow">🧑‍🚀</div>

          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-300 text-center">
            Welcome back, Astronaut {currentUser}!
          </h1>

          <p className="text-lg md:text-xl mb-8 text-cyan-200 text-center">
            Mission Control • All Systems Nominal
          </p>

          {/* Progress Gauges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/5 p-5 rounded-2xl border border-cyan-500/30">
              <div className="text-sm mb-2 text-cyan-300">Fuel Level</div>
              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 w-[92%]" />
              </div>
              <div className="text-right text-sm mt-1">92%</div>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-purple-500/30">
              <div className="text-sm mb-2 text-purple-300">Oxygen</div>
              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-4 w-[98%]" />
              </div>
              <div className="text-right text-sm mt-1">98%</div>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-green-500/30">
              <div className="text-sm mb-2 text-green-300">Shield</div>
              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 w-[85%]" />
              </div>
              <div className="text-right text-sm mt-1">85%</div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mx-auto block px-12 py-5 bg-red-600/80 hover:bg-red-700 rounded-2xl text-xl font-bold transition"
          >
            Log Out
          </button>
        </div>
      ) : isSignUp ? (
        <div className={`glass rounded-3xl p-10 w-full max-w-md z-10 shadow-2xl transition-all ${shake ? 'animate-shake' : ''}`}>
          {/* your sign-up form code remains the same */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold tracking-widest mb-2">JOIN THE FLEET</h1>
            <p className="text-cyan-300 text-sm">Create your cosmic identity</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-cyan-200">Astronaut ID</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400" placeholder="e.g. star_explorer42" required />
            </div>

            <div>
              <label className="block text-sm mb-2 text-cyan-200">Cosmic Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400" placeholder="you@galaxy.mail" required />
            </div>

            <div>
              <label className="block text-sm mb-2 text-cyan-200">Create Secret Code</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400" placeholder="••••••••" required />
            </div>

            <MiniSpaceGame password={password} />

            {error && <p className="text-red-400 text-center font-medium animate-pulse">{error}</p>}
            {success && <p className="text-green-400 text-center font-medium">{success}</p>}

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 py-4 rounded-2xl font-bold text-lg tracking-widest transition-all disabled:opacity-70">
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="animate-spin text-2xl">🪐</span> Creating Account...
                </div>
              ) : 'Join the Space Fleet'}
            </button>

            <button type="button" onClick={() => setIsSignUp(false)} className="text-cyan-300 hover:text-cyan-200 text-sm underline block mx-auto mt-4">
              ← Already have an account? Login
            </button>
          </form>
        </div>
      ) : isForgot ? (
        <div className={`glass rounded-3xl p-10 w-full max-w-md z-10 shadow-2xl transition-all ${shake ? 'animate-shake' : ''}`}>
          {/* forgot password form - unchanged */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-widest mb-2">Reset Password</h1>
            <p className="text-cyan-300 text-sm">Enter your cosmic email</p>
          </div>

          <form onSubmit={handleForgot} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-cyan-200">Cosmic Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400" placeholder="you@starfleet.com" required />
            </div>

            {error && <p className="text-red-400 text-center font-medium">{error}</p>}
            {success && <p className="text-green-400 text-center font-medium">{success}</p>}

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 py-4 rounded-2xl font-bold text-lg tracking-widest disabled:opacity-70">
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="animate-spin text-2xl">🪐</span> Sending...
                </div>
              ) : 'SEND RESET BEACON'}
            </button>

            <button type="button" onClick={() => setIsForgot(false)} className="text-cyan-300 hover:text-cyan-200 text-sm underline block mx-auto mt-4">
              ← Back to Login
            </button>
          </form>
        </div>
      ) : (
        <div className={`glass rounded-3xl p-10 w-full max-w-md z-10 shadow-2xl transition-all ${shake ? 'animate-shake' : ''}`}>
          {/* login form - unchanged */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold tracking-widest mb-2">SPACE LOGIN</h1>
            <p className="text-cyan-300 text-sm">Enter the cosmos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-cyan-200">Astronaut ID (Username)</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400" placeholder="e.g. neil_armstrong" required />
            </div>

            <div>
              <label className="block text-sm mb-2 text-cyan-200">Secret Code (Password)</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400" placeholder="••••••••" required />
            </div>

            <MiniSpaceGame password={password} />

            {error && <p className="text-red-400 text-center font-medium animate-pulse">{error}</p>}
            {success && <p className="text-green-400 text-center font-medium">{success}</p>}

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 py-4 rounded-2xl font-bold text-lg tracking-widest transition-all active:scale-95 disabled:opacity-70">
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="animate-spin text-2xl">🪐</span> Launching...
                </div>
              ) : 'LAUNCH MISSION'}
            </button>

            <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm mt-6">
              <button type="button" onClick={() => setIsForgot(true)} className="text-cyan-300 hover:text-cyan-200 underline">
                Forgot password?
              </button>
              <button type="button" onClick={() => setIsSignUp(true)} className="text-cyan-300 hover:text-cyan-200 underline">
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

      {!isLoggedIn && <FloatingCharacters mousePos={mousePos} />}

      {success && !isLoggedIn && (
        <animated.div style={rocketLaunch} className="fixed bottom-20 right-20 text-8xl z-20 pointer-events-none">
          🚀
        </animated.div>
      )}
    </div>
  )
}

export default App