// Copy for the inner pages (About, Services, Industries, Solutions,
// Technologies and the three ways-to-work pages). Edit text here.

/* ------------------------------ About ------------------------------ */
// The founders' story. Chapters in `before` run as one shared thread,
// `b` and `p` split into two columns, and `after` brings them back together.

export const ABOUT = {
  before: [
    {
      tag: 'Class 5',
      title: 'Two hands went up.',
      text: 'First day of a new school year. The teacher reads the register, calls out "Kavinkumar", and two boys on opposite sides of the room stand up at the same time. Nobody wanted to be "the other one", so the class settled it by initials. From that day on, they were B and P.',
    },
    {
      tag: 'Classes 6 to 10',
      title: 'One computer, two questions.',
      text: 'Computer lab meant two students to a machine, and B and P always shared one. B kept opening things up to see how they worked. P kept asking what else the machine could be made to do. For a science fair they built a quiz game held together by nothing but PowerPoint hyperlinks. Their teacher kept using it for three more years.',
    },
    {
      tag: 'Class 12',
      title: 'The fork in the road.',
      text: 'Exams finished, admission letters arrived, and the letters pointed to two different colleges. On the last day of school they made one promise: whoever builds something real first calls the other.',
    },
  ],
  b: {
    who: 'Kavinkumar B',
    course: 'B.E. Computer Science and Engineering',
    chapters: [
      {
        title: 'Learning how things hold up',
        text: 'Data structures, operating systems, networks. B fell for the unglamorous part of software, the part that keeps working when a thousand people press the same button at once.',
      },
      {
        title: 'The billing app at 2 AM',
        text: 'His first paid job was a billing tool for a neighbourhood shop. It crashed on its first Diwali rush. He fixed it from the back of the shop before sunrise, and learned that software is a promise you have to keep.',
      },
    ],
  },
  p: {
    who: 'Kavinkumar P',
    course: 'MCA, Generative AI',
    chapters: [
      {
        title: 'Learning how machines read',
        text: 'Language models, retrieval, prompt design, evaluation. P went deep on getting software to read documents, answer questions and draft the boring parts of someone’s day.',
      },
      {
        title: 'The assistant that went quiet',
        text: 'For a department project he built an assistant that answered student questions from the college handbook. Everyone stopped emailing the office. He learned that the best AI is the kind people forget is there.',
      },
    ],
  },
  after: [
    {
      tag: 'The call',
      title: 'Somebody finally rang.',
      text: 'A family friend’s clinic had paid an agency for a booking app that never launched. They asked B for help. B kept the promise from Class 12 and rang P. Over one long weekend B rebuilt the booking system and P added an assistant that answered patients’ questions on WhatsApp. On Monday morning the clinic opened with both running.',
    },
    {
      tag: 'Welqor',
      title: 'One builds it. One makes it think.',
      text: 'That weekend made it obvious. Each of them could build half of what businesses need now; together they could build all of it. So the two Kavinkumars from Class 5 started a studio, and they still answer to B and P.',
    },
  ],
  founders: [
    {
      initial: 'B',
      name: 'Kavinkumar B',
      role: 'Co-founder, Engineering',
      degree: 'B.E. Computer Science and Engineering',
      text: 'Leads architecture and delivery. Turns a scoped problem into a web or mobile product that holds up in production.',
      ask: ['Web and mobile apps', 'Architecture', 'Cloud and hosting', 'Timelines'],
    },
    {
      initial: 'P',
      name: 'Kavinkumar P',
      role: 'Co-founder, AI',
      degree: 'MCA, Generative AI',
      text: 'Leads AI and automation. Finds the repetitive work in your day and builds the assistant or workflow that takes it off your team.',
      ask: ['AI assistants', 'Automation', 'Document processing', 'Data'],
    },
  ],
};

/* ----------------------------- Services ----------------------------- */

export const SERVICE_DETAILS = [
  {
    slug: 'websites',
    name: 'Websites',
    line: 'Sites that load fast, rank well and are easy to update.',
    text: 'Marketing sites, landing pages and online stores built around what you want visitors to do: call, book, buy or sign up. Your team edits the content without asking a developer.',
    deliverables: [
      'Sitemap and content plan',
      'Custom design, desktop and mobile',
      'Editable content system',
      'Speed and SEO basics set up',
      'Analytics and forms connected',
      'Training for your team',
    ],
    fit: 'You need a new site, a redesign, or a store that finally converts.',
    timeline: '2 to 4 weeks',
    tools: ['Next.js', 'WordPress', 'Shopify', 'Webflow'],
  },
  {
    slug: 'web-apps',
    name: 'Web apps and SaaS',
    line: 'Full products with sign-in, payments and an admin panel.',
    text: 'Customer portals, dashboards and subscription products that work in any browser. We plan the data, roles and permissions properly at the start so the product grows without a rewrite.',
    deliverables: [
      'User flows and data model',
      'Clickable prototype',
      'Sign-in, roles and permissions',
      'Payments and subscriptions',
      'Admin panel and reporting',
      'Hosting and monitoring',
    ],
    fit: 'You are launching a product, or replacing a process that lives in spreadsheets.',
    timeline: '6 to 12 weeks',
    tools: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Razorpay'],
  },
  {
    slug: 'mobile-apps',
    name: 'Mobile apps',
    line: 'Android and iOS from one codebase, through store review.',
    text: 'Apps your customers keep on their home screen. One shared codebase keeps the cost down; native modules handle the camera, maps, payments and notifications where needed.',
    deliverables: [
      'App flows and screen designs',
      'Android and iOS builds',
      'Push notifications',
      'Offline support where it matters',
      'Store listings and submission',
      'Crash and usage reporting',
    ],
    fit: 'Your customers or staff need something in their pocket, not a bookmark.',
    timeline: '8 to 14 weeks',
    tools: ['Flutter', 'React Native', 'Firebase'],
  },
  {
    slug: 'custom-software',
    name: 'Custom software',
    line: 'Internal tools shaped around how your team already works.',
    text: 'CRMs, ERPs, inventory systems and back-office tools that match your process instead of forcing a new one. We sit with the people who will use it before we design a single screen.',
    deliverables: [
      'Process mapping with your team',
      'Role-based screens',
      'Imports from your current sheets',
      'Integrations with tools you use',
      'Reports and exports',
      'Staff training and guides',
    ],
    fit: 'Off-the-shelf software almost fits, and the gap costs you hours every week.',
    timeline: '6 to 16 weeks',
    tools: ['Python', 'Django', 'Node.js', 'PostgreSQL'],
  },
  {
    slug: 'design',
    name: 'UI and UX design',
    line: 'Click through the product before anyone builds it.',
    text: 'Research, wireframes and finished interface design. Useful on its own when you have developers already, or as the first phase of any build with us.',
    deliverables: [
      'User interviews and review',
      'Wireframes for every flow',
      'High-fidelity screens',
      'Clickable prototype',
      'Design system and components',
      'Developer-ready handoff',
    ],
    fit: 'You want to test an idea with real people, or your current product is hard to use.',
    timeline: '2 to 6 weeks',
    tools: ['Figma', 'FigJam', 'Maze'],
  },
  {
    slug: 'ai',
    name: 'AI and automation',
    line: 'Take the repetitive work off your team.',
    text: 'Assistants that answer from your own documents, tools that read invoices and forms, and workflows that move data between systems without copy and paste. Each one starts with a small, measured pilot.',
    deliverables: [
      'Workflow audit and shortlist',
      'Pilot on real data',
      'Assistant or automation build',
      'Human review where it matters',
      'Cost and accuracy tracking',
      'Rollout to your team',
    ],
    fit: 'Someone on your team spends hours a week on copy, paste and check.',
    timeline: '3 to 8 weeks',
    tools: ['LLM APIs', 'OCR', 'n8n', 'Python'],
  },
  {
    slug: 'cloud',
    name: 'Cloud and DevOps',
    line: 'Hosting, deploys and backups set up properly.',
    text: 'We set up or tidy up your cloud so releases are one click, backups are tested and the monthly bill makes sense. Everything is documented and in your account.',
    deliverables: [
      'Cloud account set up or audit',
      'Automated deployments',
      'Backups with restore tests',
      'Uptime and error alerts',
      'Cost review and trimming',
      'Runbook for your team',
    ],
    fit: 'Deploys are scary, the bill keeps climbing, or nobody knows where the backups are.',
    timeline: '1 to 4 weeks',
    tools: ['AWS', 'Azure', 'Google Cloud', 'Docker'],
  },
];

/* ---------------------------- Industries ---------------------------- */

export const INDUSTRIES = [
  {
    name: 'Healthcare and clinics',
    builds: ['Appointment booking', 'Patient records', 'Telehealth', 'Lab and pharmacy tools'],
    watch: 'Patient data stays private, access is logged, and screens work for staff in a hurry.',
    tone: 'cobalt',
    size: 'xl',
  },
  {
    name: 'Retail and e-commerce',
    builds: ['Online stores', 'Point of sale', 'Stock sync', 'Loyalty programmes'],
    watch: 'Checkout speed, stock that matches the shelf, and sales days that do not crash the site.',
    tone: 'sun',
    size: 'tall',
  },
  {
    name: 'Education',
    builds: ['School and college ERP', 'Learning portals', 'Fee collection', 'Parent apps'],
    watch: 'Simple enough for every parent and teacher, with clear roles for who sees what.',
    tone: 'paper',
    size: 'md',
  },
  {
    name: 'Finance and payments',
    builds: ['Lending workflows', 'Payment dashboards', 'KYC onboarding', 'Reconciliation'],
    watch: 'Audit trails, careful permissions and numbers that always add up.',
    tone: 'ink',
    size: 'md',
  },
  {
    name: 'Logistics and supply chain',
    builds: ['Fleet tracking', 'Delivery apps', 'Warehouse systems', 'Route planning'],
    watch: 'Works on patchy networks, on cheap phones, in the cab of a truck.',
    tone: 'sky',
    size: 'wide',
  },
  {
    name: 'Manufacturing',
    builds: ['Production tracking', 'Quality checks', 'Maintenance logs', 'Supplier portals'],
    watch: 'Big buttons for the floor, live numbers for the office, and data that survives a shift change.',
    tone: 'paper',
    size: 'md',
  },
  {
    name: 'Hospitality and food',
    builds: ['Table and room booking', 'Ordering apps', 'Kitchen displays', 'Guest feedback'],
    watch: 'Fast at peak hours and friendly enough that guests do not need instructions.',
    tone: 'cobalt',
    size: 'md',
  },
  {
    name: 'Real estate and property',
    builds: ['Listing sites', 'Lead management', 'Tenant portals', 'Site visit scheduling'],
    watch: 'Leads that never slip through, and listings that look good on a phone.',
    tone: 'sun',
    size: 'wide',
  },
  {
    name: 'Professional services',
    builds: ['Client portals', 'Time and billing', 'Document workflows', 'Proposal tools'],
    watch: 'Confidential files handled properly and fewer hours lost to admin.',
    tone: 'sky',
    size: 'wide',
  },
];

/* ----------------------------- Solutions ----------------------------- */

export const SOLUTION_GROUPS = [
  { id: 'run', label: 'Run the business' },
  { id: 'sell', label: 'Sell and serve' },
  { id: 'automate', label: 'Automate the work' },
  { id: 'launch', label: 'Launch a product' },
];

export const SOLUTIONS = [
  {
    group: 'run',
    name: 'ERP and operations',
    problem: 'Every branch runs on its own spreadsheet.',
    answer: 'One system for orders, stock, purchasing and accounts, with a view for each role.',
    parts: ['Multi-branch', 'Purchasing', 'Approvals'],
  },
  {
    group: 'run',
    name: 'Inventory and warehouse',
    problem: 'Nobody trusts the stock count.',
    answer: 'Barcode scanning, live stock levels and reorder alerts across every location.',
    parts: ['Barcode', 'Transfers', 'Reorder alerts'],
  },
  {
    group: 'run',
    name: 'HR and payroll',
    problem: 'Attendance, leave and salaries take a week each month.',
    answer: 'Attendance, leave requests, payslips and documents in one place for staff and managers.',
    parts: ['Attendance', 'Leave', 'Payslips'],
  },
  {
    group: 'run',
    name: 'Dashboards and reporting',
    problem: 'The numbers arrive late and never match.',
    answer: 'Live dashboards pulled straight from your systems, with exports for the accountant.',
    parts: ['Live data', 'Scheduled reports', 'Exports'],
  },
  {
    group: 'sell',
    name: 'CRM and sales pipeline',
    problem: 'Leads live in WhatsApp chats and memory.',
    answer: 'Every lead captured, assigned and followed up, with quotes sent from the same screen.',
    parts: ['Lead capture', 'Follow-ups', 'Quotes'],
  },
  {
    group: 'sell',
    name: 'Customer portals',
    problem: 'Customers call to ask for things they could see themselves.',
    answer: 'A secure portal for orders, invoices, documents and support requests.',
    parts: ['Self-service', 'Invoices', 'Tickets'],
  },
  {
    group: 'sell',
    name: 'Booking and scheduling',
    problem: 'Double bookings and no-shows cost real money.',
    answer: 'Online booking with reminders, deposits and a calendar your staff can manage.',
    parts: ['Reminders', 'Deposits', 'Staff calendar'],
  },
  {
    group: 'sell',
    name: 'Online store and POS',
    problem: 'The shop and the website do not know about each other.',
    answer: 'One catalogue and one stock count shared by your store, your counter and your app.',
    parts: ['Catalogue', 'Payments', 'Stock sync'],
  },
  {
    group: 'automate',
    name: 'AI assistants',
    problem: 'The same questions get answered fifty times a day.',
    answer: 'An assistant that answers from your own documents and hands off to a person when unsure.',
    parts: ['Your documents', 'Hand-off', 'Usage reports'],
  },
  {
    group: 'automate',
    name: 'Document processing',
    problem: 'Someone types invoices into the system by hand.',
    answer: 'Invoices, forms and IDs read automatically, checked by a person only when needed.',
    parts: ['OCR', 'Validation', 'Review queue'],
  },
  {
    group: 'automate',
    name: 'Workflow automation',
    problem: 'Copy from one tool, paste into another, repeat.',
    answer: 'Your tools connected so data moves on its own and the team is told only when it matters.',
    parts: ['Integrations', 'Triggers', 'Alerts'],
  },
  {
    group: 'launch',
    name: 'MVP in weeks',
    problem: 'You have an idea and need proof before a big budget.',
    answer: 'The smallest version that real users can try, built so it can grow if it works.',
    parts: ['Prototype', 'Core features', 'Analytics'],
  },
  {
    group: 'launch',
    name: 'SaaS platforms',
    problem: 'You want to sell software by subscription.',
    answer: 'Accounts, teams, plans, billing and an admin panel, on foundations that scale.',
    parts: ['Multi-tenant', 'Billing', 'Admin'],
  },
  {
    group: 'launch',
    name: 'Marketplaces',
    problem: 'You want to connect buyers and sellers.',
    answer: 'Listings, search, payments with payouts, reviews and the tools to moderate it all.',
    parts: ['Listings', 'Payouts', 'Reviews'],
  },
];

/* --------------------------- Technologies --------------------------- */

export const TECH_LAYERS = [
  {
    layer: 'Interface',
    note: 'What people see and touch.',
    groups: [
      { name: 'Web', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
      { name: 'Mobile', items: ['Flutter', 'React Native', 'Swift', 'Kotlin'] },
      { name: 'Design', items: ['Figma', 'Design systems', 'Prototyping'] },
    ],
  },
  {
    layer: 'Logic',
    note: 'The rules your business runs on.',
    groups: [
      { name: 'Backend', items: ['Node.js', 'Python', 'Django', 'FastAPI', 'NestJS'] },
      { name: 'APIs', items: ['REST', 'GraphQL', 'Webhooks', 'WebSockets'] },
    ],
  },
  {
    layer: 'Data',
    note: 'Where it is stored and how fast it comes back.',
    groups: [
      { name: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
      { name: 'Realtime and search', items: ['Firebase', 'Supabase', 'Elasticsearch'] },
    ],
  },
  {
    layer: 'Intelligence',
    note: 'Where software starts doing the reading for you.',
    groups: [
      { name: 'AI', items: ['LLM APIs', 'Retrieval (RAG)', 'Vector search', 'OCR'] },
      { name: 'Automation', items: ['n8n', 'Zapier', 'Scheduled jobs'] },
    ],
  },
  {
    layer: 'Cloud',
    note: 'Where it runs, and how it stays up.',
    groups: [
      { name: 'Platforms', items: ['AWS', 'Azure', 'Google Cloud', 'Vercel'] },
      { name: 'Delivery', items: ['Docker', 'GitHub Actions', 'Terraform'] },
      { name: 'Watching', items: ['Uptime alerts', 'Error tracking', 'Logs'] },
    ],
  },
  {
    layer: 'Commerce and content',
    note: 'Ready-made engines, when they fit.',
    groups: [
      { name: 'Platforms', items: ['Shopify', 'WordPress', 'Webflow', 'Headless CMS'] },
      { name: 'Payments', items: ['Razorpay', 'Stripe', 'UPI'] },
    ],
  },
];

export const TECH_QUESTIONS = [
  {
    q: 'Can you hire for it?',
    a: 'If we ever hand over, your next developer should already know the tools. Popular and well documented wins.',
  },
  {
    q: 'Will it be around in five years?',
    a: 'We pick projects with large communities and steady releases, not this month’s launch.',
  },
  {
    q: 'What does it cost at scale?',
    a: 'Hosting and licence costs are worked out for your expected traffic before we commit.',
  },
  {
    q: 'Is it the simplest thing that works?',
    a: 'A store does not need microservices. We add complexity only when the problem asks for it.',
  },
];

/* --------------------------- Ways to work --------------------------- */

export const PROJECT_PAGE = {
  milestones: [
    { name: 'Proposal signed', text: 'Scope, timeline and price agreed in writing.' },
    { name: 'Designs approved', text: 'You click through every screen and sign off.' },
    { name: 'Beta live', text: 'The working product on a private link for testing.' },
    { name: 'Launch', text: 'Live for your customers, with handover documents.' },
  ],
  included: [
    'Discovery call and written proposal',
    'Design of every screen in scope',
    'Development and testing',
    'A working build to review at each milestone',
    'Launch and store submission',
    'Thirty days of fixes after launch',
    'Handover document and training',
    'Code and accounts in your name',
  ],
  change: [
    { step: 'You ask', text: 'Something new comes up mid-project. Tell your project lead.' },
    { step: 'We price it', text: 'Within two working days you get the effect on cost and timeline.' },
    { step: 'You decide', text: 'Approve it, swap it for something in scope, or park it for later.' },
  ],
  fit: [
    'A new website, app or tool with a clear goal',
    'A redesign or rebuild of something you already have',
    'An MVP to test an idea with real users',
  ],
  notFit: [
    'A roadmap that changes every week',
    'Open-ended work with no finish line',
    'You need people inside your own team',
  ],
};

export const TEAM_ROLES = [
  { id: 'lead', name: 'Project lead', text: 'Plans sprints and keeps you in the loop.' },
  { id: 'frontend', name: 'Frontend developer', text: 'Web interfaces in React and Next.js.' },
  { id: 'backend', name: 'Backend developer', text: 'APIs, databases and integrations.' },
  { id: 'mobile', name: 'Mobile developer', text: 'Android and iOS in Flutter or React Native.' },
  { id: 'designer', name: 'Product designer', text: 'Flows, screens and design systems.' },
  { id: 'qa', name: 'QA engineer', text: 'Test plans, automation and release checks.' },
];

export const TEAM_PAGE = {
  firstMonth: [
    { when: 'Week 1', text: 'Access to your tools, a walk through the codebase and the roadmap.' },
    { when: 'Week 2', text: 'First changes shipped. Working rhythm and meetings agreed.' },
    { when: 'Week 3', text: 'Full sprint delivered against your priorities.' },
    { when: 'Week 4', text: 'First monthly review: what went well and what to change.' },
  ],
  rhythm: [
    { title: 'Your tools', text: 'We work in your Slack, Jira, GitHub or whatever you already use.' },
    { title: 'Daily check-in', text: 'A short written update every day, and calls when they help.' },
    { title: 'Your priorities', text: 'You set the order of work. We say how long it will take.' },
    { title: 'Monthly review', text: 'Hours, output and next month’s plan, in one page.' },
    { title: 'Scale with notice', text: 'Add or remove people as the roadmap changes, with notice agreed up front.' },
    { title: 'Same people', text: 'The team you meet is the team that stays. No silent swaps.' },
  ],
};

export const CARE_PAGE = {
  month: [
    { week: 'Week 1', tasks: ['Security and version updates', 'Backup restore test'] },
    { week: 'Week 2', tasks: ['Improvement work from your list', 'Speed check'] },
    { week: 'Week 3', tasks: ['Improvement work from your list', 'Uptime and error review'] },
    { week: 'Week 4', tasks: ['Monthly report', 'Plan for next month'] },
  ],
  covered: [
    'Security patches and dependency updates',
    'Bug fixes on anything we look after',
    'Daily backups and monthly restore tests',
    'Uptime and error alerts, watched by us',
    'A set number of hours for small improvements',
    'Content edits your team cannot make',
    'A plain-language monthly report',
  ],
  notCovered: [
    'New products or large features (we quote those as projects)',
    'Third-party services going down',
    'Changes made by other developers without telling us',
  ],
  takeover: [
    { step: 'Look', text: 'We read the code, hosting and accounts. Nothing is changed.' },
    { step: 'Report', text: 'A written health check: what is solid, what is risky, what to fix first.' },
    { step: 'Secure', text: 'Backups, alerts and access sorted out in the first weeks.' },
    { step: 'Care', text: 'Regular monthly plan from there.' },
  ],
};
