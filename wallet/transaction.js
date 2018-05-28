const ChainUtil = require("../bchain-util");

class Transaction{
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    static newTransaction(senderWallet, recipient, amount){
        const transaction = new this();
        if(amount > senderWallet.balance){
            console.log("Amount: " + amount + " exceeds balance");
            return;
        }

        transaction.outputs.push(...[
            {amount: senderWallet.balance - amount, address: senderWallet.publicKey},
            {amount, address: recipient}
        ])

        return transaction;
    }
}

module.exports = Transaction;