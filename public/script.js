document.getElementById('add-player').addEventListener('click', () => {
    const tableBody = document.querySelector('#players-table tbody');
    const index = tableBody.children.length;
    const row = document.createElement('tr');
    row.className = 'player';
    row.innerHTML = `
      <td><input type="text" name="players[${index}][name]" placeholder="Player Name" required></td>
      <td><input type="number" name="players[${index}][victoryPoints]" placeholder="Victory Points" required></td>
      <td><input type="number" name="players[${index}][ultratech]" placeholder="Ultratech" required></td>
      <td><input type="number" name="players[${index}][largeCubes]" placeholder="Large Cubes" required></td>
      <td><input type="number" name="players[${index}][smallCubes]" placeholder="Small Cubes" required></td>
      <td><input type="number" name="players[${index}][ships]" placeholder="Ships" required></td>
    `;
    tableBody.appendChild(row);
  });
  