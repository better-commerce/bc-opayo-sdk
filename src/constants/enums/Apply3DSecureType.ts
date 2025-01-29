/**
 * Enum {@link Apply3DSecureType} represents the different options for applying 3D-Secure in a payment or authorization request.
 * 
 * @readonly
 * @enum {string}
 * @property {string} USE_MSP_SETTING - Uses the merchant's default setting for 3D Secure (configured in the Opayo admin panel)
 * @property {string} FORCE - Forces 3D Secure authentication, even if the card issuer does not require it
 * @property {string} DISABLE - Disables 3D Secure authentication for the transaction (only allowed if the merchant has permission)
 * @property {string} APPLY - Attempts 3D Secure authentication if the card supports it, but does not force it
 */
export enum Apply3DSecureType {
    USE_MSP_SETTING = 'UseMSPSetting',
    FORCE = 'Force',
    DISABLE = 'Disable',
    APPLY = 'Apply'
}