interface PaymentIntentData {
    amount: number;
    currency?: string;
    bookingId: string;
    userId: string;
    metadata?: Record<string, any>;
}
interface RefundData {
    paymentId: string;
    amount?: number;
    reason?: string;
}
declare class PaymentService {
    createPaymentIntent(data: PaymentIntentData): Promise<any>;
    confirmPayment(paymentIntentId: string): Promise<any>;
    processRefund(data: RefundData): Promise<any>;
    getPaymentHistory(userId: string): Promise<any[]>;
    getPaymentById(paymentId: string): Promise<any>;
    calculatePlatformFee(amount: number): Promise<number>;
    getPaymentStats(userId?: string): Promise<any>;
    handleWebhook(event: any): Promise<void>;
}
export default PaymentService;
//# sourceMappingURL=PaymentService.d.ts.map