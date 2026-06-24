# 🚌 NorthTravels

A full-stack travel booking website for North India bus routes — built with **Next.js 14**, **MongoDB**, **Nodemailer**, and **Tailwind CSS**.

Live demo: [northtravels.vercel.app](https://north-travels.vercel.app/) _(update after deployment)_

---

## Features

- **Booking form** — customers book seats with route, date, and passenger details
- **WhatsApp integration** — instant booking confirmation via WhatsApp
- **Contact form** — enquiries sent directly to owner's email via Nodemailer (Gmail SMTP)
- **MongoDB storage** — all bookings and enquiries saved to Atlas database
- **Admin dashboard** — password-protected panel to view/manage bookings and enquiries
- **Fully responsive** — works on mobile, tablet, and desktop
- **Smooth animations** — Framer Motion scroll animations throughout

---

## Tech Stack

| Layer      | Technology                   |
| ---------- | ---------------------------- |
| Framework  | Next.js 14 (App Router)      |
| Styling    | Tailwind CSS + Inline styles |
| Database   | MongoDB Atlas + Mongoose     |
| Email      | Nodemailer (Gmail SMTP)      |
| Animations | Framer Motion                |
| Deployment | Vercel                       |

---

## Project Structure

```
north-travels/
├── app/
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard (password protected)
│   ├── api/
│   │   ├── contact/route.ts      # Contact form → email + MongoDB
│   │   ├── booking/
│   │   │   ├── route.ts          # GET all bookings / POST new booking
│   │   │   └── [id]/route.ts     # PATCH booking status
│   │   └── enquiries/
│   │       ├── route.ts          # GET all enquiries
│   │       └── [id]/route.ts     # PATCH enquiry status
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── Services.tsx
│   │       ├── Routes.tsx
│   │       ├── Testimonials.tsx
│   │       ├── CTA.tsx
│   │       └── Contact.tsx
│   ├── lib/
│   │   └── mongodb.ts            # MongoDB connection utility
│   ├── models/
│   │   ├── Booking.ts
│   │   └── Enquiry.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── .env.local                    # Environment variables (not committed)
└── package.json
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/north-travels.git
cd north-travels
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/northtravels

# Gmail SMTP (use App Password, not regular password)
EMAIL_FROM=your@gmail.com
EMAIL_PASS=your_16_digit_app_password
EMAIL_TO=owner@gmail.com

# Admin dashboard password
NEXT_PUBLIC_ADMIN_PASSWORD=your_strong_password
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Setup

### MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Add database user with username + password
3. Allow network access from `0.0.0.0/0`
4. Copy connection string → paste in `MONGODB_URI`

### Gmail App Password

1. Go to [myaccount.google.com](https://myaccount.google.com) → Security
2. Enable 2-Step Verification
3. Search "App Passwords" → Create one → Select Mail
4. Copy 16-digit code (no spaces) → paste in `EMAIL_PASS`

---

## Deployment (Vercel)

```bash
npm install -g vercel
vercel
```

Add all `.env.local` variables in Vercel dashboard → Settings → Environment Variables.

---

## Routes Covered

- Delhi → Chandigarh
- Delhi → Jaipur
- Gurugram → Shimla
- Faridabad → Amritsar
- Haryana → Delhi NCR
- Custom routes on request

---

## License

MIT — free to use and modify.
