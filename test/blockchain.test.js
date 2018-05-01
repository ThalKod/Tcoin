const Blockchain = require("../blockchain"),
      Block      = require("../blockchain/block");

describe("Blockchain", ()=>{
    let blockchain, blockchain2;

    beforeEach(()=>{
        blockchain = new Blockchain();
        blockchain2 = new Blockchain();
    });

    it("should start the blockchain with the genesis block", ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it("should add a new block", ()=>{
        const data = "Hello";
        blockchain.addBlock(data);

        expect(blockchain.chain[blockchain.chain.length -1].data).toEqual(data);
    });

    it("should validate a valid chain ", ()=>{
        blockchain2.addBlock("Hello");

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
    });

    it("Should invalidates chain with wrong genesis block", ()=>{
        blockchain2.chain[0].data = "wrong it";

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it("should invalidate a corupt chain", ()=>{
        blockchain2.addBlock("Hello");
        blockchain2.chain[1].data = "weocw ww ";

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it("should replace the new longer valid Chain", ()=>{
        blockchain2.addBlock("Hlaosk");
        blockchain.replaceChain(blockchain2);

        expect(blockchain.chain).toEqual(blockchain.chain);
    });

    it("should not replace an invalid chain", ()=>{
        blockchain.addBlock("foo");
        blockchain.replaceChain(blockchain2.chain);

        expect(blockchain.chain).not.toEqual(blockchain2.chain);
    });

});