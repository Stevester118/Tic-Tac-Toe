import React, {useState} from 'react';
import "./TicTacToe.css";

function TicTacToe(){
  return (
    <div>
      <Board />
    </div>
  );
}

function Square(props){
  return (
          <button className="square" onClick={props.onClick}>
            {props.value}
          </button>
  );
}

function Board(){
    const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [turnCount, setTurnCount] = useState(1);

    //handleClick
    const handleClick = index => {
        //copy of boardState
        const squares = [...boardSquares];
        //if the index of the board is filled, return
        if(calculateWinner(boardSquares) || squares[index]) return;

        //add X or O
        squares[index] = xIsNext ?  "X" : "O";

        //calculate next turn
        //set the state of the board
        setBoardSquares(squares)
        //set the state of the turn
        setXIsNext(!xIsNext);
        setTurnCount(turnCount + 1);
    };

    const renderSquare = (index) => {
        return (
        <Square value={boardSquares[index]} onClick={() => handleClick(index)}/>
        );
    };

    let status;
    const winner = calculateWinner(boardSquares, turnCount);
    status = !winner && turnCount === 10 ? `Tie game` : winner === "X" || winner === "O" ? `Winner is: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;

    function resetBoard() {
        setBoardSquares(Array(9).fill(null));
        setXIsNext(true);
        setTurnCount(1);
    };

    //create a render square function
        //take in an index
            //return a square with the correct value and function
    return (
    <div>
            <div />
            <div class="status">{status}<p>{"Turn number: " + turnCount}</p></div>
            <div>{renderSquare(0)}{renderSquare(1)}{renderSquare(2)}</div>
            <div>{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}</div>
            <div>{renderSquare(6)}{renderSquare(7)}{renderSquare(8)}</div>
            <button class="reset" onClick={resetBoard}>Restart Game</button>
        </div>
    );

}

function calculateWinner(squares, turnCount){
    //get our set of winning lines
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    // loop through this set
    //check to see if the values in our squares array fulfill the winning requirement
    //if so, return x or o
    //else return nothing
    for(let i = 0; i < winningLines.length; i++){
        const [a, b, c] = winningLines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

export default TicTacToe;