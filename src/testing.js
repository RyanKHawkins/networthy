import * as Script from "./script.js";

const isTesting = false;

if (isTesting) {
    addTestButtonForFunction(Script.tick, "tick");
    addTestButtonForFunction(Script.getPaid, "getPaid");
    addTestButtonForFunction(changeAccountBalance, "Change Account Balance")
}

function addTestButtonForFunction(func, display) {
    let testButton = document.createElement("button");
    testButton.textContent = `${display}()`;
    document.querySelector("main").appendChild(testButton);
    testButton.addEventListener("click", func);
}

function changeAccountBalance() {
    let account = window.prompt("What account?")
    let newBalance = window.prompt("What balance?")
    Script.personalAccounts[account].balance = Number(newBalance);
    Script.displayBalances()
}