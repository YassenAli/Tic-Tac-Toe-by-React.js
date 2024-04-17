import { useState } from 'react';
import Square from "./Square";
function Board(){
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }
    function calculateWinner(squares) {
        const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a];
                }
            }
            return null;
    }
    function calculateDraw(squares){
        let sum = 0;
        for(let i = 0; i < 9; i++){
            if(squares[i] != null){
                sum += 1;
            }
        }
        if(sum === 9){
            return true;
        }
        return false;
    }
    let winner = calculateWinner(squares);
    let draw = calculateDraw(squares);
    let status;
    if(winner){
        status = "Winner: "+winner;
    }
    else if(draw){
        status = "draw";
    }
    else{
        status = "Next player: "+(xIsNext ? "X" : "O");
    }
    // status = winner ? "Winner: "+winner : (draw ? "Draw" : "Next player: "+(xIsNext ? "X" : "O"));
    function resetGame() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        winner = null;
    }
    return (
        <>
        <div className="status">{status}</div>
        <div className="game-board">
        <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        </div>
        <button className="reset" onClick={resetGame}>Reset Game</button>
        </>
    );
};
export default Board;