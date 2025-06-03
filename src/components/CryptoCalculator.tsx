
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

const CryptoCalculator = () => {
  const [fromCurrency, setFromCurrency] = useState('bitcoin');
  const [toCurrency, setToCurrency] = useState('usd');
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('0');
  const [cryptoPrices, setCryptoPrices] = useState<Record<string, CryptoPrice>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const currencies = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', type: 'crypto' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', type: 'crypto' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', type: 'crypto' },
    { id: 'solana', symbol: 'SOL', name: 'Solana', type: 'crypto' },
    { id: 'usd', symbol: 'USD', name: 'US Dollar', type: 'fiat' },
    { id: 'eur', symbol: 'EUR', name: 'Euro', type: 'fiat' },
    { id: 'gbp', symbol: 'GBP', name: 'British Pound', type: 'fiat' },
  ];

  const cryptoIds = currencies.filter(c => c.type === 'crypto').map(c => c.id);

  useEffect(() => {
    fetchCryptoPrices();
  }, []);

  useEffect(() => {
    calculateConversion();
  }, [fromCurrency, toCurrency, fromAmount, cryptoPrices]);

  const fetchCryptoPrices = async () => {
    setIsLoading(true);
    try {
      // Simulated API call - in a real app, you'd use the CoinGecko API
      const mockPrices = {
        bitcoin: {
          id: 'bitcoin',
          symbol: 'btc',
          name: 'Bitcoin',
          current_price: 45000,
          price_change_percentage_24h: 2.5,
          sparkline_in_7d: { price: [44000, 44500, 45200, 44800, 45000, 45300, 45000] }
        },
        ethereum: {
          id: 'ethereum',
          symbol: 'eth',
          name: 'Ethereum',
          current_price: 2800,
          price_change_percentage_24h: -1.2,
          sparkline_in_7d: { price: [2850, 2820, 2790, 2810, 2800, 2780, 2800] }
        },
        cardano: {
          id: 'cardano',
          symbol: 'ada',
          name: 'Cardano',
          current_price: 0.45,
          price_change_percentage_24h: 3.8,
          sparkline_in_7d: { price: [0.42, 0.43, 0.44, 0.45, 0.46, 0.44, 0.45] }
        },
        solana: {
          id: 'solana',
          symbol: 'sol',
          name: 'Solana',
          current_price: 65,
          price_change_percentage_24h: -0.8,
          sparkline_in_7d: { price: [67, 66, 65, 64, 65, 66, 65] }
        }
      };
      setCryptoPrices(mockPrices);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateConversion = () => {
    if (!fromAmount || fromAmount === '0') {
      setToAmount('0');
      return;
    }

    const amount = parseFloat(fromAmount);
    let result = 0;

    if (fromCurrency === toCurrency) {
      result = amount;
    } else if (currencies.find(c => c.id === fromCurrency)?.type === 'crypto' && 
               currencies.find(c => c.id === toCurrency)?.type === 'fiat') {
      // Crypto to fiat
      const cryptoPrice = cryptoPrices[fromCurrency]?.current_price || 0;
      result = amount * cryptoPrice;
    } else if (currencies.find(c => c.id === fromCurrency)?.type === 'fiat' && 
               currencies.find(c => c.id === toCurrency)?.type === 'crypto') {
      // Fiat to crypto
      const cryptoPrice = cryptoPrices[toCurrency]?.current_price || 1;
      result = amount / cryptoPrice;
    } else if (currencies.find(c => c.id === fromCurrency)?.type === 'crypto' && 
               currencies.find(c => c.id === toCurrency)?.type === 'crypto') {
      // Crypto to crypto
      const fromPrice = cryptoPrices[fromCurrency]?.current_price || 0;
      const toPrice = cryptoPrices[toCurrency]?.current_price || 1;
      result = (amount * fromPrice) / toPrice;
    } else {
      // Fiat to fiat (simplified - in reality you'd need exchange rates)
      result = amount;
    }

    setToAmount(result.toFixed(6));
  };

  const Sparkline = ({ data, isPositive }: { data: number[], isPositive: boolean }) => {
    const width = 60;
    const height = 20;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="inline-block">
        <polyline
          points={points}
          fill="none"
          stroke={isPositive ? "#10b981" : "#ef4444"}
          strokeWidth="1.5"
        />
      </svg>
    );
  };

  const getCurrentPrice = (currencyId: string) => {
    return cryptoPrices[currencyId];
  };

  const formatCurrency = (id: string) => {
    const currency = currencies.find(c => c.id === id);
    return currency ? `${currency.symbol} - ${currency.name}` : id;
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Crypto Calculator</h2>
        
        {/* Conversion Cards */}
        <div className="space-y-4 mb-6">
          {/* From Currency */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <label className="text-sm font-medium text-gray-600 mb-2 block">From</label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.id} value={currency.id}>
                        {formatCurrency(currency.id)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="text-right font-semibold"
                />
              </div>
            </div>
            {getCurrentPrice(fromCurrency) && (
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>${getCurrentPrice(fromCurrency).current_price.toLocaleString()}</span>
                <div className="flex items-center gap-1">
                  {getCurrentPrice(fromCurrency).price_change_percentage_24h > 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  <span className={getCurrentPrice(fromCurrency).price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>
                    {getCurrentPrice(fromCurrency).price_change_percentage_24h.toFixed(2)}%
                  </span>
                  {getCurrentPrice(fromCurrency).sparkline_in_7d && (
                    <Sparkline 
                      data={getCurrentPrice(fromCurrency).sparkline_in_7d!.price} 
                      isPositive={getCurrentPrice(fromCurrency).price_change_percentage_24h > 0}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                const temp = fromCurrency;
                setFromCurrency(toCurrency);
                setToCurrency(temp);
                setFromAmount(toAmount);
              }}
              className="p-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* To Currency */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <label className="text-sm font-medium text-gray-600 mb-2 block">To</label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.id} value={currency.id}>
                        {formatCurrency(currency.id)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  value={toAmount}
                  readOnly
                  className="text-right font-bold text-green-600 bg-white"
                />
              </div>
            </div>
            {getCurrentPrice(toCurrency) && (
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>${getCurrentPrice(toCurrency).current_price.toLocaleString()}</span>
                <div className="flex items-center gap-1">
                  {getCurrentPrice(toCurrency).price_change_percentage_24h > 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  <span className={getCurrentPrice(toCurrency).price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>
                    {getCurrentPrice(toCurrency).price_change_percentage_24h.toFixed(2)}%
                  </span>
                  {getCurrentPrice(toCurrency).sparkline_in_7d && (
                    <Sparkline 
                      data={getCurrentPrice(toCurrency).sparkline_in_7d!.price} 
                      isPositive={getCurrentPrice(toCurrency).price_change_percentage_24h > 0}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchCryptoPrices}
          disabled={isLoading}
          className="w-full bg-gray-900 text-white py-3 rounded-2xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 mb-4"
        >
          {isLoading ? 'Updating...' : 'Refresh Rates'}
        </button>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>Last updated: {lastUpdate.toLocaleTimeString()}</p>
          <p className="mt-1">Powered by CoinGecko</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoCalculator;
