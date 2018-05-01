const ws = require("ws");

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2pServer{
    constructor(blockchain){
        this.blockchain = blockchain;
        this.socket = [];
    }

    listen(){
        const server = new ws.Server({port: P2P_PORT});
        server.on("connection", socket => this.connectSocket(socket));

        this.connectToPeers();

        console.log(`Listenning peers server on ${P2P_PORT}`);
    }

    connectToPeers(){
        peers.forEach(peer =>{
            const socket = new ws(peer);

            socket.on("open", ()=> this.connectSocket(socket));
        });
    }

    connectSocket(socket){
        this.socket.push(socket);
        console.log("Peers Connected");

        this.messageHandler(socket);

        this.sendChain(socket);
    }

    messageHandler(socket){
        socket.on("message", message =>{
            const data = JSON.parse(message);

            this.blockchain.replaceChain(data);
        });
    }

    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    syncChain(){
        this.socket.forEach(socket =>this.sendChain(socket));
    }
}

module.exports = P2pServer;