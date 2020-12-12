/**
 * Created by J.Vidya Sagar on 12/11/20.
 */

import React, { useState } from 'react'

import {Button, ButtonGroup, Popover, OverlayTrigger, ToggleButton} from 'react-bootstrap'
import CoinHeap from "../CoinHeap";

import './style.scss'

export default function GameBoard(props) {
    console.log("GameBoard: start")

    return (
        <div className={'gameBoardContainer'}>
            <div className={'gameBoard'}>
                <CoinHeap coinCount={1}/>
                <CoinHeap coinCount={1}/>
                <CoinHeap coinCount={1}/>
                <CoinHeap coinCount={1}/>
                <CoinHeap coinCount={1}/>
            </div>
        </div>
    );
}
