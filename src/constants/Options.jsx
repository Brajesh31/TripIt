import { icons } from "lucide-react"

export const SelectTravelersList = [
  {
    id: 1,
    title: 'Just Me',
    desc: "A sole traveller's in ecploration",
    icon: '✈',
    people: '1'
  },
  {
    id: 2,
    title: 'Couple',
    desc: 'Two travellers in tandem',
    icon: '👫',
    people: '2'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adventure or a combined family',
    icon: '🏡',
    people: '3 to 5 people approx.'
  }
]

export const SelectBudget = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Keep cost as minimal as possible',
    icon: '🪙'
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on an average estimate',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'No worry of expenditure',
    icon: '💸',
  },
]

export const AI_PROMPT = `
Generate a detailed travel plan for:
- Location: {location}
- Duration: {totalDays} days
- Budget: {budget}
- Traveler Type: {traveller}

Return the output ONLY in this JSON format:

{
  "travelPlan": {
    "location": "string",
    "duration": "string",
    "travelerType": "string",
    "budget": "string",
    "bestTimeToVisit": "string",
    "hotelOptions": [
      {
        "name": "string",
        "animationEffect": "string",
        "address": "string",
        "price": "string",
        "imageUrl": "string",
        "geolocation": {
          "latitude": number,
          "longitude": number
        },
        "rating": number,
        "description": "string"
      }
    ],
    "dailyItinerary": [
      {
        "day": number,
        "theme": "string",
        "activities": [
          {
            "time": "string",
            "placeName": "string",
            "placeDetails": "string",
            "imageUrl": "string",
            "geolocation": {
              "latitude": number,
              "longitude": number
            },
            "ticketInfo": "string",
            "timeToTravel": "string"
          }
        ]
      }
    ]
  }
}

DO NOT include extra explanation or markdown — just return the raw JSON object.
`;