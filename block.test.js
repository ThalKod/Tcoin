const Block  = require("./block");


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
});