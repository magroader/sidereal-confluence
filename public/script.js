const app = document.getElementById('app');

let currentStep = 1;
let numberOfPlayers = 0;
let playerNames = [];
let playerResources = [];

function renderStep() {
    app.innerHTML = '';
    switch (currentStep) {
        case 1:
            renderPlayerCountStep();
            break;
        case 2:
            renderPlayerNamesStep();
            break;
        case 3:
            renderPlayerResourcesStep();
            break;
        case 4:
            renderResultsStep();
            break;
        default:
            renderPlayerCountStep();
    }
}

function renderPlayerCountStep() {
    const html = `
        <h1>Enter Number of Players</h1>
        <input type="number" id="player-count" min="2" max="10" />
        <button onclick="handlePlayerCount()">Next</button>
    `;
    app.innerHTML = html;
}

function handlePlayerCount() {
    const playerCountInput = document.getElementById('player-count');
    numberOfPlayers = parseInt(playerCountInput.value, 10);
    if (numberOfPlayers > 0) {
        currentStep = 2;
        renderStep();
    } else {
        alert('Please enter a valid number of players.');
    }
}

function renderPlayerNamesStep() {
    let html = '<h1>Enter Player Names</h1>';
    for (let i = 0; i < numberOfPlayers; i++) {
        html += `<input type="text" id="player-name-${i}" placeholder="Player ${i + 1} Name" />`;
    }
    html += '<button onclick="handlePlayerNames()">Next</button>';
    app.innerHTML = html;
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

function renderPlayerResourcesStep() {
    let html = '<h1>Enter Resources for Each Player</h1>';
    playerNames.forEach((name, index) => {
        html += `<h2>${name}</h2>`;
        html += `<input type="number" id="player-resource-${index}" placeholder="Resource Count" />`;
    });
    html += '<button onclick="handlePlayerResources()">Calculate Scores</button>';
    app.innerHTML = html;
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

function renderResultsStep() {
    playerResources.sort((a, b) => b.resources - a.resources);
    let html = '<h1>Results</h1>';
    playerResources.forEach((player, index) => {
        html += `<p>${index + 1}. ${player.name}: ${player.resources}</p>`;
    });
    html += '<button onclick="reset()">Start Over</button>';
    app.innerHTML = html;
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