import React from 'react';
import { useSearchStore } from '../store/searchStore';

const categories = [
  'All Products',
  'Tools',
  'Paints',
  'Building Materials',
  'Plumbing',
  'Electrical',
  'Flooring',
  'Hardware',
  'Glass & Mirrors',
];

export default function CategoryBar() {
  const { selectedCategory, setSelectedCategory } = useSearchStore();

  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
        <div className="flex space-x-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-navy-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}