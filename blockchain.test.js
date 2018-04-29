const Blockchain = require("./blockchain"),
      Block      = require("./block");

describe("Blockchain", ()=>{
    let blockchain;

    beforeEach(()=>{
        blockchain = new Blockchain();
    });

    it("should start the blockchain with the genesis block", ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it("should add a new block", ()=>{
        const data = "Hello";
        blockchain.addBlock(data);

        expect(blockchain.chain[blockchain.chain.length -1].data).toEqual(data);
    });
});