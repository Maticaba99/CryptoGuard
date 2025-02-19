export interface Transaction {
  id: string;
  crypto: 'BTC' | 'ETH' | 'SOL';
  amount: number;
  price: number;
  date: string;
}
