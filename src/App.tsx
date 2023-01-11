import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import { Box } from './Box';
import io from 'socket.io-client';
import { useLocation } from 'react-router';
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


const random = () => {
    return Array.from(Array(8), () => Math.floor(Math.random() * 36).toString(36)).join('');
};

function App() {

    const [myTurn, setMyTurn] = useState(true);
    const [xo, setXO] = useState('X');
    const [player, setPlayer] = useState('');
    const [hasOpponent, setHasOpponent] = useState(false);
    const [share, setShare] = useState(false);
    const [turnData, setTurnData] = useState<boolean | any>(false);

  const [game, setGame] = useState(Array(9).fill(''));
  const [turnNumber, setTurnNumber] = useState(0);
  const [winner, setWinner] = useState(false);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paramsRoom = params.get('room');
    const [room, setRoom] = useState(paramsRoom);


  const turn = (index: number) => {
      if (!game[index] && !winner && myTurn && hasOpponent) {
          socket.emit('reqTurn', JSON.stringify({ index, value: xo, room }));
      }
  };

  const sendRestart = () => {
      socket.emit('reqRestart', JSON.stringify({ room }));
  };

  const restart = () => {
    setGame(Array(9).fill(''));
    setWinner(false);
    setTurnNumber(0);
  };

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

  useEffect(() => {

    combinations.forEach((c) => {
      if (game[c[0]] === game[c[1]] && game[c[0]] === game[c[2]] && game[c[0]] !== '') {
        setWinner(true);
      }
    });
  }, [game]);



    useEffect(() => {
        if (turnData) {
            const data = JSON.parse(turnData);
            let g = [...game];
            if (!g[data.index] && !winner) {
                g[data.index] = data.value;
                setGame(g);
                setTurnNumber(turnNumber + 1);
                setTurnData(false);
                setMyTurn(!myTurn);
                setPlayer(data.value);
            }
        }
    }, [turnData, game, turnNumber, winner, myTurn]);

    useEffect(() => {
        if (paramsRoom) {
            //  player 2
            setXO('O');
            socket.emit('join', paramsRoom);
            setRoom(paramsRoom);
            setMyTurn(false);
        } else {
            // player 1
            const newRoomName = random();
            socket.emit('create', newRoomName);
            setRoom(newRoomName);
            setMyTurn(true);
        }
    }, [paramsRoom]);


  return (
      <div className={s.container}>
          Room: {room}
          <button className="btn" onClick={() => setShare(!share)}>
              Share
          </button>
          {share ? (
              <>
                  <br />
                  <br />
                  Share link: <input type="text" value={`${window.location.href}?room=${room}`} readOnly />
              </>
          ) : null}
          <br />
          <br />
          Turn: {myTurn ? 'You' : 'Opponent'}
          <br />
          {hasOpponent ? '' : 'Waiting for opponent...'}
          <p>
              {winner || turnNumber === 9 ? (
                  <button className="btn" onClick={sendRestart}>
                      Restart
                  </button>
              ) : null}
              {winner ? <span>We have a winner: {player}</span> : turnNumber === 9 ? <span>It's a tie!</span> : <br />}
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
