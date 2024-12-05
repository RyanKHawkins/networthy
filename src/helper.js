export function convertPercentageToDecimal(percent) {
    return percent / 100
};

export function convertDecimalToPercentage (decimal) {
    return decimal * 100
};

export function formatToCurrency(amount) {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}


// export {convertPercentageToDecimal, convertDecimalToPercentage};