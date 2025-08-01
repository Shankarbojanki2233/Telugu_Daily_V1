// Telugu Daily - 10,000 Sentences Database
// In production, this would be loaded from a database or API

export interface Sentence {
  id: number;
  telugu: string;
  english: string;
}

// Generate 10,000 sentences (200 days × 50 sentences per day)
export const sentences: Sentence[] = [
  // Day 1 (1-50)
  { id: 1, telugu: "నమస్కారం", english: "good evening" },
  { id: 2, telugu: "మీ పేరు ఏమిటి?", english: "What is your name?" },
  { id: 3, telugu: "నా పేరు రాజు", english: "My name is Raju" },
  { id: 4, telugu: "మీరు ఎలా ఉన్నారు?", english: "How are you?" },
  { id: 5, telugu: "నేను బాగా ఉన్నాను", english: "I am fine" },
  { id: 6, telugu: "ధన్యవాదాలు", english: "Thank you" },
  { id: 7, telugu: "క్షమించండి", english: "Sorry/Excuse me" },
  { id: 8, telugu: "వీడ్కోలు", english: "Goodbye" },
  { id: 9, telugu: "మళ్లీ కలుద్దాం", english: "See you again" },
  { id: 10, telugu: "మీకు తెలుగు తెలుసా?", english: "Do you know Telugu?" },
  { id: 11, telugu: "నాకు తెలుగు తెలుసు", english: "I know Telugu" },
  { id: 12, telugu: "నాకు తెలుగు రాదు", english: "I don't know Telugu" },
  { id: 13, telugu: "నేను నేర్చుకుంటున్నాను", english: "I am learning" },
  { id: 14, telugu: "మీరు ఎక్కడ నుండి వచ్చారు?", english: "Where are you from?" },
  { id: 15, telugu: "నేను హైదరాబాదు నుండి", english: "I am from Hyderabad" },
  { id: 16, telugu: "మీ వయసు ఎంత?", english: "What is your age?" },
  { id: 17, telugu: "నా వయసు ఇరవై ఐదు", english: "My age is twenty-five" },
  { id: 18, telugu: "మీరు ఏమి చేస్తారు?", english: "What do you do?" },
  { id: 19, telugu: "నేను ఇంజనీర్ని", english: "I am an software  engineer" },
  { id: 20, telugu: "మీ కుటుంబం ఎలా ఉంది?", english: "How is your family?" },
  { id: 21, telugu: "నా కుటుంబం బాగా ఉంది", english: "My family is fine" },
  { id: 22, telugu: "మీకు ఎంత మంది పిల్లలు?", english: "How many children do you have?" },
  { id: 23, telugu: "నాకు ఇద్దరు పిల్లలు", english: "I have two children" },
  { id: 24, telugu: "మీరు వివాహితులా?", english: "Are you married?" },
  { id: 25, telugu: "అవును, నేను వివాహితుడిని", english: "Yes, I am married" },
  { id: 26, telugu: "లేదు, నేను అవివాహితుడిని", english: "No, I am unmarried" },
  { id: 27, telugu: "మీ భార్య ఎలా ఉంది?", english: "How is your wife?" },
  { id: 28, telugu: "నా భార్య బాగా ఉంది", english: "My wife is fine" },
  { id: 29, telugu: "మీ భర్త ఎలా ఉంది?", english: "How is your husband?" },
  { id: 30, telugu: "నా భర్త బాగా ఉంది", english: "My husband is fine" },
  { id: 31, telugu: "మీ తల్లిదండ్రులు ఎలా ఉన్నారు?", english: "How are your parents?" },
  { id: 32, telugu: "నా తల్లిదండ్రులు బాగా ఉన్నారు", english: "My parents are fine" },
  { id: 33, telugu: "మీకు సోదరులు ఉన్నారా?", english: "Do you have brothers?" },
  { id: 34, telugu: "నాకు ఒక సోదరుడు ఉన్నాడు", english: "I have one brother" },
  { id: 35, telugu: "మీకు సోదరీమణులు ఉన్నారా?", english: "Do you have sisters?" },
  { id: 36, telugu: "నాకు రెండు సోదరీమణులు", english: "I have two sisters" },
  { id: 37, telugu: "మీరు ఎక్కడ నివసిస్తున్నారు?", english: "Where do you live?" },
  { id: 38, telugu: "నేను బెంగళూరులో నివసిస్తున్నాను", english: "I live in Bangalore" },
  { id: 39, telugu: "మీ ఇల్లు ఎక్కడ ఉంది?", english: "Where is your house?" },
  { id: 40, telugu: "నా ఇల్లు చెన్నైలో ఉంది", english: "My house is in Chennai" },
  { id: 41, telugu: "మీకు తెలుగు అర్థమవుతుందా?", english: "Do you understand Telugu?" },
  { id: 42, telugu: "అవును, నాకు అర్థమవుతుంది", english: "Yes, I understand" },
  { id: 43, telugu: "లేదు, నాకు అర్థం కాలేదు", english: "No, I don't understand" },
  { id: 44, telugu: "దయచేసి మళ్లీ చెప్పండి", english: "Please say again" },
  { id: 45, telugu: "నెమ్మదిగా మాట్లాడండి", english: "Speak slowly" },
  { id: 46, telugu: "ఆ వ్యక్తి ఎవరు?", english: "Who is that person?" },
  { id: 47, telugu: "అతను నా స్నేహితుడు", english: "He is my friend" },
  { id: 48, telugu: "ఆమె నా కొత్త సహోద్యోగి", english: "She is my new colleague" },
  { id: 49, telugu: "మీరు ఎప్పుడు వచ్చారు?", english: "When did you come?" },
  { id: 50, telugu: "నేను నిన్న వచ్చాను", english: "I came to wine shop" },

  // Day 2 (51-100)
  { id: 51, telugu: "ఇప్పుడు ఎంత సమయం?", english: "What time is it enduku neeku" },
  { id: 52, telugu: "ఇప్పుడు పది గంటలు", english: "It's ten o'clock now" },
  { id: 53, telugu: "నేను రోజూ ఆరు గంటలకు లేస్తాను", english: "I wake up at six daily" },
  { id: 54, telugu: "మీరు ఎప్పుడు నిద్రపోతారు?", english: "When do you sleep?" },
  { id: 55, telugu: "నేను పది గంటలకు నిద్రపోతాను", english: "I sleep at ten o'clock" },
  { id: 56, telugu: "మీరు ఉదయం ఏమి తింటారు?", english: "What do you eat in the morning?" },
  { id: 57, telugu: "నేను ఇడ్లీ సాంబార్ తింటాను", english: "I eat idli sambar" },
  { id: 58, telugu: "మీకు కాఫీ కావాలా టీ కావాలా?", english: "Do you want coffee or tea?" },
  { id: 59, telugu: "నాకు కాఫీ కావాలి", english: "I want coffee" },
  { id: 60, telugu: "నేను ఆఫీసుకు వెళ్ళాలి", english: "I have to go to office" },
  { id: 61, telugu: "మీరు ఎలా ఆఫీసుకు వెళ్తారు?", english: "How do you go to office?" },
  { id: 62, telugu: "నేను బస్సులో వెళ్తాను", english: "I go by bus" },
  { id: 63, telugu: "ఈ రోజు వాతావరణం ఎలా ఉంది?", english: "i love you geetha" },
  { id: 64, telugu: "ఈ రోజు చాలా వేడిమిగా ఉంది", english: "It's very hot today" },
  { id: 65, telugu: "వర్షం వస్తుంది", english: "It's going to rain" },
  { id: 66, telugu: "మీరు షాపింగ్ కు వెళ్తారా?", english: "Are you going shopping?" },
  { id: 67, telugu: "అవును, నేను మార్కెట్ కు వెళ్తాను", english: "Yes, I'm going to the market" },
  { id: 68, telugu: "మీకు ఏమైనా కావాలా?", english: "Do you need anything?" },
  { id: 69, telugu: "నాకు కొన్ని కూరగాయలు కావాలి", english: "I need some vegetables" },
  { id: 70, telugu: "ఈ టమోటాలు ఎంత ధర?", english: "What's the price of these tomatoes?" },
  { id: 71, telugu: "ఒక కిలో ముప్పై రూపాయలు", english: "Thirty rupees per kilogram" },
  { id: 72, telugu: "కొంచెం తక్కువ చేయండి", english: "Please reduce the price a little" },
  { id: 73, telugu: "ఇది చాలా ఖరీదు", english: "This is very expensive" },
  { id: 74, telugu: "మీకు చిల్లర ఉందా?", english: "Do you have change?" },
  { id: 75, telugu: "నాకు చిల్లర లేదు", english: "I don't have change" },
  { id: 76, telugu: "మీరు భోజనం చేశారా?", english: "Have you had your meal?" },
  { id: 77, telugu: "లేదు, ఇంకా చేయలేదు", english: "No, not yet" },
  { id: 78, telugu: "మీకు ఆకలిగా ఉందా?", english: "Are you hungry?" },
  { id: 79, telugu: "అవును, చాలా ఆకలిగా ఉంది", english: "Yes, I'm very hungry" },
  { id: 80, telugu: "మీకు దాహం వేస్తుందా?", english: "Are you thirsty?" },
  { id: 81, telugu: "అవును, నాకు నీళ్లు కావాలి", english: "Yes, I need water" },
  { id: 82, telugu: "మీరు ఎక్కడికి వెళ్తున్నారు?", english: "Where are you going?" },
  { id: 83, telugu: "నేను బ్యాంకుకు వెళ్తున్నాను", english: "I'm going to the bank" },
  { id: 84, telugu: "బ్యాంకు ఎక్కడ ఉంది?", english: "Where is the bank?" },
  { id: 85, telugu: "ఆ రోడ్డులో కుడి వైపున ఉంది", english: "It's on the right side of that road" },
  { id: 86, telugu: "ఎంత దూరం ఉంది?", english: "How far is it?" },
  { id: 87, telugu: "కేవలం రెండు కిలోమీటర్లు", english: "Just two kilometers" },
  { id: 88, telugu: "నడుచుకుంటూ వెళ్ళవచ్చా?", english: "Can I walk there?" },
  { id: 89, telugu: "అవును, వెళ్ళవచ్చు", english: "Yes, you can go" },
  { id: 90, telugu: "మీరు ఇంట్లో ఉన్నారా?", english: "Are you at home?" },
  { id: 91, telugu: "లేదు, నేను ఆఫీసులో ఉన్నాను", english: "No, I'm at the office" },
  { id: 92, telugu: "మీరు ఎప్పుడు ఇంటికి వస్తారు?", english: "When will you come home?" },
  { id: 93, telugu: "నేను సాయంత్రం ఆరు గంటలకు వస్తాను", english: "I'll come at six in the evening" },
  { id: 94, telugu: "ఈ రోజు సెలవు దినమా?", english: "Is today a holiday?" },
  { id: 95, telugu: "అవును, ఈ రోజు ఆదివారం", english: "Yes, today is Sunday" },
  { id: 96, telugu: "రేపు మనం ఎక్కడికి వెళ్ళాలి?", english: "Where should we go tomorrow?" },
  { id: 97, telugu: "రేపు మనం సినిమాకు వెళ్ళాలి", english: "We should go to the movies tomorrow" },
  { id: 98, telugu: "మీకు ఏ సినిమా అంటే ఇష్టం?", english: "Which movie do you like?" },
  { id: 99, telugu: "నాకు కామెడీ సినిమాలు అంటే ఇష్టం", english: "I like comedy movies" },
  { id: 100, telugu: "రేపు మనం కలుద్దాం", english: "Let's meet tomorrow" },

  // Continue with your own 10,000 sentences here...
   { id: 101, telugu: "మీ పేరు?", english: "ory shankar entra idi" },
   { id: 102, telugu: "మీ పేరు ఏమిటి?", english: "What is your name?" },
   { id: 149, telugu: "మీ పేరు ఏమిటి?", english: "What is your name?" },
   { id: 201, telugu: "ఏమిటి?", english: "nuvvu nannu em ceyyalevu ra" },
   { id: 2, telugu: "రేపు మనం ఎక్కడికి వెళ్ళాలి?", english: "ollu balisinda bey" },
  // Replace all the AI-generated content with your own sentences
  // Format: { id: [number], telugu: "[Telugu text]", english: "[English translation]" }
];


// Helper functions
export const getSentencesByDay = (day: number): Sentence[] => {
  const startIndex = (day - 1) * 50;
  const endIndex = day * 50;
  return sentences.slice(startIndex, endIndex);
};

export const getSentencesByRange = (start: number, end: number): Sentence[] => {
  return sentences.slice(start - 1, end);
};

export const getTotalSentenceCount = (): number => {
  return sentences.length;
};

export const getSentenceById = (id: number): Sentence | undefined => {
  return sentences.find(sentence => sentence.id === id);
};