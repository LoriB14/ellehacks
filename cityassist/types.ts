export interface Coordinate {
  lat: number;
  lng: number;
}

export enum ResourceCategory {
  FOOD = 'food',
  SHELTER = 'shelter',
  LEGAL = 'legal',
  HEALTH = 'health',
  COMMUNITY = 'community',
  CRISIS = 'crisis',
  WARMING = 'warming',
}

export interface UserUpdate {
  type: 'status' | 'closure' | 'general';
  text: string;
  timestamp: number;
  user: string;
  meta?: {
    capacity?: string; // e.g. "Full", "High", "Low"
    wait?: string; // e.g. "30 mins"
  };
}

export interface Resource {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  hours: string;
  description: string;
  phone?: string;
  website?: string;
  isEmergency?: boolean;
  source?: string; // e.g., "Toronto Open Data"
  // Client-side simulated fields
  isFavorite?: boolean;
  lastUpdate?: UserUpdate;
}

export interface AIResponse {
  summary: string;
  tips: string[]; // New field for eligibility/what to bring
  resources: Resource[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}