'use client';

import { Check, Plus, Info } from 'lucide-react';
import { Product, Category, PRODUCTS } from '@/types/workspace';
import { cn, formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (productId: string) => void;
}

function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
  return (
    <button
      onClick={() => onSelect(product.id)}
      className={cn(
        "group relative flex flex-col rounded-2xl border text-left transition-all duration-200 overflow-hidden",
        isSelected 
          ? "bg-stone-900 border-stone-900 ring-2 ring-stone-900 ring-offset-2" 
          : "bg-white border-stone-200 hover:border-stone-300 hover:shadow-lg hover:shadow-stone-200/50"
      )}
    >
      {product.image && (
        <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              isSelected && "opacity-80"
            )}
          />
          {isSelected && (
            <div className="absolute inset-0 bg-stone-900/20" />
          )}
        </div>
      )}

      <div className="flex flex-col flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <span className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider",
            isSelected ? "bg-stone-800 text-stone-300" : "bg-stone-100 text-stone-500"
          )}>
            {product.category}
          </span>
          {isSelected && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
               <Check className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </div>
        
        <h3 className={cn(
          "font-medium mb-1",
          isSelected ? "text-white" : "text-stone-900"
        )}>
          {product.name}
        </h3>
        
        <p className={cn(
          "text-xs mb-4 line-clamp-2 leading-relaxed",
          isSelected ? "text-stone-400" : "text-stone-500"
        )}>
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className={cn(
            "text-sm font-bold",
            isSelected ? "text-white" : "text-stone-900"
          )}>
            {formatCurrency(product.pricePerMonth)}
            <span className="text-[10px] font-normal opacity-60 ml-1">/mo</span>
          </span>
          {!isSelected && (
            <Plus className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
          )}
        </div>

        {product.badge && !isSelected && (
          <div className="absolute top-2 right-2 bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded shadow-sm font-bold uppercase border border-amber-200">
            {product.badge}
          </div>
        )}
      </div>
    </button>
  );
}

interface CategoryTabsProps {
  activeCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

const CATEGORIES: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'desk', label: 'Desks' },
  { id: 'chair', label: 'Chairs' },
  { id: 'monitor', label: 'Displays' },
  { id: 'lamp', label: 'Lighting' },
  { id: 'plant', label: 'Greens' },
  { id: 'accessory', label: 'Add-ons' },
];

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            activeCategory === cat.id
              ? "bg-stone-900 text-white"
              : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default function ProductSelector({ 
  selectedIds, 
  onSelectProduct 
}: { 
  selectedIds: string[], 
  onSelectProduct: (productId: string) => void 
}) {
  const [activeCategory, setActiveCategory] = React.useState<Category | 'all'>('all');

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col h-full">
      <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selectedIds.includes(product.id)}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
}

import React from 'react';
