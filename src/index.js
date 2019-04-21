const mfs = require('./files-mfs')
const generateBrainWallet = require('./utils/crypto').asymmetric.ecc.generateBrainWallet

module.exports = ipfs => {
    
    return {
        files: mfs(ipfs),
        generateBrainWallet: generateBrainWallet
    }
}