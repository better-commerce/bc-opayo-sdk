import { InitiatorType, RecurringType } from "../constants/enums";

/**
 * Interface {@link ICredentialOnFile} represents a stored card.
 * 
 * @interface ICredentialOnFile
 * @property {string} transactionReference - Previous transaction reference
 * @property {InitiatorType} initiator - Initiator of the transaction
 * @property {RecurringType} type - Type of the transaction
 */
export interface ICredentialOnFile {
    readonly transactionReference: string, // Previous transaction reference
    readonly initiator: InitiatorType,
    readonly type: RecurringType,
}