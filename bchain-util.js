//Class handle Eliptic Curve algs 
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

class ChainUtil{
    static genKeyPair(){
        return ec.genKeyPair();
    }
}


module.exports = ChainUtil;