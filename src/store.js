import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const seasonalData = {
  'light-spring': {
    id: 'light-spring',
    name: 'Light Spring',
    season: 'Spring',
    undertone: 'warm',
    description: 'Light, warm, and clear. Your coloring is delicate with golden undertones and bright, sparkling eyes.',
    characteristics: [
      'Light hair (blonde, light brown with golden tones)',
      'Light to medium skin with warm, peachy undertones',
      'Bright, clear eyes (light blue, green, aqua, or light brown)',
      'Low contrast between hair, skin, and eyes'
    ],
    bestColors: [
      '#FFE4B5', // Peach
      '#FFB6C1', // Light Pink
      '#87CEEB', // Sky Blue
      '#F0E68C', // Khaki
      '#DDA0DD', // Plum
      '#98FB98', // Pale Green
      '#FFDAB9', // Peach Puff
      '#E6E6FA'  // Lavender
    ],
    avoidColors: [
      '#000000', // Black
      '#FFFFFF', // Pure White
      '#8B0000', // Dark Red
      '#4B0082'  // Indigo
    ],
    makeup: {
      lips: [
        { name: 'Peachy Nude', hex: '#FFDAB9', finish: 'cream' },
        { name: 'Coral Pink', hex: '#FF7F7F', finish: 'satin' },
        { name: 'Rose', hex: '#FFB6D9', finish: 'glossy' },
        { name: 'Warm Berry', hex: '#D8A0A6', finish: 'matte' }
      ],
      eyes: [
        { name: 'Champagne', hex: '#F7E7CE', finish: 'shimmer' },
        { name: 'Peach', hex: '#FFE5B4', finish: 'matte' },
        { name: 'Soft Brown', hex: '#C4A582', finish: 'satin' },
        { name: 'Aqua', hex: '#7FFFD4', finish: 'shimmer' },
        { name: 'Warm Taupe', hex: '#B38B6D', finish: 'matte' }
      ],
      cheeks: [
        { name: 'Peachy Glow', hex: '#FFDAB9', finish: 'cream' },
        { name: 'Coral Blush', hex: '#FF7F50', finish: 'powder' },
        { name: 'Rose Pink', hex: '#FFB6C1', finish: 'liquid' }
      ],
      highlights: [
        { name: 'Champagne Glow', hex: '#F7E7CE', finish: 'powder' },
        { name: 'Pearl', hex: '#FFF8DC', finish: 'liquid' }
      ],
      bronzer: [
        { name: 'Light Golden', hex: '#D4A574', finish: 'powder' },
        { name: 'Peachy Bronze', hex: '#E6B89C', finish: 'cream' }
      ],
      brows: [
        { name: 'Soft Blonde', hex: '#E7C697' },
        { name: 'Light Brown', hex: '#C4A582' }
      ]
    },
    celebrities: ['Blake Lively', 'Cameron Diaz', 'Gwyneth Paltrow', 'Taylor Swift'],
  },

  'warm-spring': {
    id: 'warm-spring',
    name: 'Warm Spring',
    season: 'Spring',
    undertone: 'warm',
    description: 'Warm, clear, and vibrant. You have strong golden undertones with bright, warm coloring.',
    characteristics: [
      'Warm golden blonde to auburn hair',
      'Ivory to warm beige skin with golden undertones',
      'Bright warm eyes (topaz, warm green, teal, or hazel)',
      'Medium contrast with warm, glowing appearance'
    ],
    bestColors: [
      '#FF7F50', // Coral
      '#FFD700', // Gold
      '#FF6347', // Tomato
      '#9ACD32', // Yellow Green
      '#FF8C00', // Dark Orange
      '#40E0D0', // Turquoise
      '#F4A460', // Sandy Brown
      '#FF69B4'  // Hot Pink
    ],
    avoidColors: [
      '#000000', // Black
      '#C0C0C0', // Silver
      '#4B0082', // Indigo
      '#8B008B'  // Dark Magenta
    ],
    makeup: {
      lips: [
        { name: 'Coral', hex: '#FF7F50', finish: 'cream' },
        { name: 'Warm Red', hex: '#FF4500', finish: 'matte' },
        { name: 'Peach', hex: '#FFDAB9', finish: 'glossy' },
        { name: 'Terracotta', hex: '#E27B58', finish: 'satin' }
      ],
      eyes: [
        { name: 'Gold', hex: '#FFD700', finish: 'shimmer' },
        { name: 'Warm Bronze', hex: '#CD7F32', finish: 'metallic' },
        { name: 'Copper', hex: '#B87333', finish: 'shimmer' },
        { name: 'Olive Green', hex: '#808000', finish: 'matte' },
        { name: 'Teal', hex: '#008080', finish: 'satin' }
      ],
      cheeks: [
        { name: 'Coral Glow', hex: '#FF7F50', finish: 'powder' },
        { name: 'Warm Apricot', hex: '#FBCEB1', finish: 'cream' },
        { name: 'Tangerine', hex: '#F28500', finish: 'liquid' }
      ],
      highlights: [
        { name: 'Golden Glow', hex: '#FFD700', finish: 'powder' },
        { name: 'Warm Bronze', hex: '#CD7F32', finish: 'cream' }
      ],
      bronzer: [
        { name: 'Warm Golden', hex: '#DAA520', finish: 'powder' },
        { name: 'Terracotta', hex: '#E2725B', finish: 'cream' }
      ],
      brows: [
        { name: 'Warm Brown', hex: '#8B4513' },
        { name: 'Auburn', hex: '#A52A2A' }
      ]
    },
    celebrities: ['Jessica Chastain', 'Amy Adams', 'Julianne Moore', 'Emma Stone'],
  },

  'clear-spring': {
    id: 'clear-spring',
    name: 'Clear Spring',
    season: 'Spring',
    undertone: 'warm',
    description: 'Clear, bright, and warm. Your coloring has high contrast with bright, jewel-like clarity.',
    characteristics: [
      'Medium to dark hair with warm tones',
      'Light to medium skin with warm undertones',
      'Bright, clear eyes (bright blue, green, or hazel with sparkle)',
      'High contrast between features with crystalline clarity'
    ],
    bestColors: [
      '#FF1493', // Deep Pink
      '#FF4500', // Orange Red
      '#00CED1', // Dark Turquoise
      '#32CD32', // Lime Green
      '#9400D3', // Dark Violet
      '#FF69B4', // Hot Pink
      '#1E90FF', // Dodger Blue
      '#FFD700'  // Gold
    ],
    avoidColors: [
      '#696969', // Dim Gray
      '#8B4513', // Saddle Brown
      '#2F4F4F', // Dark Slate Gray
      '#BC8F8F'  // Rosy Brown
    ],
    makeup: {
      lips: [
        { name: 'Bright Coral', hex: '#FF7F50', finish: 'glossy' },
        { name: 'True Red', hex: '#FF0000', finish: 'matte' },
        { name: 'Hot Pink', hex: '#FF69B4', finish: 'cream' },
        { name: 'Fuchsia', hex: '#FF00FF', finish: 'satin' }
      ],
      eyes: [
        { name: 'Bright Gold', hex: '#FFD700', finish: 'metallic' },
        { name: 'Emerald', hex: '#50C878', finish: 'shimmer' },
        { name: 'Sapphire', hex: '#0F52BA', finish: 'shimmer' },
        { name: 'Amethyst', hex: '#9966CC', finish: 'metallic' },
        { name: 'Clear Bronze', hex: '#CD7F32', finish: 'shimmer' }
      ],
      cheeks: [
        { name: 'Bright Coral', hex: '#FF6F61', finish: 'powder' },
        { name: 'Clear Pink', hex: '#FF1493', finish: 'cream' },
        { name: 'Warm Rose', hex: '#FF007F', finish: 'liquid' }
      ],
      highlights: [
        { name: 'Crystal Glow', hex: '#FFE4E1', finish: 'powder' },
        { name: 'Bright Gold', hex: '#FFD700', finish: 'liquid' }
      ],
      bronzer: [
        { name: 'Warm Bronze', hex: '#CD7F32', finish: 'powder' },
        { name: 'Golden Tan', hex: '#D2691E', finish: 'cream' }
      ],
      brows: [
        { name: 'Medium Brown', hex: '#8B4513' },
        { name: 'Dark Brown', hex: '#654321' }
      ]
    },
    celebrities: ['Keira Knightley', 'Mila Kunis', 'Courteney Cox', 'Penelope Cruz'],
  },

  'light-summer': {
    id: 'light-summer',
    name: 'Light Summer',
    season: 'Summer',
    undertone: 'cool',
    description: 'Light, cool, and soft. Your coloring is delicate with cool, ashy undertones and gentle contrast.',
    characteristics: [
      'Light ash blonde to light brown hair',
      'Light skin with cool, pink undertones',
      'Soft, cool eyes (gray-blue, gray-green, or soft blue)',
      'Low contrast with gentle, muted appearance'
    ],
    bestColors: [
      '#E6E6FA', // Lavender
      '#B0C4DE', // Light Steel Blue
      '#F0E68C', // Light Khaki
      '#DDA0DD', // Plum
      '#FFB6C1', // Light Pink
      '#87CEEB', // Sky Blue
      '#D8BFD8', // Thistle
      '#F5DEB3'  // Wheat
    ],
    avoidColors: [
      '#000000', // Black
      '#FF4500', // Orange Red
      '#FFD700', // Gold
      '#8B4513'  // Saddle Brown
    ],
    makeup: {
      lips: [
        { name: 'Soft Rose', hex: '#FFB6C1', finish: 'cream' },
        { name: 'Dusty Pink', hex: '#DCAE96', finish: 'matte' },
        { name: 'Mauve', hex: '#E0B0FF', finish: 'satin' },
        { name: 'Cool Berry', hex: '#D8A0D8', finish: 'glossy' }
      ],
      eyes: [
        { name: 'Soft Taupe', hex: '#B38B6D', finish: 'matte' },
        { name: 'Lavender', hex: '#E6E6FA', finish: 'shimmer' },
        { name: 'Slate', hex: '#708090', finish: 'satin' },
        { name: 'Soft Blue', hex: '#B0C4DE', finish: 'shimmer' },
        { name: 'Rose Gold', hex: '#B76E79', finish: 'metallic' }
      ],
      cheeks: [
        { name: 'Soft Pink', hex: '#FFB6C1', finish: 'powder' },
        { name: 'Cool Rose', hex: '#D8A0A6', finish: 'cream' },
        { name: 'Dusty Mauve', hex: '#E0B0D8', finish: 'liquid' }
      ],
      highlights: [
        { name: 'Pearl', hex: '#F0EAD6', finish: 'powder' },
        { name: 'Icy Pink', hex: '#FFE4E1', finish: 'liquid' }
      ],
      bronzer: [
        { name: 'Soft Tan', hex: '#D2B48C', finish: 'powder' },
        { name: 'Cool Bronze', hex: '#C19A6B', finish: 'cream' }
      ],
      brows: [
        { name: 'Ash Blonde', hex: '#B0A084' },
        { name: 'Soft Brown', hex: '#A89988' }
      ]
    },
    celebrities: ['Naomi Watts', 'Cate Blanchett', 'Michelle Pfeiffer', 'Scarlett Johansson'],
  },

  'cool-summer': {
    id: 'cool-summer',
    name: 'Cool Summer',
    season: 'Summer',
    undertone: 'cool',
    description: 'Cool, soft, and muted. You have cool undertones with soft, blended coloring.',
    characteristics: [
      'Ash brown to medium brown hair',
      'Light to medium skin with cool, pink undertones',
      'Soft, cool eyes (blue, gray, or soft hazel)',
      'Medium contrast with cool, elegant appearance'
    ],
    bestColors: [
      '#9370DB', // Medium Purple
      '#4682B4', // Steel Blue
      '#778899', // Light Slate Gray
      '#C71585', // Medium Violet Red
      '#BA55D3', // Medium Orchid
      '#5F9EA0', // Cadet Blue
      '#DDA0DD', // Plum
      '#B0C4DE'  // Light Steel Blue
    ],
    avoidColors: [
      '#FF4500', // Orange Red
      '#FFD700', // Gold
      '#8B4513', // Saddle Brown
      '#000000'  // Black
    ],
    makeup: {
      lips: [
        { name: 'Mauve', hex: '#E0B0FF', finish: 'matte' },
        { name: 'Rose', hex: '#C71585', finish: 'cream' },
        { name: 'Berry', hex: '#BA55D3', finish: 'satin' },
        { name: 'Cool Pink', hex: '#DDA0DD', finish: 'glossy' }
      ],
      eyes: [
        { name: 'Cool Taupe', hex: '#8B8680', finish: 'matte' },
        { name: 'Plum', hex: '#8E4585', finish: 'shimmer' },
        { name: 'Steel Blue', hex: '#4682B4', finish: 'satin' },
        { name: 'Soft Purple', hex: '#9370DB', finish: 'shimmer' },
        { name: 'Cool Gray', hex: '#778899', finish: 'matte' }
      ],
      cheeks: [
        { name: 'Cool Rose', hex: '#C71585', finish: 'powder' },
        { name: 'Mauve Pink', hex: '#DDA0DD', finish: 'cream' },
        { name: 'Dusty Plum', hex: '#BA55D3', finish: 'liquid' }
      ],
      highlights: [
        { name: 'Icy Lavender', hex: '#E6E6FA', finish: 'powder' },
        { name: 'Cool Pearl', hex: '#F0EAD6', finish: 'liquid' }
      ],
      bronzer: [
        { name: 'Cool Taupe', hex: '#A0826D', finish: 'powder' },
        { name: 'Rosewood', hex: '#A17A74', finish: 'cream' }
      ],
      brows: [
        { name: 'Ash Brown', hex: '#826B5D' },
        { name: 'Cool Brown', hex: '#6B5D52' }
      ]
    },
    celebrities: ['Emily Blunt', 'Anne Hathaway', 'Jennifer Aniston', 'Diane Kruger'],
  },

  'soft-summer': {
    id: 'soft-summer',
    name: 'Soft Summer',
    season: 'Summer',
    undertone: 'cool',
    description: 'Soft, muted, and cool. Your coloring is gentle and blended with low contrast.',
    characteristics: [
      'Medium ash brown to mousy brown hair',
      'Medium skin with neutral-cool undertones',
      'Soft, muted eyes (gray-blue, gray-green, or soft hazel)',
      'Low contrast with soft, harmonious blending'
    ],
    bestColors: [
      '#B0C4DE', // Light Steel Blue
      '#D8BFD8', // Thistle
      '#A9A9A9', // Dark Gray
      '#8FBC8F', // Dark Sea Green
      '#BC8F8F', // Rosy Brown
      '#778899', // Light Slate Gray
      '#C0C0C0', // Silver
      '#DDA0DD'  // Plum
    ],
    avoidColors: [
      '#000000', // Black
      '#FFFFFF', // Pure White
      '#FF4500', // Orange Red
      '#00FF00'  // Bright Green
    ],
    makeup: {
      lips: [
        { name: 'Soft Mauve', hex: '#D8BFD8', finish: 'matte' },
        { name: 'Dusty Rose', hex: '#BC8F8F', finish: 'cream' },
        { name: 'Muted Berry', hex: '#A17A8B', finish: 'satin' },
        { name: 'Soft Plum', hex: '#9B7B9E', finish: 'glossy' }
      ],
      eyes: [
        { name: 'Soft Gray', hex: '#778899', finish: 'matte' },
        { name: 'Muted Mauve', hex: '#CDA4DE', finish: 'satin' },
        { name: 'Sage Green', hex: '#9CAF88', finish: 'matte' },
        { name: 'Dusty Blue', hex: '#91A3B0', finish: 'shimmer' },
        { name: 'Soft Taupe', hex: '#9B8B7E', finish: 'matte' }
      ],
      cheeks: [
        { name: 'Dusty Rose', hex: '#C9A0A6', finish: 'powder' },
        { name: 'Soft Mauve', hex: '#D8BFD8', finish: 'cream' },
        { name: 'Muted Pink', hex: '#C9A0B4', finish: 'liquid' }
      ],
      highlights: [
        { name: 'Soft Pearl', hex: '#E8DDD2', finish: 'powder' },
        { name: 'Champagne', hex: '#F7E7CE', finish: 'liquid' }
      ],
      bronzer: [
        { name: 'Soft Bronze', hex: '#C1A381', finish: 'powder' },
        { name: 'Muted Tan', hex: '#B5A28C', finish: 'cream' }
      ],
      brows: [
        { name: 'Soft Brown', hex: '#8B7D6B' },
        { name: 'Taupe', hex: '#8B8680' }
      ]
    },
    celebrities: ['Sarah Jessica Parker', 'Kate Middleton', 'Emily Deschanel', 'Kirsten Dunst'],
  },

  'soft-autumn': {
    id: 'soft-autumn',
    name: 'Soft Autumn',
    season: 'Autumn',
    undertone: 'warm',
    description: 'Soft, muted, and warm. Your coloring is gentle with warm, earthy tones and low contrast.',
    characteristics: [
      'Soft brown to medium brown hair with golden tones',
      'Light to medium skin with warm undertones',
      'Soft, warm eyes (hazel, soft green, or warm brown)',
      'Low to medium contrast with muted, earthy appearance'
    ],
    bestColors: [
      '#D2B48C', // Tan
      '#BC8F8F', // Rosy Brown
      '#8FBC8F', // Dark Sea Green
      '#DAA520', // Goldenrod
      '#CD853F', // Peru
      '#A0826D', // Warm Taupe
      '#C19A6B', // Camel
      '#8B7355'  // Burlywood
    ],
    avoidColors: [
      '#000000', // Black
      '#FFFFFF', // Pure White
      '#FF1493', // Deep Pink
      '#0000FF'  // Bright Blue
    ],
    makeup: {
      lips: [
        { name: 'Warm Nude', hex: '#D2B48C', finish: 'matte' },
        { name: 'Terracotta', hex: '#E2725B', finish: 'cream' },
        { name: 'Warm Rose', hex: '#BC8F8F', finish: 'satin' },
        { name: 'Brick Red', hex: '#B22222', finish: 'matte' }
      ],
      eyes: [
        { name: 'Warm Taupe', hex: '#A0826D', finish: 'matte' },
        { name: 'Bronze', hex: '#CD7F32', finish: 'shimmer' },
        { name: 'Olive Green', hex: '#808000', finish: 'matte' },
        { name: 'Warm Brown', hex: '#8B4513', finish: 'satin' },
        { name: 'Soft Gold', hex: '#D4AF37', finish: 'shimmer' }
      ],
      cheeks: [
        { name: 'Warm Terracotta', hex: '#E2725B', finish: 'powder' },
        { name: 'Soft Peach', hex: '#FFDAB9', finish: 'cream' },
        { name: 'Warm Rose', hex: '#BC8F8F', finish: 'liquid' }
      ],
      highlights: [
        { name: 'Warm Gold', hex: '#FFD700', finish: 'powder' },
        { name: 'Bronze Glow', hex: '#CD7F32', finish: 'liquid' }
      ],
      bronzer: [
        { name: 'Warm Bronze', hex: '#A0826D', finish: 'powder' },
        { name: 'Golden Tan', hex: '#D2B48C', finish: 'cream' }
      ],
      brows: [
        { name: 'Warm Brown', hex: '#8B4513' },
        { name: 'Auburn', hex: '#A52A2A' }
      ]
    },
    celebrities: ['Drew Barrymore', 'Gisele Bündchen', 'Jennifer Lopez', 'Marcia Cross'],
  },

  'warm-autumn': {
    id: 'warm-autumn',
    name: 'Warm Autumn',
    season: 'Autumn',
    undertone: 'warm',
    description: 'Warm, rich, and golden. You have strong warm undertones with rich, earthy coloring.',
    characteristics: [
      'Golden brown to auburn to red hair',
      'Ivory to golden beige skin with warm undertones',
      'Warm eyes (warm brown, hazel, green, or topaz)',
      'Medium contrast with rich, golden glow'
    ],
    bestColors: [
      '#FF8C00', // Dark Orange
      '#DAA520', // Goldenrod
      '#CD853F', // Peru
      '#8B4513', // Saddle Brown
      '#D2691E', // Chocolate
      '#FF4500', // Orange Red
      '#556B2F', // Dark Olive Green
      '#B8860B'  // Dark Goldenrod
    ],
    avoidColors: [
      '#000000', // Black
      '#FF1493', // Deep Pink
      '#0000FF', // Bright Blue
      '#E0E0E0'  // Light Gray
    ],
    makeup: {
      lips: [
        { name: 'Terracotta', hex: '#E27B58', finish: 'matte' },
        { name: 'Warm Brick', hex: '#CB4154', finish: 'cream' },
        { name: 'Burnt Orange', hex: '#CC5500', finish: 'satin' },
        { name: 'Rust', hex: '#B7410E', finish: 'matte' }
      ],
      eyes: [
        { name: 'Copper', hex: '#B87333', finish: 'metallic' },
        { name: 'Bronze', hex: '#CD7F32', finish: 'shimmer' },
        { name: 'Olive', hex: '#808000', finish: 'matte' },
        { name: 'Warm Gold', hex: '#FFD700', finish: 'metallic' },
        { name: 'Rich Brown', hex: '#654321', finish: 'matte' }
      ],
      cheeks: [
        { name: 'Warm Terracotta', hex: '#E2725B', finish: 'powder' },
        { name: 'Burnt Coral', hex: '#FF6347', finish: 'cream' },
        { name: 'Warm Apricot', hex: '#FBCEB1', finish: 'liquid' }
      ],
      highlights: [
        { name: 'Golden Glow', hex: '#FFD700', finish: 'powder' },
        { name: 'Bronze Shimmer', hex: '#CD7F32', finish: 'liquid' }
      ],
      bronzer: [
        { name: 'Warm Bronze', hex: '#B87333', finish: 'powder' },
        { name: 'Golden Tan', hex: '#D2691E', finish: 'cream' }
      ],
      brows: [
        { name: 'Auburn', hex: '#A52A2A' },
        { name: 'Warm Brown', hex: '#8B4513' }
      ]
    },
    celebrities: ['Julia Roberts', 'Julianne Moore', 'Lindsay Lohan', 'Debra Messing'],
  },

  'deep-autumn': {
    id: 'deep-autumn',
    name: 'Deep Autumn',
    season: 'Autumn',
    undertone: 'warm',
    description: 'Deep, rich, and warm. Your coloring is intense with dark, warm features and high contrast.',
    characteristics: [
      'Dark brown to black hair with warm tones',
      'Medium to deep skin with warm, golden undertones',
      'Deep, warm eyes (dark brown, hazel, or deep green)',
      'High contrast with rich, luxurious depth'
    ],
    bestColors: [
      '#8B4513', // Saddle Brown
      '#A0522D', // Sienna
      '#800020', // Burgundy
      '#2F4F4F', // Dark Slate Gray
      '#556B2F', // Dark Olive Green
      '#8B0000', // Dark Red
      '#B8860B', // Dark Goldenrod
      '#4B0082'  // Indigo
    ],
    avoidColors: [
      '#FFB6C1', // Light Pink
      '#E6E6FA', // Lavender
      '#87CEEB', // Sky Blue
      '#F0E68C'  // Light Khaki
    ],
    makeup: {
      lips: [
        { name: 'Deep Burgundy', hex: '#800020', finish: 'matte' },
        { name: 'Rich Brick', hex: '#B22222', finish: 'cream' },
        { name: 'Chocolate', hex: '#7B3F00', finish: 'satin' },
        { name: 'Deep Rust', hex: '#B7410E', finish: 'matte' }
      ],
      eyes: [
        { name: 'Deep Bronze', hex: '#8B4513', finish: 'shimmer' },
        { name: 'Rich Gold', hex: '#B8860B', finish: 'metallic' },
        { name: 'Deep Olive', hex: '#556B2F', finish: 'matte' },
        { name: 'Espresso', hex: '#4B3621', finish: 'matte' },
        { name: 'Burgundy', hex: '#800020', finish: 'shimmer' }
      ],
      cheeks: [
        { name: 'Deep Terracotta', hex: '#CD5C5C', finish: 'powder' },
        { name: 'Warm Berry', hex: '#A0522D', finish: 'cream' },
        { name: 'Rich Bronze', hex: '#8B4513', finish: 'liquid' }
      ],
      highlights: [
        { name: 'Bronze Glow', hex: '#CD7F32', finish: 'powder' },
        { name: 'Golden Shimmer', hex: '#DAA520', finish: 'liquid' }
      ],
      bronzer: [
        { name: 'Deep Bronze', hex: '#8B4513', finish: 'powder' },
        { name: 'Rich Chocolate', hex: '#7B3F00', finish: 'cream' }
      ],
      brows: [
        { name: 'Dark Brown', hex: '#654321' },
        { name: 'Espresso', hex: '#4B3621' }
      ]
    },
    celebrities: ['Eva Mendes', 'Kim Kardashian', 'Mindy Kaling', 'Halle Berry'],
  },

  'deep-winter': {
    id: 'deep-winter',
    name: 'Deep Winter',
    season: 'Winter',
    undertone: 'cool',
    description: 'Deep, cool, and clear. Your coloring is dramatic with cool undertones and high contrast.',
    characteristics: [
      'Dark brown to black hair',
      'Light to deep skin with cool undertones',
      'Deep, cool eyes (dark brown, black, or deep blue)',
      'High contrast with striking, cool appearance'
    ],
    bestColors: [
      '#000000', // Black
      '#FFFFFF', // Pure White
      '#8B0000', // Dark Red
      '#191970', // Midnight Blue
      '#4B0082', // Indigo
      '#800080', // Purple
      '#DC143C', // Crimson
      '#00008B'  // Dark Blue
    ],
    avoidColors: [
      '#FFD700', // Gold
      '#FF8C00', // Dark Orange
      '#F0E68C', // Light Khaki
      '#8B4513'  // Saddle Brown
    ],
    makeup: {
      lips: [
        { name: 'Deep Red', hex: '#8B0000', finish: 'matte' },
        { name: 'Cool Berry', hex: '#800080', finish: 'cream' },
        { name: 'Wine', hex: '#722F37', finish: 'satin' },
        { name: 'Plum', hex: '#8E4585', finish: 'glossy' }
      ],
      eyes: [
        { name: 'Charcoal', hex: '#36454F', finish: 'matte' },
        { name: 'Deep Purple', hex: '#4B0082', finish: 'shimmer' },
        { name: 'Navy', hex: '#000080', finish: 'satin' },
        { name: 'Silver', hex: '#C0C0C0', finish: 'metallic' },
        { name: 'Black', hex: '#000000', finish: 'matte' }
      ],
      cheeks: [
        { name: 'Cool Berry', hex: '#8E4585', finish: 'powder' },
        { name: 'Deep Rose', hex: '#C71585', finish: 'cream' },
        { name: 'Cool Plum', hex: '#800080', finish: 'liquid' }
      ],
      highlights: [
        { name: 'Icy Silver', hex: '#C0C0C0', finish: 'powder' },
        { name: 'Cool Pearl', hex: '#F0EAD6', finish: 'liquid' }
      ],
      bronzer: [
        { name: 'Cool Bronze', hex: '#826B5D', finish: 'powder' },
        { name: 'Cool Taupe', hex: '#6B5D52', finish: 'cream' }
      ],
      brows: [
        { name: 'Dark Brown', hex: '#3B2F2F' },
        { name: 'Black', hex: '#000000' }
      ]
    },
    celebrities: ['Megan Fox', 'Demi Moore', 'Lucy Liu', 'Zooey Deschanel'],
  },

  'cool-winter': {
    id: 'cool-winter',
    name: 'Cool Winter',
    season: 'Winter',
    undertone: 'cool',
    description: 'Cool, clear, and icy. You have strong cool undertones with bright, clear coloring.',
    characteristics: [
      'Medium to dark brown or black hair with cool tones',
      'Light to medium skin with cool, pink undertones',
      'Cool, bright eyes (cool blue, violet, or cool brown)',
      'High contrast with icy, regal appearance'
    ],
    bestColors: [
      '#FF1493', // Deep Pink
      '#4169E1', // Royal Blue
      '#9400D3', // Dark Violet
      '#DC143C', // Crimson
      '#00CED1', // Dark Turquoise
      '#C71585', // Medium Violet Red
      '#191970', // Midnight Blue
      '#FF00FF'  // Magenta
    ],
    avoidColors: [
      '#FFD700', // Gold
      '#FF8C00', // Dark Orange
      '#F0E68C', // Light Khaki
      '#A0522D'  // Sienna
    ],
    makeup: {
      lips: [
        { name: 'Cool Red', hex: '#DC143C', finish: 'matte' },
        { name: 'Magenta', hex: '#FF00FF', finish: 'cream' },
        { name: 'Cool Berry', hex: '#C71585', finish: 'satin' },
        { name: 'Deep Pink', hex: '#FF1493', finish: 'glossy' }
      ],
      eyes: [
        { name: 'Icy Blue', hex: '#87CEEB', finish: 'shimmer' },
        { name: 'Cool Purple', hex: '#9400D3', finish: 'shimmer' },
        { name: 'Silver', hex: '#C0C0C0', finish: 'metallic' },
        { name: 'Cool Gray', hex: '#708090', finish: 'matte' },
        { name: 'Navy', hex: '#000080', finish: 'satin' }
      ],
      cheeks: [
        { name: 'Cool Pink', hex: '#FF69B4', finish: 'powder' },
        { name: 'Berry', hex: '#C71585', finish: 'cream' },
        { name: 'Cool Rose', hex: '#FF1493', finish: 'liquid' }
      ],
      highlights: [
        { name: 'Icy Silver', hex: '#E8E8E8', finish: 'powder' },
        { name: 'Cool Pearl', hex: '#F0EAD6', finish: 'liquid' }
      ],
      bronzer: [
        { name: 'Cool Taupe', hex: '#8B8680', finish: 'powder' },
        { name: 'Cool Bronze', hex: '#826B5D', finish: 'cream' }
      ],
      brows: [
        { name: 'Cool Brown', hex: '#5C4033' },
        { name: 'Charcoal', hex: '#36454F' }
      ]
    },
    celebrities: ['Elizabeth Taylor', 'Liv Tyler', 'Courteney Cox', 'Sandra Bullock'],
  },

  'clear-winter': {
    id: 'clear-winter',
    name: 'Clear Winter',
    season: 'Winter',
    undertone: 'cool',
    description: 'Clear, bright, and cool. Your coloring has high contrast with brilliant, jewel-like clarity.',
    characteristics: [
      'Medium to dark hair with cool tones',
      'Light to medium skin with cool undertones',
      'Bright, clear eyes (bright blue, violet, or bright green)',
      'Very high contrast with crystalline brightness'
    ],
    bestColors: [
      '#FF1493', // Deep Pink
      '#0000FF', // Bright Blue
      '#00FF00', // Bright Green
      '#FF00FF', // Magenta
      '#FFFF00', // Yellow
      '#00FFFF', // Cyan
      '#FF0000', // Pure Red
      '#9400D3'  // Dark Violet
    ],
    avoidColors: [
      '#A0522D', // Sienna
      '#8B4513', // Saddle Brown
      '#D2B48C', // Tan
      '#BC8F8F'  // Rosy Brown
    ],
    makeup: {
      lips: [
        { name: 'True Red', hex: '#FF0000', finish: 'matte' },
        { name: 'Bright Pink', hex: '#FF1493', finish: 'cream' },
        { name: 'Fuchsia', hex: '#FF00FF', finish: 'glossy' },
        { name: 'Berry', hex: '#C71585', finish: 'satin' }
      ],
      eyes: [
        { name: 'Bright Silver', hex: '#C0C0C0', finish: 'metallic' },
        { name: 'Electric Blue', hex: '#7DF9FF', finish: 'shimmer' },
        { name: 'Violet', hex: '#8F00FF', finish: 'shimmer' },
        { name: 'Emerald', hex: '#50C878', finish: 'metallic' },
        { name: 'Bright White', hex: '#FFFFFF', finish: 'shimmer' }
      ],
      cheeks: [
        { name: 'Bright Pink', hex: '#FF1493', finish: 'powder' },
        { name: 'Clear Fuchsia', hex: '#FF00FF', finish: 'cream' },
        { name: 'Cool Berry', hex: '#C71585', finish: 'liquid' }
      ],
      highlights: [
        { name: 'Bright Silver', hex: '#E8E8E8', finish: 'powder' },
        { name: 'Diamond Glow', hex: '#FFFFFF', finish: 'liquid' }
      ],
      bronzer: [
        { name: 'Cool Taupe', hex: '#8B8680', finish: 'powder' },
        { name: 'Cool Bronze', hex: '#826B5D', finish: 'cream' }
      ],
      brows: [
        { name: 'Cool Dark Brown', hex: '#4A4238' },
        { name: 'Black Brown', hex: '#2B1B17' }
      ]
    },
    celebrities: ['Alexis Bledel', 'Anne Hathaway', 'Megan Fox', 'Kristin Davis'],
  },
}

const useStore = create(
  persist(
    (set, get) => ({
      // User state
      currentSeason: null,
      userPhoto: null,
      savedLooks: [],

      // Freemium model
      tryOnCount: 0,
      isPremium: false,
      maxFreeTryOns: 5,

      // Actions
      setCurrentSeason: (seasonId) => set({ currentSeason: seasonId }),

      setUserPhoto: (photo) => set({ userPhoto: photo }),

      incrementTryOnCount: () => {
        const current = get().tryOnCount
        set({ tryOnCount: current + 1 })
        return current + 1
      },

      canTryOn: () => {
        const { tryOnCount, isPremium, maxFreeTryOns } = get()
        return isPremium || tryOnCount < maxFreeTryOns
      },

      getRemainingTryOns: () => {
        const { tryOnCount, isPremium, maxFreeTryOns } = get()
        if (isPremium) return Infinity
        return Math.max(0, maxFreeTryOns - tryOnCount)
      },

      upgradeToPremium: () => set({ isPremium: true }),

      saveLook: (look) => {
        const looks = get().savedLooks
        set({ savedLooks: [...looks, { ...look, id: Date.now() }] })
      },

      deleteLook: (lookId) => {
        const looks = get().savedLooks
        set({ savedLooks: looks.filter(l => l.id !== lookId) })
      },

      getCurrentSeasonData: () => {
        const seasonId = get().currentSeason
        return seasonId ? seasonalData[seasonId] : null
      },

      getAllSeasons: () => Object.values(seasonalData),

      getSeasonById: (id) => seasonalData[id],
    }),
    {
      name: 'glowmatch-storage',
    }
  )
)

export default useStore
