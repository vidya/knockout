/**
 * Created by J.Vidya Sagar on 12/11/20.
 */

import React, { useState } from 'react'

import {zip} from 'underscore'

import CoinHeap from "../CoinHeap";
import {Button} from "react-bootstrap";

import './style.scss'
import MovesRecord from "../MovesRecord";
import TickerTape from "../TickerTape";
import underscore from "underscore/underscore";

import HeapMap from "./heapMap";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


export default function GameBoard({nextMover, setPlayAgain}) {
    const [mover, setMover] = useState(nextMover);

    const [coinCounts, setCoinCounts] = useState([...Array(5).keys()].map(_ => getRandomInt(1, 10)));

    const [movesLog, setMovesLog] = useState([]);
    const [moveNum, setMoveNum] = useState(0);

    console.log(`GAME_BOARD: START --> GameBoard: start: mover = ${mover}`)

    // const t1 = zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
    // console.log(`t1 = ${t1}`)

    let moveInfo = {}
    const heapNames = ['A', 'B', 'C', 'D', 'E']

    const coinCountStr = (coinCounts) => {
        const str = coinCounts.map((v, index) => `${heapNames[index]}${v}`).join("-")
        console.log(`coinCountStr(): (coinCounts, str) = (${coinCounts}, ${str})`)

        return str
    }

    const moveStr = (heapNum, count) => `${heapNames[heapNum]}${count}`

    const makePlayerMove = (heapNum, count) => {
        console.log(`\nMAKE-PLAYER-MOVE(): (heapNum, count) = (${heapNum}, ${count})`)

        let newCoinCounts = Array.from(coinCounts)
        newCoinCounts[heapNum] -= count

        const newMoveNum  = moveNum  + 1
        setMoveNum(newMoveNum)

        let newMovesLog = Array.from(movesLog)
        moveInfo = {
            'Move #': newMoveNum,
            'Made by': mover,

            'Before': coinCountStr(coinCounts),
            'Move': moveStr(heapNum, count),
            'After': coinCountStr(newCoinCounts),
        }

        setCoinCounts([...Array(5).keys()].map(n => newCoinCounts[n]))
        console.log(`makePlayerMove: (newCoinCounts, coinCounts) = (${newCoinCounts}, ${coinCounts})`)

        newMovesLog.push(moveInfo)
        setMovesLog(newMovesLog)

        setMover('COMPUTER')
    }

    const getRandomMove = () => {
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

        return {heapNum: heapNum, count: count}
    }

    const makeComputerMove = () => {
        // let heapNum = -1
        // let count = -1
        //
        // while (true) {
        //     heapNum = getRandomInt(0, 5)
        //     if (coinCounts[heapNum] <= 0) {
        //         continue
        //     }
        //     count = getRandomInt(1, coinCounts[heapNum] + 1)
        //     break
        // }

        const {heapNum, count} = getRandomMove()

        console.log(`\nMAKE-COMPUTER-MOVE(): (heapNum, count) = (${heapNum}, ${count})`)

        let newCoinCounts = Array.from(coinCounts)
        newCoinCounts[heapNum] -= count

        const newMoveNum  = moveNum  + 1
        setMoveNum(newMoveNum)

        let newMovesLog = Array.from(movesLog)
        moveInfo = {
            'Move #': newMoveNum,
            'Made by': mover,

            'Before': coinCountStr(coinCounts),
            'Move': moveStr(heapNum, count),
            'After': coinCountStr(newCoinCounts),
        }

        setCoinCounts([...Array(5).keys()].map(n => newCoinCounts[n]))
        console.log(`makeComputerMove: (newCoinCounts, coinCounts) = (${newCoinCounts}, ${coinCounts})`)

        newMovesLog.push(moveInfo)
        setMovesLog(newMovesLog)

        setMover('PLAYER')
    }

    const playAgain = () => {
        setCoinCounts([...Array(5).keys()].map(_ => getRandomInt(1, 10)))
        setMovesLog([])
        setMoveNum(0)

        setMover(nextMover)
    }

    const hm = new HeapMap({heapNames: heapNames, coinCounts: coinCounts})
    const heapMap = hm.heapMap

    const coinsLeft = hm.coinsLeft()

    if (!coinsLeft) {
        const winner = (mover === 'COMPUTER') ? 'PLAYER' : 'COMPUTER'
        return (
            <div className={'gameBoardContainer'}>
                <TickerTape  movesLog={movesLog}/>

                <h2>{'------ GAME OVER -------'}</h2>
                <h2>{`------ WINNER IS: ${winner } -------`}</h2>

                <Button variant="primary" id={'playAgain'} size="lg" onClick={playAgain}>Play again</Button>
            </div>
        )
    }

    if (mover === 'COMPUTER') {
        makeComputerMove()
    }

    return (
        <div className={'gameBoardContainer'}>
            {moveNum > 0 && <TickerTape  movesLog={movesLog}/>}

            <div className={'gameBoard'}>
                {
                    Array.from(heapMap.keys()).map(key =>
                        <CoinHeap name={`${key}`} coinCount={heapMap.get(key)} updateCoinCounts={makePlayerMove}/>
                    )
                }
            </div>
        </div>
    );
}
