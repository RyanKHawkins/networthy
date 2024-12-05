import * as Helper from "./helper.js"

const netWorthSpan = document.querySelector("#networth-balance");
const accountDisplay = document.querySelector("#account-display");
const TICK_INTERVAL = 1000;
const transferButton = document.querySelector("#transfer-button");

// transferButton.addEventListener("click", transferMoney);

const personalAccounts = {
    "basic-savings": {
        display: "Savings",
        balance: 100,
        interest: 0.0012,
        type: "asset"
    },
    "hy-savings": {
        display: "High-Yield Savings",
        balance: 0,
        interest: 0.041,
        type: "asset"
    },
    "college-loans": {
        display: "College Loans",
        balance: 5000,
        interest: 0.05,
        type: "liability"
    }
};

function getPaid() {
    return 1000;
}

function getRandomRange(min, max) {
    let number = Math.floor(Math.random() * (max - min + 1) + min);
    return number
}

function generateDropdownOptions() {}
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
        balance += value.type == "asset" ? value.balance : -value.balance;
    }
    return balance;
}

function earnInterest(account) {
    console.log(personalAccounts);
    return (
        personalAccounts[account].balance +
        personalAccounts[account].balance * personalAccounts[account].interest
    );
}

function displayBalances() {
    netWorthSpan.innerText = Helper.formatToCurrency(netWorthBalance);
    accountDisplay.innerHTML = "";
    for (let account in personalAccounts) {
        console.log("account: ", personalAccounts[account]);
        let div = document.createElement("div");
        div.id = account;
        div.innerText = personalAccounts[account].display + ": ";

        let span = document.createElement("span");
        span.innerText = Helper.formatToCurrency(personalAccounts[account].balance);
        div.append(span);

        accountDisplay.append(div);
    }
}

let tickCount = 0;
function tick() {
    let accountsArray = [];
    for (let key of Object.keys(personalAccounts)) {
        accountsArray.push(key);
    }
    accountsArray.forEach((a) => {
        personalAccounts[a].balance = earnInterest(a);
    });
    let date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(`${time} - ticked`);
    personalAccounts["basic-savings"].balance += getPaid();
    netWorthBalance = calculateNetWorth();
    displayBalances();
    tickCount++;
}

function isValidTransfer(fromAccount, toAccount, transferAmount) {
    return (
        personalAccounts[fromAccount] && personalAccounts[toAccount]
        && personalAccounts[fromAccount].type == "asset"
        && personalAccounts[fromAccount].balance >= transferAmount
    )
}

function transferMoney(fromAccount, toAccount, transferAmount) {
    // if (!fromAccount || !toAccount) {
    //     console.log("one or more of the personalAccounts do not exist");
    //     return;
    // }
    // if (personalAccounts[fromAccount].type == "liability") {
    //     console.log("cannot transfer away from debt!");
    //     return;
    // }
    // if (personalAccounts[fromAccount].balance <= transferAmount) {
    //     return;
    // }
    if (!isValidTransfer(fromAccount, toAccount, transferAmount)) {
        console.log("not a valid transfer");
        return
    }
    personalAccounts[fromAccount].balance -= transferAmount;
    if (personalAccounts[toAccount].type == "liability") {
        personalAccounts[toAccount].balance -= transferAmount;
        console.log("paying off debt")
    } else {
        personalAccounts[toAccount].balance += transferAmount;
    }
    displayBalances();
}

let netWorthBalance = calculateNetWorth();
displayBalances();

// setTimeout(() => {
//     setInterval(tick, TICK_INTERVAL);
// }, 5000);
