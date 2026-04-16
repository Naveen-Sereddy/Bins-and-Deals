import { useEffect, useRef, useState, useCallback } from 'react'
import {
  motion, useInView, useScroll, useTransform,
  useMotionValue, useSpring, AnimatePresence, animate,
} from 'framer-motion'
import {
  Phone, MapPin, Clock, Tag, ChevronDown, ChevronUp, Star, Zap, ArrowRight,
  Shirt, Tv, Home, Gamepad2, Baby, Dumbbell, BookOpen, ShoppingBag, Menu, X,
  Wrench, Sparkles, CreditCard, Banknote, RefreshCw,
} from 'lucide-react'
import pricingPoster from './assets/pricing-poster.jpg'

// ─── Constants ───────────────────────────────────────────────────────────────
const MINT   = '#00C896'
const GOLD   = '#FFD700'
const DARK   = '#050505'
const DARK2  = '#0a0f0a'

// ─── Animation variants ──────────────────────────────────────────────────────
const fadeUp    = { hidden: { opacity: 0, y: 55 },  visible: { opacity: 1, y: 0,  transition: { duration: 0.7,  ease: [0.16, 1, 0.3, 1] } } }
const slideLeft = { hidden: { opacity: 0, x: -65 }, visible: { opacity: 1, x: 0,  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } } }
const slideRight= { hidden: { opacity: 0, x: 65 },  visible: { opacity: 1, x: 0,  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } } }
const scaleIn   = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } } }
const stagger   = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const staggerSlow = { hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } } }


// ─── Animated gradient mesh background ───────────────────────────────────────
function MeshBackground({ opacity = 0.7 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
      {/* Blob 1 — teal */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,200,150,0.18) 0%, transparent 65%)',
          top: '-15%', left: '-10%',
        }}
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Blob 2 — green */}
      <motion.div
        className="absolute w-[550px] h-[550px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 120, 80, 0.14) 0%, transparent 65%)',
          top: '30%', right: '-8%',
        }}
        animate={{ x: [0, -50, 40, 0], y: [0, 60, -30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      {/* Blob 3 — gold hint */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.06) 0%, transparent 65%)',
          bottom: '10%', left: '30%',
        }}
        animate={{ x: [0, 40, -60, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
      />
      {/* Blob 4 — deep teal */}
      <motion.div
        className="absolute w-[480px] h-[480px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,200,150,0.09) 0%, transparent 65%)',
          top: '55%', left: '55%',
        }}
        animate={{ x: [0, -40, 60, 0], y: [0, 40, -60, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  )
}

// ─── Floating particles ───────────────────────────────────────────────────────
function Particles({ count = 22 }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      dur: 6 + Math.random() * 14,
      delay: Math.random() * 10,
      dx: (Math.random() - 0.5) * 8,
      dy: -(4 + Math.random() * 10),
    }))
  ).current

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 5 === 0 ? `rgba(255,215,0,0.55)` : `rgba(0,200,150,0.5)`,
            boxShadow: p.id % 5 === 0
              ? `0 0 ${p.size * 3}px rgba(255,215,0,0.6)`
              : `0 0 ${p.size * 3}px rgba(0,200,150,0.6)`,
          }}
          animate={{ y: [`0%`, `${p.dy * 10}%`], x: [`0%`, `${p.dx * 3}%`], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Section divider ──────────────────────────────────────────────────────────
function SectionDivider() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="relative h-px overflow-hidden">
      <motion.div
        className="section-glow-divider absolute inset-0"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, className = '', id = '', variants = stagger }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} id={id} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter({ text, className = '', delay = 0 }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted]     = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, 45)
    return () => clearInterval(interval)
  }, [started, text])

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && started && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-[1em] bg-[#00C896] ml-0.5 align-middle"
        />
      )}
    </span>
  )
}

// ─── Counter ─────────────────────────────────────────────────────────────────
function Counter({ to, suffix = '', duration = 1.8 }) {
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const isK = String(to).includes('k') || suffix === 's'
    const numericTo = typeof to === 'number' ? to : parseFloat(to) || 99
    const ctrl = animate(0, numericTo, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => ctrl.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {val}{suffix}
    </span>
  )
}

// ─── ANNOUNCEMENT BANNER ─────────────────────────────────────────────────────
const BANNER_H = 36

function AnnouncementBanner() {
  const text = '🎉 New Items Every Week! \u00a0|\u00a0 💰 Prices Starting at $2 \u00a0|\u00a0 📍 Liberty, MO \u00a0|\u00a0 🛍️ Open 7 Days a Week \u00a0|\u00a0 Come Visit Us Today! \u00a0\u00a0\u00a0\u00a0'
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70] overflow-hidden flex items-center"
      style={{ height: BANNER_H, background: MINT }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-white font-bold text-xs uppercase tracking-wider pr-0" style={{ letterSpacing: '0.06em' }}>
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── NEW STOCK BADGE (just below hero) ───────────────────────────────────────
function NewStockBanner() {
  return (
    <div
      className="relative py-4 flex items-center justify-center overflow-hidden"
      style={{ background: 'rgba(0,200,150,0.05)', borderTop: '1px solid rgba(0,200,150,0.1)', borderBottom: '1px solid rgba(0,200,150,0.1)' }}
    >
      <div className="relative inline-flex items-center gap-3 px-6 py-2 rounded-full"
        style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)' }}>
        {/* Outer pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'rgba(0,200,150,0.18)' }}
          animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* Second ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'rgba(0,200,150,0.1)' }}
          animate={{ scale: [1, 1.75], opacity: [0.35, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <RefreshCw size={14} color={MINT} />
        </motion.div>
        <span className="relative text-[#00C896] font-black text-sm uppercase tracking-widest">
          New Stock Added Every Week — Stop In &amp; Discover Fresh Deals!
        </span>
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="relative w-2 h-2 rounded-full bg-[#00C896]"
        />
      </div>
    </div>
  )
}

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: 'rgba(5,5,5,0.8)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0,200,150,0.35)',
            boxShadow: '0 4px 24px rgba(0,200,150,0.28), 0 2px 8px rgba(0,0,0,0.5)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(0,200,150,0.7)'
            e.currentTarget.style.boxShadow   = '0 6px 32px rgba(0,200,150,0.5), 0 2px 8px rgba(0,0,0,0.6)'
            e.currentTarget.style.transform   = 'translateY(-3px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(0,200,150,0.35)'
            e.currentTarget.style.boxShadow   = '0 4px 24px rgba(0,200,150,0.28), 0 2px 8px rgba(0,0,0,0.5)'
            e.currentTarget.style.transform   = 'translateY(0)'
          }}
          aria-label="Back to top"
        >
          <ChevronUp size={20} color={MINT} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ─── PAYMENT METHODS ──────────────────────────────────────────────────────────
function PaymentMethods() {
  const methods = [
    {
      icon: <Banknote size={26} color={MINT} />,
      label: 'Cash',
    },
    {
      icon: <CreditCard size={26} color={MINT} />,
      label: 'Credit & Debit',
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ),
      label: 'Apple Pay',
    },
  ]

  return (
    <div
      className="py-8 px-5 sm:px-8"
      style={{ background: '#020408', borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
        <p className="text-gray-600 text-xs font-bold uppercase tracking-[0.18em] shrink-0">We Accept</p>
        <div className="w-px h-4 bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-6 sm:gap-10 flex-wrap justify-center">
          {methods.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:border-[rgba(0,200,150,0.35)]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {icon}
              </div>
              <span className="text-gray-500 text-sm font-semibold group-hover:text-gray-300 transition-colors">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navTop, setNavTop] = useState(BANNER_H)

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      setNavTop(y >= BANNER_H ? 0 : BANNER_H - y)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'About',        href: '#about' },
    { label: 'What We Sell', href: '#products' },
    { label: 'Pricing',      href: '#pricing' },
    { label: 'Hours',        href: '#hours' },
    { label: 'Find Us',      href: '#location' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ top: navTop }}
      className={`fixed left-0 right-0 z-50 transition-[background,border,box-shadow] duration-300 ${scrolled ? 'glass-scrolled' : 'glass'}`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[68px]">

        <a href="#hero" className="shrink-0">
          <span
            className="text-[1.65rem] font-normal whitespace-nowrap leading-none text-gradient"
            style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '0.02em' }}
          >
            BINS & DEALS
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link text-[0.75rem] font-semibold text-gray-500 hover:text-[#00C896] transition-colors uppercase tracking-[0.14em]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          {/* Facebook Page */}
          <a
            href="https://www.facebook.com/share/18VwrorqFD/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook Page"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 hover:bg-[#1877F2]/25 hover:border-[#1877F2]/60 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
          </a>
          {/* Facebook Marketplace */}
          <a
            href="https://www.facebook.com/share/1Ao34Qrcpi/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook Marketplace"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 hover:bg-[#1877F2]/25 hover:border-[#1877F2]/60 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#0866FF"/>
              <path d="M16 7C11.029 7 7 11.029 7 16v1h18v-1c0-4.971-4.029-9-9-9z" fill="white"/>
              <rect x="7" y="18.5" width="8" height="6.5" rx="1.5" fill="white"/>
              <rect x="17" y="18.5" width="8" height="6.5" rx="1.5" fill="white"/>
            </svg>
          </a>
          <a
            href="tel:8162224238"
            className="flex items-center gap-2 bg-mint-gradient text-white font-bold px-5 py-2.5 rounded-full text-sm uppercase tracking-wider hover:opacity-90 transition-opacity glow-mint-lg"
          >
            <Phone size={13} strokeWidth={2.5} /> Call Us
          </a>
        </div>

        <button
          className="lg:hidden text-gray-400 p-2 rounded-xl hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="lg:hidden overflow-hidden border-t border-white/5"
            style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(28px)' }}
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                  className="text-base font-semibold text-gray-400 hover:text-[#00C896] transition-colors uppercase tracking-wider">
                  {l.label}
                </a>
              ))}
              <a href="tel:8162224238"
                className="flex items-center justify-center gap-2 bg-mint-gradient text-white font-bold px-5 py-3.5 rounded-full text-sm uppercase tracking-wider mt-1 glow-mint-lg">
                <Phone size={15} /> (816) 222-4238
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY            = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const contentY       = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])

  const floatingTags = [
    { size: 34, top: '14%',  left:  '5%',  delay: 0,   dur: 5.5 },
    { size: 48, top: '16%',  right: '7%',  delay: 0.8, dur: 6.2 },
    { size: 26, top: '58%',  left:  '3%',  delay: 1.3, dur: 4.8 },
    { size: 40, top: '68%',  right: '5%',  delay: 0.4, dur: 5.8 },
    { size: 20, top: '40%',  left:  '14%', delay: 1.7, dur: 4.2 },
    { size: 32, top: '78%',  left:  '24%', delay: 0.6, dur: 7 },
    { size: 24, top: '32%',  right: '17%', delay: 1,   dur: 5.2 },
  ]

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20 grid-texture"
      style={{ background: DARK }}
    >
      {/* Animated mesh */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <MeshBackground opacity={1} />
        <Particles count={28} />
      </motion.div>

      {/* Spotlight behind text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,200,150,0.11) 0%, transparent 65%)' }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto pt-32"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-8"
          style={{ background: 'rgba(0,200,150,0.07)', border: '1px solid rgba(0,200,150,0.22)' }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-[#00C896]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="text-[#00C896] text-xs font-bold uppercase tracking-[0.18em]">
            Liberty, MO's Best Deals
          </span>
          <Zap size={12} color={GOLD} fill={GOLD} />
        </motion.div>

        {/* Neon headline — green-to-gold gradient with glow */}
        <motion.h1
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-neon-hero text-[clamp(3rem,11vw,9rem)] leading-[0.92] tracking-tight mb-6 whitespace-nowrap"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
        >
          BINS & DEALS
        </motion.h1>

        {/* Typewriter tagline */}
        <div className="text-[clamp(1rem,2.6vw,1.55rem)] font-bold text-white mb-3 uppercase tracking-[0.12em] min-h-[2em] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <Typewriter
              text="Big Savings. Real Deals. Every Day."
              delay={0.7}
            />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-gray-500 text-lg mb-10 max-w-lg mx-auto leading-relaxed"
        >
          New, refurbished &amp; used products at unbeatable prices, right here in Liberty, MO.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Pulsing Shop Now — green-to-gold gradient */}
          <div className="relative inline-flex">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: 'rgba(0,200,150,0.38)' }}
              animate={{ scale: [1, 1.6], opacity: [0.55, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: 'rgba(255,215,0,0.18)' }}
              animate={{ scale: [1, 1.9], opacity: [0.35, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            />
            <a
              href="#products"
              className="relative flex items-center gap-2.5 text-white font-black px-9 py-4 rounded-full text-base uppercase tracking-wider hover:opacity-90 transition-opacity"
              style={{
                background: 'linear-gradient(135deg, #00C896 0%, #00e0a8 45%, #FFD700 100%)',
                boxShadow: '0 6px 30px rgba(0,200,150,0.45), 0 2px 8px rgba(255,215,0,0.2)',
              }}
            >
              Shop Now <ArrowRight size={18} strokeWidth={2.5} />
            </a>
          </div>

          {/* Glass border "Call Us" */}
          <a
            href="tel:8162224238"
            className="flex items-center gap-2.5 font-bold px-8 py-4 rounded-full text-base transition-all text-white"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.14)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,200,150,0.09)'
              e.currentTarget.style.borderColor = 'rgba(0,200,150,0.45)'
              e.currentTarget.style.boxShadow   = '0 0 20px rgba(0,200,150,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background  = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
              e.currentTarget.style.boxShadow   = ''
            }}
          >
            <Phone size={17} color={MINT} strokeWidth={2.5} />
            (816) 222-4238
          </a>
        </motion.div>

        {/* Hours pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full px-5 py-2 text-gray-500 text-sm"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <Clock size={13} color={MINT} />
          Mon to Sat 10AM to 8PM &nbsp;·&nbsp; Sun 11AM to 7PM
        </motion.div>
      </motion.div>

      {/* Floating tag icons */}
      {floatingTags.map(({ size, top, left, right, delay, dur }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ top, left, right, opacity: 0.1 + (i % 3) * 0.04 }}
          animate={{ y: [0, -18, 0], rotate: [0, i % 2 === 0 ? 10 : -7, 0] }}
          transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <Tag size={size} color={MINT} strokeWidth={1.5} />
        </motion.div>
      ))}

      {/* Scroll caret */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.7, repeat: Infinity }}
          style={{ color: 'rgba(0,200,150,0.4)' }}
        >
          <ChevronDown size={30} />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  const stats = [
    { rawValue: 99, suffix: '+', display: '1000s', label: 'Items In Stock',    icon: '📦', useDisplay: true },
    { rawValue: 50, suffix: '%', label: 'Off Retail Prices', icon: '💰', useDisplay: true, display: '40–50%' },
    { rawValue: 8,  suffix: '',   label: 'Categories',        icon: '🏷️' },
    { rawValue: 7,  suffix: '',   label: 'Days a Week',        icon: '📅' },
  ]

  return (
    <>
      <SectionDivider />
      <section id="about" className="py-28 overflow-hidden section-alt relative">
        <MeshBackground opacity={0.4} />
        <Particles count={10} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <Reveal variants={stagger}>
              <motion.p variants={slideLeft} className="text-[#00C896] font-bold uppercase tracking-[0.2em] text-xs mb-5">
                About Us
              </motion.p>
              <motion.h2
                variants={slideLeft}
                className="text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] text-gradient heading-underline mb-8"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                YOUR LOCAL<br />DEAL DESTINATION
              </motion.h2>
              <motion.p variants={slideLeft} className="text-gray-400 text-lg leading-relaxed mb-5">
                At <strong className="text-white font-bold">Bins and Deals</strong>, we believe everyone deserves
                access to quality products without breaking the bank. Our store is packed with{' '}
                <strong style={{ color: MINT }} className="font-bold">new, refurbished, and gently used items</strong>{' '}
                across every category, all priced far below retail.
              </motion.p>
              <motion.p variants={slideLeft} className="text-gray-400 text-lg leading-relaxed mb-9">
                Whether you're hunting for electronics, home goods, clothing, or toys, you'll always find
                something worth grabbing at a price you won't believe. Deals change constantly, so every
                visit is a new adventure.
              </motion.p>
              <motion.a
                variants={slideLeft}
                href="tel:8162224238"
                className="inline-flex items-center gap-3 bg-mint-gradient text-white font-black px-8 py-4 rounded-full text-sm uppercase tracking-wider glow-mint-lg hover:opacity-90 transition-opacity"
              >
                <Phone size={16} strokeWidth={2.5} /> Call Us Today
              </motion.a>
            </Reveal>

            <Reveal variants={staggerSlow}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => {
                  const ref = useRef(null)
                  const inView = useInView(ref, { once: true })
                  const [count, setCount] = useState(0)

                  useEffect(() => {
                    if (!inView) return
                    const ctrl = animate(0, s.rawValue, {
                      duration: 1.8,
                      ease: [0.16, 1, 0.3, 1],
                      onUpdate: v => setCount(Math.round(v)),
                    })
                    return () => ctrl.stop()
                  }, [inView])

                  return (
                    <motion.div
                      key={s.label}
                      ref={ref}
                      variants={slideRight}
                      className="card p-7 text-center cursor-default"
                    >
                      <div className="text-3xl mb-3">{s.icon}</div>
                      <div
                        className="text-[clamp(2.4rem,5vw,3.5rem)] font-black text-gradient leading-none mb-2"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {s.useDisplay ? s.display : `${count}${s.suffix}`}
                      </div>
                      <div className="text-gray-600 text-xs font-semibold uppercase tracking-wider">{s.label}</div>
                    </motion.div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
function Products() {
  const categories = [
    { icon: Tv,       label: 'Electronics',          desc: 'TVs, tablets, phones, gaming gear & more' },
    { icon: Shirt,    label: 'Clothing & Apparel',   desc: 'Brand-name clothing for the whole family' },
    { icon: Gamepad2, label: 'Toys & Games',         desc: 'Board games, action figures, outdoor play' },
    { icon: Home,     label: 'Home & Kitchen',       desc: 'Appliances, décor, cookware & furniture' },
    { icon: Wrench,   label: 'Tools & Hardware',     desc: 'Hand tools, power tools & hardware supplies' },
    { icon: Sparkles, label: 'Beauty & Personal Care', desc: 'Skincare, hair care, grooming & wellness' },
    { icon: Baby,     label: 'Baby & Kids',          desc: 'Gear, clothing, toys & nursery essentials' },
  ]

  return (
    <>
      <SectionDivider />
      <section id="products" className="py-28 relative" style={{ background: DARK }}>
        <Particles count={12} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

          <Reveal variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-[#00C896] font-bold uppercase tracking-[0.2em] text-xs mb-5">
              What We Sell
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(3rem,8vw,7rem)] leading-[0.92] text-gradient"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              SOMETHING FOR<br />EVERYONE
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-xl mx-auto mt-5">
              Thousands of items across every category, new, refurbished, and used, all at prices that
              will make you do a double-take.
            </motion.p>
          </Reveal>

          <Reveal variants={staggerSlow}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map(({ icon: Icon, label, desc }) => (
                <motion.div
                  key={label}
                  variants={scaleIn}
                  className="card p-6 cursor-default group"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.15)' }}
                  >
                    <Icon size={22} color={MINT} className="group-hover:drop-shadow-[0_0_8px_rgba(0,200,150,0.9)] transition-all duration-300" />
                  </div>
                  <h3 className="font-black text-white text-base mb-1.5 leading-tight">{label}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Banner */}
          <Reveal variants={stagger} className="mt-14">
            <motion.div
              variants={scaleIn}
              className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center"
              style={{
                background: 'linear-gradient(135deg, #00C896 0%, #007A5A 100%)',
                boxShadow: '0 20px 80px rgba(0,200,150,0.3), 0 4px 24px rgba(0,0,0,0.6)',
              }}
            >
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/8 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full" style={{ background: 'rgba(255,215,0,0.08)', filter: 'blur(48px)' }} />
              <div className="relative z-10">
                <div className="flex justify-center gap-1.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} color={GOLD} fill={GOLD} />
                  ))}
                </div>
                <h3
                  className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-black text-white leading-none mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  NEW INVENTORY EVERY WEEK
                </h3>
                <p className="text-white/70 text-lg font-medium mb-8 max-w-lg mx-auto">
                  Deals change constantly, stop in often or give us a call to hear about our latest arrivals.
                </p>
                <a
                  href="tel:8162224238"
                  className="inline-flex items-center gap-3 font-black px-9 py-4 rounded-full text-sm uppercase tracking-wider transition-all"
                  style={{ background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
                >
                  <Phone size={16} strokeWidth={2.5} /> (816) 222-4238
                </a>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

// ─── TREASURE HUNT PRICING ───────────────────────────────────────────────────
function TreasureHunt() {
  const tags = [
    { color: '#E53935', colorLight: '#ef5350', colorDark: '#b71c1c', label: 'RED TAG',    price: '$9', shadow: 'rgba(229,57,53,0.55)',   glow: 'rgba(229,57,53,0.35)' },
    { color: '#8E24AA', colorLight: '#ab47bc', colorDark: '#6a1b9a', label: 'PURPLE TAG', price: '$7', shadow: 'rgba(142,36,170,0.55)',  glow: 'rgba(142,36,170,0.35)' },
    { color: '#1E88E5', colorLight: '#42a5f5', colorDark: '#1565c0', label: 'BLUE TAG',   price: '$5', shadow: 'rgba(30,136,229,0.55)',  glow: 'rgba(30,136,229,0.35)' },
    { color: '#43A047', colorLight: '#66bb6a', colorDark: '#2e7d32', label: 'GREEN TAG',  price: '$3', shadow: 'rgba(67,160,71,0.55)',   glow: 'rgba(67,160,71,0.35)' },
    { color: '#F9A825', colorLight: '#ffca28', colorDark: '#e65100', label: 'YELLOW TAG', price: '$2', shadow: 'rgba(249,168,37,0.55)',  glow: 'rgba(249,168,37,0.35)' },
  ]

  return (
    <>
      <SectionDivider />
      <section id="pricing" className="py-28 overflow-hidden section-alt relative">
        <MeshBackground opacity={0.35} />
        <Particles count={14} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

          <Reveal variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-[#00C896] font-bold uppercase tracking-[0.2em] text-xs mb-5">
              Pricing System
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(2.4rem,5.5vw,4.8rem)] leading-tight text-gradient max-w-3xl mx-auto mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Treasure Hunt Savings, The Lower The Color, The Bigger The Deal!
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-2xl mx-auto">
              Every item is color-tagged for easy pricing. No guessing, no haggling, just grab your
              favorites and save big. New items added every week!
            </motion.p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <Reveal variants={stagger}>
              <motion.div
                variants={slideLeft}
                className="rounded-3xl overflow-hidden w-full"
                style={{ boxShadow: '0 24px 80px rgba(0,200,150,0.12), 0 4px 24px rgba(0,0,0,0.7)' }}
              >
                <img src={pricingPoster} alt="Treasure Hunt Pricing System" className="w-full h-full object-cover" />
              </motion.div>
            </Reveal>

            <Reveal variants={staggerSlow}>
              <div className="flex flex-col gap-3.5">
                {tags.map(({ color, colorLight, colorDark, label, price, shadow, glow }) => (
                  <motion.div
                    key={label}
                    variants={{
                      hidden: { opacity: 0, x: 60, scale: 0.93 },
                      visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="group flex items-center gap-5 rounded-2xl px-5 py-4 cursor-default transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background    = `rgba(${color.replace('#','').match(/.{2}/g).map(h=>parseInt(h,16)).join(',')}, 0.07)`
                      e.currentTarget.style.borderColor   = color + '55'
                      e.currentTarget.style.boxShadow     = `0 12px 50px ${glow}, 0 0 0 1px ${color}33, 0 2px 16px rgba(0,0,0,0.5)`
                      e.currentTarget.style.transform     = 'translateY(-4px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background    = 'rgba(255,255,255,0.03)'
                      e.currentTarget.style.borderColor   = 'rgba(255,255,255,0.06)'
                      e.currentTarget.style.boxShadow     = '0 2px 16px rgba(0,0,0,0.4)'
                      e.currentTarget.style.transform     = 'translateY(0)'
                    }}
                  >
                    {/* 3D glossy orb */}
                    <div
                      className="badge-3d badge-shine w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(145deg, ${colorLight} 0%, ${colorDark} 100%)`,
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.18), 0 6px 22px ${shadow}`,
                      }}
                    >
                      <Tag size={20} color="white" strokeWidth={2} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-black text-white text-base uppercase tracking-wide leading-none mb-1">{label}</p>
                      <p className="text-gray-700 text-xs font-medium">Color-coded price tag</p>
                    </div>

                    {/* 3D price pill */}
                    <div
                      className="badge-3d badge-shine shrink-0 px-5 py-2.5 rounded-xl"
                      style={{
                        background: `linear-gradient(145deg, ${colorLight} 0%, ${colorDark} 100%)`,
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 6px 20px ${shadow}`,
                      }}
                    >
                      <span className="text-white font-black text-2xl leading-none">{price}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.p variants={fadeUp} className="text-gray-700 text-xs mt-5 text-center lg:text-left">
                * Prices subject to change. Ask a team member about current color rotation.
              </motion.p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── HOURS ───────────────────────────────────────────────────────────────────
function Hours() {
  const days = [
    { day: 'Monday',    hours: '10:00 AM to 8:00 PM' },
    { day: 'Tuesday',   hours: '10:00 AM to 8:00 PM' },
    { day: 'Wednesday', hours: '10:00 AM to 8:00 PM' },
    { day: 'Thursday',  hours: '10:00 AM to 8:00 PM' },
    { day: 'Friday',    hours: '10:00 AM to 8:00 PM' },
    { day: 'Saturday',  hours: '10:00 AM to 8:00 PM' },
    { day: 'Sunday',    hours: '11:00 AM to 7:00 PM' },
  ]
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <>
      <SectionDivider />
      <section id="hours" className="py-28 relative" style={{ background: DARK }}>
        <Particles count={10} />
        <div className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10">

          <Reveal variants={stagger} className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-[#00C896] font-bold uppercase tracking-[0.2em] text-xs mb-5">
              Store Hours
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(3rem,7vw,6rem)] leading-none text-gradient heading-underline"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              COME SEE US
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg mt-6">
              Open 7 days a week, because deals don't take days off.
            </motion.p>
          </Reveal>

          <Reveal variants={stagger}>
            <motion.div
              variants={scaleIn}
              className="rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 20px 80px rgba(0,200,150,0.14), 0 4px 24px rgba(0,0,0,0.7)', border: '1px solid rgba(0,200,150,0.1)' }}
            >
              {/* Header */}
              <div
                className="px-8 py-6 flex items-center justify-between"
                style={{ background: 'linear-gradient(135deg, #00C896 0%, #007A5A 100%)' }}
              >
                <div className="flex items-center gap-3">
                  <Clock size={22} color="rgba(255,255,255,0.8)" />
                  <span className="text-white font-black text-lg uppercase tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    Weekly Schedule
                  </span>
                </div>
                <span
                  className="text-[#050505] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider"
                  style={{ background: GOLD, boxShadow: `0 4px 16px rgba(255,215,0,0.45)` }}
                >
                  Open Now
                </span>
              </div>

              {/* Rows */}
              <div style={{ background: 'rgba(255,255,255,0.025)' }} className="divide-y divide-white/5">
                {days.map(({ day, hours }, idx) => {
                  const isToday = day === today
                  return (
                    <motion.div
                      key={day}
                      variants={{
                        hidden: { opacity: 0, x: -22 },
                        visible: { opacity: 1, x: 0, transition: { delay: idx * 0.07, duration: 0.45 } },
                      }}
                      className="flex items-center justify-between px-8 py-4 transition-colors"
                      style={isToday ? { background: 'rgba(0,200,150,0.07)' } : {}}
                    >
                      <div className="flex items-center gap-3">
                        {isToday && (
                          <span
                            className="text-[#050505] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide"
                            style={{ background: GOLD }}
                          >
                            Today
                          </span>
                        )}
                        <span className={`font-bold text-[0.95rem] ${isToday ? 'text-[#00C896]' : 'text-gray-300'}`}>{day}</span>
                      </div>
                      <span className={`font-semibold text-sm tabular-nums ${isToday ? 'text-[#00C896] font-black' : 'text-gray-600'}`}>
                        {hours}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer */}
              <div
                className="px-8 py-4 flex items-center justify-between"
                style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(0,200,150,0.08)' }}
              >
                <p className="text-gray-700 text-xs">Holiday hours may vary</p>
                <a href="tel:8162224238" className="flex items-center gap-2 text-[#00C896] text-xs font-bold hover:underline">
                  <Phone size={12} strokeWidth={2.5} /> Call to confirm
                </a>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

// ─── LOCATION ────────────────────────────────────────────────────────────────
function Location() {
  const cards = [
    {
      icon: MapPin,
      title: '892 Rte 291',
      sub: 'Liberty, MO 64068',
      detail: 'Next to Dollar Tree and Price Chopper',
      link: { text: 'Open in Google Maps ↗', href: 'https://maps.google.com/?q=892+Rte+291+Liberty+MO+64068' },
    },
    {
      icon: Phone,
      title: '(816) 222-4238',
      sub: 'Give us a call anytime',
      link: { text: 'Call Now', href: 'tel:8162224238' },
    },
    {
      icon: Clock,
      title: 'Mon to Sat: 10AM to 8PM',
      sub: 'Sunday: 11AM to 7PM',
      detail: 'Open 7 days a week',
    },
  ]

  return (
    <>
      <SectionDivider />
      <section id="location" className="py-28 overflow-hidden section-alt relative">
        <MeshBackground opacity={0.3} />
        <Particles count={10} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

          <Reveal variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-[#00C896] font-bold uppercase tracking-[0.2em] text-xs mb-5">
              Find Us
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(3rem,7vw,6rem)] leading-none text-gradient heading-underline"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              VISIT OUR STORE TODAY
            </motion.h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            <Reveal variants={stagger}>
              {cards.map(({ icon: Icon, title, sub, detail, link }, i) => (
                <motion.div key={i} variants={slideLeft} className="card flex gap-5 p-6 mb-4 last:mb-0">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.2)' }}
                  >
                    <Icon size={18} color={MINT} />
                  </div>
                  <div>
                    <p className="text-white font-black text-base leading-tight mb-0.5">{title}</p>
                    <p className="text-gray-500 text-sm">{sub}</p>
                    {detail && <p className="text-gray-700 text-xs mt-0.5">{detail}</p>}
                    {link && (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1 text-xs font-bold mt-2 hover:underline"
                        style={{ color: MINT }}
                      >
                        {link.text}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
              <motion.a
                variants={slideLeft}
                href="tel:8162224238"
                className="mt-2 inline-flex items-center gap-3 bg-mint-gradient text-white font-black px-8 py-4 rounded-full text-sm uppercase tracking-wider glow-mint-lg hover:opacity-90 transition-opacity"
              >
                <Phone size={16} strokeWidth={2.5} /> Call Us Now
              </motion.a>
            </Reveal>

            <Reveal variants={stagger}>
              <motion.div
                variants={slideRight}
                className="rounded-3xl overflow-hidden"
                style={{
                  height: '480px',
                  boxShadow: '0 20px 70px rgba(0,200,150,0.1), 0 4px 24px rgba(0,0,0,0.7)',
                  border: '1px solid rgba(0,200,150,0.12)',
                }}
              >
                <iframe
                  title="Bins and Deals Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3097.3277858083065!2d-94.40294768428955!3d39.24631547941235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0f4b5b7d0a3d1%3A0x5f9a3b1f2c3d4e5f!2s892+MO-291+S%2C+Liberty%2C+MO+64068!5e0!3m2!1sen!2sus!4v1713000000000!5m2!1sen!2sus"
                />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── FIND US ONLINE ──────────────────────────────────────────────────────────
function FindUsOnline() {
  const cards = [
    {
      accentColor: '#1877F2',
      accentGlow: 'rgba(24,119,242,0.45)',
      accentBorder: 'rgba(24,119,242,0.35)',
      accentBg: 'rgba(24,119,242,0.07)',
      icon: (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <rect width="36" height="36" rx="8" fill="#1877F2"/>
          <path d="M25 18C25 14.134 21.866 11 18 11C14.134 11 11 14.134 11 18C11 21.511 13.558 24.424 16.906 24.917V20.031H15.031V18H16.906V16.363C16.906 14.511 17.991 13.5 19.678 13.5C20.485 13.5 21.328 13.648 21.328 13.648V15.469H20.397C19.478 15.469 19.094 16.033 19.094 16.612V18H21.242L20.819 20.031H19.094V24.917C22.442 24.424 25 21.511 25 18Z" fill="white"/>
        </svg>
      ),
      label: 'Facebook Page',
      heading: 'Follow Us on Facebook',
      desc: 'Stay updated with our latest arrivals, store news, and exclusive deals. Join our community!',
      btnText: 'Visit Our Facebook Page',
      href: 'https://www.facebook.com/share/18VwrorqFD/?mibextid=wwXIfr',
    },
    {
      accentColor: '#00C896',
      accentGlow: 'rgba(0,200,150,0.45)',
      accentBorder: 'rgba(0,200,150,0.35)',
      accentBg: 'rgba(0,200,150,0.07)',
      icon: (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <rect width="36" height="36" rx="8" fill="#00C896"/>
          <path d="M18 10C13.582 10 10 13.582 10 18C10 22.418 13.582 26 18 26C22.418 26 26 22.418 26 18C26 13.582 22.418 10 18 10ZM18 22C15.791 22 14 20.209 14 18C14 15.791 15.791 14 18 14C20.209 14 22 15.791 22 18C22 20.209 20.209 22 18 22Z" fill="white"/>
          <path d="M22 13H24V15H22V13Z" fill="white" opacity="0.7"/>
          <path d="M14 17H17V19H14V17ZM19 17H22V19H19V17ZM17 14H19V17H17V14ZM17 19H19V22H17V19Z" fill="white"/>
        </svg>
      ),
      label: 'Facebook Marketplace',
      heading: 'Shop on Facebook Marketplace',
      desc: 'Browse our exciting product listings at prices cheaper than Amazon. New items added regularly!',
      btnText: 'Browse Our Listings',
      href: 'https://www.facebook.com/share/1Ao34Qrcpi/?mibextid=wwXIfr',
    },
  ]

  return (
    <>
      <SectionDivider />
      <section id="connect" className="py-28 relative" style={{ background: DARK }}>
        <Particles count={12} />
        <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10">

          {/* Header */}
          <Reveal variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-[#00C896] font-bold uppercase tracking-[0.2em] text-xs mb-5">
              Connect With Us
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(3rem,7vw,5.5rem)] leading-none text-gradient heading-underline"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              FIND US ONLINE
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg mt-6">
              Follow along, shop smart, save big!
            </motion.p>
          </Reveal>

          {/* Cards */}
          <Reveal variants={staggerSlow}>
            <div className="grid sm:grid-cols-2 gap-6">
              {cards.map(({ accentColor, accentGlow, accentBorder, accentBg, icon, label, heading, desc, btnText, href }) => (
                <motion.div
                  key={label}
                  variants={scaleIn}
                  className="group relative flex flex-col rounded-3xl p-8 cursor-default transition-all duration-350 overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background   = accentBg
                    e.currentTarget.style.borderColor  = accentBorder
                    e.currentTarget.style.boxShadow    = `0 20px 60px ${accentGlow}, 0 0 0 1px ${accentBorder}, 0 4px 24px rgba(0,0,0,0.6)`
                    e.currentTarget.style.transform    = 'translateY(-8px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background   = 'rgba(255,255,255,0.03)'
                    e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.boxShadow    = '0 4px 30px rgba(0,0,0,0.5)'
                    e.currentTarget.style.transform    = 'translateY(0)'
                  }}
                >
                  {/* Corner glow blob */}
                  <div
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${accentGlow} 0%, transparent 70%)` }}
                  />

                  {/* Icon + label row */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="shrink-0 rounded-2xl p-1 transition-all duration-300 group-hover:scale-110"
                      style={{ boxShadow: `0 6px 24px ${accentGlow}` }}
                    >
                      {icon}
                    </div>
                    <span
                      className="text-xs font-bold uppercase tracking-[0.16em]"
                      style={{ color: accentColor }}
                    >
                      {label}
                    </span>
                  </div>

                  {/* Text */}
                  <h3
                    className="text-white font-black text-xl mb-3 leading-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}
                  >
                    {heading}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
                    {desc}
                  </p>

                  {/* CTA button */}
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 font-black text-white text-sm uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
                      boxShadow: `0 4px 20px ${accentGlow}`,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.opacity = '0.88'
                      e.currentTarget.style.boxShadow = `0 8px 32px ${accentGlow}`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.boxShadow = `0 4px 20px ${accentGlow}`
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    {btnText}
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </a>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-16 px-5 sm:px-8 relative overflow-hidden"
      style={{ background: '#020408' }}
    >
      {/* Green-to-gold top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #00C896 30%, #FFD700 50%, #00C896 70%, transparent 100%)', boxShadow: '0 0 20px rgba(0,200,150,0.5)' }}
      />
      <MeshBackground opacity={0.2} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid sm:grid-cols-3 gap-12 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

          <div>
            <h3
              className="text-[2.2rem] font-normal whitespace-nowrap leading-none mb-4 text-gradient"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
            >
              BINS & DEALS
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your local discount store for new, refurbished, and used products at unbeatable prices in Liberty, MO.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-[0.18em] text-xs mb-5 text-gradient-subtle">Store Hours</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600"><span className="text-gray-300 font-semibold">Mon to Sat:</span> 10:00 AM to 8:00 PM</p>
              <p className="text-gray-600"><span className="text-gray-300 font-semibold">Sunday:</span> 11:00 AM to 7:00 PM</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-[0.18em] text-xs mb-5 text-gradient-subtle">Contact & Location</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-start gap-2.5">
                <MapPin size={14} color={MINT} className="mt-0.5 shrink-0" />
                <span>892 Rte 291, Liberty, MO 64068<br />
                  <span className="text-gray-700 text-xs">Next to Dollar Tree & Price Chopper</span>
                </span>
              </p>
              <a href="tel:8162224238" className="flex items-center gap-2.5 hover:text-[#00C896] transition-colors">
                <Phone size={14} color={MINT} className="shrink-0" />
                (816) 222-4238
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-xs">© {new Date().getFullYear()} Bins and Deals. All rights reserved.</p>
          <a
            href="tel:8162224238"
            className="flex items-center gap-2 bg-mint-gradient text-white font-black px-6 py-2.5 rounded-full text-xs uppercase tracking-wider hover:opacity-90 transition-opacity glow-mint-lg"
          >
            <Phone size={13} strokeWidth={2.5} /> Call Us
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen" style={{ background: DARK }}>
      <AnnouncementBanner />
      <BackToTop />
      <Navbar />
      <Hero />
      <NewStockBanner />
      <About />
      <Products />
      <TreasureHunt />
      <Hours />
      <Location />
      <FindUsOnline />
      <PaymentMethods />
      <Footer />
    </div>
  )
}
