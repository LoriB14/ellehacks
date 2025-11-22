import { GoogleGenAI } from "@google/genai";
import { Resource, AIResponse } from "../types";
import { STATIC_RESOURCES } from "../constants";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchResourcesWithGemini = async (
  userQuery: string,
  userLat: number,
  userLng: number
): Promise<AIResponse> => {
  
  try {
    // Prepare resource data for the prompt
    const resourceDataString = JSON.stringify(STATIC_RESOURCES.map(r => ({
      id: r.id,
      name: r.name,
      category: r.category,
      lat: r.lat,
      lng: r.lng,
      address: r.address,
      hours: r.hours,
      description: r.description,
      isEmergency: r.isEmergency
    })));

    const systemPrompt = `
    You are CityAssist, an AI designed to help users in Ontario find free or low-cost essential community resources such as food banks, shelters, community centers, legal clinics, and warming centres.

    You receive:
    1. A user request in plain language
    2. The user's approximate latitude and longitude
    3. A structured JSON list of known community resources

    Your job:
    - Identify the most relevant category/categories
    - Select the best matching resources based on distance and relevance to the query (e.g. if user asks for 'overdose', prioritize 'health' or 'crisis' resources)
    - Produce a ranked list
    - Write a clear, supportive summary (2–4 sentences)
    - EXTRACT ELIGIBILITY TIPS: Create a list of 3-4 short, punchy bullet points explaining "What to know" (e.g., "No ID required", "Bring a bag", "Open to all ages", "Intake closes at 4PM"). Simplify complex rules into simple English.
    - Never hallucinate new locations — only use the provided dataset

    CRITICAL: Return ONLY valid JSON. Do not wrap it in markdown code blocks.
    Format:
    {
      "summary": "...",
      "tips": ["Tip 1", "Tip 2", "Tip 3"],
      "resources": [
        {
          "id": "...",
          "distance_km": "..."
        }
      ]
    }
    `;

    const userPrompt = `
    User request:
    ${userQuery}

    User location:
    ${userLat}, ${userLng}

    Available resources:
    ${resourceDataString}

    Please return the ranked list, summary, and tips as specified. Return strictly valid JSON.
    `;

    // IMPORTANT: Removing responseMimeType: "application/json" to avoid browser-side RPC serialization errors.
    // We will manually parse the text response.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    let responseText = response.text;
    if (!responseText) throw new Error("Empty response from Gemini");

    // Clean up markdown if present (```json ... ```)
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Attempt to find the JSON object if there is extra text
    const jsonStart = responseText.indexOf('{');
    const jsonEnd = responseText.lastIndexOf('}');
    
    if (jsonStart !== -1 && jsonEnd !== -1) {
        responseText = responseText.substring(jsonStart, jsonEnd + 1);
    }

    const parsed = JSON.parse(responseText);
    
    // Map back to full resource objects from our constant data
    const matchedResources = parsed.resources.map((r: any) => {
      const original = STATIC_RESOURCES.find(sr => sr.id === r.id);
      if (original) {
        // Append distance info to the description for the UI
        return { 
            ...original, 
            description: `${original.description} (${r.distance_km} away)` 
        };
      }
      return null;
    }).filter(Boolean) as Resource[];

    return {
      summary: parsed.summary,
      tips: parsed.tips || [],
      resources: matchedResources
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback: Return basic filtering if AI fails
    const fallback = STATIC_RESOURCES.filter(r => 
      r.category.includes(userQuery.toLowerCase()) || 
      r.description.toLowerCase().includes(userQuery.toLowerCase()) ||
      (userQuery.toLowerCase().includes('emergency') && r.isEmergency)
    );
    return {
      summary: "We're experiencing heavy traffic. Here are some relevant resources based on keywords.",
      tips: ["Check hours before visiting", "Bring identification just in case"],
      resources: fallback.length > 0 ? fallback : STATIC_RESOURCES.slice(0, 3)
    };
  }
};