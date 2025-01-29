import { ITransactionRequest } from "../../models";

export interface ITransaction {

    /**
     * Initiates a transaction request.
     * @param data {ITransactionRequest}
     */
    request(data: ITransactionRequest): any;

    /**
     * Get payment details.
     * @param data {String}
     */
    getDetails(data: any): any;
}