export interface PaymentParams {
  price: number;
  currency: string;
  payment_methods: string[];
  idempotencyKey: string | undefined;
}

export interface PaymentInstance {
  id: string;
  client_secret: string;
}

export interface PaymentService {
  create(params: PaymentParams): Promise<PaymentInstance>;
}