/**
 * Created by J.Vidya Sagar on 12/11/20.
 */

import React from 'react'

import './style.scss'

const CoinRow = ({name, coinCount}) => {
    const choiceNums = [...Array(coinCount).keys()].map(n => n + 1)

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

const KeyPad = ({name, index, coinCount, makePlayerMove}) => {
    const countChoices = [...Array(coinCount).keys()].map(n => n + 1)

    const countChoiceClick = e => {
        console.log(`countChoiceClick(): e: ${e}`)
        const cNum = parseInt(e.target.dataset.choice)

        // const letMap = {
        //     'A': 0,
        //     'B': 1,
        //     'C': 2,
        //     'D': 3,
        //     'E': 4,
        //     'F': 5,
        //     'G': 6
        // }

        // updateCoinCounts(letMap[name], cNum)
        makePlayerMove(index, cNum)
        console.log(`chosen: heap-count = ${name}-${cNum}`)
    }

    return (
        <>
            <ul className={'choiceNumList'}>
            {
                countChoices.map((cnum, index) =>
                        <li key={cnum} className={'choiceNumItem'} onClick={countChoiceClick}  data-choice={cnum}>
                            {cnum}
                        </li>
                )
            }
        </ul>
        </>
    );
}

export default function CoinHeap({name, index, coinCount, makePlayerMove}) {
    return (
        <div className={'heapContainer'}>
            <div className={'keyPad'}>
                <h4 className={'heapName'}>{name}</h4>
                <CoinRow name={name} coinCount={coinCount}/>
                <KeyPad
                    name={name}
                    index={`${index}`}
                    coinCount={coinCount}
                    makePlayerMove={makePlayerMove}/>
            </div>
        </div>
    );
}
