document.getElementById('add-player').addEventListener('click', () => {
    const tableBody = document.querySelector('#players-table tbody');
    const index = tableBody.children.length;
    const row = document.createElement('tr');
    row.className = 'player';
    row.innerHTML = `
      <td><input type="text" name="players[${index}][name]" placeholder="Player Name" required></td>
      <td><input type="number" name="players[${index}][victoryPoints]" placeholder="Victory Points"></td>
      <td><input type="number" name="players[${index}][ultratech]" placeholder="Ultratech"></td>
      <td><input type="number" name="players[${index}][largeCubes]" placeholder="Large Cubes"></td>
      <td><input type="number" name="players[${index}][smallCubes]" placeholder="Small Cubes"></td>
      <td><input type="number" name="players[${index}][ships]" placeholder="Ships"></td>
      <td><input type="number" name="players[${index}][regret]" placeholder="Regret"></td>
    `;
    tableBody.appendChild(row);
  });
  