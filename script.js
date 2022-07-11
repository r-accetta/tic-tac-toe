const gameboard = (() => {
    const _board = Array(9).fill('');

    const getCell = (index) => {
        return _board[index]
    };

    const setCell = (i, symbol) => {
        _board[i] = symbol
    };

    const reset = () => {
        for (let i = 0; i < _board.length; i++) {
            _board[i] = ''
        }
    };
    return {getCell, setCell, reset}
})()

const displayController = (() => {
    const displayCells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restart-button");
    let _gameOver = false;
    const setEndText = (text) => {
        document.getElementById('end-banner').textContent = text;
        document.getElementById('end-banner').classList.add('active');
        _gameOver = true

    }

    displayCells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            if (!_gameOver){
                gameController.handleClick(parseInt(e.target.dataset.index));
                updateDisplay();
            };
        })
    });

    restartButton.addEventListener("click", (e) => {
        gameboard.reset();
        gameController.resetCurrentSymbol();
        resetDisplay()
    })

    const updateDisplay = () => {
        for(let i = 0; i < displayCells.length; i++) {
            if (!(displayCells[i].classList.contains('X') || displayCells[i].classList.contains('O'))) {
                if (gameboard.getCell(i)){
                    displayCells[i].classList.add(gameboard.getCell(i));
                }
            }
        }
    };

    const resetDisplay = () => {
        for(let i = 0; i < displayCells.length; i++) {
            displayCells[i].classList.remove('X', 'O')
        }
        setEndText('');
        document.getElementById('end-banner').classList.remove('active');
        _gameOver = false;
    }
    return {setEndText}
})()

const gameController = (() => {
    let _currentSymbol = 'X';
    const _winCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    const switchCurrentSymbol = () => {
        _currentSymbol = (_currentSymbol == 'X') ? 'O' : 'X'
    };

    const resetCurrentSymbol = () => {
        _currentSymbol = 'X'
    };

    const getCurrentSymbol = () => {
        return _currentSymbol
    };

    const checkWin = () => {
        return _winCombinations.some(combination => {
            return combination.every(index => (gameboard.getCell(index) === _currentSymbol))
        })
    };

    const checkDraw = () => {
        for (let i = 0; i < 9; i++) {
            if (gameboard.getCell(i) == '') return false
        };
        return true
    }

    const handleWin = () => displayController.setEndText(`${_currentSymbol} wins!`);

    const handleDraw = () => displayController.setEndText(`It's a draw!`)

    const handleClick = (index) => {
        if (gameboard.getCell(index) === ''){
            gameboard.setCell(index, _currentSymbol)
            if (checkWin()) handleWin()
            else if (checkDraw()) handleDraw()
            switchCurrentSymbol()

        }
    };

    return {handleClick, resetCurrentSymbol}
})()


