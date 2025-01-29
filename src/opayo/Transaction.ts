// Other Imports
import { Api } from "../api";
import { RequestMethod } from "../constants/enums";
import { ITransaction } from "../base/contracts/ITransaction";
import { ITransactionRequest } from "../models";


export default class Transaction implements ITransaction {

    /**
     * Initiates a transaction request.
     *
     * @param {ITransactionRequest} data The transaction request data.
     * @returns {Promise<any>} A promise resolving to the result of the transaction request.
     * @throws {Error} If the request fails, an error is thrown.
     */
    async request(data: ITransactionRequest): Promise<any> {

        try {
            const transactionResult = await Api.call(`/api/v1/transactions`, RequestMethod.POST, data);
            return transactionResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }

    getDetails(data: any) {
        throw new Error("Method not implemented.");
    }
}