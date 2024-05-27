const express = require('express');
const router = express.Router();

// Render the initial form
router.get('/', (req, res) => {
  res.render('index', { players: [] });
});

// Handle form submission and score calculation
router.post('/calculate-scores', (req, res) => {
  const players = req.body.players.map(player => {
    const victoryPoints = parseFloat(player.victoryPoints) || 0;
    const ultratech = parseFloat(player.ultratech) || 0;
    const largeCubes = parseFloat(player.largeCubes) || 0;
    const smallCubes = parseFloat(player.smallCubes) || 0;
    const ships = parseFloat(player.ships) || 0;
    const regret = parseFloat(player.regret) || 0;

    const score = victoryPoints 
      + ultratech * (6 / 12) 
      + largeCubes * (3 / 12) 
      + smallCubes * (2 / 12) 
      + ships * (2 / 12) 
      + regret * (-1);

    return {
      name: player.name,
      victoryPoints,
      ultratech,
      largeCubes,
      smallCubes,
      ships,
      regret,
      score
    };
  });

  players.sort((a, b) => b.score - a.score);

  res.render('index', { players });
});

module.exports = router;