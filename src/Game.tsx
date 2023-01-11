import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import {Cell} from './Cell';
import io from 'socket.io-client';
import {Box, Button, Modal, Stack} from "@mui/material";
const socket = io('https://tic-tac-toe-back-yb4m.onrender.com');

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

function Game({name, roomNumber, isJoined}: {name: string, roomNumber: string, isJoined: boolean}) {

    const [myTurn, setMyTurn] = useState(true);
    const [xo, setXO] = useState('X');
    const [player, setPlayer] = useState('');
    const [hasOpponent, setHasOpponent] = useState(false);
    const [share, setShare] = useState(false);
    const [turnData, setTurnData] = useState<boolean | any>(false);

  const [game, setGame] = useState(Array(9).fill(''));
  const [turnNumber, setTurnNumber] = useState(0);
  const [winner, setWinner] = useState(false);

    const [room, setRoom] = useState('');


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
        if (isJoined) {
            //  player 2
            setXO('O');
            socket.emit('join', roomNumber);
            setRoom(roomNumber);
            setMyTurn(false);
        } else {
            // player 1
            socket.emit('create', roomNumber);
            setRoom(roomNumber);
            setMyTurn(true);
        }
    }, []);


  return (
      <Stack className={s.gameContainer}>
          <Box className={s.box}>
              <Modal
                  sx={{backgroundColor: 'rgba(43,43,43,0.71)'}}
                  open={winner || turnNumber === 9}
              >
              <div className={s.winner}>

              {winner ? <span>We have a winner: {player}</span> : turnNumber === 9 ? <span style={{color: '#a8b7f2'}}>It's a tie!</span> :
                  <br/>}
                  {winner || turnNumber === 9 ? (

                      <Button color={winner ? 'success' : 'primary'} variant={'contained'} sx={{width: '110px'}} onClick={sendRestart}>
                          Restart
                      </Button>
                  ) : null}
          </div>
              </Modal>
              <div>
                <span style={{color: '#468080', fontSize: '30px', fontWeight: 'bold'}}>PLAYER: </span>
                  <span style={{color: '#656066', fontSize: '18px', fontWeight: 'bold'}}>{name}</span>
              </div>
              <div>
              <span style={{color: '#9b6d9e', fontSize: '30px', fontWeight: 'bold'}}>ROOM: </span>
                  <span style={{color: '#656066', fontSize: '18px', fontWeight: 'bold'}}>{room}</span>
              </div>
              <div style={{ marginTop: '10px',color: '#6d7b9e', fontSize: '18px', fontStyle: 'italic'}}>
                  {hasOpponent ? '' : 'Waiting for opponent...'}
              </div>

          </Box>
          <Box className={s.box}>
              <div className={s.row}>
                  <Cell index={0} turn={turn} value={game[0]}/>
                  <Cell index={1} turn={turn} value={game[1]}/>
                  <Cell index={2} turn={turn} value={game[2]}/>
              </div>
              <div className={s.row}>
                  <Cell index={3} turn={turn} value={game[3]}/>
                  <Cell index={4} turn={turn} value={game[4]}/>
                  <Cell index={5} turn={turn} value={game[5]}/>
              </div>
              <div className={s.row}>
                  <Cell index={6} turn={turn} value={game[6]}/>
                  <Cell index={7} turn={turn} value={game[7]}/>
                  <Cell index={8} turn={turn} value={game[8]}/>
              </div>
          </Box>

      </Stack>
  );
}

export default Game;
