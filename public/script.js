let currentStep = 0;
let playerData = [];
let currentResource = "";

function getRawScoreForStep(player, step) {
    let raw = step.rawMultiplier;
    if (isNaN(raw))
        return 0;

    let val = player[step.name];
    if (isNaN(val))
        return 0;

    return val * raw;
}

function getRawScoreForPlayer(player) {
    let totalRaw = 0;
    for (let i = 0; i < steps.length ; ++i)
        totalRaw += getRawScoreForStep(player, steps[i])
    return totalRaw;
}



function refreshScores() {
    for (let i = 0; i < playerData.length; ++i)
        playerData[i].rawScore = getRawScoreForPlayer(playerData[i]);
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

    currentResource = isNaN(stepObj.rawMultiplier) ? undefined : stepObj.name;

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
    { name : "ships", rawMultiplier: 2 },
    { name : "small-cubes", rawMultiplier : 2 },
    { name : "large-cubes", rawMultiplier : 3 },
    { name : "ultra-tech", rawMultiplier : 6 },
    { name : "victory-points", rawMultiplier : 12 },
    { name : "regret", rawMultiplier : -12 },
    { name : "results", preCall : refreshScores }
];

const stepEjs = steps.map(s => new EJS({url: "partials/" + s.name + ".ejs"}));

setStep(0);