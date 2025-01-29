import { IAddress } from "./IAddress";
import { ICredentialOnFile } from "./ICredentialOnFile";
import { EntryMethodType, TransactionType } from "../constants/enums";
import { Apply3DSecureType } from "../constants/enums/Apply3DSecureType";
import { FraudScreeningProviderType } from "../constants/enums/FraudScreeningProviderType";

/**
 * Interface {@link ITransactionRequest} represents a transaction request.
 * 
 * @interface ITransactionRequest
 * @property {TransactionType} source - Type of transaction (e.g., Payment, Deferred, Refund)
 * @property {string} vendorTxCode - Unique merchant-generated transaction ID
 * @property {number} amount - Transaction amount in minor units (e.g., cents)
 * @property {string} currency - 3-letter currency code (e.g., GBP, USD)
 * @property {string} [description] - Description of the transaction
 * @property {EntryMethodType} entryMethod - Defines how the transaction is processed (e.g., Ecommerce, MOTO)
 * @property {Apply3DSecureType} apply3DSecure - 3D Secure application preference
 * @property {IAddress} billingAddress - Billing address associated with the transaction
 * @property {string} customerFirstName - First name of the customer
 * @property {string} customerLastName - Last name of the customer
 * @property {string} [customerEmail] - Customer's email, recommended for fraud checks
 * @property {string} [customerPhone] - Customer's phone number
 * @property {string} [customerIPAddress] - Customer’s IP address, used for fraud screening
 * @property {ICredentialOnFile} [credentialOnFile] - Information about the stored card for recurring payments
 * @property {Object} strongCustomerAuthentication - Details for Strong Customer Authentication (3DS2)
 * @property {string} strongCustomerAuthentication.returnUrl - URL for redirect after 3D Secure challenge
 * @property {any} strongCustomerAuthentication.browserData - Browser data for 3D Secure
 * @property {string} [referenceTransactionId] - ID of the original transaction for refunds, repeats, and authorizations
 * @property {Object} [cardDetails] - Direct card payment details, required if no token is used
 * @property {string} cardDetails.cardNumber - Card number for the transaction
 * @property {string} cardDetails.expiryDate - Expiry date of the card
 * @property {string} cardDetails.securityCode - Security code of the card
 * @property {string} [token] - Token used for tokenized payments instead of `cardDetails`
 * @property {string} [referrerId] - Optional referrer ID for merchant-specific settings
 * @property {Object} [fraudScreening] - Fraud screening settings
 * @property {boolean} fraudScreening.apply - Whether to apply fraud checks
 * @property {FraudScreeningProviderType} [fraudScreening.provider] - Optional fraud screening provider
 * @property {any} customFields - Additional custom fields for the transaction
 */
export interface ITransactionRequest {
    readonly source: TransactionType;                       // Type of transaction (e.g., Payment, Deferred, Refund)
    readonly vendorTxCode: string;                          // Unique merchant-generated transaction ID
    readonly amount: number;                                // Transaction amount in minor units (e.g., cents)
    readonly currency: string;                              // 3-letter currency code (e.g., GBP, USD)
    readonly description?: string;
    readonly entryMethod: EntryMethodType;                  // Defines how the transaction is processed (e.g., Ecommerce, MOTO)
    readonly apply3DSecure: Apply3DSecureType;

    // 🏠 Billing Address
    readonly billingAddress: IAddress,

    // 🛒 Additional Transaction Details
    readonly customerFirstName: string;
    readonly customerLastName: string;
    readonly customerEmail?: string;                        // Customer's email (recommended for fraud checks)
    readonly customerPhone?: string;                        // Customer's phone number
    readonly customerIPAddress?: string;                    // Customer’s IP (for fraud screening)

    // 🔄 Recurring Payments (if applicable)
    readonly credentialOnFile?: ICredentialOnFile;

    // 🛡️ Strong Customer Authentication (3DS2)
    strongCustomerAuthentication: {
        returnUrl: string, // Redirect after 3D Secure challenge
        browserData: any,
    };

    // 🎫 Reference for Refunds / Repeat Payments
    referenceTransactionId?: string;                        // ID of the original transaction for refunds, repeats, and authorizations (Required for refunds, repeats, and authorizations)

    // 🏦 Payment Method Details (for Direct Card Payments)
    cardDetails?: {                                         // Required for direct card payments (if no token is used)
        cardNumber: string,
        expiryDate: string,
        securityCode: string,
    };

    // 🎟️ Tokenized Payments (if using stored card details)
    token?: string,                                         // Used for tokenized payments instead of `cardDetails`

    // 🎯 Merchant-Specific Settings
    referrerId?: string, // Optional
    fraudScreening?: {
        apply: boolean, // Apply fraud checks
        provider?: FraudScreeningProviderType, // Optional
    };

    // 🌐 Additional Custom Fields
    customFields?: any;
}