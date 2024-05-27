document.getElementById('add-player').addEventListener('click', () => {
    const container = document.getElementById('players-container');
    const index = container.children.length;
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player';
    playerDiv.innerHTML = `
      <input type="text" name="players[${index}][name]" placeholder="Player Name" required>
      <input type="number" name="players[${index}][victoryPoints]" placeholder="Victory Points" required>
      <input type="number" name="players[${index}][ultratech]" placeholder="Ultratech" required>
      <input type="number" name="players[${index}][largeCubes]" placeholder="Large Cubes" required>
      <input type="number" name="players[${index}][smallCubes]" placeholder="Small Cubes" required>
      <input type="number" name="players[${index}][ships]" placeholder="Ships" required>
    `;
    container.appendChild(playerDiv);
  });