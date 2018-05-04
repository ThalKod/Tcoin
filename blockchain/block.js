//Block Class, Containing our Block implementation
const SHA256 = require("crypto-js").SHA256;
const {DIFICULTY, MINE_RATE} = require("../config");


class Block {
    constructor(timestamp, previousHash, hash, data, nonce, dificulty){
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.dificulty = dificulty || DIFICULTY;
    }


    static genesis(){
        return new this("time", "------", "vjjJDjovsdv", [], 0, DIFICULTY);
    }

    static mineBlock(lastBlock, data){
        let hash, timestamp;
        let {dificulty} = lastBlock;
        const lastHash = lastBlock.hash;
        let nonce = 0;

        do{
            nonce++;
            timestamp = Date.now();
            dificulty = Block.adjustDificulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data,nonce, dificulty);
        }while(hash.substring(0,dificulty) !== "0".repeat(dificulty));

        return new this(timestamp, lastHash, hash, data, nonce, dificulty);
    }

    static hash(timestamp, lastHash, data, nonce, dificulty){
        return SHA256(timestamp + lastHash + data + nonce + dificulty).toString();
    }

    static blockHash(block){
        const {timestamp, previousHash, data, nonce, dificulty} = block;
        return Block.hash(timestamp, previousHash, data, nonce, dificulty);
    }

    static adjustDificulty(lastBlock, curentTime){
        let {dificulty} = lastBlock;
        dificulty = lastBlock.timestamp + MINE_RATE > curentTime ? dificulty + 1 : dificulty - 1;
        return dificulty;
    }

    toString(){
        return `
        Timestamp    : ${this.timestamp}
        Previous Hash: ${this.previousHash}
        Hash         : ${this.hash}
        Nonce        : ${this.nonce}
        Dificulty    : ${this.dificulty}
        Data         : ${this.data}`;
    }
};

module.exports = Block;