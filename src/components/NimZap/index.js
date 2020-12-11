/**
 * Created by J.Vidya Sagar on 12/10/20.
 */

import React, { useState } from 'react'

import {Button, ButtonGroup, Popover, OverlayTrigger, ToggleButton} from 'react-bootstrap'

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

const HelpInstructions = () => {
    const help = `
                    You will be presented with a game board consisting of 3 heaps of coins.
                    Each heap contains at least one coin and at most 9 coins.

                    There are two players in the game - you and the computer.
                    Each player makes moves alternately.

                    On each move, a player chooses a non-empty heap and removes
                    one or more coins from the heap.

                    The player who takes the last coin on the board is declared
                    to have won the game.
    `
    const instructions = `
                            At the start of the game, you can choose to go first or let the
                             computer make the first move.
                            
                             Heaps of coins are referred to by letters 'a b c'.
                            
                             You indicate your move by entering a string like 'b3',
                             meaning you want to remove 3 coins from heap b.
     `

    const textStrings = {
        'Help': help,
        'Instructions': instructions
    }
    return (
        <>
            {['Help', 'Instructions'].map((title) => (
                <OverlayTrigger
                    trigger="click"
                    key={title}
                    placement={'bottom'}
                    overlay={
                        <Popover id={`popover-positioned-bottom`}>
                            <Popover.Title as="h3">{`${title}`}</Popover.Title>
                            <Popover.Content>
                                {`${textStrings[title]}`}
                                <strong>Holy guacamole!</strong> Check this info.
                            </Popover.Content>
                        </Popover>
                    }
                >
                    <Button variant="secondary">{title}</Button>
                </OverlayTrigger>
            ))}
        </>
    )
}


const FirstMover = (props) => {
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'PLAYER', value: '1' },
        { name: 'COMPUTER', value: '2' },
    ];

    return (
        <>
            <fieldset>
                <legend>First mover</legend>
                <ButtonGroup toggle>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>

                    ))}
                </ButtonGroup>
            </fieldset>
        </>
    );
}

export default function NimZap(props) {
    console.log("NimZap: start")

    return (
        <div>
            <HelpInstructions />
            <FirstMover />
        </div>
    );
}
