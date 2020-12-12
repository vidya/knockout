/**
 * Created by J.Vidya Sagar on 12/11/20.
 */

import React, { useState } from 'react'

import CoinHeap from "../CoinHeap";

import './style.scss'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export default function GameBoard(props) {
    console.log("GameBoard: start")
    const [coinCounts, setCoinCounts] = useState([...Array(5).keys()].map(n => getRandomInt(1, 10)));

    const updateCoinCounts = (heapNum, count) => {
        console.log(`updateCoinCounts: (heapNum, count) = (${heapNum}, ${count})`)

        let newCoinCounts = coinCounts
        newCoinCounts[heapNum] -= count
        setCoinCounts([...Array(5).keys()].map(n => newCoinCounts[n]))
        console.log(`updateCoinCounts: (newCoinCounts, coinCounts) = (${newCoinCounts}, ${coinCounts})`)
    }

    const names = ['A', 'B', 'C', 'D', 'E']
    let heapMap = new Map()

    for (const [index, name] of names.entries()) {
        if (coinCounts[index] > 0) {
            heapMap.set(name, coinCounts[index])
        }
    }

    return (
        <div className={'gameBoardContainer'}>
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
