export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  category: string;
  lat: number;
  lng: number;
  address?: string;
  hours?: string;
}

export interface AIResponse {
  resources: Resource[];
  summary: string;
}

export type { Resource as ResourceType };
