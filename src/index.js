const mfs = require('./files-mfs')
const generateBrainWallet = require('./utils/crypto').asymmetric.ecc.generateBrainWallet

module.exports = ipfs => {
    ipfs.files = mfs(ipfs)
    ipfs.generateBrainWallet = generateBrainWallet
    return ipfs
}