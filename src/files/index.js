const crypto = require('crypto')

module.exports = async (ipfs) => {

    var add = await ipfs.add(content)

    return {
        add
    }
}