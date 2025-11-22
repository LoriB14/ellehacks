// Live Location Service for Real-time Geolocation
import { Coordinate } from "../types";

export interface LocationServiceOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watchPosition?: boolean;
}

export interface LocationUpdate {
  position: Coordinate;
  accuracy: number;
  timestamp: number;
  speed?: number;
  heading?: number;
}

class LiveLocationService {
  private watchId: number | null = null;
  private lastKnownPosition: Coordinate | null = null;
  private callbacks: Set<(update: LocationUpdate) => void> = new Set();
  private options: LocationServiceOptions = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 30000, // Cache for 30 seconds
    watchPosition: true
  };

  // Get current position once
  async getCurrentPosition(options?: LocationServiceOptions): Promise<LocationUpdate> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      const opts = { ...this.options, ...options };
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const update: LocationUpdate = {
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
            speed: position.coords.speed || undefined,
            heading: position.coords.heading || undefined
          };
          
          this.lastKnownPosition = update.position;
          resolve(update);
        },
        (error) => {
          reject(new Error(`Location error: ${error.message}`));
        },
        {
          enableHighAccuracy: opts.enableHighAccuracy,
          timeout: opts.timeout,
          maximumAge: opts.maximumAge
        }
      );
    });
  }

  // Start watching position changes
  startWatching(callback: (update: LocationUpdate) => void, options?: LocationServiceOptions): void {
    if (!navigator.geolocation) {
      throw new Error('Geolocation not supported');
    }

    this.callbacks.add(callback);
    
    if (this.watchId !== null) {
      return; // Already watching
    }

    const opts = { ...this.options, ...options };
    
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const update: LocationUpdate = {
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
          speed: position.coords.speed || undefined,
          heading: position.coords.heading || undefined
        };
        
        this.lastKnownPosition = update.position;
        
        // Notify all callbacks
        this.callbacks.forEach(cb => cb(update));
      },
      (error) => {
        console.warn('Location watch error:', error.message);
        // Continue watching despite errors
      },
      {
        enableHighAccuracy: opts.enableHighAccuracy,
        timeout: opts.timeout,
        maximumAge: opts.maximumAge
      }
    );
  }

  // Stop watching position
  stopWatching(callback?: (update: LocationUpdate) => void): void {
    if (callback) {
      this.callbacks.delete(callback);
    }
    
    if (this.callbacks.size === 0 && this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // Get last known position (cached)
  getLastKnownPosition(): Coordinate | null {
    return this.lastKnownPosition;
  }

  // Check if geolocation is available
  static isSupported(): boolean {
    return 'geolocation' in navigator;
  }

  // Check permission status
  static async checkPermission(): Promise<'granted' | 'denied' | 'prompt'> {
    if (!('permissions' in navigator)) {
      return 'prompt';
    }

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      return result.state as 'granted' | 'denied' | 'prompt';
    } catch {
      return 'prompt';
    }
  }

  // Request permission explicitly
  static async requestPermission(): Promise<LocationUpdate> {
    const service = new LiveLocationService();
    return service.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0 // Force fresh position
    });
  }

  // Get Toronto neighborhood from coordinates
  static async getNeighborhood(lat: number, lng: number): Promise<string> {
    try {
      // Use reverse geocoding to get neighborhood
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }
      
      const data = await response.json();
      const address = data.address || {};
      
      // Extract neighborhood/suburb information
      const neighborhood = address.neighbourhood || 
                          address.suburb || 
                          address.district || 
                          address.city_district ||
                          address.quarter ||
                          'Toronto';
      
      return neighborhood;
    } catch (error) {
      console.warn('Error getting neighborhood:', error);
      return 'Toronto';
    }
  }

  // Calculate distance between two points (km)
  static calculateDistance(pos1: Coordinate, pos2: Coordinate): number {
    const R = 6371; // Earth's radius in km
    const dLat = (pos2.lat - pos1.lat) * Math.PI / 180;
    const dLng = (pos2.lng - pos1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(pos1.lat * Math.PI / 180) * Math.cos(pos2.lat * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}

export default LiveLocationService;