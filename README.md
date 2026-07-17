# Bins & Deals — Liquidation Retail Website

**Live site:** [binsanddeals.com](https://binsanddeals.com) · **Case study:** [naveensereddy.com/case-bins](https://naveensereddy.com/case-bins)

A real client project, not a portfolio simulation. Bins & Deals is a liquidation retail store in Liberty, Missouri — new, refurbished, and overstock inventory that changes weekly, sold on a color-tag pricing system where every item gets cheaper the longer it sits on the shelf. I partnered directly with the owner to design, build, and launch the store's first real website: research, UX, UI, frontend development, deployment, SEO, and the maintenance since.

<img width="1440" height="900" alt="Homepage hero" src="screenshots/hero-home.png" />

<img width="1440" height="900" alt="Pricing page — color-tag system" src="screenshots/hero-pricing.png" />

<img width="1440" height="900" alt="In-store claw machine promotion" src="screenshots/hero-claw-machine.png" />

<img width="1440" height="900" alt="Store hours and location" src="screenshots/hero-hours.png" />

<img width="1440" height="900" alt="Facebook and Marketplace integration" src="screenshots/hero-social.png" />

## Why I built it this way

Before this site existed, the business ran entirely on foot traffic, word of mouth, and a Facebook page. The owner's biggest recurring headache was the phone: people calling to ask what time the store closed, or driving over and leaving confused about how pricing worked, because there was nowhere to explain it before they showed up.

So the whole site is built around one idea: answer the questions people actually ask, in the order they ask them. What is this place, how does pricing work, what do you sell, where are you, when are you open, how do I reach you. Pricing gets the most weight of any page, because it's genuinely unusual — every item is tagged red, purple, blue, green, or yellow, priced from $9 down to $2, and prices drop the longer an item sits unsold. That's not a detail you can leave to word of mouth; it's the whole reason people come back weekly.

Most traffic arrives from a Facebook link on a phone, so the site is mobile-first rather than mobile-adapted: large tap targets, the phone number one tap away, hours visible without scrolling. Rather than compete with the Facebook presence the business already had, the site links straight into it — Facebook page and Marketplace listings are both one click from the homepage, not funneled into a "contact us" form nobody would fill out.

## What's in this repo

**`src/`** — the React + Vite site. `App.jsx` is the entry point.

**`docs/`** — the project writeup: business context, research and discovery, design decisions, launch outcomes, and the full case study.

**`screenshots/`** — the screenshots used in this README.

**`public/`, `dist/`** — static assets and the production build.

## Role I played

End to end, solo: stakeholder interviews with the owner, customer conversations, information architecture, UX and UI design, responsive frontend development, deployment, SEO, and I'm still the one who maintains it.

## Tools

React, Vite, Tailwind CSS, Framer Motion.

## Run it locally

```
npm install
npm run dev
```

---

Naveen Sereddy — [naveensereddy.com](https://naveensereddy.com) · [github.com/Naveen-Sereddy](https://github.com/Naveen-Sereddy)
