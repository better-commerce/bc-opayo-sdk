
/**
 * Counts the number of decimal places of a given number.
 * @param {number} value The number to count the decimal places of.
 * @returns {number} The number of decimal places of the given number.
 */
export const countDecimals = (value: number) => {
    if (Math.floor(value.valueOf()) === value.valueOf()) return 0; {
        return value.toString().split(".")[1].length || 0;
    }
};

/**
 * Sanitizes the given amount by converting it to an integer representation of the lowest currency unit.
 * 
 * This function handles amounts with up to two decimal places. If the amount has more than two decimals,
 * it is rounded to two decimal places before conversion. The sanitized amount is returned as an integer
 * by multiplying the value by 100 to handle the currency in the lowest denomination (e.g., cents for USD).
 * 
 * @param value - The monetary amount to be sanitized.
 * @returns The sanitized amount as an integer.
 */
export const sanitizeAmount = (value: number) => {
    let amount = 0;
    if (value) {
        const decimals = countDecimals(value);
        if (decimals > 2) {
            amount = Number.parseFloat(value.toFixed(2)) * 100;
        } else {
            if (decimals == 0) {
                amount = value * 100;
            } else {
                amount = parseInt((value * 100).toFixed(0));
            }
        }
    }
    return amount;
}