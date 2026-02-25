import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars = []
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.8 + 0.2
      })
    }

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star, i) => {
        ctx.fillStyle = `rgba(255,255,255,${star.opacity + Math.sin(frame / 20 + i) * 0.3})`
        ctx.fillRect(star.x, star.y, star.size, star.size)

        star.y += star.speed
        if (star.y > canvas.height) star.y = 0
      })

      ctx.fillStyle = '#4f46e5'
      ctx.beginPath()
      ctx.arc(300 + Math.sin(frame / 100) * 30, 200, 35, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#22d3ee'
      ctx.beginPath()
      ctx.arc(900 + Math.cos(frame / 80) * 20, 500, 28, 0, Math.PI * 2)
      ctx.fill()

      frame++
      requestAnimationFrame(animate)
    }
    animate()

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}