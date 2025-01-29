# BetterCommerce Opayo NodeJS SDK

BetterCommerce's Opayo NodeJS SDK enables BC client applications to integrate with Opayo merchant API system. It publishes an interface to interact with [Opayo API](https://www.elavon.co.uk/resource-center/help-with-your-solutions/opayo/integrations/types-of-integrations.html) endpoints.

Use below command for package installation:

```
npm install @better-commerce/bc-opayo-sdk
```

## Architecture Diagram

![Architecture Diagram](/assets/app-architecture.png)

## SDK Initialization

**Use following snippet to initialize the SDK:**

### Server-to-server Authentication

Uses the access secret or OAuth for server-to-server communication.

```
OpayoEnvironment.init("<vendor_name>", "<integration_key>", "<integration_password>", [useSandbox: boolean]);
```

## Usage Example

### Request Payment

```
const data = {
    transactionType: TransactionType.PAYMENT,
    vendorTxCode: `TX-${Date.now()}`,
    amount: amount * 100, // Opayo uses smallest currency units
    currency: "GBP",
    description: 'Purchase Description',
    apply3DSecure: Apply3DSecureType.USE_MSP_SETTING,
    entryMethod: EntryMethodType.E_COMMERCE,
    customerFirstName: 'John',
    customerLastName: 'Doe',
    billingAddress: {
        address1: '123 Payment St',
        city: 'Paymentville',
        postalCode: '12345',
        country: 'GB',
    },
    strongCustomerAuthentication: {
        returnUrl: "http://localhost:3000/payment-notification/opayo", // Your URL to handle success or failure
        browserData: {
            acceptHeaders: '*/*',
            //userAgent: req.headers['user-agent'],
            javaEnabled: false,
            language: 'en-GB',
            screenWidth: 1920,
            screenHeight: 1080,
            timeZone: 0,
        },
    },
};

const result = await new Transaction().request(data);
```