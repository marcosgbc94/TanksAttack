// En el archivo worker.js
self.onmessage = function(e) {
    let { grid, player, enemies } = e.data; // Aseg�rate de recibir "enemies" en lugar de "enemy"
  
    // Implementaci�n de A* para m�ltiples enemigos aqu�
    let paths = astarForEnemies(enemies, player, grid);
//   console.log(paths)
    // Postear el resultado de vuelta al hilo principal
    self.postMessage(paths);
  };
  
  
  // Funci�n para implementar el algoritmo A* para m�ltiples enemigos
  function astarForEnemies(enemies, player, grid) {
    let paths = [];
  
    // Para cada enemigo, calcular el camino usando A*
    for (let enemy of enemies) {
      let openSet = [];
      let closedSet = [];
      openSet.push(enemy);
  
      while (openSet.length > 0) {
        // Encontrar el nodo en openSet con el menor valor f
        let currentNode = openSet[0];
        for (let i = 1; i < openSet.length; i++) {
          if (openSet[i].f < currentNode.f) {
            currentNode = openSet[i];
          }
        }
  
        // Si el nodo actual es el nodo objetivo, reconstruir el camino
        if (currentNode.x === player.x && currentNode.y === player.y) {
          let path = [];
          let temp = currentNode;
          while (temp !== null) {
            path.push(temp);
            temp = temp.parent;
          }
          paths.push(path.reverse());
          break;
        }
  
        // Remover el nodo actual de openSet y a�adirlo a closedSet
        openSet = openSet.filter(node => node !== currentNode);
        closedSet.push(currentNode);
  
        // Obtener los nodos vecinos
        let neighbors = getNeighbors(currentNode, grid);
  
        for (let neighbor of neighbors) {
          if (closedSet.includes(neighbor)) {
            continue; // Si el vecino ya fue evaluado, saltarlo
          }
  
          let tempG = currentNode.g + 1; // Costo de llegar a este vecino es siempre 1 (para un grid regular)
  
          // Si este camino es mejor que cualquier otro encontrado previamente, actualizar el vecino
          if (!openSet.includes(neighbor) || tempG < neighbor.g) {
            neighbor.g = tempG;
            neighbor.h = neighbor.heuristic(player);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.parent = currentNode;
  
            if (!openSet.includes(neighbor)) {
              openSet.push(neighbor);
            }
          }
        }
      }
    }
  
    return paths;
  }
  
  // Funci�n para obtener los vecinos de un nodo en una cuadr�cula (8 direcciones: arriba, abajo, izquierda, derecha, diagonales)
  function getNeighbors(node, grid) {
    let neighbors = [];
    let directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],         [0, 1],
      [1, -1], [1, 0], [1, 1]
    ]; // 8 direcciones posibles
  
    for (let dir of directions) {
      let neighborX = node.x + dir[0];
      let neighborY = node.y + dir[1];
  
      // Verificar si el vecino est� dentro de los l�mites de la cuadr�cula y no es un obst�culo

      
      if (neighborX >= 0 && neighborX < grid.length && neighborY >= 0 && neighborY < grid[0].length && grid[neighborX][neighborY] !== 1) {
        neighbors.push(new Node(neighborX, neighborY, grid[neighborX][neighborY]));
      }
    }
    
    return neighbors;
  }

  class Node {
    constructor(x, y, type) {
      this.x = x; // Posici�n x del nodo
      this.y = y; // Posici�n y del nodo
      this.type = type; // Tipo de nodo: 0 (camino), 1 (obst�culo), 2 (enemigo), 3 (jugador)
      this.g = 0; // Costo desde el nodo inicial hasta este nodo
      this.h = 0; // Heur�stica: estimaci�n del costo desde este nodo hasta el nodo objetivo
      this.f = 0; // f = g + h, costo total estimado del camino a trav�s de este nodo
      this.parent = null; // Nodo padre en el camino �ptimo
    }
  
    // M�todo para calcular la distancia heur�stica a otro nodo (distancia Manhattan)
    heuristic(otherNode) {
      return Math.abs(this.x - otherNode.x) + Math.abs(this.y - otherNode.y);
    }
  }