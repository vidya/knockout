

export default class Move {
    constructor(movesLog) {
        this.movesLog = movesLog
    }

    generateNextMove(gameState, lastMoveNum, moverName, heapNum, count) {
        let newCoinCounts = Array.from(gameState.coinCounts)
        newCoinCounts[heapNum] -= count

        const newMoveNum  = lastMoveNum  + 1

        let newMovesLog = Array.from(this.movesLog)
        const moveInfo = {
            'Move #': newMoveNum,
            'Made by': moverName,

            'Before': gameState.coinCountStr(gameState.coinCounts),
            'Move': `${gameState.heapNames[heapNum]}${count}`,
            'After': gameState.coinCountStr(newCoinCounts),
        }
        newMovesLog.push(moveInfo)

        return {
            newMoveNum,
            newCoinCounts,
            newMovesLog,
        }
    }
}
