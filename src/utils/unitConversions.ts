
interface Unit {
  name: string;
  factor: number;
}

interface Category {
  name: string;
  icon: string;
  units: Record<string, Unit>;
}

export const unitCategories: Record<string, Category> = {
  length: {
    name: 'Length',
    icon: '📏',
    units: {
      meter: { name: 'Meter', factor: 1 },
      kilometer: { name: 'Kilometer', factor: 1000 },
      centimeter: { name: 'Centimeter', factor: 0.01 },
      millimeter: { name: 'Millimeter', factor: 0.001 },
      foot: { name: 'Foot', factor: 0.3048 },
      inch: { name: 'Inch', factor: 0.0254 },
      yard: { name: 'Yard', factor: 0.9144 },
      mile: { name: 'Mile', factor: 1609.34 },
    },
  },
  weight: {
    name: 'Weight',
    icon: '⚖️',
    units: {
      kilogram: { name: 'Kilogram', factor: 1 },
      gram: { name: 'Gram', factor: 0.001 },
      pound: { name: 'Pound', factor: 0.453592 },
      ounce: { name: 'Ounce', factor: 0.0283495 },
      ton: { name: 'Ton', factor: 1000 },
      stone: { name: 'Stone', factor: 6.35029 },
    },
  },
  temperature: {
    name: 'Temperature',
    icon: '🌡️',
    units: {
      celsius: { name: 'Celsius', factor: 1 },
      fahrenheit: { name: 'Fahrenheit', factor: 1 },
      kelvin: { name: 'Kelvin', factor: 1 },
    },
  },
  volume: {
    name: 'Volume',
    icon: '🥤',
    units: {
      liter: { name: 'Liter', factor: 1 },
      milliliter: { name: 'Milliliter', factor: 0.001 },
      gallon: { name: 'Gallon (US)', factor: 3.78541 },
      quart: { name: 'Quart', factor: 0.946353 },
      pint: { name: 'Pint', factor: 0.473176 },
      cup: { name: 'Cup', factor: 0.236588 },
      fluid_ounce: { name: 'Fluid Ounce', factor: 0.0295735 },
    },
  },
  area: {
    name: 'Area',
    icon: '📐',
    units: {
      square_meter: { name: 'Square Meter', factor: 1 },
      square_kilometer: { name: 'Square Kilometer', factor: 1000000 },
      square_foot: { name: 'Square Foot', factor: 0.092903 },
      square_inch: { name: 'Square Inch', factor: 0.00064516 },
      acre: { name: 'Acre', factor: 4046.86 },
      hectare: { name: 'Hectare', factor: 10000 },
    },
  },
  speed: {
    name: 'Speed',
    icon: '🚗',
    units: {
      meter_per_second: { name: 'Meter/Second', factor: 1 },
      kilometer_per_hour: { name: 'Kilometer/Hour', factor: 0.277778 },
      mile_per_hour: { name: 'Mile/Hour', factor: 0.44704 },
      foot_per_second: { name: 'Foot/Second', factor: 0.3048 },
      knot: { name: 'Knot', factor: 0.514444 },
    },
  },
  time: {
    name: 'Time',
    icon: '⏰',
    units: {
      second: { name: 'Second', factor: 1 },
      minute: { name: 'Minute', factor: 60 },
      hour: { name: 'Hour', factor: 3600 },
      day: { name: 'Day', factor: 86400 },
      week: { name: 'Week', factor: 604800 },
      month: { name: 'Month', factor: 2629746 },
      year: { name: 'Year', factor: 31556952 },
    },
  },
};

export const convertUnits = (value: number, fromUnit: string, toUnit: string, category: string): number => {
  const categoryData = unitCategories[category];
  
  if (!categoryData) return value;

  // Special handling for temperature
  if (category === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }

  const fromUnitData = categoryData.units[fromUnit];
  const toUnitData = categoryData.units[toUnit];
  
  if (!fromUnitData || !toUnitData) return value;

  const fromFactor = fromUnitData.factor;
  const toFactor = toUnitData.factor;

  // Convert to base unit first, then to target unit
  const baseValue = value * fromFactor;
  const result = baseValue / toFactor;

  return Number(result.toPrecision(10));
};

const convertTemperature = (value: number, fromUnit: string, toUnit: string): number => {
  let celsius = value;

  // Convert from source to Celsius
  if (fromUnit === 'fahrenheit') {
    celsius = (value - 32) * 5/9;
  } else if (fromUnit === 'kelvin') {
    celsius = value - 273.15;
  }

  // Convert from Celsius to target
  if (toUnit === 'fahrenheit') {
    return celsius * 9/5 + 32;
  } else if (toUnit === 'kelvin') {
    return celsius + 273.15;
  }

  return celsius;
};
