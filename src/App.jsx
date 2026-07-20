import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Phone, MapPin, Clock, Tag, Star, ArrowRight, CreditCard, Banknote,
  Tv, Shirt, Package, Gamepad2, ChevronDown, Store,
} from 'lucide-react'

import photoToys from './assets/cat-toys-games.jpg'
import photoClothing from './assets/cat-clothing.jpg'
import photoElectronics from './assets/cat-electronics.jpg'
import photoClaw from './assets/claw-machine-real.jpg'
import photoStorefront from './assets/storefront.jpg'
import photoShoppingDay from './assets/store-shopping-day.jpg'
import photoInterior from './assets/store-interior.jpg'
import photoMysteryBoxes from './assets/cat-mystery-boxes.jpg'

/* ── Real business social links ── */
const FB_PAGE_URL = 'https://www.facebook.com/xu.xiaoting.210987?mibextid=wwXIfr&rdid=amoDYGZMixHR0RaY&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Ao34Qrcpi%2F%3Fmibextid%3DwwXIfr'
const FB_MARKETPLACE_URL = 'https://www.facebook.com/profile.php?id=61570848458365&mibextid=wwXIfr&rdid=bAK8rjBwM6iqXPfa&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18VwrorqFD%2F%3Fmibextid%3DwwXIfr'

/* lucide-react ships no brand marks (by design) — hand-drawn glyph for the Facebook "f" */
function FacebookIcon({ size = 19 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
}

/* ── Motion curves (mirrors CSS custom properties in index.css) ── */
const EASE_OUT = [0.16, 1, 0.3, 1]
const EASE_BOUNCE = [0.34, 1.56, 0.64, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}
const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

/* ── Scroll-reveal wrapper ── */
function Reveal({ children, className = '', staggerDelay = 0.08, once = true, margin = '-60px' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger(staggerDelay)}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Honest placeholder block — swap for real photography later ── */
function Placeholder({ label, className = '', aspect = 'aspect-[4/3]' }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={`${aspect} ${className} relative flex items-center justify-center overflow-hidden`}
      style={{
        background: 'repeating-linear-gradient(135deg, var(--border) 0px, var(--border) 10px, var(--paper) 10px, var(--paper) 20px)',
        border: '2px dashed var(--muted)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <span className="mono text-[0.7rem] sm:text-[0.75rem] font-semibold uppercase tracking-wide text-center px-3 py-1.5 rounded" style={{ background: 'var(--paper)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
        Photo: {label}
      </span>
    </div>
  )
}

/* ── Tag glyph icon (logo mark) ── */
function TagIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M4 4h12l12 12-12 12L4 16V4z" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="10" cy="10" r="2.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  )
}

/* ══════════════════════════════════════════ NAV ══════════════════════════════════════════ */
function Nav() {
  const links = [
    { label: 'Tags', href: '#tags' },
    { label: 'Shelf Deals', href: '#shelf' },
    { label: 'Categories', href: '#categories' },
    { label: 'Claw Machine', href: '#claw' },
    { label: 'Visit', href: '#visit' },
  ]
  return (
    <nav
      className="sticky top-0 z-50"
      style={{ background: 'var(--paper)', borderBottom: '3px solid var(--ink)' }}
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-8" style={{ height: 72 }}>
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <TagIcon size={30} />
          <span className="display text-lg sm:text-xl leading-none" style={{ color: 'var(--ink)' }}>
            Bins &amp; Deals
          </span>
        </a>

        <ul className="nav-links-desktop items-center gap-7 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="nav-link mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--ink)' }}>
                {l.label}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-3" style={{ borderLeft: '2px solid var(--border)', paddingLeft: 'var(--space-4)' }}>
            <a href={FB_PAGE_URL} target="_blank" rel="noopener noreferrer" aria-label="Bins & Deals on Facebook" className="nav-social-icon" style={{ color: 'var(--ink)' }}>
              <FacebookIcon size={18} />
            </a>
            <a href={FB_MARKETPLACE_URL} target="_blank" rel="noopener noreferrer" aria-label="Bins & Deals on Facebook Marketplace" className="nav-social-icon" style={{ color: 'var(--ink)' }}>
              <Store size={18} strokeWidth={2.25} />
            </a>
          </li>
        </ul>

        <a
          href="tel:8162224238"
          aria-label="Call (816) 222-4238"
          className="btn-press mono text-xs sm:text-sm font-bold uppercase tracking-wide rounded-[var(--radius-sm)]"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
            width: 'auto',
            padding: '12px 16px',
            background: 'var(--yellow)',
            color: 'var(--ink)',
            border: '2.5px solid var(--ink)',
            boxShadow: 'var(--block-shadow-sm)',
            whiteSpace: 'nowrap',
          }}
        >
          <Phone size={16} strokeWidth={2.75} style={{ flexShrink: 0 }} />
          <span className="nav-call-full">(816) 222-4238</span>
          <span className="nav-call-short" aria-hidden="true">Call</span>
        </a>
      </div>
    </nav>
  )
}

/* ══════════════════════════════════════════ HERO ══════════════════════════════════════════ */
function Hero() {
  return (
    <header id="top" className="relative overflow-hidden" style={{ background: 'var(--paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 grid hero-grid gap-10 lg:gap-16 items-center">
        <motion.div initial="hidden" animate="visible" variants={stagger(0.12)} className="max-w-xl">
          <motion.p
            variants={fadeUp}
            className="mono inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest px-3 py-1.5 mb-5 rounded-full"
            style={{ background: '#A9D43D', color: 'var(--ink)', border: '2px solid var(--ink)' }}
          >
            <Star size={13} fill="var(--ink)" /> Now open · 7 days a week
          </motion.p>

          <motion.h1 variants={fadeUp} className="display text-[clamp(2.6rem,7vw,5.2rem)] mb-5" style={{ color: 'var(--ink)' }}>
            DIG IN.
            <br />
            FIND{' '}
            <span
              style={{
                WebkitTextStroke: '2.5px var(--red)',
                color: 'transparent',
              }}
            >
              CRAZY
            </span>
            <br />
            DEALS.
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base sm:text-lg leading-relaxed mb-7" style={{ color: 'var(--muted)', maxWidth: '38ch' }}>
            Liquidation finds, crazy low prices, and new stock all the time. Zero guessing. First come, first served.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-9">
            <a
              href="#tags"
              className="btn-press inline-flex items-center gap-2 display text-sm sm:text-base px-6 py-4 rounded-[var(--radius-sm)]"
              style={{ background: 'var(--yellow)', color: 'var(--ink)', border: '2.5px solid var(--ink)', boxShadow: 'var(--block-shadow-md)' }}
            >
              See Tag Prices
            </a>
            <a
              href="#visit"
              className="btn-press inline-flex items-center gap-2 display text-sm sm:text-base px-6 py-4 rounded-[var(--radius-sm)]"
              style={{ background: 'var(--blue)', color: '#fff', border: '2.5px solid var(--ink)', boxShadow: 'var(--block-shadow-md)' }}
            >
              Visit The Store
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-x-7 gap-y-3">
            {[
              { icon: Tag, label: '5 Color Tags', sub: '$2 – $9' },
              { icon: ArrowRight, label: 'New Stock', sub: 'All the time' },
              { icon: Star, label: 'First Come', sub: 'First served' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon size={18} color="var(--ink)" strokeWidth={2.25} aria-hidden="true" />
                <div className="leading-tight">
                  <div className="mono text-xs font-bold uppercase" style={{ color: 'var(--ink)' }}>{label}</div>
                  <div className="mono text-[0.7rem]" style={{ color: 'var(--muted)' }}>{sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotate: -8 }}
          animate={{ opacity: 1, y: 0, rotate: -6 }}
          transition={{ duration: 0.8, ease: EASE_BOUNCE, delay: 0.3 }}
          className="justify-self-center"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            style={{ transformOrigin: 'center' }}
          >
            <div
              className="price-tag-card relative flex flex-col items-center justify-center text-center px-12 py-14 sm:px-16 sm:py-20"
              style={{
                background: 'var(--yellow)',
                border: '3px solid var(--ink)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--block-shadow-lg)',
                width: 'min(90vw, 420px)',
              }}
            >
              {/* hole-punch */}
              <div
                aria-hidden="true"
                className="absolute rounded-full"
                style={{ top: 22, left: 22, width: 26, height: 26, background: 'var(--paper)', border: '2.5px solid var(--ink)' }}
              />
              <p className="mono text-sm font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--ink)' }}>Starting At</p>
              <p className="display leading-none" style={{ fontSize: 'clamp(5rem, 15vw, 8.5rem)', color: 'var(--ink)' }}>$2</p>
              <p className="display text-2xl mt-2" style={{ color: 'var(--ink)' }}>Dig In.</p>
              {/* barcode */}
              <div aria-hidden="true" className="flex items-end gap-[2px] mt-6" style={{ height: 36 }}>
                {[3,1,2,4,1,3,2,1,4,2,1,3,2,4,1,2].map((w, i) => (
                  <span key={i} style={{ width: w * 1.2, height: '100%', background: 'var(--ink)' }} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}

/* ══════════════════════════════════════════ HOW IT WORKS ══════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { n: '01', title: 'New Stock Arrives', desc: 'Truckloads of liquidation, overstock, and returns come in every week.' },
    { n: '02', title: 'Everything Gets Tagged', desc: 'Every item gets a color tag. The color tells you the price. No stickers to hunt for, no guessing.' },
    { n: '03', title: 'Prices Drop Daily', desc: "Tags don't stay put. The longer an item sits, the cheaper it gets." },
    { n: '04', title: 'You Dig In', desc: "First come, first served. What's here today might be gone tomorrow." },
  ]
  return (
    <section className="py-16 sm:py-24" style={{ background: 'var(--paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <motion.p variants={fadeUp} className="mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
            How It Works
          </motion.p>
          <motion.h2 variants={fadeUp} className="display text-[clamp(2rem,5vw,3.5rem)]" style={{ color: 'var(--ink)' }}>
            From Truck To Tag To You
          </motion.h2>
        </Reveal>

        <Reveal staggerDelay={0.08} className="grid how-grid gap-4">
          {steps.map((s) => (
            <motion.div
              key={s.n}
              variants={fadeUp}
              className="p-6"
              style={{ background: '#fff', border: '3px solid var(--ink)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--block-shadow-sm)' }}
            >
              <p className="display text-2xl mb-3" style={{ color: 'var(--red)' }}>{s.n}</p>
              <h3 className="display text-base mb-1.5" style={{ color: 'var(--ink)' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════ TAGS ══════════════════════════════════════════ */
function Tags() {
  const tags = [
    { color: 'var(--yellow)', text: 'var(--ink)', label: 'Yellow Tag', price: '$2' },
    { color: 'var(--green)', text: 'var(--ink)', label: 'Green Tag', price: '$3' },
    { color: 'var(--blue)', text: '#fff', label: 'Blue Tag', price: '$5' },
    { color: 'var(--purple)', text: '#fff', label: 'Purple Tag', price: '$7' },
    { color: 'var(--red)', text: 'var(--ink)', label: 'Red Tag', price: '$9' },
  ]
  return (
    <section id="tags" className="py-16 sm:py-24" style={{ background: 'var(--paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <motion.p variants={fadeUp} className="mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
            The Pricing System
          </motion.p>
          <motion.h2 variants={fadeUp} className="display text-[clamp(2rem,5vw,3.5rem)]" style={{ color: 'var(--ink)' }}>
            Five Tags. Five Prices.
          </motion.h2>
        </Reveal>

        <Reveal staggerDelay={0.08} className="grid tags-grid gap-4 mb-8">
          {tags.map((t) => (
            <motion.div
              key={t.label}
              variants={fadeUp}
              className="tag-card flex flex-col items-start justify-between p-5 sm:p-6"
              style={{ background: t.color, color: t.text, border: '3px solid var(--ink)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--block-shadow-md)', minHeight: 160 }}
            >
              <Tag size={22} strokeWidth={2.5} aria-hidden="true" />
              <div>
                <p className="display leading-none" style={{ fontSize: 'clamp(2.2rem,5vw,3rem)' }}>{t.price}</p>
                <p className="mono text-xs font-bold uppercase tracking-wide mt-1">{t.label}</p>
              </div>
            </motion.div>
          ))}
        </Reveal>

        <Reveal className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Daily Markdowns', body: 'Tag prices change daily. Check the color system above to score the best deals.' },
            { title: 'First Come, First Served', body: "Great finds don't last. Stop in early for the best selection." },
          ].map((n) => (
            <motion.div
              key={n.title}
              variants={fadeUp}
              className="p-6"
              style={{ background: 'transparent', border: '2.5px solid var(--ink)', borderRadius: 'var(--radius-md)' }}
            >
              <h3 className="display text-lg mb-1.5" style={{ color: 'var(--ink)' }}>{n.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{n.body}</p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════ SHELF ══════════════════════════════════════════ */
function Shelf() {
  return (
    <section id="shelf" className="py-16 sm:py-24" style={{ background: 'var(--ink)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid shelf-grid gap-10 items-center mb-10">
          <Reveal>
            <motion.p variants={fadeUp} className="mono text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--muted-on-dark)' }}>
              Shelf Deals
            </motion.p>
            <motion.h2 variants={fadeUp} className="display text-[clamp(2.2rem,6vw,3.8rem)]" style={{ color: 'var(--paper)' }}>
              Liquidation Finds. Unreal Prices.
            </motion.h2>
          </Reveal>

          <Reveal>
            <motion.div
              variants={fadeUp}
              className="p-8 sm:p-10 text-center sm:text-left"
              style={{ background: 'var(--paper)', border: '3px solid var(--paper)', borderRadius: 'var(--radius-lg)' }}
            >
              <p className="mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Up to</p>
              <p className="display leading-none mb-1" style={{ fontSize: 'clamp(3rem,8vw,5rem)', color: 'var(--ink)' }}>50%</p>
              <p className="display text-lg" style={{ color: 'var(--ink)' }}>Off Retail</p>
            </motion.div>
          </Reveal>
        </div>

        <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Thousands Of Items', sub: 'New stock added daily' },
            { label: 'Happy Hunters', sub: 'Love the thrill of the find' },
            { label: '8+ Categories', sub: 'Something for everyone' },
            { label: 'Open 7 Days', sub: 'No day off from deals' },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="p-6"
              style={{ border: '2.5px solid var(--muted-on-dark)', borderRadius: 'var(--radius-md)' }}
            >
              <p className="display text-base mb-1" style={{ color: 'var(--paper)' }}>{s.label}</p>
              <p className="mono text-xs" style={{ color: 'var(--muted-on-dark)' }}>{s.sub}</p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════ CATEGORIES ══════════════════════════════════════════ */
function Categories() {
  const cats = [
    { icon: Tv, label: 'Electronics', desc: 'TVs, tablets, phones & gaming gear', badge: 'Hot', photo: photoElectronics },
    { icon: Shirt, label: 'Clothing & Apparel', desc: 'Brand-name clothing for the family', badge: null, photo: photoClothing },
    { icon: Package, label: 'Mystery Boxes', desc: 'Sealed surprise boxes for the true treasure hunters', badge: null, photo: photoMysteryBoxes },
    { icon: Gamepad2, label: 'Toys & Games', desc: 'Board games, action figures & more', badge: 'New', photo: photoToys },
  ]
  return (
    <section id="categories" className="py-16 sm:py-24" style={{ background: 'var(--paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <motion.p variants={fadeUp} className="mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
            What We Sell
          </motion.p>
          <motion.h2 variants={fadeUp} className="display text-[clamp(2rem,5vw,3.5rem)]" style={{ color: 'var(--ink)' }}>
            Something For Everyone
          </motion.h2>
        </Reveal>

        <Reveal staggerDelay={0.1} className="grid cats-grid gap-5">
          {cats.map(({ icon: Icon, label, desc, badge, photo }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="cat-card relative p-6"
              style={{ background: '#fff', border: '3px solid var(--ink)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--block-shadow-md)' }}
            >
              {badge && (
                <span
                  className="absolute mono text-[0.65rem] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                  style={{
                    top: -12, right: 16,
                    background: badge === 'Hot' ? 'var(--red)' : 'var(--green)',
                    color: 'var(--ink)',
                    border: '2px solid var(--ink)',
                  }}
                >
                  {badge}
                </span>
              )}
              {photo ? (
                <img
                  src={photo}
                  alt={`${label} at Bins & Deals — ${desc}`}
                  className="aspect-[16/10] w-full object-cover mb-4"
                  style={{ borderRadius: 'var(--radius-sm)', border: '2px solid var(--ink)' }}
                  loading="lazy"
                />
              ) : (
                <Placeholder label={label} className="mb-4" aspect="aspect-[16/10]" />
              )}
              <Icon size={26} strokeWidth={2} color="var(--ink)" aria-hidden="true" />
              <h3
                className="display text-lg mt-4 pt-3"
                style={{ color: 'var(--ink)', borderTop: '2px dashed var(--border)' }}
              >
                {label}
              </h3>
              <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>{desc}</p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════ INSIDE THE STORE ══════════════════════════════════════════ */
function InsideStore() {
  const shots = [
    { src: photoShoppingDay, alt: 'Customers digging through the bins on a busy shopping day at Bins & Deals', caption: 'A regular Saturday. First come, first served — and it shows.' },
    { src: photoInterior, alt: 'Wide view of the Bins & Deals showroom, rows of bins and fully stocked shelves', caption: "Rows of bins, wall-to-wall stock. There's always another aisle." },
  ]
  return (
    <section className="py-16 sm:py-24" style={{ background: 'var(--paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <motion.p variants={fadeUp} className="mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
            See For Yourself
          </motion.p>
          <motion.h2 variants={fadeUp} className="display text-[clamp(2rem,5vw,3.5rem)]" style={{ color: 'var(--ink)' }}>
            Inside The Store
          </motion.h2>
        </Reveal>

        <Reveal staggerDelay={0.1} className="grid sm:grid-cols-2 gap-5">
          {shots.map((s) => (
            <motion.div key={s.src} variants={fadeUp}>
              <div style={{ border: '3px solid var(--ink)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--block-shadow-sm)', overflow: 'hidden' }}>
                <img src={s.src} alt={s.alt} className="w-full aspect-[4/3] object-cover block" loading="lazy" />
              </div>
              <p className="mono text-xs mt-3 leading-relaxed" style={{ color: 'var(--muted)' }}>{s.caption}</p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════ CLAW ══════════════════════════════════════════ */
function Claw() {
  return (
    <section id="claw" className="py-16 sm:py-24" style={{ background: 'var(--ink)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid claw-grid gap-10 items-center">
        <Reveal>
          <motion.p variants={fadeUp} className="mono text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--muted-on-dark)' }}>
            In-Store Fun
          </motion.p>
          <motion.h2 variants={fadeUp} className="display text-[clamp(2.2rem,6vw,3.8rem)] mb-4" style={{ color: 'var(--paper)' }}>
            Claw Machine
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base leading-relaxed" style={{ color: 'var(--muted-on-dark)', maxWidth: '38ch' }}>
            Right inside the store. Perfect for kids and adults. Try your luck while you shop.
          </motion.p>
        </Reveal>

        <Reveal className="justify-self-center">
          <motion.div
            variants={fadeUp}
            whileHover={{ rotate: -1, scale: 1.02 }}
            className="relative"
            style={{ width: 'min(90vw, 440px)' }}
          >
            <img
              src={photoClaw}
              alt="The real claw machine inside Bins & Deals, stocked with plush prizes"
              className="w-full aspect-[4/5] object-cover"
              style={{ border: '3px solid var(--paper)', borderRadius: 'var(--radius-lg)', boxShadow: '8px 8px 0 rgba(245,240,230,0.25)' }}
              loading="lazy"
            />
            <div
              className="absolute flex flex-col items-center justify-center text-center"
              style={{
                bottom: -18, right: -18,
                width: 92, height: 92,
                background: 'var(--yellow)',
                border: '3px solid var(--ink)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--block-shadow-sm)',
                transform: 'rotate(-6deg)',
              }}
            >
              <p className="display text-base leading-none" style={{ color: 'var(--ink)' }}>$1 = 4</p>
              <p className="mono text-[0.6rem] font-bold uppercase tracking-wide mt-1" style={{ color: 'var(--ink)' }}>Tokens</p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════ FAQ ══════════════════════════════════════════ */
function FAQ() {
  const [open, setOpen] = useState(0)
  const faqs = [
    { q: 'How does the pricing actually work?', a: 'Every item in the bins gets a color tag: yellow, green, blue, purple, or red. Each color is a fixed price, from $2 to $9. No scanning, no haggling — the tag says the price.' },
    { q: 'Do prices really drop daily?', a: "Yes. Tags don't reset when new stock comes in — the whole system rotates, so older stock trends toward the cheaper tags over time. Earlier in the week usually means more selection." },
    { q: 'What forms of payment do you take?', a: 'Cash and card, in-store. See the payment icons at checkout for the full list.' },
    { q: 'Where does the inventory come from?', a: 'Liquidation pallets, overstock, and store returns — new, refurbished, and gently used items across every category.' },
    { q: 'Is the claw machine actually winnable?', a: "It's a real claw machine, $1 for 4 tokens. Kids and adults both give it a shot while the grown-ups shop." },
  ]
  return (
    <section className="py-16 sm:py-24" style={{ background: 'var(--paper)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <motion.p variants={fadeUp} className="mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
            Questions
          </motion.p>
          <motion.h2 variants={fadeUp} className="display text-[clamp(2rem,5vw,3.5rem)]" style={{ color: 'var(--ink)' }}>
            Before You Come In
          </motion.h2>
        </Reveal>

        <Reveal staggerDelay={0.06} className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={f.q}
                variants={fadeUp}
                style={{ background: '#fff', border: '3px solid var(--ink)', borderRadius: 'var(--radius-md)', boxShadow: isOpen ? 'var(--block-shadow-sm)' : 'none' }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <span className="display text-base sm:text-lg" style={{ color: 'var(--ink)' }}>{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    style={{ flexShrink: 0, display: 'flex' }}
                  >
                    <ChevronDown size={20} color="var(--ink)" aria-hidden="true" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="text-sm leading-relaxed px-5 pb-5" style={{ color: 'var(--muted)' }}>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════ VISIT ══════════════════════════════════════════ */
function Visit() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const isWeekday = today !== 'Sunday'
  const info = [
    {
      icon: MapPin,
      title: '892 Rte 291',
      lines: ['Liberty, MO 64068', 'Next to Dollar Tree & Price Chopper'],
      link: { text: 'Open in Google Maps ↗', href: 'https://maps.google.com/?q=892+Rte+291+Liberty+MO+64068' },
    },
    {
      icon: Clock,
      title: isWeekday ? '10AM – 8PM' : '11AM – 7PM',
      lines: ['Mon – Sat: 10AM – 8PM', 'Sunday: 11AM – 7PM'],
      link: null,
    },
    {
      icon: Phone,
      title: '(816) 222-4238',
      lines: ['Call anytime', 'Cash & card accepted'],
      link: { text: 'Call Now', href: 'tel:8162224238' },
    },
  ]
  return (
    <section
      id="visit"
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{
        background: 'var(--paper)',
        backgroundImage: 'radial-gradient(var(--border) 1.4px, transparent 1.4px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <motion.p variants={fadeUp} className="mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
            We're Open
          </motion.p>
          <motion.h2 variants={fadeUp} className="display text-[clamp(2rem,5vw,3.5rem)]" style={{ color: 'var(--ink)' }}>
            Visit Us
          </motion.h2>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal staggerDelay={0.1} className="grid sm:grid-cols-3 gap-4">
            {info.map(({ icon: Icon, title, lines, link }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="p-6"
                style={{ background: '#fff', border: '3px solid var(--ink)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--block-shadow-sm)' }}
              >
                <Icon size={22} strokeWidth={2.25} color="var(--ink)" aria-hidden="true" />
                <p className="display text-lg mt-3" style={{ color: 'var(--ink)' }}>{title}</p>
                {lines.map((l) => (
                  <p key={l} className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{l}</p>
                ))}
                {link && (
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="mono text-xs font-bold uppercase tracking-wide inline-block mt-3 underline"
                    style={{ color: 'var(--blue)' }}
                  >
                    {link.text}
                  </a>
                )}
              </motion.div>
            ))}
          </Reveal>

          <Reveal className="grid sm:grid-cols-2 gap-4">
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden flex items-center justify-center"
              style={{ border: '3px solid var(--ink)', borderRadius: 'var(--radius-md)', height: 420, background: '#EFE8D8' }}
            >
              <img
                src={photoStorefront}
                alt="Bins & Deals storefront in Liberty, Missouri, with customers arriving"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 30%' }}
                loading="lazy"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden"
              style={{ border: '3px solid var(--ink)', borderRadius: 'var(--radius-md)', height: 420, background: '#EFE8D8' }}
            >
              <iframe
                title="Bins & Deals location — 892 Rte 291, Liberty, MO 64068"
                src="https://www.google.com/maps?q=892+Rte+291,+Liberty,+MO+64068&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════ FOOTER ══════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: 'var(--ink)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid footer-grid gap-8">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <TagIcon size={26} />
            <span className="display text-lg" style={{ color: 'var(--paper)' }}>Bins &amp; Deals</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-on-dark)', maxWidth: '32ch' }}>
            Your local liquidation store for new, refurbished, and used products at unbeatable prices in Liberty, MO.
          </p>
        </div>

        <address className="not-italic">
          <p className="mono text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--paper)' }}>Hours</p>
          <p className="text-sm mb-1" style={{ color: 'var(--muted-on-dark)' }}>Mon – Sat: 10:00 AM – 8:00 PM</p>
          <p className="text-sm" style={{ color: 'var(--muted-on-dark)' }}>Sunday: 11:00 AM – 7:00 PM</p>
        </address>

        <div>
          <p className="mono text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--paper)' }}>Find Us</p>
          <p className="text-sm mb-1" style={{ color: 'var(--muted-on-dark)' }}>892 Rte 291, Liberty, MO 64068</p>
          <a href="tel:8162224238" className="text-sm underline" style={{ color: 'var(--paper)' }}>(816) 222-4238</a>
        </div>

        <div>
          <p className="mono text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--paper)' }}>Follow Us</p>
          <div className="flex items-center gap-3">
            <a
              href={FB_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bins & Deals on Facebook"
              className="btn-press inline-flex items-center justify-center"
              style={{ width: 44, height: 44, background: 'var(--paper)', color: 'var(--ink)', border: '2.5px solid var(--paper)', borderRadius: 'var(--radius-sm)' }}
            >
              <FacebookIcon size={19} />
            </a>
            <a
              href={FB_MARKETPLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bins & Deals on Facebook Marketplace"
              className="btn-press inline-flex items-center justify-center"
              style={{ width: 44, height: 44, background: 'var(--paper)', color: 'var(--ink)', border: '2.5px solid var(--paper)', borderRadius: 'var(--radius-sm)' }}
            >
              <Store size={19} strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-3">
          <p className="mono text-xs" style={{ color: 'var(--muted-on-dark)' }}>© {new Date().getFullYear()} Bins &amp; Deals. All rights reserved.</p>
          <a href="tel:8162224238" className="mono text-xs font-bold" style={{ color: 'var(--paper)' }}>(816) 222-4238</a>
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════ APP ══════════════════════════════════════════ */
export default function App() {
  useEffect(() => {
    if (!window.location.hash) return
    const el = document.getElementById(window.location.hash.slice(1))
    if (!el) return
    requestAnimationFrame(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - 88
      const prev = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo({ top: y, behavior: 'instant' })
      document.documentElement.style.scrollBehavior = prev
    })
  }, [])

  return (
    <div style={{ background: 'var(--paper)' }}>
      <Nav />
      <Hero />
      <HowItWorks />
      <Tags />
      <Shelf />
      <Categories />
      <InsideStore />
      <Claw />
      <FAQ />
      <Visit />
      <Footer />
    </div>
  )
}
