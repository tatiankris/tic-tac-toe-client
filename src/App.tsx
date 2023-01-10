import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import s from './App.module.css';
import { Box } from './Box';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function App() {

    const [myTurn, setMyTurn] = useState(true);
    const [xo, setXO] = useState('X');
    const [player, setPlayer] = useState('');
    const [hasOpponent, setHasOpponent] = useState(false);
    const [share, setShare] = useState(false);
    const [turnData, setTurnData] = useState<boolean | any>(false);

  const [game, setGame] = useState(Array(9).fill(''));
  const [isX, setIsX] = useState(false);
  const [turnNumber, setTurnNumber] = useState(0);
  const [winner, setWinner] = useState(false);

  // const turn = (index: number) => {
  //   let g = [...game];
  //   if (!g[index] && !winner) {
  //     g[index] = isX ? 'X' : 'O';
  //     setGame(g);
  //     setIsX(!isX);
  //     setTurnNumber(turnNumber + 1);
  //   }
  // };

  const turn = (index: number) => {
      if (!game[index] && !winner && myTurn && hasOpponent) {
          socket.emit('reqTurn', JSON.stringify({ index, value: xo, room }));
      }
  };

  const restart = () => {
    setGame(Array(9).fill(''));
    setWinner(false);
    setTurnNumber(0);
  };

  useEffect(() => {
    // check for winner for every turn
    combinations.forEach((c) => {
      if (game[c[0]] === game[c[1]] && game[c[0]] === game[c[2]] && game[c[0]] !== '') {
        setWinner(true);
      }
    });
  }, [game]);

    useEffect(() => {
        socket.on('playerTurn', (json) => {
            setTurnData(json);
        });

        socket.on('restart', () => {
            restart();
        });

        socket.on('opponent_joined', () => {
            setHasOpponent(true);
            setShare(false);
        });
    }, []);



  return (
      <div className={s.container}>
        <p>
          {winner || turnNumber === 9 ? (
              <button className={s.reset} onClick={restart}>
                Restart
              </button>
          ) : null}
          {winner ? (
              <span>We have a winner: {!isX ? 'X' : 'O'}</span>
          ) : turnNumber === 9 ? (
              <span>It's a tie!</span>
          ) : (
              <br />
          )}
        </p>

        <div className={s.row}>
          <Box index={0} turn={turn} value={game[0]} />
          <Box index={1} turn={turn} value={game[1]} />
          <Box index={2} turn={turn} value={game[2]} />
        </div>
        <div className={s.row}>
          <Box index={3} turn={turn} value={game[3]} />
          <Box index={4} turn={turn} value={game[4]} />
          <Box index={5} turn={turn} value={game[5]} />
        </div>
        <div className={s.row}>
          <Box index={6} turn={turn} value={game[6]} />
          <Box index={7} turn={turn} value={game[7]} />
          <Box index={8} turn={turn} value={game[8]} />
        </div>
      </div>
  );
}

export default App;
