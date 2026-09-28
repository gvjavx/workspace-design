export type Category = 'desk' | 'chair' | 'monitor' | 'lamp' | 'plant' | 'accessory';

export interface Product {
  id: string;
  name: string;
  category: Category;
  pricePerMonth: number;
  description: string;
  image?: string;
  badge?: string;
}

export interface WorkspaceConfig {
  deskId: string;
  chairId: string;
  monitorsCount: number;
  hasLamp: boolean;
  hasPlant: boolean;
  hasKeyboardMouse: boolean;
  hasCoffeeMachine: boolean;
}

export const PRODUCTS: Product[] = [
  // DESKS
  {
    id: 'desk-oak',
    name: 'Minimal Oak Desk',
    category: 'desk',
    pricePerMonth: 40,
    description: 'Solid teak wood with natural oak finish. Native Bali craft.',
    image: '/image/Meja-Kayu.jpg',
    badge: 'Popular',
  },
  {
    id: 'desk-exec',
    name: 'Executive Black Desk',
    category: 'desk',
    pricePerMonth: 60,
    description: 'Matte black anti-fingerprint surface with built-in cable channel.',
    image: '/image/Meja-Hitam.jpg',
  },

  // CHAIRS
  {
    id: 'chair-ergo',
    name: 'Ergonomic Office Chair',
    category: 'chair',
    pricePerMonth: 30,
    description: 'Breathable mesh back with lumbar support & adjustable armrests.',
    image: '/image/Kursi-Mesh.jpg',
    badge: 'Best Comfort',
  },
  {
    id: 'chair-lounge',
    name: 'Premium Leather Chair',
    category: 'chair',
    pricePerMonth: 50,
    description: 'Supple vegan leather cushion with executive swivel base.',
    image: '/image/Kursi-Kulit.jpg',
  },

  // MONITORS
  {
    id: 'monitor-4k',
    name: '27" 4K IPS Display',
    category: 'monitor',
    pricePerMonth: 25,
    description: 'USB-C hub with 90W power delivery. Ultra-thin bezel.',
    image: '/image/Monitor.jpg',
  },

  // LIGHTING
  {
    id: 'lamp-warm',
    name: 'LED Desk Light',
    category: 'lamp',
    pricePerMonth: 8,
    description: 'Adjustable color temp and brightness touch controls.',
    image: '/image/Lampu Meja.jpg',
  },

  // PLANTS
  {
    id: 'plant-monstera',
    name: 'Tropical Monstera Plant',
    category: 'plant',
    pricePerMonth: 6,
    description: 'Potted lush green Monstera in terracotta pot.',
    image: '/image/Tanaman.jpg',
  },

  // ACCESSORIES
  {
    id: 'acc-keyboard-mouse',
    name: 'Wireless Keyboard & Mouse',
    category: 'accessory',
    pricePerMonth: 12,
    description: 'Logitech MX Keys + Master 3S combo for maximum speed.',
    image: '/image/Aksesoris.jpg',
  },
  {
    id: 'acc-coffee',
    name: 'Espresso Maker',
    category: 'accessory',
    pricePerMonth: 15,
    description: 'Compact pod machine for immediate tropical energy boost.',
    image: '/image/Mesin Kopi.jpg',
  },
];

export const PRESET_SETUPS = [
  {
    id: 'dev-beast',
    name: 'Developer Beast',
    description: 'Dual monitors, ergo chair, solid oak desk, full power setup.',
    price: 118,
    config: {
      deskId: 'desk-oak',
      chairId: 'chair-ergo',
      monitorsCount: 2,
      hasLamp: true,
      hasPlant: true,
      hasKeyboardMouse: true,
      hasCoffeeMachine: true,
    },
  },
  {
    id: 'minimalist',
    name: 'Minimal Nomad',
    description: 'Clean oak desk with single display & plant for calm focus.',
    price: 71,
    config: {
      deskId: 'desk-oak',
      chairId: 'chair-ergo',
      monitorsCount: 1,
      hasLamp: false,
      hasPlant: true,
      hasKeyboardMouse: false,
      hasCoffeeMachine: false,
    },
  },
  {
    id: 'executive',
    name: 'Bali Executive',
    description: 'Black desk, leather chair, dual displays, full suite.',
    price: 156,
    config: {
      deskId: 'desk-exec',
      chairId: 'chair-lounge',
      monitorsCount: 2,
      hasLamp: true,
      hasPlant: true,
      hasKeyboardMouse: true,
      hasCoffeeMachine: true,
    },
  },
];
