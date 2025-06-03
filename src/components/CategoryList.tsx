
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CategoryListProps {
  categories: [string, { name: string; icon: string }][];
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryList = ({ categories, activeCategory, onCategorySelect }: CategoryListProps) => {
  return (
    <div className="h-full">
      <div className="px-6 py-3 bg-gray-100 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Categories</h4>
      </div>
      
      <ScrollArea className="h-full">
        <div className="px-2 py-2">
          {categories.map(([id, category]) => (
            <button
              key={id}
              onClick={() => onCategorySelect(id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 mb-1 ${
                activeCategory === id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="text-2xl flex-shrink-0">{category.icon}</div>
              <div className="text-left">
                <div className="font-medium">{category.name}</div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryList;
