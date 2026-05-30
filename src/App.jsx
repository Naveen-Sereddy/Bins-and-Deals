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
const GOLD = '#e6a800'
const DARK = '#111318'
const SURFACE_ALT = '#161922'
const SURFACE_DEEP = '#0e1015'

const CARD_BG = '#1c2030'
const CARD_BORDER = 'rgba(255,255,255,0.07)'

const GRID_BG = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px)',
  backgroundSize: '50px 50px',
}

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
          style={{ background: 'rgba(30,32,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
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
        background: scrolled ? 'rgba(17,19,24,0.97)' : 'rgba(17,19,24,0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.03)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto pl-6 pr-4 sm:px-8 h-16" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
        {/* Logo */}
        <div style={{ justifySelf: 'start' }}>
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
        <div className="hidden lg:flex items-center gap-8" style={{ justifySelf: 'center' }}>
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="text-[0.72rem] font-semibold uppercase tracking-[0.13em] transition-colors"
              style={{ color: '#9ca3af' }}
              onMouseEnter={e => e.target.style.color = '#ffffff'}
              onMouseLeave={e => e.target.style.color = '#9ca3af'}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right action buttons */}
        <div className="hidden lg:flex items-center gap-2" style={{ justifySelf: 'end' }}>
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
          className="lg:hidden p-2 rounded-lg transition-colors"
          style={{ justifySelf: 'end', gridColumn: '3', color: '#9ca3af' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
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
            style={{ background: 'rgba(17,19,24,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }}
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-wider transition-colors"
                  style={{ color: '#9ca3af' }}
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

const TICKER_TEXT = '  New inventory weekly  ·  Limited time deals  ·  First come, first served  ·  Prices from $2  ·  In-store only  ·  '

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: DARK, paddingTop: '64px', ...GRID_BG }}
    >
      {/* ── Background depth layers ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 55%, rgba(0,200,150,0.07) 0%, transparent 70%)' }} />
      <div className="absolute pointer-events-none" style={{ width: 560, height: 560, top: '-12%', left: '-8%', background: 'radial-gradient(circle, rgba(200,160,0,0.06) 0%, transparent 70%)' }} />
      <div className="absolute pointer-events-none" style={{ width: 460, height: 460, bottom: '5%', right: '-6%', background: 'radial-gradient(circle, rgba(0,200,150,0.06) 0%, transparent 70%)' }} />

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-20 w-full py-8 sm:py-12 px-5 sm:px-8">

          {/* Trust badge pills */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-4 mt-[-10px]"
          >
            {BADGES.map(b => (
              <span
                key={b}
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#8b8f9a', border: '1px solid rgba(255,255,255,0.08)' }}
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
              fontSize: 'clamp(1.8rem, 9vw, 8rem)',
              lineHeight: 0.88,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              textAlign: 'center',
              display: 'block',
              color: '#7ED957',
              WebkitTextStroke: '1px rgba(255,255,255,0.06)',
              marginBottom: '0.35em',
            }}
          >
            BINS &amp; DEALS
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.45 }}
            className="font-black uppercase tracking-wide mb-5 text-center"
            style={{ color: '#ffffff', fontSize: 'clamp(1rem, 3.2vw, 2rem)', letterSpacing: '0.06em' }}
          >
            Dig In. Find Crazy Deals.
          </motion.p>

          {/* Sub-description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.45 }}
            className="text-base sm:text-lg mb-5 max-w-md text-center leading-relaxed"
            style={{ color: '#8b8f9a' }}
          >
            New, refurbished &amp; overstock items priced from <strong style={{ color: '#ffffff' }}>$2</strong>, right here in Liberty, MO.
          </motion.p>

          {/* Urgency callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.33, duration: 0.4 }}
            className="mb-8 flex justify-center w-full"
          >
            <div
              className="rounded-xl"
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '12px 18px',
                maxWidth: '95%',
                margin: '0 auto',
                width: 'fit-content',
                background: 'rgba(200,160,0,0.12)',
                border: '1px solid rgba(200,160,0,0.3)',
              }}
            >
              <span style={{ color: '#ffd700', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', textAlign: 'center' }}>
                ⚡&nbsp; Prices from $2 &nbsp;·&nbsp; New stock weekly &nbsp;·&nbsp; First come, first served
              </span>
            </div>
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
              className="flex items-center gap-2.5 font-black px-9 py-4 rounded-xl text-base transition-opacity hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #00C896 0%, #00a87a 100%)',
                color: '#ffffff',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Start Digging <ArrowRight size={18} strokeWidth={2.8} />
            </a>
            <a
              href="tel:8162224238"
              className="flex items-center gap-2.5 font-bold px-8 py-4 rounded-xl text-base transition-opacity hover:opacity-85"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#e2e4e8' }}
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
            className="flex items-center justify-center gap-2 text-sm"
            style={{ color: '#8b8f9a' }}
          >
            <Clock size={13} color={MINT} />
            Mon-Sat 10AM-8PM &nbsp;·&nbsp; Sun 11AM-7PM
          </motion.div>
      </div>

      {/* ── Scrolling ticker ── */}
      <div
        className="relative z-20 overflow-hidden py-2.5"
        style={{ background: 'rgba(0,200,150,0.1)', borderTop: '1px solid rgba(0,200,150,0.2)' }}
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
          <ChevronDown size={22} color="rgba(0,200,150,0.45)" />
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
    <section id="pricing" className="py-14 relative" style={{ background: SURFACE_ALT, ...GRID_BG }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-8">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            Pricing System
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-tight mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#ffffff' }}
          >
            TREASURE HUNT SAVINGS
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: '#8b8f9a' }}>
            Every item is color-tagged for easy pricing. No guessing, no haggling.
          </motion.p>
        </Reveal>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <Reveal className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="flex flex-col gap-3" id="pricing-cards">
              {tags.map(({ color, label, price }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="flex items-center gap-4 rounded-xl px-5 py-4"
                  style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, boxShadow: '0 1px 6px rgba(0,0,0,0.2)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: color }}
                  >
                    <Tag size={18} color="white" strokeWidth={2} />
                  </div>
                  <span className="flex-1 font-bold text-base" style={{ color: '#e2e4e8' }}>{label}</span>
                  <span
                    className="font-black text-2xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#ffffff' }}
                  >
                    {price}
                  </span>
                </motion.div>
              ))}
              <motion.p variants={fadeUp} className="text-xs mt-3 text-center" style={{ color: '#6b7280' }}>
                Prices drop daily. The earlier you shop, the more you save.
              </motion.p>
            </div>
          </Reveal>

          {/* Poster */}
          <Reveal className="w-full sm:max-w-sm lg:w-1/2 lg:max-w-none order-1 lg:order-2 flex justify-center">
            <motion.div
              variants={fadeUp}
              className="rounded-xl overflow-hidden w-full sm:max-w-sm lg:max-w-md"
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
    <section id="shelf-deals" className="py-14 relative" style={{ background: DARK, ...GRID_BG }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-8">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            Shelf Deals
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.5rem,7vw,5rem)] font-black leading-tight mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#ffffff' }}
          >
            MORE WAYS TO SAVE
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: '#8b8f9a' }}>
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
                style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 mx-auto"
                  style={{ background: 'rgba(0,200,150,0.12)', border: '1px solid rgba(0,200,150,0.2)' }}
                >
                  <Icon size={19} color={MINT} />
                </div>
                <h3 className="font-black text-sm mb-2" style={{ color: '#ffffff' }}>{label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#8b8f9a' }}>{desc}</p>
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
    <section id="claw-machine" className="py-10 relative flex items-center" style={{ background: SURFACE_ALT, ...GRID_BG }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <Reveal className="text-center mb-6">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            In-Store Fun
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2rem,5vw,4rem)] font-black leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#ffffff' }}
          >
            CLAW MACHINE
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm mt-2" style={{ color: '#8b8f9a' }}>
            Fun for the whole family!
          </motion.p>
        </Reveal>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <Reveal className="flex justify-center shrink-0">
            <motion.div
              variants={fadeUp}
              className="rounded-xl overflow-hidden"
              style={{ border: `1px solid ${CARD_BORDER}`, background: CARD_BG }}
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
              <motion.p variants={fadeUp} className="text-base leading-relaxed" style={{ color: '#9ca3af' }}>
                We have an exciting claw machine right inside our store! Perfect for kids and adults alike. Try your luck and win amazing prizes!
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-3 rounded-xl px-5 py-3.5 self-start"
                style={{ background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.25)' }}
              >
                <span className="text-lg font-black" style={{ color: '#ffffff' }}>🪙 $1 = 4 Tokens</span>
                <span className="text-sm font-semibold" style={{ color: MINT }}>Play &amp; Win!</span>
              </motion.div>

              <motion.p variants={fadeUp} className="text-sm leading-relaxed" style={{ color: '#8b8f9a' }}>
                While you shop, let the kids play! Hours of fun waiting for you at Bins &amp; Deals.
              </motion.p>

              <motion.a
                variants={fadeUp}
                href="#location"
                className="self-start flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-white text-sm transition-opacity hover:opacity-85"
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
    <section id="about" className="py-14 relative" style={{ background: DARK, ...GRID_BG }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-8">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            About Us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.8rem,6vw,5.5rem)] font-black leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#ffffff' }}
          >
            YOUR LOCAL DEAL DESTINATION
          </motion.h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-4" style={{ color: '#9ca3af' }}>
              At <strong style={{ color: '#ffffff' }}>Bins and Deals</strong>, we believe everyone deserves access to quality products without breaking the bank. Our store is packed with{' '}
              <strong style={{ color: '#00C896' }}>new, refurbished, and gently used items</strong> across every category, all priced far below retail.
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-8" style={{ color: '#9ca3af' }}>
              Whether you're hunting for electronics, home goods, clothing, or toys, you'll always find something worth grabbing at a price you won't believe. Deals change constantly, so every visit is a new adventure.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="tel:8162224238"
              className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white text-sm transition-opacity hover:opacity-85"
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
                  className="rounded-xl p-7 text-center"
                  style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
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
                  <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>{s.label}</div>
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
    <section id="products" className="py-14 relative" style={{ background: SURFACE_ALT, ...GRID_BG }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-8">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            What We Sell
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(3rem,8vw,6.5rem)] font-black leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#ffffff' }}
          >
            SOMETHING FOR EVERYONE
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base max-w-lg mx-auto mt-4" style={{ color: '#8b8f9a' }}>
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
                style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(0,200,150,0.12)', border: '1px solid rgba(0,200,150,0.2)' }}
                >
                  <Icon size={20} color={MINT} />
                </div>
                <h3 className="font-bold text-sm mb-1.5 leading-tight" style={{ color: '#ffffff' }}>{label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#8b8f9a' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <motion.div
            variants={fadeUp}
            className="rounded-xl p-10 sm:p-14 text-center"
            style={{ background: 'linear-gradient(135deg, #00C896 0%, #007A5A 100%)' }}
          >
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} color="#FFD700" fill="#FFD700" />)}
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
              className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-xl text-white text-sm transition-opacity hover:opacity-85"
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
      badgeLabel: 'Facebook',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
        </svg>
      ),
    },
    {
      label: 'Shop on Facebook Marketplace',
      sub: 'Browse our product listings at prices cheaper than Amazon. New items added regularly!',
      btnText: 'Browse Our Listings',
      href: 'https://www.facebook.com/share/1Ao34Qrcpi/?mibextid=wwXIfr',
      badgeLabel: 'Marketplace',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M21 3H3a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 0 2 2.45V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8.95A2.5 2.5 0 0 0 22 6.5V4a1 1 0 0 0-1-1zm-9 15H9v-5h3v5zm4 0h-3v-5h3v5zm2-8H6V8.95A2.5 2.5 0 0 0 8.5 9h7A2.5 2.5 0 0 0 18 8.95V10zM4 6.5V5h16v1.5a1.5 1.5 0 0 1-3 0 1 1 0 0 0-2 0 1.5 1.5 0 0 1-3 0 1 1 0 0 0-2 0 1.5 1.5 0 0 1-3 0z"/>
        </svg>
      ),
    },
  ]

  return (
    <section id="connect" className="py-14 relative" style={{ background: DARK, ...GRID_BG }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-8">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            Connect With Us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#ffffff' }}
          >
            FIND US ONLINE
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base mt-4" style={{ color: '#8b8f9a' }}>
            Follow along, shop smart, save big!
          </motion.p>
        </Reveal>

        <Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {cards.map(({ label, sub, btnText, href, icon, badgeLabel }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex flex-col rounded-xl p-8"
                style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: '#1877F2' }}
                  >
                    {icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1877F2' }}>{badgeLabel}</span>
                </div>
                <h3 className="font-black text-lg mb-2 leading-tight" style={{ color: '#ffffff' }}>{label}</h3>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: '#8b8f9a' }}>{sub}</p>
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
    <section id="location" className="py-14 relative" style={{ background: SURFACE_ALT, ...GRID_BG }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-8">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            Find Us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#ffffff' }}
          >
            VISIT OUR STORE
          </motion.h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Reveal>
            <div className="flex flex-col gap-4">
              {info.map(({ icon: Icon, title, sub, detail, link }, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex gap-4 rounded-xl p-5"
                  style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, boxShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(0,200,150,0.12)', border: '1px solid rgba(0,200,150,0.2)' }}
                  >
                    <Icon size={17} color={MINT} />
                  </div>
                  <div>
                    <p className="font-bold text-base leading-tight mb-0.5" style={{ color: '#ffffff' }}>{title}</p>
                    <p className="text-sm" style={{ color: '#8b8f9a' }}>{sub}</p>
                    {detail && <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{detail}</p>}
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
                className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white text-sm transition-opacity hover:opacity-85 mt-2"
                style={{ background: `linear-gradient(135deg, ${MINT} 0%, #00a87a 100%)` }}
              >
                <Phone size={15} strokeWidth={2.5} /> Call Us Now
              </motion.a>
            </div>
          </Reveal>

          <Reveal>
            <motion.div
              variants={fadeUp}
              className="rounded-xl overflow-hidden"
              style={{ height: '460px', border: `1px solid ${CARD_BORDER}`, boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
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
    <section id="hours" className="py-14 relative" style={{ background: DARK, ...GRID_BG }}>
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-7">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: MINT }}>
            Store Hours
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#ffffff' }}
          >
            COME SEE US
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base mt-4" style={{ color: '#8b8f9a' }}>
            Open 7 days a week. Deals don't take days off.
          </motion.p>
        </Reveal>

        <Reveal>
          <motion.div
            variants={fadeUp}
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${CARD_BORDER}`, boxShadow: '0 2px 16px rgba(0,0,0,0.3)', overflow: 'hidden', borderRadius: '0.75rem' }}
          >
            <div className="px-6 py-4" style={{ background: `linear-gradient(135deg, ${MINT} 0%, #007A5A 100%)` }}>
              <div className="flex items-center gap-3">
                <Clock size={17} color="rgba(255,255,255,0.85)" />
                <span className="text-white font-black text-sm uppercase tracking-widest">Weekly Schedule</span>
              </div>
            </div>
            <div style={{ background: CARD_BG }}>
              {days.map(({ day, hours }, idx) => {
                const isToday = day === today
                return (
                  <div
                    key={day}
                    className="flex items-center justify-between px-6 py-3.5"
                    style={{
                      ...(isToday ? { background: 'rgba(0,200,150,0.1)' } : {}),
                      borderBottom: idx < days.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {isToday && (
                        <span
                          className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide"
                          style={{ background: 'rgba(0,200,150,0.2)', color: MINT }}
                        >
                          Today
                        </span>
                      )}
                      <span className="font-semibold text-sm" style={{ color: isToday ? '#ffffff' : '#9ca3af' }}>{day}</span>
                    </div>
                    <span className="font-semibold text-sm tabular-nums" style={{ color: isToday ? '#ffffff' : '#6b7280' }}>
                      {hours}
                    </span>
                  </div>
                )
              })}
            </div>
            <div
              className="px-6 py-3.5 flex items-center justify-between"
              style={{ background: 'rgba(0,0,0,0.25)', borderTop: `1px solid ${CARD_BORDER}` }}
            >
              <p className="text-xs" style={{ color: '#6b7280' }}>Holiday hours may vary</p>
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
    <div className="py-8 px-5 sm:px-8" style={{ background: SURFACE_DEEP, borderTop: `1px solid ${CARD_BORDER}`, ...GRID_BG }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
        <p className="text-xs font-bold uppercase tracking-widest shrink-0" style={{ color: '#6b7280' }}>We Accept</p>
        <div className="w-px h-4 hidden sm:block" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="flex items-center gap-8 flex-wrap justify-center">
          {methods.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
              >
                {icon}
              </div>
              <span className="text-sm font-semibold" style={{ color: '#8b8f9a' }}>{label}</span>
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
      className="py-8 px-5 sm:px-8"
      style={{ background: SURFACE_DEEP, borderTop: `1px solid ${CARD_BORDER}`, ...GRID_BG }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 pb-10" style={{ borderBottom: `1px solid ${CARD_BORDER}` }}>
          <div>
            <h3 className="text-xl font-black mb-3" style={{ fontFamily: "'Poppins', sans-serif", color: '#ffffff' }}>
              BINS & DEALS
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
              Your local discount store for new, refurbished, and used products at unbeatable prices in Liberty, MO.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#6b7280' }}>Store Hours</h4>
            <div className="space-y-2 text-sm">
              <p style={{ color: '#6b7280' }}><span style={{ color: '#c9ccd4', fontWeight: 600 }}>Mon-Sat:</span> 10:00 AM - 8:00 PM</p>
              <p style={{ color: '#6b7280' }}><span style={{ color: '#c9ccd4', fontWeight: 600 }}>Sunday:</span> 11:00 AM - 7:00 PM</p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#6b7280' }}>Contact & Location</h4>
            <div className="space-y-3 text-sm" style={{ color: '#6b7280' }}>
              <p className="flex items-start gap-2.5">
                <MapPin size={14} color={MINT} className="mt-0.5 shrink-0" />
                892 Rte 291, Liberty, MO 64068
              </p>
              <a href="tel:8162224238" className="flex items-center gap-2.5 transition-colors" style={{ color: '#6b7280' }}>
                <Phone size={14} color={MINT} className="shrink-0" />
                (816) 222-4238
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: '#4b5563' }}>© {new Date().getFullYear()} Bins & Deals. All rights reserved.</p>
          <a
            href="tel:8162224238"
            className="flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-white text-xs transition-opacity hover:opacity-85"
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
    <div className="min-h-screen" style={{ background: DARK, ...GRID_BG }}>
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
