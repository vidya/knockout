import React, { useState } from 'react'
import {Button, ButtonGroup, Popover, OverlayTrigger, ToggleButton} from 'react-bootstrap'
import GameBoard from "../GameBoard";

import './style.scss'

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
                            </Popover.Content>
                        </Popover>
                    }
                >
                    <Button variant="secondary" className={"helpButton"}>{title}</Button>
                </OverlayTrigger>
            ))}
        </>
    )
}

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

const HeapCount = ({chooseHeapCount}) => {
    const [heapCountValue, setHeapCountValue] = useState('7');

    const heapCountRadios = [
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' },
        { name: '9', value: '9' },
    ];

    const changeHeapCount = e => {
        setHeapCountValue(e.currentTarget.value)

        const heapCount = parseInt(e.currentTarget.value)
        // if (e.currentTarget.value === '5') {
        //     chooseHeapCount(5)
        // }
        // else {
        //     chooseHeapCount(7)
        // }
        chooseHeapCount(heapCount)
    }

    return (
        <>
            <fieldset>
                <legend>Heap count</legend>
                <ButtonGroup toggle>
                    {heapCountRadios.map((heapCount, idx) => (
                        <ToggleButton
                            key={idx}
                            className={'heapCountToggleButton'}
                            type="radio"
                            variant="secondary"

                            name="heapCount"
                            value={heapCount.value}

                            checked={heapCountValue === heapCount.value}
                            onChange={changeHeapCount}
                        >
                            {heapCount.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </fieldset>
        </>
    );
}

export default function GameSetup() {
    const [firstMover, setFirstMover] = useState('PLAYER');
    const [heapCount, setHeapCount] = useState('7');
    const [playAgain, setPlayAgain] = useState(true);

    const chooseFirstMover = (choice) => {
        setFirstMover(choice)
    }

    const chooseHeapCount = (choice) => {
        setHeapCount(choice)
    }

    console.log(`--> GameSetup: start` )

    if (playAgain) {
        return (
            <div id={'topContainer'}>
                <div className={'helpInstructions'}>
                    <HelpInstructions/>
                </div>

                <div id={'firstMover'}>
                    <FirstMover chooseFirstMover={chooseFirstMover}/>
                </div>

                <div id={'heapCount'}>
                    <HeapCount chooseHeapCount={chooseHeapCount}/>
                </div>

                <div>
                    <GameBoard
                        nextMover={firstMover}
                        heapCount={heapCount}
                        setPlayAgain={setPlayAgain}/>
                </div>
            </div>
        );
    } else {
        return (
            <div id={'topContainer'}>
                <div className={'helpInstructions'}>
                    <HelpInstructions/>
                </div>

                <div>
                    <h2>Thank you for playing NimZap!</h2>
                    <h4>Please visit again!</h4>
                </div>
            </div>
        );
    }
}
