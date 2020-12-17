/**
 * Created by J.Vidya Sagar on 12/11/20.
 */

import React, { useState } from 'react'

import CoinHeapUI from "../CoinHeapUI";
import {Button} from "react-bootstrap";

import './style.scss'
import TickerTape from "../TickerTape";

import CoinHeaps from "./coinHeaps";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


export default function GameBoard({nextMover, heapCount: heapCountStr, setPlayAgain}) {
    const [mover, setMover] = useState(nextMover);

    const heapCount = parseInt(heapCountStr)
    const [coinCounts, setCoinCounts] = useState([...Array(heapCount).keys()].map(_ => getRandomInt(1, 10)));

    const [movesLog, setMovesLog] = useState([]);
    const [moveNum, setMoveNum] = useState(0);

    console.log(`GAME_BOARD: START --> GameBoard: start: (heapCount, mover) = (${heapCount}, ${mover})`)
    console.log(`--> GameBoard: start: (coinCounts) = ([${coinCounts})]`)

    let moveInfo = {}
    const hm = new CoinHeaps({heapCount: heapCount, coinCounts: coinCounts})

    // const heapNames = hm.heapNames

    const moveStr = (heapNum, count) => `${hm.heapNames[heapNum]}${count}`

    const makePlayerMove = (heapNum, count) => {
        let newCoinCounts = Array.from(coinCounts)
        newCoinCounts[heapNum] -= count

        const newMoveNum  = moveNum  + 1
        setMoveNum(newMoveNum)

        console.log(`\nMAKE-PLAYER-MOVE(): (moveNum, heapNum, count) = (${newMoveNum}, ${heapNum}, ${count})`)

        let newMovesLog = Array.from(movesLog)
        moveInfo = {
            'Move #': newMoveNum,
            'Made by': mover,

            'Before': hm.coinCountStr(coinCounts),
            'Move': moveStr(heapNum, count),
            'After': hm.coinCountStr(newCoinCounts),
        }

        setCoinCounts([...Array(heapCount).keys()].map(n => newCoinCounts[n]))
        console.log(`makePlayerMove: (newCoinCounts, coinCounts) = (${newCoinCounts}, ${coinCounts})`)

        newMovesLog.push(moveInfo)
        setMovesLog(newMovesLog)

        setMover('COMPUTER')
    }

    const getRandomMove = () => {
        let heapNum = -1
        let count = -1

        while (true) {
            heapNum = getRandomInt(0, heapCount)
            if (coinCounts[heapNum] <= 0) {
                continue
            }
            count = getRandomInt(1, coinCounts[heapNum] + 1)
            break
        }

        return {heapNum: heapNum, count: count}
    }

    const makeComputerMove = () => {
        let heapNum = -1
        let count = -1

        // const hm = new CoinHeaps({heapNames, coinCounts})
        const hm = new CoinHeaps({heapCount, coinCounts})
        if (hm.heapCount === 1) {
            console.log(`\n--- CASE #1: ALL COINS FROM THE ONLY NONEMPTY HEAP`)

            // take all coins from the only non-empty heap
            coinCounts.forEach((value, index) => {
                if (value > 0) {
                    heapNum = index
                    count = value
                }
            })
        }
        else if ((hm.heapCount === 2) && (hm.singletonCount === 1)) {
            console.log(`\n--- CASE #2: ALL BUT ONE COINS FROM NON-SINGLETON HEAP`)

            // take all but one coins from the non-singleton heap
            coinCounts.forEach((value, index) => {
                if (value > 1) {
                    heapNum = index
                    count = value - 1
                }
            })
        }
        else if ((hm.heapCount === 3) && (hm.singletonCount === 2)) {
            console.log(`\n--- CASE #3: TAKE ALL COINS FROM THE ONLY NON-SINGLETON HEAP`)

            // take all coins from the only non-singleton heap
            coinCounts.forEach((value, index) => {
                if (value > 1) {
                    heapNum = index
                    count = value
                }
            })
        }
        // else if ((hm.heapCount === 2) && (hm.singletonCount === 0)
        //         && (hm.doubletonCount === 1)) {
        //     console.log(`\n--- CASE #4: TAKE ALL BUT ONE COINS FROM THE ONLY NON-DOUBLETON HEAP`)
        //
        //     // take all but one coins from the only non-doubleton heap
        //     coinCounts.forEach((value, index) => {
        //         if (value > 2) {
        //             heapNum = index
        //             count = value - 1
        //         }
        //     })
        // }
        else {
            console.log(`\n--- CASE #0: RANDOM MOVE`)
            const  {heapNum:heapNum1, count:count1} = getRandomMove()
            heapNum = heapNum1
            count = count1
        }


        let newCoinCounts = Array.from(coinCounts)
        newCoinCounts[heapNum] -= count

        const newMoveNum  = moveNum  + 1
        setMoveNum(newMoveNum)

        console.log(`\nMAKE-COMPUTER-MOVE(): (moveNum, heapNum, count) = (${newMoveNum}, ${heapNum}, ${count})`)

        let newMovesLog = Array.from(movesLog)
        moveInfo = {
            'Move #': newMoveNum,
            'Made by': mover,

            'Before': hm.coinCountStr(coinCounts),
            'Move': moveStr(heapNum, count),
            'After': hm.coinCountStr(newCoinCounts),
        }

        setCoinCounts([...Array(heapCount).keys()].map(n => newCoinCounts[n]))
        console.log(`makeComputerMove: (newCoinCounts, coinCounts) = (${newCoinCounts}, ${coinCounts})`)

        newMovesLog.push(moveInfo)
        setMovesLog(newMovesLog)

        setMover('PLAYER')
    }

    const playAgain = () => {
        setCoinCounts([...Array(heapCount).keys()].map(_ => getRandomInt(1, 10)))
        setMovesLog([])
        setMoveNum(0)

        setMover(nextMover)
    }

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
                    // Array.from(hm.heapNames).map((value, index) =>
                    hm.heapNames.map((value, index) =>
                        <CoinHeapUI name={`${value}`} coinCount={coinCounts[index]} updateCoinCounts={makePlayerMove}/>
                    )
                }
            </div>
        </div>
    );
}
