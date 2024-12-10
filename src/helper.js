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

export function transformNameToCamel(name) {
    name = name.toLowerCase().split("-");
    name = name
        .map((e, i) => {
            if (i == 0) {
                return e;
            }
            return e[0].toUpperCase() + e.slice(1);
        })
        .join("");
    return name;
}

export function getRandomRange(min, max) {
    let number = Math.floor(Math.random() * (max - min + 1) + min);
    return number
}

export function announce(message) {
    window.alert(message);
} 

// export {convertPercentageToDecimal, convertDecimalToPercentage};