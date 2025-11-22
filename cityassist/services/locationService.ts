export const geocodeAddress = async (address: string): Promise<{lat: number, lng: number} | null> => {
  try {
    // Appending ', Toronto, Ontario' to bias results locally for this MVP
    const query = `${address}, Toronto, Ontario`;
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'CityAssist-Hackathon-App'
      }
    });
    const data = await response.json();
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    return null;
  } catch (e) {
    console.error("Geocoding failed", e);
    return null;
  }
};