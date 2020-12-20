
import {getRandomInt} from "./util";

export default class GamePlay {
    // constructor(gameState) {
    //     this.gameState = gameState
    // }

    static getRandomMove(gameState) {
        const xy = gameState.coinCounts.map((count, index) => ({index, count}))
            .filter(x => x.count > 0)

        const t1 = getRandomInt(0, xy.length)
        const heapNum = xy[t1].index
        const count = getRandomInt(1, xy[t1].count + 1)

        return {heapNum, count}
    }

    static getMove(gameState) {
        const hm = gameState

        let heapNum = -1
        let count = -1

        if (hm.heapCount === 1) {
            console.log(`\n--- CASE #1: ALL COINS FROM THE ONLY NONEMPTY HEAP`)

            // take all coins from the only non-empty heap
            hm.coinCounts.forEach((value, index) => {
                if (value > 0) {
                    heapNum = index
                    count = value
                }
            })
        }
        else if ((hm.heapCount === 2) && (hm.singletonCount === 1)) {
            console.log(`\n--- CASE #2: ALL BUT ONE COINS FROM NON-SINGLETON HEAP`)

            // take all but one coins from the non-singleton heap
            hm.coinCounts.forEach((value, index) => {
                if (value > 1) {
                    heapNum = index
                    count = value - 1
                }
            })
        }
        else if ((hm.heapCount === 3) && (hm.singletonCount === 2)) {
            console.log(`\n--- CASE #3: TAKE ALL COINS FROM THE ONLY NON-SINGLETON HEAP`)

            // take all coins from the only non-singleton heap
            hm.coinCounts.forEach((value, index) => {
                if (value > 1) {
                    heapNum = index
                    count = value
                }
            })
        }

            // else if ((hm.heapCount === 2) && (hm.singletonCount === 0)
            //         && (hm.doubletonCount === 1)) {
            //     console.log(`\n--- CASE #4: TAKE ALL BUT ONE COINS FROM THE ONLY NON-DOUBLETON HEAP`)
            //
            //     // take all but one coins from the only non-doubleton heap
            //     coinCounts.forEach((value, index) => {
            //         if (value > 2) {
            //             heapNum = index
            //             count = value - 1
            //         }
            //     })
        // }
        else {
            console.log(`\n--- CASE #0: RANDOM MOVE`)
            // const  {heapNum:heapNum1, count:count1} = hm.getRandomMove()
            const  {heapNum:heapNum1, count:count1} = GamePlay.getRandomMove(gameState)
            heapNum = heapNum1
            count = count1
        }

        return {heapNum, count}
    }
}
