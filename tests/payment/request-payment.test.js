const { OpayoEnvironment, TransactionType, EntryMethodType, Apply3DSecureType, Transaction, } = require("../../dist");

OpayoEnvironment.init("parkcameras", "6Be0fJ5F729HwdiytkKD9bAavjNMqeWaygH1KKP0MJjRdT3kks", "", true);
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

new Transaction().request(data)
    .then(response => {
        console.log(JSON.stringify(response))
    });