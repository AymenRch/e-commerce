import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Midnight Rose",
    brand: "Ethereal",
    price: 89,
    originalPrice: 120,
    image: "https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg",
    images: [
      "https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg",
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg"
    ],
    category: "women",
    fragranceFamily: "Floral",
    description: "A captivating blend of midnight blooms and velvety rose petals, creating an enchanting evening fragrance.",
    topNotes: ["Bergamot", "Black Currant", "Pink Pepper"],
    middleNotes: ["Rose", "Peony", "Violet"],
    baseNotes: ["Musk", "Sandalwood", "Amber"],
    sizes: [
      { size: "50ml", price: 89 },
      { size: "100ml", price: 149 }
    ],
    rating: 4.8,
    reviews: 124,
    featured: true
  },
  {
    id: 2,
    name: "Ocean Breeze",
    brand: "Azure",
    price: 75,
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
    images: [
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg"
    ],
    category: "men",
    fragranceFamily: "Aquatic",
    description: "Fresh and invigorating, like a cool ocean breeze on a summer morning.",
    topNotes: ["Sea Salt", "Lemon", "Mint"],
    middleNotes: ["Lavender", "Geranium", "Rosemary"],
    baseNotes: ["Cedarwood", "Vetiver", "Ambergris"],
    sizes: [
      { size: "50ml", price: 75 },
      { size: "100ml", price: 125 }
    ],
    rating: 4.6,
    reviews: 89,
    featured: true
  },
  {
    id: 3,
    name: "Golden Sunset",
    brand: "Solaire",
    price: 95,
    image: "https://images.pexels.com/photos/1961804/pexels-photo-1961804.jpeg",
    category: "unisex",
    fragranceFamily: "Oriental",
    description: "Warm and luxurious, capturing the golden hour's magical glow.",
    topNotes: ["Orange Blossom", "Cardamom", "Saffron"],
    middleNotes: ["Jasmine", "Rose", "Cinnamon"],
    baseNotes: ["Vanilla", "Sandalwood", "Oud"],
    sizes: [
      { size: "50ml", price: 95 },
      { size: "100ml", price: 165 }
    ],
    rating: 4.9,
    reviews: 156,
    featured: true
  },
  {
    id: 4,
    name: "Forest Whisper",
    brand: "Verdant",
    price: 68,
    image: "https://images.pexels.com/photos/1961804/pexels-photo-1961804.jpeg",
    category: "unisex",
    fragranceFamily: "Woody",
    description: "Deep and mysterious, like walking through an ancient forest.",
    topNotes: ["Pine", "Eucalyptus", "Green Leaves"],
    middleNotes: ["Cedar", "Fir", "Cypress"],
    baseNotes: ["Moss", "Patchouli", "Vetiver"],
    sizes: [
      { size: "50ml", price: 68 },
      { size: "100ml", price: 118 }
    ],
    rating: 4.4,
    reviews: 73
  },
  {
    id: 5,
    name: "Silk Elegance",
    brand: "Luxe",
    price: 110,
    image: "https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg",
    category: "women",
    fragranceFamily: "Floral",
    description: "Sophisticated and refined, like silk against the skin.",
    topNotes: ["Pear", "Lychee", "Freesia"],
    middleNotes: ["Peony", "Rose", "Lily of the Valley"],
    baseNotes: ["Musk", "Cedar", "Cashmere Wood"],
    sizes: [
      { size: "50ml", price: 110 },
      { size: "100ml", price: 180 }
    ],
    rating: 4.7,
    reviews: 92,
    featured: true
  },
  {
    id: 6,
    name: "Thunder Storm",
    brand: "Storm",
    price: 85,
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
    category: "men",
    fragranceFamily: "Woody",
    description: "Bold and powerful, capturing the intensity of a thunderstorm.",
    topNotes: ["Grapefruit", "Black Pepper", "Elemi"],
    middleNotes: ["Vetiver", "Patchouli", "Spices"],
    baseNotes: ["Cedar", "Labdanum", "Benzoin"],
    sizes: [
      { size: "50ml", price: 85 },
      { size: "100ml", price: 140 }
    ],
    rating: 4.5,
    reviews: 67
  }
];

export const fragranceFamilies = [
  "Floral",
  "Woody",
  "Oriental",
  "Fresh",
  "Aquatic",
  "Fruity",
  "Gourmand"
];

export const cities = [
  "Algiers", "Oran", "Constantine", "Annaba", "Blida", "Batna", "Djelfa",
  "Sétif", "Sidi Bel Abbès", "Biskra", "Tébessa", "El Oued", "Skikda",
  "Tiaret", "Béjaïa", "Tlemcen", "Ouargla", "Béchar", "Mostaganem"
];