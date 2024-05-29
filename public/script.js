const steps = [
    new EJS({url: "partials/player-count.ejs"}),
    new EJS({url: "partials/victory-points.ejs"}),
    new EJS({url: "partials/results.ejs"}),
];

let currentStep = 0;
let playerData = [];

function getScoreForPlayer(player) {
    const vp = player.victoryPoints * 1;
    const sp = player.ships * 2/12;
    const scp = player.smallCubes * 2/12;
    const lcp = player.largeCubes * 3/12;
    const up = player.ultraTech * 6/12;
    const rp = player.regret * -1;
    return(isNaN(vp) ? 0 : vp)
        + (isNaN(sp) ? 0 : sp)
        + (isNaN(scp) ? 0 : scp)
        + (isNaN(lcp) ? 0 : lcp)
        + (isNaN(up) ? 0 : up)
        + (isNaN(rp) ? 0 : rp);
}

function refreshScores() {
    for (let i = 0; i < playerData.length; ++i)
        playerData[i].score = getScoreForPlayer(playerData[i]);
}

function renderStep() {
    refreshScores();

    const partial = steps[currentStep % steps.length];
    const data = {playerData};
    content.innerHTML = partial.render(data);
}

function setPlayerCount(count) {
    if (count >= 1 && count <= 9) {
        for (let i = playerData.length ; i < count ; ++i)
            playerData.push({name:"Player " + (playerData.length+1)});
        playerData.slice(count);
    }
}

function next() {    
    currentStep = (currentStep + 1) % steps.length;
    renderStep();
}

function setResource(setPlayerDataFunc) {
    for (let i = 0; i < playerData.length; ++i) {
        const playerName = document.getElementById(`player-name-${i}`).value || "Player " + (i+1);
        const resources = parseInt(document.getElementById(`player-resource-${i}`).value, 10);

        let data = playerData[i];
        data.name = playerName;
        setPlayerDataFunc(data, !isNaN(resources) ? resources : 0);
    }
}

function setVictoryPoints() {
    setResource(function(pd, val) { pd.victoryPoints = val;});
}

function reset() {
    currentStep = 0;
    playerData = [];
    renderStep();
}

// Initialize the app
renderStep();