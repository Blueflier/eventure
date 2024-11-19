export interface Transaction {
  transaction_id: string;
  wallet_id: string;
  amount: number;
  transaction_type: 'credit' | 'debit';
  description: string;
  created_at: string;
  stripe_payment_intent_id?: string;
}