import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Phone, MapPin, Clock, Tag, ChevronDown, ChevronUp, Star, ArrowRight,
  Shirt, Tv, Home, Gamepad2, Baby, Wrench, Sparkles, CreditCard, Banknote,
  Menu, X,
} from 'lucide-react'
import pricingPoster from './assets/pricing-poster.jpg'
import clawMachineImg from './assets/claw-machine.jpg'

const MINT = '#00C896'
const GOLD = '#FFD700'
const DARK = '#050505'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className={className}>
      {children}
    </motion.div>
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-colors"
          style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}
          aria-label="Back to top"
        >
          <ChevronUp size={18} color={MINT} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Pricing',      href: '#pricing' },
    { label: 'About',        href: '#about' },
    { label: 'What We Sell', href: '#products' },
    { label: 'Find Us',      href: '#location' },
    { label: 'Hours',        href: '#hours' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5,5,5,0.97)' : 'rgba(5,5,5,0.65)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="shrink-0">
          <a
            href="#hero"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
              color: '#7ED957',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            BINS &amp; DEALS
          </a>
        </div>

        {/* Nav links — centered */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="text-[0.72rem] font-semibold text-gray-500 hover:text-white transition-colors uppercase tracking-[0.13em]"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right action buttons */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a
            href="https://www.facebook.com/share/18VwrorqFD/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-85"
            style={{ background: '#1877F2' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
            Facebook
          </a>
          <a
            href="https://www.facebook.com/share/1Ao34Qrcpi/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-85"
            style={{ background: '#1877F2' }}
          >
            <svg width="13" height="13" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C11.029 7 7 11.029 7 16v1h18v-1c0-4.971-4.029-9-9-9z" fill="white"/>
              <rect x="7" y="18.5" width="8" height="6.5" rx="1.5" fill="white"/>
              <rect x="17" y="18.5" width="8" height="6.5" rx="1.5" fill="white"/>
            </svg>
            Marketplace
          </a>
          <a
            href="tel:8162224238"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-85"
            style={{ background: MINT }}
          >
            <Phone size={13} strokeWidth={2.5} /> Call Us
          </a>
        </div>

        <button
          className="lg:hidden text-gray-400 p-2 rounded-lg hover:bg-white/5 transition-colors"
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
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'rgba(5,5,5,0.98)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-1">
                <a
                  href="https://www.facebook.com/share/18VwrorqFD/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: '#1877F2' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                  Facebook Page
                </a>
                <a
                  href="https://www.facebook.com/share/1Ao34Qrcpi/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: '#1877F2' }}
                >
                  Facebook Marketplace
                </a>
                <a
                  href="tel:8162224238"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: MINT }}
                >
                  <Phone size={15} /> (816) 222-4238
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
const BADGES = ['New stock every week', 'Thousands of items', 'In-store treasure hunt']

const TICKER_TEXT = '\u00a0\u00a0New inventory weekly\u00a0\u00a0·\u00a0\u00a0Limited time deals\u00a0\u00a0·\u00a0\u00a0First come, first served\u00a0\u00a0·\u00a0\u00a0Prices from $2\u00a0\u00a0·\u00a0\u00a0In-store only\u00a0\u00a0·\u00a0\u00a0'

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: DARK, paddingTop: '64px' }}
    >
      {/* ── Background depth layers ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,200,150,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,150,0.022) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 55%, rgba(0,200,150,0.07) 0%, transparent 70%)' }} />
      <div className="absolute pointer-events-none" style={{ width: 560, height: 560, top: '-12%', left: '-8%', background: 'radial-gradient(circle, rgba(255,215,0,0.04) 0%, transparent 70%)' }} />
      <div className="absolute pointer-events-none" style={{ width: 460, height: 460, bottom: '5%', right: '-6%', background: 'radial-gradient(circle, rgba(0,200,150,0.06) 0%, transparent 70%)' }} />
      {/* vignette edges */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)' }} />

      {/* ── Main content ── */}
      <div className="flex-1 flex items-center justify-center relative z-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center py-14">

          {/* Trust badge pills */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-7"
          >
            {BADGES.map(b => (
              <span
                key={b}
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.38)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {b}
              </span>
            ))}
          </motion.div>

          {/* Store name */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.55 }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(3rem, 12vw, 8.5rem)',
              lineHeight: 0.88,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              textAlign: 'center',
              width: '100%',
              color: '#7ED957',
              WebkitTextStroke: '1px rgba(255,255,255,0.72)',
              marginBottom: '0.25em',
            }}
          >
            BINS &amp; DEALS
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.45 }}
            className="font-black text-white uppercase tracking-wide mb-5"
            style={{ fontSize: 'clamp(1rem, 3.2vw, 2rem)', letterSpacing: '0.06em' }}
          >
            Dig In. Find Crazy Deals.
          </motion.p>

          {/* Sub-description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.45 }}
            className="text-gray-400 text-base sm:text-lg mb-5 max-w-md mx-auto leading-relaxed"
          >
            New, refurbished &amp; overstock items priced from <strong className="text-white">$2</strong> — right here in Liberty, MO.
          </motion.p>

          {/* Urgency callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.33, duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
            style={{ background: 'rgba(255,215,0,0.07)', border: '1px solid rgba(255,215,0,0.2)' }}
          >
            <span style={{ color: GOLD, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase' }}>
              ⚡&nbsp; Prices from $2 &nbsp;·&nbsp; New stock weekly &nbsp;·&nbsp; First come, first served
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <a
              href="#products"
              className="flex items-center gap-2.5 font-black px-9 py-4 rounded-full text-base transition-opacity hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #7ED957 0%, #FFD700 100%)',
                color: '#0a0a0a',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Start Digging <ArrowRight size={18} strokeWidth={2.8} />
            </a>
            <a
              href="tel:8162224238"
              className="flex items-center gap-2.5 font-bold px-8 py-4 rounded-full text-white text-base transition-opacity hover:opacity-85"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.11)' }}
            >
              <Phone size={17} color={MINT} strokeWidth={2.5} />
              (816) 222-4238
            </a>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.52 }}
            className="flex items-center justify-center gap-2 text-gray-600 text-sm"
          >
            <Clock size={13} color={MINT} />
            Mon-Sat 10AM-8PM &nbsp;·&nbsp; Sun 11AM-7PM
          </motion.div>
        </div>
      </div>

      {/* ── Scrolling ticker ── */}
      <div
        className="relative z-20 overflow-hidden py-2.5"
        style={{ background: 'rgba(0,200,150,0.055)', borderTop: '1px solid rgba(0,200,150,0.13)' }}
      >
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ color: MINT }}
            >
              {TICKER_TEXT}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll caret */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={22} color="rgba(0,200,150,0.28)" />
        </motion.div>
      </div>
    </section>
  )
}

// ─── TREASURE HUNT PRICING ───────────────────────────────────────────────────
function TreasureHunt() {
  const tags = [
    { color: '#E53935', label: 'Red Tag',    price: '$9' },
    { color: '#8E24AA', label: 'Purple Tag', price: '$7' },
    { color: '#1E88E5', label: 'Blue Tag',   price: '$5' },
    { color: '#43A047', label: 'Green Tag',  price: '$3' },
    { color: '#F9A825', label: 'Yellow Tag', price: '$2' },
  ]

  return (
    <section id="pricing" className="py-24 relative" style={{ background: '#080d08' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            Pricing System
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-white leading-tight mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TREASURE HUNT SAVINGS
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-base max-w-lg mx-auto">
            Every item is color-tagged for easy pricing. No guessing, no haggling.
          </motion.p>
        </Reveal>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Pricing cards — render first so we can use their natural height as reference */}
          <Reveal className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="flex flex-col gap-3" id="pricing-cards">
              {tags.map(({ color, label, price }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="flex items-center gap-4 rounded-xl px-5 py-4"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: color }}
                  >
                    <Tag size={18} color="white" strokeWidth={2} />
                  </div>
                  <span className="flex-1 font-bold text-white text-base">{label}</span>
                  <span
                    className="font-black text-2xl text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {price}
                  </span>
                </motion.div>
              ))}
              <motion.p variants={fadeUp} className="text-gray-600 text-xs mt-3 text-center">
                Prices drop daily. The earlier you shop, the more you save.
              </motion.p>
            </div>
          </Reveal>

          {/* Poster — sized to match cards height */}
          <Reveal className="w-full sm:max-w-sm lg:w-1/2 lg:max-w-none order-1 lg:order-2 flex justify-center">
            <motion.div
              variants={fadeUp}
              className="rounded-2xl overflow-hidden w-full sm:max-w-sm lg:max-w-md"
            >
              <img
                src={pricingPoster}
                alt="Treasure Hunt Pricing System"
                className="w-full h-auto object-contain block"
              />
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── MORE WAYS TO SAVE ───────────────────────────────────────────────────────
function ShelfDeals() {
  const features = [
    { icon: Tag,      label: 'Individually Priced',    desc: 'Every shelf item is clearly marked — no surprise costs at checkout.' },
    { icon: Star,     label: 'Up to 50% Off Amazon',   desc: 'Shelf items typically priced 40-50% below Amazon retail.' },
    { icon: ArrowRight, label: 'New Items Regularly',  desc: 'Fresh shelf stock added alongside our bin rotation every week.' },
  ]

  return (
    <section id="shelf-deals" className="py-24 relative" style={{ background: '#080d08' }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            Shelf Deals
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.5rem,7vw,5rem)] font-black text-white leading-tight mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            MORE WAYS TO SAVE
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
            In addition to our bin pricing system, we also offer shelf items throughout the store. Each item is individually priced and typically 40-50% lower than Amazon prices, giving you even more ways to save on quality products.
          </motion.p>
        </Reveal>

        <Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="rounded-xl p-6 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 mx-auto"
                  style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.12)' }}
                >
                  <Icon size={19} color={MINT} />
                </div>
                <h3 className="font-black text-white text-sm mb-2">{label}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── CLAW MACHINE ────────────────────────────────────────────────────────────
function ClawMachine() {
  return (
    <section id="claw-machine" className="py-16 relative min-h-[80vh] flex items-center" style={{ background: DARK }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <Reveal className="text-center mb-10">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            In-Store Fun
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2rem,5vw,4rem)] font-black text-white leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            CLAW MACHINE
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-sm mt-2">
            Fun for the whole family!
          </motion.p>
        </Reveal>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <Reveal className="flex justify-center shrink-0">
            <motion.div
              variants={fadeUp}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: '#0a0a0a' }}
            >
              <img
                src={clawMachineImg}
                alt="Claw Machine at Bins and Deals"
                className="max-h-[320px] lg:max-h-[500px] w-auto object-contain block"
              />
            </motion.div>
          </Reveal>

          <Reveal className="w-full lg:max-w-lg">
            <div className="flex flex-col gap-5">
              <motion.p variants={fadeUp} className="text-gray-300 text-base leading-relaxed">
                We have an exciting claw machine right inside our store! Perfect for kids and adults alike. Try your luck and win amazing prizes!
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-3 rounded-xl px-5 py-3.5 self-start"
                style={{ background: 'rgba(0,200,150,0.07)', border: '1px solid rgba(0,200,150,0.18)' }}
              >
                <span className="text-lg font-black text-white">🪙 $1 = 4 Tokens</span>
                <span className="text-sm font-semibold" style={{ color: MINT }}>Play &amp; Win!</span>
              </motion.div>

              <motion.p variants={fadeUp} className="text-gray-400 text-sm leading-relaxed">
                While you shop, let the kids play! Hours of fun waiting for you at Bins &amp; Deals.
              </motion.p>

              <motion.a
                variants={fadeUp}
                href="#location"
                className="self-start flex items-center gap-2 font-bold px-6 py-3 rounded-full text-white text-sm transition-opacity hover:opacity-85"
                style={{ background: `linear-gradient(135deg, ${MINT} 0%, #00a87a 100%)` }}
              >
                <MapPin size={15} strokeWidth={2.5} /> Come Visit Us
              </motion.a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  const stats = [
    { display: '1000s+', label: 'Items In Stock' },
    { display: '40-50%', label: 'Off Retail Prices' },
    { display: '8',      label: 'Categories' },
    { display: '7',      label: 'Days a Week' },
  ]

  return (
    <section id="about" className="py-24 relative" style={{ background: '#080d08' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            About Us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.8rem,6vw,5.5rem)] font-black text-white leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            YOUR LOCAL DEAL DESTINATION
          </motion.h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed mb-4">
              At <strong className="text-white">Bins and Deals</strong>, we believe everyone deserves access to quality products without breaking the bank. Our store is packed with{' '}
              <strong style={{ color: MINT }}>new, refurbished, and gently used items</strong> across every category, all priced far below retail.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed mb-8">
              Whether you're hunting for electronics, home goods, clothing, or toys, you'll always find something worth grabbing at a price you won't believe. Deals change constantly, so every visit is a new adventure.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="tel:8162224238"
              className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-full text-white text-sm transition-opacity hover:opacity-85"
              style={{ background: `linear-gradient(135deg, ${MINT} 0%, #00a87a 100%)` }}
            >
              <Phone size={15} strokeWidth={2.5} /> Call Us Today
            </motion.a>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(s => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="rounded-2xl p-7 text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="text-[clamp(2.2rem,5vw,3rem)] font-black leading-none mb-2"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      background: 'linear-gradient(135deg, #00C896 0%, #FFD700 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {s.display}
                  </div>
                  <div className="text-gray-600 text-xs font-semibold uppercase tracking-wider">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
function Products() {
  const categories = [
    { icon: Tv,       label: 'Electronics',            desc: 'TVs, tablets, phones, gaming gear & more' },
    { icon: Shirt,    label: 'Clothing & Apparel',     desc: 'Brand-name clothing for the whole family' },
    { icon: Gamepad2, label: 'Toys & Games',           desc: 'Board games, action figures, outdoor play' },
    { icon: Home,     label: 'Home & Kitchen',         desc: 'Appliances, décor, cookware & furniture' },
    { icon: Wrench,   label: 'Tools & Hardware',       desc: 'Hand tools, power tools & hardware supplies' },
    { icon: Sparkles, label: 'Beauty & Personal Care', desc: 'Skincare, hair care, grooming & wellness' },
    { icon: Baby,     label: 'Baby & Kids',            desc: 'Gear, clothing, toys & nursery essentials' },
  ]

  return (
    <section id="products" className="py-24 relative" style={{ background: DARK }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            What We Sell
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(3rem,8vw,6.5rem)] font-black text-white leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            SOMETHING FOR EVERYONE
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-base max-w-lg mx-auto mt-4">
            Thousands of items across every category: new, refurbished, and used. All at prices that make you do a double-take.
          </motion.p>
        </Reveal>

        <Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="rounded-xl p-6"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.12)' }}
                >
                  <Icon size={20} color={MINT} />
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5 leading-tight">{label}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <motion.div
            variants={fadeUp}
            className="rounded-2xl p-10 sm:p-14 text-center"
            style={{ background: 'linear-gradient(135deg, #00C896 0%, #007A5A 100%)' }}
          >
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} color={GOLD} fill={GOLD} />)}
            </div>
            <h3
              className="text-[clamp(2rem,5vw,4rem)] font-black text-white leading-none mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              NEW INVENTORY EVERY WEEK
            </h3>
            <p className="text-white/70 text-base mb-7 max-w-md mx-auto">
              Deals change constantly. Stop in often or give us a call to hear about our latest arrivals.
            </p>
            <a
              href="tel:8162224238"
              className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-full text-white text-sm transition-opacity hover:opacity-85"
              style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <Phone size={15} strokeWidth={2.5} /> (816) 222-4238
            </a>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── FIND US ONLINE ──────────────────────────────────────────────────────────
function FindUsOnline() {
  const cards = [
    {
      label: 'Follow Us on Facebook',
      sub: 'Stay updated with our latest arrivals, store news, and exclusive deals. Join our community!',
      btnText: 'Visit Our Facebook Page',
      href: 'https://www.facebook.com/share/18VwrorqFD/?mibextid=wwXIfr',
    },
    {
      label: 'Shop on Facebook Marketplace',
      sub: 'Browse our product listings at prices cheaper than Amazon. New items added regularly!',
      btnText: 'Browse Our Listings',
      href: 'https://www.facebook.com/share/1Ao34Qrcpi/?mibextid=wwXIfr',
    },
  ]

  return (
    <section id="connect" className="py-24 relative" style={{ background: '#080d08' }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            Connect With Us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-white leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            FIND US ONLINE
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-base mt-4">
            Follow along, shop smart, save big!
          </motion.p>
        </Reveal>

        <Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {cards.map(({ label, sub, btnText, href }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex flex-col rounded-2xl p-8"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: '#1877F2' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1877F2' }}>Facebook</span>
                </div>
                <h3 className="text-white font-black text-lg mb-2 leading-tight">{label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{sub}</p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-bold text-white text-sm py-3.5 rounded-xl transition-opacity hover:opacity-85"
                  style={{ background: '#1877F2' }}
                >
                  {btnText} <ArrowRight size={14} strokeWidth={2.5} />
                </a>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── LOCATION ────────────────────────────────────────────────────────────────
function Location() {
  const info = [
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
      title: 'Mon-Sat: 10AM-8PM',
      sub: 'Sunday: 11AM-7PM',
      detail: 'Open 7 days a week',
    },
  ]

  return (
    <section id="location" className="py-24 relative" style={{ background: DARK }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            Find Us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-white leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            VISIT OUR STORE
          </motion.h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div className="flex flex-col gap-4">
              {info.map(({ icon: Icon, title, sub, detail, link }, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex gap-4 rounded-xl p-5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.14)' }}
                  >
                    <Icon size={17} color={MINT} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base leading-tight mb-0.5">{title}</p>
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
                variants={fadeUp}
                href="tel:8162224238"
                className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-full text-white text-sm transition-opacity hover:opacity-85 mt-2"
                style={{ background: `linear-gradient(135deg, ${MINT} 0%, #00a87a 100%)` }}
              >
                <Phone size={15} strokeWidth={2.5} /> Call Us Now
              </motion.a>
            </div>
          </Reveal>

          <Reveal>
            <motion.div
              variants={fadeUp}
              className="rounded-2xl overflow-hidden"
              style={{ height: '460px', border: '1px solid rgba(255,255,255,0.06)' }}
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
  )
}

// ─── HOURS ───────────────────────────────────────────────────────────────────
function Hours() {
  const days = [
    { day: 'Monday',    hours: '10:00 AM - 8:00 PM' },
    { day: 'Tuesday',   hours: '10:00 AM - 8:00 PM' },
    { day: 'Wednesday', hours: '10:00 AM - 8:00 PM' },
    { day: 'Thursday',  hours: '10:00 AM - 8:00 PM' },
    { day: 'Friday',    hours: '10:00 AM - 8:00 PM' },
    { day: 'Saturday',  hours: '10:00 AM - 8:00 PM' },
    { day: 'Sunday',    hours: '11:00 AM - 7:00 PM' },
  ]
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <section id="hours" className="py-24 relative" style={{ background: '#080d08' }}>
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-12">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            Store Hours
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-white leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            COME SEE US
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-base mt-4">
            Open 7 days a week. Deals don't take days off.
          </motion.p>
        </Reveal>

        <Reveal>
          <motion.div
            variants={fadeUp}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="px-6 py-4" style={{ background: `linear-gradient(135deg, ${MINT} 0%, #007A5A 100%)` }}>
              <div className="flex items-center gap-3">
                <Clock size={17} color="rgba(255,255,255,0.85)" />
                <span className="text-white font-black text-sm uppercase tracking-widest">Weekly Schedule</span>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)' }} className="divide-y divide-white/5">
              {days.map(({ day, hours }) => {
                const isToday = day === today
                return (
                  <div
                    key={day}
                    className="flex items-center justify-between px-6 py-3.5"
                    style={isToday ? { background: 'rgba(0,200,150,0.05)' } : {}}
                  >
                    <div className="flex items-center gap-3">
                      {isToday && (
                        <span
                          className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide"
                          style={{ background: 'rgba(0,200,150,0.15)', color: MINT }}
                        >
                          Today
                        </span>
                      )}
                      <span className={`font-semibold text-sm ${isToday ? 'text-white' : 'text-gray-400'}`}>{day}</span>
                    </div>
                    <span className={`font-semibold text-sm tabular-nums ${isToday ? 'text-white' : 'text-gray-600'}`}>
                      {hours}
                    </span>
                  </div>
                )
              })}
            </div>
            <div
              className="px-6 py-3.5 flex items-center justify-between"
              style={{ background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.04)' }}
            >
              <p className="text-gray-700 text-xs">Holiday hours may vary</p>
              <a href="tel:8162224238" className="flex items-center gap-1.5 text-xs font-bold hover:underline" style={{ color: MINT }}>
                <Phone size={11} strokeWidth={2.5} /> Call to confirm
              </a>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── PAYMENT METHODS ──────────────────────────────────────────────────────────
function PaymentMethods() {
  const methods = [
    { icon: <Banknote size={20} color={MINT} />, label: 'Cash' },
    { icon: <CreditCard size={20} color={MINT} />, label: 'Credit & Debit' },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ),
      label: 'Apple Pay',
    },
  ]

  return (
    <div className="py-8 px-5 sm:px-8" style={{ background: '#020408', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
        <p className="text-gray-700 text-xs font-bold uppercase tracking-widest shrink-0">We Accept</p>
        <div className="w-px h-4 bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-8 flex-wrap justify-center">
          {methods.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {icon}
              </div>
              <span className="text-gray-500 text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-14 px-5 sm:px-8"
      style={{ background: '#020408', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <h3 className="text-xl font-black text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              BINS & DEALS
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your local discount store for new, refurbished, and used products at unbeatable prices in Liberty, MO.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-4">Store Hours</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600"><span className="text-gray-300 font-semibold">Mon-Sat:</span> 10:00 AM - 8:00 PM</p>
              <p className="text-gray-600"><span className="text-gray-300 font-semibold">Sunday:</span> 11:00 AM - 7:00 PM</p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-4">Contact & Location</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-start gap-2.5">
                <MapPin size={14} color={MINT} className="mt-0.5 shrink-0" />
                892 Rte 291, Liberty, MO 64068
              </p>
              <a href="tel:8162224238" className="flex items-center gap-2.5 hover:text-gray-300 transition-colors">
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
            className="flex items-center gap-2 font-bold px-5 py-2.5 rounded-full text-white text-xs transition-opacity hover:opacity-85"
            style={{ background: `linear-gradient(135deg, ${MINT} 0%, #00a87a 100%)` }}
          >
            <Phone size={12} strokeWidth={2.5} /> Call Us
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
      <BackToTop />
      <Navbar />
      <Hero />
      <TreasureHunt />
      <ShelfDeals />
      <ClawMachine />
      <About />
      <Products />
      <FindUsOnline />
      <Location />
      <Hours />
      <PaymentMethods />
      <Footer />
    </div>
  )
}
