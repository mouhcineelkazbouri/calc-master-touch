
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export interface CryptoData {
  id: number
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  volume_24h: number
}

interface CoinMarketCapQuote {
  price: number
  percent_change_24h: number
  market_cap: number
  volume_24h: number
}

interface CoinMarketCapCrypto {
  id: number
  name: string
  symbol: string
  quote: {
    [currency: string]: CoinMarketCapQuote
  }
}

const transformCoinMarketCapData = (data: any, convert: string = 'USD'): Record<string, CryptoData> => {
  const transformed: Record<string, CryptoData> = {}
  
  if (data.data) {
    Object.values(data.data).forEach((crypto: any) => {
      const quote = crypto.quote[convert]
      if (quote) {
        transformed[crypto.symbol.toLowerCase()] = {
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol.toLowerCase(),
          current_price: quote.price,
          price_change_percentage_24h: quote.percent_change_24h,
          market_cap: quote.market_cap,
          volume_24h: quote.volume_24h
        }
      }
    })
  }
  
  return transformed
}

export const useCryptoQuotes = (symbols: string[], convert: string = 'USD') => {
  return useQuery({
    queryKey: ['crypto-quotes', symbols, convert],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('coinmarketcap', {
        body: {
          action: 'quotes',
          symbols: symbols.map(s => s.toUpperCase()),
          convert: convert.toUpperCase()
        }
      })

      if (error) {
        console.error('Supabase function error:', error)
        throw new Error('Failed to fetch crypto data')
      }

      return transformCoinMarketCapData(data, convert.toUpperCase())
    },
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 60 * 1000, // Refetch every minute
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  })
}

export const useCryptoListings = (convert: string = 'USD') => {
  return useQuery({
    queryKey: ['crypto-listings', convert],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('coinmarketcap', {
        body: {
          action: 'listings',
          convert: convert.toUpperCase()
        }
      })

      if (error) {
        console.error('Supabase function error:', error)
        throw new Error('Failed to fetch crypto listings')
      }

      return transformCoinMarketCapData(data, convert.toUpperCase())
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
    retry: 2
  })
}
