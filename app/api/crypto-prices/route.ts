import { NextResponse } from 'next/server';

// Mock data for development - in production, this would fetch from a real API
const mockPrices = {
  bitcoin: { usd: 42000.50 },
  ethereum: { usd: 2250.75 },
  solana: { usd: 105.25 },
};

export async function GET() {
  // In a real app, you would fetch from an external API like CoinGecko
  // const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');
  // const data = await response.json();
  
  // For now, we'll use mock data
  return NextResponse.json(mockPrices);
}