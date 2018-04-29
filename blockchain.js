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

    isValidChain(chain){
        //IF the chains don't have the same Genesis block
        if(JSON.stringify(chain[0]) !== JSON.stringify(this.chain[0])){
            return false;
        }

        //Checking if chain of block is valid
        for(let i=1; i < chain.length; i++){
            const block = chain[i];
            const lasBlock = chain[i-1];
            
            if(block.previousHash !== lasBlock.hash || block.hash !== Block.blockHash(block)){
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;