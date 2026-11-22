// Case studies (the Projects section on the home page) and client
// testimonials. Keep every line true: no invented numbers or clients.
// Clients are named by type only, to keep their details confidential.

export const CASE_STUDIES = [
  {
    slug: 'docvault',
    name: 'DocVault',
    line: 'A locked-down home for engineering drawings and confidential PDFs.',
    client: 'Hardware manufacturer',
    area: 'Manufacturing',
    tags: ['Access control', 'Audit trail', 'Secure sharing'],
    stack: ['PHP', 'Python', 'MySQL'],
    tone: 'cobalt',
    art: 'vault',
  },
  {
    slug: 'hospital-appointments',
    name: 'Hospital booking',
    line: 'Multilingual appointment booking for a busy hospital.',
    client: 'Multi-speciality hospital',
    area: 'Healthcare',
    tags: ['Online booking', 'Multilingual', 'Automated scheduling'],
    stack: ['Python', 'PHP', 'MySQL'],
    tone: 'sun',
    art: 'booking',
  },
  {
    slug: 'taskflow',
    name: 'TaskFlow',
    line: 'Real-time task tracking for a whole college.',
    client: 'College',
    area: 'Education',
    tags: ['Live updates', 'Role-based access', 'Notifications'],
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    tone: 'paper',
    art: 'board',
  },
];

// FICTIONAL testimonials: this site is a college project and is not live.
// The people below are invented. Before any public launch, replace them
// with real, approved client quotes (or empty the list to hide the section).
export const TESTIMONIALS = [
  {
    quote:
      'Our drawings used to travel by email, and nobody knew who had the latest revision. Now the right people see the right files, and every download is on record.',
    name: 'Senthil Murugan',
    role: 'Operations Head',
    client: 'Hardware manufacturer',
    project: 'DocVault',
    tone: 'cobalt',
  },
  {
    quote:
      'Patients book in Tamil or English without calling the front desk. The morning queue is shorter, and our staff finally have time for the patient in front of them.',
    name: 'Dr. Kavitha Ramasamy',
    role: 'Medical Director',
    client: 'Multi-speciality hospital',
    project: 'Hospital booking',
    tone: 'sun',
  },
  {
    quote:
      'TaskFlow replaced a dozen WhatsApp groups. Faculty see what is pending at a glance, and nothing slips through any more.',
    name: 'Prof. Arul Selvam',
    role: 'Head of Department',
    client: 'College',
    project: 'TaskFlow',
    tone: 'paper',
  },
  {
    quote:
      'B and P listened more than they talked. A fixed quote, a working build at every milestone, and no surprises at the end. That is rare.',
    name: 'Anjali Menon',
    role: 'Founder',
    client: 'Café chain, Kochi',
    tone: 'sky',
  },
];
