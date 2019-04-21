const ecc = require('../utils/crypto/asymmetric/ecc')

module.exports = (ipfs) => {
    
    let write = ipfs.files.write
    let read = ipfs.files.read

    ipfs.files.write = (path, data, options, callback) => {
        
        const { crypto } =  options

        ecc.encrypt(crypto.publicKey, data, encrypted => {
            write(path, Buffer.from(JSON.stringify(encrypted), 'utf8'), options, (err) => {
                callback(err)
            })
        })
    }

    ipfs.files.read = (path, options, callback) => {

        const { crypto } = options

        read(path, options, (error, buf) => {
            ecc.decrypt(crypto.privateKey, JSON.parse(buf), decrypted => {
                callback(error, decrypted)
            })
        })
    }

    return ipfs.files
}
