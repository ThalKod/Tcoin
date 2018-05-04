const Block  = require("../blockchain/block");


describe("Block", ()=>{
    let data, lastBlock, block;

    beforeEach(()=>{
        data = "Helllo";
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it("should return the correct data ", ()=>{
        expect(block.data).toEqual(data);
    });

    it("sets the lastHash to match the hash of the las block", ()=>{
        expect(block.previousHash).toEqual(lastBlock.hash);
    }); 

    it("should generate a hash that matches the curent dificulty", ()=>{
        expect(block.hash.substring(0,block.dificulty)).toEqual("0".repeat(block.dificulty));
    });

    it("should lower the dificulty for slow mined block", ()=>{
        expect(Block.adjustDificulty(block,block.timestamp+360000)).toEqual(block.dificulty - 1);
    });

    it("should raise the dificulty foe quickly mined block", ()=>{
        expect(Block.adjustDificulty(block,block.timestamp+1)).toEqual(block.dificulty + 1);
    });
});