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

export default function GameBoard({firstMover}) {
    const [mover, setMover] = useState(firstMover);

    console.log(`GameBoard: start: firstMover = ${firstMover}`)
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
            // 'Made by': 'Player',
            'Made by': mover,

            'Before': beforeCounts,
            'Move': moveStr(heapNum, count),
            'After': afterCounts,
        }
        newMovesLog.push(moveInfo)
        setMovesLog(newMovesLog)

        setMover('COMPUTER')

    }

    const makeComputerMove = () => {
        let heapNum = -1
        let count = -1

        while (true) {
            heapNum = getRandomInt(0, 5)
            if (coinCounts[heapNum] <= 0) {
                continue
            }
            count = getRandomInt(1, coinCounts[heapNum] + 1)
            break
        }

        console.log(`makeComputerMove: (heapNum, count) = (${heapNum}, ${count})`)

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
            // 'Made by': 'Player',
            'Made by': mover,

            'Before': beforeCounts,
            'Move': moveStr(heapNum, count),
            'After': afterCounts,
        }
        newMovesLog.push(moveInfo)
        setMovesLog(newMovesLog)

        setMover('PLAYER')

    }

    let heapMap = new Map()

    let coinsLeft = false

    for (const [index, name] of heapNames.entries()) {
        if (coinCounts[index] > 0) {
            heapMap.set(name, coinCounts[index])
            coinsLeft = true
        }
    }

    if (!coinsLeft) {
        const winner = (mover === 'COMPUTER') ? 'PLAYER' : 'COMPUTER'
        return (
            <div className={'gameBoardContainer'}>
                <MovesRecord/>

                <TickerTape  movesLog={movesLog}/>

                <h2>{'------ GAME OVER -------'}</h2>
                <h2>{`------ WINNER IS: ${winner } -------`}</h2>

                <div className={'gameBoard'}>
                    {
                        Array.from(heapMap.keys()).map(key =>
                            <CoinHeap name={`${key}`} coinCount={heapMap.get(key)} updateCoinCounts={updateCoinCounts}/>
                        )
                    }
                </div>
            </div>


        )
    }

    if (mover === 'COMPUTER') {
        makeComputerMove()
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
