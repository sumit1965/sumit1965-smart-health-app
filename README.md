# Smart Health Assistance App v5 — Deployment Guide

## What's in this package
| File | Purpose |
|------|---------|
| index.html | Complete app — all code in one file |
| manifest.json | PWA manifest — enables "Install app" |
| sw.js | Service worker — offline mode + push notifications |
| icon-192.png / icon-512.png | App icons |
| netlify.toml | Correct headers for camera + service worker |
| netlify/functions/notify.js | Optional Twilio SMS backend |

## Deploy FREE in 2 minutes (Netlify)
1. Go to https://app.netlify.com/drop
2. Drag the entire `sha-final` folder onto the page
3. Done — live at https://xxx.netlify.app

## First-time setup in the app
1. Register a user account (username + password)
2. Settings tab → enter Telegram bot token + Chat ID → tap "Save & test"
3. Settings tab → enter Anthropic API key → tap "Save key"
4. Tap the 🔔 bell icon → allow notifications
5. Add patients → they're saved permanently to your account

## Make it installable (PWA)
After deploying to Netlify (HTTPS required):
- Android Chrome: tap ⋮ → "Add to Home Screen" → Install
- iPhone Safari: Share → "Add to Home Screen"
- Desktop Chrome: install icon in address bar

## Telegram setup (get a NEW token — revoke any exposed ones)
1. Telegram → search @BotFather → /newbot → follow steps → copy token
2. Start your bot (search it, press Start)
3. Get Chat ID: search @userinfobot → send any message → copy your ID
4. Each patient can also have their own caretaker Chat ID in Add Patient form

## Features in v5
- Login / register with SHA-256 hashed passwords
- Per-user isolated patient data (no mixing between accounts)
- Duplicate patient names blocked per account
- Auto camera opens at medication time (no button press)
- MediGesture engine: angle-based, 5-frame smoothing, 60% confidence threshold
  - 👍 thumbs-up = confirm taken
  - ✊ fist = refused
  - 🖐 open palm = next medicine
  - ✌️ peace = reset/undo
- Claude AI Vision scans every 5s — auto-confirms at 65%+ confidence
- 2-minute countdown timer — auto-alerts on expiry
- Telegram auto-alerts (zero taps) for all events
- Browser push notifications
- Full event log grouped by date, up to 500 entries per user
- Dark/light mode auto-detection
- SOS emergency button (floating, always visible)
- PWA installable — works offline
