import {useState} from "react";

/***
 *
 NimZap - Notes

 Board properties 
     heap-count ( # of heaps containing coins)
     Singleton-count ( # of heaps that contain only one coin)

 Winning positions
     (Heap-count == 1) — take all coins from the heap
     (Heap-count == 2) And (singleton-count == 1) — take all but one of the coins in the non-singleton heap
     (Heap-count == 3) And (singleton-count == 2) — take all coins from the non-singleton heap.
     --- ??? -- (Heap-count == 2) And (singleton-count == 0) and (doubleton-count == 1)— take all but one of the coins in the non-doubleton heap

 Losing positions
    (Heap-count == 2) And (singleton-count == 2) — what you choose won’t make a difference. Make a random choice.
 */

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
// }

import {getRandomInt} from "./util";

export default class GameState {
    constructor({heapCount, coinCounts}) {
        this.heapNames = "ABCDEFGHI".split('').slice(0, heapCount);
        this.coinCounts = coinCounts;

        this.heapMap = new Map()

        for (const [index, name] of this.heapNames.entries()) {
            if (coinCounts[index] > 0) {
                this.heapMap.set(name, this.coinCounts[index])
            }
        }

        this.heapCount = this.heapMap.size
        this.singletonCount = 0

        this.heapMap.forEach((value, key, map) => {
            if (value === 1) {
                this.singletonCount += 1
            }
        })

        this.doubletonCount = 0

        this.heapMap.forEach((value, key, map) => {
            if (value === 2) {
                this.doubletonCount += 1
            }
        })
    }

    static createRandomCoinCounts(heapCount) {
        return [...Array(heapCount).keys()].map(_ => getRandomInt(1, 10))
    }

    coinCountStr(coinCounts) {
        const str = coinCounts.map((v, index) => `${this.heapNames[index]}${v}`).join("-")
        console.log(`coinCountStr(): (coinCounts, str) = ([${coinCounts}], ${str})`)

        return str
    }

    coinsLeft() {
        return (this.heapMap.size > 0)
    }
}
