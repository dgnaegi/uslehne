export type Category = 'Alle' | 'Werkzeug' | 'Baby' | 'Haushalt' | 'Garten' | 'Kinder'
export type OfferType = 'temporär' | 'permanent'

export interface Offer {
  id: number
  title: string
  category: Exclude<Category, 'Alle'>
  location: string
  emoji: string
  type: OfferType
}

export const CATEGORY_COLOR: Record<Exclude<Category, 'Alle'>, string> = {
  Werkzeug: '#FFE9A0',
  Baby:     '#FFB8D4',
  Haushalt: '#B8E1F9',
  Garten:   '#B8F0D4',
  Kinder:   '#D4B8F9',
}

export const OFFERS: Offer[] = [
  { id: 1,  title: 'Bohrmaschine',   category: 'Werkzeug', location: 'Zürich',     emoji: '🔧', type: 'temporär'  },
  { id: 2,  title: 'Kinderwagen',    category: 'Baby',     location: 'Bern',       emoji: '🍼', type: 'permanent' },
  { id: 3,  title: 'Hochstuhl',      category: 'Baby',     location: 'Basel',      emoji: '🪑', type: 'permanent' },
  { id: 4,  title: 'Rasenmäher',     category: 'Garten',   location: 'Zürich',     emoji: '🌱', type: 'temporär'  },
  { id: 5,  title: 'Stehleiter',     category: 'Werkzeug', location: 'Winterthur', emoji: '🪜', type: 'temporär'  },
  { id: 6,  title: 'Babywippe',      category: 'Baby',     location: 'Luzern',     emoji: '🍼', type: 'permanent' },
  { id: 7,  title: 'Laufrad',        category: 'Kinder',   location: 'Bern',       emoji: '🚲', type: 'permanent' },
  { id: 8,  title: 'Kaffeemaschine', category: 'Haushalt', location: 'Genf',       emoji: '☕', type: 'temporär'  },
  { id: 9,  title: 'Kreissäge',      category: 'Werkzeug', location: 'Zürich',     emoji: '🔩', type: 'temporär'  },
  { id: 10, title: 'Trampolin',      category: 'Kinder',   location: 'St. Gallen', emoji: '🎪', type: 'permanent' },
  { id: 11, title: 'Schaufel',       category: 'Garten',   location: 'Thun',       emoji: '🌿', type: 'temporär'  },
  { id: 12, title: 'Dampfreiniger',  category: 'Haushalt', location: 'Zürich',     emoji: '🧹', type: 'temporär'  },
]

export const CATEGORIES: Category[] = ['Alle', 'Werkzeug', 'Baby', 'Haushalt', 'Garten', 'Kinder']
