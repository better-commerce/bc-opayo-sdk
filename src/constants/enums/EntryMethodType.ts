/**
 * Enum {@link EntryMethodType} represents the various methods through which an entry or transaction can be made.
 *
 * @readonly
 * @enum {string}
 * @property {string} E_COMMERCE - Payments made through an online checkout using card details entered by the user
 * @property {string} DIGITAL_WALLET - Transactions made using wallets like Apple Pay, Google Pay, or PayPal
 * @property {string} MOTO - (Mail Order / Telephone Order) Payments manually processed by a merchant for phone or mail orders
 * @property {string} CARD_PRESENT - (Point of Sale / Terminal) Payments processed through a physical card terminal
 * @property {string} RECURRING - Transactions from saved cards for subscriptions or repeat billing
 * @property {string} UNATTENDED - (Self-Service Kiosk) Payments made via self-service machines (e.g., vending machines, parking systems)
 */
export enum EntryMethodType {
    E_COMMERCE = 'Ecommerce',
    DIGITAL_WALLET = 'DigitalWallet',
    MOTO = 'Moto',
    CARD_PRESENT = 'CardPresent',
    RECURRING = 'Recurring',
    UNATTENDED = 'Unattended'
}