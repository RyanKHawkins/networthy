const netWorthSpan = document.querySelector("#networth-balance");
const accountDisplay = document.querySelector("#account-display");
const TICK_INTERVAL = 1000;
const transferButton = document.querySelector("#transfer-button");

// transferButton.addEventListener("click", transferMoney);

const accounts = {
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
    }
};

function calculateNetWorth() {
    let balance = 0;
    for (let [key, value] of Object.entries(accounts)) {
        if (value.type == "asset") {
            balance += value.balance;
        } else {
            balance -= value.balance;
        }
    }
    return balance;
}

function earnInterest(account) {
    console.log(accounts);
    return (
        accounts[account].balance +
        accounts[account].balance * accounts[account].interest
    );
}

function formatToCurrency(amount) {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}

function transformNameToCamel(name) {
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

function displayBalances() {
    netWorthSpan.innerText = formatToCurrency(netWorthBalance);
    accountDisplay.innerHTML = "";
    for (let account in accounts) {
        console.log("account: ", accounts[account]);
        let div = document.createElement("div");
        div.id = account;
        div.innerText = accounts[account].display + ": ";

        let span = document.createElement("span");
        span.innerText = formatToCurrency(accounts[account].balance);
        div.append(span);

        accountDisplay.append(div);
    }
}

let tickCount = 0;
function tick() {
    let accountsArray = [];
    for (let key of Object.keys(accounts)) {
        accountsArray.push(key);
    }
    accountsArray.forEach((a) => {
        accounts[a].balance = earnInterest(a);
    });
    let date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(`${time} - ticked`);
    accounts["basic-savings"].balance += getPaid();
    netWorthBalance = calculateNetWorth();
    displayBalances();
    tickCount++;
}

function transferMoney(fromAccount, toAccount, transferAmount) {
    if (!fromAccount || !toAccount) {
        console.log("one or more of the accounts do not exist");
        return;
    }
    if (accounts[fromAccount].type == "liability") {
        console.log("cannot transfer away from debt!");
        return;
    }
    if (accounts[fromAccount].balance <= transferAmount) {
        return;
    }
    accounts[fromAccount].balance -= transferAmount;
    if (accounts[toAccount].type == "liability") {
        accounts[toAccount].balance -= transferAmount;
    } else {
        accounts[toAccount].balance += transferAmount;
    }
}

netWorthBalance = calculateNetWorth();
displayBalances();

// setTimeout(() => {
//     setInterval(tick, TICK_INTERVAL);
// }, 5000);
