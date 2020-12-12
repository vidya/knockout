/**
 * Created by J.Vidya Sagar on 12/11/20.
 */

import React, { useState } from 'react'

import CoinHeap from "../CoinHeap";

import './style.scss'

export default function GameBoard(props) {
    console.log("GameBoard: start")

    return (
        <div className={'gameBoardContainer'}>
            <div className={'gameBoard'}>
                <CoinHeap name={'A'} coinCount={1}/>
                <CoinHeap name={'B'}  coinCount={3}/>
                <CoinHeap name={'C'}  coinCount={7}/>
                <CoinHeap name={'D'}  coinCount={5}/>
                <CoinHeap name={'E'}  coinCount={8}/>
            </div>
        </div>
    );
}
