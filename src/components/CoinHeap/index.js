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
                choiceNums.map(cnum =>
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
    console.log(`KeyPad: start: (name, index, coinCount)=(${name}, ${index}, ${coinCount})`)
    const countChoices = [...Array(coinCount).keys()].map(n => n + 1)

    const countClick = e => {
        console.log(`countClick(): e: ${e}`)
        const cNum = parseInt(e.target.dataset.choice)

        makePlayerMove(index, cNum)
        console.log(`chosen: heap-count = ${name}-${cNum}`)
    }

    return (
        <>
            <ul className={'choiceNumList'}>
            {
                countChoices.map(cnum =>
                        <li key={cnum} className={'choiceNumItem'}
                            onClick={countClick}  data-choice={cnum}>
                            {cnum}
                        </li>
                )
            }
        </ul>
        </>
    );
}

export default function CoinHeap({name, index, coinCount, makePlayerMove}) {
    console.log(`KeyPad: start: coinCount=${coinCount}`)
    console.assert((coinCount > 0) && (coinCount < 10), `===>  -${coinCount}- is invalid`)
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
