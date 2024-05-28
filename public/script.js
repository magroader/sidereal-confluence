const playerCountTemplate = new EJS({url: "partials/player-count.ejs"});
const playerNameTemplate = new EJS({url: "partials/player-names.ejs"});
const playerResourcesTemplate = new EJS({url: "partials/player-resources.ejs"});
const resultsTemplate = new EJS({url: "partials/results.ejs"});

const app = document.getElementById('app');

let currentStep = 1;
let numberOfPlayers = 0;
let playerNames = [];
let playerResources = [];


function renderStep() {
    let partial = '';
    switch (currentStep) {
        case 2:
            partial = playerNameTemplate;
            break;
        case 3:
            partial = playerResourcesTemplate;
            break;
        case 4:
            partial = resultsTemplate;
            break;
        default:
            partial = playerCountTemplate;
            break;
    }

    app.innerHTML = partial.render({numberOfPlayers, playerNames, playerResources});
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