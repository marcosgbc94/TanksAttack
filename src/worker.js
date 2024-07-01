// En el archivo worker.js
self.onmessage = function(e) {
    let { grid, player, enemies } = e.data; // Asegúrate de recibir "enemies" en lugar de "enemy"
  
    // Implementación de A* para múltiples enemigos aquí
    let paths = astarForEnemies(enemies, player, grid);
//   console.log(paths)
    // Postear el resultado de vuelta al hilo principal
    self.postMessage(paths);
  };
  
  
  // Función para implementar el algoritmo A* para múltiples enemigos
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
  
        // Remover el nodo actual de openSet y añadirlo a closedSet
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
  
  // Función para obtener los vecinos de un nodo en una cuadrícula (8 direcciones: arriba, abajo, izquierda, derecha, diagonales)
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
  
      // Verificar si el vecino está dentro de los límites de la cuadrícula y no es un obstáculo

      
      if (neighborX >= 0 && neighborX < grid.length && neighborY >= 0 && neighborY < grid[0].length && grid[neighborX][neighborY] !== 1) {
        neighbors.push(new Node(neighborX, neighborY, grid[neighborX][neighborY]));
      }
    }
    
    return neighbors;
  }

  class Node {
    constructor(x, y, type) {
      this.x = x; // Posición x del nodo
      this.y = y; // Posición y del nodo
      this.type = type; // Tipo de nodo: 0 (camino), 1 (obstáculo), 2 (enemigo), 3 (jugador)
      this.g = 0; // Costo desde el nodo inicial hasta este nodo
      this.h = 0; // Heurística: estimación del costo desde este nodo hasta el nodo objetivo
      this.f = 0; // f = g + h, costo total estimado del camino a través de este nodo
      this.parent = null; // Nodo padre en el camino óptimo
    }
  
    // Método para calcular la distancia heurística a otro nodo (distancia Manhattan)
    heuristic(otherNode) {
      return Math.abs(this.x - otherNode.x) + Math.abs(this.y - otherNode.y);
    }
  }