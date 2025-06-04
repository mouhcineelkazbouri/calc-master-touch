
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useCryptoQuotes } from '@/hooks/useCryptoData';
import CryptoLoadingState from './CryptoLoadingState';
import CryptoErrorState from './CryptoErrorState';
import { toast } from 'sonner';

const CryptoCalculator = () => {
  const [fromCurrency, setFromCurrency] = useState('bitcoin');
  const [toCurrency, setToCurrency] = useState('usd');
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('0');

  const currencies = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', type: 'crypto' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', type: 'crypto' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', type: 'crypto' },
    { id: 'solana', symbol: 'SOL', name: 'Solana', type: 'crypto' },
    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', type: 'crypto' },
    { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', type: 'crypto' },
    { id: 'avalanche', symbol: 'AVAX', name: 'Avalanche', type: 'crypto' },
    { id: 'polygon', symbol: 'MATIC', name: 'Polygon', type: 'crypto' },
    { id: 'usd', symbol: 'USD', name: 'US Dollar', type: 'fiat' },
    { id: 'eur', symbol: 'EUR', name: 'Euro', type: 'fiat' },
    { id: 'gbp', symbol: 'GBP', name: 'British Pound', type: 'fiat' },
  ];

  const cryptoSymbols = currencies.filter(c => c.type === 'crypto').map(c => c.symbol);
  
  const { 
    data: cryptoPrices, 
    isLoading, 
    error, 
    refetch,
    dataUpdatedAt 
  } = useCryptoQuotes(cryptoSymbols, 'USD');

  useEffect(() => {
    calculateConversion();
  }, [fromCurrency, toCurrency, fromAmount, cryptoPrices]);

  const calculateConversion = () => {
    if (!fromAmount || fromAmount === '0') {
      setToAmount('0');
      return;
    }

    const amount = parseFloat(fromAmount);
    let result = 0;

    if (fromCurrency === toCurrency) {
      result = amount;
    } else {
      const fromCrypto = cryptoPrices?.[getSymbolFromId(fromCurrency)];
      const toCrypto = cryptoPrices?.[getSymbolFromId(toCurrency)];
      
      const fromCurrencyObj = currencies.find(c => c.id === fromCurrency);
      const toCurrencyObj = currencies.find(c => c.id === toCurrency);

      if (fromCurrencyObj?.type === 'crypto' && toCurrencyObj?.type === 'fiat') {
        // Crypto to fiat
        const cryptoPrice = fromCrypto?.current_price || 0;
        result = amount * cryptoPrice;
      } else if (fromCurrencyObj?.type === 'fiat' && toCurrencyObj?.type === 'crypto') {
        // Fiat to crypto
        const cryptoPrice = toCrypto?.current_price || 1;
        result = amount / cryptoPrice;
      } else if (fromCurrencyObj?.type === 'crypto' && toCurrencyObj?.type === 'crypto') {
        // Crypto to crypto
        const fromPrice = fromCrypto?.current_price || 0;
        const toPrice = toCrypto?.current_price || 1;
        result = (amount * fromPrice) / toPrice;
      } else {
        // Fiat to fiat (simplified)
        result = amount;
      }
    }

    setToAmount(result.toFixed(8));
  };

  const getSymbolFromId = (id: string) => {
    const currency = currencies.find(c => c.id === id);
    return currency?.symbol.toLowerCase() || id;
  };

  const getCurrentPrice = (currencyId: string) => {
    const symbol = getSymbolFromId(currencyId);
    return cryptoPrices?.[symbol];
  };

  const formatCurrency = (id: string) => {
    const currency = currencies.find(c => c.id === id);
    return currency ? `${currency.symbol} - ${currency.name}` : id;
  };

  const handleRefresh = () => {
    refetch();
    toast.success('Refreshing prices...');
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white min-h-screen">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Crypto Calculator</h2>
          <CryptoLoadingState />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white min-h-screen">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Crypto Calculator</h2>
          <CryptoErrorState 
            error={error.message} 
            onRetry={handleRefresh}
          />
        </div>
      </div>
    );
  }

  const PriceDisplay = ({ currencyId }: { currencyId: string }) => {
    const priceData = getCurrentPrice(currencyId);
    if (!priceData) return null;

    return (
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span>${priceData.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</span>
          <span className="text-gray-400">•</span>
          <span>${(priceData.market_cap / 1e9).toFixed(1)}B cap</span>
        </div>
        <div className="flex items-center gap-1">
          {priceData.price_change_percentage_24h > 0 ? (
            <TrendingUp className="w-3 h-3 text-green-500" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-500" />
          )}
          <span className={priceData.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>
            {priceData.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Crypto Calculator</h2>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {cryptoPrices ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            <span>Live Data</span>
          </div>
        </div>
        
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
            <PriceDisplay currencyId={fromCurrency} />
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
            <PriceDisplay currencyId={toCurrency} />
          </div>
        </div>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="w-full bg-gray-900 text-white py-3 rounded-2xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 mb-4 flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Updating...' : 'Refresh Rates'}
        </button>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>Last updated: {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : 'Loading...'}</p>
          <p className="mt-1">Powered by CoinMarketCap</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoCalculator;
