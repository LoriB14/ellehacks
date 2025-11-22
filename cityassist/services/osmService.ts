import { Resource } from '../types';

export const searchAreaForResources = async (
  north: number,
  south: number,
  east: number,
  west: number
): Promise<Resource[]> => {
  try {
    // Using Nominatim Viewbox search as a lightweight discovery tool
    // We look for generic terms relevant to our categories
    const queries = ['food bank', 'shelter', 'legal clinic', 'community centre'];
    const results: Resource[] = [];
    
    // We'll just run one query for "social facility" generic to save bandwidth in demo
    // Or iterate a few common ones. Let's do a generic "social services" + "food" check.
    
    const query = "social services"; 
    // Format: viewbox=x1,y1,x2,y2 (left,top,right,bottom) -> lon,lat
    const viewbox = `${west},${north},${east},${south}`;
    
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&viewbox=${viewbox}&bounded=1&limit=5`;

    const response = await fetch(url, {
      headers: { 'User-Agent': 'CityAssist-Hackathon-App' }
    });

    const data = await response.json();

    if (Array.isArray(data)) {
      return data.map((item: any) => ({
        id: `osm_${item.place_id}`,
        name: item.name || item.display_name.split(',')[0],
        category: 'discovered',
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        address: item.display_name,
        hours: 'Check online',
        description: 'Auto-discovered location via OpenStreetMap.',
        source: 'OpenStreetMap'
      }));
    }
    return [];
  } catch (error) {
    console.warn("OSM Auto-discovery failed:", error);
    return [];
  }
};
