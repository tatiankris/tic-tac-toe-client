import React from 'react';
import s from './Box.module.css'

type PropsType = {
    index: number,
    turn: (index: number) => void
    value: string | null
}
export const Box = ({ index, turn, value }: PropsType) => {
    return (
        <div className={s.box} onClick={() => turn(index)}>
            {value}
        </div>
    );
};