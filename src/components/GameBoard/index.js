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

    let moveInfo = {}

    const heapNames = ['A', 'B', 'C', 'D', 'E']

    const [movesLog, setMovesLog] = useState([]);
    const [moveNum, setMoveNum] = useState(0);

    const coinCountStr = (coinCounts) => {
        const str = coinCounts.map((v, index) => `${heapNames[index]}${v}`).join("-")
        console.log(`coinCountStr(): (coinCounts, str) = (${coinCounts}, ${str})`)

        return str
    }

    const moveStr = (heapNum, count) => `${heapNames[heapNum]}${count}`

    const updateCoinCounts = (heapNum, count) => {
        console.log(`updateCoinCounts: (heapNum, count) = (${heapNum}, ${count})`)

        const beforeCounts = coinCountStr(coinCounts)

        let newCoinCounts = coinCounts
        newCoinCounts[heapNum] -= count
        setCoinCounts([...Array(5).keys()].map(n => newCoinCounts[n]))
        console.log(`updateCoinCounts: (newCoinCounts, coinCounts) = (${newCoinCounts}, ${coinCounts})`)

        const afterCounts = coinCountStr(newCoinCounts)

        const newMoveNum  = moveNum  + 1
        setMoveNum(newMoveNum)

        let newMovesLog = Array.from(movesLog)
        moveInfo = {
            'Move #': newMoveNum,
            'Made by': 'Player',

            'Before': beforeCounts,
            'Move': moveStr(heapNum, count),
            'After': afterCounts,
        }
        newMovesLog.push(moveInfo)
        setMovesLog(newMovesLog)
    }

    let heapMap = new Map()

    for (const [index, name] of heapNames.entries()) {
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
