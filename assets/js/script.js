// Blacklisted code
const BLACKLISTED_KEY_CODES = [38];

// Available commands
const COMMANDS = {
    help:
        'Commandes disponibles: <span class="code">about</span>, <span class="code">cv</span>, <span class="code">comp</span>, <span class="code">contact</span>, <span class="code">portfolio</span>',
    about:
        "Je m'appelle Alexis Badel et j'ai 18 ans.<br>Étant actuellement étudiant en deuxième année de DUT Réseaux et Télécommunications, je suis à la recherche d'un stage afin de pouvoir valider mon diplôme. 🎓",
    portfolio:
        "Une page entièrement axée sur mes projets arrivera sûrement plus tard.<br>Par manque d'idée, j'ai préféré ne pas en faire plutôt qu'en mettre une basique en ligne.<br>En attendant, la plupart <i>(~ 50%)</i> de mes codes sont visibles sur GitHub et sur mon Trello donc n'hésitez pas à aller y jeter un oeil. ⚙️",
    comp:
        'Je maîtrise actuellement les éléments suivants :<br><span class="code">Langages ❱</span> HTML / CSS / SCSS / JavaScript / PHP / Lua / C / C++<br><span class="code">Frameworks ❱</span> Symfony / ReactJs / Laravel<br><span class="code">CMS ❱</span> XenForo / IPB / WordPress / WHMCS',
    cv: "Voici la dernière version de mon CV ❱ <a href='./assets/other/CV_BADEL_Alexis_2021_VF.pdf' class='success link'>CV_BADEL_Alexis_2021_VF.pdf</a><br><i>Le numéro de téléphone n'y figure pas par mesure de sécurité.</i>",
    contact: "Vous pouvez me contacter sur :<br>❱ <a href='https://www.linkedin.com/in/alexis-badel-795819205/' class='success link'>LinkedIn</a><br>❱ <span class='success link'>Mail (contact@dotcore-lab.net)</span>"
};

// Input vars
let userInput, terminalOutput;

// Loading core input system
const app = () => {
    userInput = document.getElementById("userInput");
    terminalOutput = document.getElementById("terminalOutput");
    document.getElementById("dummyKeyboard").focus();
    console.log("[Terminal - Webcore] Système prêt !");
};

// Core function
const execute = function executeCommand(input) {
    // Noob var
    let output;
    
    // Force to lowercase - Increase compatibility
    input = input.toLowerCase();

    // In case nothing is entered
    if (input.length === 0) {
        return;
    }

    // Output = Style properties + ➜ + User input
    output = `<div class="terminal-line-success"><span class="success">➜</span> ${input}</div>`;

    // In case command doesn't exist yet
    if (!COMMANDS.hasOwnProperty(input)) {
        output += `<div class="terminal-line-error">Commande non-reconnue: <span class="code">${input}</span></div>`;
        console.log("[Terminal - Webcore] Cette commande n'existe pas !");
    } else {
        // If command exists, we print the predefined output linked to her
        output += COMMANDS[input];
    }

    // Styling of the output
    terminalOutput.innerHTML = `${
        terminalOutput.innerHTML
    }<div class="terminal-line">${output}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

// Key function
const key = function keyEvent(e) {
    // Noob var
    const input = userInput.innerHTML;

    // If key is blacklisted
    if (BLACKLISTED_KEY_CODES.includes(e.keyCode)) {
        return;
    }

    // If user press Enter => Execute the program
    if (e.key === "Enter") {
        execute(input);
        userInput.innerHTML = "";
        return;
    }

    userInput.innerHTML = input + e.key;
};

// Delete function
const backspace = function backSpaceKeyEvent(e) {
    if (e.keyCode !== 8 && e.keyCode !== 46) {
        return;
    }
    userInput.innerHTML = userInput.innerHTML.slice(
        0,
        userInput.innerHTML.length - 1
    );
};

// Setup some listeners
document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);