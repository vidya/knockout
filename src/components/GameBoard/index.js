/**
 * Created by J.Vidya Sagar on 12/11/20.
 */

import React, { useState } from 'react'

import CoinHeap from "../CoinHeap";
import {Button} from "react-bootstrap";

import './style.scss'
import TickerTape from "../TickerTape";

import GameState from "../Backend/gameState";
import Move from "../Backend/move";

export default function GameBoard({nextMover, heapCount: heapCountStr, setPlayAgain}) {
    const [mover, setMover] = useState(nextMover);

    const heapCount = parseInt(heapCountStr)
    const [coinCounts, setCoinCounts] = useState(GameState.createRandomCoinCounts(heapCount))

    const [movesLog, setMovesLog] = useState([]);
    const [moveNum, setMoveNum] = useState(0);

    console.log(`GAME_BOARD: START --> GameBoard: start: (heapCount, mover) = (${heapCount}, ${mover})`)
    console.log(`--> GameBoard: start: (coinCounts) = ([${coinCounts})]`)

    const hm = new GameState({heapCount: heapCount, coinCounts: coinCounts})

    const move = new Move(movesLog)

    const makePlayerMove = (heapNum, count) => {
        const hm = new GameState({heapCount: heapCount, coinCounts: coinCounts})
        const {newMoveNum,
            newCoinCounts,
            newMovesLog,} = move.generateNextMove(hm, moveNum, mover, heapNum, count)

        console.log(`\nMAKE-PLAYER-MOVE(): (moveNum, heapNum, count) = (${newMoveNum}, ${heapNum}, ${count})`)
        console.log(`makePlayerMove: (newCoinCounts, coinCounts) = (${newCoinCounts}, ${coinCounts})`)

        setMoveNum(newMoveNum)
        setCoinCounts([...Array(heapCount).keys()].map(n => newCoinCounts[n]))
        setMovesLog(newMovesLog)
        setMover('COMPUTER')
    }

    const makeComputerMove = () => {
        let heapNum = -1
        let count = -1

        const hm = new GameState({heapCount, coinCounts})
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
            const  {heapNum:heapNum1, count:count1} = hm.getRandomMove()
            heapNum = heapNum1
            count = count1
        }

        const {newMoveNum,
            newCoinCounts,
            newMovesLog,} = move.generateNextMove(hm, moveNum, mover, heapNum, count)

        console.log(`\nMAKE-COMPUTER-MOVE(): (moveNum, heapNum, count) = (${newMoveNum}, ${heapNum}, ${count})`)
        console.log(`makeComputerMove: (newCoinCounts, coinCounts) = (${newCoinCounts}, ${coinCounts})`)

        setMoveNum(newMoveNum)
        setCoinCounts([...Array(heapCount).keys()].map(n => newCoinCounts[n]))
        setMovesLog(newMovesLog)
        setMover('PLAYER')
    }

    const playAgain = () => {
        setCoinCounts(GameState.createRandomCoinCounts(heapCount))
        setMovesLog([])
        setMoveNum(0)

        setMover(nextMover)
    }

    if (!hm.coinsLeft()) {
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
                    hm.heapNames.map((value, index) =>
                        <CoinHeap
                            name={`${value}`}
                            index={`${index}`}
                            coinCount={coinCounts[index]}
                            makePlayerMove={makePlayerMove}/>
                    )
                }
            </div>
        </div>
    );
}
