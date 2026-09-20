export const site = {
  name: 'Eco Nexus',
  tagline: 'Autonomous eco-intelligence from Bangladesh',
  competition: 'WICE 2026 — IT & Robotics Category',
  country: 'Bangladesh',
  email: 'team@econexus.bd',
  phone: '+880 1700 000 000',
  address: 'Innovation Lab, Dhaka 1207, Bangladesh',
  socials: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Instagram', href: 'https://instagram.com/Enfite_Nitro_28' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
  ],
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/drone', label: 'The Drone' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact' },
];

export type Pillar = {
  icon: 'shield' | 'leaf' | 'radar';
  title: string;
  desc: string;
  points: string[];
};

export const pillars: Pillar[] = [
  {
    icon: 'shield',
    title: 'Surveillance',
    desc: 'Persistent aerial watch with on-board AI that flags what matters and ignores what does not.',
    points: [
      'Thermal + RGB dual sensor fusion',
      'Edge person & vehicle detection at 30 FPS',
      'Encrypted 1080p telemetry downlink',
      'Autonomous perimeter patrol routes',
    ],
  },
  {
    icon: 'leaf',
    title: 'Precision Farming',
    desc: 'Multispectral crop scanning turns 40 hectares of guesswork into a prescription map in one flight.',
    points: [
      'NDVI crop-stress heat mapping',
      'Variable-rate 5 L precision sprayer',
      'Pest & disease early-warning models',
      'Soil moisture zone segmentation',
    ],
  },
  {
    icon: 'radar',
    title: 'Observability',
    desc: 'Every flight streams into a live ground-station dashboard built for decisions, not dashboards.',
    points: [
      'Real-time mission telemetry stream',
      'Flood & disaster rapid mapping',
      '3D photogrammetric terrain models',
      'Open REST API for field partners',
    ],
  },
];

export const specs = [
  { label: 'Flight Endurance', value: '52', unit: 'min' },
  { label: 'Operating Range', value: '12', unit: 'km' },
  { label: 'Max Payload', value: '5.2', unit: 'kg' },
  { label: 'Cruise Speed', value: '68', unit: 'km/h' },
  { label: 'Scan Coverage', value: '40', unit: 'ha/flight' },
  { label: 'Wind Resistance', value: '14', unit: 'm/s' },
  { label: 'Camera Sensor', value: '48', unit: 'MP' },
  { label: 'Ingress Rating', value: 'IP54', unit: '' },
];

export const timeline = [
  {
    period: 'Q1 2025',
    title: 'Concept & Field Research',
    desc: 'Interviewed 60+ farmers across Rangpur and Barishal to ground the design in real problems.',
  },
  {
    period: 'Q3 2025',
    title: 'Prototype Alpha',
    desc: 'First carbon-frame airframe flies. 18 minutes endurance, manual control, single RGB camera.',
  },
  {
    period: 'Q1 2026',
    title: 'Autonomy Stack',
    desc: 'On-board edge inference, waypoint autonomy and the multispectral payload come online.',
  },
  {
    period: 'Q2 2026',
    title: 'Field Trials',
    desc: '120 flight hours over working farmland and flood-prone river basins in northern Bangladesh.',
  },
  {
    period: 'Q4 2026',
    title: 'WICE 2026',
    desc: 'Eco Nexus represents Bangladesh in the IT & Robotics category on the world stage.',
  },
];

export type Member = {
  name: string;
  role: string;
  grade: string;
  school: string;
  bio: string;
  initials: string;
  photo?: string;
  tags: string[];
};

export const team: Member[] = [
  {
    name: 'Rafsan Ahmed Mahir',
    role: 'Team Member',
    grade: 'Class 7',
    school: 'Adamjee Cantonment Public School',
    bio: 'Passionate about technology, innovation and robotics, and enjoys creating projects that solve real-world problems. Always eager to learn, explore and develop new ideas, with the goal of using technology to create a positive impact.',
    initials: 'RM',
    photo: '/Rafsan.jpeg',
    tags: ['Technology', 'Innovation', 'Robotics'],
  },
  {
    name: 'MD. Raiyan Talukder',
    role: 'Team Member',
    grade: 'Class 9',
    school: 'Adamjee Cantonment Public School',
    bio: '',
    initials: 'RT',
    tags: [],
  },
];

export const mentors = [
  { name: 'Dr. Kamrul Hasan', role: 'Faculty Advisor — Robotics' },
  { name: 'Engr. Farhana Rahman', role: 'Industry Mentor — Avionics' },
];

export const values = [
  {
    title: 'Built for Bangladesh',
    desc: 'Monsoon rain, dense delta farmland and patchy connectivity are the design brief, not edge cases.',
  },
  {
    title: 'Edge-first Intelligence',
    desc: 'Decisions happen on the aircraft. The cloud is an option, never a dependency.',
  },
  {
    title: 'Open by Default',
    desc: 'Open telemetry schemas and a documented API so agronomists and agencies can build on top.',
  },
  {
    title: 'Repairable Hardware',
    desc: 'Modular arms and printed spares mean a field repair takes minutes, not a shipping cycle.',
  },
];

export const faqs = [
  {
    q: 'What is Eco Nexus building for WICE 2026?',
    a: 'A single autonomous UAV platform that handles surveillance, precision agriculture and environmental observability, paired with an open ground-station stack.',
  },
  {
    q: 'Are you open to sponsors and partners?',
    a: 'Yes. We work with hardware sponsors, agri-cooperatives and research labs. Reach out through the contact form and we will send our sponsorship deck.',
  },
  {
    q: 'Can we schedule a live field demonstration?',
    a: 'We run demo flights near Dhaka monthly and can travel for serious partnerships. Pick "Field demo" in the contact form.',
  },
  {
    q: 'Is the platform available for research collaboration?',
    a: 'Our telemetry schema and detection benchmarks are open to academic partners. Tell us about your research and we will scope access.',
  },
];

/* ------------------------------------------------------------------ *
 * Project brief — the IoT environmental drone as presented on the
 * project poster. Source of truth for /drone's research section.
 * ------------------------------------------------------------------ */

export const project = {
  title: 'Environmental Drone',
  intro: [
    'Air pollution has become a major environmental and public health issue worldwide. Conventional air quality monitoring stations are expensive, fixed in place, and cannot cover remote or inaccessible areas effectively.',
    'This project presents an IoT-based environmental drone capable of real-time air quality monitoring. The drone measures environmental parameters such as temperature, humidity, pressure, dew point, benzene, ammonia and sulfide gases, then wirelessly transmits the collected data for environmental monitoring and pollution assessment.',
  ],
};

export const method = [
  'Designed and assembled a quadcopter UAV.',
  'Integrated BME280 and MQ-2 sensors for environmental data collection.',
  'Installed a GPS module for location tracking.',
  'Used IoT technology for wireless data transmission.',
  'Collected real-time air quality data during drone flight.',
  'Analysed and stored the collected data for evaluation.',
];

export type Parameter = {
  icon: 'thermometer' | 'droplets' | 'gauge' | 'cloud' | 'flask' | 'wind';
  label: string;
  unit: string;
  source: string;
};

export const parameters: Parameter[] = [
  { icon: 'thermometer', label: 'Temperature', unit: '°C', source: 'BME280' },
  { icon: 'droplets', label: 'Humidity', unit: '% RH', source: 'BME280' },
  { icon: 'gauge', label: 'Pressure', unit: 'hPa', source: 'BME280' },
  { icon: 'cloud', label: 'Dew Point', unit: '°C', source: 'Derived' },
  { icon: 'flask', label: 'Benzene', unit: 'ppm', source: 'MQ-2' },
  { icon: 'flask', label: 'Ammonia', unit: 'ppm', source: 'MQ-2' },
  { icon: 'wind', label: 'Sulfide Gases', unit: 'ppm', source: 'MQ-2' },
];

export const payload = [
  {
    part: 'BME280',
    role: 'Atmospheric sensor',
    desc: 'Reads temperature, relative humidity and barometric pressure on a single I²C bus; dew point is derived from the temperature and humidity pair.',
  },
  {
    part: 'MQ-2',
    role: 'Gas sensor',
    desc: 'Detects the combustible and pollutant gas concentrations logged in flight — benzene, ammonia and sulfide gases.',
  },
  {
    part: 'GPS Module',
    role: 'Location tracking',
    desc: 'Stamps every sensor reading with latitude, longitude and altitude so the data set maps to real ground positions.',
  },
  {
    part: 'IoT Link',
    role: 'Wireless telemetry',
    desc: 'Streams the readings off the aircraft in real time and stores them for later analysis and pollution assessment.',
  },
];
