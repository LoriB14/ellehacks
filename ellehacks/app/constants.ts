import { Resource, Coordinate } from './types';

export const DEFAULT_CENTER: Coordinate = {
  lat: 43.6532,
  lng: -79.3832,
};

export const STATIC_RESOURCES: Resource[] = [
  {
    id: 'r1',
    name: 'Downtown Food Bank',
    description: 'Free groceries and hot meals for those in need.',
    category: 'Food',
    lat: 43.655, 
    lng: -79.380,
    address: '123 Main St',
    hours: 'Mon-Fri 9am-5pm'
  },
  {
    id: 'r2',
    name: 'Community Shelter',
    description: 'Emergency shelter and case work support.',
    category: 'Shelter',
    lat: 43.660,
    lng: -79.390,
    address: '456 Shelter Ave',
    hours: '24/7'
  }
];
