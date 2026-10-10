// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to change your website's text, prices and links.
//  Everything marked TODO needs your real information.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Assar Developer",
  owner: "Assar Baloch",
  // Your live website address (free Firebase domain). Change if you buy a custom domain.
  url: "https://assardeveloper-dev.web.app",
  tagline: "Flutter apps that look great and actually ship.",
  description:
    "Flutter developer with 6+ years of experience building iOS, Android and web apps with Firebase. Hire me to build your app.",
  yearsExperience: 6,

  // TODO: your business email (shown on the site and used for the quote form fallback)
  email: "assardev58@gmail.com",
  // TODO: WhatsApp number in international format, digits only, e.g. "923001234567". Leave "" to hide.
  whatsapp: "923163824517",
  // TODO: create a free form at https://formspree.io and paste the form ID (e.g. "xyzabcd").
  // Until then, the quote form opens the visitor's email app instead.
  formspreeId: "",

  // Optional tip jar, e.g. "https://buymeacoffee.com/assardeveloper". Leave "" to hide.
  tipUrl: "",

  // Your YouTube channel ID. The site loads your latest videos from it automatically on every build.
  youtubeChannelId: "UCjwwMPtCOglPcBuwX1HMUNA",

  social: {
    youtube: "https://www.youtube.com/@assardeveloper",
    instagram: "https://www.instagram.com/assardeveloper/",
    tiktok: "https://www.tiktok.com/@assardeveloper2",
    facebook: "https://www.facebook.com/people/Assar-Developper/100092213422485/",
    github: "https://github.com/assardeveloper",
  },
  githubUser: "assardeveloper",

  // TODO: put your real numbers here (they build trust). Remove any you don't want to show.
  stats: [
    { value: "6+", label: "Years with Flutter" },
    { value: "30+", label: "Apps built" },
    { value: "1M+", label: "Video views" },
    { value: "4", label: "Platforms: iOS, Android, Web, Desktop" },
  ],
};

// Packages on the Hire Me page. Prices are "starting from" — adjust to your market.
export const packages = [
  {
    name: "UI to Flutter",
    price: "$300",
    time: "3–7 days",
    desc: "You have a Figma or design. I turn it into clean, responsive Flutter screens.",
    features: [
      "Pixel-accurate screens",
      "Animations & transitions",
      "Responsive for phones & tablets",
      "Clean, documented code",
    ],
  },
  {
    name: "MVP App",
    price: "$1,500",
    time: "3–5 weeks",
    desc: "Launch your idea fast. A working app your users can download.",
    features: [
      "Up to 15 screens",
      "Firebase auth & database",
      "Push notifications",
      "Play Store & App Store release",
      "30 days of bug fixes",
    ],
    highlight: true,
  },
  {
    name: "Full Product",
    price: "$4,000",
    time: "6–12 weeks",
    desc: "Complete app with admin panel, payments and everything a real business needs.",
    features: [
      "Mobile app + web admin panel",
      "Payments (Stripe, in-app purchases)",
      "Chat, maps, calls, real-time features",
      "Cloud Functions & security rules",
      "60 days of support",
    ],
  },
];

// Portfolio. Client apps are described by type, not by name.
// TODO: add screenshots and store links for apps you're allowed to show.
export const projects = [
  {
    title: "Delivery & Logistics Platform",
    type: "Client app · Africa",
    desc: "One app for customers, merchants, couriers and technicians, with live tracking, secure handover and a web control center.",
    tech: ["Flutter", "Firebase", "Cloud Functions", "Maps"],
  },
  {
    title: "Dating & Community App",
    type: "Client app",
    desc: "Swipe and map discovery, chat with audio & video calls, selfie verification and a safety center with date check-ins.",
    tech: ["Flutter", "Firebase", "WebRTC", "Admin panel"],
  },
  {
    title: "Ride-Hailing App",
    type: "Product UI",
    desc: "Full ride booking flow: trip search, available drivers, driver profiles and live trip status.",
    tech: ["Flutter", "Google Maps", "Animations"],
  },
  {
    title: "Deals Marketplace",
    type: "Mobile + Web",
    desc: "Deals app with a companion web app, API integration and Firebase backend.",
    tech: ["Flutter", "Flutter Web", "REST API", "Firebase"],
  },
  {
    title: "Fitness Platform",
    type: "App + Admin",
    desc: "Fitness app with a web admin dashboard for managing users and content.",
    tech: ["Flutter", "Admin dashboard"],
  },
  {
    title: "Employee Management App",
    type: "Business app",
    desc: "HR and employee app for iOS, Android, web and desktop, with Firebase and Cloud Functions.",
    tech: ["Flutter", "Firebase", "Desktop"],
  },
];

export const faqs = [
  {
    q: "Do you build for both iOS and Android?",
    a: "Yes. Flutter gives you one codebase for iOS, Android and web, so you pay for one app and get all platforms.",
  },
  {
    q: "How do payments work?",
    a: "Usually 50% upfront and 50% on delivery. Bigger projects are split into milestones, and you pay as each one is finished.",
  },
  {
    q: "Will I own the source code?",
    a: "Yes. When the project is paid, you get the full source code and all rights to it.",
  },
  {
    q: "Can you publish the app to the stores?",
    a: "Yes, I handle Play Store and App Store submission using your developer accounts.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: "Yes, I work with clients worldwide and communicate in English over email, WhatsApp, Zoom or Google Meet.",
  },
];

// ─────────────────────────────────────────────────────────────
//  QUICK MONEY — small fixed-price services people can buy today.
//  buyUrl: paste a payment link (Lemon Squeezy, Gumroad, PayPal.me, Payoneer request).
//  If buyUrl is "", the button opens email/WhatsApp with the order pre-written,
//  so you can take orders and send a payment link by hand.
// ─────────────────────────────────────────────────────────────
export const quickServices = [
  {
    name: "Fix My Flutter Bug",
    price: "$25",
    time: "24 hours",
    desc: "Send me your error or broken feature. I find it and fix it.",
    icon: "🐞",
    buyUrl: "",
  },
  {
    name: "Design → Flutter Screen",
    price: "$49",
    time: "48 hours",
    desc: "One Figma or image design turned into a pixel-perfect, animated Flutter screen.",
    icon: "🎨",
    buyUrl: "",
    popular: true,
  },
  {
    name: "1-on-1 Flutter Call",
    price: "$30",
    time: "60 minutes",
    desc: "Live help on Zoom/Meet: debugging, architecture, career advice, code review.",
    icon: "🎧",
    buyUrl: "",
  },
  {
    name: "Publish to Play Store / App Store",
    price: "$59",
    time: "2–3 days",
    desc: "Signing, icons, screenshots, store listing and submission, done for you.",
    icon: "🚀",
    buyUrl: "",
  },
  {
    name: "Firebase Setup",
    price: "$69",
    time: "2 days",
    desc: "Auth, Firestore, storage, push notifications and secure rules connected to your app.",
    icon: "🔥",
    buyUrl: "",
  },
  {
    name: "App Code Review",
    price: "$39",
    time: "48 hours",
    desc: "A written report on bugs, performance, security and how to clean up your code.",
    icon: "🔍",
    buyUrl: "",
  },
];

// FREE source code. Your GitHub repos are shown automatically on the site.
// When you upload the code for a video, add a line here: "videoId": "repo link".
// (The video ID is the part after /shorts/ in the video's link.)
export const videoCode = {
  // "PeP0vPlbzkQ": "https://github.com/assardeveloper/smart-login-ui",
};
