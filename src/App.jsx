import React, { useState, useEffect } from 'react';
import styles from './app.module.css'

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState('Próximo jogador: X');

  const calculateWinner = (currentSquares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (currentSquares[a] && currentSquares[a] === currentSquares[b] && currentSquares[a] === currentSquares[c]) {
        return currentSquares[a]; 
      }
    }

    if (currentSquares.every(square => square !== null)) {
        return 'Empate';
    }
    return null; 
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      if(winner === 'Empate') {
        setStatus('Deu velha! Jogo empatado.');
      } else {
        setStatus(`O vencedor é: ${winner}!`);
      }
    } else {
      setStatus(`Próximo jogador: ${isXNext ? 'X' : 'O'}`);
    }
  }, [squares, isXNext]);

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const Square = ({ value, onSquareClick }) => {
    const playerStyle = value === 'X' ? styles.xStyle : styles.oStyle;
    return (
      <button className={{...styles.square, ...playerStyle}} onClick={onSquareClick}>
        {value}
      </button>
    );
  };

  const renderBoard = () => {
    return (
      <div className={styles.board}>
        {[0, 1, 2].map(row => (
          <div key={row} className={styles.boardRow}>
            {[0, 1, 2].map(col => {
              const index = row * 3 + col;
              return <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />;
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.game}>
        <h1 className={styles.title}>Jogo da Velha</h1>
        <div className={styles.status}>{status}</div>
        {renderBoard()}
        <button className={styles.restartButton} onClick={handleRestart}>
          Reiniciar Jogo
        </button>
      </div>
    </div>
  );
}


