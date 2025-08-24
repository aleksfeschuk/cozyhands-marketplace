import type { Product } from "../types/index";

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Handwoven Wool Scarf",
    price: 29.99,
    category: "Accessories",
    description: "Warm and cozy scarf crafted from natural wool.",
    imageUrl: "/assets/scarf.jpg",
    featured: true, 
    discount: 0.2,
  },
  {
    id: "2",
    title: "Eco-Friendly Tote Bag",
    price: 19.99,
    category: "Accessories",
    description: "Stylish tote bag made from recycled cotton.",
    imageUrl: "/assets/tote-bag.jpg",
  },
  {
    id: "3",
    title: "Knitted Cotton Sweater",
    price: 49.99,
    category: "Clothing",
    description: "Soft sweater perfect for cool evenings.",
    imageUrl: "/assets/sweater.jpg",
    featured: true,
  },
  {
    id: "4",
    title: "Soy Wax Candle",
    price: 14.99,
    category: "Candles",
    description: "Hand-poured soy wax candle with a soothing lavender scent.",
    imageUrl: "/assets/candle.jpg",
    discount: 0.15, 
  },
  
  {
    id: "5",
    title: "Handmade Leather Bracelet",
    price: 24.99,
    category: "Accessories",
    description: "Elegant bracelet crafted from genuine leather.",
    imageUrl: "/assets/bracelet.jpg",
  },

  {
    id: "6",
    title: "Canvas Tote Bag",
    price: 22.99,
    category: "Bags",
    description: "Durable canvas tote bag with stylish design.",
    imageUrl: "/assets/tote-bag-canvas.jpg",
    featured: true,
  },
];
