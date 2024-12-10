import * as Helper from "./helper.js"

const netWorthSpan = document.querySelector("#networth-balance");
const accountDisplay = document.querySelector("#account-display");
const TICK_INTERVAL = 1000;
const STANDARD_PAY = 1000;
const transferButton = document.querySelector("#transfer-button");
const fromSelector = document.querySelector("#from-selector");
const toSelector = document.querySelector("#to-selector");
let amountInput = document.querySelector("#amount");


transferButton.addEventListener("click", transferMoney);
window.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        transferMoney()
    }
})

export const personalAccounts = {
    "Savings": {
        display: "Savings",
        balance: 100,
        interest: 0.0012,
        type: "asset"
    },
    "High-Yield Savings": {
        display: "High-Yield Savings",
        balance: 5,
        interest: 0.041,
        type: "asset"
    },
    "College Loans": {
        display: "College Loans",
        balance: 5000,
        interest: 0.055,
        type: "liability"
    },
    "Stocks": {
        display: "Stocks",
        balance: 0,
        interest: 0.8,
        type: "asset"
    }
};

fromSelector.addEventListener("change", () => generateDropdownOptions(toSelector));

function isAsset(account) {
    return personalAccounts[account].type == "asset";
}

export function getPaid(pay = STANDARD_PAY) {
    personalAccounts["Savings"].balance += pay;
    return
}

function createOptionDisplay(option) {
    return `${option.display}:  ${Helper.formatToCurrency(option.balance)}`
}

function createOptionFromAccount(account) {
    let option = document.createElement("option");
    option.label = createOptionDisplay(personalAccounts[account]);
    option.classList.add("options");
    option.value = personalAccounts[account].display;
    return option
}

function generateDropdownOptions(selector) {
    selector.innerHTML = ""
    for (let account in personalAccounts) {
        // from selector
        if (selector == fromSelector && personalAccounts[account].type == "asset" && personalAccounts[account].balance > 0) {
            fromSelector.appendChild(createOptionFromAccount(account));
        }
        // to selector
        if (selector == toSelector && personalAccounts[account].display != fromSelector.value) {
            toSelector.appendChild(createOptionFromAccount(account));
        }
    }
}

function generateBothDropdownOptions() {
    generateDropdownOptions(fromSelector);
    generateDropdownOptions(toSelector);
}

const possibleDebtAccounts = {
    "college-loans": {
        display: "College Loans",
        balance: 5000,
        interest: 1,
        type: "liability"
    },
    "medical-bill": {
        display: "Medical Bill",
        balance: 5000,
        interest: 1,
        type: "liability"
    },
    "car-loan": {
        display: "Car Loan",
        balance: 15000,
        interest: 0.0725,
        type: "liability"
    },
    "mortgage": {
        display: "Mortgage",
        balance: 125000,
        interest: 0.07,
        type: "liability"
    },
    "credit-card": {
        display: "Credit Card",
        balance: 2500,
        interest: 0.25,
        type: "liability"
    }
};

function calculateNetWorth() {
    let balance = 0;
    for (let [key, value] of Object.entries(personalAccounts)) {
        balance += isAsset(key) ? value.balance : -value.balance;
        console.log({key, value})
    }
    return balance;
}

function earnInterest(account) {
    return (
        personalAccounts[account].balance +
        personalAccounts[account].balance * personalAccounts[account].interest
    );
}

export function displayBalances() {
    netWorthSpan.innerText = Helper.formatToCurrency(calculateNetWorth());
    accountDisplay.innerHTML = "";
    for (let account in personalAccounts) {
        let p = document.createElement("p");
        p.id = account;
        p.innerText = personalAccounts[account].display + ": ";

        let span = document.createElement("span");
        span.innerText = Helper.formatToCurrency(personalAccounts[account].balance);
        p.append(span);

        accountDisplay.append(p);
    }
}

let tickCount = 0;
export function tick() {
    let accountsArray = [];
    for (let key of Object.keys(personalAccounts)) {
        accountsArray.push(key);
    }
    accountsArray.forEach((a) => {
        personalAccounts[a].balance = earnInterest(a);
    });
    let date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(`${time} - ticked ${tickCount++}`);
    getPaid();
    displayBalances();
    generateBothDropdownOptions();
}

function isValidTransfer(fromAccount, toAccount, transferAmount) {
    console.log(`Transferred ${Helper.formatToCurrency(transferAmount)} from ${fromAccount} to ${toAccount}.`)
    return (
        personalAccounts[fromAccount] && personalAccounts[toAccount]
        && isAsset(fromAccount)
        && personalAccounts[fromAccount].balance >= transferAmount
        && fromAccount != toAccount && !Number.isNaN(transferAmount)
    )
}

function transferMoney() {
    let transferAmount = Number(amountInput.value);
    if (!isValidTransfer(fromSelector.value, toSelector.value, transferAmount)) {
        console.log("not a valid transfer");
        amountInput.value = 0
        return
    }
    if (!isAsset(toSelector.value)) {
        transferAmount = transferAmount > personalAccounts[toSelector.value].balance ? personalAccounts[toSelector.value].balance : transferAmount;
        personalAccounts[toSelector.value].balance -= transferAmount;
        console.log("paying off debt")
    } else {
        personalAccounts[toSelector.value].balance += transferAmount;
    }
    personalAccounts[fromSelector.value].balance -= transferAmount;
    amountInput.value = 0;
    displayBalances();
    generateBothDropdownOptions();
}

displayBalances();

// setTimeout(() => {
//     setInterval(tick, TICK_INTERVAL);
// }, 5000);
generateDropdownOptions(fromSelector)
generateDropdownOptions(toSelector)
