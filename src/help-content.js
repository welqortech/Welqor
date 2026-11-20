// Copy for the help and legal pages: Work overview, FAQs, Support Centre,
// Connect, Terms and Privacy. Edit text here.

/* --------------------------- Work overview --------------------------- */

export const WORK_MODELS = [
  {
    id: 'project',
    to: '/work/project',
    name: 'Fixed-scope project',
    short: 'Project',
    line: 'One scope, one price, paid as it ships.',
    tone: 'sun',
  },
  {
    id: 'team',
    to: '/work/team',
    name: 'Dedicated team',
    short: 'Team',
    line: 'Our people on your roadmap, booked monthly.',
    tone: 'cobalt',
  },
  {
    id: 'care',
    to: '/work/care',
    name: 'Care plan',
    short: 'Care',
    line: 'Monthly upkeep for something already live.',
    tone: 'sky',
  },
];

export const WORK_COMPARE = [
  { row: 'Best for', project: 'New builds, redesigns, MVPs', team: 'Ongoing roadmaps', care: 'Live sites and apps' },
  { row: 'How you pay', project: 'Fixed price, in milestones', team: 'Monthly, per person', care: 'Monthly, flat' },
  { row: 'Scope', project: 'Agreed up front', team: 'You set priorities weekly', care: 'Updates, fixes, small work' },
  { row: 'Commitment', project: 'Until launch', team: 'Month to month, with notice', care: 'Month to month' },
  { row: 'Starts in', project: 'About a week after sign-off', team: 'One to two weeks', care: 'After a health check' },
];

// The chooser on /work: each answer scores the three models.
export const WORK_QUESTIONS = [
  {
    q: 'Is the thing already live?',
    options: [
      { label: 'Not yet', score: { project: 2, team: 1, care: 0 } },
      { label: 'Yes, it is live', score: { project: 0, team: 1, care: 3 } },
    ],
  },
  {
    q: 'Do you know exactly what you need?',
    options: [
      { label: 'Yes, it is clear', score: { project: 3, team: 0, care: 1 } },
      { label: 'It keeps changing', score: { project: 0, team: 3, care: 0 } },
    ],
  },
  {
    q: 'How long will the work go on?',
    options: [
      { label: 'A few weeks or months', score: { project: 2, team: 0, care: 0 } },
      { label: 'For the foreseeable future', score: { project: 0, team: 2, care: 2 } },
    ],
  },
];

/* --------------------------- Support Centre --------------------------- */

export const SUPPORT_LEVELS = [
  {
    level: 'Urgent',
    short: 'Urgent',
    eta: '2 hrs',
    tone: 'red',
    when: 'Your site or app is down, payments are failing, or data looks wrong.',
    target: 'We aim to respond within 2 working hours.',
    subject: 'URGENT',
  },
  {
    level: 'Something is broken',
    short: 'Broken',
    eta: '1 day',
    tone: 'sun',
    when: 'A page, button or feature does not work the way it should.',
    target: 'We aim to respond within 1 working day.',
    subject: 'Bug report',
  },
  {
    level: 'A change or request',
    short: 'Request',
    eta: 'Next cycle',
    tone: 'green',
    when: 'New content, a small improvement, or a question about how something works.',
    target: 'Planned into your next monthly cycle.',
    subject: 'Change request',
  },
];

// The triage console on /support. `level` is an index into SUPPORT_LEVELS.
export const SUPPORT_SYMPTOMS = [
  { id: 'down', label: 'The site or app is down', glyph: '!', level: 0, tip: 'If you can, check it on mobile data too, so we know it is not your network.' },
  { id: 'pay', label: 'Payments are failing', glyph: '₹', level: 0, tip: 'Note the time of one failed payment and the amount. It lets us find it in the logs fast.' },
  { id: 'data', label: 'The data looks wrong', glyph: '#', level: 0, tip: 'Please do not try to correct it by hand yet. We may need the wrong values to trace the cause.' },
  { id: 'broken', label: 'Something is broken', glyph: '?', level: 1, tip: 'A screenshot or short screen recording usually halves the time to fix.' },
  { id: 'login', label: 'Someone cannot log in', glyph: '@', level: 1, tip: 'Tell us the email address they use, but never their password.' },
  { id: 'change', label: 'I need a change', glyph: '+', level: 2, tip: 'Describe the result you want, not just the button to move. We may suggest a simpler way.' },
  { id: 'question', label: 'I have a question', glyph: '…', level: 2, tip: 'Your handover document may already answer it, but ask anyway. We would rather you ask.' },
];

export const SUPPORT_CHECKLIST = [
  'The page address (URL) or the screen in the app',
  'What you expected to happen, and what happened instead',
  'The steps to make it happen again',
  'A screenshot or short screen recording',
  'The device and browser, if you know them',
];

export const SUPPORT_FIND = [
  { title: 'Handover document', text: 'How your product is set up, deployed and backed up. Shared with you at launch.' },
  { title: 'Monthly report', text: 'Updates, fixes and uptime for the month. Arrives in the first week of each month.' },
  { title: 'Accounts and access', text: 'Hosting, domains and code live in accounts in your name. Ask us if you need a login reset.' },
  { title: 'Invoices', text: 'Sent by email with each milestone or month. Reply to any invoice with questions.' },
];

/* ------------------------------ Connect ------------------------------ */

export const CONNECT_TOPICS = {
  project: { label: 'a fixed-scope project', subject: 'Project quote request' },
  team: { label: 'a dedicated team', subject: 'Dedicated team enquiry' },
  care: { label: 'a care plan', subject: 'Care plan enquiry' },
  hello: { label: 'something else', subject: 'Hello' },
};

export const CONNECT_NEEDS = [
  'Website',
  'Web app',
  'Mobile app',
  'Custom software',
  'Design',
  'AI and automation',
  'Cloud',
];

export const CONNECT_WHEN = ['as soon as possible', 'in the next 1 to 3 months', 'later this year', 'I am just exploring'];

export const CONNECT_NEXT = [
  { title: 'We read it', when: 'Within 1 working day', text: 'One of the founders reads every enquiry and writes back personally.' },
  { title: 'We talk', when: '30 minutes', text: 'A call about your goals, users and deadline. Free, no obligation.' },
  { title: 'You get a plan', when: 'About 2 working days', text: 'A written scope, timeline and fixed price to say yes or no to.' },
];

/* ------------------------------- Legal ------------------------------- */

export const LEGAL_UPDATED = '19 November 2026';

export const TERMS = [
  {
    id: 'who',
    title: 'Who we are',
    short: 'Welqor is the studio behind this website.',
    body: [
      'These terms apply to this website and to the services Welqor provides. "We" and "us" mean Welqor. "You" means the person or business using the site or working with us.',
      'Where you and Welqor sign a project agreement or proposal, that agreement takes priority over these terms if the two ever disagree.',
    ],
  },
  {
    id: 'site',
    title: 'Using this website',
    short: 'Browse freely; do not misuse it.',
    body: [
      'You may use this website to learn about our services and to contact us. Please do not try to break, overload or copy the site, or use it for anything unlawful.',
      'We work to keep the information here accurate, but it is general information, not a quote. Your written proposal is what counts.',
    ],
  },
  {
    id: 'quotes',
    title: 'Proposals and quotes',
    short: 'A quote is fixed once you accept it in writing.',
    body: [
      'After a discovery call we send a written proposal with scope, timeline and price. A proposal is valid for 30 days unless it says otherwise.',
      'Work begins once you accept the proposal in writing and the first milestone payment, if any, is made.',
    ],
  },
  {
    id: 'payment',
    title: 'Payments',
    short: 'Milestones for projects, monthly for teams and care.',
    body: [
      'Projects are invoiced by milestone. Dedicated teams and care plans are invoiced monthly in advance. Invoices are due within 14 days unless your agreement says otherwise.',
      'If an invoice is overdue, we may pause work until it is paid. We will always tell you before doing so.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to scope',
    short: 'Changes are priced and approved before work starts.',
    body: [
      'If you ask for something outside the agreed scope, we will tell you the effect on cost and timeline in writing. We do not start extra work until you approve it.',
    ],
  },
  {
    id: 'ownership',
    title: 'Ownership',
    short: 'You own what we build for you once it is paid for.',
    body: [
      'When you have paid for the work, you own the code, designs and content we created for you. Accounts we set up are created in your name from the start.',
      'We may use open-source software and our own general-purpose tools. These stay under their own licences, and you get the right to use them as part of your product.',
      'We may mention that we worked with you, unless you ask us not to.',
    ],
  },
  {
    id: 'yours',
    title: 'Your part',
    short: 'Timely feedback, access and content.',
    body: [
      'Projects run on time when feedback, approvals, content and access arrive on time. If they are delayed, the timeline moves by the same amount.',
      'You confirm that anything you give us to use, such as text, images or data, is yours to share.',
    ],
  },
  {
    id: 'confidential',
    title: 'Confidentiality',
    short: 'Your information stays private.',
    body: [
      'We keep your business information confidential and use it only to deliver the work. We are happy to sign a separate NDA.',
    ],
  },
  {
    id: 'fixes',
    title: 'Fixes after launch',
    short: 'Thirty days of free fixes on project work.',
    body: [
      'For 30 days after a project launches, we fix any bugs in the work we delivered at no charge. After that, fixes are covered by a care plan or quoted separately.',
    ],
  },
  {
    id: 'liability',
    title: 'Liability',
    short: 'Our liability is capped at what you paid us.',
    body: [
      'We are not responsible for losses caused by third-party services, such as hosting providers or payment gateways, or by changes made by others without our knowledge.',
      'To the extent the law allows, our total liability for any claim is limited to the fees you paid us for the work concerned in the three months before the claim.',
    ],
  },
  {
    id: 'ending',
    title: 'Ending the work',
    short: 'Either side can end it with notice.',
    body: [
      'Either of us can end an agreement with written notice as set out in the proposal. You pay for the work done up to that point, and we hand over everything completed so far.',
    ],
  },
  {
    id: 'law',
    title: 'Governing law',
    short: 'Indian law applies.',
    body: [
      'These terms are governed by the laws of India. We will always try to resolve any disagreement by talking first.',
    ],
  },
  {
    id: 'updates',
    title: 'Changes to these terms',
    short: 'The date at the top shows the latest version.',
    body: [
      'We may update these terms from time to time. Changes do not affect agreements already signed.',
    ],
  },
];

export const PRIVACY_LEDGER = [
  {
    what: 'Enquiry details',
    examples: 'Name, email, company, your message or call booking',
    why: 'To reply and prepare a proposal',
    keep: 'Up to 24 months after our last contact',
  },
  {
    what: 'Project information',
    examples: 'Files, credentials and data you share for the work',
    why: 'To deliver and support the project',
    keep: 'For the length of the work, then returned or deleted',
  },
  {
    what: 'Billing details',
    examples: 'Company name, address, tax number',
    why: 'To invoice you and meet tax law',
    keep: 'As long as tax law requires',
  },
  {
    what: 'Technical data',
    examples: 'Your IP address, seen by the font service',
    why: 'To load this website’s fonts',
    keep: 'Handled by Google under its own policy',
  },
];

export const PRIVACY = [
  {
    id: 'form',
    title: 'How our forms work',
    body: [
      'When you send a message or book a call, the details you typed are saved to a private Google Sheet that only the Welqor team can open. If you choose to confirm a call on WhatsApp or add it to Google Calendar, that app opens with the details filled in.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and tracking',
    body: [
      'This website does not set cookies and does not use analytics or advertising trackers.',
      'Fonts are loaded from Google Fonts, which means Google receives your IP address when the page loads.',
    ],
  },
  {
    id: 'share',
    title: 'Who we share data with',
    body: [
      'We never sell your data. We share it only with services we need to do the work, such as our email provider, Google (which hosts the sheet our forms save to) and, during a project, the hosting and tools you approve.',
    ],
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: [
      'You can ask us to show, correct or delete the personal data we hold about you, or to stop using it. We will reply within 30 days.',
      'These rights follow India’s Digital Personal Data Protection Act, 2023, and we apply them to everyone, wherever you live.',
    ],
  },
  {
    id: 'security',
    title: 'Keeping it safe',
    body: [
      'Access to client data is limited to the people working on your project. Credentials are stored in a password manager, never in email or chat.',
    ],
  },
];
