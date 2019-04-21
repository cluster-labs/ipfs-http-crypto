const ipfsCrypto = require('../')
const ipfsc = ipfsCrypto({ host: 'localhost', port: '5001', protocol: 'http' })

const cryptoOpts = ipfsc.generateBrainWallet("seed for entropy")
const sampleData = "this is some random data"
const FOLDER_NAME = "/myFolder", FILE_NAME = "/myFile.txt"

const assert = require('chai').assert

describe('files-mfs', () => {
    describe('symmetric encryption & decryption' , () => {
        it('creates a directory', () => {
            ipfsc.files.mkdir(FOLDER_NAME, (err) => {
                assert.equal(err, null, `throws error while creating a directory: ${err}`)
            })
        })
    
        it('encrypts & writes data in a file', () => {
            ipfsc.files.write(`${FOLDER_NAME}${FILE_NAME}`, sampleData, { create: true, crypto: cryptoOpts }, (err) => {
                assert.equal(err, null, `throws error while encrypting & writing to a file: ${err}`)
            })
        })
    
        it('reads & decrypts data from a file', () => {
            ipfsc.files.read(`${FOLDER_NAME}${FILE_NAME}`, { crypto: cryptoOpts }, (err, buf) => {
                assert.equal(err, null, `throws error while reading & decrypting from a file: ${err}`)
                assert.equal(buf, sampleData, `error while decrypting`)
            })
        })
    
        it('removes a directory', () => {
            ipfsc.files.rm(`${FOLDER_NAME}`, { recursive: true }, (err) => {
                assert.equal(err, null, `throws error while removing a directory: ${err}`)
            })
        })
    })
})
