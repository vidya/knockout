
import {getRandomInt} from "./util";

export default class GamePlay {
    constructor(heapCount, coinCounts) {
        this.heapNames = "ABCDEFGHI".split('').slice(0, heapCount);
        this.coinCounts = coinCounts;

        this.heapMap = new Map()

        for (const [index, name] of this.heapNames.entries()) {
            if (coinCounts[index] > 0) {
                this.heapMap.set(name, this.coinCounts[index])
            }
        }

        this.heapCount = this.heapMap.size

        this.coinCounts = coinCounts

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

    getRandomMove() {
        const xy = this.coinCounts.map((count, index) => ({index, count}))
            .filter(x => x.count > 0)

        const t1 = getRandomInt(0, xy.length)
        const heapNum = xy[t1].index
        const count = getRandomInt(1, xy[t1].count + 1)

        return {heapNum, count}
    }

    getMove() {
        let heapNum = -1
        let count = -1

        if (this.heapCount === 1) {
            console.log(`\n--- CASE #1: ALL COINS FROM THE ONLY NONEMPTY HEAP`)

            // take all coins from the only non-empty heap
            this.coinCounts.forEach((value, index) => {
                if (value > 0) {
                    heapNum = index
                    count = value
                }
            })
        }
        else if ((this.heapCount === 2) && (this.singletonCount === 1)) {
            console.log(`\n--- CASE #2: ALL BUT ONE COINS FROM NON-SINGLETON HEAP`)

            // take all but one coins from the non-singleton heap
            this.coinCounts.forEach((value, index) => {
                if (value > 1) {
                    heapNum = index
                    count = value - 1
                }
            })
        }
        else if ((this.heapCount === 3) && (this.singletonCount === 2)) {
            console.log(`\n--- CASE #3: TAKE ALL COINS FROM THE ONLY NON-SINGLETON HEAP`)

            // take all coins from the only non-singleton heap
            this.coinCounts.forEach((value, index) => {
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
            const  {heapNum:heapNum1, count:count1} = this.getRandomMove()
            heapNum = heapNum1
            count = count1
        }

        return {heapNum, count}
    }
}
