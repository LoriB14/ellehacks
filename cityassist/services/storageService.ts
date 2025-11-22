import { UserUpdate } from '../types';

const STORAGE_KEYS = {
  FAVORITES: 'cityassist_favorites',
  UPDATES: 'cityassist_updates',
};

// Favorites
export const getFavorites = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const toggleFavorite = (id: string): boolean => {
  const favs = getFavorites();
  const exists = favs.includes(id);
  let newFavs;
  if (exists) {
    newFavs = favs.filter(f => f !== id);
  } else {
    newFavs = [...favs, id];
  }
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavs));
  return !exists; // Returns true if now favorited, false if removed
};

// Updates
export const getUpdates = (): Record<string, UserUpdate> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.UPDATES);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const addUpdate = (resourceId: string, update: UserUpdate) => {
  const currentUpdates = getUpdates();
  currentUpdates[resourceId] = update;
  localStorage.setItem(STORAGE_KEYS.UPDATES, JSON.stringify(currentUpdates));
};
