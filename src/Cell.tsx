import React from 'react';
import s from './Cell.module.css'

type PropsType = {
    index: number,
    turn: (index: number) => void
    value: string | null
}
export const Cell = ({ index, turn, value }: PropsType) => {
    return (
        <div className={s.box} onClick={() => turn(index)}>
            {value}
        </div>
    );
};