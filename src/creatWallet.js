// importanto as dependencias 

const bip39 = require("bip39");
const bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib');


//definir a rede
// const network = bitcoin.networks.bitcoin;
const network = bitcoin.networks.testnet;

//derivacao de enderecos de carteiras hd
// const path = `m/49'/0'/0'/0` --> mainnet usa zero depois do 49, abaixo usa 1 e é testnet
const path = `m/49'/1'/0'/0`;

// criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddres = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada:");
console.log("Endereco: ", btcAddres);
console.log("Chave privada: ", node.toWIF());
console.log("Seed: ", mnemonic);