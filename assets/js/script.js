const BLACKLISTED_KEY_CODES = [38];
const COMMANDS = {
    help:
        'Commandes disponibles: <span class="code">about</span>, <span class="code">cv</span>, <span class="code">skills</span>',
    about:
        "Je m'appelle Alexis Badel et j'ai 18 ans.<br>Étant actuellement étudiant en deuxième année de DUT Réseaux et Télécommunications, je suis à la recherche d'un stage afin de pouvoir valider mon diplôme. 🎓",
    skills:
        '<span class="code">Languages:</span> CSS, JavaScript, PHP, Lua<br><span class="code">Technologies:</span> SQL, GIT<br><span class="code">OS:</span> Windows/Linux',
    cv: "Voici la dernière version de mon CV ❱ <a href='./assets/other/CV_BADEL_Alexis_2021_VF.pdf' class='success link'>CV_BADEL_Alexis_2021_VF.pdf</a>"
};
let userInput, terminalOutput;

const app = () => {
    userInput = document.getElementById("userInput");
    terminalOutput = document.getElementById("terminalOutput");
    document.getElementById("dummyKeyboard").focus();
    console.log("[Terminal - Webcore] Système prêt !");
};

const execute = function executeCommand(input) {
    let output;
    input = input.toLowerCase();
    if (input.length === 0) {
        return;
    }
    output = `<div class="terminal-line-success"><span class="success">➜</span> ${input}</div>`;
    if (!COMMANDS.hasOwnProperty(input)) {
        output += `<div class="terminal-line-error">Commande non-reconnue: <span class="code">${input}</span></div>`;
        console.log("[Terminal - Webcore] Cette commande n'existe pas !");
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
