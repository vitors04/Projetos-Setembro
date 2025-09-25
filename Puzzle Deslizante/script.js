document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    puzzle: document.getElementById("puzzle-board"),
    shuffleButton: document.getElementById("shuffle-button"),
    resetButton: document.getElementById("reset-button"),
    winModal: document.getElementById("win-modal"),
    closeModalButton: document.getElementById("close-modal"),
  };
  const config = {
    imagePath: "./img/Lamar.webp", // VERIFIQUE ESTE CAMINHO
    gridSize: 3,
    boardSize: 500,
  };

  const { puzzle: puzzleBoard, winModal } = elements;
  const { gridSize, boardSize, imagePath } = config;
  const totalTiles = gridSize * gridSize;
  const tileSize = boardSize / gridSize;
  let tiles = [];
  let emptyTileIndex = totalTiles - 1; // 8 para 3x3

  Object.assign(puzzleBoard.style, {
    width: `${boardSize}px`,
    height: `${boardSize}px`,
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`, 
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
  });

  const getPosition = (index) => ({
    row: Math.floor(index / gridSize),
    col: index % gridSize,
    bgX: -(index % gridSize) * tileSize,
    bgY: -Math.floor(index / gridSize) * tileSize,
  });

  const createTile = (index) => {
    const tile = document.createElement("div");
    const { bgX, bgY } = getPosition(index);

    tile.className = "puzzle-tile";
    tile.dataset.position = tile.dataset.currentPosition = index;

    // Garante que a imagem de fundo seja aplicada a todas as peças, exceto à última (o buraco)
    if (index === emptyTileIndex) {
      tile.classList.add("empty");
      tile.style.backgroundImage = "none";
    } else {
      Object.assign(tile.style, {
        width: `${tileSize}px`,
        height: `${tileSize}px`,
        backgroundImage: `url(${imagePath})`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        backgroundSize: `${boardSize}px`,
      });
    }

    tile.addEventListener("click", handleTileClick);
    return tile;
  };

  function initializePuzzle() {
    puzzleBoard.innerHTML = "";
    tiles = Array.from({ length: totalTiles }, (_, i) => {
      const tile = createTile(i);
      puzzleBoard.appendChild(tile);
      return tile;
    });
    shufflePuzzle();
  }

  function handleTileClick(e) {
    const clickedTile = e.target;
    if (clickedTile.classList.contains("empty")) return;

    const clickedIndex = +clickedTile.dataset.currentPosition;
    const { row: clickedRow, col: clickedCol } = getPosition(clickedIndex);
    const { row: emptyRow, col: emptyCol } = getPosition(emptyTileIndex);

    const isAdjacent =
      (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
      (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow);

    if (isAdjacent) {
      swapTiles(clickedIndex, emptyTileIndex);
      if (checkWin()) showWinModal();
    }
  }

  function swapTiles(clickedIndex, emptyIndex) {
    const clickedTile = tiles.find((t) => +t.dataset.currentPosition === clickedIndex);
    const emptyTile = tiles.find((t) => +t.dataset.currentPosition === emptyIndex);
    if (!clickedTile || !emptyTile) return;
    
    // 1. Troca o CSS 'order' (posicionamento visual) e a posição lógica
    [clickedTile.style.order, emptyTile.style.order] = [
      emptyTile.style.order,
      clickedTile.style.order,
    ];
    [clickedTile.dataset.currentPosition, emptyTile.dataset.currentPosition] = [
      emptyIndex, 
      clickedIndex, 
    ];

    // 2. Atualiza o estado lógico do vazio
    emptyTileIndex = clickedIndex;

    // 3. Atualiza o estado visual (classes e background)
    clickedTile.classList.remove("empty");
    clickedTile.style.backgroundImage = `url(${imagePath})`;
    
    emptyTile.classList.add("empty");
    emptyTile.style.backgroundImage = "none";
  }

  function shufflePuzzle() {
    let currentPositions = Array.from({ length: totalTiles }, (_, i) => i);

    for (let i = currentPositions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentPositions[i], currentPositions[j]] = [
        currentPositions[j],
        currentPositions[i],
      ];
    }

    const empty = currentPositions.indexOf(totalTiles - 1);
    // Move o tile vazio para a última posição (garantindo solvabilidade no embaralhamento)
    if (empty !== totalTiles - 1) {
      [currentPositions[empty], currentPositions[totalTiles - 1]] = [
        currentPositions[totalTiles - 1],
        currentPositions[empty],
      ];
    }

    tiles.forEach((tile, i) => {
      const newPos = currentPositions[i];
      tile.style.order = tile.dataset.currentPosition = newPos;
      
      // i é a posição original (que define o pedaço da imagem)
      // newPos é a posição atual no board
      if (newPos === totalTiles - 1) {
        tile.classList.add("empty");
        tile.style.backgroundImage = "none";
        emptyTileIndex = newPos;
      } else {
        tile.classList.remove("empty");
        // O backgroundPosition deve usar a posição original 'i' para pegar o pedaço correto da imagem
        const { bgX, bgY } = getPosition(i); 
        Object.assign(tile.style, {
          backgroundImage: `url(${imagePath})`,
          backgroundPosition: `${bgX}px ${bgY}px`,
        });
      }
    });
  }

  const checkWin = () =>
    tiles.every(
      (tile) => +tile.dataset.currentPosition === +tile.dataset.position
    );

  const showWinModal = () => (winModal.style.display = "flex");
  const hideWinModal = () => {
    winModal.style.display = "none";
    resetGame();
  };
  function resetGame() {
    puzzleBoard.innerHTML = "";
    tiles = Array.from({ length: totalTiles }, (_, i) => {
      const tile = createTile(i);
      tile.style.order = i;
      puzzleBoard.appendChild(tile);
      return tile;
    });
    emptyTileIndex = totalTiles - 1;
  }
  elements.shuffleButton.addEventListener("click", shufflePuzzle);
  elements.resetButton.addEventListener("click", resetGame);
  elements.closeModalButton.addEventListener("click", hideWinModal);
  initializePuzzle();
});