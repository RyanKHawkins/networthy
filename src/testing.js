import * as Script from "./script.js";

const isTesting = true;

if (isTesting) {
    addTestButtonForFunction(Script.tick, "tick");
    addTestButtonForFunction(Script.getPaid, "getPaid");
}

function addTestButtonForFunction(func, display) {
    let testButton = document.createElement("button");
    testButton.textContent = `${display}()`;
    document.querySelector("main").appendChild(testButton);
    testButton.addEventListener("click", func);
}

