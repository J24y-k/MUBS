const products = {
  'personal-care': [
    {
      id: 100, // Unique ID across all categories
      name: {
        en: "Customized Shampoo & Body Wash",
        fr: "Shampoing et Gel Douche Personnalisés"
      },
      description: {
        en: "A premium all-in-one shampoo and body wash, customizable with your brand’s logo, designed to refresh and elevate guest experiences in hotels.",
        fr: "Un shampoing et gel douche tout-en-un de qualité supérieure, personnalisable avec le logo de votre marque, conçu pour rafraîchir et rehausser l’expérience des clients dans les hôtels."
      },
      image: "/images/IMG_9627.jpg",
      alt: {
        en: "Customized hotel shampoo and body wash bottle",
        fr: "Flacon de shampoing et gel douche personnalisé pour hôtels"
      },
      minimumOrder: 50,
      type: "customizable",
      keywords: ["customized shampoo", "branded body wash", "hotel toiletries", "hospitality amenities"]
    },
    {
      id: 101,
      name: {
        en: "Customized Moisturizing Lotion",
        fr: "Lotion Hydratante Personnalisée"
      },
      description: {
        en: "A luxurious moisturizing body lotion, embossed with your brand’s logo, crafted to leave guests’ skin soft and pampered.",
        fr: "Une lotion corporelle hydratante luxueuse, ornée du logo de votre marque, conçue pour laisser la peau des clients douce et choyée."
      },
      image: "/images/IMG_9610.jpg",
      alt: {
        en: "Customized hotel moisturizing lotion bottle",
        fr: "Flacon de lotion hydratante personnalisée pour hôtels"
      },
      minimumOrder: 50,
      type: "customizable",
      keywords: ["customized lotion", "branded moisturizer", "hotel amenities", "hospitality toiletries"]
    }
  ],
  'grooming-essentials': [
    {
      id: 200,
      name: {
        en: "Customized Dental Kit",
        fr: "Kit Dentaire Personnalisé"
      },
      description: {
        en: "A complete dental care kit with a branded toothbrush and toothpaste, ensuring guest hygiene and satisfaction.",
        fr: "Un kit de soin dentaire complet avec une brosse à dents et un dentifrice de marque, garantissant l’hygiène et la satisfaction des clients."
      },
      image: "/images/Dental kit.jpg",
      alt: {
        en: "Customized hotel dental care kit",
        fr: "Kit de soin dentaire personnalisé pour hôtels"
      },
      minimumOrder: 50,
      type: "customizable",
      keywords: ["customized dental kit", "branded toothbrush", "hotel grooming", "hospitality essentials"]
    }
  ],
  'in-room-extras': [
    {
      id: 300,
      name: {
        en: "Premium  Tissues",
        fr: "Mouchoirs Premium"
      },
      description: {
        en: "Soft, high-quality facial tissues for guest convenience, available in bulk for in-room use.",
        fr: "Mouchoirs faciaux doux et de haute qualité pour le confort des clients, disponibles en gros pour une utilisation en chambre."
      },
      image: "/images/Greaseproof Paper.jpg",
      alt: {
        en: "Premium facial tissues for hotel rooms",
        fr: "Mouchoirs faciaux premium pour chambres d’hôtel"
      },
      minimumOrder: 50,
      type: "non-customizable",
      keywords: ["hotel tissues", "in-room amenities", "hospitality supplies", "guest convenience"]
    }
  ]
};