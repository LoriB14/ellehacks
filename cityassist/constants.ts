import { Resource } from './types';

export const DEFAULT_CENTER = { lat: 43.6532, lng: -79.3832 }; // Toronto City Hall

export const STATIC_RESOURCES: Resource[] = [
  // EMERGENCY & CRISIS RESOURCES
  {
    id: "e1",
    name: "CAMH Emergency Department",
    category: "crisis",
    lat: 43.6575,
    lng: -79.4002,
    address: "1051 Queen St W, Toronto",
    hours: "24 Hours / 7 Days",
    description: "Emergency mental health assessment and treatment. Walk-ins accepted.",
    phone: "416-535-8501",
    isEmergency: true,
    source: "Toronto Open Data"
  },
  {
    id: "e2",
    name: "The Works - Toronto Public Health",
    category: "health",
    lat: 43.6565,
    lng: -79.3793,
    address: "277 Victoria St, Toronto",
    hours: "Mon-Sat 10am-10pm",
    description: "Supervised consumption service (SIS), harm reduction supplies, and overdose prevention.",
    phone: "416-392-0520",
    isEmergency: true,
    source: "Toronto Public Health"
  },
  {
    id: "e3",
    name: "Gerstein Crisis Centre",
    category: "crisis",
    lat: 43.6605,
    lng: -79.3755,
    address: "100 Charles St E, Toronto",
    hours: "24 Hours",
    description: "Community-based mental health crisis service. Phone and mobile support available.",
    phone: "416-929-5200",
    isEmergency: true
  },

  // LEGAL RESOURCES (Requested)
  {
    id: "l1",
    name: "Parkdale Community Legal Services",
    category: "legal",
    lat: 43.6404,
    lng: -79.4388,
    address: "1266 Queen St W, Toronto",
    hours: "Mon-Fri 9 AM - 5 PM",
    description: "Free legal advice for low-income residents regarding housing and immigration.",
    phone: "416-531-2411"
  },
  {
    id: "l2",
    name: "Downtown Legal Services",
    category: "legal",
    lat: 43.6631,
    lng: -79.3957,
    address: "655 Spadina Ave, Toronto",
    hours: "Mon-Fri 9 AM - 5 PM",
    description: "U of T operated legal clinic. Refugee and tenant law assistance.",
    phone: "416-934-4535"
  },
  {
    id: "l3",
    name: "Rexdale Community Legal Clinic",
    category: "legal",
    lat: 43.7408,
    lng: -79.5786,
    address: "21 Panorama Ct, Etobicoke",
    hours: "Mon-Fri 9:30 AM - 4:30 PM",
    description: "Legal help for tenancy, WSIB, and social assistance matters.",
    phone: "416-741-5201"
  },

  // STANDARD RESOURCES
  {
    id: "1",
    name: "Daily Bread Food Bank",
    category: "food",
    lat: 43.6355,
    lng: -79.5235,
    address: "191 New Toronto St, Etobicoke",
    hours: "Mon–Fri, 10 AM–4 PM",
    description: "One of Toronto's largest food bank networks offering emergency food support.",
    phone: "416-203-0050"
  },
  {
    id: "2",
    name: "Scott Mission Shelter",
    category: "shelter",
    lat: 43.6574,
    lng: -79.3994,
    address: "502 Spadina Ave, Toronto",
    hours: "Open 24 hours",
    description: "Emergency shelter services, hot meals, and clothing bank for men.",
    phone: "416-923-8872"
  },
  {
    id: "3",
    name: "The 519",
    category: "community",
    lat: 43.6664,
    lng: -79.3811,
    address: "519 Church St, Toronto",
    hours: "Mon-Fri 9AM-9PM, Weekends 10AM-5PM",
    description: "Community centre serving LGBTQ2S communities with counseling, meals, and legal clinics.",
    website: "the519.org",
    source: "Toronto Open Data"
  },
  {
    id: "5",
    name: "Fred Victor - 145 Queen",
    category: "health",
    lat: 43.6524,
    lng: -79.3725,
    address: "145 Queen St E, Toronto",
    hours: "Open 24 hours",
    description: "Harm reduction services, housing support, and mental health services.",
  },
  {
    id: "6",
    name: "North York Harvest Food Bank",
    category: "food",
    lat: 43.7168,
    lng: -79.4653,
    address: "116 Industry St, North York",
    hours: "Mon-Fri 9 AM - 4:30 PM",
    description: "Primary food bank for northern Toronto offering community hamper programs.",
  },
  {
    id: "7",
    name: "Scarborough Centre for Healthy Communities",
    category: "health",
    lat: 43.7757,
    lng: -79.2323,
    address: "629 Markham Rd, Scarborough",
    hours: "Mon-Fri 9 AM - 5 PM",
    description: "Community health centre offering medical care, food support, and seniors programs.",
    source: "Toronto Open Data"
  },
  {
    id: "8",
    name: "Eva's Initiatives for Homeless Youth",
    category: "shelter",
    lat: 43.6487,
    lng: -79.3962,
    address: "Various Locations",
    hours: "24 Hours",
    description: "Emergency shelter and transitional housing for youth aged 16-24.",
  },
  {
    id: "9",
    name: "Agincourt Community Services",
    category: "community",
    lat: 43.7861,
    lng: -79.2843,
    address: "4155 Sheppard Ave E, Scarborough",
    hours: "Mon-Fri 9 AM - 5 PM",
    description: "Multi-service agency providing housing help, food bank, and newcomer services.",
  },
  {
    id: "10",
    name: "St. Felix Centre",
    category: "shelter",
    lat: 43.6467,
    lng: -79.4033,
    address: "25 Augusta Ave, Toronto",
    hours: "24 Hours",
    description: "24-hour respite services, meals, and showers for vulnerable community members.",
    source: "Toronto Open Data"
  }
];