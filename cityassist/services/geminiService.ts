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
    You are 6ixAssist, an AI designed to help users in Toronto find free or low-cost essential community resources such as food banks, shelters, community centers, legal clinics, and warming centres.

    You receive:
    1. A user request in plain language
    2. The user's approximate latitude and longitude
    3. A structured JSON list of known community resources

    Your job:
    - Identify the most relevant category/categories
    - Select the best matching resources based on distance and relevance to the query (e.g. if user asks for 'overdose', prioritize 'health' or 'crisis' resources)
    - Produce a ranked list
    - Write a clear, supportive summary (2–4 sentences)
    - Never hallucinate new locations — only use the provided dataset

    CRITICAL: Return ONLY valid JSON. Do not wrap it in markdown code blocks.
    Format:
    {
      "summary": "...",
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

    Please return the ranked list and summary as specified. Return strictly valid JSON.
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
      resources: fallback.length > 0 ? fallback : STATIC_RESOURCES.slice(0, 3)
    };
  }
};

export const explainEligibility = async (resourceName: string, eligibilityText: string): Promise<string> => {
  try {
    const systemPrompt = `
    You are 6ixAssist, a helpful AI that explains eligibility requirements for community resources in simple, clear language.
    
    Break down complex eligibility requirements into easy-to-understand bullet points.
    Be warm, supportive, and concise.
    Focus on what people need to know and bring.
    `;

    const userPrompt = `
    Resource: ${resourceName}
    
    Original eligibility text:
    ${eligibilityText}
    
    Please explain this in simple bullet points starting with "Here's what you need to know:". 
    Include sections like:
    • What you need to bring
    • Who can access this
    • Hours/timing
    • Any special notes
    
    Keep it friendly and clear.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return response.text || "Eligibility information is being updated. Please contact the resource directly for details.";
  } catch (error) {
    console.error("AI Eligibility Error:", error);
    return eligibilityText; // Fallback to original text
  }
};