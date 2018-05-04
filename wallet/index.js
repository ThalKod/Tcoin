const {INITIAL_BALANCE} = require("../config");

class Wallet{
    constructor(){
        this.balance = INITIAL_BALANCE ;
        this.keyPair = null;
        this.publicKey = null;
    }

    toString(){
        return `
        publicKey   : ${this.publicKey}
        balance     : ${this.balance}`
    }
}

module.exports = Wallet;