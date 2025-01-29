/**
 * Enum {@link RecurringType} represents the type of recurring payment.
 *
 * @readonly
 * @enum {string}
 * @property {string} RECURRING - A recurring payment where the exact amount and frequency is known in advance.
 * @property {string} UNSCHEDULED - An unscheduled payment where the exact amount and frequency is not known in advance.
 * @property {string} INSTALLMENT - An installment payment where the exact amount and frequency is known in advance, but the total amount is not known in advance.
 */
export enum RecurringType {
    RECURRING = 'Recurring',
    UNSCHEDULED = 'Unscheduled',
    INSTALLMENT = 'Installment',
}