// FAQs. Grouped into sections; each answer should match what the rest of
// the site promises (proposal, Terms, care plans, Support Centre).
// `link` is optional and adds a small "Read more" link under the answer.

export const FAQ_GROUPS = [
  {
    id: 'start',
    label: 'Getting started',
    blurb: 'What happens before any work begins.',
    items: [
      {
        q: 'How do we start working together?',
        a: 'Write to us through the Connect page or by email. We reply within one working day and book a 30-minute call to understand your goals, users and deadline.',
        link: { to: '/contact', label: 'Connect with Welqor' },
      },
      {
        q: 'Is the first call free?',
        a: 'Yes. The first call and the written proposal cost nothing, and there is no obligation to go ahead.',
      },
      {
        q: 'What should I prepare before the first call?',
        a: 'A few lines on what you want to achieve, who will use it, any examples you like, and your deadline. A rough budget range helps us suggest the right scope, but it is optional.',
      },
      {
        q: 'Do I need a detailed specification?',
        a: 'No. A rough idea is enough. We turn it into a written scope with you after the first call.',
      },
      {
        q: 'I only have an idea. Can you still help?',
        a: 'Yes. Many projects start with a short design phase or a small first version, so you can test the idea with real people before committing to the full build.',
      },
      {
        q: 'Will you sign an NDA before we talk?',
        a: 'Yes, happily. Send it over before you share anything sensitive and we will sign it first.',
      },
      {
        q: 'How soon can you start?',
        a: 'A fixed-scope project usually starts about a week after the proposal is signed. A dedicated team usually starts within one to two weeks.',
      },
      {
        q: 'Do you work with startups or only established businesses?',
        a: 'Both. We work with founders building a first product and with established businesses replacing spreadsheets or old software.',
      },
    ],
  },
  {
    id: 'cost',
    label: 'Cost and payment',
    blurb: 'Quotes, invoices and what is included.',
    items: [
      {
        q: 'How much does a project cost?',
        a: 'It depends on what you need. After the first call we send a written, fixed quote, so you know the full cost before anything starts.',
      },
      {
        q: 'How do payments work?',
        a: 'Projects are split into milestones, and each one is invoiced only after you have seen it working. Dedicated teams and care plans are billed monthly.',
      },
      {
        q: 'Do you ask for payment before work starts?',
        a: 'Work begins once you accept the proposal in writing and pay the first milestone, if your proposal has one. The proposal shows every milestone and its amount.',
      },
      {
        q: 'Are there any costs outside the quote?',
        a: 'Only third-party services, such as hosting, domains, app store fees or paid APIs. These are listed in the proposal and billed by the provider directly to accounts in your name.',
      },
      {
        q: 'How long is a proposal valid?',
        a: 'Thirty days, unless the proposal says otherwise.',
      },
      {
        q: 'When are invoices due?',
        a: 'Within 14 days of the invoice date, unless your agreement says otherwise.',
      },
      {
        q: 'What if we want to change something mid-project?',
        a: 'Tell your project lead. Within two working days you get the effect on cost and timeline in writing, and nothing changes until you approve it.',
      },
      {
        q: 'Can you work within a fixed budget?',
        a: 'Yes. Tell us the budget and we will shape the scope around it: the must-haves first, and the nice-to-haves listed separately for later.',
      },
    ],
  },
  {
    id: 'process',
    label: 'Timelines and process',
    blurb: 'How a project moves from call to launch.',
    items: [
      {
        q: 'How long does it take?',
        a: 'A marketing website usually takes two to four weeks. Apps and custom software typically take six to twelve weeks. Your proposal includes a week-by-week timeline.',
      },
      {
        q: 'How will I know how it is going?',
        a: 'You get short written updates as the work moves, and a working build to review at every milestone. You never have to chase us for news.',
      },
      {
        q: 'Will I see the design before you build it?',
        a: 'Yes. You click through the screens as a prototype and approve them before development starts.',
      },
      {
        q: 'How much of my time will the project need?',
        a: 'Mostly the first call, design approvals and a review at each milestone. Quick answers to our questions keep the timeline on track.',
      },
      {
        q: 'What if our feedback is delayed?',
        a: 'The timeline moves by the same amount. We will always tell you when we are waiting on something from your side.',
      },
      {
        q: 'Can you work to a fixed launch date?',
        a: 'Yes, if we know it at the start. We plan the scope backwards from that date and tell you early if anything puts it at risk.',
      },
      {
        q: 'How do you test before launch?',
        a: 'Every release is checked on real phones and browsers before you see it, and you test the working build at each milestone.',
      },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    blurb: 'How it looks, and who it works for.',
    items: [
      {
        q: 'Do you design as well as build?',
        a: 'Yes. Research, wireframes and finished screens are part of every build, and the same team carries the design through to the finished product.',
      },
      {
        q: 'Can I book design on its own?',
        a: 'Yes. If you already have developers, we hand over finished designs, a clickable prototype and a design system they can build from.',
      },
      {
        q: 'Can you work with our existing brand?',
        a: 'Yes. We follow your logo, colours and fonts. If you do not have a brand yet, we can create a simple one as part of the project.',
      },
      {
        q: 'Will it work well on phones?',
        a: 'Yes. Every website and web app is designed for phones, tablets and desktops, and tested on real devices.',
      },
      {
        q: 'Will it be accessible?',
        a: 'We build to accessibility basics as standard: readable contrast, keyboard navigation, screen reader labels and respect for reduced-motion settings.',
      },
      {
        q: 'Can you redesign our site without rebuilding everything?',
        a: 'Often, yes. We start by reviewing what you have, then suggest whether a refresh, a partial rebuild or a full rebuild gives you the best result for the money.',
      },
    ],
  },
  {
    id: 'tech',
    label: 'Technology and ownership',
    blurb: 'What it is built with, and who owns it.',
    items: [
      {
        q: 'Will I own the code?',
        a: 'Yes. Once the work is paid for, the code, designs and content are yours, and every account we set up is in your name from day one.',
      },
      {
        q: 'Which technologies do you use?',
        a: 'Whatever fits your team, traffic and budget: usually React, Node.js, Python, Flutter and the major clouds. The Technologies page explains how we choose.',
        link: { to: '/technologies', label: 'See how we choose' },
      },
      {
        q: 'Where will it be hosted?',
        a: 'In a cloud account in your name, such as AWS, Azure, Google Cloud or Vercel, chosen for your expected traffic and budget.',
      },
      {
        q: 'Can my team update the content?',
        a: 'Yes. Websites come with an easy content editor, and we train your team on it at handover.',
      },
      {
        q: 'Can it connect to tools we already use?',
        a: 'Usually, yes. Payments such as Razorpay, Stripe and UPI, accounting software, CRMs, WhatsApp and most tools with an API can be connected.',
      },
      {
        q: 'Do you build for both Android and iOS?',
        a: 'Yes, usually from one shared codebase, which keeps the cost down. Native features such as camera, maps and notifications are supported.',
      },
      {
        q: 'Do you handle App Store and Play Store submission?',
        a: 'Yes. We prepare the listings and take the app through review. The developer accounts are in your name, and their yearly fees are paid to Apple and Google directly.',
      },
      {
        q: 'Will my website show up on Google?',
        a: 'We set up the technical basics search engines need: speed, clean page structure, titles and descriptions. Ongoing content and marketing are not part of our work.',
      },
      {
        q: 'Can you take over an existing project?',
        a: 'Yes. We start with a written health check of the code and hosting, then continue from there.',
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI and automation',
    blurb: 'Where AI helps, and where it does not.',
    items: [
      {
        q: 'What can AI realistically do for my business?',
        a: 'Answer common questions from your own documents, read invoices and forms, draft routine replies, and move data between tools. It works best on repetitive tasks with clear rules.',
      },
      {
        q: 'Is our data safe with AI tools?',
        a: 'We use providers that do not train on your data, and can keep processing inside your own cloud account when needed.',
      },
      {
        q: 'What if the AI gets something wrong?',
        a: 'We add a human check wherever a mistake would matter, and measure accuracy on your real data before it goes live.',
      },
      {
        q: 'How do AI projects start?',
        a: 'With a small pilot on real examples from your business. You see what it gets right and wrong before deciding whether to roll it out.',
      },
      {
        q: 'How much does AI cost to run?',
        a: 'Most AI services charge by usage. We estimate the monthly running cost in the proposal and set up tracking so there are no surprises.',
      },
      {
        q: 'Will AI replace my team?',
        a: 'That is not the goal. We automate the repetitive parts of the day, so your people spend their time on the work that needs them.',
      },
    ],
  },
  {
    id: 'together',
    label: 'Working together',
    blurb: 'People, hours and how we talk.',
    items: [
      {
        q: 'Who will I talk to?',
        a: 'One project lead from start to finish, and the founders are on every project.',
      },
      {
        q: 'Do you work with clients outside India?',
        a: 'Yes. We work remotely with clients anywhere and schedule calls inside your working hours.',
      },
      {
        q: 'What are your working hours?',
        a: 'Monday to Friday, 9:30 AM to 6:30 PM India time. Urgent support issues are watched outside those hours.',
      },
      {
        q: 'How do we communicate during the project?',
        a: 'Email and scheduled calls by default. Dedicated teams work inside your own tools, such as Slack, Jira or GitHub.',
      },
      {
        q: 'Can we hire a team instead of paying per project?',
        a: 'Yes. A dedicated team of developers, designers and QA works only on your product, booked by the month.',
        link: { to: '/work/team', label: 'See dedicated teams' },
      },
      {
        q: 'Can we switch between ways of working later?',
        a: 'Yes. Many clients start with a project, keep a care plan after launch, and add a team when the roadmap grows.',
        link: { to: '/work', label: 'Compare ways to work' },
      },
    ],
  },
  {
    id: 'after',
    label: 'After launch',
    blurb: 'Fixes, care and handover.',
    items: [
      {
        q: 'What happens after launch?',
        a: 'Every project includes 30 days of free fixes. After that you can move to a care plan, or we hand everything over with documentation so your own team can run it.',
      },
      {
        q: 'What is included in a care plan?',
        a: 'Security and version updates, bug fixes, daily backups with monthly restore tests, uptime alerts, a set number of hours for small improvements and a monthly report.',
        link: { to: '/work/care', label: 'See care plans' },
      },
      {
        q: 'Do you look after sites you did not build?',
        a: 'Yes. We begin with a health check of the code, hosting and accounts, fix anything risky, then move to a regular care plan.',
      },
      {
        q: 'How quickly do you respond to problems?',
        a: 'For clients on a care plan, we aim to respond to urgent issues within 2 working hours and to bugs within 1 working day. Changes are planned into the next monthly cycle.',
      },
      {
        q: 'How do I report a problem?',
        a: 'Use the Support Centre. Pick what is wrong and it writes a labelled email for you, so it reaches the right person first.',
        link: { to: '/support', label: 'Go to the Support Centre' },
      },
      {
        q: 'Will we get documentation and training?',
        a: 'Yes. You get a handover document covering how everything is set up, deployed and backed up, plus training for your team.',
      },
      {
        q: 'Can we end the work if we need to?',
        a: 'Yes. Either side can end an agreement with written notice. You pay for work done up to that point, and we hand over everything completed so far.',
      },
    ],
  },
];
