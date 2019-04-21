const ipfsClient = require('ipfs-http-client')
const ipfsCrypto = require('./src')

module.exports = (options) => {

    // connect to ipfs daemon API server
    const ipfs = ipfsClient(options)
    
    return ipfsCrypto(ipfs)
}


