

export default class GamePlay {
    // constructor(gameState) {
    //     this.gameState = gameState
    // }

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
            const  {heapNum:heapNum1, count:count1} = hm.getRandomMove()
            heapNum = heapNum1
            count = count1
        }

        return {heapNum, count}
    }

    // generateNextMove(gameState, lastMoveNum, moverName, heapNum, count) {
    //     let newCoinCounts = Array.from(gameState.coinCounts)
    //     newCoinCounts[heapNum] -= count
    //
    //     const newMoveNum  = lastMoveNum  + 1
    //
    //     let newMovesLog = Array.from(this.movesLog)
    //     const moveInfo = {
    //         'Move #': newMoveNum,
    //         'Made by': moverName,
    //
    //         'Before': gameState.coinCountStr(gameState.coinCounts),
    //         'Move': `${gameState.heapNames[heapNum]}${count}`,
    //         'After': gameState.coinCountStr(newCoinCounts),
    //     }
    //     newMovesLog.push(moveInfo)
    //
    //     return {
    //         newMoveNum,
    //         newCoinCounts,
    //         newMovesLog,
    //     }
    // }
}
