import { useState } from 'react'
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
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)

  const rocketLaunch = useSpring({
    from: { transform: 'translateX(0px) rotate(0deg)' },
    to: success ? { transform: 'translateX(800px) translateY(-300px) rotate(-45deg)' } : { transform: 'translateX(0px) rotate(0deg)' },
    config: { tension: 80, friction: 20 },
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
        setTimeout(() => {
          alert('🎉 You are now in space! (Demo login successful)')
        }, 1500)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!')
      setShake(true)
      setTimeout(() => setShake(false), 600)
    } finally {
      setLoading(false)
    }
  }

  const handleForgot = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${API_URL}/forgot-password/`, { email })
      setSuccess(res.data.message)
      setIsForgot(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <AnimatedBackground />
      <FloatingCharacters />

      <div className={`glass rounded-3xl p-10 w-full max-w-md z-10 shadow-2xl transition-all ${shake ? 'animate-shake' : ''}`}>
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold tracking-widest mb-2">SPACE LOGIN</h1>
          <p className="text-cyan-300 text-sm">Enter the cosmos</p>
        </div>

        {!isForgot ? (
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
              {loading ? 'LAUNCHING...' : 'LAUNCH MISSION'}
            </button>

            <button
              type="button"
              onClick={() => setIsForgot(true)}
              className="text-cyan-300 hover:text-cyan-200 text-sm underline block mx-auto"
            >
              Forgot your secret code?
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgot} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-cyan-200">Your Cosmic Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400"
                placeholder="you@starfleet.com"
                required
              />
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}
            {success && <p className="text-green-400 text-center">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 py-4 rounded-2xl font-bold text-lg tracking-widest"
            >
              SEND RESET BEACON
            </button>

            <button
              type="button"
              onClick={() => { setIsForgot(false); setSuccess(''); setError('') }}
              className="text-cyan-300 hover:text-cyan-200 text-sm underline block mx-auto"
            >
              ← Back to Login
            </button>
          </form>
        )}
      </div>

      {success && (
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