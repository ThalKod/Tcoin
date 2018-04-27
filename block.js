//Block Class, Containing our Block implementation
class Block {
    constructor(timestamp, previousHash, hash, data){
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
    }


    static genesis(){
        return new this("time", "------", "vjjJDjovsdv", []);
    }

    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = "okokaak";

        return new this(timestamp, lastHash, hash, data);
    }

    toString(){
        return `
        Timestamp    : ${this.timestamp}
        Previous Hash: ${this.previousHash}
        Hash         : ${this.hash}
        Data         : ${this.data}`;
    }
};

module.exports = Block;