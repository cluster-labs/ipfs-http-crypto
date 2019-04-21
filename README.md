## ipfs-http-crypto

A client library for the IPFS HTTP API, implemented in JavaScript. This client library implements the [interface-ipfs-core](https://github.com/ipfs/ipfs-http-crypto) enabling applications to change between an embedded js-ipfs node and any remote IPFS node without having to change the code. In addition, this client library implements a set of utility functions.

### Lead Maintainer
[Vaibhav Saini](https://github.com/vasa-develop)

### Install
This module uses node.js, and can be installed through npm:
```
npm install --save ipfs-http-crypto
```

We support both the Current and Active LTS versions of Node.js. Please see [nodejs.org](https://nodejs.org/) for what these currently are.

### How to Use
This library supports same function signatures as of [ipfs-http-client](https://github.com/ipfs/js-ipfs-http-client).

To use the crypto layer of the library we pass the neccessary paramters to perform cryptographic operations, with the options parameter.

See the [test](/test) folder to see how to pass parameters.

