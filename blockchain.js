const  Block = require("./block");

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        const lasBlock = this.chain[this.chain.length -1];
        const block = Block.mineBlock(lasBlock, data);
        this.chain.push(block);

        return block;
    }
}

module.exports = Blockchain;