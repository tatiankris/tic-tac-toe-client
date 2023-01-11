import {Button, Stack, TextField, Box, Typography} from '@mui/material';
import React from 'react';
import s from './StartPage.module.css'

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

    const style = {
        marginBottom: '4px'
    }

    return (
        <Stack direction={"column"} spacing={10} className={s.startPage}>
            <Box className={s.box}>
                <Typography variant={'h4'} component="h2" className={s.title}>Start the game</Typography>
                <TextField  size="small"  onChange={handleChangeName} placeholder={'Enter your name'} sx={style}/>
                <TextField  size="small"  onChange={handleChangeRoomNumber} placeholder={'Enter game room number'} sx={style} />
                <Button color="success" variant="contained" onClick={handleInRoom}>start</Button>
            </Box>
            <Box className={s.box}>
            <Typography variant={'h4'} className={s.title}>Join to game</Typography>
            <TextField size="small"  onChange={handleChangeName}  placeholder={'Enter your name'} sx={style} />
            <TextField  size="small" onChange={handleChangeRoomNumber} placeholder={'Enter game room number'} sx={style} />
            <Button color="secondary" variant="contained" onClick={handleInRoomJoined}>join</Button>
            </Box>
        </Stack>

    )
}

export default StartPage;