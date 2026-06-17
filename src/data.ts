import { Truck, Home, ShieldAlert, Sparkles, AlertCircle, Droplets, Clock, Coins, Users, Leaf, Trash2, ShieldCheck } from "lucide-react";

import gallery0 from "../src/assets/images/nehashriseptictank_gallery.jpeg";
import gallery1 from "../src/assets/images/nehashriseptictank_gallery-1.jpeg";
import gallery2 from "../src/assets/images/nehashriseptictank_gallery-2.jpeg";
import gallery3 from "../src/assets/images/nehashriseptictank_gallery-3.jpeg";
import banner3 from "../src/assets/images/Neha_Shri_banner-3.jpg";
import gallery4 from "../src/assets/images/nehashriseptictank_gallery-4.jpeg";
import gallery5 from "../src/assets/images/nehashriseptictank_gallery-5.jpeg";
import gallery6 from "../src/assets/images/nehashriseptictank_gallery-6.jpg";
import gallery7 from "../src/assets/images/nehashriseptictank_gallery-7.webp";
export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
  features: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "Vehicles" | "Results" | "Work Process";
  imageUrl: string;
  alt: string;
  isBeforeAfter?: boolean;
  beforeUrl?: string;
  afterUrl?: string;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Breadcrumb {
  name: string;
  url: string;
}

export const phoneNumbers = {
  primary: "+91 97873 58005",
  secondary: "+91 93611 56233",
  formatted: "097873 58005 / 093611 56233"
};

export const whatsappNumbers = {
  primary: "9787358005",
  formatted: "+91 97873 58005"
};

export const metadataDetails = {
  proprietor: "Palani.M",
  blessing: "Sri Venkatachallapathi Thunai",
  tagline: "Drainage Water, Toilets Cleaned By Compressor Motor"
};

export const serviceAreas = [
  "Shoolagiri",
  "Hosur",
  "Krishnagiri",
  "Bagalur",
  "Denkanikottai",
  "Rayakottai",
  "Kelamangalam",
  "Mathigiri"
];

export const servicesData: Service[] = [
  {
    id: "septic-tank-cleaning",
    title: "Septic Tank Cleaning",
    description: "Highly efficient 10,000+ liters high-capacity vacuum septic tankers with advanced hydraulic suction for thorough sludge evacuation.",
    iconName: "Truck",
    benefits: ["Maintains long-term toilet sanitization", "Saves expensive pipe repairs", "Prevents foul odors"],
    features: ["Deep suction up to 100 feet", "Complete odor elimination", "Hygienic chemical wash"]
  },
  {
    id: "residential-cleaning",
    title: "Residential Cleaning",
    description: "Hassle-free, quick cleaning services for individual homes, apartment communities, gated gardens & premium villas with Zero Spillage.",
    iconName: "Home",
    benefits: ["Zero disturbance to household", "Hygienic residue-free process", "Affordable flat rates"],
    features: ["Trained, polite professionals", "Odor lock hoses", "Prompt scheduled arrival"]
  },
  {
    id: "commercial-industrial",
    title: "Commercial & Industrial",
    description: "Tailored industrial sludge removal, effluent treatment pit cleaning, and grease trap evacuation for factories, hospitals, and schools.",
    iconName: "ShieldAlert",
    benefits: ["Compliance with environmental rules", "Minimal operational downtime", "Massive capacity processing"],
    features: ["Heavy machinery vac-trucks", "Full corporate certification", "Custom periodic maintenance"]
  },
  {
    id: "drainage-sewer",
    title: "Drainage & Sewer Cleaning",
    description: "Super high-pressure water jetting system to swiftly pulverize heavy sludge blocks, tree roots, oil, and grease within drain pipes.",
    iconName: "Sparkles",
    benefits: ["Instant water flow restoration", "Stops backing up drains", "Destroys bacteria hubs"],
    features: ["Jetting pumps up to 150 bar", "Camera blockage inspect", "Corrosion safe treatments"]
  },
  {
    id: "toilet-pit-cleaning",
    title: "Toilet Pit Cleaning",
    description: "Effective evacuation and deep washing of rural & urban toilet pits, bio-digesters, and ring wells with complete hygiene assurance.",
    iconName: "Trash2",
    benefits: ["Prevents soil & water contamination", "Restores absorption speed", "Eco-safe treatments"],
    features: ["Deep organic solid liquefication", "Chemical treatment & disinfect", "Odor neutralizing agents"]
  },
  {
    id: "emergency-services",
    title: "24/7 Emergency Service",
    description: "On-call emergency dispatch team to address sudden overflow issues or severe backups. Available 24 hours structural shift.",
    iconName: "AlertCircle",
    benefits: ["Instant response under 45 mins", "Avoids costly home flooding", "Active dispatch every day"],
    features: ["Dedicated hotline number", "Backup emergency tankers", "Highly responsive field crew"]
  }
];

export const whyChooseUsData: WhyChooseUsItem[] = [
  {
    id: "24-7-service",
    title: "24/7 Service Support",
    description: "Septic disasters do not wait. We are ready with live responders to assist you any hour of the day, including public holidays.",
    iconName: "Clock"
  },
  {
    id: "modern-equipment",
    title: "Advanced Vacuum Trucks",
    description: "State-of-the-art hydraulic high-suction trucks and high-pressure jetting rods that can clean the toughest sludge with ease.",
    iconName: "Droplets"
  },
  {
    id: "affordable-pricing",
    title: "Affordable & Fair Rates",
    description: "Transparent, honest, and competitive pricing with absolutely zero hidden fees or premium emergency surcharges.",
    iconName: "Coins"
  },
  {
    id: "experienced-team",
    title: "Licensed Specialists",
    description: "Highly experienced, licensed operators trained to manage residential, corporate, and chemical sanitation safety protocols.",
    iconName: "Users"
  },
  {
    id: "eco-disposal",
    title: "Safe & Green Disposal",
    description: "Strictly adhere to local municipal guidelines. All extracted slurry is handled safely and disposed of at certified treatment zones.",
    iconName: "Leaf"
  }
];

export const galleryData: GalleryItem[] = [
   {
    id: "gal-2",
    title: "",
    category: "Vehicles",
    imageUrl: gallery0,
    alt: "Professional technician setting up a high-pressure drainage blockage jetting system",
    description: "",
  },
  {
    id: "gal-3",
    title: "",
    category: "Vehicles",
    imageUrl: gallery1,
    alt: "Septic tank inspection dome and modern instruments during a routine home check",
    description: "",
  },
  {
    id: "gal-4",
    title: "",
    category: "Vehicles",
    imageUrl: gallery2,
    alt: "Industrial vacuum hose and safe wastewater slurry pipelines at a commercial facility",
    description: "",
  },
  {
    id: "gal-5-ba",
    title: "",
    category: "Vehicles",
    imageUrl: gallery3,
    alt: "Before and after comparison of block removal in drainage duct",
    description: "",
  },
  {
    id: "gal-6-ba",
    title: "",
    category: "Vehicles",
    imageUrl: banner3,
    alt: "Before and after service of septic tank surrounding sanitation",
    description: "",
  },
  {
    id: "gal-7-ba",
    title: "",
    category: "Results",
    imageUrl: gallery4,
    alt: "Before and after service of septic tank surrounding sanitation",
    description: "",
  },
  {
    id: "gal-8-ba",
    title: "",
    category: "Results",
    imageUrl: gallery5,
    alt: "Before and after service of septic tank surrounding sanitation",
    description: "",
  },
  {
    id: "gal-9-ba",
    title: "",
    category: "Work Process",
    imageUrl: gallery6,
    alt: "Before and after service of septic tank surrounding sanitation",
    description: "",
  },
  {
    id: "gal-10-ba",
    title: "",
    category: "Work Process",
    imageUrl: gallery7,
    alt: "Before and after service of septic tank surrounding sanitation",
    description: "",
  }
  
];

export const faqData: FAQ[] = [
  {
    id: "faq-1",
    question: "Why should a septic tank be cleaned often?",
    answer: "By cleaning the septic tank often, you will be able to prolong its lifespan of the same. It helps to prevent any heavy repairs by detecting any problem at the very start of it. It also helps to keep the water and surrounding area clean."
  },
  {
    id: "faq-2",
    question: "How often should I get the septic tank cleaned?",
    answer: "Experts recommend you clean your septic tank once or twice every year. This may vary based on how big your septic tank is. Thus, it is recommended to connect with a professional and ask about the same."
  },
  {
    id: "faq-3",
    question: "How much time does it take to clean a septic tank?",
    answer: "The time taken to clean a septic tank will vary based on how many people are employed to carry out the task and how big the tank is. It usually takes thirty minutes to two hours. To check how much time it will take to clean your septic tank, it is recommended to consult with a professional on the same subject."
  },
  {
    id: "faq-4",
    question: "Will Neha Shri Septic Tank Cleaning help me in cleaning spouts?",
    answer: "Septic tank cleaning services provide various services which include cleaning the spouts of the septic tank. To know more about the same, we highly recommend you to speak with Neha Shri Septic Tank Cleaning."
  },
  {
    id: "faq-5",
    question: "Will Neha Shri Septic Tank Cleaning help me fix collapsing drains?",
    answer: "Most septic tank cleaning services provide help in fixing collapsing drains. To check if Neha Shri Septic Tank Cleaning does the same, we highly recommend you to call before availing of their services."
  },
  {
    id: "faq-6",
    question: "When can I book a service at Neha Shri Septic Tank Cleaning in Hosur?",
    answer: "The work timings of Neha Shri Septic Tank Cleaning in Hosur are Monday:- Open 24 Hrs, Tuesday:- Open 24 Hrs, Wednesday:- Open 24 Hrs, Thursday:- Open 24 Hrs, Friday:- Open 24 Hrs, Saturday:- Open 24 Hrs, Sunday:- Open 24 Hrs. You can call and book a service for cleaning anytime between these hours."
  },
  {
    id: "faq-7",
    question: "How can I contact Neha Shri Septic Tank Cleaning in Shoolagiri, Hosur?",
    answer: "You can contact Neha Shri Septic Tank Cleaning in Shoolagiri directly through the contact details (+91 97873 58005) available above for enquiries."
  }
];

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Truck": return Truck;
    case "Home": return Home;
    case "ShieldAlert": return ShieldAlert;
    case "Sparkles": return Sparkles;
    case "Trash2": return Trash2;
    case "AlertCircle": return AlertCircle;
    case "Clock": return Clock;
    case "Droplets": return Droplets;
    case "Coins": return Coins;
    case "Users": return Users;
    case "Leaf": return Leaf;
    default: return ShieldCheck;
  }
};
