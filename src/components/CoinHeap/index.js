/**
 * Created by J.Vidya Sagar on 12/11/20.
 */

import React, { useState } from 'react'

import {Button, ButtonGroup, Popover, OverlayTrigger,
    ToggleButton, ToggleButtonGroup} from 'react-bootstrap'

import './style.scss'

const CoinRow = (props) => {
    const [chosenNum, setChosenNum] = useState(0);

    const coinCount = props.coinCount
    const choiceNums = [...Array(coinCount).keys()].map(n => n + 1)
    const chosenNumStyle = {backgroundColor: 'lightgreen'}

    return (
        <>
            <ul className={'coinList'}>
            {
                choiceNums.map((cnum, index) =>
                        <li key={cnum} className={'coinListItem'}>
                            {' '}
                        </li>
                )
            }
            </ul>
        </>
    );
}

const KeyPad = (props) => {
    const [chosenNum, setChosenNum] = useState(0);

    const coinCount = props.coinCount
    const choiceNums = [...Array(coinCount).keys()].map(n => n + 1)
    const chosenNumStyle = {backgroundColor: 'lightgreen'}

    const choiceNumClick = e => {
        console.log(`choiceNumClick(): e: ${e}`)
        const cNum = parseInt(e.target.dataset.choice)
        setChosenNum(cNum)
        console.log(`chosenNum: ${cNum}`)
    }

    return (
        <>
            <ul className={'choiceNumList'}>
            {
                choiceNums.map((cnum, index) =>
                    (cnum === chosenNum) ?
                        <li key={cnum} style={chosenNumStyle} className={'choiceNumItem'} onClick={choiceNumClick}  data-choice={cnum}>
                            {cnum}
                        </li>
                        :
                        <li key={cnum} className={'choiceNumItem'} onClick={choiceNumClick}  data-choice={cnum}>
                            {cnum}
                        </li>
                )
            }
        </ul>
        </>
    );
}

export default function CoinHeap(props) {
    console.log("CoinHeap: start")

    return (
        <div className={'heapContainer'}>
            <div className={'keyPad'}>
                <CoinRow coinCount={props.coinCount}/>
                <KeyPad coinCount={props.coinCount}/>
            </div>
        </div>
    );
}
