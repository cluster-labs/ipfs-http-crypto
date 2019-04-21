var eccrypto = require("eccrypto")
var crypto = require('crypto')
var keccak = require('keccak')

const encrypt = (publicKey, data, callback) => {
    eccrypto.encrypt(Buffer.from(publicKey, 'hex'), Buffer.from(data, 'utf8')).then(encrypted => {
        callback({
            iv: encrypted.iv.toString('hex'),
            ephemPublicKey: encrypted.ephemPublicKey.toString('hex'),
            ciphertext: encrypted.ciphertext.toString('hex'),
            mac: encrypted.mac.toString('hex'),
        })
    })
}

const decrypt = (privateKey, data, callback) => {
    data = {
        iv: Buffer.from(data.iv, 'hex'),
        ephemPublicKey: Buffer.from(data.ephemPublicKey, 'hex'),
        ciphertext: Buffer.from(data.ciphertext, 'hex'),
        mac: Buffer.from(data.mac, 'hex'),
    }
    eccrypto.decrypt(Buffer.from(privateKey, 'hex'), data).then(decrypted => {
        callback(decrypted.toString('utf8'))
    })
}

const generateKeyPair = () => {
    var privateKey = eccrypto.generatePrivate()
    var publicKey = eccrypto.getPublic(privateKey)
    
    return {
        privateKey: privateKey.toString('hex'),
        publicKey: publicKey.toString('hex')
    }
}

const getPublicByPrivate = privateKey => {
    return eccrypto.getPublic(privateKey)
}

const compressPublicKey = publicKey => {
    return '04'+publicKey
}

const decompressPublicKey = publicKey => {
    return publicKey.slice(2)
}

const generateBrainWallet = entropy => {
    let privateKey = Buffer.from(crypto.createHash('sha256').update(entropy).digest('hex'), 'hex')
    let publicKey = getPublicByPrivate(privateKey).toString('hex')
    return {
        privateKey: privateKey.toString('hex'),
        publicKey: publicKey,
        address: getAddressFromPublicKey(publicKey)
    }
}

const getAddressFromPublicKey = publicKey => {
    return '0x'+keccak('keccak256').update(Buffer.from(publicKey.slice(2), 'hex'))
    .digest().slice(-20).toString('hex')
}

module.exports = {
    encrypt,
    decrypt,
    generateKeyPair,
    getPublicByPrivate,
    generateBrainWallet,
    getAddressFromPublicKey
}