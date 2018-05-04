//Block Class, Containing our Block implementation
const SHA256 = require("crypto-js").SHA256;
const {DIFICULTY} = require("../config");


class Block {
    constructor(timestamp, previousHash, hash, data, nonce){
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }


    static genesis(){
        return new this("time", "------", "vjjJDjovsdv", [], 0);
    }

    static mineBlock(lastBlock, data){
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let nonce = 0;

        do{
            nonce++;
            timestamp = Date.now();
            hash = Block.hash(timestamp, lastHash, data,nonce);
        }while(hash.substring(0,DIFICULTY) !== "0".repeat(DIFICULTY));

        return new this(timestamp, lastHash, hash, data, nonce);
    }

    static hash(timestamp, lastHash, data, nonce){
        return SHA256(timestamp + lastHash + data + nonce).toString();
    }

    static blockHash(block){
        const {timestamp, previousHash, data, nonce} = block;

        return Block.hash(timestamp, previousHash, data, nonce);
    }

    toString(){
        return `
        Timestamp    : ${this.timestamp}
        Previous Hash: ${this.previousHash}
        Hash         : ${this.hash}
        Nonce        : ${this.nonce}
        Data         : ${this.data}`;
    }
};

module.exports = Block;