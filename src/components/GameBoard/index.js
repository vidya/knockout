/**
 * Created by J.Vidya Sagar on 12/11/20.
 */

import React, { useState } from 'react'

import CoinHeap from "../CoinHeap";

import './style.scss'
import MovesRecord from "../MovesRecord";
import TickerTape from "../TickerTape";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export default function GameBoard(props) {
    console.log("GameBoard: start")
    const [coinCounts, setCoinCounts] = useState([...Array(5).keys()].map(n => getRandomInt(1, 10)));

    let moveInfo = {
        'Move #': 0,
        'Made by': 'player-08',
        'Before': 'A2-B7-C6-D2-E4',
        'Move': 'B2',
        'After': 'A2-B5-C6-D2-E4',
    }

    const names = ['A', 'B', 'C', 'D', 'E']

    const [movesLog, setMovesLog] = useState([moveInfo]);
    const [moveNum, setMoveNum] = useState(0);

    const updateCoinCounts = (heapNum, count) => {
        console.log(`updateCoinCounts: (heapNum, count) = (${heapNum}, ${count})`)

        let newCoinCounts = coinCounts
        newCoinCounts[heapNum] -= count
        setCoinCounts([...Array(5).keys()].map(n => newCoinCounts[n]))
        console.log(`updateCoinCounts: (newCoinCounts, coinCounts) = (${newCoinCounts}, ${coinCounts})`)

        const newMoveNum  = moveNum  + 1
        setMoveNum(newMoveNum)
        moveInfo = {
            'Move #': newMoveNum,
            'Made by': 'Player',
            'Before': 'A2-B7-C6-D2-E4',
            'Move': `${names[heapNum]}${count}`,
            'After': 'A2-B5-C6-D2-E4',
        }
        let newMovesLog = Array.from(movesLog)
        newMovesLog.push(moveInfo)
        setMovesLog(newMovesLog)
    }

    // const names = ['A', 'B', 'C', 'D', 'E']
    let heapMap = new Map()

    for (const [index, name] of names.entries()) {
        if (coinCounts[index] > 0) {
            heapMap.set(name, coinCounts[index])
        }
    }

    return (
        <div className={'gameBoardContainer'}>
            <MovesRecord/>

            <TickerTape  movesLog={movesLog}/>

            <div className={'gameBoard'}>
                {
                    Array.from(heapMap.keys()).map(key =>
                        <CoinHeap name={`${key}`} coinCount={heapMap.get(key)} updateCoinCounts={updateCoinCounts}/>
                    )
                }
            </div>
        </div>
    );
}
