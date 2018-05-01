const express = require("express"),
      bodyParser = require("body-parser"),
      Blockchain = require("../blockchain"),
      P2pServer = require("./p2p-server");

const HTTP_PORT = process.env.HTTP_PORT || 3001;

var app = express();
app.use(bodyParser.json());

const blockchain = new Blockchain();
const p2pServer = new P2pServer(blockchain);

//Get All Blockchain Block
app.get("/blocks", (req, res)=>{
    res.json(blockchain.chain);
});

app.post("/mine", (req, res)=>{
    const block = blockchain.addBlock(req.body.data);
    console.log(`New Block added: ${block.toString()}`);
    res.redirect("/blocks");
});

app.listen(HTTP_PORT, ()=> console.log(`Listening on Port : ${HTTP_PORT}`));
p2pServer.listen();
