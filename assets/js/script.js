const BLACKLISTED_KEY_CODES = [38];
const COMMANDS = {
    help:
        'Commandes disponibles: <span class="code">about</span>, <span class="code">experience</span>, <span class="code">skills</span>, <span class="code">contact</span>, <span class="code">bitcoin</span>',
    // about:
    //     "Salut 👋<br>Je suis un développeur autodidacte. Après plus de 4 ans d'expérience, je me suis dirigé vers plusieurs languages de programation tels que le Lua, PHP, CSS et autres. J'ai également ma communauté multi-gaming nommé Ethernium.net",
    about:
        "Salut 👋<br>Bienvenue sur mon site ! Fondateur de la communauté Ethernium.net",
    skills:
        '<span class="code">Languages:</span> CSS, JavaScript, PHP, Lua<br><span class="code">Technologies:</span> SQL, GIT<br><span class="code">OS:</span> Windows/Linux',
    education:
        "not found",
    resume: "<a href='./cv.pdf' class='success link'>cv.pdf</a>",
    experience: "Pas d'expérience en entreprise actuellement.",
    contact:
        "Vous pouvez me contacter en cliquant sur les liens suivants: <a href='https://www.twitter.com/samgaze_/' class='success link'>Twitter</a>",
    bitcoin:
        "Bitcoin Whitepaper: <a href='bitcoin.pdf' target='blank' class='success link'>Bitcoin</a>"
};
let userInput, terminalOutput;

const app = () => {
    userInput = document.getElementById("userInput");
    terminalOutput = document.getElementById("terminalOutput");
    document.getElementById("dummyKeyboard").focus();
    console.log("Application loaded");
};

const execute = function executeCommand(input) {
    let output;
    input = input.toLowerCase();
    if (input.length === 0) {
        return;
    }
    output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
    if (!COMMANDS.hasOwnProperty(input)) {
        output += `<div class="terminal-line">no such command: ${input}</div>`;
        console.log("Oops! no such command");
    } else {
        output += COMMANDS[input];
    }

    terminalOutput.innerHTML = `${
        terminalOutput.innerHTML
    }<div class="terminal-line">${output}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

const key = function keyEvent(e) {
    const input = userInput.innerHTML;

    if (BLACKLISTED_KEY_CODES.includes(e.keyCode)) {
        return;
    }

    if (e.key === "Enter") {
        execute(input);
        userInput.innerHTML = "";
        return;
    }

    userInput.innerHTML = input + e.key;
};

const backspace = function backSpaceKeyEvent(e) {
    if (e.keyCode !== 8 && e.keyCode !== 46) {
        return;
    }
    userInput.innerHTML = userInput.innerHTML.slice(
        0,
        userInput.innerHTML.length - 1
    );
};

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);
