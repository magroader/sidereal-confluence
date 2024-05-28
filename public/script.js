const app = document.getElementById('app');

let currentStep = 1;
let numberOfPlayers = 0;
let playerNames = [];
let playerResources = [];

function renderStep() {
    let partial = '';
    switch (currentStep) {
        case 1:
            partial = 'player-count';
            break;
        case 2:
            partial = 'player-names';
            break;
        case 3:
            partial = 'player-resources';
            break;
        case 4:
            partial = 'results';
            break;
        default:
            partial = 'player-count';
    }

    const params = new URLSearchParams({
        numberOfPlayers: numberOfPlayers,
        playerNames: JSON.stringify(playerNames),
        playerResources: JSON.stringify(playerResources)
    });

    fetch(`/partials/${partial}?${params.toString()}`)
        .then(response => response.text())
        .then(html => {
            app.innerHTML = html;
        });
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