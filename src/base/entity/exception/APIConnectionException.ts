import { BaseException } from "./BaseException";

export class APIConnectionException extends BaseException {
    constructor(httpResponseCode: any, status: string, errorCode: string, errorMessage: string) {
        super(httpResponseCode, status, errorCode, errorMessage);
    }

};