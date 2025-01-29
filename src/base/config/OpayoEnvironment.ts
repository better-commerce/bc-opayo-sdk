import { Endpoints } from "../../constants/Endpoints";


/**
 * {OpayoEnvironment} class is used to setup the environment.
 * This class provides options to select the environment.
 */
export default class OpayoEnvironment {

    // Static variables
    /**
     * Field to store the vendor name.
     * @property {string}
     */
    static vendorName: string;

    /**
     * Field to store the integration key.
     * @property {string}
     */
    static integrationKey: string;

    // Static variables
    /**
     * Field to store the integration password.
     * @property {string}
     */
    static integrationPassword: string;

    static environment: string;
    static extras: any;

    /**
     * Field to store the opayo auth base url.
     * @property {string}
     */
    static authUrl: string;

    /**
     * Field to store the opayo api base url.
     * @property {string}
     */
    static baseUrl: string;

    /**
     * Initializes the OpayoEnvironment with the vendor name, integration key, integration password and
     * whether to use the sandbox environment or not. If useSandBox is not provided, it will default to true.
     * @param vendorName {string} The vendor name.
     * @param integrationKey {string} The integration key.
     * @param integrationPassword {string} The integration password.
     * @param useSandBox {boolean} Whether to use the sandbox environment or not. Defaults to true.
     * @param extras {any} Any additional information that needs to be passed to the server.
     * @returns {OpayoEnvironment} The OpayoEnvironment instance.
     */
    static init(vendorName: string, integrationKey: string, integrationPassword: string, useSandBox = true, extras = {}) {
        OpayoEnvironment.vendorName = vendorName;
        OpayoEnvironment.integrationKey = integrationKey;
        OpayoEnvironment.integrationPassword = integrationPassword;
        OpayoEnvironment.extras = extras;

        if (useSandBox) {
            OpayoEnvironment.authUrl = Endpoints.Base.Auth.SANDBOX_URL;
            OpayoEnvironment.baseUrl = Endpoints.Base.Api.SANDBOX_URL;
            OpayoEnvironment.environment = "sandbox";
        } else {
            OpayoEnvironment.authUrl = Endpoints.Base.Auth.PRODUCTION_URL;
            OpayoEnvironment.baseUrl = Endpoints.Base.Api.PRODUCTION_URL;
            OpayoEnvironment.environment = "production";
        }
        return this;
    }

    /**
     * Get the vendor name set in the OpayoEnvironment.
     * @returns {string} The vendor name.
     */
    static getVendorName(): string {
        return OpayoEnvironment.vendorName;
    }

    /**
     * Get the integration key set in the OpayoEnvironment.
     * @returns {string} The integration key.
     */
    static getIntegrationKey(): string {
        return OpayoEnvironment.integrationKey;
    }

    /**
     * Get the integration password set in the OpayoEnvironment.
     * @returns {string} The integration password.
     */
    static getIntegrationPassword(): string {
        return OpayoEnvironment.integrationPassword;
    }

    /**
     * Get any additional configuration options that were passed in the constructor.
     * @returns {Object} The additional configuration options.
     */
    static getExtras(): any {
        return OpayoEnvironment.extras;
    }

    /**
     * Get the current environment being used in the OpayoEnvironment.
     * @returns {string} The current environment, either "sandbox" or "production".
     */
    static getEnvironment(): string {
        return OpayoEnvironment.environment;
    }
    
    /**
     * Get the URL of the authentication service.
     * @returns {string} The URL of the authentication service.
     */
    static getAuthUrl(): string {
        return OpayoEnvironment.authUrl;
    }

    /**
     * Get the URL of the API service.
     * @returns {string} The URL of the API service.
     */
    static getBaseUrl(): string {
        return OpayoEnvironment.baseUrl;
    }
}