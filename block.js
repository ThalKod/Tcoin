//Block Class, Containing our Block implementation
const SHA256 = require("crypto-js").SHA256;


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
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data){
        return SHA256(timestamp + lastHash + data).toString();
    }

    static blockHash(block){
        const {timestamp, previousHash, data} = block;

        return Block.hash(timestamp, previousHash, data);
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