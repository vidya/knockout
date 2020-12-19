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
import GamePlay from "../Backend/gamePlay"

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
        const hm = new GameState({heapCount, coinCounts})

        const {heapNum, count } = GamePlay.getMove(hm)
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
