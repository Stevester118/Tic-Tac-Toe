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
          <button class="square" onClick={props.onClick}>
            {props.value}
          </button>
  );
}

function Board(){
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext, setXIsNext] = useState(true);
    const [turnCount, setTurnCount] = useState(0);
    let status;
    const winner = calculateWinner(history[turnCount]);
    status = !winner && turnCount === 9 ? `Tie game` : winner === "X" || winner === "O" ? `Winner is: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;

    //handleClick
    const handleClick = (index) => {
        //copy of boardState
        const timeInHistory = history.slice(0, turnCount + 1);
        const current = timeInHistory[turnCount];
        const squares = [...current];
        //if the index of the board is filled, return
        if(winner || squares[index]) return;

        //add X or O
        squares[index] = xIsNext ?  "X" : "O";

        //calculate next turn
        //set the state of the board
        setHistory([...timeInHistory, squares]);
        //set the state of the turn
        setXIsNext(!xIsNext);
        setTurnCount(timeInHistory.length);
    };

    const renderSquare = (index) => {
        return (
        <Square value={history[turnCount][index]} onClick={() => handleClick(index)}/>
        );
    };


    const jumpTo = (step) => {
        setTurnCount(step);
        setXIsNext(step % 2 === 0);
    };
    

    function resetBoard() {
        setHistory([Array(9).fill(null)]);
        setXIsNext(true);
        setTurnCount(0);
    };

    const renderMoves = () => 
        history.map((_step, move) => {
            const destination = move ? `Go to move #${move}` : "Go to start";
            return(
                <li class="history-list">
                <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            );
        });
    
    //create a render square function
        //take in an index
            //return a square with the correct value and function
    return (
        <center>
        <div>
            <div class="status">{status}<p>{"Turn number: " + turnCount}</p></div>
            <div>{renderSquare(0)}{renderSquare(1)}{renderSquare(2)}</div>
            <div>{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}</div>
            <div>{renderSquare(6)}{renderSquare(7)}{renderSquare(8)}</div>
            <button class="reset" onClick={resetBoard}>Reset Game</button>
            <div>{renderMoves()}</div>
        </div>
        </center>
    );

}

function calculateWinner(squares){
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