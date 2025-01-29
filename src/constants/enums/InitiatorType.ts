/**
 * Enum {@link InitiatorType} represents the various types of initiators for transactions.
 *
 * @readonly
 * @enum {string}
 * @property {string} CARDHOLDER - The transaction was initiated by the cardholder.
 * @property {string} MERCHANT - The transaction was initiated by the merchant.
 */
export enum InitiatorType {
    CARDHOLDER = 'Cardholder',
    MERCHANT = 'Merchant',
}