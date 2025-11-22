import { AIResponse } from '../types';
import { STATIC_RESOURCES } from '../constants';

// Lightweight stub to simulate an AI search response.
export async function searchResourcesWithGemini(query: string, lat?: number, lng?: number): Promise<AIResponse> {
  // For now return the static resources filtered by category/name match.
  const q = query.trim().toLowerCase();
  const matched = STATIC_RESOURCES.filter(r =>
    r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
  );

  return {
    resources: matched.length ? matched : STATIC_RESOURCES,
    summary: matched.length ? `Showing ${matched.length} results for “${query}”` : 'Showing popular local resources.'
  };
}
