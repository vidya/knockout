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

    return (
        <div className={'gameBoardContainer'}>
            <div className={'gameBoard'}>
                <CoinHeap name={'A'} coinCount={coinCounts[0]} updateCoinCounts={updateCoinCounts}/>
                <CoinHeap name={'B'}  coinCount={coinCounts[1]} updateCoinCounts={updateCoinCounts}/>
                <CoinHeap name={'C'}  coinCount={coinCounts[2]} updateCoinCounts={updateCoinCounts}/>

                <CoinHeap name={'D'}  coinCount={coinCounts[3]} updateCoinCounts={updateCoinCounts}/>
                <CoinHeap name={'E'}  coinCount={coinCounts[4]} updateCoinCounts={updateCoinCounts}/>
            </div>
        </div>
    );
}
