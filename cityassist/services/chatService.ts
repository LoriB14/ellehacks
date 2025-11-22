// Chat service for providing quick answers before showing resources

interface ChatResponse {
  answer: string;
  suggestedSearches: string[];
  urgency: 'low' | 'medium' | 'high';
}

// Quick answer knowledge base
const quickAnswers: Record<string, ChatResponse> = {
  pregnant: {
    answer: "Prenatal care is available at Toronto Public Health clinics (free). You can get OHIP coverage even without status. Pregnancy support includes: food, housing assistance, and counseling.",
    suggestedSearches: ["Prenatal clinics near me", "Pregnancy support services", "Free maternity care Toronto"],
    urgency: 'high'
  },
  food: {
    answer: "Toronto has 200+ food banks. No ID required. Daily Bread Food Bank serves 1M+ people yearly. Most open Mon-Fri 9AM-4PM.",
    suggestedSearches: ["Food banks near me", "Free meals today", "Community kitchens"],
    urgency: 'high'
  },
  shelter: {
    answer: "Central Intake: 416-338-4766 (24/7). 9,000+ shelter beds available. Emergency shelters don't require ID. Drop-ins available.",
    suggestedSearches: ["Emergency shelters near me", "24/7 shelters", "Women's shelters"],
    urgency: 'high'
  },
  housing: {
    answer: "Toronto Housing Help: 416-338-4766. Wait times: 10+ years for subsidized housing. Rent Bank offers emergency loans (interest-free). Housing workers available at community agencies.",
    suggestedSearches: ["Affordable housing programs", "Rent assistance", "Housing worker near me"],
    urgency: 'medium'
  },
  mental_health: {
    answer: "Crisis line: 416-408-4357 (24/7). CAMH offers free services. Walk-in mental health clinics available. No referral needed.",
    suggestedSearches: ["Mental health walk-in clinic", "Free counseling Toronto", "Crisis support"],
    urgency: 'high'
  },
  addiction: {
    answer: "ConnexOntario: 1-866-531-2600 (24/7). Harm reduction sites across Toronto. Free treatment programs available. Methadone clinics don't require OHIP.",
    suggestedSearches: ["Addiction treatment near me", "Harm reduction sites", "Support groups"],
    urgency: 'high'
  },
  medical: {
    answer: "Community Health Centres serve everyone (free, no OHIP needed). Walk-in clinics available. Regent Park CHC: 416-465-1296. Virtual care available.",
    suggestedSearches: ["Free health clinic near me", "Walk-in clinic", "Community health centre"],
    urgency: 'medium'
  },
  legal: {
    answer: "Legal Aid Ontario: 1-800-668-8258 (free). Community Legal Clinics offer free services. No income limits for criminal matters. Family law support available.",
    suggestedSearches: ["Free legal aid", "Legal clinic near me", "Lawyer consultation"],
    urgency: 'medium'
  },
  id: {
    answer: "Toronto ID Program: Free photo ID for residents. Birth Certificate: $35 (Service Ontario). Ontario ID: $35. Fee waivers available through shelters/agencies.",
    suggestedSearches: ["How to get Toronto ID", "Birth certificate replacement", "Free ID program"],
    urgency: 'medium'
  },
  immigration: {
    answer: "FCJ Refugee Centre: 416-469-9754. Free immigration legal help. Settlement agencies provide support. Sanctuary City policy protects all residents.",
    suggestedSearches: ["Immigration help Toronto", "Refugee services", "Settlement agencies"],
    urgency: 'medium'
  },
  domestic_violence: {
    answer: "Assaulted Women's Helpline: 1-866-863-0511 (24/7). Shelters available immediately. No questions asked. Children welcome. Support in 200+ languages.",
    suggestedSearches: ["Women's shelter emergency", "Domestic violence support", "Safe housing now"],
    urgency: 'high'
  },
  employment: {
    answer: "Employment Ontario: Free job search help. Toronto Employment & Social Services: 416-392-2477. Skills training available. Resume help at libraries (free).",
    suggestedSearches: ["Job training programs", "Employment services", "Resume help"],
    urgency: 'low'
  },
  warming: {
    answer: "Extreme Cold Weather Alert activates warming centres (24/7). Drop-in centres open during day. Metro Hall warming centre: always open during alerts.",
    suggestedSearches: ["Warming centres open now", "24/7 drop-in", "Emergency shelter cold weather"],
    urgency: 'high'
  }
};

// Keywords mapping to categories
const keywordMap: Record<string, string> = {
  // Pregnancy related
  'pregnant': 'pregnant',
  'pregnancy': 'pregnant',
  'baby': 'pregnant',
  'prenatal': 'pregnant',
  'expecting': 'pregnant',
  'maternity': 'pregnant',
  
  // Food related
  'food': 'food',
  'hungry': 'food',
  'meal': 'food',
  'eat': 'food',
  'groceries': 'food',
  'food bank': 'food',
  
  // Shelter related
  'shelter': 'shelter',
  'sleep': 'shelter',
  'homeless': 'shelter',
  'bed': 'shelter',
  'overnight': 'shelter',
  
  // Housing
  'housing': 'housing',
  'apartment': 'housing',
  'rent': 'housing',
  'eviction': 'housing',
  
  // Mental health
  'mental': 'mental_health',
  'anxiety': 'mental_health',
  'depression': 'mental_health',
  'suicide': 'mental_health',
  'counseling': 'mental_health',
  'therapy': 'mental_health',
  
  // Addiction
  'addiction': 'addiction',
  'drugs': 'addiction',
  'alcohol': 'addiction',
  'substance': 'addiction',
  'detox': 'addiction',
  
  // Medical
  'doctor': 'medical',
  'sick': 'medical',
  'medical': 'medical',
  'health': 'medical',
  'clinic': 'medical',
  
  // Legal
  'legal': 'legal',
  'lawyer': 'legal',
  'court': 'legal',
  'arrested': 'legal',
  
  // ID
  'id': 'id',
  'identification': 'id',
  'birth certificate': 'id',
  'passport': 'id',
  
  // Immigration
  'immigration': 'immigration',
  'refugee': 'immigration',
  'visa': 'immigration',
  'status': 'immigration',
  
  // Domestic violence
  'abuse': 'domestic_violence',
  'violence': 'domestic_violence',
  'assault': 'domestic_violence',
  'safe': 'domestic_violence',
  'danger': 'domestic_violence',
  
  // Employment
  'job': 'employment',
  'work': 'employment',
  'employment': 'employment',
  'resume': 'employment',
  
  // Warming
  'cold': 'warming',
  'warm': 'warming',
  'freeze': 'warming',
  'winter': 'warming'
};

export const getQuickAnswer = (query: string): ChatResponse | null => {
  const lowerQuery = query.toLowerCase();
  
  // Check for keyword matches
  for (const [keyword, category] of Object.entries(keywordMap)) {
    if (lowerQuery.includes(keyword)) {
      return quickAnswers[category];
    }
  }
  
  return null;
};

export const generateFallbackAnswer = (query: string): ChatResponse => {
  return {
    answer: "I'll help you find resources. Use the map to see what's available near you, or try searching for specific services like 'food', 'shelter', 'health clinic', or 'legal aid'.",
    suggestedSearches: ["Food banks near me", "Community services", "Emergency help"],
    urgency: 'low'
  };
};
