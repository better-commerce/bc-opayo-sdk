/**
 * Enum {@link TransactionType} represents the various types of transactions supported by the API.
 *
 * @readonly
 * @enum {string}
 * @property {string} PAYMENT - A standard payment where funds are immediately captured from the customer’s card.
 * @property {string} DEFERRED - A payment that is authorized but not immediately captured, allowing you to capture it later
 * @property {string} AUTHORIZATION - A transaction where only authorization occurs, without capturing the funds
 * @property {string} REFUND - A transaction that returns funds to the customer for a previous payment
 * @property {string} VOID - Cancels a transaction that has not yet been settled
 * @property {string} CANCEL - Similar to void, cancels a deferred or pre-authorized transaction before capture
 * @property {string} RELEASE - Captures funds from a previously deferred transaction
 * @property {string} ABORT - Cancels a deferred transaction before it is released
 * @property {string} REPEAT - A new transaction using card details from a previous successful transaction
 * @property {string} AUTHORIZE - Converts a deferred transaction into a payment by requesting authorization
 * @property {string} DIRECT_REFUND - Refunds money to a card without referencing a previous transaction (only available for certain merchants)
 */
export enum TransactionType {
    PAYMENT = 'Payment',
    DEFERRED = 'Deferred',
    AUTHORIZATION = 'Authorization',
    REFUND = 'Refund',
    VOID = 'Void',
    CANCEL = 'Cancel',
    RELEASE = 'Release',
    ABORT = 'Abort',
    REPEAT = 'Repeat',
    AUTHORIZE = 'Authorise',
    DIRECT_REFUND = 'DirectRefund'
}
