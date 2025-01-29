import OpayoEnvironment from "../base/config/OpayoEnvironment";
import { RequestMethod } from "../constants/enums";
import fetcher from "./util/fetcher";

/**
 * {Api} class provides a single interface to make REST calls to the Opayo API.
 *
 */
export class Api {

    /**
     * Performs a REST call to the Opayo API.
     * @param {string} url - The relative url of the API endpoint.
     * @param {string} method - The HTTP request method.
     * @param {any} [params] - The request body or query string parameters.
     * @param {any} [cookies] - Cookies to be sent with the request.
     * @param {any} [headers] - Headers to be sent with the request.
     * @returns {Promise<any>} The response from the API.
     */
    static async call(url: string, method: string, params?: any, cookies?: any, headers?: any): Promise<any> {

        let options = { url, method, headers, cookies, baseUrl: OpayoEnvironment.baseUrl, };

        if (params) {
            if (method?.toUpperCase() === RequestMethod.GET) {
                options = { ...options, ...{ params: params }, };
            } else if (method?.toUpperCase() === RequestMethod.POST || method?.toUpperCase() === RequestMethod.PUT || method?.toUpperCase() === RequestMethod.PATCH || method?.toUpperCase() === RequestMethod.DELETE) {
                options = { ...options, ...{ data: params }, };
            }
        }

        return await fetcher(options);
    }
}