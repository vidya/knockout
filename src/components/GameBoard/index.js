/**
 * Created by J.Vidya Sagar on 12/11/20.
 */

import React, { useState } from 'react'

import CoinHeap from "../CoinHeap";
import {Button, ButtonGroup, ToggleButton} from "react-bootstrap";

import './style.scss'
import TickerTape from "../TickerTape";

import GameState from "../Backend/gameState";
import Move from "../Backend/move";
import GamePlay from "../Backend/gamePlay"

const DisplayInstructions = () => (
    <div id={'gameDescription'}>
        <p>
            This is a Man vs Machine game. The game board contains five columns labeled A, B,C,D, and E.
            Each column contains bricks numbered 1, 2, 3 etc. with brick 1 being the topmost and numbers
            increasing as you go down the column.
        </p>

        <p>
            Each player takes turns at punching one or more bricks from a single column. When a brick is
            punched, that brick and all the bricks above it are removed from the board.
            For example if brick number 3 in column B is punched, then brick number 3 and the bricks
            numbered 2 and 1 sitting above the punched brick 3 in column B, are all removed the board.
            Bricks if any in the affected column are re-numbered with the top most brick being labeled
            as the new number 1 brick.
        </p>

        <p>
            Aim of the game is to remove, with a last knockout punch, all the bricks from the last
            remaining column. Player delivering the knockout punch wins the game.
        </p>
    </div>
)

const FirstMover = ({chooseFirstMover}) => {
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'PLAYER', value: '1' },
        { name: 'COMPUTER', value: '2' },
    ];

    const changeFirstMover = e => {
        setRadioValue(e.currentTarget.value)

        if (e.currentTarget.value === '1') {
            chooseFirstMover('PLAYER')
        }
        else {
            chooseFirstMover('COMPUTER')
        }
    }

    return (
        <>
            <fieldset>
                <legend>First mover</legend>
                <ButtonGroup toggle>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            className={'playerToggleButton'}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={changeFirstMover}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </fieldset>
        </>
    );
}


// export default function GameBoard({gameMode, nextMover, heapCount: heapCountStr, setPlayAgain}) {
export default function GameBoard({gameMode, nextMover, heapCount: heapCountStr, setPlayAgain}) {
    const [displayInstructions, setDisplayInstructions] = useState(true)

    const [displayFirstMover, setDisplayFirstMover] = useState(true)
    const [mover, setMover] = useState(nextMover);
    const [firstMover, setFirstMover] = useState('PLAYER');

    const heapCount = parseInt(heapCountStr)
    const [coinCounts, setCoinCounts] = useState(GameState.createRandomCoinCounts(heapCount))

    const [movesLog, setMovesLog] = useState([]);
    const [moveNum, setMoveNum] = useState(0);

    console.log(`GAME_BOARD: START --> GameBoard: start: (heapCount, mover) = (${heapCount}, ${mover})`)
    console.log(`--> GameBoard: start: (coinCounts) = ([${coinCounts})]`)
    console.log(`--> GameBoard: start: (mover) = ([${mover})]`)

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
        setDisplayFirstMover(false)
    }

    const makeComputerMove = () => {
        const hm = new GameState({heapCount, coinCounts})

        const gp = new GamePlay(heapCount, coinCounts)
        const {heapNum, count } = gp.getMove(hm)

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

    const chooseFirstMover = (choice) => {
        setFirstMover(choice)
        setMover(choice)
        setDisplayFirstMover(false)
    }

    const playAgain = () => {
        setCoinCounts(GameState.createRandomCoinCounts(heapCount))
        setMovesLog([])
        setMoveNum(0)
        setDisplayInstructions(false)
        setDisplayFirstMover(true)

        setMover(nextMover)
    }

    if (!hm.coinsLeft()) {
        // const winner = (mover === 'COMPUTER') ? 'PLAYER' : 'COMPUTER'
        const winMessage = (mover === 'COMPUTER') ? 'You win! Congratulations!' : 'Computer wins. Try Again'

        return (
            <div className={'gameBoardContainer'}>
                <div className={'gameBoard'}>
                    {
                        gameMode === 'practice' &&
                        <TickerTape  movesLog={movesLog}/>
                    }

                    {/*<h2>{'------ GAME OVER -------'}</h2>*/}
                    {/*<h2>{`------ WINNER IS: ${winner } -------`}</h2>*/}
                    <div id={'winMessage'} >
                        <h1>{`${winMessage } `}</h1>
                        <Button variant="primary" id={'playAgain'} size="lg" onClick={playAgain}>Play again</Button>
                    </div>

                </div>
            </div>
        )
    }

    if (mover === 'COMPUTER') {
        makeComputerMove()
    }

    return (

        <div className={'gameBoardContainer'}>
            { displayInstructions && <DisplayInstructions /> }

            <div className={'gameBoard'}>
                {
                    hm.heapNames.map((value, index) =>
                        <CoinHeap
                            key={`${value}`}
                            name={`${value}`}
                            index={`${index}`}
                            coinCount={coinCounts[index]}
                            makePlayerMove={makePlayerMove}/>
                    )
                }
            </div>

            { displayFirstMover &&
                <div id={'firstMover'}>
                <FirstMover chooseFirstMover={chooseFirstMover}/>
                {/*<FirstMover chooseFirstMover={chooseFirstMover}/>*/}
            </div>
            }

            <div id={`tickerTapeDiv`}>
                <TickerTape  movesLog={movesLog}/>
            </div>


            {/*{moveNum > 0 && <TickerTape  movesLog={movesLog}/>}*/}
            {
                gameMode === 'practice' && moveNum > 0 &&
                <TickerTape  movesLog={movesLog}/>
            }

        </div>
    );
}
