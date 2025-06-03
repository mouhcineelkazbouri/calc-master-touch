
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CategoryList from './CategoryList';
import { unitCategories, convertUnits } from '../utils/unitConversions';

const UnitConverter = () => {
  const [activeCategory, setActiveCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('3.28084');

  const currentCategory = unitCategories[activeCategory];

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    if (value && !isNaN(Number(value))) {
      const converted = convertUnits(Number(value), fromUnit, toUnit, activeCategory);
      setToValue(converted.toString());
    } else {
      setToValue('');
    }
  };

  const handleToValueChange = (value: string) => {
    setToValue(value);
    if (value && !isNaN(Number(value))) {
      const converted = convertUnits(Number(value), toUnit, fromUnit, activeCategory);
      setFromValue(converted.toString());
    } else {
      setFromValue('');
    }
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
    if (fromValue && !isNaN(Number(fromValue))) {
      const converted = convertUnits(Number(fromValue), unit, toUnit, activeCategory);
      setToValue(converted.toString());
    }
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
    if (fromValue && !isNaN(Number(fromValue))) {
      const converted = convertUnits(Number(fromValue), fromUnit, unit, activeCategory);
      setToValue(converted.toString());
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    const category = unitCategories[categoryId];
    const units = Object.keys(category.units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setFromValue('1');
    if (units[1]) {
      const converted = convertUnits(1, units[0], units[1], categoryId);
      setToValue(converted.toString());
    } else {
      setToValue('1');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Unit Converter</h2>
        
        {/* Category Dropdown */}
        <div className="w-full">
          <Select value={activeCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:border-blue-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              {Object.entries(unitCategories).map(([id, category]) => (
                <SelectItem key={id} value={id} className="hover:bg-gray-100">
                  <div className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Current Category */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="text-center">
          <div className="text-2xl mb-2">{currentCategory.icon}</div>
          <h3 className="text-lg font-medium text-gray-700">{currentCategory.name}</h3>
        </div>
      </div>

      {/* Conversion Section */}
      <div className="bg-white px-6 py-6 border-b border-gray-200">
        <div className="space-y-4">
          {/* From Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">From</label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="number"
                  value={fromValue}
                  onChange={(e) => handleFromValueChange(e.target.value)}
                  className="text-lg font-medium"
                  placeholder="Enter value"
                />
              </div>
              <div className="w-32">
                <Select value={fromUnit} onValueChange={handleFromUnitChange}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    {Object.entries(currentCategory.units).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* To Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">To</label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="number"
                  value={toValue}
                  onChange={(e) => handleToValueChange(e.target.value)}
                  className="text-lg font-medium bg-blue-50 border-blue-200"
                  placeholder="Result"
                />
              </div>
              <div className="w-32">
                <Select value={toUnit} onValueChange={handleToUnitChange}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    {Object.entries(currentCategory.units).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="flex-1 overflow-hidden">
        <CategoryList
          categories={Object.entries(unitCategories)}
          activeCategory={activeCategory}
          onCategorySelect={handleCategoryChange}
        />
      </div>
    </div>
  );
};

export default UnitConverter;
