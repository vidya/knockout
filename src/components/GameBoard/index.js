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

// const FirstMover = ({chooseFirstMover}) => {
//     const [radioValue, setRadioValue] = useState('1');
//
//     const radios = [
//         { name: 'PLAYER', value: '1' },
//         { name: 'COMPUTER', value: '2' },
//     ];
//
//     const changeFirstMover = e => {
//         setRadioValue(e.currentTarget.value)
//
//         if (e.currentTarget.value === '1') {
//             chooseFirstMover('PLAYER')
//         }
//         else {
//             chooseFirstMover('COMPUTER')
//         }
//     }
//
//     return (
//         <>
//             <fieldset>
//                 <legend>First mover</legend>
//                 <ButtonGroup toggle>
//                     {radios.map((radio, idx) => (
//                         <ToggleButton
//                             key={idx}
//                             className={'playerToggleButton'}
//                             type="radio"
//                             variant="secondary"
//                             name="radio"
//                             value={radio.value}
//                             checked={radioValue === radio.value}
//                             onChange={changeFirstMover}
//                         >
//                             {radio.name}
//                         </ToggleButton>
//                     ))}
//                 </ButtonGroup>
//             </fieldset>
//         </>
//     );
// }

// export default function GameBoard({firstMover}) {
export default function GameBoard({nextMover}) {
    const [mover, setMover] = useState(nextMover);

    const [coinCounts, setCoinCounts] = useState([...Array(5).keys()].map(_ => getRandomInt(1, 10)));

    const [movesLog, setMovesLog] = useState([]);
    const [moveNum, setMoveNum] = useState(0);

    console.log(`GAME_BOARD: START --> GameBoard: start: mover = ${mover}`)

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

        // const beforeCounts = coinCountStr(coinCounts)

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
                            <CoinHeap name={`${key}`} coinCount={heapMap.get(key)} updateCoinCounts={makePlayerMove}/>
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
                        <CoinHeap name={`${key}`} coinCount={heapMap.get(key)} updateCoinCounts={makePlayerMove}/>
                    )
                }
            </div>
        </div>
    );
}
