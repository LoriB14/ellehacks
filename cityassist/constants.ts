import { Resource } from './types';

export const DEFAULT_CENTER = { lat: 43.6532, lng: -79.3832 }; // Toronto City Hall

export const STATIC_RESOURCES: Resource[] = [
  // EMERGENCY & CRISIS RESOURCES
  {
    id: "e1",
    name: "CAMH Emergency Department",
    category: "Crisis",
    lat: 43.6575,
    lng: -79.4002,
    address: "1051 Queen St W, Toronto",
    hours: "24 Hours / 7 Days",
    description: "This is a 24/7 emergency mental health assessment and treatment center that accepts walk-ins.",
    phone: "416-535-8501",
    isEmergency: true,
    source: "Toronto Open Data"
  },
  {
    id: "e2",
    name: "The Works - Toronto Public Health",
    category: "Health",
    lat: 43.6565,
    lng: -79.3793,
    address: "277 Victoria St, Toronto",
    hours: "Mon-Sat 10am-10pm",
    description: "This is a supervised consumption service (SIS) providing harm reduction supplies and overdose prevention.",
    phone: "416-392-0520",
    isEmergency: true,
    source: "Toronto Public Health"
  },
  {
    id: "e3",
    name: "Gerstein Crisis Centre",
    category: "Crisis",
    lat: 43.6605,
    lng: -79.3755,
    address: "100 Charles St E, Toronto",
    hours: "24 Hours",
    description: "This is a community-based mental health crisis service offering phone and mobile support.",
    phone: "416-929-5200",
    isEmergency: true
  },

  // STANDARD RESOURCES
  {
    id: "1",
    name: "Daily Bread Food Bank",
    category: "Food",
    lat: 43.6355,
    lng: -79.5235,
    address: "191 New Toronto St, Etobicoke",
    hours: "Mon–Fri, 10 AM–4 PM",
    description: "This is one of Toronto's largest food bank networks offering emergency food support.",
    phone: "416-203-0050"
  },
  {
    id: "2",
    name: "Scott Mission Shelter",
    category: "Shelter",
    lat: 43.6574,
    lng: -79.3994,
    address: "502 Spadina Ave, Toronto",
    hours: "Open 24 hours",
    description: "This is an emergency shelter service providing hot meals and a clothing bank for men.",
    phone: "416-923-8872"
  },
  {
    id: "3",
    name: "The 519",
    category: "Community",
    lat: 43.6664,
    lng: -79.3811,
    address: "519 Church St, Toronto",
    hours: "Mon-Fri 9AM-9PM, Weekends 10AM-5PM",
    description: "This is a community centre serving LGBTQ2S communities with counseling, meals, and legal clinics.",
    website: "the519.org",
    source: "Toronto Open Data"
  },
  {
    id: "4",
    name: "Parkdale Community Legal Services",
    category: "Legal",
    lat: 43.6404,
    lng: -79.4388,
    address: "1266 Queen St W, Toronto",
    hours: "Mon-Fri 9 AM - 5 PM",
    description: "This is a legal clinic offering free legal advice for low-income residents regarding housing and immigration.",
    phone: "416-531-2411"
  },
  {
    id: "5",
    name: "Fred Victor - 145 Queen",
    category: "Health",
    lat: 43.6524,
    lng: -79.3725,
    address: "145 Queen St E, Toronto",
    hours: "Open 24 hours",
    description: "This is a service providing harm reduction, housing support, and mental health services.",
  },
  {
    id: "6",
    name: "North York Harvest Food Bank",
    category: "Food",
    lat: 43.7168,
    lng: -79.4653,
    address: "116 Industry St, North York",
    hours: "Mon-Fri 9 AM - 4:30 PM",
    description: "This is the primary food bank for northern Toronto offering community hamper programs.",
  },
  {
    id: "7",
    name: "Scarborough Centre for Healthy Communities",
    category: "Health",
    lat: 43.7757,
    lng: -79.2323,
    address: "629 Markham Rd, Scarborough",
    hours: "Mon-Fri 9 AM - 5 PM",
    description: "This is a community health centre offering medical care, food support, and seniors programs.",
    source: "Toronto Open Data"
  },
  {
    id: "8",
    name: "Eva's Phoenix",
    category: "Shelter",
    lat: 43.6466,
    lng: -79.3986,
    address: "60 Brant St, Toronto",
    hours: "24 Hours",
    description: "This is a transitional housing and employment training facility for homeless youth aged 16-24.",
  },
  {
    id: "9",
    name: "Agincourt Community Services",
    category: "Community",
    lat: 43.7861,
    lng: -79.2843,
    address: "4155 Sheppard Ave E, Scarborough",
    hours: "Mon-Fri 9 AM - 5 PM",
    description: "This is a multi-service agency providing housing help, a food bank, and newcomer services.",
  },
  {
    id: "10",
    name: "St. Felix Centre",
    category: "Shelter",
    lat: 43.6467,
    lng: -79.4033,
    address: "25 Augusta Ave, Toronto",
    hours: "24 Hours",
    description: "This is a 24-hour respite service providing meals and showers for vulnerable community members.",
    source: "Toronto Open Data"
  },
  {
    id: "11",
    name: "Covenant House Toronto",
    category: "Shelter",
    lat: 43.6586,
    lng: -79.3821,
    address: "20 Gerrard St E, Toronto",
    hours: "24 Hours",
    description: "This is Canada's largest agency serving youth who are homeless, trafficked or at risk.",
    phone: "416-598-4898"
  },
  {
    id: "12",
    name: "Sistering",
    category: "Community",
    lat: 43.6617,
    lng: -79.4256,
    address: "962 Bloor St W, Toronto",
    hours: "24 Hours",
    description: "This is a multi-service agency for at-risk, socially isolated women and trans people in Toronto.",
    phone: "416-926-9762"
  },
  {
    id: "13",
    name: "Red Door Family Shelter",
    category: "Shelter",
    lat: 43.6629,
    lng: -79.3502,
    address: "21 Carlaw Ave, Toronto",
    hours: "24 Hours",
    description: "This is a shelter providing emergency housing and support for families and individuals.",
    phone: "416-915-5671"
  },
  {
    id: "14",
    name: "Street Health",
    category: "Health",
    lat: 43.6596,
    lng: -79.3730,
    address: "338 Dundas St E, Toronto",
    hours: "Mon-Fri 9 AM - 5 PM",
    description: "This is a community-based health care organization improving the health of homeless and under-housed people.",
    phone: "416-921-8668"
  },
  {
    id: "15",
    name: "Toronto Public Library - Toronto Reference Library",
    category: "Community",
    lat: 43.6721,
    lng: -79.3868,
    address: "789 Yonge St, Toronto",
    hours: "Mon-Fri 9 AM - 8:30 PM, Sat 9-5, Sun 1:30-5",
    description: "This is a public library offering free internet access, community resources, and a safe space.",
    phone: "416-395-5577"
  }
];