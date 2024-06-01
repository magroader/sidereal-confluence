let currentStep = 0;
let playerData = [];
let currentResource = "";

function getScoreForPlayer(player) {
    let totalRaw = 0;
    for (let i = 0; i < steps.length ; ++i) {

        let stepObj = steps[i];
        let raw = stepObj.rawValue;
        if (isNaN(raw))
            continue;

        let val = player[stepObj.name];
        if (isNaN(val))
            continue;

        totalRaw += val * raw;
    }
    return totalRaw / RAW_DIVIDE_BY;
}

function refreshScores() {
    for (let i = 0; i < playerData.length; ++i)
        playerData[i].score = getScoreForPlayer(playerData[i]);
}

function renderStep() {
    const partial = stepEjs[currentStep % steps.length];
    const data = {playerData};
    content.innerHTML = partial.render(data);

    const autofocusable = document.querySelectorAll("[autofocus]");
    if (autofocusable.length > 0)
        autofocusable[0].focus();
}

function setPlayerCount(count) {
    if (count >= 1 && count <= 9) {
        for (let i = playerData.length ; i < count ; ++i)
            playerData.push({});
        playerData.splice(count);
    }
}

function setStep(newStep) {
    currentStep = newStep;

    const stepObj = steps[currentStep];

    currentResource = isNaN(stepObj.rawValue) ? undefined : stepObj.name;

    if (stepObj.preCall)
        stepObj.preCall();

    renderStep();
}

function prev() {    
    setStep((currentStep + steps.length - 1) % steps.length);
}

function next() {    
    setStep((currentStep + 1) % steps.length);
}

function setNames() {
    for (let i = 0; i < playerData.length; ++i) {
        const playerName = document.getElementById(`player-name-${i}`).value || "Player " + (i+1);
        if (playerName !== undefined)
            playerData[i].name = playerName;
    }
}

function setCurrentResource() {
    if (currentResource === undefined)
        return;

    for (let i = 0; i < playerData.length; ++i) {
        const resources = parseInt(document.getElementById(`player-resource-${i}`).value, 10);
        playerData[i][currentResource] = !isNaN(resources) ? resources : 0;
    }
}

function reset() {
    currentStep = 0;
    playerData = [];
    renderStep();
}

function getInputEjsData(index) {
    return {
        player : playerData[index],
        playerCount : playerData.length,
        index : index,
    };
}

function renderPlayerAndResourceInputs() {
    const data = { playerCount : playerData.length };
    return playerAndResourceInputsEjs.render(data);
}

function renderResourceInput(index) {
    const data = getInputEjsData(index);
    return resourceInputEjs.render(data);
}

function renderPlayerNameInput(index, autofocus) {
    let data = getInputEjsData(index);
    data.autofocus = autofocus || false;
    return playerNameInputEjs.render(data);
}

const RAW_DIVIDE_BY = 12;

const resourceInputEjs = new EJS({url: "partials/resource-input.ejs"});
const playerNameInputEjs = new EJS({url: "partials/player-name-input.ejs"});
const playerAndResourceInputsEjs = new EJS({url: "partials/player-and-resource-input.ejs"});

const steps = [
    { name : "player-count" },
    { name : "player-names" },
    { name : "ships", rawValue : 2 },
    { name : "small-cubes", rawValue : 2 },
    { name : "large-cubes", rawValue : 3 },
    { name : "ultra-tech", rawValue : 6 },
    { name : "victory-points", rawValue : 12 },
    { name : "regret", rawValue : -12 },
    { name : "results", preCall : refreshScores }
];

const stepEjs = steps.map(s => new EJS({url: "partials/" + s.name + ".ejs"}));

setStep(0);