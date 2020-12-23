/**
 * Created by J.Vidya Sagar on 12/10/20.
 */

import React from 'react'
import GameSetup from "../GameSetup"

import './style.scss'

/***
 Overview
 --------
 You will be presented with a game board consisting of 3 heaps of coins.
 Each heap contains at least one coin and at most 9 coins.

 There are two players in the game - you and the computer.
 Each player makes moves alternately.

 On each move, a player chooses a non-empty heap and removes
 one or more coins from the heap.

 The player who takes the last coin on the board is declared
 to have won the game.

 Instructions
 ------------
 At the start of the game, you can choose to go first or let the
 computer make the first move.

 Heaps of coins are referred to by letters 'a b c'.

 You indicate your move by entering a string like 'b3',
 meaning you want to remove 3 coins from heap b.
 */


export default function NimZap() {
    console.log(`NimZap: start` )

    return (
        <div id={'homeContainer'}>

            <GameSetup />
        </div>

    )
}
