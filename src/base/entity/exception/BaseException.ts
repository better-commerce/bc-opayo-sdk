export class BaseException extends Error {
    constructor(public httpResponseCode: any, public status: any, public errorCode: string, public errorMessage: string) {
        super(errorMessage);
        this.httpResponseCode = httpResponseCode;
        this.status = status;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    getHttpResponseCode() {
        return this.httpResponseCode;
    }

    getStatus() {
        return this.status;
    }

    getErrorCode() {
        return this.errorCode;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

};