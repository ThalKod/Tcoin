const Transaction = require("../wallet/transaction");
const Wallet = require("../wallet/index");

describe("Transaction", ()=>{
    let transaction, wallet, recipient, amount;

    beforeEach(() =>{
        wallet = new Wallet();
        amount = 50;
        recipient = "recipient address";
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it("should outpout the amount minus the wallet balance", () =>{
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
    });

    it("should input the balance of the balance of the wallet", ()=>{
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    it("should output the amount added to the recipient", () =>{
        expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
    });
});
