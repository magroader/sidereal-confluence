// Add the following script to your existing script.js file

function addPlayer(index) {
    const playersTable = document.getElementById('players-table');
    const tbody = playersTable.querySelector('tbody');

    const newRow = document.createElement('tr');
    newRow.classList.add('player');
    newRow.innerHTML = `
      <td><button type="button" class="delete-player" data-index="${index}">Delete</button></td>
      <td><input type="text" name="players[${index}][name]" placeholder="Player Name" required></td>
      <td><input type="number" name="players[${index}][victoryPoints]" placeholder="Victory Points"></td>
      <td><input type="number" name="players[${index}][ultratech]" placeholder="Ultratech"></td>
      <td><input type="number" name="players[${index}][largeCubes]" placeholder="Large Cubes"></td>
      <td><input type="number" name="players[${index}][smallCubes]" placeholder="Small Cubes"></td>
      <td><input type="number" name="players[${index}][ships]" placeholder="Ships"></td>
      <td><input type="number" name="players[${index}][regret]" placeholder="Regret"></td>
    `;
    
    tbody.insertBefore(newRow, tbody.children[tbody.children.length-1]);
}

document.addEventListener("DOMContentLoaded", function() {
    const playersTable = document.getElementById('players-table');
    const tbody = playersTable.querySelector('tbody');
  
    playersTable.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-player')) {
        const playerRow = event.target.closest('tr');
        playerRow.remove();

        const newIndex = tbody.querySelectorAll('tr.player').length;
        if (newIndex === 0) {
            addPlayer(newIndex);
        }
      }
    });
  
    // Add Player button functionality
    const addPlayerButton = document.getElementById('add-player');
    addPlayerButton.addEventListener('click', function() {
        const newIndex = tbody.querySelectorAll('tr.player').length;
        addPlayer(newIndex);
    });
  });  