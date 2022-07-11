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

    displayCells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            /*if (gameController.getIsOver() || e.target.classList.contains('X') || e.target.classList.contains('O')) return */
            gameController.handleClick(parseInt(e.target.dataset.index));
            updateDisplay();
        })
    });

    restartButton.addEventListener("click", (e) => {
        console.log('restart');
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
    }
})()

const gameController = (() => {
    let _currentSymbol = 'X';

    const switchCurrentSymbol = () => {
        _currentSymbol = (_currentSymbol == 'X') ? 'O' : 'X'
    };

    const resetCurrentSymbol = () => {
        _currentSymbol = 'X'
    };

    const getCurrentSymbol = () => {
        return _currentSymbol
    };

    const handleClick = (index) => {
        if (gameboard.getCell(index) === ''){
            gameboard.setCell(index, _currentSymbol)
            for (let i = 0; i < 9; i++) {console.log(gameboard.getCell(i))};
            console.log('--------------------')
            switchCurrentSymbol()

        }
    };

    const reset = () => {
        gameboard.reset()
        _currentSymbol = 'X'
    };

    return {handleClick, reset, switchCurrentSymbol, resetCurrentSymbol}
})()


