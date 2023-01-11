import React from 'react';

type Props = {
    name: string
    setName: (name: string) => void
    setInRoom: (value: boolean) => void
    roomNumber: string
    setRoomNumber: (name: string) => void
    setIsJoined: (value: boolean) => void
}
function StartPage ({setName, name, setInRoom, setRoomNumber, setIsJoined, roomNumber} :Props) {

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const handleChangeRoomNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomNumber(e.currentTarget.value)
    }

    const handleInRoom = () => {
        if (name.length && roomNumber.length) {
            setInRoom(true)
        } else {
            alert('Each field is required!')
        }
    }


    const handleInRoomJoined = () => {
        if (name.length && roomNumber.length) {
            setInRoom(true)
            setIsJoined(true)
        } else {
            alert('Each field is required!')
        }
    }

    return (
        <div>
            <p>Start the game</p>
            <input onChange={handleChangeName} placeholder={'Enter your name'} />
            <input onChange={handleChangeRoomNumber} placeholder={'Enter game room number'} />
            <button onClick={handleInRoom}>start</button>

            <p>Join to game</p>
            <input onChange={handleChangeName}  placeholder={'Enter your name'} />
            <input onChange={handleChangeRoomNumber} placeholder={'Enter game room number'} />
            <button onClick={handleInRoomJoined}>join</button>
        </div>

    )
}

export default StartPage;