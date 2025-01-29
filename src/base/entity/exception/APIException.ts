import { BaseException } from "./BaseException";

export class APIException extends BaseException {
    constructor(httpResponseCode: any, status: string, errorCode: string, errorMessage: string) {
        super(httpResponseCode, status, errorCode, errorMessage);
    }
};