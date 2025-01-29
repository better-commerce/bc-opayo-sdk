import axios from "../../base/api"
import OpayoEnvironment from "../../base/config/OpayoEnvironment";
import { APIException, AuthenticationException, InvalidRequestException } from "../../base/entity";
import { RequestMethod } from "../../constants/enums";

const SingletonFactory = (function () {
    let accessToken = '';
    const axiosInstance = axios.create({
        baseURL: OpayoEnvironment.baseUrl,
        withCredentials: true,
    });
    const getToken = () => accessToken;

    const setToken = (token: string) => (accessToken = token);

    const clearToken = () => (accessToken = '');

    axiosInstance.interceptors.request.use(
        (config: any) => {

            const token = getToken();
            //this is to be changed when we implement currency / language switcher
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            return config;
        },
        (err) => Promise.reject(err)
    );

    /**
     * This function creates an Axios response interceptor that handles 401 responses and
     * refreshes the token by calling the /connect/token endpoint. It also logs the
     * activity of the request and response.
     *
     * @private
     * @returns {void}
     */
    function createAxiosResponseInterceptor() {
        const interceptor = axiosInstance.interceptors.response.use(
            (response: any) => response,
            (error: any) => {

                const extras = OpayoEnvironment.getExtras();
                const logActivity: any = extras?.logActivity;

                //console.log(error)
                // Reject promise if usual error
                if (error?.response?.status !== 400 && error?.response?.status !== 401 && error?.response?.status !== 404) {
                    return Promise.reject(error);
                }

                if (logActivity) {
                    logActivity({
                        data: { error: error },
                        message: "Opayo OAuth Cached Token Expired",
                    });
                }

                /*
                 * When response code is 401, try to refresh the token.
                 * Eject the interceptor so it doesn't loop in case
                 * token refresh causes the 401 response
                 */
                axiosInstance.interceptors.response.eject(interceptor);

                // return getAuthToken().finally(createAxiosResponseInterceptor)
                const url = new URL('api/v1/merchant-session-keys', OpayoEnvironment.getAuthUrl());
                const auth = Buffer.from(`${OpayoEnvironment.getIntegrationKey()}:${OpayoEnvironment.getIntegrationPassword()}`).toString("base64");
                const requestConfig = {
                    url: url.href,
                    method: RequestMethod.POST,
                    data: { vendorName: OpayoEnvironment.getVendorName() },
                    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}`, },
                };
                if (logActivity) {
                    logActivity({
                        data: requestConfig,
                        message: "Opayo OAuth Request",
                    });
                }

                return axiosInstance(requestConfig).then((res: any) => {
                    //console.log("token", res.data.merchantSessionKey)
                    setToken(res?.data?.merchantSessionKey);

                    if (logActivity) {
                        logActivity({
                            data: { data: res?.data?.merchantSessionKey },
                            message: "Opayo OAuth Response",
                        });
                    }

                    error.response.config.headers['Authorization'] = `Bearer ${res?.data?.merchantSessionKey}`;
                    //console.log(error.response.config)
                    return axiosInstance(error.response.config);
                }).catch((error) => {

                    if (logActivity) {
                        logActivity({
                            data: { error: error },
                            message: "Opayo OAuth Error",
                        });
                    }

                    console.log(error)
                    return Promise.reject(error);
                }).finally(createAxiosResponseInterceptor)
            }
        )
    }

    createAxiosResponseInterceptor();
    return { axiosInstance };
})()

const axiosInstance = SingletonFactory.axiosInstance;

Object.freeze(axiosInstance)

/**
 * This function makes a request to the Opayo API and handles the response.
 *
 * @param {string} url - The URL of the API endpoint.
 * @param {string} method - The HTTP method to use. Defaults to 'post'.
 * @param {object} data - The data to send in the request body.
 * @param {object} params - The URL parameters to send with the request.
 * @param {object} headers - The headers to send with the request.
 * @param {object} cookies - The cookies to send with the request.
 * @param {string} baseUrl - The base URL of the API. Defaults to the value of `OpayoEnvironment.getBaseUrl()`.
 *
 * @returns {Promise<object | { hasError: true, error: any }>} - A promise that resolves to the response data or an object with an error property.
 */
const fetcher = async ({ url = '', method = 'post', data = {}, params = {}, headers = {}, cookies = {}, baseUrl = "", }: any) => {
    const computedUrl = new URL(url, baseUrl || OpayoEnvironment.getBaseUrl());
    const config: any = {
        method: method,
        url: computedUrl.href,
        headers,
    };

    if (Object.keys(params).length) {
        config.params = params;
    }

    if (Object.keys(data).length) {
        config.data = data;
    }
    //console.log(JSON.stringify(config))
    try {
        const response = await axiosInstance(config);

        let responseCode = response.status;
        let responseBody = response.data;
        if (responseCode >= 200 && responseCode < 300) {
            return responseBody;
        } else {
            let status = undefined;
            let errorCode = undefined;
            let errorMessage = undefined;

            if (responseBody != undefined) {
                if ("status" in responseBody != undefined) {
                    status = responseBody.status;
                }

                if ("error_code" in responseBody != undefined) {
                    errorCode = responseBody.error_code;
                }

                if ("error_message" in responseBody != undefined) {
                    errorMessage = responseBody.error_message;
                }
            }
            switch (responseCode) {
                case 400:
                case 404:
                    throw new InvalidRequestException(responseCode, status, errorCode, errorMessage);

                case 401:
                    throw new AuthenticationException(responseCode, status, errorCode, errorMessage);

                default:
                    throw new APIException(responseCode, "internal_error", "internal_error", "Something went wrong.");
            }
        }
    } catch (error: any) {
        let errorData = {};

        if (error.response) {
            //errorData = error.response;
            errorData = {
                //headers: error.response.headers,
                status: error.response.status,
                data: error.response.data,
            };

            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            errorData = error.request;

            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            errorData = error.message;

            // Something happened in setting up the request that triggered an Error
            console.log('Error: ' + error.message);
        }

        return { hasError: true, error: errorData };

        //console.log(error, 'error inside fetcher');
        //throw new Error(error.response.data.message);
    }
}
export default fetcher;