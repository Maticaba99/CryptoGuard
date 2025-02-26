export interface Transaction {
  id: string;
  crypto: 'bitcoin' | 'ethereum' | 'solana';
  amount: number;
  price: number;
  date: string;
}
