

export default class HeapMap {
    constructor({heapNames, coinCounts}) {
        this.heapNames = heapNames;
        this.coinCounts = coinCounts;

        this.heapMap = new Map()

        for (const [index, name] of this.heapNames.entries()) {
            if (coinCounts[index] > 0) {
                this.heapMap.set(name, this.coinCounts[index])
            }
        }
    }

    identify() {
        console.log(this.type);
    }

    coinsLeft() {
        return (this.heapMap.size > 0)
    }
}
