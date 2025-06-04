
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CoinMarketCapResponse {
  data: {
    [key: string]: {
      id: number
      name: string
      symbol: string
      quote: {
        USD: {
          price: number
          percent_change_24h: number
          market_cap: number
          volume_24h: number
        }
      }
    }
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, symbols, convert } = await req.json()
    
    const apiKey = Deno.env.get('COINMARKETCAP_API_KEY')
    if (!apiKey) {
      throw new Error('CoinMarketCap API key not configured')
    }

    let url = ''
    const headers = {
      'X-CMC_PRO_API_KEY': apiKey,
      'Accept': 'application/json'
    }

    if (action === 'quotes') {
      // Get latest quotes for specific symbols
      const symbolList = symbols.join(',')
      url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbolList}&convert=${convert || 'USD'}`
    } else if (action === 'listings') {
      // Get top cryptocurrencies
      url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=50&convert=${convert || 'USD'}`
    }

    console.log('Fetching from CoinMarketCap:', url)

    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('CoinMarketCap API error:', response.status, errorText)
      throw new Error(`CoinMarketCap API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('CoinMarketCap response received')

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to fetch cryptocurrency data',
        details: error.toString()
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
