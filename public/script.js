const steps = [
    new EJS({url: "partials/player-count.ejs"}),
    new EJS({url: "partials/player-names.ejs"}),
    new EJS({url: "partials/player-resources.ejs"}),
    new EJS({url: "partials/results.ejs"}),
];

let currentStep = 0;
let numberOfPlayers = 0;
let playerNames = [];
let playerResources = [];

function renderStep() {
    const partial = steps[currentStep % steps.length];
    const data = {numberOfPlayers, playerNames, playerResources};
    content.innerHTML = partial.render(data);
}

function handlePlayerCount(count) {
    if (count >= 1 && count <= 9) {
        numberOfPlayers = count;
        ++currentStep;
        renderStep();
    }
}

function handlePlayerNames() {
    playerNames = [];
    for (let i = 0; i < numberOfPlayers; i++) {
        const playerNameInput = document.getElementById(`player-name-${i}`);
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            playerNames.push(playerName);
        } else {
            alert('Please enter all player names.');
            return;
        }
    }
    currentStep = 3;
    renderStep();
}

function handlePlayerResources() {
    playerResources = [];
    for (let i = 0; i < numberOfPlayers; i++) {
        const resourceInput = document.getElementById(`player-resource-${i}`);
        const resources = parseInt(resourceInput.value, 10);
        if (!isNaN(resources)) {
            playerResources.push({ name: playerNames[i], resources });
        } else {
            alert('Please enter valid resources for all players.');
            return;
        }
    }
    currentStep = 4;
    renderStep();
}

function reset() {
    currentStep = 1;
    numberOfPlayers = 0;
    playerNames = [];
    playerResources = [];
    renderStep();
}

// Initialize the app
renderStep();