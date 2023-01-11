import React, {useState} from 'react';
import Game from "./Game";
import StartPage from "./StartPage";
import {Routes} from "react-router";

function App () {

    const [inRoom, setInRoom] = useState(false)
    const [name, setName] = useState('')
    const [roomNumber, setRoomNumber] = useState('')
    const [isJoined, setIsJoined] = useState(false)

    return (
        <div>
            {
                inRoom
                    ?<Game name={name} roomNumber={roomNumber} isJoined={isJoined}/>
                    :<StartPage roomNumber={roomNumber} name={name} setName={setName} setInRoom={setInRoom} setRoomNumber={setRoomNumber} setIsJoined={setIsJoined}/>
            }
        </div>

    )
}

export default App;