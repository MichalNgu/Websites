const size = 25;
const grid = document.getElementById("grid");

let cells = [];

for (let i = 0; i < size * size; i++) {
  const div = document.createElement("div");
  div.classList.add("cell");
  grid.appendChild(div);
  cells.push(div);
}

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a, b) {
    let ra = this.find(a);
    let rb = this.find(b);
    if (ra === rb) return false;
    this.parent[rb] = ra;
    return true;
  }
}

function getEdges(size) {
  let edges = [];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let i = y * size + x;

      if (x < size - 1) edges.push([i, i + 1]);
      if (y < size - 1) edges.push([i, i + size]);
    }
  }

  return edges;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function removeWall(a, b) {
  const diff = b - a;

  if (diff === 1) {
    cells[a].style.borderRight = "none";
    cells[b].style.borderLeft = "none";
  } else if (diff === -1) {
    cells[a].style.borderLeft = "none";
    cells[b].style.borderRight = "none";
  } else if (diff === size) {
    cells[a].style.borderBottom = "none";
    cells[b].style.borderTop = "none";
  } else if (diff === -size) {
    cells[a].style.borderTop = "none";
    cells[b].style.borderBottom = "none";
  }
}

// 🔹 Ukládání sousedů (graf)
let graph = Array.from({ length: size * size }, () => []);

function addEdge(a, b) {
  graph[a].push(b);
  graph[b].push(a);
}

// 🔹 BFS kontrola průchodnosti
function hasPath(start, end) {
  let visited = new Set();
  let queue = [start];

  while (queue.length) {
    let node = queue.shift();
    if (node === end) return true;

    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return false;
}

function generateMaze() {
  const uf = new UnionFind(size * size);
  const edges = getEdges(size);
  shuffle(edges);
  let i = 0;

  function step() {
    if (i >= edges.length) {
      // Maze hotové
      cells[0].classList.add("start");
      cells[size*size - 1].classList.add("finish");
      drawPlayer();

      // Timer startuje až po dokončení generování
      startTimer();
      return;
    }

    const [a, b] = edges[i];

    if (uf.union(a, b)) {
      removeWall(a, b);
      addEdge(a, b);
    }

    i++;
    setTimeout(step, 10);
  }

  step();
}
// timer
let timerInterval;
let seconds = 0;

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  updateTimer();
  timerInterval = setInterval(() => {
    seconds++;
    updateTimer();
  }, 1000);
}

function updateTimer() {
  let mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  let secs = (seconds % 60).toString().padStart(2, "0");
  document.getElementById("timer").textContent = `${mins}:${secs}`;
}

// NEW GAME
document.getElementById("newGameBtn").addEventListener("click", () => {
  cells.forEach(cell => {
    cell.className = "cell";
    cell.style.borderTop = "2px solid black";
    cell.style.borderBottom = "2px solid black";
    cell.style.borderLeft = "2px solid black";
    cell.style.borderRight = "2px solid black";
  });

  graph = Array.from({ length: size * size }, () => []);
  playerPos = 0;
  generateMaze();
});

generateMaze();


// player 
let playerPos = 0;

function drawPlayer() {
  cells.forEach(cell => cell.classList.remove("player"));
  cells[playerPos].classList.add("player");
}

function movePlayer(newPos) {
    if (graph[playerPos].includes(newPos)) {
      playerPos = newPos;
      drawPlayer();
    }
}

document.addEventListener("keydown", (e) => {
    let x = playerPos % size;
    let y = Math.floor(playerPos / size);
  
    if (e.key === "ArrowRight" && x < size - 1) {
      movePlayer(playerPos + 1);
    }
  
    if (e.key === "ArrowLeft" && x > 0) {
      movePlayer(playerPos - 1);
    }
  
    if (e.key === "ArrowDown" && y < size - 1) {
      movePlayer(playerPos + size);
    }
  
    if (e.key === "ArrowUp" && y > 0) {
      movePlayer(playerPos - size);
    }
  });

  function movePlayer(newPos) {
    if (graph[playerPos].includes(newPos)) {
      playerPos = newPos;
      drawPlayer();
      checkWin();
    }
  }

  drawPlayer();

  const finish = size * size - 1;

  function checkWin() {
    if (playerPos === finish) {
      clearInterval(timerInterval); // zastaví timer
      alert(`Vyhrál jsi! Čas: ${document.getElementById("timer").textContent}`);
    }
  }