const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { players: [] });
});

app.post('/calculate-scores', (req, res) => {
  const players = req.body.players.map(player => {
    const vp = parseFloat(player.victoryPoints);
    const ut = parseFloat(player.ultratech) * 6 / 12;
    const lc = parseFloat(player.largeCubes) * 3 / 12;
    const sc = parseFloat(player.smallCubes) * 2 / 12;
    const sh = parseFloat(player.ships) * 2 / 12;
    const score = vp + ut + lc + sc + sh;

    return {
      ...player,
      score: score.toFixed(2)
    };
  }).sort((a, b) => b.score - a.score);

  res.render('index', { players });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});