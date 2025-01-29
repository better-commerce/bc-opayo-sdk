export interface IAddress {
    readonly address1: string;
    readonly address2?: string;
    readonly city: string;
    readonly state?: string;
    readonly postalCode: string;
    readonly country: string;
}
