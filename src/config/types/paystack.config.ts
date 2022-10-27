export interface PaystackConfig {
    /**
     * Paystack URL
     */
    readonly url: string

    /**
     * Paystack secret
     */
    readonly secret: string

    /**
     * Paystack timeout
     */
    readonly timeout: number

}
