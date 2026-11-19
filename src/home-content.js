// Copy for the landing page. Edit text here.

/* ------------------------- Hero: idea composer ------------------------- */
// Visitors pick a product and a business; the preview builds a mock-up.
// The names and numbers below are sample data for the mock-ups only.

export const PRODUCTS = [
  { id: 'website', label: 'Website', name: 'a website', plural: 'websites' },
  { id: 'mobile', label: 'Mobile app', name: 'a mobile app', plural: 'mobile apps' },
  { id: 'dashboard', label: 'Dashboard', name: 'a dashboard', plural: 'dashboards' },
  { id: 'ai', label: 'AI assistant', name: 'an AI assistant', plural: 'AI assistants' },
  { id: 'tool', label: 'Internal tool', name: 'an internal tool', plural: 'internal tools' },
];

export const BUSINESSES = [
  {
    id: 'clinic',
    label: 'Clinic',
    brand: 'Sunrise Clinic',
    tagline: 'Care, booked in a minute.',
    action: 'Book a visit',
    hue: '#2f7d6d',
    items: ['Dr. Meera · 10:30 AM', 'Dr. Arjun · 11:15 AM', 'Dr. Kavya · 2:00 PM'],
    q: 'Are you open on Sunday?',
    a: 'Yes, 9 AM to 1 PM. Shall I book you a slot?',
    stats: [
      ['Visits today', '48'],
      ['No-shows', '2'],
      ['Revenue', '₹38k'],
    ],
    board: ['Waiting', 'With doctor', 'Done'],
  },
  {
    id: 'shop',
    label: 'Shop',
    brand: 'Thread & Co.',
    tagline: 'New drops every Friday.',
    action: 'Shop now',
    hue: '#b5533c',
    items: ['Linen shirt · ₹1,499', 'Denim jacket · ₹2,999', 'Canvas tote · ₹599'],
    q: 'Is the linen shirt in size M?',
    a: 'Yes, 4 left in M. Add it to your cart?',
    stats: [
      ['Orders', '126'],
      ['Low stock', '3'],
      ['Sales', '₹1.2L'],
    ],
    board: ['New orders', 'Packing', 'Shipped'],
  },
  {
    id: 'startup',
    label: 'Startup',
    brand: 'Loopnote',
    tagline: 'Meeting notes that write themselves.',
    action: 'Start free',
    hue: '#5b4bc4',
    items: ['Weekly sync · 12 notes', 'Design review · 8 notes', 'Investor call · 5 notes'],
    q: 'Summarise yesterday’s call',
    a: '3 decisions, 2 follow-ups. Sent to Slack.',
    stats: [
      ['Sign-ups', '312'],
      ['Active', '74%'],
      ['MRR', '$4.8k'],
    ],
    board: ['Backlog', 'Building', 'Shipped'],
  },
  {
    id: 'school',
    label: 'School',
    brand: 'Green Valley School',
    tagline: 'Every parent, in the loop.',
    action: 'Pay fees',
    hue: '#3d7a2e',
    items: ['Class 5 · Science fair', 'Class 8 · PTM on Friday', 'Class 10 · Mock exams'],
    q: 'When is the next PTM?',
    a: 'Friday, 4 PM in the main hall. Want a reminder?',
    stats: [
      ['Attendance', '96%'],
      ['Fees paid', '88%'],
      ['Messages', '1.4k'],
    ],
    board: ['Applied', 'Interview', 'Admitted'],
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    brand: 'Spice Route',
    tagline: 'Biryani, straight from the pot.',
    action: 'Order now',
    hue: '#c0801f',
    items: ['Chicken biryani · ₹289', 'Paneer tikka · ₹249', 'Filter coffee · ₹59'],
    q: 'A table for 4 at 8 PM?',
    a: 'Yes, by the window. Booking it under your name?',
    stats: [
      ['Orders', '212'],
      ['Avg. prep', '18m'],
      ['Rating', '4.7'],
    ],
    board: ['New', 'Cooking', 'Out for delivery'],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    brand: 'SwiftHaul',
    tagline: 'Every truck, live on the map.',
    action: 'Track shipment',
    hue: '#1f6fa8',
    items: ['TN-09 · Chennai → Bengaluru', 'KA-05 · Mysuru → Hosur', 'TN-22 · Madurai → Trichy'],
    q: 'Where is shipment 4821?',
    a: 'Near Krishnagiri. Arriving by 6:40 PM.',
    stats: [
      ['On the road', '36'],
      ['On time', '94%'],
      ['Delivered', '418'],
    ],
    board: ['Loading', 'In transit', 'Delivered'],
  },
];

export const HERO_PROOF = ['Fixed quote in 2 days', 'Support after launch', 'You own the code'];

/* ----------------------------- What we build ----------------------------- */

export const BUILD_CARDS = [
  {
    title: 'Websites that sell',
    text: 'Marketing sites, landing pages and stores that load fast, rank well and turn visitors into calls, bookings and orders.',
    chips: ['Next.js', 'WordPress', 'Shopify'],
    time: '2–4 weeks',
    to: '/services#websites',
    tone: 'paper',
    art: 'site',
  },
  {
    title: 'Apps people keep',
    text: 'Web and mobile apps with sign-in, payments and an admin panel. One codebase for Android and iOS, taken through store review.',
    chips: ['React', 'Flutter', 'Node.js'],
    time: '6–14 weeks',
    to: '/services#web-apps',
    tone: 'cobalt',
    art: 'app',
  },
  {
    title: 'Software shaped to you',
    text: 'CRMs, ERPs, inventory and back-office tools that follow how your team already works, not the other way round.',
    chips: ['Python', 'Django', 'PostgreSQL'],
    time: '6–16 weeks',
    to: '/services#custom-software',
    tone: 'sun',
    art: 'grid',
  },
  {
    title: 'AI that does the busywork',
    text: 'Assistants that answer from your documents, tools that read invoices, and automations that move data without copy and paste.',
    chips: ['LLM APIs', 'OCR', 'n8n'],
    time: '3–8 weeks',
    to: '/services#ai',
    tone: 'ink',
    art: 'ai',
  },
];

/* ---------------------------- Before / after ---------------------------- */

export const BEFORE = [
  { text: 'Order #212 — did anyone ship this??', kind: 'chat' },
  { text: 'stock_sheet_v7_FINAL(2).xlsx', kind: 'file' },
  { text: 'Call back Ravi about the invoice', kind: 'note' },
  { text: '3 missed calls', kind: 'alert' },
  { text: 'Which price is the latest one?', kind: 'chat' },
  { text: 'Copy orders into Tally, again', kind: 'note' },
];

export const AFTER = [
  { label: 'Orders today', value: '212', note: 'All shipped' },
  { label: 'Stock', value: 'Synced', note: 'Shop, site and app' },
  { label: 'Invoices', value: 'Auto-sent', note: 'Paid ones marked' },
  { label: 'Follow-ups', value: '0', note: 'Nothing pending' },
];

/* -------------------------------- Process -------------------------------- */

export const TRACK = [
  { when: 'Day 1', title: 'We talk', text: 'A free 30-minute call about your idea, users and deadline.' },
  { when: 'Day 3', title: 'You get a fixed quote', text: 'Scope, timeline and one price, in writing.' },
  { when: 'Each milestone', title: 'You review it', text: 'You test the working build at every milestone, before you pay for it.' },
  { when: 'Launch', title: 'We stay on', text: 'Thirty days of free fixes, then a care plan if you want one.' },
];

/* ------------------------------- Promises ------------------------------- */

export const FLIPS = [
  { front: 'No surprise invoices', back: 'The price is fixed before we start. Changes are priced in writing and only go ahead when you say yes.' },
  { front: 'It is all yours', back: 'Code, designs, domains and cloud accounts are in your name from day one.' },
  { front: 'One person to call', back: 'A single project lead who knows your product and replies within one working day.' },
  { front: 'Founders on every project', back: 'B and P are on every project, from the first call to the launch.' },
];

/* ---------------------------- Final call to action ---------------------------- */

export const FINAL_PICKS = [
  'A new website',
  'A mobile app',
  'An online store',
  'A custom CRM or ERP',
  'An AI assistant',
  'Fixing something we have',
];
