import { tick } from "./script.js";

const isTesting = true;

if (isTesting) {
    let testButton = document.createElement("button");
    testButton.textContent = "tick()";
    document.querySelector("main").appendChild(testButton);
    testButton.addEventListener("click", tick);    
}
