import React, {useState} from 'react';
import Game from "./Game";
import StartPage from "./StartPage";
import {Routes} from "react-router";
import {Container} from "@mui/material";
import s from './App.module.css'

function App () {

    const [inRoom, setInRoom] = useState(false)
    const [name, setName] = useState('')
    const [roomNumber, setRoomNumber] = useState('')
    const [isJoined, setIsJoined] = useState(false)

    return (
        <Container maxWidth="sm" className={s.container}>
            {
                inRoom
                    ?<Game name={name} roomNumber={roomNumber} isJoined={isJoined}/>
                    :<StartPage roomNumber={roomNumber} name={name} setName={setName} setInRoom={setInRoom} setRoomNumber={setRoomNumber} setIsJoined={setIsJoined}/>
            }
        </Container>

    )
}

export default App;