(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * "Agent" is the central component of a payment channel. An agent has all the
 * information about one of the sides of a payment channel.  To use the Agent
 * class:
 *
 * let Agent = require('yours-channels').Agent
 */
var lib = {};
lib.Agent = require('./lib/agent.js');
lib.Channel = require('./lib/channel.js');
lib.Consts = require('./lib/consts.js');
lib.Output = require('./lib/output.js');
lib.Wallet = require('./lib/wallet.js');

module.exports = lib;

},{"./lib/agent.js":4,"./lib/channel.js":5,"./lib/consts.js":6,"./lib/output.js":10,"./lib/wallet.js":18}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Struct = require('yours-bitcoin/lib/struct');
var asink = require('asink');

var Address = require('yours-bitcoin/lib/address');
var KeyPair = require('yours-bitcoin/lib/key-pair');

var KeyPairAddress = function (_Struct) {
  _inherits(KeyPairAddress, _Struct);

  function KeyPairAddress(privKey, keyPair, address) {
    _classCallCheck(this, KeyPairAddress);

    var _this = _possibleConstructorReturn(this, (KeyPairAddress.__proto__ || Object.getPrototypeOf(KeyPairAddress)).call(this));

    _this.fromObject({ privKey: privKey, keyPair: keyPair, address: address });
    return _this;
  }

  _createClass(KeyPairAddress, [{
    key: 'asyncInitialize',
    value: function asyncInitialize(privKey) {
      return asink(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!privKey || privKey.constructor.name !== 'PrivKey')) {
                  _context.next = 2;
                  break;
                }

                throw new Error('this.privKey must be set before multisigAddress can be initialized');

              case 2:
                _context.next = 4;
                return KeyPair.asyncFromPrivKey(privKey);

              case 4:
                this.keyPair = _context.sent;
                _context.next = 7;
                return Address.asyncFromPubKey(this.keyPair.pubKey);

              case 7:
                this.address = _context.sent;


                this.initialized = true;

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }), this);
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      this.keyPair = json.keyPair ? KeyPair.fromJSON(json.keyPair) : undefined;
      this.address = json.address ? Address.fromJSON(json.address) : undefined;
      this.initialized = json.initialized;
      return this;
    }
  }, {
    key: 'toPublic',
    value: function toPublic() {
      var keyPairAddress = new KeyPairAddress();
      keyPairAddress.keyPair = this.keyPair ? this.keyPair.toPublic() : undefined;
      keyPairAddress.address = this.address;
      keyPairAddress.initialized = this.initialized;
      return keyPairAddress;
    }
  }]);

  return KeyPairAddress;
}(Struct);

module.exports = KeyPairAddress;

},{"asink":19,"yours-bitcoin/lib/address":324,"yours-bitcoin/lib/key-pair":334,"yours-bitcoin/lib/struct":342}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Struct = require('yours-bitcoin/lib/struct');
var asink = require('asink');
var Script = require('yours-bitcoin/lib/script');
var PrivKey = require('yours-bitcoin/lib/priv-key');
var PubKey = require('yours-bitcoin/lib/pub-key');
var Address = require('yours-bitcoin/lib/address');
var KeyPair = require('yours-bitcoin/lib/key-pair');

var Multisig = function (_Struct) {
  _inherits(Multisig, _Struct);

  function Multisig(privKey, pubKey, otherPubKey, pubKeys, script, address, keyPair, initialized) {
    _classCallCheck(this, Multisig);

    var _this = _possibleConstructorReturn(this, (Multisig.__proto__ || Object.getPrototypeOf(Multisig)).call(this));

    _this.fromObject({ privKey: privKey,
      pubKey: pubKey,
      otherPubKey: otherPubKey,
      pubKeys: pubKeys,
      script: script,
      address: address,
      keyPair: keyPair,
      initialized: initialized
    });
    return _this;
  }

  _createClass(Multisig, [{
    key: 'initializePrivKey',
    value: function initializePrivKey(privKey) {
      return asink(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.privKey = privKey;
                _context.next = 3;
                return PubKey.asyncFromPrivKey(privKey);

              case 3:
                this.pubKey = _context.sent;

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }), this);
    }
  }, {
    key: 'asyncInitialize',
    value: function asyncInitialize(otherPubKey) {
      return asink(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.privKey || this.privKey.constructor.name !== 'PrivKey')) {
                  _context2.next = 2;
                  break;
                }

                throw new Error('this.privKey must be set before multisigAddress can be initialized');

              case 2:
                if (!(!otherPubKey || otherPubKey.constructor.name !== 'PubKey')) {
                  _context2.next = 4;
                  break;
                }

                throw new Error('otherPubKey required to build a multisigAddress');

              case 4:
                this.otherPubKey = otherPubKey;
                _context2.next = 7;
                return PubKey.asyncFromPrivKey(this.privKey);

              case 7:
                this.pubKey = _context2.sent;


                this.pubKeys = [this.pubKey, this.otherPubKey];
                this.script = Script.fromPubKeys(2, this.pubKeys);
                _context2.next = 12;
                return Address.asyncFromRedeemScript(this.script);

              case 12:
                this.address = _context2.sent;
                _context2.next = 15;
                return KeyPair.asyncFromPrivKey(this.privKey);

              case 15:
                this.keyPair = _context2.sent;


                this.initialized = true;

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }), this);
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      var _this2 = this;

      this.privKey = json.privKey ? PrivKey.fromHex(json.privKey) : undefined;
      this.pubKey = json.pubKey ? PubKey.fromFastHex(json.pubKey) : undefined;
      this.otherPubKey = json.otherPubKey ? PubKey.fromFastHex(json.otherPubKey) : undefined;
      this.script = json.script ? Script.fromHex(json.script) : undefined;
      this.address = json.address ? Address.fromJSON(json.address) : undefined;
      this.keyPair = json.keyPair ? KeyPair.fromJSON(json.keyPair) : undefined;
      this.initialized = json.initialized;
      if (json.pubKeys) {
        (function () {
          var pubKeys = [];
          json.pubKeys.forEach(function (pubKey) {
            pubKeys.push(PubKey.fromFastHex(pubKey));
          });
          _this2.pubKeys = pubKeys;
        })();
      }
      return this;
    }
  }, {
    key: 'toPublic',
    value: function toPublic() {
      var multisigAddress = new Multisig().fromObject(this);
      multisigAddress.privKey = undefined;
      multisigAddress.keyPair = this.keyPair ? this.keyPair.toPublic() : undefined;
      return multisigAddress;
    }
  }]);

  return Multisig;
}(Struct);

module.exports = Multisig;

},{"asink":19,"yours-bitcoin/lib/address":324,"yours-bitcoin/lib/key-pair":334,"yours-bitcoin/lib/priv-key":337,"yours-bitcoin/lib/pub-key":338,"yours-bitcoin/lib/script":340,"yours-bitcoin/lib/struct":342}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var babel = require('babel-polyfill');
var Struct = require('yours-bitcoin/lib/struct');
var asink = require('asink');
var Bn = require('yours-bitcoin/lib/bn');
var Multisig = require('./addrs/multisig');
var KeyPairAddress = require('./addrs/key-pair-address');
var HtlcSecret = require('./scrts/htlc-secret');
var RevSecret = require('./scrts/rev-secret');
var Funding = require('./txs/funding');
var Commitment = require('./txs/commitment');
var Wallet = require('./wallet');

var Agent = function (_Struct) {
  _inherits(Agent, _Struct);

  function Agent(id, sourceAddress, // the address that the funding transaction is funded from
  multisigAddress, // the shared multisigAddress address
  destinationAddress, // the address that the spending transactions spend to
  funding, // an object storing information about the funding tx
  commitments, // a list of objects storing information about previous commitment txs
  wallet, // the wallet (dummy for now)
  initialized, // boolean, set to true once local initialization is complete
  funder, // boolean, set to true if agent funds the channel
  sender, // boolean, set to true if agent has sent the last payment
  other, // public information about the other agent and all commitment txs that he stores
  remoteAgent // used temporarily to communicate with the other agent (will go away once we integrate msgs)
  ) {
    _classCallCheck(this, Agent);

    var _this = _possibleConstructorReturn(this, (Agent.__proto__ || Object.getPrototypeOf(Agent)).call(this));

    _this.fromObject({ id: id,
      sourceAddress: sourceAddress,
      multisigAddress: multisigAddress,
      destinationAddress: destinationAddress,
      funding: funding,
      commitments: commitments,
      wallet: wallet,
      initialized: initialized,
      funder: funder,
      sender: sender,
      other: other,
      remoteAgent: remoteAgent
    });
    return _this;
  }

  /* ---- INITIALIZATION ---- */

  /*
   * Initializes an agent locally. In particular, the sourceAddress address, the multisigAddress
   * address, the destinationAddress address are initialized. The list of commitment txouts
   * is initialized with secrets for the next payment.
   */


  _createClass(Agent, [{
    key: 'asyncInitialize',
    value: function asyncInitialize(sourcePrivKey, multisigPrivKey, destinationPrivKey) {
      return asink(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!sourcePrivKey || !multisigPrivKey || !destinationPrivKey || sourcePrivKey.constructor.name !== 'PrivKey' || multisigPrivKey.constructor.name !== 'PrivKey' || destinationPrivKey.constructor.name !== 'PrivKey')) {
                  _context.next = 2;
                  break;
                }

                throw new Error('sourcePrivKey, multisigPrivKey, destinationPrivKey must be PrivKeys and are required in asyncInitialize');

              case 2:

                // the address that's the input to the sourceAddress trasnaction
                this.sourceAddress = new KeyPairAddress();
                _context.next = 5;
                return this.sourceAddress.asyncInitialize(sourcePrivKey);

              case 5:

                // the shared multisigAddress address
                this.multisigAddress = new Multisig();
                _context.next = 8;
                return this.multisigAddress.initializePrivKey(multisigPrivKey);

              case 8:

                // the address that's the output to a commitment trasnaction
                this.destinationAddress = new KeyPairAddress();
                _context.next = 11;
                return this.destinationAddress.asyncInitialize(destinationPrivKey);

              case 11:

                // initialize first commitment
                this.commitments = [];
                // yield this.asyncInitializeCommitment()

                // the wallet
                this.wallet = new Wallet();

                this.initialized = true;

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }), this);
    }

    /* ---- PROTOCOL ---- */

    /*
     * This is the first point of communication between the two agents. Arguments are
     * the amount to fund the channel with and the public projection of the other agent.
     * Stores the public information about the other agent and initializes the multisigAddress
     * address. The funder of the channel will build the funding transaction and send
     * it's hash to the other party.
     */

  }, {
    key: 'asyncOpenChannel',
    value: function asyncOpenChannel(amount, publicOther) {
      return asink(regeneratorRuntime.mark(function _callee2() {
        var fee, output;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // initialize information about other agent
                this.other = publicOther;

                // initialize multisigAddress
                _context2.next = 3;
                return this.multisigAddress.asyncInitialize(this.other.multisigAddress.pubKey);

              case 3:
                if (this.funder) {
                  _context2.next = 13;
                  break;
                }

                _context2.t0 = this.remoteAgent;
                _context2.t1 = amount;
                _context2.next = 8;
                return this.asyncToPublic();

              case 8:
                _context2.t2 = _context2.sent;
                _context2.next = 11;
                return _context2.t0.asyncOpenChannel.call(_context2.t0, _context2.t1, _context2.t2);

              case 11:
                _context2.next = 22;
                break;

              case 13:
                // the funder will build the sourceAddress transaction and cache it's hashbuf and txout
                fee = Bn(20000);
                output = this.wallet.getUnspentOutput(amount.add(fee), this.sourceAddress.keyPair.pubKey);


                this.funding = new Funding();
                this.funding.asyncInitialize(amount, this.sourceAddress, this.multisigAddress, output.txhashbuf, output.txoutnum, output.txout, output.pubKey);

                // send the sourceAddress tx hash to the other agent
                _context2.t3 = this.remoteAgent;
                _context2.next = 20;
                return this.funding.asyncToPublic();

              case 20:
                _context2.t4 = _context2.sent;

                _context2.t3.setFunding.call(_context2.t3, _context2.t4);

              case 22:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }), this);
    }
  }, {
    key: 'asyncSendOutputs',
    value: function asyncSendOutputs(outputs, changeOutput) {
      return asink(regeneratorRuntime.mark(function _callee3() {
        var _this2 = this;

        var commitment;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!this.multisigAddress || !this.funding)) {
                  _context3.next = 2;
                  break;
                }

                throw new Error('Agent not sufficiently initialized in asyncSendOutputs');

              case 2:

                // create new commitment and add all info that is not realted to builder vs owner
                commitment = new Commitment();

                commitment.revSecret = new RevSecret();
                _context3.next = 6;
                return commitment.revSecret.asyncInitialize();

              case 6:
                commitment.multisigAddress = this.multisigAddress;
                commitment.funding = this.funding;
                commitment.outputs = outputs.map(function (output) {
                  return _this2.completeOutput(output, commitment.revSecret);
                });
                commitment.changeOutput = this.completeOutput(changeOutput, commitment.revSecret);
                this.commitments.push(commitment);
                this.other.commitments.push(commitment);

                if (this.sender) {
                  _context3.next = 17;
                  break;
                }

                _context3.next = 15;
                return this.remoteAgent.asyncSendOutputs(outputs, changeOutput);

              case 15:
                _context3.next = 19;
                break;

              case 17:
                _context3.next = 19;
                return this.remoteAgent.asyncBuildCommitment();

              case 19:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }), this);
    }
  }, {
    key: 'asyncBuildCommitment',
    value: function asyncBuildCommitment() {
      return asink(regeneratorRuntime.mark(function _callee4() {
        var otherCommitment;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                otherCommitment = this.other.commitments.pop();

                otherCommitment.builderId = this.id;
                otherCommitment.builderDestinationAddress = this.destinationAddress;
                otherCommitment.ownerId = this.other.id;
                otherCommitment.ownerDestinationAddress = this.other.destinationAddress;
                _context4.next = 7;
                return otherCommitment.asyncBuild();

              case 7:
                this.other.commitments.push(otherCommitment);

                if (this.sender) {
                  _context4.next = 13;
                  break;
                }

                _context4.next = 11;
                return this.remoteAgent.asyncBuildCommitment();

              case 11:
                _context4.next = 15;
                break;

              case 13:
                _context4.next = 15;
                return this.remoteAgent.sendCommitment(otherCommitment);

              case 15:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }), this);
    }
  }, {
    key: 'sendCommitment',
    value: function sendCommitment(newCommitment) {
      return asink(regeneratorRuntime.mark(function _callee5() {
        var storedCommitment, otherCommitment, revSecret;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                storedCommitment = this.commitments[this.commitments.length - 1];

                if (!this.checkCommitment(storedCommitment, newCommitment)) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 4;
                return newCommitment.txb.asyncSign(0, this.multisigAddress.keyPair, this.funding.txb.tx.txOuts[0]);

              case 4:

                this.commitments.pop();
                this.commitments.push(newCommitment);

              case 6:
                if (this.sender) {
                  _context5.next = 12;
                  break;
                }

                otherCommitment = this.other.commitments[this.other.commitments.length - 1];
                _context5.next = 10;
                return this.remoteAgent.sendCommitment(otherCommitment);

              case 10:
                _context5.next = 16;
                break;

              case 12:
                revSecret = this.getRevSecret();

                if (!revSecret) {
                  _context5.next = 16;
                  break;
                }

                _context5.next = 16;
                return this.remoteAgent.sendRevSecret(revSecret);

              case 16:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }), this);
    }
  }, {
    key: 'sendRevSecret',
    value: function sendRevSecret(revSecret) {
      return asink(regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }), this);
    }

    /* ---- SETTERS ---- */

  }, {
    key: 'setFunding',
    value: function setFunding(txo) {
      this.funding = txo;
    }
  }, {
    key: 'setCommitment',
    value: function setCommitment(txo) {
      this.commitments[this.commitments.length - 1] = txo;
    }
  }, {
    key: 'setOtherCommitment',
    value: function setOtherCommitment(txo) {
      this.other.commitments[this.other.commitments.length - 1] = txo;
    }

    /* ---- GETTERS ---- */

  }, {
    key: 'getRevSecret',
    value: function getRevSecret() {
      // if there is a transaction to revoke, return it's rev secret
      if (this.commitments.length > 1) {
        return this.commitments[this.commitments.length - 2].revSecret;
      } else {
        return false;
      }
    }

    /* ---- HELPERS ---- */

  }, {
    key: 'completeOutput',
    value: function completeOutput(output, revSecret) {
      if (output.intermediateDestId === this.id) {
        output.revSecret = revSecret;
      }
      return output;
    }
  }, {
    key: 'checkCommitment',
    value: function checkCommitment(storedCommitment, newCommitment) {
      // TODO
      return true;
    }

    // We have to delete other and remoteAgent and restore after constructing json.
    // Ideallt we'd call super.toJSON after that, but that's not possible due to
    // some stupid error (TODO)

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var other = this.other;
      var remoteAgent = this.remoteAgent;
      var that = this;
      that.other = undefined;
      that.remoteAgent = undefined;
      var json = {};
      for (var val in this) {
        if (this[val] instanceof Array) {
          var arr = [];
          for (var i in this[val]) {
            arr.push(this[val][i].toJSON());
          }
          json[val] = arr;
        } else if (_typeof(this[val]) === 'object') {
          json[val] = this[val].toJSON();
        } else if (typeof this[val] !== 'undefined') {
          json[val] = this[val];
        }
      }
      this.other = other;
      this.remoteAgent = remoteAgent;
      return json;
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      var _this3 = this;

      this.name = json.name;
      this.sourceAddress = json.sourceAddress ? new KeyPairAddress().fromJSON(json.sourceAddress) : undefined;
      this.multisigAddress = json.multisigAddress ? new Multisig().fromJSON(json.multisigAddress) : undefined;
      this.destinationAddress = json.destinationAddress ? new KeyPairAddress().fromJSON(json.destinationAddress) : undefined;
      this.htlcSecret = json.htlcSecret ? new HtlcSecret().fromJSON(json.htlcSecret) : undefined;
      this.nextRevSecret = json.nextRevSecret ? new RevSecret().fromJSON(json.nextRevSecret) : undefined;
      this.funder = json.funder;
      this.wallet = json.wallet ? new Wallet().fromJSON(json.wallet) : undefined;
      this.initialized = json.initialized;
      this.sender = json.sender;
      this.funding = json.funding ? new Funding().fromJSON(json.funding) : undefined;
      if (json.commitments) {
        (function () {
          var commitments = [];
          json.commitments.forEach(function (tx) {
            commitments.push(new Commitment().fromJSON(tx));
          });
          _this3.commitments = commitments;
        })();
      }
      return this;
    }
  }, {
    key: 'asyncToPublic',
    value: function asyncToPublic() {
      return asink(regeneratorRuntime.mark(function _callee7() {
        var _this4 = this;

        var agent;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                agent = new Agent();

                agent.id = this.id;
                agent.sourceAddress = this.sourceAddress ? this.sourceAddress.toPublic() : undefined;
                agent.multisigAddress = this.multisigAddress ? this.multisigAddress.toPublic() : undefined;
                agent.destinationAddress = this.destinationAddress ? this.destinationAddress.toPublic() : undefined;

                if (!this.funding) {
                  _context7.next = 11;
                  break;
                }

                _context7.next = 8;
                return this.funding.asyncToPublic();

              case 8:
                _context7.t0 = _context7.sent;
                _context7.next = 12;
                break;

              case 11:
                _context7.t0 = undefined;

              case 12:
                agent.funding = _context7.t0;

                if (this.commitments) {
                  (function () {
                    var commitments = [];
                    _this4.commitments.forEach(function (txo) {
                      commitments.push(txo.toPublic());
                    });
                    agent.commitments = commitments;
                  })();
                }
                agent.wallet = this.wallet ? this.wallet.toPublic() : undefined;
                agent.initialized = this.initialized;
                agent.funder = this.funder;
                agent.sender = this.sender;
                return _context7.abrupt('return', agent);

              case 19:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }), this);
    }
  }]);

  return Agent;
}(Struct);

module.exports = Agent;
/**

Protocols
---------

We now describe the protocol that the parties use to construct the transactions
shown above.

### Local initialization (asyncInitialize)

**1. Local initialization .** Both agents initialize the following
- their local addresses (source, destination)
- a htlc and revocation secret to be used in the first payment
- the shared multisig object is initialized, but the address has not been
  generated yet.

### Opening the channel (asyncOpenChannel)

As there are inherent malleability problems if two parties fund a payment
channel. To avoid this problem we use a version where only Alice funds the
channel.

**1. Alice and Bob exchange their public projections (initializeOther).** This
allows them to build a shared multisig address and to know the public versions
of the other agents htlc and revocation secret. After this step the following
is initialized

**2. Alice and Bob build the shared multisig (asyncInitializeMultisig).** Now
that they have exchanged public keys for the multisig address, they can both
build it.

**3. The funder (Alice) builds a funding transaction.** The agent that funds
the channel creates the funding transaction that spends to the shared multisig
address. She does not broadcast it yet. She then sends the funding amount and
funding transaction hash to Bob.

**4. Bob builds and signs a refund transaction, sends it to Alice.** Alice and
Bob go through the protocol described below for creating a payment, in the case
where Bob sends a payment to Alice. The payment spends all funds from the
funding transaction to Alice.

**5. Alice broadcasts the funding transaction.** When the refund transaction is
created and distributed between the two parties, Alice broadcasts the funding
transaction. The channel is open when the funding transaction is confirmed into
the blockchain.

At the end of the channel opening process, both agents store the following
information:

- three addresses (source, destination, multisig)
- a list of commitment transactions objects. The list has one entry that
  contains the secrets used for the first payment
- the public information about the other client; this also contains a list of
  commitment transaction objects with one entry containing the public
  projections (hahes) of two secrets.

### Creating the payment (asyncSend)

We describe a payment from Alice to Bob. Note that if this is not the first
payment, Alice has the hash of Bob's last revocation secret, and the hash of
Bob's last HTLC secret. If this is the first payment, revoking isn't necessary
and these secrets are not needed.

**1. Alice builds a commitment transaction for Bob, stores it, and asks him to
do the same (asyncSend).** Alice builds the transaction labeled "known only to
Bob" above. She then asks Bob to build one for her.<!--She uses the public
versions of the secrets obtained from Bob in step 2 and her own secrets
generated in Step 1. She signs the transaction and sends it to Bob.-->

**2. Bob builds a commitment transaction for Alice, stores it, and sends it to
Alice (asyncSend).**

**3. Alice checks the new commitment transaction, stores it, and sends the
transaction built in step 1 to Bob (asyncSendTxb).**

**4. Bob checks the new commitment transaction, stores it, and revokes the old
commitment transaction (asyncSendTxb).**

**5. Alice checks the revocation secret, stores it, generates new secrets, and
revokes the old commitment transaction (asyncPrepareNextPayment).**

**6. Bob checks the revocation secret, stores it, generates new secrets for the
next payment.**

<!--
**4. Alice checks the transaction, builds one for Alice and sends it to her.**
Bob checks that the transaction spends from the shared multisig address, spends
to his destination address, that the secrets used are the ones he generated in
Step 2, and that the spending amounts are as expected. If the test passes, he
builds the transaction labelled "known only to Alice" and sends it to her (this
is symmetric to case 3.).

**5. Alice checks the transaction obtained from Bob, and revokes her last
payment if the check passes.** To revoke the previous payment, Alice sends her
revocation secret from the last commitment transaction to Bob.

**6. Bob revokes.** Symmetrically, Bob sends Alice his revocation secret from
the last commitment transaction.

**1. Alice generates new secrets and sends them to Bob.** She locally creates a
revocation secret and a htlc secret for use on the next transaction. She then
sends the public versions (hashes) of these secrets to Bob.

**2. Bob generates a new secrets and sends them to Alice.** This is symmetric
to the case above
-->
### Closing the channel

Either party can broadcast their most recent commitment transaction to the
blockchain. In this case both parties go through the following protocol

**1. Find the most recent HTLC secret.**

**2. Build a spending transaction.**

**3. Broadcast spending transaction and the most recent commitment
transaction.**

The party that broadcasts the commitment transaction must wait for a day to do
that, the other party can do so as soon as possible.

### Enforcing the HTLC

In case one party fails to spend an output by providing the HTLC secret, the
other party can spend the HTLC output after 2 days.

**1. Build spending transaction using spending key.**

**3. Broadcast spending transaction and the most recent commitment
transaction.**

### React to other agent broadcasting an old commitment transaction

In that case one party broadcasts an old commitment transaction,
the other party goes trough the following:

**1. Find the corresponding HTLC secret.**

**2. Create an output script that spends the HTLC output.**

**3. Find the corresponding revocation secret.**

**4. Create an output script that spends the revocation output.**

**5. Build a transaction that spends both outputs.**

This has to happen within one day, in order to make sure that the revocation
output can be spent.

**/

},{"./addrs/key-pair-address":2,"./addrs/multisig":3,"./scrts/htlc-secret":11,"./scrts/rev-secret":12,"./txs/commitment":14,"./txs/funding":15,"./wallet":18,"asink":19,"babel-polyfill":20,"yours-bitcoin/lib/bn":327,"yours-bitcoin/lib/struct":342}],5:[function(require,module,exports){
// TODO: All channel properties need to be saved in a database, not in memory,
// so that the state is consistent across tabs and can be synced across
// devices.
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Struct = require('yours-bitcoin/lib/struct');
var MsgUpdate = require('./msgs/msg-update');
var Secret = require('./scrts/secret');
var Random = require('yours-bitcoin/lib/random');
var Script = require('yours-bitcoin/lib/script');
var Address = require('yours-bitcoin/lib/address');
var KeyPair = require('yours-bitcoin/lib/key-pair');
var Bn = require('yours-bitcoin/lib/bn');
var Output = require('../lib/output');
var Spending = require('../lib/txs/spending.js');
var Commitment = require('../lib/txs/commitment');
var TxOut = require('yours-bitcoin/lib/tx-out');
var MsgSecrets = require('./msgs/msg-secrets');
var asink = require('asink');

var Channel = function (_Struct) {
  _inherits(Channel, _Struct);

  function Channel(fundingAmount, myXPrv, theirXPub, chanPath, myChanXPrv, theirChanXPub, myId, theirId) {
    var state = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : Channel.STATE_INITIAL;
    var multiSigScript = arguments[9];
    var multiSigAddr = arguments[10];
    var id = arguments[11];
    var secretMap = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : new Map();
    var funder = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : false;
    var fundingTx = arguments[14];
    var fundingTxHash = arguments[15];
    var funded = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : false;
    var myCommitments = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : [];
    var theirCommitments = arguments.length > 18 && arguments[18] !== undefined ? arguments[18] : [];
    var errStr = arguments.length > 19 && arguments[19] !== undefined ? arguments[19] : '';

    _classCallCheck(this, Channel);

    return _possibleConstructorReturn(this, (Channel.__proto__ || Object.getPrototypeOf(Channel)).call(this, {
      fundingAmount: fundingAmount,
      myXPrv: myXPrv,
      theirXPub: theirXPub,
      chanPath: chanPath,
      myChanXPrv: myChanXPrv,
      theirChanXPub: theirChanXPub,
      myId: myId,
      theirId: theirId,
      state: state,
      multiSigScript: multiSigScript,
      multiSigAddr: multiSigAddr,
      id: id,
      secretMap: secretMap,
      funder: funder,
      fundingTx: fundingTx,
      fundingTxHash: fundingTxHash,
      funded: funded,
      myCommitments: myCommitments,
      theirCommitments: theirCommitments,
      errStr: errStr
    }));
  }

  /**
   * Initializes the channel by deriving the channel keys and id's and by
   * building and storing the multisig address
   */


  _createClass(Channel, [{
    key: 'asyncInitialize',
    value: function asyncInitialize() {
      return asink(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.chanPath) {
                  this.randomChanPath();
                }
                _context.next = 3;
                return this.myXPrv.asyncDerive(this.chanPath);

              case 3:
                this.myChanXPrv = _context.sent;
                _context.next = 6;
                return this.theirXPub.asyncDerive(this.chanPath);

              case 6:
                this.theirChanXPub = _context.sent;
                _context.next = 9;
                return this.myXPrv.toPublic().asyncToString();

              case 9:
                this.myId = _context.sent;
                _context.next = 12;
                return this.theirXPub.asyncToString();

              case 12:
                this.theirId = _context.sent;
                return _context.abrupt('return', this.asyncBuildMultiSigAddr());

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }), this);
    }

    /**
     * Returns a random number between 0 and 0x7fffffff
     */

  }, {
    key: 'randomChanPath',


    /**
     * Initializes the channel path to a random one
     */
    value: function randomChanPath() {
      this.chanPath = Channel.randomChanPath();
      return this;
    }

    /**
     * Builds the multisig address from the agents public keys
     */

  }, {
    key: 'asyncBuildMultiSigAddr',
    value: function asyncBuildMultiSigAddr() {
      return asink(regeneratorRuntime.mark(function _callee2() {
        var pubKey1, pubKey2, script;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                pubKey1 = this.myChanXPrv.pubKey;
                pubKey2 = this.theirChanXPub.pubKey;
                script = Script.fromPubKeys(2, [pubKey1, pubKey2]);

                this.multiSigScript = script;
                _context2.next = 6;
                return Address.asyncFromRedeemScript(this.multiSigScript);

              case 6:
                this.multiSigAddr = _context2.sent;
                _context2.next = 9;
                return this.multiSigAddr.asyncToString();

              case 9:
                this.id = _context2.sent;
                return _context2.abrupt('return', this);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }), this);
    }

    /**
     * Returns the channel id, which is the multisig address
     */

  }, {
    key: 'asyncGetId',
    value: function asyncGetId() {
      return this.multiSigAddr.asyncToString();
    }

    /**
     * Generates a new secret and stores it in this.secretMap
     */

  }, {
    key: 'asyncNewSecret',
    value: function asyncNewSecret() {
      return asink(regeneratorRuntime.mark(function _callee3() {
        var secret;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                secret = new Secret();
                _context3.next = 3;
                return secret.asyncInitialize();

              case 3:
                this.secretMap.set(secret.hash.toString('hex'), secret.buf);
                return _context3.abrupt('return', secret);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }), this);
    }

    /**
     * Returns the pre-image of a stored secret
     */

  }, {
    key: 'getSecret',
    value: function getSecret(hash) {
      return this.secretMap.get(hash.toString('hex'));
    }

    /**
     * Opens a channel. Sets the funding tx and returns the "update" message
     * for the refund tx.
     */

  }, {
    key: 'asyncOpen',
    value: function asyncOpen(fundingTx) {
      var channelSourceIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Channel.randomIndex();
      var channelDestIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Channel.randomIndex();

      return asink(regeneratorRuntime.mark(function _callee4() {
        var revSecret, output, outputs;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.funder = true;
                this.fundingTx = fundingTx; // TODO: Validate that funding tx spends to multisig
                _context4.next = 4;
                return fundingTx.asyncHash();

              case 4:
                this.fundingTxHash = _context4.sent;
                _context4.next = 7;
                return this.asyncNewSecret();

              case 7:
                revSecret = _context4.sent;
                output = new Output().fromObject({
                  kind: 'pubKey',
                  networkSourceId: this.theirId,
                  channelSourceId: this.theirId,
                  channelDestId: this.myId,
                  networkDestId: this.myId,
                  channelSourcePath: 'm/0/' + channelSourceIndex,
                  channelDestPath: 'm/0/' + channelDestIndex,
                  // htlcSecret, // Not used in refund tx
                  revSecret: revSecret.toPublic()
                  // amount // Left undefined because this is the change output
                });
                outputs = [output];
                return _context4.abrupt('return', this.asyncUpdate(outputs));

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }), this);
    }

    /**
     * When the funding transaction is confirmed on the blockchain, call this
     * method.
     */

  }, {
    key: 'asyncConfirmFundingTx',
    value: function asyncConfirmFundingTx(fundingTx) {
      return asink(regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.fundingTx = fundingTx;
                _context5.next = 3;
                return fundingTx.asyncHash();

              case 3:
                this.fundingTxHash = _context5.sent;

                this.funded = true;

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }), this);
    }

    /**
     * Returns a new commitment transaction for a given output description list
     */

  }, {
    key: 'asyncBuildCommitment',
    value: function asyncBuildCommitment(outputs, fundingTxHash, fundingTxOut) {
      return asink(regeneratorRuntime.mark(function _callee6() {
        var _xPubs;

        var commitment, xPubs, keyPair;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                commitment = new Commitment();

                commitment.outputs = outputs;
                xPubs = (_xPubs = {}, _defineProperty(_xPubs, this.myId, this.myChanXPrv.toPublic()), _defineProperty(_xPubs, this.theirId, this.theirChanXPub), _xPubs);
                keyPair = new KeyPair(this.myChanXPrv.privKey, this.myChanXPrv.pubKey);
                // TODO: can this be a default parameter?

                if (!(fundingTxHash === undefined)) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 7;
                return this.fundingTx.asyncHash();

              case 7:
                fundingTxHash = _context6.sent;

              case 8:
                fundingTxOut = fundingTxOut || this.fundingTx.txOuts[0];

                return _context6.abrupt('return', commitment.asyncBuild(fundingTxHash, fundingTxOut, { script: this.multiSigScript, keyPair: keyPair }, this.myId, xPubs));

              case 10:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }), this);
    }
  }, {
    key: 'asyncBuildSpending',
    value: function asyncBuildSpending(address, commitment, commitmentTxDepth) {
      return asink(regeneratorRuntime.mark(function _callee7() {
        var spending;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                spending = new Spending();
                _context7.next = 3;
                return spending.asyncBuild(address, commitment, this.myChanXPrv, this.myId, commitmentTxDepth, this.secretMap);

              case 3:
                return _context7.abrupt('return', spending);

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }), this);
    }

    /**
     * Convenience method to add an additional output to the output description list
     * Returns a message of type "update" with an commitment tx for the list.
     * HtlcSecret is optional.
     */

  }, {
    key: 'asyncPay',
    value: function asyncPay(amount, htlcSecret) {
      var pathIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Channel.randomIndex();

      return asink(regeneratorRuntime.mark(function _callee8() {
        var outputs, revSecret, output;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                outputs = this.myCommitments[this.myCommitments.length - 1].outputs;

                outputs = outputs.map(function (output) {
                  return output.clone();
                });
                // TODO: Validate that last output spends to me and is change, i.e.
                // TODO: check sufficient balance
                _context8.next = 4;
                return this.asyncNewSecret();

              case 4:
                revSecret = _context8.sent;
                output = new Output().fromObject({
                  kind: htlcSecret ? 'htlc' : 'pubKey',
                  networkSourceId: this.myId,
                  channelSourceId: this.myId,
                  channelDestId: this.theirId,
                  networkDestId: this.theirId,
                  channelSourcePath: 'm/0/' + pathIndex,
                  channelDestPath: 'm/0/' + pathIndex,
                  htlcSecret: htlcSecret ? htlcSecret.toPublic() : undefined,
                  revSecret: revSecret.toPublic(),
                  amount: amount
                });
                _context8.next = 8;
                return this.asyncAddOutput(output, outputs);

              case 8:
                outputs = _context8.sent;

                outputs = this.reduceOutputs(outputs);
                return _context8.abrupt('return', this.asyncUpdate(outputs));

              case 11:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }), this);
    }

    /**
     * Add output description to outputlist immediately before the change output
     */

  }, {
    key: 'asyncAddOutput',
    value: function asyncAddOutput(output, outputs) {
      outputs = outputs.map(function (output) {
        return output.clone();
      });
      var change = outputs.pop();
      outputs.push(output);
      outputs.push(change);
      return outputs;
    }

    /**
     * Merges outputs whenever possible
     */

  }, {
    key: 'reduceOutputs',
    value: function reduceOutputs(outputs) {
      return outputs;
      // TODO: call asyncReduceHtlcOutput and reducePubKeyOutputs here
    }

    /*
     * Preliminary version of reducePubKeyOutputs, returns an array where the last
     * element is a change output (with an amount)
     * TODO: skip htlc outputs
     */

  }, {
    key: 'reducePubKeyOutputs',
    value: function reducePubKeyOutputs(outputs) {
      // outputs will be grouped together if they have the same key def below
      // outputs in the same group will be merged further down below
      // not exactly sure when exactly two outputs can be merged, we'll have to adapt this
      var grouped = {};
      outputs.forEach(function (output) {
        var key = output.kind + ':' + output.channelSourceId + ':' + output.channelDestId;
        if (key in grouped === false) {
          grouped[key] = [];
        }
        grouped[key].push(output);
      });

      var amounts = void 0,
          output = void 0;
      var reduced = [];
      for (var key in grouped) {
        // sum up the amounts for each group
        amounts = grouped[key].map(function (el) {
          return el.amount ? el.amount : 'bottom';
        });
        output = grouped[key][0];
        output.amount = amounts.reduce(function (acc, cur) {
          return acc !== 'bottom' && cur !== 'bottom' ? acc.add(cur) : 'bottom';
        }, Bn(0));
        reduced.push(output);
      }

      // sort reduced so that the last output is the change output
      reduced.sort(function (a, b) {
        // conceptualy we consider "bottom" to be the bigger than all values in Bn.
        // this way the change output will always be last
        if (a.amount === 'bottom' && b.amount !== 'bottom') {
          return 1;
        } else if (a.amount !== 'bottom' && b.amount === 'bottom') {
          return -1;
        } else {
          return 0;
        }
      });

      // delete "amount: 'bottom'" from the last output
      delete reduced[reduced.length - 1].amount;
      return reduced;
    }

    /*
     * Preliminary version of asyncReduceHtlcOutput. Changes the kind of an htlc
     * output to pubKey if it corresponds to the given htlcSecret.
     * TODO: either call reducePubKeyOutputs at the end or make sure that it is
     * always called after asyncReduceHtlcOutput (eg in reduceOutputs)
     */

  }, {
    key: 'asyncReduceHtlcOutput',
    value: function asyncReduceHtlcOutput(outputs, htlcSecret) {
      return asink(regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return htlcSecret.asyncSuperCheck();

              case 2:
                if (!_context9.sent) {
                  _context9.next = 4;
                  break;
                }

                return _context9.abrupt('return', outputs.map(function (output) {
                  if (output.kind === 'htlc' && output.htlcSecret.buf === htlcSecret.buf) {
                    output.kind = 'pubKey';
                  }
                  return output;
                }));

              case 4:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }), this);
    }

    /**
     * Generates a new "update" message for a given output description list.
     * This method is used to activate the protocol for a new payment.
     * TODO: check that channel is funded.
     */

  }, {
    key: 'asyncUpdate',
    value: function asyncUpdate(outputs) {
      return asink(regeneratorRuntime.mark(function _callee10() {
        var commitment, msg;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(this.state !== Channel.STATE_INITIAL)) {
                  _context10.next = 2;
                  break;
                }

                throw new Error('Cannot update during ' + this.state + ' state');

              case 2:
                _context10.next = 4;
                return this.asyncBuildCommitment(outputs);

              case 4:
                commitment = _context10.sent;

                this.theirCommitments.push(commitment);

                msg = new MsgUpdate().setChanId(this.id).setChanPath(this.chanPath).setCommitment(commitment).setFundingAmount(this.fundingAmount);

                this.state = Channel.STATE_BUILT;
                return _context10.abrupt('return', msg);

              case 9:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }), this);
    }

    /**
     * Called when a new message of type "update" is received. Signs the tx in the
     * message, stores it in myCommitments. Then builds a commitment tx for the
     * other agent, packs it into a message of type "update" and returns this message
     */

  }, {
    key: 'asyncHandleMsgUpdate',
    value: function asyncHandleMsgUpdate(msgUpdate) {
      return asink(regeneratorRuntime.mark(function _callee11() {
        var myCommitment, keyPair, script, txOut, outputs, fundingTxOut, theirCommitment, msg;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!(this.state === Channel.STATE_INITIAL)) {
                  _context11.next = 20;
                  break;
                }

                // TODO: Check validity
                this.state = Channel.STATE_BUILT_AND_STORED;
                myCommitment = msgUpdate.getCommitment();
                keyPair = new KeyPair(this.myChanXPrv.privKey, this.myChanXPrv.pubKey);
                script = this.multiSigAddr.toScript();
                txOut = TxOut.fromProperties(this.fundingAmount, script);
                _context11.next = 8;
                return myCommitment.txb.asyncSign(0, keyPair, txOut);

              case 8:
                this.myCommitments.push(myCommitment);

                outputs = myCommitment.outputs.map(function (output) {
                  return Output.fromJSON(output.toJSON());
                });

                this.fundingTxHash = myCommitment.txb.tx.txIns[0].txHashBuf;
                fundingTxOut = TxOut.fromProperties(this.fundingAmount, this.multiSigAddr.toScript());
                _context11.next = 14;
                return this.asyncBuildCommitment(outputs, this.fundingTxHash, fundingTxOut);

              case 14:
                theirCommitment = _context11.sent;

                this.theirCommitments.push(theirCommitment);

                msg = new MsgUpdate().setChanId(this.id).setChanPath(this.chanPath).setCommitment(theirCommitment).setFundingAmount(this.fundingAmount);
                return _context11.abrupt('return', msg);

              case 20:
                if (!(this.state === Channel.STATE_BUILT)) {
                  _context11.next = 26;
                  break;
                }

                // TODO: Check validity
                this.state = Channel.STATE_STORED;
                this.myCommitments.push(msgUpdate.getCommitment());
                return _context11.abrupt('return', this.asyncGetMsgSecrets());

              case 26:
                return _context11.abrupt('return', this.asyncError('Cannot receive msgUpdate in ' + this.state + ' state'));

              case 27:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }), this);
    }

    /**
     * Generates a new message of type "secret" containing the revocation secret
     */

  }, {
    key: 'asyncGetMsgSecrets',
    value: function asyncGetMsgSecrets() {
      return asink(regeneratorRuntime.mark(function _callee12() {
        var msg, commitment, outputs, revSecrets, index, secret, buf;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                // Suppose you have 10 commitment txs.
                // You don't want to revoke the 10th one, but you want to revoke the 9th one.
                // Get revocation hash from 9th commitment tx output description list.
                msg = new MsgSecrets().setChanId(this.id).setChanPath(this.chanPath);

                if (this.myCommitments.length > 1) {
                  commitment = this.myCommitments[this.myCommitments.length - 2];
                  outputs = commitment.outputs;
                  revSecrets = [];

                  for (index in outputs) {
                    secret = outputs[index].revSecret;
                    buf = this.getSecret(secret.hash);

                    if (buf) {
                      secret.buf = buf;
                    }
                    revSecrets.push(secret);
                  }
                  msg.setSecrets(revSecrets);
                }
                return _context12.abrupt('return', msg);

              case 3:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }), this);
    }

    /**
     * Called when a new message of type "secret" is received
     */

  }, {
    key: 'asyncHandleMsgSecrets',
    value: function asyncHandleMsgSecrets(msgSecrets) {
      var _this2 = this;

      if (this.state === Channel.STATE_BUILT_AND_STORED) {
        var _ret = function () {
          // TODO: Check validity
          _this2.state = Channel.STATE_INITIAL;
          var secrets = msgSecrets.getSecrets();
          if (_this2.myCommitments.length > 1) {
            // set secrets on commitment
            var commitment = _this2.myCommitments[_this2.myCommitments.length - 2];
            commitment.outputs = commitment.outputs.map(function (output, index) {
              output.revSecret.buf = output.revSecret.buf || secrets[index].buf;
              return output;
            });
          }
          return {
            v: _this2.asyncGetMsgSecrets()
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      } else if (this.state === Channel.STATE_STORED) {
        // TODO: Check validity
        this.state = Channel.STATE_INITIAL;
        return null;
      } else {
        return this.asyncError('Cannot receive msgSecret in ' + this.state + ' state');
      }
    }
  }, {
    key: 'asyncError',
    value: function asyncError(errStr) {
      this.state = Channel.STATE_ERROR;
      this.errStr = errStr;
      // TODO: What now? Close channel?
    }
  }], [{
    key: 'randomIndex',
    value: function randomIndex() {
      // non-hardened bip 32 path indices can be any 31 bit integer. (the 32nd
      // bit is used to specify the hardening, which is not used here).
      return Random.getRandomBuffer(4).readInt32BE(0) & 0x7fffffff;
    }

    /**
     * Return a random channel path
     */

  }, {
    key: 'randomChanPath',
    value: function randomChanPath() {
      var x = Channel.randomIndex();
      var y = Channel.randomIndex();
      return 'm/' + x + '/' + y;
    }
  }]);

  return Channel;
}(Struct);

Channel.STATE_INITIAL = 'initial';
Channel.STATE_ERROR = 'error';
Channel.STATE_BUILT_AND_STORED = 'built-and-stored';
Channel.STATE_BUILT = 'built';
Channel.STATE_STORED = 'stored';
Channel.STATE_CLOSED = 'closed';

module.exports = Channel;

},{"../lib/output":10,"../lib/txs/commitment":14,"../lib/txs/spending.js":16,"./msgs/msg-secrets":7,"./msgs/msg-update":8,"./scrts/secret":13,"asink":19,"yours-bitcoin/lib/address":324,"yours-bitcoin/lib/bn":327,"yours-bitcoin/lib/key-pair":334,"yours-bitcoin/lib/random":339,"yours-bitcoin/lib/script":340,"yours-bitcoin/lib/struct":342,"yours-bitcoin/lib/tx-out":346}],6:[function(require,module,exports){
'use strict';

var Bn = require('yours-bitcoin/lib/bn');

// see here for explanation: http://stackoverflow.com/questions/8595509/how-do-you-share-constants-in-nodejs-modules
function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true
  });
}

define('CSV_DELAY', Bn(100));

},{"yours-bitcoin/lib/bn":327}],7:[function(require,module,exports){
/**
 * MsgSecrets
 * ==========
 *
 * When an agent needs to reveal the secret for a particular hash. This works
 * either for an HTLC secret or a revocation secret.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Secret = require('../scrts/secret');
var Msg = require('./msg');

var MsgSecrets = function (_Msg) {
  _inherits(MsgSecrets, _Msg);

  function MsgSecrets() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { secrets: [] };
    var chanId = arguments[1];

    _classCallCheck(this, MsgSecrets);

    var cmd = 'secret';
    return _possibleConstructorReturn(this, (MsgSecrets.__proto__ || Object.getPrototypeOf(MsgSecrets)).call(this, cmd, args, chanId));
  }

  _createClass(MsgSecrets, [{
    key: 'setSecrets',
    value: function setSecrets(secrets) {
      this.args.secrets = secrets.map(function (secret) {
        return secret.toJSON();
      });
    }
  }, {
    key: 'getSecrets',
    value: function getSecrets() {
      return this.args.secrets.map(function (secret) {
        return new Secret().fromJSON(secret);
      });
    }
  }]);

  return MsgSecrets;
}(Msg);

module.exports = MsgSecrets;

},{"../scrts/secret":13,"./msg":9}],8:[function(require,module,exports){
/**
 * MsgUpdate
 * =========
 *
 * Message to update the commitment transaction. When an agent wishes to make a
 * payment or to update the commitment transaction for any other reason, such
 * as reducing the output list or changing the fee amount, they send an
 * 'update' message.  When an agent sends an update message with a new
 * commitment tx, they expect the other party to also send an update message
 * with a new commitment tx. Then both parties should revoke any old outputs.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Msg = require('./msg');
var Commitment = require('../../lib/txs/commitment');
var Bn = require('yours-bitcoin/lib/bn');

var MsgUpdate = function (_Msg) {
  _inherits(MsgUpdate, _Msg);

  function MsgUpdate(args, chanId) {
    _classCallCheck(this, MsgUpdate);

    var cmd = 'update';
    return _possibleConstructorReturn(this, (MsgUpdate.__proto__ || Object.getPrototypeOf(MsgUpdate)).call(this, cmd, args, chanId));
  }

  _createClass(MsgUpdate, [{
    key: 'setCommitment',
    value: function setCommitment(commitment) {
      this.args.commitment = commitment.toPublic().toJSON();
      return this;
    }
  }, {
    key: 'getCommitment',
    value: function getCommitment() {
      return Commitment.fromJSON(this.args.commitment);
    }
  }, {
    key: 'setFundingAmount',
    value: function setFundingAmount(fundingAmount) {
      this.args.fundingAmount = fundingAmount.toString();
      return this;
    }
  }, {
    key: 'getFundingAmount',
    value: function getFundingAmount() {
      return Bn(this.args.fundingAmount);
    }
  }]);

  return MsgUpdate;
}(Msg);

module.exports = MsgUpdate;

},{"../../lib/txs/commitment":14,"./msg":9,"yours-bitcoin/lib/bn":327}],9:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Protocol Message
 * ================
 *
 * - cmd: A short string specifying the command name, like 'open-channel'
 * - args: A json stringifiable object
 * - chanId: The id of the channel, which is the string form of the multiSig
 * address for the funding transaction of this channel.
 * - convId: The id of the conversation - often, a long series of messages need
 * to be exchanged in a particular order. Each sequence needs to share the same
 * 'conversation id' or 'convId'.
 */
var Struct = require('yours-bitcoin/lib/struct');
var Random = require('yours-bitcoin/lib/random');

var Msg = function (_Struct) {
  _inherits(Msg, _Struct);

  function Msg(cmd) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var chanId = arguments[2];
    var convId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Random.getRandomBuffer(16).toString('hex');
    var chanPath = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'm';

    _classCallCheck(this, Msg);

    var _this = _possibleConstructorReturn(this, (Msg.__proto__ || Object.getPrototypeOf(Msg)).call(this));

    _this.fromObject({
      cmd: cmd,
      args: args,
      chanId: chanId,
      convId: convId,
      chanPath: chanPath
    });
    return _this;
  }

  _createClass(Msg, [{
    key: 'setChanId',
    value: function setChanId(chanId) {
      this.chanId = chanId;
      return this;
    }
  }, {
    key: 'getChanId',
    value: function getChanId() {
      return this.chanId;
    }
  }, {
    key: 'setChanPath',
    value: function setChanPath(chanPath) {
      this.chanPath = chanPath;
      return this;
    }
  }, {
    key: 'getChanPath',
    value: function getChanPath() {
      return this.chanPath;
    }
  }, {
    key: 'setConvId',
    value: function setConvId(convId) {
      this.convId = convId;
      return this;
    }
  }, {
    key: 'getConvId',
    value: function getConvId() {
      return this.convId;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        cmd: this.cmd,
        args: this.args,
        chainId: this.chanId
      };
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      this.cmd = json.cmd;
      this.args = json.args;
      this.chainId = json.chanId;
      return this;
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      // TODO: Check validity of chanPath
      if (typeof this.cmd !== 'string' || this.cmd.length > 30 || this.cmd.length < 1) {
        return false;
      }
      if (_typeof(this.args) !== 'object') {
        // this.args CAN be an array
        return false;
      }
      if (typeof this.chanId !== 'string' || !(this.chanId.startsWith('3') || // mainnet
      this.chanId.startsWith('2') // testnet
      )) {
        return false;
      }
      if (typeof this.convId !== 'string') {
        return false;
      }
      return true;
    }
  }]);

  return Msg;
}(Struct);

module.exports = Msg;

},{"yours-bitcoin/lib/random":339,"yours-bitcoin/lib/struct":342}],10:[function(require,module,exports){
// just a dummy at this point
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Struct = require('yours-bitcoin/lib/struct');
var Bn = require('yours-bitcoin/lib/bn');
var Script = require('yours-bitcoin/lib/script');
var HtlcSecret = require('./scrts/htlc-secret');
var RevSecret = require('./scrts/rev-secret');

var Output = function (_Struct) {
  _inherits(Output, _Struct);

  function Output(kind, networkSourceId, channelSourceId, channelDestId, networkDestId, channelSourcePath, channelDestPath, htlcSecret, revSecret, amount, revocable, redeemScript, scriptPubkey) {
    _classCallCheck(this, Output);

    var _this = _possibleConstructorReturn(this, (Output.__proto__ || Object.getPrototypeOf(Output)).call(this));

    _this.fromObject({
      kind: kind,
      networkSourceId: networkSourceId,
      channelSourceId: channelSourceId,
      channelDestId: channelDestId,
      networkDestId: networkDestId,
      channelSourcePath: channelSourcePath,
      channelDestPath: channelDestPath,
      htlcSecret: htlcSecret,
      revSecret: revSecret,
      amount: amount,
      revocable: revocable,
      redeemScript: redeemScript,
      scriptPubkey: scriptPubkey
    });
    return _this;
  }

  _createClass(Output, [{
    key: 'fromJSON',
    value: function fromJSON(json) {
      this.channelSourcePath = json.channelSourcePath;
      this.channelDestPath = json.channelDestPath;
      this.networkSourceId = json.networkSourceId;
      this.channelSourceId = json.channelSourceId;
      this.channelDestId = json.channelDestId;
      this.networkDestId = json.networkDestId;
      this.kind = json.kind;
      this.htlcSecret = json.htlcSecret ? new HtlcSecret().fromJSON(json.htlcSecret) : undefined;
      this.revSecret = json.revSecret ? new RevSecret().fromJSON(json.revSecret) : undefined;
      this.amount = json.amount ? new Bn().fromJSON(json.amount) : undefined;
      this.revocable = json.revocable;
      this.redeemScript = json.redeemScript ? Script.fromJSON(json.redeemScript) : undefined;
      this.scriptPubkey = json.scriptPubkey ? Script.fromJSON(json.scriptPubkey) : undefined;
      return this;
    }
  }, {
    key: 'toPublic',
    value: function toPublic() {
      var outputDesc = new Output();
      outputDesc.channelSourcePath = this.channelSourcePath;
      outputDesc.channelDestPath = this.channelDestPath;
      outputDesc.networkSourceId = this.networkSourceId;
      outputDesc.channelSourceId = this.channelSourceId;
      outputDesc.channelDestId = this.channelDestId;
      outputDesc.networkDestId = this.networkDestId;
      outputDesc.kind = this.kind;
      outputDesc.htlcSecret = this.htlcSecret ? this.htlcSecret.toPublic() : undefined;
      outputDesc.revSecret = this.revSecret ? this.revSecret.toPublic() : undefined;
      outputDesc.amount = this.amount;
      outputDesc.revocable = this.revocable;
      outputDesc.redeemScript = this.redeemScript ? this.redeemScript.toJSON() : undefined;
      outputDesc.scriptPubkey = this.scriptPubkey ? this.scriptPubkey.toJSON() : undefined;
      return outputDesc;
    }
  }]);

  return Output;
}(Struct);

module.exports = Output;

},{"./scrts/htlc-secret":11,"./scrts/rev-secret":12,"yours-bitcoin/lib/bn":327,"yours-bitcoin/lib/script":340,"yours-bitcoin/lib/struct":342}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Secret = require('./secret');
var asink = require('asink');

var HtlcSecret = function (_Secret) {
  _inherits(HtlcSecret, _Secret);

  function HtlcSecret() {
    _classCallCheck(this, HtlcSecret);

    var _this = _possibleConstructorReturn(this, (HtlcSecret.__proto__ || Object.getPrototypeOf(HtlcSecret)).call(this));

    _this.fromObject({});
    return _this;
  }

  _createClass(HtlcSecret, [{
    key: 'asyncCheck',
    value: function asyncCheck(otherSecret) {
      return asink(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.asyncSuperCheck();

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }), this);
    }
  }, {
    key: 'toPublic',
    value: function toPublic() {
      var secret = new HtlcSecret();
      secret.hash = this.hash;
      return secret;
    }
  }]);

  return HtlcSecret;
}(Secret);

module.exports = HtlcSecret;

},{"./secret":13,"asink":19}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Secret = require('./secret');
var asink = require('asink');

var RevocationSecret = function (_Secret) {
  _inherits(RevocationSecret, _Secret);

  function RevocationSecret() {
    _classCallCheck(this, RevocationSecret);

    var _this = _possibleConstructorReturn(this, (RevocationSecret.__proto__ || Object.getPrototypeOf(RevocationSecret)).call(this));

    _this.fromObject({});
    return _this;
  }

  _createClass(RevocationSecret, [{
    key: 'asyncCheck',
    value: function asyncCheck(otherSecret) {
      return asink(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!otherSecret) {
                  _context.next = 3;
                  break;
                }

                if (!(!otherSecret.hash || otherSecret.hash.toString('hex') !== this.hash.toString('hex'))) {
                  _context.next = 3;
                  break;
                }

                throw new Error('Provided secret does not match local secret');

              case 3:
                _context.next = 5;
                return this.asyncSuperCheck();

              case 5:
                return _context.abrupt('return', _context.sent);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }), this);
    }
  }, {
    key: 'toPublic',
    value: function toPublic() {
      var secret = new RevocationSecret();
      secret.hash = this.hash;
      return secret;
    }
  }]);

  return RevocationSecret;
}(Secret);

module.exports = RevocationSecret;

},{"./secret":13,"asink":19}],13:[function(require,module,exports){
(function (Buffer){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Struct = require('yours-bitcoin/lib/struct');
var asink = require('asink');
var Hash = require('yours-bitcoin/lib/hash');
var Random = require('yours-bitcoin/lib/random');

var Secret = function (_Struct) {
  _inherits(Secret, _Struct);

  function Secret(buf, hash) {
    _classCallCheck(this, Secret);

    var _this = _possibleConstructorReturn(this, (Secret.__proto__ || Object.getPrototypeOf(Secret)).call(this));

    _this.fromObject({ buf: buf, hash: hash });
    return _this;
  }

  _createClass(Secret, [{
    key: 'asyncInitialize',
    value: function asyncInitialize() {
      return asink(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.generateBuf();
                _context.next = 3;
                return this.asyncGenerateHash();

              case 3:
                return _context.abrupt('return', this);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }), this);
    }
  }, {
    key: 'generateBuf',
    value: function generateBuf() {
      this.buf = Random.getRandomBuffer(32);
    }
  }, {
    key: 'asyncGenerateHash',
    value: function asyncGenerateHash() {
      return asink(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.buf) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', new Error('buffer must be generated before hash can be'));

              case 2:
                _context2.next = 4;
                return Hash.asyncSha256Ripemd160(this.buf);

              case 4:
                this.hash = _context2.sent;

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }), this);
    }
  }, {
    key: 'asyncSuperCheck',
    value: function asyncSuperCheck() {
      return asink(regeneratorRuntime.mark(function _callee3() {
        var hashedBuf;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.buf) {
                  _context3.next = 2;
                  break;
                }

                throw new Error('secret.buf is not set');

              case 2:
                if (this.hash) {
                  _context3.next = 4;
                  break;
                }

                throw new Error('secret.hash is not set');

              case 4:
                _context3.next = 6;
                return Hash.asyncSha256Ripemd160(this.buf);

              case 6:
                hashedBuf = _context3.sent;
                return _context3.abrupt('return', hashedBuf.equals(this.hash));

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }), this);
    }

    /*
     * returns a new secret with the buffer toPublic
     */

  }, {
    key: 'toPublic',
    value: function toPublic() {
      var secret = new Secret().fromObject(this);
      secret.buf = undefined;
      return secret;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var json = {};
      json.buf = this.buf ? this.buf.toString('hex') : undefined;
      json.hash = this.hash ? this.hash.toString('hex') : undefined;
      return json;
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      this.buf = json.buf ? new Buffer(json.buf, 'hex') : undefined;
      this.hash = json.hash ? new Buffer(json.hash, 'hex') : undefined;
      return this;
    }
  }]);

  return Secret;
}(Struct);

module.exports = Secret;

}).call(this,require("buffer").Buffer)

},{"asink":19,"buffer":23,"yours-bitcoin/lib/hash":333,"yours-bitcoin/lib/random":339,"yours-bitcoin/lib/struct":342}],14:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var asink = require('asink');
var Tx = require('./tx');
var Output = require('../output');
var TxBuilder = require('yours-bitcoin/lib/tx-builder');
var Script = require('yours-bitcoin/lib/script');
var OpCode = require('yours-bitcoin/lib/op-code');
var Address = require('yours-bitcoin/lib/address');
var Bn = require('yours-bitcoin/lib/bn');
var Consts = require('../consts.js');

var Commitment = function (_Tx) {
  _inherits(Commitment, _Tx);

  function Commitment(outputs, txb) {
    _classCallCheck(this, Commitment);

    return _possibleConstructorReturn(this, (Commitment.__proto__ || Object.getPrototypeOf(Commitment)).call(this, { outputs: outputs, txb: txb }));
  }

  _createClass(Commitment, [{
    key: 'asyncBuild',
    value: function asyncBuild(fundingTxHash, fundingTxOut, multisigAddress, builderId, xPubs) {
      return asink(regeneratorRuntime.mark(function _callee() {
        var i;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.outputs) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Commitment not sufficiently initialized');

              case 2:

                this.txb = new TxBuilder();
                this.txb.inputFromScriptHashMultiSig(fundingTxHash, 0, fundingTxOut, multisigAddress.script);
                for (i = 0; i < this.outputs.length; i++) {
                  // build output scripts
                  this.outputs[i].revocable = this.outputs[i].channelDestId !== builderId;
                  this.outputs[i].redeemScript = this.buildRedeemScript(this.outputs[i], builderId, xPubs);
                  this.outputs[i].scriptPubkey = Address.fromRedeemScript(this.outputs[i].redeemScript).toScript();

                  if (i < this.outputs.length - 1) {
                    this.txb.outputToScript(this.outputs[i].amount, this.outputs[i].scriptPubkey);
                  } else {
                    this.txb.setChangeScript(this.outputs[i].scriptPubkey);
                  }
                }

                this.txb.build();
                _context.next = 8;
                return this.txb.asyncSign(0, multisigAddress.keyPair, fundingTxOut);

              case 8:
                return _context.abrupt('return', this);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }), this);
    }
  }, {
    key: 'buildRedeemScript',
    value: function buildRedeemScript(outputObject, builderId, xPubs) {
      if (outputObject.kind === undefined) {
        throw new Error('Insufficient arguments for buildRedeemScript');
      }

      var sourcePath = outputObject.channelSourcePath;
      var sourceBip = xPubs[outputObject.channelSourceId];
      var sourcePubKey = sourceBip.derive(sourcePath).pubKey; // TODO: asyncDerive

      var destPath = outputObject.channelDestPath;
      var destBip = xPubs[outputObject.channelDestId];
      var destPubKey = destBip.derive(destPath).pubKey; // TODO: asyncDerive

      if (outputObject.kind === 'pubKey' && outputObject.channelDestId === builderId) {
        // build an spend to pubkey script
        return this.pubKeyRedeemScript(destPubKey);
      } else if (outputObject.kind === 'pubKey' && outputObject.channelDestId !== builderId) {
        // build a revocable spend to pubkey script
        return this.revPubKeyRedeemScript(destPubKey, sourcePubKey, outputObject);
      } else if (outputObject.kind === 'htlc' && outputObject.channelDestId === builderId) {
        // build an HTLC script
        return this.htlcRedeemScript(destPubKey, sourcePubKey, outputObject);
      }if (outputObject.kind === 'htlc' && outputObject.channelDestId !== builderId) {
        // build a revocable HTLC sctipt
        return this.revHtlcRedeemScript(destPubKey, sourcePubKey, outputObject);
      } else {
        throw new Error('invalid kind in Commitment.asyncBuild');
      }
    }
  }, {
    key: 'pubKeyRedeemScript',
    value: function pubKeyRedeemScript(destPubKey) {
      // output to channel dest
      return new Script().writeBuffer(destPubKey.toBuffer()).writeOpCode(OpCode.OP_CHECKSIG);
    }

    // all checks but the last should be ...VERIFY

  }, {
    key: 'revPubKeyRedeemScript',
    value: function revPubKeyRedeemScript(destPubKey, sourcePubKey, outputObject) {
      return new Script().writeOpCode(OpCode.OP_IF)
      // output to channel dest
      // encumbered by a CSV_DELAY CSV time lock
      // time lock is needed to allow channel source to spend via branch 2
      // should the tx be revoked
      .writeBuffer(destPubKey.toBuffer()).writeOpCode(OpCode.OP_CHECKSIG).writeBn(outputObject.csvDelay || Consts.CSV_DELAY).writeOpCode(OpCode.OP_CHECKSEQUENCEVERIFY).writeOpCode(OpCode.OP_DROP).writeOpCode(OpCode.OP_ELSE)
      // output to channel source
      // sourcePubKey & owner's revocation secret needed to spend
      // this branch is used if a revoked commitment tx has been broadcast
      .writeBuffer(sourcePubKey.toBuffer()).writeOpCode(OpCode.OP_CHECKSIGVERIFY).writeOpCode(OpCode.OP_HASH160).writeBuffer(outputObject.revSecret.hash).writeOpCode(OpCode.OP_EQUAL).writeOpCode(OpCode.OP_ENDIF);
    }
  }, {
    key: 'htlcRedeemScript',
    value: function htlcRedeemScript(destPubKey, sourcePubKey, outputObject) {
      var script = new Script().writeOpCode(OpCode.OP_IF)
      // output to channel dest
      // channel dest's sig & and network dest's HTLC secret needed to spend
      // this branch can be spent if chanel dest has the htlc secret
      .writeBuffer(destPubKey.toBuffer()) // push the agent's pubKey
      .writeOpCode(OpCode.OP_CHECKSIGVERIFY) // check sig against redeem script
      .writeOpCode(OpCode.OP_HASH160) // hash htlc secret from redeem script
      .writeBuffer(outputObject.htlcSecret.hash) // push htlc secret hash of the htlc secret
      .writeOpCode(OpCode.OP_EQUAL) // check equality
      .writeOpCode(OpCode.OP_ELSE)
      // output to channel source
      // channel source's sig needed to spend, subject to SVC lock
      // this branch can be spent if channel dest does not reveil the htlc secret in time
      .writeBuffer(sourcePubKey.toBuffer()).writeOpCode(OpCode.OP_CHECKSIG).writeBn(outputObject.csvDelay || Consts.CSV_DELAY).writeOpCode(OpCode.OP_CHECKSEQUENCEVERIFY).writeOpCode(OpCode.OP_DROP).writeOpCode(OpCode.OP_ENDIF);
      return script;
    }
  }, {
    key: 'revHtlcRedeemScript',
    value: function revHtlcRedeemScript(destPubKey, sourcePubKey, outputObject) {
      var longDelay = outputObject.csvDelay || Consts.CSV_DELAY;
      var shortDelay = longDelay.div(Bn(2));
      return new Script().writeOpCode(OpCode.OP_IF)
      // output to channel dest
      // channel dest's sig & and network dest's HTLC secret needed to spend
      // this branch can be spent if chanel dest has the htlc secret
      // corresponds to the first branch of the htlc script
      // must be encumbered by a time lock to allow channel source to spend if tx was revoked
      .writeBuffer(destPubKey.toBuffer()) // check pubkey
      .writeOpCode(OpCode.OP_CHECKSIGVERIFY).writeOpCode(OpCode.OP_HASH160) // check htlc secret
      .writeBuffer(outputObject.htlcSecret.hash).writeOpCode(OpCode.OP_EQUALVERIFY).writeBn(shortDelay) // check time lock
      .writeOpCode(OpCode.OP_CHECKSEQUENCEVERIFY).writeOpCode(OpCode.OP_ELSE).writeOpCode(OpCode.OP_IF)
      // output to channel source
      // channel source's sig needed to spend, subject to SVC lock
      // this branch can be spent if channel dest does not reveil the htlc secret in time
      // corresponds to second branch of htlc script
      .writeBuffer(sourcePubKey.toBuffer()).writeOpCode(OpCode.OP_CHECKSIG).writeBn(longDelay).writeOpCode(OpCode.OP_CHECKSEQUENCEVERIFY).writeOpCode(OpCode.OP_DROP).writeOpCode(OpCode.OP_ELSE)
      // output to channel source
      // sourcePubKey & owner's revocation secret needed to spend
      // this branch is used if a revoked commitment tx has been broadcast
      // this corresponds to second branch of rev pubKey script
      .writeBuffer(sourcePubKey.toBuffer()).writeOpCode(OpCode.OP_CHECKSIGVERIFY).writeOpCode(OpCode.OP_HASH160).writeBuffer(outputObject.revSecret.hash).writeOpCode(OpCode.OP_EQUAL).writeOpCode(OpCode.OP_ENDIF).writeOpCode(OpCode.OP_ENDIF);
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      if (json.outputs) {
        this.outputs = [];
        for (var i in json.outputs) {
          this.outputs.push(new Output().fromJSON(json.outputs[i]));
        }
      }
      this.txb = json.txb ? new TxBuilder().fromJSON(json.txb) : undefined;
      return this;
    }
  }, {
    key: 'toPublic',
    value: function toPublic() {
      var commitment = new Commitment().fromObject();
      if (this.outputs) {
        commitment.outputs = [];
        for (var i in this.outputs) {
          commitment.outputs.push(this.outputs[i].toPublic());
        }
      }
      commitment.txb = this.txb;
      return commitment;
    }
  }]);

  return Commitment;
}(Tx);

module.exports = Commitment;

},{"../consts.js":6,"../output":10,"./tx":17,"asink":19,"yours-bitcoin/lib/address":324,"yours-bitcoin/lib/bn":327,"yours-bitcoin/lib/op-code":335,"yours-bitcoin/lib/script":340,"yours-bitcoin/lib/tx-builder":343}],15:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var asink = require('asink');
var TxBuilder = require('yours-bitcoin/lib/tx-builder');
var Tx = require('./tx');

var Funding = function (_Tx) {
  _inherits(Funding, _Tx);

  function Funding() {
    _classCallCheck(this, Funding);

    var _this = _possibleConstructorReturn(this, (Funding.__proto__ || Object.getPrototypeOf(Funding)).call(this));

    _this.fromObject({});
    return _this;
  }

  _createClass(Funding, [{
    key: 'asyncInitialize',
    value: function asyncInitialize(amount, sourceAddress, multisigAddress, inputTxHashbuf, inputTxoutnum, inputTxout, pubKey) {
      return asink(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!amount || !sourceAddress || !multisigAddress || !inputTxHashbuf || typeof inputTxoutnum !== 'number' || !inputTxout || !pubKey)) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Insufficient arguments for Funding.asyncInitialize');

              case 2:

                this.amount = amount;
                this.txb = new TxBuilder();
                this.txb.inputFromPubKeyHash(inputTxHashbuf, inputTxoutnum, inputTxout, pubKey);
                this.txb.setChangeAddress(sourceAddress.address);
                this.txb.outputToAddress(amount, multisigAddress.address);
                this.txb.build();
                this.txb.sign(0, sourceAddress.keyPair, inputTxout);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }), this);
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      this.fromObject({
        amount: json.amount,
        txb: new TxBuilder().fromJSON(json.txb)
      });
      return this;
    }
  }, {
    key: 'asyncToPublic',
    value: function asyncToPublic() {
      return asink(regeneratorRuntime.mark(function _callee2() {
        var funding, hash;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                funding = new Funding();
                _context2.next = 3;
                return this.txb.tx.asyncHash();

              case 3:
                hash = _context2.sent;

                funding.amount = this.amount;
                funding.txb = new TxBuilder();
                funding.txb.tx.txOuts = this.txb.tx.txOuts;
                funding.txb.tx.hash = function () {
                  return hash;
                };
                return _context2.abrupt('return', funding);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }), this);
    }
  }]);

  return Funding;
}(Tx);

module.exports = Funding;

},{"./tx":17,"asink":19,"yours-bitcoin/lib/tx-builder":343}],16:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var asink = require('asink');
var Tx = require('./tx');
var TxBuilder = require('yours-bitcoin/lib/tx-builder');
var Script = require('yours-bitcoin/lib/script');
var Sig = require('yours-bitcoin/lib/sig');
var OpCode = require('yours-bitcoin/lib/op-code');
var Hash = require('yours-bitcoin/lib/hash');
var KeyPair = require('yours-bitcoin/lib/key-pair');
var Bn = require('yours-bitcoin/lib/bn');
var Consts = require('../consts.js');

var Spending = function (_Tx) {
  _inherits(Spending, _Tx);

  function Spending(txb) {
    _classCallCheck(this, Spending);

    return _possibleConstructorReturn(this, (Spending.__proto__ || Object.getPrototypeOf(Spending)).call(this, { txb: txb }));
  }

  /*
  * Used to build destination transactions in which spend from non-standard outputs
  * like htlc or rhtlc. Conveniance function that all destination transactions call
  */


  _createClass(Spending, [{
    key: 'asyncBuild',
    value: function asyncBuild(address, commitment, xPrv, myId, commitmentTxDepth, secretMap) {
      return asink(regeneratorRuntime.mark(function _callee() {
        var i, scriptSig, nIn, _i, path, keyPair, sig;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.txb = new TxBuilder();
                this.txb.setVersion(2);

                // build input scripts form outputs
                for (i in commitment.outputs) {
                  i = parseInt(i);
                  Object.assign(commitment.outputs[i], this.buildInputScript(commitment.outputs[i], myId, commitmentTxDepth, secretMap));

                  if (commitment.outputs[i].partialScriptSig) {
                    scriptSig = this.toP2shInput(commitment.outputs[i].partialScriptSig, commitment.outputs[i].redeemScript);

                    this.txb.inputFromScript(commitment.txb.tx.hash(), i, commitment.txb.tx.txOuts[i], scriptSig, commitment.outputs[i].csvDelay || Consts.CSV_DELAY);
                  }
                }

                if (this.txb.txIns.length) {
                  _context.next = 5;
                  break;
                }

                throw new Error('no spendable outputs found');

              case 5:

                this.txb.setChangeAddress(address);
                this.txb.build(true);

                // sign the input scripts
                nIn = 0;
                _context.t0 = regeneratorRuntime.keys(commitment.outputs);

              case 9:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 28;
                  break;
                }

                _i = _context.t1.value;

                _i = parseInt(_i);

                if (!commitment.outputs[_i].partialScriptSig) {
                  _context.next = 26;
                  break;
                }

                path = commitment.outputs[_i].channelDestPath;
                _context.t2 = KeyPair;
                _context.next = 17;
                return xPrv.asyncDerive(path);

              case 17:
                _context.t3 = _context.sent.privKey;
                _context.next = 20;
                return xPrv.asyncDerive(path);

              case 20:
                _context.t4 = _context.sent.pubKey;
                keyPair = new _context.t2(_context.t3, _context.t4);
                sig = this.txb.getSig(keyPair, Sig.SIGHASH_ALL, nIn, commitment.outputs[_i].redeemScript);

                commitment.outputs[_i].partialScriptSig.setChunkBuffer(commitment.outputs[_i].sigPos, sig.toTxFormat());
                this.txb.tx.txIns[nIn].setScript(commitment.outputs[_i].partialScriptSig);
                nIn++;

              case 26:
                _context.next = 9;
                break;

              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }), this);
    }
  }, {
    key: 'buildInputScript',
    value: function buildInputScript(outputObject, myId, commitmentTxDepth, secretMap) {
      if (outputObject.kind === 'pubKey' && !outputObject.revocable) {
        return this.pubKeyInputScript(outputObject, myId);
      } else if (outputObject.kind === 'pubKey' && outputObject.revocable) {
        return this.revPubKeyInputScript(outputObject, myId, commitmentTxDepth, secretMap);
      } else if (outputObject.kind === 'htlc' && !outputObject.revocable) {
        return this.htlcInputScript(outputObject, myId, commitmentTxDepth, secretMap);
      } else if (outputObject.kind === 'htlc' && outputObject.revocable) {
        return this.revHtlcInputScript(outputObject, myId, commitmentTxDepth, secretMap);
      }
    }

    /* spending from pubkey script */

  }, {
    key: 'pubKeyInputScript',
    value: function pubKeyInputScript(outputObject, myId) {
      if (myId === outputObject.channelDestId) {
        return {
          partialScriptSig: new Script().writeOpCode(OpCode.OP_TRUE), // signature will go here
          sigPos: 0
        };
      } else {
        return {};
      }
    }

    /* spending from revocable pubkey script */

  }, {
    key: 'revPubKeyInputScript',
    value: function revPubKeyInputScript(outputObject, myId, commitmentTxDepth, secretMap) {
      var csvDelay = outputObject.csvDelay || Consts.CSV_DELAY;
      if (myId === outputObject.channelDestId && parseInt(commitmentTxDepth) >= parseInt(csvDelay)) {
        return {
          partialScriptSig: new Script().writeOpCode(OpCode.OP_TRUE) // signature will go here
          .writeOpCode(OpCode.OP_TRUE),
          sigPos: 0
        };
      } else if (myId !== outputObject.channelDestId && outputObject.revSecret.buf) {
        var revSecretBuf = secretMap.get(outputObject.revSecret.hash.toString('hex'));
        return {
          partialScriptSig: new Script().writeBuffer(revSecretBuf).writeOpCode(OpCode.OP_TRUE) // signature will go here
          .writeOpCode(OpCode.OP_FALSE),
          sigPos: 1
        };
      } else {
        return {};
      }
    }

    /* spending from htlc script */

  }, {
    key: 'htlcInputScript',
    value: function htlcInputScript(outputObject, myId, commitmentTxDepth, secretMap) {
      var csvDelay = outputObject.csvDelay || Consts.CSV_DELAY;
      var htlcSecretBuf = secretMap.get(outputObject.htlcSecret.hash.toString('hex'));

      if (myId === outputObject.channelDestId && htlcSecretBuf) {
        // spends from branch 1 of htlc
        return {
          partialScriptSig: new Script().writeBuffer(htlcSecretBuf).writeOpCode(OpCode.OP_TRUE) // signature will go here
          .writeOpCode(OpCode.OP_TRUE),
          sigPos: 1
        };
      } else if (myId !== outputObject.channelDestId && parseInt(commitmentTxDepth) >= parseInt(csvDelay)) {
        // spends from branch 2 of htlc
        return {
          partialScriptSig: new Script().writeOpCode(OpCode.OP_TRUE) // signature will go here
          .writeOpCode(OpCode.OP_FALSE),
          sigPos: 0
        };
      } else {
        return {};
      }
    }
  }, {
    key: 'revHtlcInputScript',
    value: function revHtlcInputScript(outputObject, myId, commitmentTxDepth, secretMap) {
      var longDelay = outputObject.csvDelay || Consts.CSV_DELAY;
      var shortDelay = longDelay.div(Bn(2));
      var htlcSecretBuf = secretMap.get(outputObject.htlcSecret.hash.toString('hex'));
      var revSecretBuf = secretMap.get(outputObject.revSecret.hash.toString('hex'));

      if (myId === outputObject.channelDestId && htlcSecretBuf && parseInt(commitmentTxDepth) >= parseInt(shortDelay)) {
        // spends from branch 1 of rhtlc
        return {
          partialScriptSig: new Script().writeBuffer(htlcSecretBuf).writeOpCode(OpCode.OP_TRUE) // signature will go here
          .writeOpCode(OpCode.OP_TRUE),
          sigPos: 1
        };
      } else if (myId !== outputObject.channelDestId && parseInt(commitmentTxDepth) >= parseInt(longDelay)) {
        // check CSV constraint here
        // spends from branch 2 of rhtlc
        return {
          partialScriptSig: new Script().writeOpCode(OpCode.OP_TRUE) // signature will go here
          .writeOpCode(OpCode.OP_TRUE).writeOpCode(OpCode.OP_FALSE),
          sigPos: 0
        };
      } else if (myId !== outputObject.channelDestId && revSecretBuf) {
        // spends from branch 3 of rhtlc
        return {
          partialScriptSig: new Script().writeBuffer(revSecretBuf).writeOpCode(OpCode.OP_TRUE) // signature will go here
          .writeOpCode(OpCode.OP_FALSE).writeOpCode(OpCode.OP_FALSE),
          sigPos: 1
        };
      } else {
        return {};
      }
    }
  }, {
    key: 'toP2shInput',
    value: function toP2shInput(script, redeemScript) {
      if (!script || !redeemScript) {
        throw new Error('Insufficient parameters for toP2shInput');
      }
      return script.writeBuffer(redeemScript.toBuffer());
    }
  }, {
    key: 'asyncToP2shOutput',
    value: function asyncToP2shOutput(script) {
      return asink(regeneratorRuntime.mark(function _callee2() {
        var scriptHash;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (script) {
                  _context2.next = 2;
                  break;
                }

                throw new Error('Insufficient parameters for asyncToP2shOutput');

              case 2:
                _context2.next = 4;
                return Hash.asyncSha256Ripemd160(script.toBuffer());

              case 4:
                scriptHash = _context2.sent;
                return _context2.abrupt('return', new Script().writeOpCode(OpCode.OP_HASH160).writeBuffer(scriptHash).writeOpCode(OpCode.OP_EQUAL));

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }), this);
    }
  }]);

  return Spending;
}(Tx);

module.exports = Spending;

},{"../consts.js":6,"./tx":17,"asink":19,"yours-bitcoin/lib/bn":327,"yours-bitcoin/lib/hash":333,"yours-bitcoin/lib/key-pair":334,"yours-bitcoin/lib/op-code":335,"yours-bitcoin/lib/script":340,"yours-bitcoin/lib/sig":341,"yours-bitcoin/lib/tx-builder":343}],17:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var asink = require('asink');
var Hash = require('yours-bitcoin/lib/hash');
var Struct = require('yours-bitcoin/lib/struct');
var Script = require('yours-bitcoin/lib/script');
var OpCode = require('yours-bitcoin/lib/op-code');

var Tx = function (_Struct) {
  _inherits(Tx, _Struct);

  function Tx() {
    _classCallCheck(this, Tx);

    var _this = _possibleConstructorReturn(this, (Tx.__proto__ || Object.getPrototypeOf(Tx)).call(this));

    _this.fromObject({});
    return _this;
  }

  _createClass(Tx, [{
    key: 'toP2shInput',
    value: function toP2shInput(script, redeemScript) {
      if (!script || !redeemScript) {
        throw new Error('Insufficient parameters for toP2shInput');
      }
      var newScript = Script.fromBuffer(script.toBuffer()); // copy
      newScript.writeBuffer(redeemScript.toBuffer());
      return newScript;
    }
  }, {
    key: 'asyncToP2shOutput',
    value: function asyncToP2shOutput(script) {
      return asink(regeneratorRuntime.mark(function _callee() {
        var scriptHash;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (script) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Insufficient parameters for asyncToP2shOutput');

              case 2:
                _context.next = 4;
                return Hash.asyncSha256Ripemd160(script.toBuffer());

              case 4:
                scriptHash = _context.sent;
                return _context.abrupt('return', new Script().writeOpCode(OpCode.OP_HASH160).writeBuffer(scriptHash).writeOpCode(OpCode.OP_EQUAL));

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }), this);
    }
  }]);

  return Tx;
}(Struct);

module.exports = Tx;

},{"asink":19,"yours-bitcoin/lib/hash":333,"yours-bitcoin/lib/op-code":335,"yours-bitcoin/lib/script":340,"yours-bitcoin/lib/struct":342}],18:[function(require,module,exports){
(function (Buffer){
// just a dummy at this point
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Struct = require('yours-bitcoin/lib/struct');
var Txout = require('yours-bitcoin/lib/tx-out');
var Address = require('yours-bitcoin/lib/address');

var Wallet = function (_Struct) {
  _inherits(Wallet, _Struct);

  function Wallet() {
    _classCallCheck(this, Wallet);

    var _this = _possibleConstructorReturn(this, (Wallet.__proto__ || Object.getPrototypeOf(Wallet)).call(this));

    _this.fromObject({});
    return _this;
  }

  /*
   * just a mockup at this point
   */


  _createClass(Wallet, [{
    key: 'getUnspentOutput',
    value: function getUnspentOutput(amount, pubkey) {
      // from line 444 scritp-examples
      var inputTxAddress = Address.fromPubKey(pubkey);
      var scriptPubkey = inputTxAddress.toScript();
      var inputTxHashbuf = new Buffer(32);
      inputTxHashbuf.fill(0); // a fake, non-existent input transaction
      var inputTxoutnum = 0;
      var inputTxout = new Txout(amount).setScript(scriptPubkey);

      return {
        inputTxout: new Txout(amount).setScript(inputTxAddress.toScript()),
        txhashbuf: inputTxHashbuf,
        txoutnum: inputTxoutnum,
        txout: inputTxout,
        pubKey: pubkey
      };
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      this.fromObject({});
      return this;
    }
  }, {
    key: 'toPublic',
    value: function toPublic() {
      return this;
    }
  }]);

  return Wallet;
}(Struct);

module.exports = Wallet;

}).call(this,require("buffer").Buffer)

},{"buffer":23,"yours-bitcoin/lib/address":324,"yours-bitcoin/lib/struct":342,"yours-bitcoin/lib/tx-out":346}],19:[function(require,module,exports){
/**
 * asink
 * =====
 *
 * asink is the same thing as, or a rename of, spawn. spawn in turn is a tool
 * for repeatedly calling the .thens of promises yielded by a generator.
 * Basically, this makes it possible to write asynchronous, promisified code
 * with normal try/catches that look just like synchronous code. It creates
 * shorter and easier to understand code. Hypothetically, there will be a
 * feature in the next version of javascript, ES7, called "async functions",
 * which do exactly what asink does. When/if that happens and we can access it
 * in node, we can simply remove all calls to asink and our code should behave
 * in the same way.
 *
 * See:
 * http://tc39.github.io/ecmascript-asyncawait/
 * https://github.com/tc39/ecmascript-asyncawait
 * https://gist.github.com/jakearchibald/31b89cba627924972ad6
 * http://www.html5rocks.com/en/tutorials/es6/promises/
 * https://blogs.windows.com/msedgedev/2015/09/30/asynchronous-code-gets-easier-with-es2016-async-function-support-in-chakra-and-microsoft-edge/
 */
'use strict';

function spawn(genF, self) {
  return new Promise(function (resolve, reject) {
    var gen = genF.call(self);
    function step(nextF) {
      var next;
      try {
        next = nextF();
      } catch (e) {
        // finished with failure, reject the promise
        reject(e);
        return;
      }
      if (next.done) {
        // finished with success, resolve the promise
        resolve(next.value);
        return;
      }
      // not finished, chain off the yielded promise and `step` again
      Promise.resolve(next.value).then(function (v) {
        step(function () {
          return gen.next(v);
        });
      }, function (e) {
        step(function () {
          return gen.throw(e);
        });
      });
    }
    step(function () {
      return gen.next(undefined);
    });
  });
}
module.exports = spawn;

},{}],20:[function(require,module,exports){
(function (global){
"use strict";

require("core-js/shim");

require("regenerator-runtime/runtime");

require("core-js/fn/regexp/escape");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"core-js/fn/regexp/escape":24,"core-js/shim":317,"regenerator-runtime/runtime":323}],21:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],22:[function(require,module,exports){

},{}],23:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"base64-js":21,"ieee754":318,"isarray":320}],24:[function(require,module,exports){
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;
},{"../../modules/_core":45,"../../modules/core.regexp.escape":141}],25:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],26:[function(require,module,exports){
var cof = require('./_cof');
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};
},{"./_cof":40}],27:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"./_hide":62,"./_wks":139}],28:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],29:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":71}],30:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};
},{"./_to-index":127,"./_to-length":130,"./_to-object":131}],31:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};
},{"./_to-index":127,"./_to-length":130,"./_to-object":131}],32:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":59}],33:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":127,"./_to-iobject":129,"./_to-length":130}],34:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = require('./_ctx')
  , IObject  = require('./_iobject')
  , toObject = require('./_to-object')
  , toLength = require('./_to-length')
  , asc      = require('./_array-species-create');
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./_array-species-create":37,"./_ctx":47,"./_iobject":67,"./_to-length":130,"./_to-object":131}],35:[function(require,module,exports){
var aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , IObject   = require('./_iobject')
  , toLength  = require('./_to-length');

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};
},{"./_a-function":25,"./_iobject":67,"./_to-length":130,"./_to-object":131}],36:[function(require,module,exports){
var isObject = require('./_is-object')
  , isArray  = require('./_is-array')
  , SPECIES  = require('./_wks')('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};
},{"./_is-array":69,"./_is-object":71,"./_wks":139}],37:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};
},{"./_array-species-constructor":36}],38:[function(require,module,exports){
'use strict';
var aFunction  = require('./_a-function')
  , isObject   = require('./_is-object')
  , invoke     = require('./_invoke')
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};
},{"./_a-function":25,"./_invoke":66,"./_is-object":71}],39:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":40,"./_wks":139}],40:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],41:[function(require,module,exports){
'use strict';
var dP          = require('./_object-dp').f
  , create      = require('./_object-create')
  , redefineAll = require('./_redefine-all')
  , ctx         = require('./_ctx')
  , anInstance  = require('./_an-instance')
  , defined     = require('./_defined')
  , forOf       = require('./_for-of')
  , $iterDefine = require('./_iter-define')
  , step        = require('./_iter-step')
  , setSpecies  = require('./_set-species')
  , DESCRIPTORS = require('./_descriptors')
  , fastKey     = require('./_meta').fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./_an-instance":28,"./_ctx":47,"./_defined":49,"./_descriptors":50,"./_for-of":59,"./_iter-define":75,"./_iter-step":77,"./_meta":84,"./_object-create":88,"./_object-dp":89,"./_redefine-all":108,"./_set-species":113}],42:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof')
  , from    = require('./_array-from-iterable');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};
},{"./_array-from-iterable":32,"./_classof":39}],43:[function(require,module,exports){
'use strict';
var redefineAll       = require('./_redefine-all')
  , getWeak           = require('./_meta').getWeak
  , anObject          = require('./_an-object')
  , isObject          = require('./_is-object')
  , anInstance        = require('./_an-instance')
  , forOf             = require('./_for-of')
  , createArrayMethod = require('./_array-methods')
  , $has              = require('./_has')
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};
},{"./_an-instance":28,"./_an-object":29,"./_array-methods":34,"./_for-of":59,"./_has":61,"./_is-object":71,"./_meta":84,"./_redefine-all":108}],44:[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , $export           = require('./_export')
  , redefine          = require('./_redefine')
  , redefineAll       = require('./_redefine-all')
  , meta              = require('./_meta')
  , forOf             = require('./_for-of')
  , anInstance        = require('./_an-instance')
  , isObject          = require('./_is-object')
  , fails             = require('./_fails')
  , $iterDetect       = require('./_iter-detect')
  , setToStringTag    = require('./_set-to-string-tag')
  , inheritIfRequired = require('./_inherit-if-required');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./_an-instance":28,"./_export":54,"./_fails":56,"./_for-of":59,"./_global":60,"./_inherit-if-required":65,"./_is-object":71,"./_iter-detect":76,"./_meta":84,"./_redefine":109,"./_redefine-all":108,"./_set-to-string-tag":114}],45:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],46:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp')
  , createDesc      = require('./_property-desc');

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};
},{"./_object-dp":89,"./_property-desc":107}],47:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":25}],48:[function(require,module,exports){
'use strict';
var anObject    = require('./_an-object')
  , toPrimitive = require('./_to-primitive')
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};
},{"./_an-object":29,"./_to-primitive":132}],49:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],50:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":56}],51:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":60,"./_is-object":71}],52:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],53:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":95,"./_object-keys":98,"./_object-pie":99}],54:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , hide      = require('./_hide')
  , redefine  = require('./_redefine')
  , ctx       = require('./_ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":45,"./_ctx":47,"./_global":60,"./_hide":62,"./_redefine":109}],55:[function(require,module,exports){
var MATCH = require('./_wks')('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};
},{"./_wks":139}],56:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],57:[function(require,module,exports){
'use strict';
var hide     = require('./_hide')
  , redefine = require('./_redefine')
  , fails    = require('./_fails')
  , defined  = require('./_defined')
  , wks      = require('./_wks');

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};
},{"./_defined":49,"./_fails":56,"./_hide":62,"./_redefine":109,"./_wks":139}],58:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};
},{"./_an-object":29}],59:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":29,"./_ctx":47,"./_is-array-iter":68,"./_iter-call":73,"./_to-length":130,"./core.get-iterator-method":140}],60:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],61:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],62:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":50,"./_object-dp":89,"./_property-desc":107}],63:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":60}],64:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":50,"./_dom-create":51,"./_fails":56}],65:[function(require,module,exports){
var isObject       = require('./_is-object')
  , setPrototypeOf = require('./_set-proto').set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};
},{"./_is-object":71,"./_set-proto":112}],66:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],67:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":40}],68:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":78,"./_wks":139}],69:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":40}],70:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object')
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"./_is-object":71}],71:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],72:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object')
  , cof      = require('./_cof')
  , MATCH    = require('./_wks')('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"./_cof":40,"./_is-object":71,"./_wks":139}],73:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":29}],74:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":62,"./_object-create":88,"./_property-desc":107,"./_set-to-string-tag":114,"./_wks":139}],75:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":54,"./_has":61,"./_hide":62,"./_iter-create":74,"./_iterators":78,"./_library":80,"./_object-gpo":96,"./_redefine":109,"./_set-to-string-tag":114,"./_wks":139}],76:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":139}],77:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],78:[function(require,module,exports){
module.exports = {};
},{}],79:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":98,"./_to-iobject":129}],80:[function(require,module,exports){
module.exports = false;
},{}],81:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;
},{}],82:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],83:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],84:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":56,"./_has":61,"./_is-object":71,"./_object-dp":89,"./_uid":136}],85:[function(require,module,exports){
var Map     = require('./es6.map')
  , $export = require('./_export')
  , shared  = require('./_shared')('metadata')
  , store   = shared.store || (shared.store = new (require('./es6.weak-map')));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};
},{"./_export":54,"./_shared":116,"./es6.map":171,"./es6.weak-map":277}],86:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":40,"./_global":60,"./_task":126}],87:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":56,"./_iobject":67,"./_object-gops":95,"./_object-keys":98,"./_object-pie":99,"./_to-object":131}],88:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":29,"./_dom-create":51,"./_enum-bug-keys":52,"./_html":63,"./_object-dps":90,"./_shared-key":115}],89:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":29,"./_descriptors":50,"./_ie8-dom-define":64,"./_to-primitive":132}],90:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":29,"./_descriptors":50,"./_object-dp":89,"./_object-keys":98}],91:[function(require,module,exports){
// Forced replacement prototype accessors methods
module.exports = require('./_library')|| !require('./_fails')(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete require('./_global')[K];
});
},{"./_fails":56,"./_global":60,"./_library":80}],92:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":50,"./_has":61,"./_ie8-dom-define":64,"./_object-pie":99,"./_property-desc":107,"./_to-iobject":129,"./_to-primitive":132}],93:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":94,"./_to-iobject":129}],94:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":52,"./_object-keys-internal":97}],95:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],96:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":61,"./_shared-key":115,"./_to-object":131}],97:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":33,"./_has":61,"./_shared-key":115,"./_to-iobject":129}],98:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":52,"./_object-keys-internal":97}],99:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],100:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":45,"./_export":54,"./_fails":56}],101:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject')
  , isEnum    = require('./_object-pie').f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"./_object-keys":98,"./_object-pie":99,"./_to-iobject":129}],102:[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN     = require('./_object-gopn')
  , gOPS     = require('./_object-gops')
  , anObject = require('./_an-object')
  , Reflect  = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./_an-object":29,"./_global":60,"./_object-gopn":94,"./_object-gops":95}],103:[function(require,module,exports){
var $parseFloat = require('./_global').parseFloat
  , $trim       = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;
},{"./_global":60,"./_string-trim":124,"./_string-ws":125}],104:[function(require,module,exports){
var $parseInt = require('./_global').parseInt
  , $trim     = require('./_string-trim').trim
  , ws        = require('./_string-ws')
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;
},{"./_global":60,"./_string-trim":124,"./_string-ws":125}],105:[function(require,module,exports){
'use strict';
var path      = require('./_path')
  , invoke    = require('./_invoke')
  , aFunction = require('./_a-function');
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};
},{"./_a-function":25,"./_invoke":66,"./_path":106}],106:[function(require,module,exports){
module.exports = require('./_global');
},{"./_global":60}],107:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],108:[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};
},{"./_redefine":109}],109:[function(require,module,exports){
var global    = require('./_global')
  , hide      = require('./_hide')
  , has       = require('./_has')
  , SRC       = require('./_uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./_core":45,"./_global":60,"./_has":61,"./_hide":62,"./_uid":136}],110:[function(require,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],111:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],112:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":29,"./_ctx":47,"./_is-object":71,"./_object-gopd":92}],113:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_descriptors":50,"./_global":60,"./_object-dp":89,"./_wks":139}],114:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":61,"./_object-dp":89,"./_wks":139}],115:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":116,"./_uid":136}],116:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":60}],117:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":25,"./_an-object":29,"./_wks":139}],118:[function(require,module,exports){
var fails = require('./_fails');

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};
},{"./_fails":56}],119:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":49,"./_to-integer":128}],120:[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp')
  , defined  = require('./_defined');

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"./_defined":49,"./_is-regexp":72}],121:[function(require,module,exports){
var $export = require('./_export')
  , fails   = require('./_fails')
  , defined = require('./_defined')
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};
},{"./_defined":49,"./_export":54,"./_fails":56}],122:[function(require,module,exports){
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length')
  , repeat   = require('./_string-repeat')
  , defined  = require('./_defined');

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_defined":49,"./_string-repeat":123,"./_to-length":130}],123:[function(require,module,exports){
'use strict';
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./_defined":49,"./_to-integer":128}],124:[function(require,module,exports){
var $export = require('./_export')
  , defined = require('./_defined')
  , fails   = require('./_fails')
  , spaces  = require('./_string-ws')
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"./_defined":49,"./_export":54,"./_fails":56,"./_string-ws":125}],125:[function(require,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
},{}],126:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":40,"./_ctx":47,"./_dom-create":51,"./_global":60,"./_html":63,"./_invoke":66}],127:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":128}],128:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],129:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":49,"./_iobject":67}],130:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":128}],131:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":49}],132:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":71}],133:[function(require,module,exports){
'use strict';
if(require('./_descriptors')){
  var LIBRARY             = require('./_library')
    , global              = require('./_global')
    , fails               = require('./_fails')
    , $export             = require('./_export')
    , $typed              = require('./_typed')
    , $buffer             = require('./_typed-buffer')
    , ctx                 = require('./_ctx')
    , anInstance          = require('./_an-instance')
    , propertyDesc        = require('./_property-desc')
    , hide                = require('./_hide')
    , redefineAll         = require('./_redefine-all')
    , toInteger           = require('./_to-integer')
    , toLength            = require('./_to-length')
    , toIndex             = require('./_to-index')
    , toPrimitive         = require('./_to-primitive')
    , has                 = require('./_has')
    , same                = require('./_same-value')
    , classof             = require('./_classof')
    , isObject            = require('./_is-object')
    , toObject            = require('./_to-object')
    , isArrayIter         = require('./_is-array-iter')
    , create              = require('./_object-create')
    , getPrototypeOf      = require('./_object-gpo')
    , gOPN                = require('./_object-gopn').f
    , getIterFn           = require('./core.get-iterator-method')
    , uid                 = require('./_uid')
    , wks                 = require('./_wks')
    , createArrayMethod   = require('./_array-methods')
    , createArrayIncludes = require('./_array-includes')
    , speciesConstructor  = require('./_species-constructor')
    , ArrayIterators      = require('./es6.array.iterator')
    , Iterators           = require('./_iterators')
    , $iterDetect         = require('./_iter-detect')
    , setSpecies          = require('./_set-species')
    , arrayFill           = require('./_array-fill')
    , arrayCopyWithin     = require('./_array-copy-within')
    , $DP                 = require('./_object-dp')
    , $GOPD               = require('./_object-gopd')
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };
},{"./_an-instance":28,"./_array-copy-within":30,"./_array-fill":31,"./_array-includes":33,"./_array-methods":34,"./_classof":39,"./_ctx":47,"./_descriptors":50,"./_export":54,"./_fails":56,"./_global":60,"./_has":61,"./_hide":62,"./_is-array-iter":68,"./_is-object":71,"./_iter-detect":76,"./_iterators":78,"./_library":80,"./_object-create":88,"./_object-dp":89,"./_object-gopd":92,"./_object-gopn":94,"./_object-gpo":96,"./_property-desc":107,"./_redefine-all":108,"./_same-value":111,"./_set-species":113,"./_species-constructor":117,"./_to-index":127,"./_to-integer":128,"./_to-length":130,"./_to-object":131,"./_to-primitive":132,"./_typed":135,"./_typed-buffer":134,"./_uid":136,"./_wks":139,"./core.get-iterator-method":140,"./es6.array.iterator":152}],134:[function(require,module,exports){
'use strict';
var global         = require('./_global')
  , DESCRIPTORS    = require('./_descriptors')
  , LIBRARY        = require('./_library')
  , $typed         = require('./_typed')
  , hide           = require('./_hide')
  , redefineAll    = require('./_redefine-all')
  , fails          = require('./_fails')
  , anInstance     = require('./_an-instance')
  , toInteger      = require('./_to-integer')
  , toLength       = require('./_to-length')
  , gOPN           = require('./_object-gopn').f
  , dP             = require('./_object-dp').f
  , arrayFill      = require('./_array-fill')
  , setToStringTag = require('./_set-to-string-tag')
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;
},{"./_an-instance":28,"./_array-fill":31,"./_descriptors":50,"./_fails":56,"./_global":60,"./_hide":62,"./_library":80,"./_object-dp":89,"./_object-gopn":94,"./_redefine-all":108,"./_set-to-string-tag":114,"./_to-integer":128,"./_to-length":130,"./_typed":135}],135:[function(require,module,exports){
var global = require('./_global')
  , hide   = require('./_hide')
  , uid    = require('./_uid')
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};
},{"./_global":60,"./_hide":62,"./_uid":136}],136:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],137:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":45,"./_global":60,"./_library":80,"./_object-dp":89,"./_wks-ext":138}],138:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":139}],139:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":60,"./_shared":116,"./_uid":136}],140:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":39,"./_core":45,"./_iterators":78,"./_wks":139}],141:[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export')
  , $re     = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"./_export":54,"./_replacer":110}],142:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {copyWithin: require('./_array-copy-within')});

require('./_add-to-unscopables')('copyWithin');
},{"./_add-to-unscopables":27,"./_array-copy-within":30,"./_export":54}],143:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $every  = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":34,"./_export":54,"./_strict-method":118}],144:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {fill: require('./_array-fill')});

require('./_add-to-unscopables')('fill');
},{"./_add-to-unscopables":27,"./_array-fill":31,"./_export":54}],145:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":34,"./_export":54,"./_strict-method":118}],146:[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":27,"./_array-methods":34,"./_export":54}],147:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":27,"./_array-methods":34,"./_export":54}],148:[function(require,module,exports){
'use strict';
var $export  = require('./_export')
  , $forEach = require('./_array-methods')(0)
  , STRICT   = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":34,"./_export":54,"./_strict-method":118}],149:[function(require,module,exports){
'use strict';
var ctx            = require('./_ctx')
  , $export        = require('./_export')
  , toObject       = require('./_to-object')
  , call           = require('./_iter-call')
  , isArrayIter    = require('./_is-array-iter')
  , toLength       = require('./_to-length')
  , createProperty = require('./_create-property')
  , getIterFn      = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":46,"./_ctx":47,"./_export":54,"./_is-array-iter":68,"./_iter-call":73,"./_iter-detect":76,"./_to-length":130,"./_to-object":131,"./core.get-iterator-method":140}],150:[function(require,module,exports){
'use strict';
var $export       = require('./_export')
  , $indexOf      = require('./_array-includes')(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});
},{"./_array-includes":33,"./_export":54,"./_strict-method":118}],151:[function(require,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', {isArray: require('./_is-array')});
},{"./_export":54,"./_is-array":69}],152:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":27,"./_iter-define":75,"./_iter-step":77,"./_iterators":78,"./_to-iobject":129}],153:[function(require,module,exports){
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});
},{"./_export":54,"./_iobject":67,"./_strict-method":118,"./_to-iobject":129}],154:[function(require,module,exports){
'use strict';
var $export       = require('./_export')
  , toIObject     = require('./_to-iobject')
  , toInteger     = require('./_to-integer')
  , toLength      = require('./_to-length')
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});
},{"./_export":54,"./_strict-method":118,"./_to-integer":128,"./_to-iobject":129,"./_to-length":130}],155:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $map    = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":34,"./_export":54,"./_strict-method":118}],156:[function(require,module,exports){
'use strict';
var $export        = require('./_export')
  , createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});
},{"./_create-property":46,"./_export":54,"./_fails":56}],157:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});
},{"./_array-reduce":35,"./_export":54,"./_strict-method":118}],158:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});
},{"./_array-reduce":35,"./_export":54,"./_strict-method":118}],159:[function(require,module,exports){
'use strict';
var $export    = require('./_export')
  , html       = require('./_html')
  , cof        = require('./_cof')
  , toIndex    = require('./_to-index')
  , toLength   = require('./_to-length')
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
},{"./_cof":40,"./_export":54,"./_fails":56,"./_html":63,"./_to-index":127,"./_to-length":130}],160:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $some   = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":34,"./_export":54,"./_strict-method":118}],161:[function(require,module,exports){
'use strict';
var $export   = require('./_export')
  , aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , fails     = require('./_fails')
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});
},{"./_a-function":25,"./_export":54,"./_fails":56,"./_strict-method":118,"./_to-object":131}],162:[function(require,module,exports){
require('./_set-species')('Array');
},{"./_set-species":113}],163:[function(require,module,exports){
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});
},{"./_export":54}],164:[function(require,module,exports){
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export')
  , fails   = require('./_fails')
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"./_export":54,"./_fails":56}],165:[function(require,module,exports){
'use strict';
var $export     = require('./_export')
  , toObject    = require('./_to-object')
  , toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});
},{"./_export":54,"./_fails":56,"./_to-object":131,"./_to-primitive":132}],166:[function(require,module,exports){
var TO_PRIMITIVE = require('./_wks')('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));
},{"./_date-to-primitive":48,"./_hide":62,"./_wks":139}],167:[function(require,module,exports){
var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  require('./_redefine')(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}
},{"./_redefine":109}],168:[function(require,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', {bind: require('./_bind')});
},{"./_bind":38,"./_export":54}],169:[function(require,module,exports){
'use strict';
var isObject       = require('./_is-object')
  , getPrototypeOf = require('./_object-gpo')
  , HAS_INSTANCE   = require('./_wks')('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))require('./_object-dp').f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});
},{"./_is-object":71,"./_object-dp":89,"./_object-gpo":96,"./_wks":139}],170:[function(require,module,exports){
var dP         = require('./_object-dp').f
  , createDesc = require('./_property-desc')
  , has        = require('./_has')
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});
},{"./_descriptors":50,"./_has":61,"./_object-dp":89,"./_property-desc":107}],171:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.1 Map Objects
module.exports = require('./_collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./_collection":44,"./_collection-strong":41}],172:[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export')
  , log1p   = require('./_math-log1p')
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"./_export":54,"./_math-log1p":82}],173:[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export')
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});
},{"./_export":54}],174:[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export')
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"./_export":54}],175:[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export')
  , sign    = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"./_export":54,"./_math-sign":83}],176:[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./_export":54}],177:[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"./_export":54}],178:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export')
  , $expm1  = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});
},{"./_export":54,"./_math-expm1":81}],179:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $export   = require('./_export')
  , sign      = require('./_math-sign')
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"./_export":54,"./_math-sign":83}],180:[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export')
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"./_export":54}],181:[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export')
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"./_export":54,"./_fails":56}],182:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./_export":54}],183:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', {log1p: require('./_math-log1p')});
},{"./_export":54,"./_math-log1p":82}],184:[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"./_export":54}],185:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', {sign: require('./_math-sign')});
},{"./_export":54,"./_math-sign":83}],186:[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"./_export":54,"./_fails":56,"./_math-expm1":81}],187:[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"./_export":54,"./_math-expm1":81}],188:[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"./_export":54}],189:[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , has               = require('./_has')
  , cof               = require('./_cof')
  , inheritIfRequired = require('./_inherit-if-required')
  , toPrimitive       = require('./_to-primitive')
  , fails             = require('./_fails')
  , gOPN              = require('./_object-gopn').f
  , gOPD              = require('./_object-gopd').f
  , dP                = require('./_object-dp').f
  , $trim             = require('./_string-trim').trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(require('./_object-create')(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}
},{"./_cof":40,"./_descriptors":50,"./_fails":56,"./_global":60,"./_has":61,"./_inherit-if-required":65,"./_object-create":88,"./_object-dp":89,"./_object-gopd":92,"./_object-gopn":94,"./_redefine":109,"./_string-trim":124,"./_to-primitive":132}],190:[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"./_export":54}],191:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./_export')
  , _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./_export":54,"./_global":60}],192:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', {isInteger: require('./_is-integer')});
},{"./_export":54,"./_is-integer":70}],193:[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"./_export":54}],194:[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export   = require('./_export')
  , isInteger = require('./_is-integer')
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"./_export":54,"./_is-integer":70}],195:[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./_export":54}],196:[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"./_export":54}],197:[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});
},{"./_export":54,"./_parse-float":103}],198:[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});
},{"./_export":54,"./_parse-int":104}],199:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , toInteger    = require('./_to-integer')
  , aNumberValue = require('./_a-number-value')
  , repeat       = require('./_string-repeat')
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});
},{"./_a-number-value":26,"./_export":54,"./_fails":56,"./_string-repeat":123,"./_to-integer":128}],200:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $fails       = require('./_fails')
  , aNumberValue = require('./_a-number-value')
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});
},{"./_a-number-value":26,"./_export":54,"./_fails":56}],201:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":54,"./_object-assign":87}],202:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":54,"./_object-create":88}],203:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperties: require('./_object-dps')});
},{"./_descriptors":50,"./_export":54,"./_object-dps":90}],204:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":50,"./_export":54,"./_object-dp":89}],205:[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});
},{"./_is-object":71,"./_meta":84,"./_object-sap":100}],206:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":92,"./_object-sap":100,"./_to-iobject":129}],207:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function(){
  return require('./_object-gopn-ext').f;
});
},{"./_object-gopn-ext":93,"./_object-sap":100}],208:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":96,"./_object-sap":100,"./_to-object":131}],209:[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"./_is-object":71,"./_object-sap":100}],210:[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"./_is-object":71,"./_object-sap":100}],211:[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"./_is-object":71,"./_object-sap":100}],212:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', {is: require('./_same-value')});
},{"./_export":54,"./_same-value":111}],213:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":98,"./_object-sap":100,"./_to-object":131}],214:[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});
},{"./_is-object":71,"./_meta":84,"./_object-sap":100}],215:[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});
},{"./_is-object":71,"./_meta":84,"./_object-sap":100}],216:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":54,"./_set-proto":112}],217:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof')
  , test    = {};
test[require('./_wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./_redefine')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./_classof":39,"./_redefine":109,"./_wks":139}],218:[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});
},{"./_export":54,"./_parse-float":103}],219:[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});
},{"./_export":54,"./_parse-int":104}],220:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":25,"./_an-instance":28,"./_classof":39,"./_core":45,"./_ctx":47,"./_export":54,"./_for-of":59,"./_global":60,"./_is-object":71,"./_iter-detect":76,"./_library":80,"./_microtask":86,"./_redefine-all":108,"./_set-species":113,"./_set-to-string-tag":114,"./_species-constructor":117,"./_task":126,"./_wks":139}],221:[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = require('./_export')
  , aFunction = require('./_a-function')
  , anObject  = require('./_an-object')
  , rApply    = (require('./_global').Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});
},{"./_a-function":25,"./_an-object":29,"./_export":54,"./_fails":56,"./_global":60}],222:[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = require('./_export')
  , create     = require('./_object-create')
  , aFunction  = require('./_a-function')
  , anObject   = require('./_an-object')
  , isObject   = require('./_is-object')
  , fails      = require('./_fails')
  , bind       = require('./_bind')
  , rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"./_a-function":25,"./_an-object":29,"./_bind":38,"./_export":54,"./_fails":56,"./_global":60,"./_is-object":71,"./_object-create":88}],223:[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = require('./_object-dp')
  , $export     = require('./_export')
  , anObject    = require('./_an-object')
  , toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":29,"./_export":54,"./_fails":56,"./_object-dp":89,"./_to-primitive":132}],224:[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = require('./_export')
  , gOPD     = require('./_object-gopd').f
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"./_an-object":29,"./_export":54,"./_object-gopd":92}],225:[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export  = require('./_export')
  , anObject = require('./_an-object');
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"./_an-object":29,"./_export":54,"./_iter-create":74}],226:[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = require('./_object-gopd')
  , $export  = require('./_export')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});
},{"./_an-object":29,"./_export":54,"./_object-gopd":92}],227:[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = require('./_export')
  , getProto = require('./_object-gpo')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"./_an-object":29,"./_export":54,"./_object-gpo":96}],228:[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , isObject       = require('./_is-object')
  , anObject       = require('./_an-object');

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});
},{"./_an-object":29,"./_export":54,"./_has":61,"./_is-object":71,"./_object-gopd":92,"./_object-gpo":96}],229:[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"./_export":54}],230:[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export       = require('./_export')
  , anObject      = require('./_an-object')
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"./_an-object":29,"./_export":54}],231:[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', {ownKeys: require('./_own-keys')});
},{"./_export":54,"./_own-keys":102}],232:[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export            = require('./_export')
  , anObject           = require('./_an-object')
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":29,"./_export":54}],233:[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = require('./_export')
  , setProto = require('./_set-proto');

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_export":54,"./_set-proto":112}],234:[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = require('./_object-dp')
  , gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , createDesc     = require('./_property-desc')
  , anObject       = require('./_an-object')
  , isObject       = require('./_is-object');

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});
},{"./_an-object":29,"./_export":54,"./_has":61,"./_is-object":71,"./_object-dp":89,"./_object-gopd":92,"./_object-gpo":96,"./_property-desc":107}],235:[function(require,module,exports){
var global            = require('./_global')
  , inheritIfRequired = require('./_inherit-if-required')
  , dP                = require('./_object-dp').f
  , gOPN              = require('./_object-gopn').f
  , isRegExp          = require('./_is-regexp')
  , $flags            = require('./_flags')
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function(){
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');
},{"./_descriptors":50,"./_fails":56,"./_flags":58,"./_global":60,"./_inherit-if-required":65,"./_is-regexp":72,"./_object-dp":89,"./_object-gopn":94,"./_redefine":109,"./_set-species":113,"./_wks":139}],236:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if(require('./_descriptors') && /./g.flags != 'g')require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});
},{"./_descriptors":50,"./_flags":58,"./_object-dp":89}],237:[function(require,module,exports){
// @@match logic
require('./_fix-re-wks')('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});
},{"./_fix-re-wks":57}],238:[function(require,module,exports){
// @@replace logic
require('./_fix-re-wks')('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});
},{"./_fix-re-wks":57}],239:[function(require,module,exports){
// @@search logic
require('./_fix-re-wks')('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});
},{"./_fix-re-wks":57}],240:[function(require,module,exports){
// @@split logic
require('./_fix-re-wks')('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = require('./_is-regexp')
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});
},{"./_fix-re-wks":57,"./_is-regexp":72}],241:[function(require,module,exports){
'use strict';
require('./es6.regexp.flags');
var anObject    = require('./_an-object')
  , $flags      = require('./_flags')
  , DESCRIPTORS = require('./_descriptors')
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(require('./_fails')(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}
},{"./_an-object":29,"./_descriptors":50,"./_fails":56,"./_flags":58,"./_redefine":109,"./es6.regexp.flags":236}],242:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.2 Set Objects
module.exports = require('./_collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./_collection":44,"./_collection-strong":41}],243:[function(require,module,exports){
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});
},{"./_string-html":121}],244:[function(require,module,exports){
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});
},{"./_string-html":121}],245:[function(require,module,exports){
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});
},{"./_string-html":121}],246:[function(require,module,exports){
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});
},{"./_string-html":121}],247:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $at     = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./_export":54,"./_string-at":119}],248:[function(require,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export   = require('./_export')
  , toLength  = require('./_to-length')
  , context   = require('./_string-context')
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
},{"./_export":54,"./_fails-is-regexp":55,"./_string-context":120,"./_to-length":130}],249:[function(require,module,exports){
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});
},{"./_string-html":121}],250:[function(require,module,exports){
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});
},{"./_string-html":121}],251:[function(require,module,exports){
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});
},{"./_string-html":121}],252:[function(require,module,exports){
var $export        = require('./_export')
  , toIndex        = require('./_to-index')
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"./_export":54,"./_to-index":127}],253:[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export  = require('./_export')
  , context  = require('./_string-context')
  , INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"./_export":54,"./_fails-is-regexp":55,"./_string-context":120}],254:[function(require,module,exports){
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});
},{"./_string-html":121}],255:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":75,"./_string-at":119}],256:[function(require,module,exports){
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});
},{"./_string-html":121}],257:[function(require,module,exports){
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});
},{"./_export":54,"./_to-iobject":129,"./_to-length":130}],258:[function(require,module,exports){
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});
},{"./_export":54,"./_string-repeat":123}],259:[function(require,module,exports){
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});
},{"./_string-html":121}],260:[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export     = require('./_export')
  , toLength    = require('./_to-length')
  , context     = require('./_string-context')
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"./_export":54,"./_fails-is-regexp":55,"./_string-context":120,"./_to-length":130}],261:[function(require,module,exports){
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});
},{"./_string-html":121}],262:[function(require,module,exports){
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});
},{"./_string-html":121}],263:[function(require,module,exports){
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});
},{"./_string-html":121}],264:[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"./_string-trim":124}],265:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":29,"./_descriptors":50,"./_enum-keys":53,"./_export":54,"./_fails":56,"./_global":60,"./_has":61,"./_hide":62,"./_is-array":69,"./_keyof":79,"./_library":80,"./_meta":84,"./_object-create":88,"./_object-dp":89,"./_object-gopd":92,"./_object-gopn":94,"./_object-gopn-ext":93,"./_object-gops":95,"./_object-keys":98,"./_object-pie":99,"./_property-desc":107,"./_redefine":109,"./_set-to-string-tag":114,"./_shared":116,"./_to-iobject":129,"./_to-primitive":132,"./_uid":136,"./_wks":139,"./_wks-define":137,"./_wks-ext":138}],266:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $typed       = require('./_typed')
  , buffer       = require('./_typed-buffer')
  , anObject     = require('./_an-object')
  , toIndex      = require('./_to-index')
  , toLength     = require('./_to-length')
  , isObject     = require('./_is-object')
  , ArrayBuffer  = require('./_global').ArrayBuffer
  , speciesConstructor = require('./_species-constructor')
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);
},{"./_an-object":29,"./_export":54,"./_fails":56,"./_global":60,"./_is-object":71,"./_set-species":113,"./_species-constructor":117,"./_to-index":127,"./_to-length":130,"./_typed":135,"./_typed-buffer":134}],267:[function(require,module,exports){
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});
},{"./_export":54,"./_typed":135,"./_typed-buffer":134}],268:[function(require,module,exports){
require('./_typed-array')('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":133}],269:[function(require,module,exports){
require('./_typed-array')('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":133}],270:[function(require,module,exports){
require('./_typed-array')('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":133}],271:[function(require,module,exports){
require('./_typed-array')('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":133}],272:[function(require,module,exports){
require('./_typed-array')('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":133}],273:[function(require,module,exports){
require('./_typed-array')('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":133}],274:[function(require,module,exports){
require('./_typed-array')('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":133}],275:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":133}],276:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);
},{"./_typed-array":133}],277:[function(require,module,exports){
'use strict';
var each         = require('./_array-methods')(0)
  , redefine     = require('./_redefine')
  , meta         = require('./_meta')
  , assign       = require('./_object-assign')
  , weak         = require('./_collection-weak')
  , isObject     = require('./_is-object')
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./_array-methods":34,"./_collection":44,"./_collection-weak":43,"./_is-object":71,"./_meta":84,"./_object-assign":87,"./_redefine":109}],278:[function(require,module,exports){
'use strict';
var weak = require('./_collection-weak');

// 23.4 WeakSet Objects
require('./_collection')('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./_collection":44,"./_collection-weak":43}],279:[function(require,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export   = require('./_export')
  , $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');
},{"./_add-to-unscopables":27,"./_array-includes":33,"./_export":54}],280:[function(require,module,exports){
// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = require('./_export')
  , microtask = require('./_microtask')()
  , process   = require('./_global').process
  , isNode    = require('./_cof')(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});
},{"./_cof":40,"./_export":54,"./_global":60,"./_microtask":86}],281:[function(require,module,exports){
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export')
  , cof     = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});
},{"./_cof":40,"./_export":54}],282:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Map', {toJSON: require('./_collection-to-json')('Map')});
},{"./_collection-to-json":42,"./_export":54}],283:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});
},{"./_export":54}],284:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});
},{"./_export":54}],285:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});
},{"./_export":54}],286:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});
},{"./_export":54}],287:[function(require,module,exports){
'use strict';
var $export         = require('./_export')
  , toObject        = require('./_to-object')
  , aFunction       = require('./_a-function')
  , $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});
},{"./_a-function":25,"./_descriptors":50,"./_export":54,"./_object-dp":89,"./_object-forced-pam":91,"./_to-object":131}],288:[function(require,module,exports){
'use strict';
var $export         = require('./_export')
  , toObject        = require('./_to-object')
  , aFunction       = require('./_a-function')
  , $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});
},{"./_a-function":25,"./_descriptors":50,"./_export":54,"./_object-dp":89,"./_object-forced-pam":91,"./_to-object":131}],289:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export  = require('./_export')
  , $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./_export":54,"./_object-to-array":101}],290:[function(require,module,exports){
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = require('./_export')
  , ownKeys        = require('./_own-keys')
  , toIObject      = require('./_to-iobject')
  , gOPD           = require('./_object-gopd')
  , createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});
},{"./_create-property":46,"./_export":54,"./_object-gopd":92,"./_own-keys":102,"./_to-iobject":129}],291:[function(require,module,exports){
'use strict';
var $export                  = require('./_export')
  , toObject                 = require('./_to-object')
  , toPrimitive              = require('./_to-primitive')
  , getPrototypeOf           = require('./_object-gpo')
  , getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});
},{"./_descriptors":50,"./_export":54,"./_object-forced-pam":91,"./_object-gopd":92,"./_object-gpo":96,"./_to-object":131,"./_to-primitive":132}],292:[function(require,module,exports){
'use strict';
var $export                  = require('./_export')
  , toObject                 = require('./_to-object')
  , toPrimitive              = require('./_to-primitive')
  , getPrototypeOf           = require('./_object-gpo')
  , getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});
},{"./_descriptors":50,"./_export":54,"./_object-forced-pam":91,"./_object-gopd":92,"./_object-gpo":96,"./_to-object":131,"./_to-primitive":132}],293:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export')
  , $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"./_export":54,"./_object-to-array":101}],294:[function(require,module,exports){
'use strict';
// https://github.com/zenparsing/es-observable
var $export     = require('./_export')
  , global      = require('./_global')
  , core        = require('./_core')
  , microtask   = require('./_microtask')()
  , OBSERVABLE  = require('./_wks')('observable')
  , aFunction   = require('./_a-function')
  , anObject    = require('./_an-object')
  , anInstance  = require('./_an-instance')
  , redefineAll = require('./_redefine-all')
  , hide        = require('./_hide')
  , forOf       = require('./_for-of')
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

require('./_set-species')('Observable');
},{"./_a-function":25,"./_an-instance":28,"./_an-object":29,"./_core":45,"./_export":54,"./_for-of":59,"./_global":60,"./_hide":62,"./_microtask":86,"./_redefine-all":108,"./_set-species":113,"./_wks":139}],295:[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});
},{"./_an-object":29,"./_metadata":85}],296:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});
},{"./_an-object":29,"./_metadata":85}],297:[function(require,module,exports){
var Set                     = require('./es6.set')
  , from                    = require('./_array-from-iterable')
  , metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , getPrototypeOf          = require('./_object-gpo')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":29,"./_array-from-iterable":32,"./_metadata":85,"./_object-gpo":96,"./es6.set":242}],298:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":29,"./_metadata":85,"./_object-gpo":96}],299:[function(require,module,exports){
var metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":29,"./_metadata":85}],300:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":29,"./_metadata":85}],301:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":29,"./_metadata":85,"./_object-gpo":96}],302:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":29,"./_metadata":85}],303:[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , aFunction                 = require('./_a-function')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});
},{"./_a-function":25,"./_an-object":29,"./_metadata":85}],304:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Set', {toJSON: require('./_collection-to-json')('Set')});
},{"./_collection-to-json":42,"./_export":54}],305:[function(require,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export')
  , $at     = require('./_string-at')(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./_export":54,"./_string-at":119}],306:[function(require,module,exports){
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export     = require('./_export')
  , defined     = require('./_defined')
  , toLength    = require('./_to-length')
  , isRegExp    = require('./_is-regexp')
  , getFlags    = require('./_flags')
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});
},{"./_defined":49,"./_export":54,"./_flags":58,"./_is-regexp":72,"./_iter-create":74,"./_to-length":130}],307:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
},{"./_export":54,"./_string-pad":122}],308:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
},{"./_export":54,"./_string-pad":122}],309:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');
},{"./_string-trim":124}],310:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');
},{"./_string-trim":124}],311:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":137}],312:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":137}],313:[function(require,module,exports){
// https://github.com/ljharb/proposal-global
var $export = require('./_export');

$export($export.S, 'System', {global: require('./_global')});
},{"./_export":54,"./_global":60}],314:[function(require,module,exports){
var $iterators    = require('./es6.array.iterator')
  , redefine      = require('./_redefine')
  , global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , wks           = require('./_wks')
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}
},{"./_global":60,"./_hide":62,"./_iterators":78,"./_redefine":109,"./_wks":139,"./es6.array.iterator":152}],315:[function(require,module,exports){
var $export = require('./_export')
  , $task   = require('./_task');
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./_export":54,"./_task":126}],316:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = require('./_global')
  , $export    = require('./_export')
  , invoke     = require('./_invoke')
  , partial    = require('./_partial')
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"./_export":54,"./_global":60,"./_invoke":66,"./_partial":105}],317:[function(require,module,exports){
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.symbol.async-iterator');
require('./modules/es7.symbol.observable');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.umulh');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/es7.asap');
require('./modules/es7.observable');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');
},{"./modules/_core":45,"./modules/es6.array.copy-within":142,"./modules/es6.array.every":143,"./modules/es6.array.fill":144,"./modules/es6.array.filter":145,"./modules/es6.array.find":147,"./modules/es6.array.find-index":146,"./modules/es6.array.for-each":148,"./modules/es6.array.from":149,"./modules/es6.array.index-of":150,"./modules/es6.array.is-array":151,"./modules/es6.array.iterator":152,"./modules/es6.array.join":153,"./modules/es6.array.last-index-of":154,"./modules/es6.array.map":155,"./modules/es6.array.of":156,"./modules/es6.array.reduce":158,"./modules/es6.array.reduce-right":157,"./modules/es6.array.slice":159,"./modules/es6.array.some":160,"./modules/es6.array.sort":161,"./modules/es6.array.species":162,"./modules/es6.date.now":163,"./modules/es6.date.to-iso-string":164,"./modules/es6.date.to-json":165,"./modules/es6.date.to-primitive":166,"./modules/es6.date.to-string":167,"./modules/es6.function.bind":168,"./modules/es6.function.has-instance":169,"./modules/es6.function.name":170,"./modules/es6.map":171,"./modules/es6.math.acosh":172,"./modules/es6.math.asinh":173,"./modules/es6.math.atanh":174,"./modules/es6.math.cbrt":175,"./modules/es6.math.clz32":176,"./modules/es6.math.cosh":177,"./modules/es6.math.expm1":178,"./modules/es6.math.fround":179,"./modules/es6.math.hypot":180,"./modules/es6.math.imul":181,"./modules/es6.math.log10":182,"./modules/es6.math.log1p":183,"./modules/es6.math.log2":184,"./modules/es6.math.sign":185,"./modules/es6.math.sinh":186,"./modules/es6.math.tanh":187,"./modules/es6.math.trunc":188,"./modules/es6.number.constructor":189,"./modules/es6.number.epsilon":190,"./modules/es6.number.is-finite":191,"./modules/es6.number.is-integer":192,"./modules/es6.number.is-nan":193,"./modules/es6.number.is-safe-integer":194,"./modules/es6.number.max-safe-integer":195,"./modules/es6.number.min-safe-integer":196,"./modules/es6.number.parse-float":197,"./modules/es6.number.parse-int":198,"./modules/es6.number.to-fixed":199,"./modules/es6.number.to-precision":200,"./modules/es6.object.assign":201,"./modules/es6.object.create":202,"./modules/es6.object.define-properties":203,"./modules/es6.object.define-property":204,"./modules/es6.object.freeze":205,"./modules/es6.object.get-own-property-descriptor":206,"./modules/es6.object.get-own-property-names":207,"./modules/es6.object.get-prototype-of":208,"./modules/es6.object.is":212,"./modules/es6.object.is-extensible":209,"./modules/es6.object.is-frozen":210,"./modules/es6.object.is-sealed":211,"./modules/es6.object.keys":213,"./modules/es6.object.prevent-extensions":214,"./modules/es6.object.seal":215,"./modules/es6.object.set-prototype-of":216,"./modules/es6.object.to-string":217,"./modules/es6.parse-float":218,"./modules/es6.parse-int":219,"./modules/es6.promise":220,"./modules/es6.reflect.apply":221,"./modules/es6.reflect.construct":222,"./modules/es6.reflect.define-property":223,"./modules/es6.reflect.delete-property":224,"./modules/es6.reflect.enumerate":225,"./modules/es6.reflect.get":228,"./modules/es6.reflect.get-own-property-descriptor":226,"./modules/es6.reflect.get-prototype-of":227,"./modules/es6.reflect.has":229,"./modules/es6.reflect.is-extensible":230,"./modules/es6.reflect.own-keys":231,"./modules/es6.reflect.prevent-extensions":232,"./modules/es6.reflect.set":234,"./modules/es6.reflect.set-prototype-of":233,"./modules/es6.regexp.constructor":235,"./modules/es6.regexp.flags":236,"./modules/es6.regexp.match":237,"./modules/es6.regexp.replace":238,"./modules/es6.regexp.search":239,"./modules/es6.regexp.split":240,"./modules/es6.regexp.to-string":241,"./modules/es6.set":242,"./modules/es6.string.anchor":243,"./modules/es6.string.big":244,"./modules/es6.string.blink":245,"./modules/es6.string.bold":246,"./modules/es6.string.code-point-at":247,"./modules/es6.string.ends-with":248,"./modules/es6.string.fixed":249,"./modules/es6.string.fontcolor":250,"./modules/es6.string.fontsize":251,"./modules/es6.string.from-code-point":252,"./modules/es6.string.includes":253,"./modules/es6.string.italics":254,"./modules/es6.string.iterator":255,"./modules/es6.string.link":256,"./modules/es6.string.raw":257,"./modules/es6.string.repeat":258,"./modules/es6.string.small":259,"./modules/es6.string.starts-with":260,"./modules/es6.string.strike":261,"./modules/es6.string.sub":262,"./modules/es6.string.sup":263,"./modules/es6.string.trim":264,"./modules/es6.symbol":265,"./modules/es6.typed.array-buffer":266,"./modules/es6.typed.data-view":267,"./modules/es6.typed.float32-array":268,"./modules/es6.typed.float64-array":269,"./modules/es6.typed.int16-array":270,"./modules/es6.typed.int32-array":271,"./modules/es6.typed.int8-array":272,"./modules/es6.typed.uint16-array":273,"./modules/es6.typed.uint32-array":274,"./modules/es6.typed.uint8-array":275,"./modules/es6.typed.uint8-clamped-array":276,"./modules/es6.weak-map":277,"./modules/es6.weak-set":278,"./modules/es7.array.includes":279,"./modules/es7.asap":280,"./modules/es7.error.is-error":281,"./modules/es7.map.to-json":282,"./modules/es7.math.iaddh":283,"./modules/es7.math.imulh":284,"./modules/es7.math.isubh":285,"./modules/es7.math.umulh":286,"./modules/es7.object.define-getter":287,"./modules/es7.object.define-setter":288,"./modules/es7.object.entries":289,"./modules/es7.object.get-own-property-descriptors":290,"./modules/es7.object.lookup-getter":291,"./modules/es7.object.lookup-setter":292,"./modules/es7.object.values":293,"./modules/es7.observable":294,"./modules/es7.reflect.define-metadata":295,"./modules/es7.reflect.delete-metadata":296,"./modules/es7.reflect.get-metadata":298,"./modules/es7.reflect.get-metadata-keys":297,"./modules/es7.reflect.get-own-metadata":300,"./modules/es7.reflect.get-own-metadata-keys":299,"./modules/es7.reflect.has-metadata":301,"./modules/es7.reflect.has-own-metadata":302,"./modules/es7.reflect.metadata":303,"./modules/es7.set.to-json":304,"./modules/es7.string.at":305,"./modules/es7.string.match-all":306,"./modules/es7.string.pad-end":307,"./modules/es7.string.pad-start":308,"./modules/es7.string.trim-left":309,"./modules/es7.string.trim-right":310,"./modules/es7.symbol.async-iterator":311,"./modules/es7.symbol.observable":312,"./modules/es7.system.global":313,"./modules/web.dom.iterable":314,"./modules/web.immediate":315,"./modules/web.timers":316}],318:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],319:[function(require,module,exports){
'use strict';

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

},{}],320:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],321:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":322}],322:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],323:[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = arg;

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":322}],324:[function(require,module,exports){
(function (Buffer){
/**
 * Bitcoin Address
 * ===============
 *
 * A bitcoin address. Normal use cases:
 * let address = new Address().fromPubKey(pubKey)
 * let address = new Address().fromRedeemScript(script)
 * let address = new Address().fromString(string)
 * let string = address.toString()
 * let script = address.toScript()
 * let isValid = Address.isValid(string)
 *
 * Can also do testnet:
 * let address = Address.Testnet()
 *
 * Note that an Address and an Addr are two completely different things. An
 * Address is what you send bitcoin to. An Addr is an ip address and port that
 * you connect to over the internet.
 */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Base58Check: require('./base-58-check'),
  Constants: require('./constants').Default.Address,
  Hash: require('./hash'),
  OpCode: require('./op-code'),
  PubKey: require('./pub-key'),
  Script: require('./script'),
  Struct: require('./struct'),
  Workers: require('./workers'),
  asink: require('asink')
};

var inject = function inject(deps) {
  var Base58Check = deps.Base58Check;
  var Constants = deps.Constants;
  var Hash = deps.Hash;
  var OpCode = deps.OpCode;
  var PubKey = deps.PubKey;
  var Script = deps.Script;
  var Struct = deps.Struct;
  var Workers = deps.Workers;
  var asink = deps.asink;

  var Address = function (_Struct) {
    _inherits(Address, _Struct);

    function Address(versionByteNum, hashBuf) {
      _classCallCheck(this, Address);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Address).call(this, { versionByteNum: versionByteNum, hashBuf: hashBuf }));
    }

    _createClass(Address, [{
      key: 'fromBuffer',
      value: function fromBuffer(buf) {
        if (buf.length !== 1 + 20) {
          throw new Error('address buffers must be exactly 21 bytes');
        }
        if (buf[0] !== Constants.pubKeyHash && buf[0] !== Constants.scriptHash) {
          throw new Error('address: invalid versionByteNum byte');
        }
        this.versionByteNum = buf[0];
        this.hashBuf = buf.slice(1);
        return this;
      }
    }, {
      key: 'fromPubKeyHashBuf',
      value: function fromPubKeyHashBuf(hashBuf) {
        this.hashBuf = hashBuf;
        this.versionByteNum = Constants['pubKeyHash'];
        return this;
      }
    }, {
      key: 'fromPubKey',
      value: function fromPubKey(pubKey) {
        var hashBuf = Hash.sha256Ripemd160(pubKey.toBuffer());
        return this.fromPubKeyHashBuf(hashBuf);
      }
    }, {
      key: 'asyncFromPubKey',
      value: function asyncFromPubKey(pubKey) {
        return asink(regeneratorRuntime.mark(function _callee() {
          var args, workersResult;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  args = [pubKey];
                  _context.next = 3;
                  return Workers.asyncObjectMethod(this, 'fromPubKey', args);

                case 3:
                  workersResult = _context.sent;
                  return _context.abrupt('return', this.fromFastBuffer(workersResult.resbuf));

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }), this);
      }
    }, {
      key: 'fromPrivKey',
      value: function fromPrivKey(privKey) {
        var pubKey = new PubKey().fromPrivKey(privKey);
        var hashBuf = Hash.sha256Ripemd160(pubKey.toBuffer());
        return this.fromPubKeyHashBuf(hashBuf);
      }
    }, {
      key: 'asyncFromPrivKey',
      value: function asyncFromPrivKey(privKey) {
        return asink(regeneratorRuntime.mark(function _callee2() {
          var args, workersResult;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  args = [privKey];
                  _context2.next = 3;
                  return Workers.asyncObjectMethod(this, 'fromPrivKey', args);

                case 3:
                  workersResult = _context2.sent;
                  return _context2.abrupt('return', this.fromFastBuffer(workersResult.resbuf));

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }), this);
      }
    }, {
      key: 'fromRedeemScriptHashBuf',
      value: function fromRedeemScriptHashBuf(hashBuf) {
        this.hashBuf = hashBuf;
        var typeStr = 'scriptHash';
        this.versionByteNum = Constants[typeStr];
        return this;
      }
    }, {
      key: 'fromRedeemScript',
      value: function fromRedeemScript(script) {
        var hashBuf = Hash.sha256Ripemd160(script.toBuffer());
        return this.fromRedeemScriptHashBuf(hashBuf);
      }
    }, {
      key: 'asyncFromRedeemScript',
      value: function asyncFromRedeemScript(script) {
        return asink(regeneratorRuntime.mark(function _callee3() {
          var args, workersResult;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  args = [script];
                  _context3.next = 3;
                  return Workers.asyncObjectMethod(this, 'fromRedeemScript', args);

                case 3:
                  workersResult = _context3.sent;
                  return _context3.abrupt('return', this.fromFastBuffer(workersResult.resbuf));

                case 5:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }), this);
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        var buf = Base58Check.decode(str);
        return this.fromBuffer(buf);
      }
    }, {
      key: 'asyncFromString',
      value: function asyncFromString(str) {
        return asink(regeneratorRuntime.mark(function _callee4() {
          var args, workersResult;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  args = [str];
                  _context4.next = 3;
                  return Workers.asyncObjectMethod(this, 'fromString', args);

                case 3:
                  workersResult = _context4.sent;
                  return _context4.abrupt('return', this.fromFastBuffer(workersResult.resbuf));

                case 5:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }), this);
      }
    }, {
      key: 'isValid',
      value: function isValid() {
        try {
          this.validate();
          return true;
        } catch (e) {
          return false;
        }
      }
    }, {
      key: 'type',
      value: function type() {
        if (this.versionByteNum === Constants['pubKeyHash']) {
          return 'pubKeyHash';
        } else if (this.versionByteNum === Constants['scriptHash']) {
          return 'scriptHash';
        } else {
          return 'unknown';
        }
      }
    }, {
      key: 'toScript',
      value: function toScript() {
        var type = this.type();
        var script = void 0;
        if (type === 'pubKeyHash') {
          script = new Script();
          script.writeOpCode(OpCode.OP_DUP);
          script.writeOpCode(OpCode.OP_HASH160);
          script.writeBuffer(this.hashBuf);
          script.writeOpCode(OpCode.OP_EQUALVERIFY);
          script.writeOpCode(OpCode.OP_CHECKSIG);
        } else if (type === 'scriptHash') {
          script = new Script();
          script.writeOpCode(OpCode.OP_HASH160);
          script.writeBuffer(this.hashBuf);
          script.writeOpCode(OpCode.OP_EQUAL);
        } else {
          throw new Error('script must be either pubKeyHash or scriptHash');
        }
        return script;
      }
    }, {
      key: 'toBuffer',
      value: function toBuffer() {
        var versionByteBuf = new Buffer([this.versionByteNum]);
        var buf = Buffer.concat([versionByteBuf, this.hashBuf]);
        return buf;
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        var json = {};
        if (this.hashBuf) {
          json.hashBuf = this.hashBuf.toString('hex');
        }
        if (_typeof(this.versionByteNum) !== undefined) {
          json.versionByteNum = this.versionByteNum;
        }
        return json;
      }
    }, {
      key: 'fromJSON',
      value: function fromJSON(json) {
        if (json.hashBuf) {
          this.hashBuf = new Buffer(json.hashBuf, 'hex');
        }
        if (_typeof(json.versionByteNum) !== undefined) {
          this.versionByteNum = json.versionByteNum;
        }
        return this;
      }
    }, {
      key: 'toString',
      value: function toString() {
        return Base58Check.encode(this.toBuffer());
      }
    }, {
      key: 'asyncToString',
      value: function asyncToString() {
        return asink(regeneratorRuntime.mark(function _callee5() {
          var args, workersResult;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  args = [];
                  _context5.next = 3;
                  return Workers.asyncObjectMethod(this, 'toString', args);

                case 3:
                  workersResult = _context5.sent;
                  return _context5.abrupt('return', JSON.parse(workersResult.resbuf.toString()));

                case 5:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }), this);
      }
    }, {
      key: 'validate',
      value: function validate() {
        if (!Buffer.isBuffer(this.hashBuf) || this.hashBuf.length !== 20) {
          throw new Error('hashBuf must be a buffer of 20 bytes');
        }
        if (this.versionByteNum !== Constants['pubKeyHash'] && this.versionByteNum !== Constants['scriptHash']) {
          throw new Error('invalid versionByteNum');
        }
        return this;
      }
    }], [{
      key: 'fromPubKeyHashBuf',
      value: function fromPubKeyHashBuf(hashBuf) {
        return new this().fromPubKeyHashBuf(hashBuf);
      }
    }, {
      key: 'fromPubKey',
      value: function fromPubKey(pubKey) {
        return new this().fromPubKey(pubKey);
      }
    }, {
      key: 'asyncFromPubKey',
      value: function asyncFromPubKey(pubKey) {
        return new this().asyncFromPubKey(pubKey);
      }
    }, {
      key: 'fromPrivKey',
      value: function fromPrivKey(privKey) {
        return new this().fromPrivKey(privKey);
      }
    }, {
      key: 'asyncFromPrivKey',
      value: function asyncFromPrivKey(privKey) {
        return new this().fromPrivKey(privKey);
      }
    }, {
      key: 'fromRedeemScriptHashBuf',
      value: function fromRedeemScriptHashBuf(hashBuf) {
        return new this().fromRedeemScriptHashBuf(hashBuf);
      }
    }, {
      key: 'fromRedeemScript',
      value: function fromRedeemScript(script) {
        return new this().fromRedeemScript(script);
      }
    }, {
      key: 'asyncFromRedeemScript',
      value: function asyncFromRedeemScript(script) {
        return new this().asyncFromRedeemScript(script);
      }
    }, {
      key: 'asyncFromString',
      value: function asyncFromString(str) {
        return new this().asyncFromString(str);
      }
    }, {
      key: 'isValid',
      value: function isValid(addrstr) {
        var address = void 0;
        try {
          address = new Address().fromString(addrstr);
        } catch (e) {
          return false;
        }
        return address.isValid();
      }
    }]);

    return Address;
  }(Struct);

  return Address;
};

inject = require('injecter')(inject, dependencies);
var Address = inject();
Address.Mainnet = inject({
  Constants: require('./constants').Mainnet.Address
});
Address.Testnet = inject({
  Constants: require('./constants').Testnet.Address
});
module.exports = Address;

}).call(this,require("buffer").Buffer)

},{"./base-58-check":325,"./constants":331,"./hash":333,"./op-code":335,"./pub-key":338,"./script":340,"./struct":342,"./workers":351,"asink":352,"buffer":23,"injecter":381}],325:[function(require,module,exports){
(function (Buffer){
/**
 * Base58 Check Encoding
 * =====================
 *
 * Base58 check encoding. The usual way to use it is
 * new Base58Check(buf).toString() or new Base58Check(str).toBuffer().
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Base58: require('./base-58'),
  cmp: require('./cmp'),
  Hash: require('./hash'),
  Struct: require('./struct')
};

var inject = function inject(deps) {
  var Base58 = deps.Base58;
  var cmp = deps.cmp;
  var Hash = deps.Hash;
  var Struct = deps.Struct;

  var Base58Check = function (_Struct) {
    _inherits(Base58Check, _Struct);

    function Base58Check(buf) {
      _classCallCheck(this, Base58Check);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Base58Check).call(this, { buf: buf }));
    }

    _createClass(Base58Check, [{
      key: 'fromHex',
      value: function fromHex(hex) {
        return this.fromBuffer(new Buffer(hex, 'hex'));
      }
    }, {
      key: 'toHex',
      value: function toHex() {
        return this.toBuffer().toString('hex');
      }
    }, {
      key: 'fromBuffer',
      value: function fromBuffer(buf) {
        this.buf = buf;
        return this;
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        var buf = Base58Check.decode(str);
        this.buf = buf;
        return this;
      }
    }, {
      key: 'toBuffer',
      value: function toBuffer() {
        return this.buf;
      }
    }, {
      key: 'toString',
      value: function toString() {
        return Base58Check.encode(this.buf);
      }
    }], [{
      key: 'decode',
      value: function decode(s) {
        if (typeof s !== 'string') {
          throw new Error('Input must be a string');
        }

        var buf = Base58.decode(s);

        if (buf.length < 4) {
          throw new Error('Input string too short');
        }

        var data = buf.slice(0, -4);
        var csum = buf.slice(-4);

        var hash = Hash.sha256Sha256(data);
        var hash4 = hash.slice(0, 4);

        if (!cmp(csum, hash4)) {
          throw new Error('Checksum mismatch');
        }

        return data;
      }
    }, {
      key: 'encode',
      value: function encode(buf) {
        if (!Buffer.isBuffer(buf)) {
          throw new Error('Input must be a buffer');
        }
        var checkedBuf = new Buffer(buf.length + 4);
        var hash = Hash.sha256Sha256(buf);
        buf.copy(checkedBuf);
        hash.copy(checkedBuf, buf.length);
        return Base58.encode(checkedBuf);
      }
    }]);

    return Base58Check;
  }(Struct);

  return Base58Check;
};

inject = require('injecter')(inject, dependencies);
var Base58Check = inject();
module.exports = Base58Check;

}).call(this,require("buffer").Buffer)

},{"./base-58":326,"./cmp":330,"./hash":333,"./struct":342,"buffer":23,"injecter":381}],326:[function(require,module,exports){
(function (Buffer){
/**
 * Base58 Encoding
 * ===============
 *
 * Base58 (no check)
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  bs58: require('bs58'),
  Struct: require('./struct')
};

var inject = function inject(deps) {
  var bs58 = deps.bs58;
  var Struct = deps.Struct;

  var Base58 = function (_Struct) {
    _inherits(Base58, _Struct);

    function Base58(buf) {
      _classCallCheck(this, Base58);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Base58).call(this, { buf: buf }));
    }

    _createClass(Base58, [{
      key: 'fromHex',
      value: function fromHex(hex) {
        return this.fromBuffer(new Buffer(hex, 'hex'));
      }
    }, {
      key: 'toHex',
      value: function toHex() {
        return this.toBuffer().toString('hex');
      }
    }, {
      key: 'fromBuffer',
      value: function fromBuffer(buf) {
        this.buf = buf;
        return this;
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        var buf = Base58.decode(str);
        this.buf = buf;
        return this;
      }
    }, {
      key: 'toBuffer',
      value: function toBuffer() {
        return this.buf;
      }
    }, {
      key: 'toString',
      value: function toString() {
        return Base58.encode(this.buf);
      }
    }], [{
      key: 'encode',
      value: function encode(buf) {
        if (!Buffer.isBuffer(buf)) {
          throw new Error('Input should be a buffer');
        }
        return bs58.encode(buf);
      }
    }, {
      key: 'decode',
      value: function decode(str) {
        if (typeof str !== 'string') {
          throw new Error('Input should be a string');
        }
        return new Buffer(bs58.decode(str));
      }
    }]);

    return Base58;
  }(Struct);

  return Base58;
};

inject = require('injecter')(inject, dependencies);
var Base58 = inject();
module.exports = Base58;

}).call(this,require("buffer").Buffer)

},{"./struct":342,"bs58":356,"buffer":23,"injecter":381}],327:[function(require,module,exports){
(function (Buffer){
/**
 * Big Number
 * ==========
 *
 * Since javascript numbers are only precise up to 53 bits, and bitcoin is
 * based on cryptography that uses 256 bit numbers, we must use a big number
 * library. The library we use at the moment is Fedor Indutny's bn.js library.
 * Since big numbers are extremely useful, we provide some very basic wrappers
 * for his big number class and expose it. The wrappers merely allow you to do,
 * say, bn.cmp(num) instead of just bn.cmp(bn), which is nice. The primary way
 * to use this is:
 * let bn = BN(str) // str is base 10
 * let bn = BN(num)
 * let bn = BN().fromBuffer(buf)
 * let bn = BN().fromSm(buf); // sign+magnitude format, first bit is sign
 *
 * For little endian, pass in an options value:
 * let bn = BN().fromBuffer(buf, {endian: 'little'})
 * let bn = BN().fromSm(buf, {endian: 'little'})
 *
 * Getting output:
 * let str = BN().toString() // produces base 10 string
 * let buf = BN().toBuffer() // produces buffer representation
 * let buf = BN().toBuffer({size: 32}) //produced 32 byte buffer
 */
'use strict';

var dependencies = {
  _BN: require('bn.js')
};

var inject = function inject(deps) {
  var _BN = deps._BN;

  function BN(n, base) {
    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    if (!(this instanceof BN)) {
      return new (Function.prototype.bind.apply(BN, [null].concat([n, base], rest)))();
    }
    _BN.call.apply(_BN, [this, n, base].concat(rest));
  }

  Object.keys(_BN).forEach(function (key) {
    BN[key] = _BN[key];
  });
  BN.prototype = Object.create(_BN.prototype);
  BN.prototype.constructor = BN;

  function reverseBuf(buf) {
    var buf2 = new Buffer(buf.length);
    for (var i = 0; i < buf.length; i++) {
      buf2[i] = buf[buf.length - 1 - i];
    }
    return buf2;
  }

  BN.prototype.fromHex = function (hex, opts) {
    return this.fromBuffer(new Buffer(hex, 'hex'), opts);
  };

  BN.prototype.toHex = function (opts) {
    return this.toBuffer(opts).toString('hex');
  };

  BN.prototype.toJSON = function () {
    return this.toString();
  };

  BN.prototype.fromJSON = function (str) {
    var bn = BN(str);
    bn.copy(this);
    return this;
  };

  BN.prototype.fromNumber = function (n) {
    var bn = BN(n);
    bn.copy(this);
    return this;
  };

  BN.prototype.toNumber = function () {
    return parseInt(this['toString'](10), 10);
  };

  BN.prototype.fromString = function (str, base) {
    var bn = BN(str, base);
    bn.copy(this);
    return this;
  };

  BN.fromBuffer = function (buf) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? { endian: 'big' } : arguments[1];

    if (opts.endian === 'little') {
      buf = reverseBuf(buf);
    }
    var hex = buf.toString('hex');
    var bn = new BN(hex, 16);
    return bn;
  };

  BN.prototype.fromBuffer = function (buf, opts) {
    var bn = BN.fromBuffer(buf, opts);
    bn.copy(this);

    return this;
  };

  BN.prototype.toBuffer = function () {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? { size: undefined, endian: 'big' } : arguments[0];

    var buf = void 0;
    if (opts.size) {
      var hex = this.toString(16, 2);
      var natlen = hex.length / 2;
      buf = new Buffer(hex, 'hex');

      if (natlen === opts.size) {
        // pass
      } else if (natlen > opts.size) {
        buf = buf.slice(natlen - buf.length, buf.length);
      } else if (natlen < opts.size) {
        var rbuf = new Buffer(opts.size);
        for (var i = 0; i < buf.length; i++) {
          rbuf[rbuf.length - 1 - i] = buf[buf.length - 1 - i];
        }
        for (var _i = 0; _i < opts.size - natlen; _i++) {
          rbuf[_i] = 0;
        }
        buf = rbuf;
      }
    } else {
      var _hex = this.toString(16, 2);
      buf = new Buffer(_hex, 'hex');
    }

    if (opts.endian === 'little') {
      buf = reverseBuf(buf);
    }
    var longzero = new Buffer([0]);
    if (Buffer.compare(buf, longzero) === 0) {
      return new Buffer([]);
    }
    return buf;
  };

  /**
   * Signed magnitude buffer. Most significant bit represents sign (0 = positive,
   * 1 = negative).
   */
  BN.prototype.fromSm = function (buf) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? { endian: 'big' } : arguments[1];

    if (buf.length === 0) {
      this.fromBuffer(new Buffer([0]));
    }

    var endian = opts.endian;
    if (endian === 'little') {
      buf = reverseBuf(buf);
    }

    if (buf[0] & 0x80) {
      buf[0] = buf[0] & 0x7f;
      this.fromBuffer(buf);
      this.neg().copy(this);
    } else {
      this.fromBuffer(buf);
    }
    return this;
  };

  BN.prototype.toSm = function () {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? { endian: 'big' } : arguments[0];

    var endian = opts.endian;

    var buf = void 0;
    if (this.cmp(0) === -1) {
      buf = this.neg().toBuffer();
      if (buf[0] & 0x80) {
        buf = Buffer.concat([new Buffer([0x80]), buf]);
      } else {
        buf[0] = buf[0] | 0x80;
      }
    } else {
      buf = this.toBuffer();
      if (buf[0] & 0x80) {
        buf = Buffer.concat([new Buffer([0x00]), buf]);
      }
    }

    if (buf.length === 1 & buf[0] === 0) {
      buf = new Buffer([]);
    }

    if (endian === 'little') {
      buf = reverseBuf(buf);
    }

    return buf;
  };

  /**
   * Produce a BN from the "bits" value in a blockheader. Analagous to Bitcoin
   * Core's uint256 SetCompact method. bits is assumed to be UInt32.
   */
  BN.prototype.fromBits = function (bits) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? { strict: false } : arguments[1];

    // To performed bitwise operations in javascript, we need to convert to a
    // signed 32 bit value.
    var buf = new Buffer(4);
    buf.writeUInt32BE(bits, 0);
    bits = buf.readInt32BE(0);
    if (opts.strict && bits & 0x00800000) {
      throw new Error('negative bit set');
    }
    var nsize = bits >> 24;
    var nword = bits & 0x007fffff;
    buf = new Buffer(4);
    buf.writeInt32BE(nword);
    if (nsize <= 3) {
      buf = buf.slice(1, nsize + 1);
    } else {
      var fill = new Buffer(nsize - 3);
      fill.fill(0);
      buf = Buffer.concat([buf, fill]);
    }
    this.fromBuffer(buf);
    if (bits & 0x00800000) {
      BN(0).sub(this).copy(this);
    }
    return this;
  };

  /**
   * Convert BN to the "bits" value in a blockheader. Analagous to Bitcoin
   * Core's uint256 GetCompact method. bits is a UInt32.
   */
  BN.prototype.toBits = function () {
    var buf = void 0;
    if (this.lt(0)) {
      buf = this.neg().toBuffer();
    } else {
      buf = this.toBuffer();
    }
    var nsize = buf.length;
    var nword = void 0;
    if (nsize > 3) {
      nword = Buffer.concat([new Buffer([0]), buf.slice(0, 3)]).readUInt32BE(0);
    } else if (nsize <= 3) {
      var blank = new Buffer(3 - nsize + 1);
      blank.fill(0);
      nword = Buffer.concat([blank, buf.slice(0, nsize)]).readUInt32BE(0);
    }
    if (nword & 0x00800000) {
      // The most significant bit denotes sign. Do not want unless number is
      // actually negative.
      nword >>= 8;
      nsize++;
    }
    if (this.lt(0)) {
      nword |= 0x00800000;
    }
    var bits = nsize << 24 | nword;
    // convert bits to UInt32 before returnIng
    buf = new Buffer(4);
    buf.writeInt32BE(bits, 0);
    return buf.readUInt32BE(0);
  };

  // This is analogous to the constructor for CScriptNum in bitcoind. Many ops
  // in bitcoind's script interpreter use CScriptNum, which is not really a
  // proper bignum. Instead, an error is thrown if trying to input a number
  // bigger than 4 bytes. We copy that behavior here. There is one exception -
  // in CHECKLOCKTIMEVERIFY, the numbers are allowed to be up to 5 bytes long.
  // We allow for setting that variable here for use in CHECKLOCKTIMEVERIFY.
  BN.prototype.fromScriptNumBuffer = function (buf, fRequireMinimal, nMaxNumSize) {
    if (nMaxNumSize === undefined) {
      nMaxNumSize = 4;
    }
    if (buf.length > nMaxNumSize) {
      throw new Error('script number overflow');
    }
    if (fRequireMinimal && buf.length > 0) {
      // Check that the number is encoded with the minimum possible
      // number of bytes.
      //
      // If the most-significant-byte - excluding the sign bit - is zero
      // then we're not minimal. Note how this test also rejects the
      // negative-zero encoding, 0x80.
      if ((buf[buf.length - 1] & 0x7f) === 0) {
        // One exception: if there's more than one byte and the most
        // significant bit of the second-most-significant-byte is set
        // it would conflict with the sign bit. An example of this case
        // is +-255, which encode to 0xff00 and 0xff80 respectively.
        // (big-endian).
        if (buf.length <= 1 || (buf[buf.length - 2] & 0x80) === 0) {
          throw new Error('non-minimally encoded script number');
        }
      }
    }
    return this.fromSm(buf, { endian: 'little' });
  };

  // The corollary to the above, with the notable exception that we do not throw
  // an error if the output is larger than four bytes. (Which can happen if
  // performing a numerical operation that results in an overflow to more than 4
  // bytes).
  BN.prototype.toScriptNumBuffer = function (buf) {
    return this.toSm({ endian: 'little' });
  };

  BN.prototype.neg = function () {
    var _neg = _BN.prototype.neg.call(this);
    var neg = Object.create(BN.prototype);
    _neg.copy(neg);
    return neg;
  };

  BN.prototype.add = function (bn) {
    var _bn = _BN.prototype.add.call(this, bn);
    bn = Object.create(BN.prototype);
    _bn.copy(bn);
    return bn;
  };

  BN.prototype.sub = function (bn) {
    var _bn = _BN.prototype.sub.call(this, bn);
    bn = Object.create(BN.prototype);
    _bn.copy(bn);
    return bn;
  };

  BN.prototype.mul = function (bn) {
    var _bn = _BN.prototype.mul.call(this, bn);
    bn = Object.create(BN.prototype);
    _bn.copy(bn);
    return bn;
  };

  /**
   * to be used if this is positive.
   */
  BN.prototype.mod = function (bn) {
    var _bn = _BN.prototype.mod.call(this, bn);
    bn = Object.create(BN.prototype);
    _bn.copy(bn);
    return bn;
  };

  /**
   * to be used if this is negative.
   */
  BN.prototype.umod = function (bn) {
    var _bn = _BN.prototype.umod.call(this, bn);
    bn = Object.create(BN.prototype);
    _bn.copy(bn);
    return bn;
  };

  BN.prototype.invm = function (bn) {
    var _bn = _BN.prototype.invm.call(this, bn);
    bn = Object.create(BN.prototype);
    _bn.copy(bn);
    return bn;
  };

  BN.prototype.div = function (bn) {
    var _bn = _BN.prototype.div.call(this, bn);
    bn = Object.create(BN.prototype);
    _bn.copy(bn);
    return bn;
  };

  BN.prototype.cmp = function (bn) {
    return _BN.prototype.cmp.call(this, bn);
  };

  /**
   * All the standard big number operations operate on other big numbers. e.g.,
   * bn1.add(bn2). But it is frequenly valuble to add numbers or strings, e.g.
   * bn.add(5) or bn.add('5'). The decorator wraps all methods where this would
   * be convenient and makes that possible.
   */
  function decorate(name) {
    BN.prototype['_' + name] = BN.prototype[name];
    var f = function f(b) {
      if (typeof b === 'string') {
        b = new BN(b);
      } else if (typeof b === 'number') {
        b = new BN(b.toString());
      }
      return this['_' + name](b);
    };
    BN.prototype[name] = f;
  }

  BN.prototype.eq = function (b) {
    return this.cmp(b) === 0;
  };

  BN.prototype.neq = function (b) {
    return this.cmp(b) !== 0;
  };

  BN.prototype.gt = function (b) {
    return this.cmp(b) > 0;
  };

  BN.prototype.geq = function (b) {
    return this.cmp(b) >= 0;
  };

  BN.prototype.lt = function (b) {
    return this.cmp(b) < 0;
  };

  BN.prototype.leq = function (b) {
    return this.cmp(b) <= 0;
  };

  decorate('add');
  decorate('sub');
  decorate('mul');
  decorate('mod');
  decorate('invm');
  decorate('div');
  decorate('cmp');
  decorate('gt');
  decorate('geq');
  decorate('lt');
  decorate('leq');

  return BN;
};

inject = require('injecter')(inject, dependencies);
var BN = inject();
module.exports = BN;

}).call(this,require("buffer").Buffer)

},{"bn.js":354,"buffer":23,"injecter":381}],328:[function(require,module,exports){
(function (Buffer){
/**
 * Buffer Reader
 * =============
 *
 * This is a convenience class for reading VarInts and other basic types from a
 * buffer. This class is most useful for reading VarInts, and also for signed
 * or unsigned integers of various types. It can also read a buffer in reverse
 * order, which is useful in bitcoin which uses little endian numbers a lot so
 * you find that you must reverse things. You probably want to use it like:
 * varInt = new Br(buf).readnew VarInt()
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dependencies = {
  Bn: require('./bn')
};

var inject = function inject(deps) {
  var Bn = deps.Bn;

  var Br = function () {
    function Br(buf) {
      _classCallCheck(this, Br);

      this.fromObject({ buf: buf });
    }

    _createClass(Br, [{
      key: 'fromObject',
      value: function fromObject(obj) {
        this.buf = obj.buf || this.buf || undefined;
        this.pos = obj.pos || this.pos || 0;
        return this;
      }
    }, {
      key: 'eof',
      value: function eof() {
        return this.pos >= this.buf.length;
      }
    }, {
      key: 'read',
      value: function read() {
        var len = arguments.length <= 0 || arguments[0] === undefined ? this.buf.length : arguments[0];

        var buf = this.buf.slice(this.pos, this.pos + len);
        this.pos = this.pos + len;
        return buf;
      }
    }, {
      key: 'readReverse',
      value: function readReverse() {
        var len = arguments.length <= 0 || arguments[0] === undefined ? this.buf.length : arguments[0];

        var buf = this.buf.slice(this.pos, this.pos + len);
        this.pos = this.pos + len;
        var buf2 = new Buffer(buf.length);
        for (var i = 0; i < buf2.length; i++) {
          buf2[i] = buf[buf.length - 1 - i];
        }
        return buf2;
      }
    }, {
      key: 'readUInt8',
      value: function readUInt8() {
        var val = this.buf.readUInt8(this.pos);
        this.pos = this.pos + 1;
        return val;
      }
    }, {
      key: 'readInt8',
      value: function readInt8() {
        var val = this.buf.readInt8(this.pos);
        this.pos = this.pos + 1;
        return val;
      }
    }, {
      key: 'readUInt16BE',
      value: function readUInt16BE() {
        var val = this.buf.readUInt16BE(this.pos);
        this.pos = this.pos + 2;
        return val;
      }
    }, {
      key: 'readInt16BE',
      value: function readInt16BE() {
        var val = this.buf.readInt16BE(this.pos);
        this.pos = this.pos + 2;
        return val;
      }
    }, {
      key: 'readUInt16LE',
      value: function readUInt16LE() {
        var val = this.buf.readUInt16LE(this.pos);
        this.pos = this.pos + 2;
        return val;
      }
    }, {
      key: 'readInt16LE',
      value: function readInt16LE() {
        var val = this.buf.readInt16LE(this.pos);
        this.pos = this.pos + 2;
        return val;
      }
    }, {
      key: 'readUInt32BE',
      value: function readUInt32BE() {
        var val = this.buf.readUInt32BE(this.pos);
        this.pos = this.pos + 4;
        return val;
      }
    }, {
      key: 'readInt32BE',
      value: function readInt32BE() {
        var val = this.buf.readInt32BE(this.pos);
        this.pos = this.pos + 4;
        return val;
      }
    }, {
      key: 'readUInt32LE',
      value: function readUInt32LE() {
        var val = this.buf.readUInt32LE(this.pos);
        this.pos = this.pos + 4;
        return val;
      }
    }, {
      key: 'readInt32LE',
      value: function readInt32LE() {
        var val = this.buf.readInt32LE(this.pos);
        this.pos = this.pos + 4;
        return val;
      }
    }, {
      key: 'readUInt64BEBn',
      value: function readUInt64BEBn() {
        var buf = this.buf.slice(this.pos, this.pos + 8);
        var bn = new Bn().fromBuffer(buf);
        this.pos = this.pos + 8;
        return bn;
      }
    }, {
      key: 'readUInt64LEBn',
      value: function readUInt64LEBn() {
        var buf = this.readReverse(8);
        var bn = new Bn().fromBuffer(buf);
        return bn;
      }
    }, {
      key: 'readVarIntNum',
      value: function readVarIntNum() {
        var first = this.readUInt8();
        var bn = void 0,
            n = void 0;
        switch (first) {
          case 0xFD:
            return this.readUInt16LE();
          case 0xFE:
            return this.readUInt32LE();
          case 0xFF:
            bn = this.readUInt64LEBn();
            n = bn.toNumber();
            if (n <= Math.pow(2, 53)) {
              return n;
            } else {
              throw new Error('number too large to retain precision - use readVarIntBn');
            }
          default:
            return first;
        }
      }
    }, {
      key: 'readVarIntBuf',
      value: function readVarIntBuf() {
        var first = this.buf.readUInt8(this.pos);
        switch (first) {
          case 0xFD:
            return this.read(1 + 2);
          case 0xFE:
            return this.read(1 + 4);
          case 0xFF:
            return this.read(1 + 8);
          default:
            return this.read(1);
        }
      }
    }, {
      key: 'readVarIntBn',
      value: function readVarIntBn() {
        var first = this.readUInt8();
        switch (first) {
          case 0xFD:
            return new Bn(this.readUInt16LE());
          case 0xFE:
            return new Bn(this.readUInt32LE());
          case 0xFF:
            return this.readUInt64LEBn();
          default:
            return new Bn(first);
        }
      }
    }]);

    return Br;
  }();

  return Br;
};

inject = require('injecter')(inject, dependencies);
var Br = inject();
module.exports = Br;

}).call(this,require("buffer").Buffer)

},{"./bn":327,"buffer":23,"injecter":381}],329:[function(require,module,exports){
(function (Buffer){
/**
 * Buffer Writer
 * =============
 *
 * This is the writing complement of the Br. You can easily write
 * VarInts and other basic number types. The way to use it is: buf =
 * new Bw().write(buf1).write(buf2).toBuffer()
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dependencies = {};

var inject = function inject(deps) {
  var Bw = function () {
    function Bw(bufs) {
      _classCallCheck(this, Bw);

      this.fromObject({ bufs: bufs });
    }

    _createClass(Bw, [{
      key: 'fromObject',
      value: function fromObject(obj) {
        this.bufs = obj.bufs || this.bufs || [];
        return this;
      }
    }, {
      key: 'getLength',
      value: function getLength() {
        var len = 0;
        for (var i in this.bufs) {
          var buf = this.bufs[i];
          len = len + buf.length;
        }
        return len;
      }
    }, {
      key: 'toBuffer',
      value: function toBuffer() {
        return Buffer.concat(this.bufs);
      }
    }, {
      key: 'write',
      value: function write(buf) {
        this.bufs.push(buf);
        return this;
      }
    }, {
      key: 'writeReverse',
      value: function writeReverse(buf) {
        var buf2 = new Buffer(buf.length);
        for (var i = 0; i < buf2.length; i++) {
          buf2[i] = buf[buf.length - 1 - i];
        }
        this.bufs.push(buf2);
        return this;
      }
    }, {
      key: 'writeUInt8',
      value: function writeUInt8(n) {
        var buf = new Buffer(1);
        buf.writeUInt8(n, 0);
        this.write(buf);
        return this;
      }
    }, {
      key: 'writeInt8',
      value: function writeInt8(n) {
        var buf = new Buffer(1);
        buf.writeInt8(n, 0);
        this.write(buf);
        return this;
      }
    }, {
      key: 'writeUInt16BE',
      value: function writeUInt16BE(n) {
        var buf = new Buffer(2);
        buf.writeUInt16BE(n, 0);
        this.write(buf);
        return this;
      }
    }, {
      key: 'writeInt16BE',
      value: function writeInt16BE(n) {
        var buf = new Buffer(2);
        buf.writeInt16BE(n, 0);
        this.write(buf);
        return this;
      }
    }, {
      key: 'writeUInt16LE',
      value: function writeUInt16LE(n) {
        var buf = new Buffer(2);
        buf.writeUInt16LE(n, 0);
        this.write(buf);
        return this;
      }
    }, {
      key: 'writeInt16LE',
      value: function writeInt16LE(n) {
        var buf = new Buffer(2);
        buf.writeInt16LE(n, 0);
        this.write(buf);
        return this;
      }
    }, {
      key: 'writeUInt32BE',
      value: function writeUInt32BE(n) {
        var buf = new Buffer(4);
        buf.writeUInt32BE(n, 0);
        this.write(buf);
        return this;
      }
    }, {
      key: 'writeInt32BE',
      value: function writeInt32BE(n) {
        var buf = new Buffer(4);
        buf.writeInt32BE(n, 0);
        this.write(buf);
        return this;
      }
    }, {
      key: 'writeUInt32LE',
      value: function writeUInt32LE(n) {
        var buf = new Buffer(4);
        buf.writeUInt32LE(n, 0);
        this.write(buf);
        return this;
      }
    }, {
      key: 'writeInt32LE',
      value: function writeInt32LE(n) {
        var buf = new Buffer(4);
        buf.writeInt32LE(n, 0);
        this.write(buf);
        return this;
      }
    }, {
      key: 'writeUInt64BEBn',
      value: function writeUInt64BEBn(bn) {
        var buf = bn.toBuffer({ size: 8 });
        this.write(buf);
        return this;
      }
    }, {
      key: 'writeUInt64LEBn',
      value: function writeUInt64LEBn(bn) {
        var buf = bn.toBuffer({ size: 8 });
        this.writeReverse(buf);
        return this;
      }
    }, {
      key: 'writeVarIntNum',
      value: function writeVarIntNum(n) {
        var buf = Bw.varIntBufNum(n);
        this.write(buf);
        return this;
      }
    }, {
      key: 'writeVarIntBn',
      value: function writeVarIntBn(bn) {
        var buf = Bw.varIntBufBn(bn);
        this.write(buf);
        return this;
      }
    }], [{
      key: 'varIntBufNum',
      value: function varIntBufNum(n) {
        var buf = void 0;
        if (n < 253) {
          buf = new Buffer(1);
          buf.writeUInt8(n, 0);
        } else if (n < 0x10000) {
          buf = new Buffer(1 + 2);
          buf.writeUInt8(253, 0);
          buf.writeUInt16LE(n, 1);
        } else if (n < 0x100000000) {
          buf = new Buffer(1 + 4);
          buf.writeUInt8(254, 0);
          buf.writeUInt32LE(n, 1);
        } else {
          buf = new Buffer(1 + 8);
          buf.writeUInt8(255, 0);
          buf.writeInt32LE(n & -1, 1);
          buf.writeUInt32LE(Math.floor(n / 0x100000000), 5);
        }
        return buf;
      }
    }, {
      key: 'varIntBufBn',
      value: function varIntBufBn(bn) {
        var buf = void 0;
        var n = bn.toNumber();
        if (n < 253) {
          buf = new Buffer(1);
          buf.writeUInt8(n, 0);
        } else if (n < 0x10000) {
          buf = new Buffer(1 + 2);
          buf.writeUInt8(253, 0);
          buf.writeUInt16LE(n, 1);
        } else if (n < 0x100000000) {
          buf = new Buffer(1 + 4);
          buf.writeUInt8(254, 0);
          buf.writeUInt32LE(n, 1);
        } else {
          var bw = new Bw();
          bw.writeUInt8(255);
          bw.writeUInt64LEBn(bn);
          buf = bw.toBuffer();
        }
        return buf;
      }
    }]);

    return Bw;
  }();

  return Bw;
};

inject = require('injecter')(inject, dependencies);
var Bw = inject();
module.exports = Bw;

}).call(this,require("buffer").Buffer)

},{"buffer":23,"injecter":381}],330:[function(require,module,exports){
(function (Buffer){
/**
 * Constant-Time Buffer Compare
 * ============================
 *
 * A constant-time comparison function. This should be used in any security
 * sensitive code where leaking timing information may lead to lessened
 * security. Note that if the buffers are not equal in length, this function
 * loops for the longest buffer, which may not be necessary. Usually this
 * function should be used for buffers that would otherwise be equal length,
 * such as a hash, particularly Hmacs.
 *
 * The algorithm here, which is XORs each byte (or, if undefined, 0) with the
 * corresponding other byte, and then ORs that with a running total (d), is
 * adapted from here:
 *
 * https://groups.google.com/forum/#!topic/keyczar-discuss/VXHsoJSLKhM
 */
'use strict';

module.exports = function cmp(buf1, buf2) {
  if (!Buffer.isBuffer(buf1) || !Buffer.isBuffer(buf2)) {
    throw new Error('buf1 and buf2 must be buffers');
  }
  if (buf1.length !== buf2.length) {
    return false;
  }

  var d = 0;
  for (var i = 0; i < buf1.length; i++) {
    var x = buf1[i];
    var y = buf2[i];
    d |= x ^ y;
  }

  return d === 0;
};

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})

},{"../../is-buffer/index.js":319}],331:[function(require,module,exports){
(function (process){
/**
 * Constants
 * =========
 *
 * Constants used to distinguish mainnet from testnet.
 */
'use strict';

var Constants = module.exports;

Constants.Mainnet = {
  maxsize: 0x02000000, // MAX_SIZE
  Address: {
    pubKeyHash: 0x00,
    scriptHash: 0x05
  },
  Bip32: {
    pubKey: 0x0488b21e,
    privKey: 0x0488ade4
  },
  Block: {
    maxNBits: 0x1d00ffff,
    magicNum: 0xf9beb4d9
  },
  Msg: {
    magicNum: 0xf9beb4d9,
    versionBytesNum: 70012 // as of Bitcoin Core v0.12.0
  },
  PrivKey: {
    versionByteNum: 0x80
  },
  StealthAddress: {
    versionByteNum: 42
  },
  TxBuilder: {
    feePerKbNum: 0.0001e8,
    dustNum: 546
  }
};

Constants.Testnet = Object.assign({}, Constants.Mainnet, {
  Address: {
    pubKeyHash: 0x6f,
    scriptHash: 0xc4
  },
  Bip32: {
    pubKey: 0x043587cf,
    privKey: 0x04358394
  },
  Block: {
    maxNBits: 0x1d00ffff,
    magicNum: 0x0b110907
  },
  Msg: {
    magicNum: 0x0b110907,
    versionBytesNum: 70012 // as of Bitcoin Core v0.12.0
  },
  Network: {
    maxconnections: 20,
    minconnections: 8,
    port: 8333,
    rendezvous: {
      host: 'localhost',
      port: 3000,
      path: '/'
    }
  },
  PrivKey: {
    versionByteNum: 0xef
  },
  StealthAddress: {
    versionByteNum: 43
  }
});

Constants.Regtest = Object.assign({}, Constants.Mainnet, {
  Network: {
    maxconnections: 20,
    minconnections: 8,
    port: 18444,
    rendezvous: {
      host: 'localhost',
      port: 3000,
      path: '/'
    }
  }
});

/**
 * Yours Bitcoin can be globally configured to mainnet, testnet, or regtest. Via the
 * inject pattern, you always have access to the other networks at any time.
 * However, it is very convenient to be able to change the default
 * configuration. The default is mainnet, which can be changed to testnet or
 * regtest.
 */
if (process.env.YOURS_BITCOIN_NETWORK === 'testnet') {
  Constants.Default = Object.assign({}, Constants.Testnet);
} else if (process.env.YOURS_BITCOIN_NETWORK === 'regtest') {
  Constants.Default = Object.assign({}, Constants.Regtest);
} else {
  process.env.YOURS_BITCOIN_NETWORK = 'mainnet';
  Constants.Default = Object.assign({}, Constants.Mainnet);
}

}).call(this,require('_process'))

},{"_process":322}],332:[function(require,module,exports){
(function (Buffer){
/**
 * Ecdsa
 * =====
 *
 * Ecdsa is the signature algorithm used by bitcoin. The way you probably want
 * to use this is with the static Ecdsa.sign( ... ) and Ecdsa.verify( ... )
 * functions. Note that in bitcoin, the hashBuf is little endian, so if you are
 * signIng or verifying something that has to do with a transaction, you should
 * explicitly plug in that it is little endian as an option to the sign and
 * verify functions.
 *
 * This implementation of Ecdsa uses deterministic signatures as defined in RFC
 * 6979 as the default, which has become a defacto standard in bitcoin wallets
 * due to recurring security issues around using a value of k pulled from a
 * possibly faulty entropy pool. If you use the same value of k twice, someone
 * can derive your private key. Deterministic k prevents this without needing
 * an entropy pool.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Bn: require('./bn'),
  Hash: require('./hash'),
  KeyPair: require('./key-pair'),
  Point: require('./point'),
  PubKey: require('./pub-key'),
  Random: require('./random'),
  Sig: require('./sig'),
  Struct: require('./struct'),
  Workers: require('./workers'),
  asink: require('asink')
};

var inject = function inject(deps) {
  var Bn = deps.Bn;
  var Hash = deps.Hash;
  var KeyPair = deps.KeyPair;
  var Point = deps.Point;
  var PubKey = deps.PubKey;
  var Random = deps.Random;
  var Sig = deps.Sig;
  var Struct = deps.Struct;
  var Workers = deps.Workers;
  var asink = deps.asink;

  var Ecdsa = function (_Struct) {
    _inherits(Ecdsa, _Struct);

    function Ecdsa(sig, keyPair, hashBuf, k, endian, verified) {
      _classCallCheck(this, Ecdsa);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Ecdsa).call(this, { sig: sig, keyPair: keyPair, hashBuf: hashBuf, k: k, endian: endian, verified: verified }));
    }

    _createClass(Ecdsa, [{
      key: 'toJSON',
      value: function toJSON() {
        return {
          sig: this.sig ? this.sig.toString() : undefined,
          keyPair: this.keyPair ? this.keyPair.toBuffer().toString('hex') : undefined,
          hashBuf: this.hashBuf ? this.hashBuf.toString('hex') : undefined,
          k: this.k ? this.k.toString() : undefined,
          endian: this.endian,
          verified: this.verified
        };
      }
    }, {
      key: 'fromJSON',
      value: function fromJSON(json) {
        this.sig = json.sig ? new Sig().fromString(json.sig) : undefined;
        this.keyPair = json.keyPair ? new KeyPair().fromBuffer(new Buffer(json.keyPair, 'hex')) : undefined;
        this.hashBuf = json.hashBuf ? new Buffer(json.hashBuf, 'hex') : undefined;
        this.k = json.k ? new Bn().fromString(json.k) : undefined;
        this.endian = json.endian;
        this.verified = json.verified;
        return this;
      }
    }, {
      key: 'toBuffer',
      value: function toBuffer() {
        var str = JSON.stringify(this.toJSON());
        return new Buffer(str);
      }
    }, {
      key: 'fromBuffer',
      value: function fromBuffer(buf) {
        var json = JSON.parse(buf.toString());
        return this.fromJSON(json);
      }
    }, {
      key: 'calcrecovery',
      value: function calcrecovery() {
        for (var recovery = 0; recovery < 4; recovery++) {
          var Qprime = void 0;
          this.sig.recovery = recovery;
          try {
            Qprime = this.sig2PubKey();
          } catch (e) {
            continue;
          }

          if (Qprime.point.eq(this.keyPair.pubKey.point)) {
            var compressed = this.keyPair.pubKey.compressed;
            this.sig.compressed = this.keyPair.pubKey.compressed === undefined ? true : compressed;
            return this;
          }
        }

        this.sig.recovery = undefined;
        throw new Error('Unable to find valid recovery factor');
      }
    }, {
      key: 'asyncCalcrecovery',
      value: function asyncCalcrecovery() {
        return asink(regeneratorRuntime.mark(function _callee() {
          var workersResult;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return Workers.asyncObjectMethod(this, 'calcrecovery', []);

                case 2:
                  workersResult = _context.sent;
                  return _context.abrupt('return', this.fromFastBuffer(workersResult.resbuf));

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }), this);
      }

      /**
       * Calculates the recovery factor, and mutates sig so that it now contains
       * the recovery factor and the "compressed" variable. Throws an exception on
       * failure.
       */

    }, {
      key: 'fromString',
      value: function fromString(str) {
        var obj = JSON.parse(str);
        if (obj.hashBuf) {
          this.hashBuf = new Buffer(obj.hashBuf, 'hex');
        }
        if (obj.keyPair) {
          this.keyPair = new KeyPair().fromString(obj.keyPair);
        }
        if (obj.sig) {
          this.sig = new Sig().fromString(obj.sig);
        }
        if (obj.k) {
          this.k = new Bn(obj.k, 10);
        }
        return this;
      }
    }, {
      key: 'randomK',
      value: function randomK() {
        var N = Point.getN();
        var k = void 0;
        do {
          k = new Bn().fromBuffer(Random.getRandomBuffer(32));
        } while (!(k.lt(N) && k.gt(0)));
        this.k = k;
        return this;
      }

      /**
       * The traditional Ecdsa algorithm uses a purely random value of k. This has
       * the negative that when signIng, your entropy must be good, or the private
       * key can be recovered if two signatures use the same value of k. It turns out
       * that k does not have to be purely random. It can be deterministic, so long
       * as an attacker can't guess it. RFC 6979 specifies how to do this using a
       * combination of the private key and the hash of the thing to be signed. It is
       * best practice to use this value, which can be tested for byte-for-byte
       * accuracy, and is resistant to a broken RNG. Note that it is actually the
       * case that bitcoin private keys have been compromised through that attack.
       * Deterministic k is a best practice.
       *
       * https://tools.ietf.org/html/rfc6979#section-3.2
       */

    }, {
      key: 'deterministicK',
      value: function deterministicK(badrs) {
        var v = new Buffer(32);
        v.fill(0x01);
        var k = new Buffer(32);
        k.fill(0x00);
        var x = this.keyPair.privKey.bn.toBuffer({ size: 32 });
        k = Hash.sha256Hmac(Buffer.concat([v, new Buffer([0x00]), x, this.hashBuf]), k);
        v = Hash.sha256Hmac(v, k);
        k = Hash.sha256Hmac(Buffer.concat([v, new Buffer([0x01]), x, this.hashBuf]), k);
        v = Hash.sha256Hmac(v, k);
        v = Hash.sha256Hmac(v, k);
        var T = new Bn().fromBuffer(v);
        var N = Point.getN();

        // if r or s were invalid when this function was used in signIng,
        // we do not want to actually compute r, s here for efficiency, so,
        // we can increment badrs. explained at end of RFC 6979 section 3.2
        if (badrs === undefined) {
          badrs = 0;
        }
        // also explained in 3.2, we must ensure T is in the proper range (0, N)
        for (var i = 0; i < badrs || !(T.lt(N) && T.gt(0)); i++) {
          k = Hash.sha256Hmac(Buffer.concat([v, new Buffer([0x00])]), k);
          v = Hash.sha256Hmac(v, k);
          v = Hash.sha256Hmac(v, k);
          T = new Bn().fromBuffer(v);
        }

        this.k = T;
        return this;
      }

      /**
       * Information about public key recovery:
       * https://bitcointalk.org/index.php?topic=6430.0
       * http://stackoverflow.com/questions/19665491/how-do-i-get-an-ecdsa-public-key-from-just-a-bitcoin-signature-sec1-4-1-6-k
       * This code was originally taken from BitcoinJS
       */

    }, {
      key: 'sig2PubKey',
      value: function sig2PubKey() {
        var recovery = this.sig.recovery;
        if (!(recovery === 0 || recovery === 1 || recovery === 2 || recovery === 3)) {
          throw new Error('i must be equal to 0, 1, 2, or 3');
        }

        var e = new Bn().fromBuffer(this.hashBuf);
        var r = this.sig.r;
        var s = this.sig.s;

        // A set LSB signifies that the y-coordinate is odd
        var isYOdd = recovery & 1;

        // The more significant bit specifies whether we should use the
        // first or second candidate key.
        var isSecondKey = recovery >> 1;

        var n = Point.getN();
        var G = Point.getG();

        // 1.1 LEt x = r + jn
        var x = isSecondKey ? r.add(n) : r;
        var R = Point.fromX(isYOdd, x);

        // 1.4 Check that nR is at infinity
        var nR = R.mul(n);

        if (!nR.isInfinity()) {
          throw new Error('nR is not a valid curve point');
        }

        // Compute -e from e
        var eNeg = e.neg().umod(n);

        // 1.6.1 Compute Q = r^-1 (sR - eG)
        // Q = r^-1 (sR + -eG)
        var rInv = r.invm(n);

        // let Q = R.multiplyTwo(s, G, eNeg).mul(rInv)
        var Q = R.mul(s).add(G.mul(eNeg)).mul(rInv);

        var pubKey = new PubKey(Q);
        pubKey.compressed = this.sig.compressed;
        pubKey.validate();

        return pubKey;
      }
    }, {
      key: 'asyncSig2PubKey',
      value: function asyncSig2PubKey() {
        return asink(regeneratorRuntime.mark(function _callee2() {
          var workersResult;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return Workers.asyncObjectMethod(this, 'sig2PubKey', []);

                case 2:
                  workersResult = _context2.sent;
                  return _context2.abrupt('return', PubKey.fromFastBuffer(workersResult.resbuf));

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }), this);
      }
    }, {
      key: 'verifyStr',
      value: function verifyStr() {
        if (!Buffer.isBuffer(this.hashBuf) || this.hashBuf.length !== 32) {
          return 'hashBuf must be a 32 byte buffer';
        }

        try {
          this.keyPair.pubKey.validate();
        } catch (e) {
          return 'Invalid pubKey: ' + e;
        }

        var r = this.sig.r;
        var s = this.sig.s;
        if (!(r.gt(0) && r.lt(Point.getN())) || !(s.gt(0) && s.lt(Point.getN()))) {
          return 'r and s not in range';
        }

        var e = new Bn().fromBuffer(this.hashBuf, this.endian ? { endian: this.endian } : undefined);
        var n = Point.getN();
        var sinv = s.invm(n);
        var u1 = sinv.mul(e).mod(n);
        var u2 = sinv.mul(r).mod(n);

        var p = Point.getG().mulAdd(u1, this.keyPair.pubKey.point, u2);
        // let p = Point.getG().mulAdd(u1, this.keyPair.pubKey.point, u2)
        if (p.isInfinity()) {
          return 'p is infinity';
        }

        if (!(p.getX().mod(n).cmp(r) === 0)) {
          return 'Invalid signature';
        } else {
          return false;
        }
      }
    }, {
      key: 'sign',
      value: function sign() {
        var hashBuf = this.hashBuf;
        var privKey = this.keyPair.privKey;

        var d = privKey.bn;

        if (!hashBuf || !privKey || !d) {
          throw new Error('invalid parameters');
        }

        if (!Buffer.isBuffer(hashBuf) || hashBuf.length !== 32) {
          throw new Error('hashBuf must be a 32 byte buffer');
        }

        var N = Point.getN();
        var G = Point.getG();
        var e = new Bn().fromBuffer(hashBuf, this.endian ? { endian: this.endian } : undefined);

        // try different values of k until r, s are valid
        var badrs = 0;
        var k = void 0,
            Q = void 0,
            r = void 0,
            s = void 0;
        do {
          if (!this.k || badrs > 0) {
            this.deterministicK(badrs);
          }
          badrs++;
          k = this.k;
          Q = G.mul(k);
          r = Q.getX().mod(N);
          s = k.invm(N).mul(e.add(d.mul(r))).mod(N);
        } while (r.cmp(0) <= 0 || s.cmp(0) <= 0);

        // enforce low s
        // see Bip 62, "low S values in signatures"
        if (s.gt(new Bn().fromBuffer(new Buffer('7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0', 'hex')))) {
          s = Point.getN().sub(s);
        }
        this.sig = Sig.fromObject({ r: r, s: s, compressed: this.keyPair.pubKey.compressed });
        return this;
      }
    }, {
      key: 'asyncSign',
      value: function asyncSign() {
        return asink(regeneratorRuntime.mark(function _callee3() {
          var workersResult;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return Workers.asyncObjectMethod(this, 'sign', []);

                case 2:
                  workersResult = _context3.sent;
                  return _context3.abrupt('return', this.fromFastBuffer(workersResult.resbuf));

                case 4:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }), this);
      }
    }, {
      key: 'signRandomK',
      value: function signRandomK() {
        this.randomK();
        return this.sign();
      }
    }, {
      key: 'toString',
      value: function toString() {
        var obj = {};
        if (this.hashBuf) {
          obj.hashBuf = this.hashBuf.toString('hex');
        }
        if (this.keyPair) {
          obj.keyPair = this.keyPair.toString();
        }
        if (this.sig) {
          obj.sig = this.sig.toString();
        }
        if (this.k) {
          obj.k = this.k.toString();
        }
        return JSON.stringify(obj);
      }
    }, {
      key: 'verify',
      value: function verify() {
        if (!this.verifyStr()) {
          this.verified = true;
        } else {
          this.verified = false;
        }
        return this;
      }
    }, {
      key: 'asyncVerify',
      value: function asyncVerify() {
        return asink(regeneratorRuntime.mark(function _callee4() {
          var workersResult;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return Workers.asyncObjectMethod(this, 'verify', []);

                case 2:
                  workersResult = _context4.sent;
                  return _context4.abrupt('return', this.fromFastBuffer(workersResult.resbuf));

                case 4:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }), this);
      }
    }], [{
      key: 'calcrecovery',
      value: function calcrecovery(sig, pubKey, hashBuf) {
        var ecdsa = new Ecdsa().fromObject({
          sig: sig,
          keyPair: new KeyPair().fromObject({ pubKey: pubKey }),
          hashBuf: hashBuf
        });
        return ecdsa.calcrecovery().sig;
      }
    }, {
      key: 'asyncCalcrecovery',
      value: function asyncCalcrecovery(sig, pubKey, hashBuf) {
        return asink(regeneratorRuntime.mark(function _callee5() {
          var workersResult;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return Workers.asyncClassMethod('Ecdsa', 'calcrecovery', [sig, pubKey, hashBuf]);

                case 2:
                  workersResult = _context5.sent;
                  return _context5.abrupt('return', new Sig().fromFastBuffer(workersResult.resbuf));

                case 4:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }), this);
      }
    }, {
      key: 'sig2PubKey',
      value: function sig2PubKey(sig, hashBuf) {
        var ecdsa = new Ecdsa().fromObject({
          sig: sig,
          hashBuf: hashBuf
        });
        return ecdsa.sig2PubKey();
      }
    }, {
      key: 'asyncSig2PubKey',
      value: function asyncSig2PubKey(sig, hashBuf) {
        return asink(regeneratorRuntime.mark(function _callee6() {
          var ecdsa, pubKey;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  ecdsa = new Ecdsa().fromObject({
                    sig: sig,
                    hashBuf: hashBuf
                  });
                  _context6.next = 3;
                  return ecdsa.asyncSig2PubKey();

                case 3:
                  pubKey = _context6.sent;
                  return _context6.abrupt('return', pubKey);

                case 5:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }), this);
      }
    }, {
      key: 'sign',
      value: function sign(hashBuf, keyPair, endian) {
        return new Ecdsa().fromObject({
          hashBuf: hashBuf,
          endian: endian,
          keyPair: keyPair
        }).sign().sig;
      }
    }, {
      key: 'asyncSign',
      value: function asyncSign(hashBuf, keyPair, endian) {
        return asink(regeneratorRuntime.mark(function _callee7() {
          var ecdsa;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  ecdsa = new Ecdsa().fromObject({
                    hashBuf: hashBuf,
                    endian: endian,
                    keyPair: keyPair
                  });
                  _context7.next = 3;
                  return ecdsa.asyncSign();

                case 3:
                  return _context7.abrupt('return', ecdsa.sig);

                case 4:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }), this);
      }
    }, {
      key: 'verify',
      value: function verify(hashBuf, sig, pubKey, endian) {
        return new Ecdsa().fromObject({
          hashBuf: hashBuf,
          endian: endian,
          sig: sig,
          keyPair: new KeyPair().fromObject({ pubKey: pubKey })
        }).verify().verified;
      }
    }, {
      key: 'asyncVerify',
      value: function asyncVerify(hashBuf, sig, pubKey, endian) {
        return asink(regeneratorRuntime.mark(function _callee8() {
          var ecdsa;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  ecdsa = new Ecdsa().fromObject({
                    hashBuf: hashBuf,
                    endian: endian,
                    sig: sig,
                    keyPair: new KeyPair().fromObject({ pubKey: pubKey })
                  });
                  _context8.next = 3;
                  return ecdsa.asyncVerify();

                case 3:
                  return _context8.abrupt('return', ecdsa.verified);

                case 4:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }), this);
      }
    }]);

    return Ecdsa;
  }(Struct);

  return Ecdsa;
};

inject = require('injecter')(inject, dependencies);
var Ecdsa = inject();
Ecdsa.Mainnet = inject({
  KeyPair: require('./key-pair').Mainnet
});
Ecdsa.Testnet = inject({
  KeyPair: require('./key-pair').Testnet
});
module.exports = Ecdsa;

}).call(this,require("buffer").Buffer)

},{"./bn":327,"./hash":333,"./key-pair":334,"./point":336,"./pub-key":338,"./random":339,"./sig":341,"./struct":342,"./workers":351,"asink":352,"buffer":23,"injecter":381}],333:[function(require,module,exports){
(function (Buffer){
/**
 * Hash
 * ====
 *
 * Some hash functions are used through out bitcoin. We expose them here as a
 * convenience.
 */
'use strict';

var dependencies = {
  Workers: require('./workers'),
  asink: require('asink'),
  hashjs: require('hash.js')
};

var inject = function inject(deps) {
  var Workers = deps.Workers;
  var asink = deps.asink;
  var hashjs = deps.hashjs;

  var Hash = {};

  Hash.sha1 = function (buf) {
    if (!Buffer.isBuffer(buf)) {
      throw new Error('sha1 hash must be of a buffer');
    }
    var Sha1 = hashjs.sha1;
    var hash = new Sha1().update(buf).digest();
    return new Buffer(hash);
  };

  Hash.sha1.blockSize = 512;

  Hash.asyncSha1 = function (buf) {
    return asink(regeneratorRuntime.mark(function _callee() {
      var args, workersResult;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              args = [buf];
              _context.next = 3;
              return Workers.asyncClassMethod('Hash', 'sha1', args);

            case 3:
              workersResult = _context.sent;
              return _context.abrupt('return', workersResult.resbuf);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }), this);
  };

  Hash.sha256 = function (buf) {
    if (!Buffer.isBuffer(buf)) {
      throw new Error('sha256 hash must be of a buffer');
    }
    var Sha256 = hashjs.sha256;
    var hash = new Sha256().update(buf).digest();
    return new Buffer(hash);
  };

  Hash.sha256.blockSize = 512;

  Hash.asyncSha256 = function (buf) {
    return asink(regeneratorRuntime.mark(function _callee2() {
      var args, workersResult;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              args = [buf];
              _context2.next = 3;
              return Workers.asyncClassMethod('Hash', 'sha256', args);

            case 3:
              workersResult = _context2.sent;
              return _context2.abrupt('return', workersResult.resbuf);

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }), this);
  };

  Hash.sha256Sha256 = function (buf) {
    try {
      return Hash.sha256(Hash.sha256(buf));
    } catch (e) {
      throw new Error('sha256Sha256 hash must be of a buffer: ' + e);
    }
  };

  Hash.asyncSha256Sha256 = function (buf) {
    return asink(regeneratorRuntime.mark(function _callee3() {
      var args, workersResult;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              args = [buf];
              _context3.next = 3;
              return Workers.asyncClassMethod('Hash', 'sha256Sha256', args);

            case 3:
              workersResult = _context3.sent;
              return _context3.abrupt('return', workersResult.resbuf);

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }), this);
  };

  Hash.ripemd160 = function (buf) {
    if (!Buffer.isBuffer(buf)) {
      throw new Error('ripemd160 hash must be of a buffer');
    }
    var Ripemd160 = hashjs.ripemd160;
    var hash = new Ripemd160().update(buf).digest();
    return new Buffer(hash);
  };

  Hash.asyncRipemd160 = function (buf) {
    return asink(regeneratorRuntime.mark(function _callee4() {
      var args, workersResult;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              args = [buf];
              _context4.next = 3;
              return Workers.asyncClassMethod('Hash', 'ripemd160', args);

            case 3:
              workersResult = _context4.sent;
              return _context4.abrupt('return', workersResult.resbuf);

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }), this);
  };

  Hash.sha256Ripemd160 = function (buf) {
    try {
      return Hash.ripemd160(Hash.sha256(buf));
    } catch (e) {
      throw new Error('sha256Ripemd160 hash must be of a buffer: ' + e);
    }
  };

  Hash.asyncSha256Ripemd160 = function (buf) {
    return asink(regeneratorRuntime.mark(function _callee5() {
      var args, workersResult;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              args = [buf];
              _context5.next = 3;
              return Workers.asyncClassMethod('Hash', 'sha256Ripemd160', args);

            case 3:
              workersResult = _context5.sent;
              return _context5.abrupt('return', workersResult.resbuf);

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }), this);
  };

  Hash.sha512 = function (buf) {
    if (!Buffer.isBuffer(buf)) {
      throw new Error('sha512 hash must be of a buffer');
    }
    var Sha512 = hashjs.sha512;
    var hash = new Sha512().update(buf).digest();
    return new Buffer(hash);
  };

  Hash.asyncSha512 = function (buf) {
    return asink(regeneratorRuntime.mark(function _callee6() {
      var args, workersResult;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              args = [buf];
              _context6.next = 3;
              return Workers.asyncClassMethod('Hash', 'sha512', args);

            case 3:
              workersResult = _context6.sent;
              return _context6.abrupt('return', workersResult.resbuf);

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }), this);
  };

  Hash.sha512.blockSize = 1024;

  Hash.hmac = function (hashFStr, data, key) {
    if (hashFStr !== 'sha1' && hashFStr !== 'sha256' && hashFStr !== 'sha512') {
      throw new Error('invalid choice of hash function');
    }

    var hashf = Hash[hashFStr];

    if (!Buffer.isBuffer(data) || !Buffer.isBuffer(key)) {
      throw new Error('data and key must be buffers');
    }

    // http://en.wikipedia.org/wiki/Hash-based_message_authentication_code
    // http://tools.ietf.org/html/rfc4868#section-2
    var blockSize = hashf.blockSize / 8;

    if (key.length > blockSize) {
      key = hashf(key);
    }

    if (key.length < blockSize) {
      var fill = new Buffer(blockSize);
      fill.fill(0, key.length);
      key.copy(fill);
      key = fill;
    }

    var oKeyPad = new Buffer(blockSize);
    var iKeyPad = new Buffer(blockSize);
    for (var i = 0; i < blockSize; i++) {
      oKeyPad[i] = 0x5c ^ key[i];
      iKeyPad[i] = 0x36 ^ key[i];
    }

    return hashf(Buffer.concat([oKeyPad, hashf(Buffer.concat([iKeyPad, data]))]));
  };

  Hash.sha1Hmac = function (data, key) {
    return Hash.hmac('sha1', data, key);
  };

  Hash.asyncSha1Hmac = function (data, key) {
    return asink(regeneratorRuntime.mark(function _callee7() {
      var args, workersResult;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              args = [data, key];
              _context7.next = 3;
              return Workers.asyncClassMethod('Hash', 'sha1Hmac', args);

            case 3:
              workersResult = _context7.sent;
              return _context7.abrupt('return', workersResult.resbuf);

            case 5:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }), this);
  };

  Hash.sha1Hmac.bitsize = 160;

  Hash.sha256Hmac = function (data, key) {
    return Hash.hmac('sha256', data, key);
  };

  Hash.asyncSha256Hmac = function (data, key) {
    return asink(regeneratorRuntime.mark(function _callee8() {
      var args, workersResult;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              args = [data, key];
              _context8.next = 3;
              return Workers.asyncClassMethod('Hash', 'sha256Hmac', args);

            case 3:
              workersResult = _context8.sent;
              return _context8.abrupt('return', workersResult.resbuf);

            case 5:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }), this);
  };

  Hash.sha256Hmac.bitsize = 256;

  Hash.sha512Hmac = function (data, key) {
    return Hash.hmac('sha512', data, key);
  };

  Hash.asyncSha512Hmac = function (data, key) {
    return asink(regeneratorRuntime.mark(function _callee9() {
      var args, workersResult;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              args = [data, key];
              _context9.next = 3;
              return Workers.asyncClassMethod('Hash', 'sha512Hmac', args);

            case 3:
              workersResult = _context9.sent;
              return _context9.abrupt('return', workersResult.resbuf);

            case 5:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }), this);
  };

  Hash.sha512Hmac.bitsize = 512;

  return Hash;
};

inject = require('injecter')(inject, dependencies);
var Hash = inject();
module.exports = Hash;

}).call(this,require("buffer").Buffer)

},{"./workers":351,"asink":352,"buffer":23,"hash.js":374,"injecter":381}],334:[function(require,module,exports){
/**
 * KeyPair
 * =======
 *
 * A keyPair is a collection of a private key and a public key.
 * let keyPair = new KeyPair().fromRandom()
 * let keyPair = new KeyPair().fromPrivKey(privKey)
 * let privKey = keyPair.privKey
 * let pubKey = keyPair.pubKey
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  PrivKey: require('./priv-key'),
  PubKey: require('./pub-key'),
  Struct: require('./struct'),
  Bw: require('./bw'),
  asink: require('asink')
};

var inject = function inject(deps) {
  var PrivKey = deps.PrivKey;
  var PubKey = deps.PubKey;
  var Struct = deps.Struct;
  var Bw = deps.Bw;
  var asink = deps.asink;

  var KeyPair = function (_Struct) {
    _inherits(KeyPair, _Struct);

    function KeyPair(privKey, pubKey) {
      _classCallCheck(this, KeyPair);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(KeyPair).call(this, { privKey: privKey, pubKey: pubKey }));
    }

    _createClass(KeyPair, [{
      key: 'fromJSON',
      value: function fromJSON(json) {
        if (json.privKey) {
          this.privKey = PrivKey.fromJSON(json.privKey);
        }
        if (json.pubKey) {
          this.pubKey = PubKey.fromJSON(json.pubKey);
        }
        return this;
      }
      /*
          toJSON () {
            let json = {}
            if (this.privKey && this.privKey !== undefined) {
              json.privKey = this.privKey.toJSON()
            }
            if (this.pubKey && this.pubKey !== undefined) {
              json.pubKey = this.pubKey.toJSON()
            }
            return json
          }
      */

    }, {
      key: 'fromBr',
      value: function fromBr(br) {
        var buflen1 = br.readUInt8();
        if (buflen1 > 0) {
          this.privKey = new PrivKey().fromFastBuffer(br.read(buflen1));
        }
        var buflen2 = br.readUInt8();
        if (buflen2 > 0) {
          this.pubKey = new PubKey().fromFastBuffer(br.read(buflen2));
        }
        return this;
      }
    }, {
      key: 'toBw',
      value: function toBw(bw) {
        if (!bw) {
          bw = new Bw();
        }
        if (this.privKey) {
          var privKeybuf = this.privKey.toFastBuffer();
          bw.writeUInt8(privKeybuf.length);
          bw.write(privKeybuf);
        } else {
          bw.writeUInt8(0);
        }
        if (this.pubKey) {
          var pubKeybuf = this.pubKey.toFastBuffer();
          bw.writeUInt8(pubKeybuf.length);
          bw.write(pubKeybuf);
        } else {
          bw.writeUInt8(0);
        }
        return bw;
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        return this.fromJSON(JSON.parse(str));
      }
    }, {
      key: 'toString',
      value: function toString() {
        return JSON.stringify(this.toJSON());
      }
    }, {
      key: 'toPublic',
      value: function toPublic() {
        var keyPair = new KeyPair().fromObject(this);
        keyPair.privKey = undefined;
        return keyPair;
      }
    }, {
      key: 'fromPrivKey',
      value: function fromPrivKey(privKey) {
        this.privKey = privKey;
        this.pubKey = new PubKey().fromPrivKey(privKey);
        return this;
      }
    }, {
      key: 'asyncFromPrivKey',
      value: function asyncFromPrivKey(privKey) {
        return asink(regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  this.privKey = privKey;
                  _context.next = 3;
                  return new PubKey().asyncFromPrivKey(privKey);

                case 3:
                  this.pubKey = _context.sent;
                  return _context.abrupt('return', this);

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }), this);
      }
    }, {
      key: 'fromRandom',
      value: function fromRandom() {
        this.privKey = new PrivKey().fromRandom();
        this.pubKey = new PubKey().fromPrivKey(this.privKey);
        return this;
      }
    }, {
      key: 'asyncFromRandom',
      value: function asyncFromRandom() {
        return asink(regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  this.privKey = new PrivKey().fromRandom();
                  return _context2.abrupt('return', this.asyncFromPrivKey(this.privKey));

                case 2:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }), this);
      }
    }], [{
      key: 'fromPrivKey',
      value: function fromPrivKey(privKey) {
        return new this().fromPrivKey(privKey);
      }
    }, {
      key: 'asyncFromPrivKey',
      value: function asyncFromPrivKey(privKey) {
        return new this().asyncFromPrivKey(privKey);
      }
    }, {
      key: 'fromRandom',
      value: function fromRandom() {
        return new this().fromRandom();
      }
    }, {
      key: 'asyncFromRandom',
      value: function asyncFromRandom() {
        return new this().asyncFromRandom();
      }
    }]);

    return KeyPair;
  }(Struct);

  return KeyPair;
};

inject = require('injecter')(inject, dependencies);
var KeyPair = inject();
KeyPair.Mainnet = inject({
  PrivKey: require('./priv-key').Mainnet
});
KeyPair.Testnet = inject({
  PrivKey: require('./priv-key').Testnet
});
module.exports = KeyPair;

},{"./bw":329,"./priv-key":337,"./pub-key":338,"./struct":342,"asink":352,"injecter":381}],335:[function(require,module,exports){
/*
 * OpCode
 * ======
 *
 * An opCode is one of the operations in the bitcoin scripting language. Each
 * operation is just a number from 0-255, and it has a corresponding string,
 * e.g. "OP_RETURN", which comes from the name of that constant in the bitcoind
 * source code. The way you probably want to use this is with
 * new OpCode(str).toNumber() or new OpCode(num).toString()
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Struct: require('./struct')
};

var inject = function inject(deps) {
  var Struct = deps.Struct;
  var map = void 0;

  var OpCode = function (_Struct) {
    _inherits(OpCode, _Struct);

    function OpCode(num) {
      _classCallCheck(this, OpCode);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(OpCode).call(this, { num: num }));
    }

    _createClass(OpCode, [{
      key: 'fromNumber',
      value: function fromNumber(num) {
        this.num = num;
        return this;
      }
    }, {
      key: 'toNumber',
      value: function toNumber() {
        return this.num;
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        var num = map[str];
        if (num === undefined) {
          throw new Error('Invalid opCodeStr');
        }
        this.num = num;
        return this;
      }
    }, {
      key: 'toString',
      value: function toString() {
        var str = OpCode.str[this.num];
        if (str === undefined) {
          if (this.num > 0 && this.num < OpCode.OP_PUSHDATA1) {
            return this.num.toString();
          }
          throw new Error('OpCode does not have a string representation');
        }
        return str;
      }
    }], [{
      key: 'fromNumber',
      value: function fromNumber(num) {
        return new this().fromNumber(num);
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        return new this().fromString(str);
      }
    }]);

    return OpCode;
  }(Struct);

  map = {
    // push value
    OP_FALSE: 0x00,
    OP_0: 0x00,
    OP_PUSHDATA1: 0x4c,
    OP_PUSHDATA2: 0x4d,
    OP_PUSHDATA4: 0x4e,
    OP_1NEGATE: 0x4f,
    OP_RESERVED: 0x50,
    OP_TRUE: 0x51,
    OP_1: 0x51,
    OP_2: 0x52,
    OP_3: 0x53,
    OP_4: 0x54,
    OP_5: 0x55,
    OP_6: 0x56,
    OP_7: 0x57,
    OP_8: 0x58,
    OP_9: 0x59,
    OP_10: 0x5a,
    OP_11: 0x5b,
    OP_12: 0x5c,
    OP_13: 0x5d,
    OP_14: 0x5e,
    OP_15: 0x5f,
    OP_16: 0x60,

    // control
    OP_NOP: 0x61,
    OP_VER: 0x62,
    OP_IF: 0x63,
    OP_NOTIF: 0x64,
    OP_VERIF: 0x65,
    OP_VERNOTIF: 0x66,
    OP_ELSE: 0x67,
    OP_ENDIF: 0x68,
    OP_VERIFY: 0x69,
    OP_RETURN: 0x6a,

    // stack ops
    OP_TOALTSTACK: 0x6b,
    OP_FROMALTSTACK: 0x6c,
    OP_2DROP: 0x6d,
    OP_2DUP: 0x6e,
    OP_3DUP: 0x6f,
    OP_2OVER: 0x70,
    OP_2ROT: 0x71,
    OP_2SWAP: 0x72,
    OP_IFDUP: 0x73,
    OP_DEPTH: 0x74,
    OP_DROP: 0x75,
    OP_DUP: 0x76,
    OP_NIP: 0x77,
    OP_OVER: 0x78,
    OP_PICK: 0x79,
    OP_ROLL: 0x7a,
    OP_ROT: 0x7b,
    OP_SWAP: 0x7c,
    OP_TUCK: 0x7d,

    // splice ops
    OP_CAT: 0x7e,
    OP_SUBSTR: 0x7f,
    OP_LEFT: 0x80,
    OP_RIGHT: 0x81,
    OP_SIZE: 0x82,

    // bit logic
    OP_INVERT: 0x83,
    OP_AND: 0x84,
    OP_OR: 0x85,
    OP_XOR: 0x86,
    OP_EQUAL: 0x87,
    OP_EQUALVERIFY: 0x88,
    OP_RESERVED1: 0x89,
    OP_RESERVED2: 0x8a,

    // numeric
    OP_1ADD: 0x8b,
    OP_1SUB: 0x8c,
    OP_2MUL: 0x8d,
    OP_2DIV: 0x8e,
    OP_NEGATE: 0x8f,
    OP_ABS: 0x90,
    OP_NOT: 0x91,
    OP_0NOTEQUAL: 0x92,

    OP_ADD: 0x93,
    OP_SUB: 0x94,
    OP_MUL: 0x95,
    OP_DIV: 0x96,
    OP_MOD: 0x97,
    OP_LSHIFT: 0x98,
    OP_RSHIFT: 0x99,

    OP_BOOLAND: 0x9a,
    OP_BOOLOR: 0x9b,
    OP_NUMEQUAL: 0x9c,
    OP_NUMEQUALVERIFY: 0x9d,
    OP_NUMNOTEQUAL: 0x9e,
    OP_LESSTHAN: 0x9f,
    OP_GREATERTHAN: 0xa0,
    OP_LESSTHANOREQUAL: 0xa1,
    OP_GREATERTHANOREQUAL: 0xa2,
    OP_MIN: 0xa3,
    OP_MAX: 0xa4,

    OP_WITHIN: 0xa5,

    // crypto
    OP_RIPEMD160: 0xa6,
    OP_SHA1: 0xa7,
    OP_SHA256: 0xa8,
    OP_HASH160: 0xa9,
    OP_HASH256: 0xaa,
    OP_CODESEPARATOR: 0xab,
    OP_CHECKSIG: 0xac,
    OP_CHECKSIGVERIFY: 0xad,
    OP_CHECKMULTISIG: 0xae,
    OP_CHECKMULTISIGVERIFY: 0xaf,

    // expansion
    OP_NOP1: 0xb0,
    OP_NOP2: 0xb1,
    OP_CHECKLOCKTIMEVERIFY: 0xb1,
    OP_NOP3: 0xb2,
    OP_CHECKSEQUENCEVERIFY: 0xb2,
    OP_NOP4: 0xb3,
    OP_NOP5: 0xb4,
    OP_NOP6: 0xb5,
    OP_NOP7: 0xb6,
    OP_NOP8: 0xb7,
    OP_NOP9: 0xb8,
    OP_NOP10: 0xb9,

    // template matching params
    OP_SMALLDATA: 0xf9,
    OP_SMALLINTEGER: 0xfa,
    OP_PUBKEYS: 0xfb,
    OP_PUBKEYHASH: 0xfd,
    OP_PUBKEY: 0xfe,

    OP_INVALIDOPCODE: 0xff
  };

  OpCode.str = {};

  for (var k in map) {
    OpCode[k] = map[k];
    if (map.hasOwnProperty(k)) {
      OpCode.str[map[k]] = k;
    }
  }

  return OpCode;
};

inject = require('injecter')(inject, dependencies);
var OpCode = inject();
module.exports = OpCode;

},{"./struct":342,"injecter":381}],336:[function(require,module,exports){
/**
 * Point (on secp256k1)
 * ====================
 *
 * A point is a point on the secp256k1 curve which is the elliptic curve used
 * by bitcoin. This code is a wrapper for Fedor Indutny's Point class from his
 * elliptic library. This code adds a few minor conveniences, but is mostly the
 * same. Since Fedor's code returns points and big numbers that are instances
 * of his point and big number classes, we have to wrap all the methods such as
 * getX() to return the Yours Bitcoin point and big number types.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Bn: require('./bn'),
  elliptic: require('elliptic')
};

var inject = function inject(deps) {
  var Bn = deps.Bn;
  var elliptic = deps.elliptic;

  var ec = elliptic.curves.secp256k1;
  var _point = ec.curve.point();
  var _Point = _point.constructor;

  var Point = function (_Point2) {
    _inherits(Point, _Point2);

    function Point(x, y, isRed) {
      _classCallCheck(this, Point);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Point).call(this, ec.curve, x, y, isRed));
    }

    _createClass(Point, [{
      key: 'copyFrom',
      value: function copyFrom(point) {
        if (!(point instanceof _Point)) {
          throw new Error('point should be an external point');
        }
        Object.keys(point).forEach(function (key) {
          this[key] = point[key];
        }.bind(this));
        return this;
      }
    }, {
      key: 'add',
      value: function add(p) {
        p = _Point.prototype.add.call(this, p);
        var point = Object.create(Point.prototype);
        return point.copyFrom(p);
      }
    }, {
      key: 'mul',
      value: function mul(bn) {
        var p = _Point.prototype.mul.call(this, bn);
        var point = Object.create(Point.prototype);
        return point.copyFrom(p);
      }
    }, {
      key: 'mulAdd',
      value: function mulAdd(bn1, point, bn2) {
        var p = _Point.prototype.mulAdd.call(this, bn1, point, bn2);
        point = Object.create(Point.prototype);
        return point.copyFrom(p);
      }
    }, {
      key: 'getX',
      value: function getX() {
        var _x = _Point.prototype.getX.call(this);
        var x = Object.create(Bn.prototype);
        _x.copy(x);
        return x;
      }
    }, {
      key: 'getY',
      value: function getY() {
        var _y = _Point.prototype.getY.call(this);
        var y = Object.create(Bn.prototype);
        _y.copy(y);
        return y;
      }
    }, {
      key: 'fromX',
      value: function fromX(isOdd, x) {
        var point = Point.fromX(isOdd, x);
        return this.copyFrom(point);
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return {
          x: this.getX().toString(),
          y: this.getY().toString()
        };
      }
    }, {
      key: 'fromJSON',
      value: function fromJSON(json) {
        var x = new Bn().fromString(json.x);
        var y = new Bn().fromString(json.y);
        var point = new Point(x, y);
        return this.copyFrom(point);
      }
    }, {
      key: 'toString',
      value: function toString() {
        return JSON.stringify(this.toJSON());
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        var json = JSON.parse(str);
        var p = new Point().fromJSON(json);
        return this.copyFrom(p);
      }
    }, {
      key: 'validate',


      // https://www.iacr.org/archive/pkc2003/25670211/25670211.pdf
      value: function validate() {
        var p2 = Point.fromX(this.getY().isOdd(), this.getX());
        if (!(p2.getY().cmp(this.getY()) === 0)) {
          throw new Error('Invalid y value of public key');
        }
        if (!(this.getX().gt(-1) && this.getX().lt(Point.getN())) || !(this.getY().gt(-1) && this.getY().lt(Point.getN()))) {
          throw new Error('Point does not lie on the curve');
        }
        if (!this.mul(Point.getN()).isInfinity()) {
          throw new Error('Point times N must be infinity');
        }
        return this;
      }
    }], [{
      key: 'fromX',
      value: function fromX(isOdd, x) {
        var _point = ec.curve.pointFromX(x, isOdd);
        var point = Object.create(Point.prototype);
        return point.copyFrom(_point);
      }
    }, {
      key: 'getG',
      value: function getG() {
        var _g = ec.curve.g;
        var g = Object.create(Point.prototype);
        return g.copyFrom(_g);
      }
    }, {
      key: 'getN',
      value: function getN() {
        return new Bn(ec.curve.n.toArray());
      }
    }]);

    return Point;
  }(_Point);

  return Point;
};

inject = require('injecter')(inject, dependencies);
var Point = inject();
module.exports = Point;

},{"./bn":327,"elliptic":357,"injecter":381}],337:[function(require,module,exports){
(function (Buffer){
/**
 * Private Key
 * ===========
 *
 * A private key is used for signIng transactions (or messages). The primary
 * way to use this is new PrivKey().fromRandom(), or new PrivKey().fromBuffer(buf).
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Bn: require('./bn'),
  Point: require('./point'),
  Constants: require('./constants').Default.PrivKey,
  Base58Check: require('./base-58-check'),
  Random: require('./random'),
  Struct: require('./struct')
};

var inject = function inject(deps) {
  var Bn = deps.Bn;
  var Point = deps.Point;
  var Constants = deps.Constants;
  var Base58Check = deps.Base58Check;
  var Random = deps.Random;
  var Struct = deps.Struct;

  var PrivKey = function (_Struct) {
    _inherits(PrivKey, _Struct);

    function PrivKey(bn, compressed) {
      _classCallCheck(this, PrivKey);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PrivKey).call(this, { bn: bn, compressed: compressed }));
    }

    _createClass(PrivKey, [{
      key: 'fromJSON',
      value: function fromJSON(json) {
        this.fromHex(json);
        return this;
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return this.toHex();
      }
    }, {
      key: 'fromRandom',
      value: function fromRandom() {
        var privBuf = void 0,
            bn = void 0,
            condition = void 0;

        do {
          privBuf = Random.getRandomBuffer(32);
          bn = new Bn().fromBuffer(privBuf);
          condition = bn.lt(Point.getN());
        } while (!condition);

        this.fromObject({
          bn: bn,
          compressed: true
        });
        return this;
      }
    }, {
      key: 'toBuffer',
      value: function toBuffer() {
        var compressed = this.compressed;

        if (compressed === undefined) {
          compressed = true;
        }

        var privBuf = this.bn.toBuffer({ size: 32 });
        var buf = void 0;
        if (compressed) {
          buf = Buffer.concat([new Buffer([Constants.versionByteNum]), privBuf, new Buffer([0x01])]);
        } else {
          buf = Buffer.concat([new Buffer([Constants.versionByteNum]), privBuf]);
        }

        return buf;
      }
    }, {
      key: 'fromBuffer',
      value: function fromBuffer(buf) {
        if (buf.length === 1 + 32 + 1 && buf[1 + 32 + 1 - 1] === 1) {
          this.compressed = true;
        } else if (buf.length === 1 + 32) {
          this.compressed = false;
        } else {
          throw new Error('LEngth of privKey buffer must be 33 (uncompressed pubKey) or 34 (compressed pubKey)');
        }

        if (buf[0] !== Constants.versionByteNum) {
          throw new Error('Invalid versionByteNum byte');
        }

        return this.fromBn(new Bn().fromBuffer(buf.slice(1, 1 + 32)));
      }
    }, {
      key: 'toBn',
      value: function toBn() {
        return this.bn;
      }
    }, {
      key: 'fromBn',
      value: function fromBn(bn) {
        this.bn = bn;
        return this;
      }
    }, {
      key: 'validate',
      value: function validate() {
        if (!this.bn.lt(Point.getN())) {
          throw new Error('Number must be less than N');
        }
        if (typeof this.compressed !== 'boolean') {
          throw new Error('Must specify whether the corresponding public key is compressed or not (true or false)');
        }
        return this;
      }

      /**
       * Output the private key a Wallet Import Format (Wif) string.
       */

    }, {
      key: 'toWif',
      value: function toWif() {
        return Base58Check.encode(this.toBuffer());
      }

      /**
       * Input the private key from a Wallet Import Format (Wif) string.
       */

    }, {
      key: 'fromWif',
      value: function fromWif(str) {
        return this.fromBuffer(Base58Check.decode(str));
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this.toWif();
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        return this.fromWif(str);
      }
    }], [{
      key: 'fromRandom',
      value: function fromRandom() {
        return new this().fromRandom();
      }
    }, {
      key: 'fromBn',
      value: function fromBn(bn) {
        return new this().fromBn(bn);
      }
    }, {
      key: 'fromWif',
      value: function fromWif(str) {
        return new this().fromWif(str);
      }
    }]);

    return PrivKey;
  }(Struct);

  return PrivKey;
};

inject = require('injecter')(inject, dependencies);
var PrivKey = inject();
PrivKey.Mainnet = inject({
  Constants: require('./constants').Mainnet.PrivKey
});
PrivKey.Testnet = inject({
  Constants: require('./constants').Testnet.PrivKey
});
module.exports = PrivKey;

}).call(this,require("buffer").Buffer)

},{"./base-58-check":325,"./bn":327,"./constants":331,"./point":336,"./random":339,"./struct":342,"buffer":23,"injecter":381}],338:[function(require,module,exports){
(function (Buffer){
/**
 * Public Key
 * ==========
 *
 * A public key corresponds to a private key. If you have a private key, you
 * can find the corresponding public key with new PubKey().fromPrivKey(privKey).
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Point: require('./point'),
  Bn: require('./bn'),
  Bw: require('./bw'),
  Struct: require('./struct'),
  Workers: require('./workers'),
  asink: require('asink')
};

var inject = function inject(deps) {
  var Point = deps.Point;
  var Bn = deps.Bn;
  var Bw = deps.Bw;
  var Struct = deps.Struct;
  var Workers = deps.Workers;
  var asink = deps.asink;

  var PubKey = function (_Struct) {
    _inherits(PubKey, _Struct);

    function PubKey(point) {
      _classCallCheck(this, PubKey);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PubKey).call(this, { point: point }));
    }

    _createClass(PubKey, [{
      key: 'fromJSON',
      value: function fromJSON(json) {
        this.fromFastHex(json);
        return this;
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return this.toFastHex();
      }
    }, {
      key: 'fromPrivKey',
      value: function fromPrivKey(privKey) {
        this.fromObject({
          point: Point.getG().mul(privKey.bn),
          compressed: privKey.compressed
        });
        return this;
      }
    }, {
      key: 'asyncFromPrivKey',
      value: function asyncFromPrivKey(privKey) {
        return asink(regeneratorRuntime.mark(function _callee() {
          var workersResult;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return Workers.asyncObjectMethod(this, 'fromPrivKey', [privKey]);

                case 2:
                  workersResult = _context.sent;
                  return _context.abrupt('return', this.fromFastBuffer(workersResult.resbuf));

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }), this);
      }
    }, {
      key: 'fromBuffer',
      value: function fromBuffer(buf, strict) {
        return this.fromDer(buf, strict);
      }
    }, {
      key: 'asyncFromBuffer',
      value: function asyncFromBuffer(buf, strict) {
        return asink(regeneratorRuntime.mark(function _callee2() {
          var args, workersResult;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  args = [buf, strict];
                  _context2.next = 3;
                  return Workers.asyncObjectMethod(this, 'fromBuffer', args);

                case 3:
                  workersResult = _context2.sent;
                  return _context2.abrupt('return', this.fromFastBuffer(workersResult.resbuf));

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }), this);
      }
    }, {
      key: 'fromFastBuffer',
      value: function fromFastBuffer(buf) {
        if (buf.length === 0) {
          return this;
        }
        var compressed = Boolean(buf[0]);
        buf = buf.slice(1);
        this.fromDer(buf);
        this.compressed = compressed;
        return this;
      }

      /**
       * In order to mimic the non-strict style of OpenSSL, set strict = false. For
       * information and what prefixes 0x06 and 0x07 mean, in addition to the normal
       * compressed and uncompressed public keys, see the message by Peter Wuille
       * where he discovered these "hybrid pubKeys" on the mailing list:
       * http://sourceforge.net/p/bitcoin/mailman/message/29416133/
       */

    }, {
      key: 'fromDer',
      value: function fromDer(buf, strict) {
        if (strict === undefined) {
          strict = true;
        } else {
          strict = false;
        }
        if (buf[0] === 0x04 || !strict && (buf[0] === 0x06 || buf[0] === 0x07)) {
          var xbuf = buf.slice(1, 33);
          var ybuf = buf.slice(33, 65);
          if (xbuf.length !== 32 || ybuf.length !== 32 || buf.length !== 65) {
            throw new Error('LEngth of x and y must be 32 bytes');
          }
          var x = new Bn(xbuf);
          var y = new Bn(ybuf);
          this.point = new Point(x, y);
          this.compressed = false;
        } else if (buf[0] === 0x03) {
          var _xbuf = buf.slice(1);
          var _x = new Bn(_xbuf);
          this.fromX(true, _x);
          this.compressed = true;
        } else if (buf[0] === 0x02) {
          var _xbuf2 = buf.slice(1);
          var _x2 = new Bn(_xbuf2);
          this.fromX(false, _x2);
          this.compressed = true;
        } else {
          throw new Error('Invalid DER format pubKey');
        }
        return this;
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        this.fromDer(new Buffer(str, 'hex'));
        return this;
      }
    }, {
      key: 'fromX',
      value: function fromX(odd, x) {
        if (typeof odd !== 'boolean') {
          throw new Error('Must specify whether y is odd or not (true or false)');
        }
        this.point = Point.fromX(odd, x);
        return this;
      }
    }, {
      key: 'toBuffer',
      value: function toBuffer() {
        var compressed = this.compressed === undefined ? true : this.compressed;
        return this.toDer(compressed);
      }
    }, {
      key: 'toFastBuffer',
      value: function toFastBuffer() {
        if (!this.point) {
          return new Buffer(0);
        }
        var bw = new Bw();
        var compressed = this.compressed === undefined ? true : Boolean(this.compressed);
        bw.writeUInt8(Number(compressed));
        bw.write(this.toDer(false));
        return bw.toBuffer();
      }
    }, {
      key: 'toDer',
      value: function toDer(compressed) {
        compressed = compressed === undefined ? this.compressed : compressed;
        if (typeof compressed !== 'boolean') {
          throw new Error('Must specify whether the public key is compressed or not (true or false)');
        }

        var x = this.point.getX();
        var y = this.point.getY();

        var xbuf = x.toBuffer({ size: 32 });
        var ybuf = y.toBuffer({ size: 32 });

        var prefix = void 0;
        if (!compressed) {
          prefix = new Buffer([0x04]);
          return Buffer.concat([prefix, xbuf, ybuf]);
        } else {
          var odd = ybuf[ybuf.length - 1] % 2;
          if (odd) {
            prefix = new Buffer([0x03]);
          } else {
            prefix = new Buffer([0x02]);
          }
          return Buffer.concat([prefix, xbuf]);
        }
      }
    }, {
      key: 'toString',
      value: function toString() {
        var compressed = this.compressed === undefined ? true : this.compressed;
        return this.toDer(compressed).toString('hex');
      }

      /**
       * Translated from bitcoind's IsCompressedOrUncompressedPubKey
       */

    }, {
      key: 'validate',


      // https://www.iacr.org/archive/pkc2003/25670211/25670211.pdf
      value: function validate() {
        if (this.point.isInfinity()) {
          throw new Error('point: Point cannot be equal to Infinity');
        }
        if (this.point.eq(new Point(new Bn(0), new Bn(0)))) {
          throw new Error('point: Point cannot be equal to 0, 0');
        }
        this.point.validate();
        return this;
      }
    }], [{
      key: 'fromPrivKey',
      value: function fromPrivKey(privKey) {
        return new this().fromPrivKey(privKey);
      }
    }, {
      key: 'asyncFromPrivKey',
      value: function asyncFromPrivKey(privKey) {
        return new this().asyncFromPrivKey(privKey);
      }
    }, {
      key: 'fromDer',
      value: function fromDer(buf, strict) {
        return new this().fromDer(buf, strict);
      }
    }, {
      key: 'fromX',
      value: function fromX(odd, x) {
        return new this().fromX(odd, x);
      }
    }, {
      key: 'isCompressedOrUncompressed',
      value: function isCompressedOrUncompressed(buf) {
        if (buf.length < 33) {
          //  Non-canonical public key: too short
          return false;
        }
        if (buf[0] === 0x04) {
          if (buf.length !== 65) {
            //  Non-canonical public key: invalid length for uncompressed key
            return false;
          }
        } else if (buf[0] === 0x02 || buf[0] === 0x03) {
          if (buf.length !== 33) {
            //  Non-canonical public key: invalid length for compressed key
            return false;
          }
        } else {
          //  Non-canonical public key: neither compressed nor uncompressed
          return false;
        }
        return true;
      }
    }]);

    return PubKey;
  }(Struct);

  return PubKey;
};

inject = require('injecter')(inject, dependencies);
var PubKey = inject();
module.exports = PubKey;

}).call(this,require("buffer").Buffer)

},{"./bn":327,"./bw":329,"./point":336,"./struct":342,"./workers":351,"asink":352,"buffer":23,"injecter":381}],339:[function(require,module,exports){
/**
 * Random Number Generator
 * =======================
 *
 * Random numbers are important in bitcoin primarily for generating private
 * keys. It is also important for creating signatures if you are using a random
 * value of k, but Yours Bitcoin defaults to using deterministic k. That means
 * computing a random private key, or a random seed for use in Bip39 or Bip32,
 * is the primary use of the random number generator.  Note that the simplicity
 * of this class is extremely carefully considered. It is easy to audit that
 * this code runs node's randomBytes function. It is also easy to audit that
 * the randomBytes method is correctly interpreted as
 * window.crypto.getRandomValues when this code is browserified by browserify,
 * and thus also works correctly in the browser. We deliberately do not do
 * anything else to this random number in order to minimize possible errors in
 * this absolutely critical code.
 */
'use strict';

var dependencies = {
  randomBytes: require('randombytes')
};

var inject = function inject(deps) {
  var randomBytes = deps.randomBytes;

  var Random = {};

  Random.getRandomBuffer = function (size) {
    return randomBytes(size);
  };

  return Random;
};

inject = require('injecter')(inject, dependencies);
var Random = inject();
module.exports = Random;

},{"injecter":381,"randombytes":382}],340:[function(require,module,exports){
(function (Buffer){
/*
 * Script
 * ======
 *
 * Script is the scripting language built into bitcoin. The Script class lets
 * you create an instance of a script, e.g. for a scriptSig or a scriptPubKey.
 * It understands both the binary format, as well as two different string
 * formats. The default string format, to/fromString, is a custom format only
 * used by Yours Bitcoin because it is isomorphic to the binary format (or as
 * isomorphic as it can be ... since OP_0 and OP_FALSE have the same byte
 * value, and so do OP_1 and OP_TRUE). The bitcoind string format is also
 * support, but that format is not isomorphic (i.e., if you pull in a string
 * and then write it again, you are likely to get back a different string, even
 * if you don't use OP_0, OP_FALSE, OP_1, or OP_TRUE).
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Bn: require('./bn'),
  Br: require('./br'),
  Bw: require('./bw'),
  cmp: require('./cmp'),
  OpCode: require('./op-code'),
  PubKey: require('./pub-key'),
  Sig: require('./sig'),
  Struct: require('./struct')
};

var inject = function inject(deps) {
  var Bn = deps.Bn;
  var Br = deps.Br;
  var Bw = deps.Bw;
  var cmp = deps.cmp;
  var OpCode = deps.OpCode;
  var PubKey = deps.PubKey;
  var Sig = deps.Sig;
  var Struct = deps.Struct;

  var Script = function (_Struct) {
    _inherits(Script, _Struct);

    function Script() {
      var chunks = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      _classCallCheck(this, Script);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Script).call(this, { chunks: chunks }));
    }

    _createClass(Script, [{
      key: 'fromJSON',
      value: function fromJSON(json) {
        return this.fromString(json);
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return this.toString();
      }
    }, {
      key: 'fromBuffer',
      value: function fromBuffer(buf) {
        this.chunks = [];

        var br = new Br(buf);
        while (!br.eof()) {
          var opCodeNum = br.readUInt8();

          var len = void 0,
              _buf = void 0;
          if (opCodeNum > 0 && opCodeNum < OpCode.OP_PUSHDATA1) {
            len = opCodeNum;
            this.chunks.push({
              buf: br.read(len),
              len: len,
              opCodeNum: opCodeNum
            });
          } else if (opCodeNum === OpCode.OP_PUSHDATA1) {
            len = br.readUInt8();
            var _buf2 = br.read(len);
            this.chunks.push({
              buf: _buf2,
              len: len,
              opCodeNum: opCodeNum
            });
          } else if (opCodeNum === OpCode.OP_PUSHDATA2) {
            len = br.readUInt16LE();
            _buf = br.read(len);
            this.chunks.push({
              buf: _buf,
              len: len,
              opCodeNum: opCodeNum
            });
          } else if (opCodeNum === OpCode.OP_PUSHDATA4) {
            len = br.readUInt32LE();
            _buf = br.read(len);
            this.chunks.push({
              buf: _buf,
              len: len,
              opCodeNum: opCodeNum
            });
          } else {
            this.chunks.push({
              opCodeNum: opCodeNum
            });
          }
        }

        return this;
      }
    }, {
      key: 'toBuffer',
      value: function toBuffer() {
        var bw = new Bw();

        for (var i = 0; i < this.chunks.length; i++) {
          var chunk = this.chunks[i];
          var opCodeNum = chunk.opCodeNum;
          bw.writeUInt8(opCodeNum);
          if (chunk.buf) {
            if (opCodeNum < OpCode.OP_PUSHDATA1) {
              bw.write(chunk.buf);
            } else if (opCodeNum === OpCode.OP_PUSHDATA1) {
              bw.writeUInt8(chunk.len);
              bw.write(chunk.buf);
            } else if (opCodeNum === OpCode.OP_PUSHDATA2) {
              bw.writeUInt16LE(chunk.len);
              bw.write(chunk.buf);
            } else if (opCodeNum === OpCode.OP_PUSHDATA4) {
              bw.writeUInt32LE(chunk.len);
              bw.write(chunk.buf);
            }
          }
        }

        return bw.toBuffer();
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        this.chunks = [];
        if (str === '' || str === undefined) {
          return this;
        }

        var tokens = str.split(' ');
        var i = 0;
        while (i < tokens.length) {
          var token = tokens[i];
          var opCodeNum = void 0;
          try {
            var opCode = new OpCode().fromString(token);
            opCodeNum = opCode.toNumber();
          } catch (err) {}

          if (opCodeNum === undefined) {
            opCodeNum = parseInt(token, 10);
            if (opCodeNum > 0 && opCodeNum < OpCode.OP_PUSHDATA1) {
              this.chunks.push({
                buf: new Buffer(tokens[i + 1].slice(2), 'hex'),
                len: opCodeNum,
                opCodeNum: opCodeNum
              });
              i = i + 2;
            } else if (opCodeNum === 0) {
              this.chunks.push({
                opCodeNum: 0
              });
              i = i + 1;
            } else {
              throw new Error('Invalid script');
            }
          } else if (opCodeNum === OpCode.OP_PUSHDATA1 || opCodeNum === OpCode.OP_PUSHDATA2 || opCodeNum === OpCode.OP_PUSHDATA4) {
            if (tokens[i + 2].slice(0, 2) !== '0x') {
              throw new Error('Pushdata data must start with 0x');
            }
            this.chunks.push({
              buf: new Buffer(tokens[i + 2].slice(2), 'hex'),
              len: parseInt(tokens[i + 1], 10),
              opCodeNum: opCodeNum
            });
            i = i + 3;
          } else {
            this.chunks.push({
              opCodeNum: opCodeNum
            });
            i = i + 1;
          }
        }
        return this;
      }
    }, {
      key: 'toString',
      value: function toString() {
        var str = '';

        for (var i = 0; i < this.chunks.length; i++) {
          var chunk = this.chunks[i];
          var opCodeNum = chunk.opCodeNum;
          if (!chunk.buf) {
            if (OpCode.str[opCodeNum] !== undefined) {
              str = str + ' ' + new OpCode(opCodeNum).toString();
            } else {
              str = str + ' ' + '0x' + opCodeNum.toString(16);
            }
          } else {
            if (opCodeNum === OpCode.OP_PUSHDATA1 || opCodeNum === OpCode.OP_PUSHDATA2 || opCodeNum === OpCode.OP_PUSHDATA4) {
              str = str + ' ' + new OpCode(opCodeNum).toString();
            }
            str = str + ' ' + chunk.len;
            str = str + ' ' + '0x' + chunk.buf.toString('hex');
          }
        }

        return str.substr(1);
      }

      /**
       * Input the script from the script string format used in bitcoind data tests
       */

    }, {
      key: 'fromBitcoindString',
      value: function fromBitcoindString(str) {
        var bw = new Bw();
        var tokens = str.split(' ');
        var i = void 0;
        for (i = 0; i < tokens.length; i++) {
          var token = tokens[i];
          if (token === '') {
            continue;
          }
          if (token[0] === '0' && token[1] === 'x') {
            var hex = token.slice(2);
            bw.write(new Buffer(hex, 'hex'));
          } else if (token[0] === "'") {
            var tstr = token.slice(1, token.length - 1);
            var cbuf = new Buffer(tstr);
            var tbuf = new Script().writeBuffer(cbuf).toBuffer();
            bw.write(tbuf);
          } else if (OpCode['OP_' + token] !== undefined) {
            var opstr = 'OP_' + token;
            var opCodeNum = OpCode[opstr];
            bw.writeUInt8(opCodeNum);
          } else if (typeof OpCode[token] === 'number') {
            var _opstr = token;
            var _opCodeNum = OpCode[_opstr];
            bw.writeUInt8(_opCodeNum);
          } else if (!isNaN(parseInt(token, 10))) {
            var bn = new Bn(token);
            var script = new Script().writeBn(bn);
            var _tbuf = script.toBuffer();
            bw.write(_tbuf);
          } else {
            throw new Error('Could not determine type of script value');
          }
        }
        var buf = bw.toBuffer();
        return this.fromBuffer(buf);
      }
    }, {
      key: 'toBitcoindString',


      /**
       * Output the script to the script string format used in bitcoind data tests.
       */
      value: function toBitcoindString() {
        var str = '';
        for (var i = 0; i < this.chunks.length; i++) {
          var chunk = this.chunks[i];
          if (chunk.buf) {
            var buf = new Script([chunk]).toBuffer();
            var hex = buf.toString('hex');
            str = str + ' ' + '0x' + hex;
          } else if (OpCode.str[chunk.opCodeNum] !== undefined) {
            var ostr = new OpCode(chunk.opCodeNum).toString();
            str = str + ' ' + ostr.slice(3); // remove OP_
          } else {
            str = str + ' ' + '0x' + chunk.opCodeNum.toString(16);
          }
        }
        return str.substr(1);
      }

      /**
       * Turn script into a standard pubKeyHash output script
       */

    }, {
      key: 'fromPubKeyHash',
      value: function fromPubKeyHash(hashBuf) {
        if (hashBuf.length !== 20) {
          throw new Error('hashBuf must be a 20 byte buffer');
        }
        this.writeOpCode(OpCode.OP_DUP);
        this.writeOpCode(OpCode.OP_HASH160);
        this.writeBuffer(hashBuf);
        this.writeOpCode(OpCode.OP_EQUALVERIFY);
        this.writeOpCode(OpCode.OP_CHECKSIG);
        return this;
      }
    }, {
      key: 'fromScriptHash',


      /**
       * Turn script into a standard scriptHash (p2sh) output script
       */
      value: function fromScriptHash(hashBuf) {
        if (hashBuf.length !== 20) {
          throw new Error('hashBuf must be a 20 byte buffer');
        }
        this.writeOpCode(OpCode.OP_HASH160);
        this.writeBuffer(hashBuf);
        this.writeOpCode(OpCode.OP_EQUAL);
        return this;
      }
    }, {
      key: 'fromPubKeys',


      /**
       * Generate a multisig output script from a list of public keys. sort
       * defaults to true. If sort is true, the pubKeys are sorted
       * lexicographically.
      */
      value: function fromPubKeys(m, pubKeys) {
        var sort = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

        if (typeof m !== 'number') {
          throw new Error('m must be a number');
        }
        if (sort === true) {
          pubKeys = Script.sortPubKeys(pubKeys);
        }
        this.writeOpCode(m + OpCode.OP_1 - 1);
        for (var i in pubKeys) {
          this.writeBuffer(pubKeys[i].toBuffer());
        }
        this.writeOpCode(pubKeys.length + OpCode.OP_1 - 1);
        this.writeOpCode(OpCode.OP_CHECKMULTISIG);
        return this;
      }
    }, {
      key: 'removeCodeseparators',
      value: function removeCodeseparators() {
        var chunks = [];
        for (var i = 0; i < this.chunks.length; i++) {
          if (this.chunks[i].opCodeNum !== OpCode.OP_CODESEPARATOR) {
            chunks.push(this.chunks[i]);
          }
        }
        this.chunks = chunks;
        return this;
      }
    }, {
      key: 'isPushOnly',
      value: function isPushOnly() {
        for (var i = 0; i < this.chunks.length; i++) {
          var chunk = this.chunks[i];
          var opCodeNum = chunk.opCodeNum;
          if (opCodeNum > OpCode.OP_16) {
            return false;
          }
        }
        return true;
      }
    }, {
      key: 'isOpReturn',
      value: function isOpReturn() {
        if (this.chunks[0].opCodeNum === OpCode.OP_RETURN && (this.chunks.length === 1 || this.chunks.length === 2 && this.chunks[1].buf && this.chunks[1].buf.length <= 40 && this.chunks[1].length === this.chunks.len)) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: 'isPubKeyHashOut',
      value: function isPubKeyHashOut() {
        if (this.chunks[0] && this.chunks[0].opCodeNum === OpCode.OP_DUP && this.chunks[1] && this.chunks[1].opCodeNum === OpCode.OP_HASH160 && this.chunks[2].buf && this.chunks[3] && this.chunks[3].opCodeNum === OpCode.OP_EQUALVERIFY && this.chunks[4] && this.chunks[4].opCodeNum === OpCode.OP_CHECKSIG) {
          return true;
        } else {
          return false;
        }
      }

      /**
       * A pubKeyHash input should consist of two push operations. The first push
       * operation may be OP_0, which means the signature is missing, which is true
       * for some partially signed (and invalid) transactions.
       */

    }, {
      key: 'isPubKeyHashIn',
      value: function isPubKeyHashIn() {
        if (this.chunks.length === 2 && (this.chunks[0].buf || this.chunks[0].opCodeNum === OpCode.OP_0) && this.chunks[1].buf) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: 'isScriptHashOut',
      value: function isScriptHashOut() {
        var buf = this.toBuffer();
        return buf.length === 23 && buf[0] === OpCode.OP_HASH160 && buf[1] === 0x14 && buf[22] === OpCode.OP_EQUAL;
      }

      /**
       * Note that these are frequently indistinguishable from pubKeyHashin
       */

    }, {
      key: 'isScriptHashIn',
      value: function isScriptHashIn() {
        if (!this.isPushOnly()) {
          return false;
        }
        try {
          new Script().fromBuffer(this.chunks[this.chunks.length - 1].buf);
        } catch (err) {
          return false;
        }
        return true;
      }

      /**
       * Convenience method to check if a script is both scriptHash (p2sh) and if
       * the redeemScript inside is a multisig output. This is the standard format
       * for inputs of most multisig transactions.
       */

    }, {
      key: 'isScriptHashMultiSigIn',
      value: function isScriptHashMultiSigIn() {
        if (!this.isScriptHashIn()) {
          return false;
        }
        var redeemScript = void 0;
        try {
          redeemScript = new Script().fromBuffer(this.chunks[this.chunks.length - 1].buf);
        } catch (err) {
          return false;
        }
        return redeemScript.isMultiSigOut();
      }
    }, {
      key: 'isMultiSigOut',
      value: function isMultiSigOut() {
        var m = this.chunks[0].opCodeNum - OpCode.OP_1 + 1;
        if (!(m >= 1 && m <= 16)) {
          return false;
        }
        var pubKeychunks = this.chunks.slice(1, this.chunks.length - 2);
        if (!pubKeychunks.every(function (chunk) {
          try {
            var buf = chunk.buf;
            var pubKey = new PubKey().fromDer(buf);
            pubKey.validate();
            return true;
          } catch (err) {
            return false;
          }
        })) {
          return false;
        }
        var n = this.chunks[this.chunks.length - 2].opCodeNum - OpCode.OP_1 + 1;
        if (!(n >= m && n <= 16)) {
          return false;
        }
        if (this.chunks[1 + n + 1].opCodeNum !== OpCode.OP_CHECKMULTISIG) {
          return false;
        }
        return true;
      }
    }, {
      key: 'isMultiSigIn',
      value: function isMultiSigIn() {
        if (this.chunks[0].opCodeNum !== OpCode.OP_0) {
          return false;
        }
        var remainIng = this.chunks.slice(1);
        if (remainIng.length < 1) {
          return false;
        }
        return remainIng.every(function (chunk) {
          return Buffer.isBuffer(chunk.buf) && Sig.IsTxDer(chunk.buf);
        });
      }

      /**
       * Analagous to bitcoind's FindAndDelete. Find and delete equivalent chunks,
       * typically used with push data chunks.  Note that this will find and delete
       * not just the same data, but the same data with the same push data op as
       * produced by default. i.e., if a pushdata in a tx does not use the minimal
       * pushdata op, then when you try to remove the data it is pushing, it will not
       * be removed, because they do not use the same pushdata op.
       */

    }, {
      key: 'findAndDelete',
      value: function findAndDelete(script) {
        var buf = script.toBuffer();
        for (var i = 0; i < this.chunks.length; i++) {
          var script2 = new Script([this.chunks[i]]);
          var buf2 = script2.toBuffer();
          if (cmp(buf, buf2)) {
            this.chunks.splice(i, 1);
          }
        }
        return this;
      }
    }, {
      key: 'writeScript',
      value: function writeScript(script) {
        this.chunks = this.chunks.concat(script.chunks);
        return this;
      }
    }, {
      key: 'writeString',
      value: function writeString(str) {
        var script = new Script().fromString(str);
        this.chunks = this.chunks.concat(script.chunks);
        return this;
      }
    }, {
      key: 'writeOpCode',
      value: function writeOpCode(opCodeNum) {
        this.chunks.push({ opCodeNum: opCodeNum });
        return this;
      }
    }, {
      key: 'setChunkOpCode',
      value: function setChunkOpCode(i, opCodeNum) {
        this.chunks[i] = { opCodeNum: opCodeNum };
        return this;
      }

      // write a big number in the minimal way

    }, {
      key: 'writeBn',
      value: function writeBn(bn) {
        if (bn.cmp(0) === OpCode.OP_0) {
          this.chunks.push({
            opCodeNum: OpCode.OP_0
          });
        } else if (bn.cmp(-1) === 0) {
          this.chunks.push({
            opCodeNum: OpCode.OP_1NEGATE
          });
        } else if (bn.cmp(1) >= 0 && bn.cmp(16) <= 0) {
          // see OP_1 - OP_16
          this.chunks.push({
            opCodeNum: bn.toNumber() + OpCode.OP_1 - 1
          });
        } else {
          var buf = bn.toSm({ endian: 'little' });
          this.writeBuffer(buf);
        }
        return this;
      }
    }, {
      key: 'setChunkBn',
      value: function setChunkBn(i, bn) {
        this.chunks[i] = new Script().writeBn(bn).chunks[0];
        return this;
      }

      // note: this does not necessarily write buffers in the minimal way
      // to write numbers in the minimal way, see writeBn

    }, {
      key: 'writeBuffer',
      value: function writeBuffer(buf) {
        var opCodeNum = void 0;
        var len = buf.length;
        if (buf.length > 0 && buf.length < OpCode.OP_PUSHDATA1) {
          opCodeNum = buf.length;
        } else if (buf.length === 0) {
          opCodeNum = OpCode.OP_0;
        } else if (buf.length < Math.pow(2, 8)) {
          opCodeNum = OpCode.OP_PUSHDATA1;
        } else if (buf.length < Math.pow(2, 16)) {
          opCodeNum = OpCode.OP_PUSHDATA2;
        } else if (buf.length < Math.pow(2, 32)) {
          opCodeNum = OpCode.OP_PUSHDATA4;
        } else {
          throw new Error("You can't push that much data");
        }
        this.chunks.push({
          buf: buf,
          len: len,
          opCodeNum: opCodeNum
        });
        return this;
      }
    }, {
      key: 'setChunkBuffer',
      value: function setChunkBuffer(i, buf) {
        this.chunks[i] = new Script().writeBuffer(buf).chunks[0];
        return this;
      }

      // make sure a push is the smallest way to push that particular data
      // comes from bitcoind's script interpreter CheckMinimalPush function

    }, {
      key: 'checkMinimalPush',
      value: function checkMinimalPush(i) {
        var chunk = this.chunks[i];
        var buf = chunk.buf;
        var opCodeNum = chunk.opCodeNum;
        if (!buf) {
          return true;
        }
        if (buf.length === 0) {
          // Could have used OP_0.
          return opCodeNum === OpCode.OP_0;
        } else if (buf.length === 1 && buf[0] >= 1 && buf[0] <= 16) {
          // Could have used OP_1 .. OP_16.
          return opCodeNum === OpCode.OP_1 + (buf[0] - 1);
        } else if (buf.length === 1 && buf[0] === 0x81) {
          // Could have used OP_1NEGATE.
          return opCodeNum === OpCode.OP_1NEGATE;
        } else if (buf.length <= 75) {
          // Could have used a direct push (opCode indicating number of bytes pushed + those bytes).
          return opCodeNum === buf.length;
        } else if (buf.length <= 255) {
          // Could have used OP_PUSHDATA.
          return opCodeNum === OpCode.OP_PUSHDATA1;
        } else if (buf.length <= 65535) {
          // Could have used OP_PUSHDATA2.
          return opCodeNum === OpCode.OP_PUSHDATA2;
        }
        return true;
      }
    }], [{
      key: 'fromBitcoindString',
      value: function fromBitcoindString(str) {
        return new this().fromBitcoindString(str);
      }
    }, {
      key: 'fromPubKeyHash',
      value: function fromPubKeyHash(hashBuf) {
        return new this().fromPubKeyHash(hashBuf);
      }
    }, {
      key: 'fromScriptHash',
      value: function fromScriptHash(hashBuf) {
        return new this().fromScriptHash(hashBuf);
      }
    }, {
      key: 'sortPubKeys',
      value: function sortPubKeys(pubKeys) {
        return pubKeys.slice().sort(function (pubKey1, pubKey2) {
          var buf1 = pubKey1.toBuffer();
          var buf2 = pubKey2.toBuffer();
          var len = buf1.length > buf1.length ? buf1.length : buf2.length;
          for (var i = 0; i <= len; i++) {
            if (buf1[i] === undefined) {
              return -1; // shorter strings come first
            }
            if (buf2[i] === undefined) {
              return 1;
            }
            if (buf1[i] < buf2[i]) {
              return -1;
            }
            if (buf1[i] > buf2[i]) {
              return 1;
            } else {
              continue;
            }
          }
        });
      }
    }, {
      key: 'fromPubKeys',
      value: function fromPubKeys(m, pubKeys, sort) {
        return new this().fromPubKeys(m, pubKeys, sort);
      }
    }, {
      key: 'writeScript',
      value: function writeScript(script) {
        return new this().writeScript(script);
      }
    }, {
      key: 'writeString',
      value: function writeString(str) {
        return new this().writeString(str);
      }
    }, {
      key: 'writeOpCode',
      value: function writeOpCode(opCodeNum) {
        return new this().writeOpCode(opCodeNum);
      }
    }, {
      key: 'writeBn',
      value: function writeBn(bn) {
        return new this().writeBn(bn);
      }
    }, {
      key: 'writeBuffer',
      value: function writeBuffer(buf) {
        return new this().writeBuffer(buf);
      }
    }]);

    return Script;
  }(Struct);

  return Script;
};

inject = require('injecter')(inject, dependencies);
var Script = inject();
module.exports = Script;

}).call(this,require("buffer").Buffer)

},{"./bn":327,"./br":328,"./bw":329,"./cmp":330,"./op-code":335,"./pub-key":338,"./sig":341,"./struct":342,"buffer":23,"injecter":381}],341:[function(require,module,exports){
(function (Buffer){
/**
 * Signature
 * =========
 *
 * A signature is the thing you make when you want to sign a transaction, or
 * the thing you want to verify if you want to ensure that someone signed a
 * transaction. It has an r and s value, which are the cryptographic big
 * numbers that define a signature. And since this is a bitcoin library, it
 * also has nHashType, which is the way to hash a transaction and is used in
 * the binary format of a signature when it is in a transaction. We also
 * support a public key recover value, recovery, allowing one to compute the
 * public key from a signature. The "compressed" value is also necessary to
 * accurately compute the public key from a signature.
 *
 * There are a few different formats of a signature in bitcoin. One is DER, the
 * other is the TxFormat which is the same as DER but with the nHashType byte
 * appended, and the final one is Compact, which is used by Bitcoin Signed
 * Message (Bsm).
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Bn: require('./bn'),
  Struct: require('./struct')
};

var inject = function inject(deps) {
  var Bn = deps.Bn;
  var Struct = deps.Struct;

  /**
   * r, s: big numbers constiting a cryptographic signature
   * nHashType: found at the end of a signature in a transaction
   * recovery: public key recovery number
   * compressed: whether the recovered pubKey is compressed
   */

  var Sig = function (_Struct) {
    _inherits(Sig, _Struct);

    function Sig(r, s, nHashType, recovery, compressed) {
      _classCallCheck(this, Sig);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Sig).call(this, { r: r, s: s, nHashType: nHashType, recovery: recovery, compressed: compressed }));
    }

    _createClass(Sig, [{
      key: 'fromBuffer',
      value: function fromBuffer(buf) {
        try {
          return this.fromDer(buf, true);
        } catch (e) {}
        try {
          return this.fromCompact(buf);
        } catch (e) {}
        return this.fromTxFormat(buf);
      }
    }, {
      key: 'toBuffer',
      value: function toBuffer() {
        if (this.nHashType !== undefined) {
          return this.toTxFormat();
        } else if (this.recovery !== undefined) {
          return this.toCompact();
        }
        return this.toDer();
      }

      // The format used by "message"

    }, {
      key: 'fromCompact',
      value: function fromCompact(buf) {
        var compressed = true;
        var recovery = buf.slice(0, 1)[0] - 27 - 4;
        if (recovery < 0) {
          compressed = false;
          recovery = recovery + 4;
        }

        var b2 = buf.slice(1, 33);
        var b3 = buf.slice(33, 65);

        if (!(recovery === 0 || recovery === 1 || recovery === 2 || recovery === 3)) {
          throw new Error('i must be 0, 1, 2, or 3');
        }
        if (b2.length !== 32) {
          throw new Error('r must be 32 bytes');
        }
        if (b3.length !== 32 || buf.length > 65) {
          throw new Error('s must be 32 bytes');
        }

        this.compressed = compressed;
        this.recovery = recovery;
        this.r = new Bn().fromBuffer(b2);
        this.s = new Bn().fromBuffer(b3);

        return this;
      }
    }, {
      key: 'fromDer',


      // The format used in a tx, except without the nHashType at the end
      value: function fromDer(buf, strict) {
        var obj = Sig.parseDer(buf, strict);
        this.r = obj.r;
        this.s = obj.s;

        return this;
      }
    }, {
      key: 'fromTxFormat',


      // The format used in a tx
      value: function fromTxFormat(buf) {
        if (buf.length === 0) {
          // allow setting a "blank" signature
          this.r = new Bn(1);
          this.s = new Bn(1);
          this.nHashType = 1;
          return this;
        }
        var nHashType = buf.readUInt8(buf.length - 1);
        var derbuf = buf.slice(0, buf.length - 1);
        this.fromDer(derbuf, false);
        this.nHashType = nHashType;
        return this;
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        return this.fromHex(str);
      }

      /**
       * In order to mimic the non-strict DER encoding of OpenSSL, set strict = false.
       */

    }, {
      key: 'hasLowS',


      /**
       * Compares to bitcoind's IsLowDERSignature
       * See also Ecdsa signature algorithm which enforces this.
       * See also Bip 62, "low S values in signatures"
       */
      value: function hasLowS() {
        if (this.s.lt(1) || this.s.gt(Bn.fromBuffer(new Buffer('7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0', 'hex')))) {
          return false;
        }
        return true;
      }

      /**
       * Ensures the nHashType is exactly equal to one of the standard options or combinations thereof.
       * Translated from bitcoind's IsDefinedHashtypeSignature
       */

    }, {
      key: 'hasDefinedHashType',
      value: function hasDefinedHashType() {
        if (this.nHashType < Sig.SIGHASH_ALL || this.nHashType > Sig.SIGHASH_SINGLE) {
          return false;
        }
        return true;
      }
    }, {
      key: 'toCompact',
      value: function toCompact(recovery, compressed) {
        recovery = typeof recovery === 'number' ? recovery : this.recovery;
        compressed = typeof compressed === 'boolean' ? compressed : this.compressed;

        if (!(recovery === 0 || recovery === 1 || recovery === 2 || recovery === 3)) {
          throw new Error('recovery must be equal to 0, 1, 2, or 3');
        }

        var val = recovery + 27 + 4;
        if (compressed === false) {
          val = val - 4;
        }
        var b1 = new Buffer([val]);
        var b2 = this.r.toBuffer({ size: 32 });
        var b3 = this.s.toBuffer({ size: 32 });
        return Buffer.concat([b1, b2, b3]);
      }
    }, {
      key: 'toDer',
      value: function toDer() {
        var rnbuf = this.r.toBuffer();
        var snbuf = this.s.toBuffer();

        var rneg = rnbuf[0] & 0x80;
        var sneg = snbuf[0] & 0x80;

        var rbuf = rneg ? Buffer.concat([new Buffer([0x00]), rnbuf]) : rnbuf;
        var sbuf = sneg ? Buffer.concat([new Buffer([0x00]), snbuf]) : snbuf;

        var length = 2 + rbuf.length + 2 + sbuf.length;
        var rlength = rbuf.length;
        var slength = sbuf.length;
        var rheader = 0x02;
        var sheader = 0x02;
        var header = 0x30;

        var der = Buffer.concat([new Buffer([header, length, rheader, rlength]), rbuf, new Buffer([sheader, slength]), sbuf]);
        return der;
      }
    }, {
      key: 'toTxFormat',
      value: function toTxFormat() {
        var derbuf = this.toDer();
        var buf = new Buffer(1);
        buf.writeUInt8(this.nHashType, 0);
        return Buffer.concat([derbuf, buf]);
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this.toHex();
      }
    }], [{
      key: 'fromCompact',
      value: function fromCompact(buf) {
        return new this().fromCompact(buf);
      }
    }, {
      key: 'fromDer',
      value: function fromDer(buf, strict) {
        return new this().fromDer(buf, strict);
      }
    }, {
      key: 'fromTxFormat',
      value: function fromTxFormat(buf) {
        return new this().fromTxFormat(buf);
      }
    }, {
      key: 'parseDer',
      value: function parseDer(buf, strict) {
        if (strict === undefined) {
          strict = true;
        }

        if (!Buffer.isBuffer(buf)) {
          throw new Error('DER formatted signature should be a buffer');
        }

        var header = buf[0];

        if (header !== 0x30) {
          throw new Error('Header byte should be 0x30');
        }

        var length = buf[1];
        var buflength = buf.slice(2).length;
        if (strict && length !== buflength) {
          throw new Error('LEngth byte should length of what follows');
        } else {
          length = length < buflength ? length : buflength;
        }

        var rheader = buf[2 + 0];
        if (rheader !== 0x02) {
          throw new Error('Integer byte for r should be 0x02');
        }

        var rlength = buf[2 + 1];
        var rbuf = buf.slice(2 + 2, 2 + 2 + rlength);
        var r = new Bn().fromBuffer(rbuf);
        var rneg = buf[2 + 1 + 1] === 0x00;
        if (rlength !== rbuf.length) {
          throw new Error('LEngth of r incorrect');
        }

        var sheader = buf[2 + 2 + rlength + 0];
        if (sheader !== 0x02) {
          throw new Error('Integer byte for s should be 0x02');
        }

        var slength = buf[2 + 2 + rlength + 1];
        var sbuf = buf.slice(2 + 2 + rlength + 2, 2 + 2 + rlength + 2 + slength);
        var s = new Bn().fromBuffer(sbuf);
        var sneg = buf[2 + 2 + rlength + 2 + 2] === 0x00;
        if (slength !== sbuf.length) {
          throw new Error('LEngth of s incorrect');
        }

        var sumlength = 2 + 2 + rlength + 2 + slength;
        if (length !== sumlength - 2) {
          throw new Error('LEngth of signature incorrect');
        }

        var obj = {
          header: header,
          length: length,
          rheader: rheader,
          rlength: rlength,
          rneg: rneg,
          rbuf: rbuf,
          r: r,
          sheader: sheader,
          slength: slength,
          sneg: sneg,
          sbuf: sbuf,
          s: s
        };

        return obj;
      }

      /**
       * This function is translated from bitcoind's IsDERSignature and is used in
       * the script interpreter.  This "DER" format actually includes an extra byte,
       * the nHashType, at the end. It is really the tx format, not DER format.
       *
       * A canonical signature exists of: [30] [total len] [02] [len R] [R] [02] [len S] [S] [hashtype]
       * Where R and S are not negative (their first byte has its highest bit not set), and not
       * excessively padded (do not start with a 0 byte, unless an otherwise negative number follows,
       * in which case a single 0 byte is necessary and even required).
       *
       * See https://bitcointalk.org/index.php?topic=8392.msg127623#msg127623
       */

    }, {
      key: 'IsTxDer',
      value: function IsTxDer(buf) {
        if (buf.length < 9) {
          //  Non-canonical signature: too short
          return false;
        }
        if (buf.length > 73) {
          // Non-canonical signature: too long
          return false;
        }
        if (buf[0] !== 0x30) {
          //  Non-canonical signature: wrong type
          return false;
        }
        if (buf[1] !== buf.length - 3) {
          //  Non-canonical signature: wrong length marker
          return false;
        }
        var nLEnR = buf[3];
        if (5 + nLEnR >= buf.length) {
          //  Non-canonical signature: S length misplaced
          return false;
        }
        var nLEnS = buf[5 + nLEnR];
        if (nLEnR + nLEnS + 7 !== buf.length) {
          //  Non-canonical signature: R+S length mismatch
          return false;
        }

        var R = buf.slice(4);
        if (buf[4 - 2] !== 0x02) {
          //  Non-canonical signature: R value type mismatch
          return false;
        }
        if (nLEnR === 0) {
          //  Non-canonical signature: R length is zero
          return false;
        }
        if (R[0] & 0x80) {
          //  Non-canonical signature: R value negative
          return false;
        }
        if (nLEnR > 1 && R[0] === 0x00 && !(R[1] & 0x80)) {
          //  Non-canonical signature: R value excessively padded
          return false;
        }

        var S = buf.slice(6 + nLEnR);
        if (buf[6 + nLEnR - 2] !== 0x02) {
          //  Non-canonical signature: S value type mismatch
          return false;
        }
        if (nLEnS === 0) {
          //  Non-canonical signature: S length is zero
          return false;
        }
        if (S[0] & 0x80) {
          //  Non-canonical signature: S value negative
          return false;
        }
        if (nLEnS > 1 && S[0] === 0x00 && !(S[1] & 0x80)) {
          //  Non-canonical signature: S value excessively padded
          return false;
        }
        return true;
      }
    }]);

    return Sig;
  }(Struct);

  Sig.SIGHASH_ALL = 0x00000001;
  Sig.SIGHASH_NONE = 0x00000002;
  Sig.SIGHASH_SINGLE = 0x00000003;
  Sig.SIGHASH_ANYONECANPAY = 0x00000080;

  return Sig;
};

inject = require('injecter')(inject, dependencies);
var Sig = inject();
module.exports = Sig;

}).call(this,require("buffer").Buffer)

},{"./bn":327,"./struct":342,"buffer":23,"injecter":381}],342:[function(require,module,exports){
(function (Buffer){
/**
 * Structure
 * =========
 *
 * A convenient structure to extend objects from that comes with very common
 * boiler plate instance methods:
 * - fromObject
 * - fromBr
 * - toBw
 * - fromBuffer
 * - fromFastBuffer
 * - toBuffer
 * - toFastBuffer
 * - fromHex
 * - toHex
 * - fromString
 * - toString
 * - fromJSON
 * - toJSON
 * - cloneByBuffer
 * - cloneByFastBuffer
 * - cloneByHex
 * - cloneByString
 * - cloneByJSON
 *
 * As well as static methods for:
 * - fromObject
 * - fromBr
 * - fromBuffer
 * - fromFastBuffer
 * - fromHex
 * - fromString
 * - fromJSON
 *
 * The "expect" method also facilitates deserializing a sequence of buffers
 * into an object.
 */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dependencies = {
  Br: require('./br'),
  Bw: require('./bw')
};

var inject = function inject(deps) {
  var Br = deps.Br;
  var Bw = deps.Bw;

  var Struct = function () {
    function Struct(obj) {
      _classCallCheck(this, Struct);

      this.fromObject(obj);
    }

    _createClass(Struct, [{
      key: 'fromObject',
      value: function fromObject(obj) {
        if (!obj) {
          return this;
        }
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (obj[key] !== undefined) {
              this[key] = obj[key];
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return this;
      }
    }, {
      key: 'fromBr',
      value: function fromBr(br) {
        if (!(br instanceof Br)) {
          throw new Error('br must be a buffer reader');
        }
        throw new Error('not implemented');
      }
    }, {
      key: 'asyncFromBr',
      value: function asyncFromBr(br) {
        if (!(br instanceof Br)) {
          throw new Error('br must be a buffer reader');
        }
        throw new Error('not implemented');
      }
    }, {
      key: 'toBw',
      value: function toBw(bw) {
        throw new Error('not implemented');
      }
    }, {
      key: 'asyncToBw',
      value: function asyncToBw(bw) {
        throw new Error('not implemented');
      }

      /**
       * It is very often the case that you want to create a bitcoin object from a
       * stream of small buffers rather than from a buffer of the correct length.
       * For instance, if streaming from the network or disk. The genFromBuffers
       * method is a generator which produces an iterator. Use .next(buf) to pass
       * in a small buffer. The iterator will end when it has received enough data
       * to produce the object. In some cases it is able to yield the number of
       * bytes it is expecting, but that is not always known.
       */

    }, {
      key: 'genFromBuffers',
      value: regeneratorRuntime.mark(function genFromBuffers() {
        return regeneratorRuntime.wrap(function genFromBuffers$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('not implemented');

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, genFromBuffers, this);
      })

      /**
       * A convenience method used by from the genFromBuffers* generators.
       * Basically lets you expect a certain number of bytes (len) and keeps
       * yielding until you give it enough. It yields the expected amount
       * remainIng, and returns an object containIng a buffer of the expected
       * length, and, if any, the remainder buffer.
       */

    }, {
      key: 'expect',
      value: regeneratorRuntime.mark(function expect(len, startbuf) {
        var buf, bw, gotlen, remainderbuf, remainderlen, overlen;
        return regeneratorRuntime.wrap(function expect$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                buf = startbuf;
                bw = new Bw();
                gotlen = 0;

                if (startbuf) {
                  bw.write(startbuf);
                  gotlen += startbuf.length;
                }
                remainderbuf = void 0;

              case 5:
                if (!(gotlen < len)) {
                  _context2.next = 16;
                  break;
                }

                remainderlen = len - gotlen;
                _context2.next = 9;
                return remainderlen;

              case 9:
                buf = _context2.sent;

                if (buf) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('continue', 5);

              case 12:
                bw.write(buf);
                gotlen += buf.length;
                _context2.next = 5;
                break;

              case 16:
                buf = bw.toBuffer();
                overlen = gotlen - len;

                remainderbuf = buf.slice(buf.length - overlen, buf.length);
                buf = buf.slice(0, buf.length - overlen);
                return _context2.abrupt('return', {
                  buf: buf,
                  remainderbuf: remainderbuf
                });

              case 21:
              case 'end':
                return _context2.stop();
            }
          }
        }, expect, this);
      })

      /**
       * Convert a buffer into an object, i.e. deserialize the object.
       */

    }, {
      key: 'fromBuffer',
      value: function fromBuffer(buf) {
        if (!Buffer.isBuffer(buf)) {
          throw new Error('buf must be a buffer');
        }
        var br = new Br(buf);

        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }

        return this.fromBr.apply(this, [br].concat(rest));
      }
    }, {
      key: 'asyncFromBuffer',
      value: function asyncFromBuffer(buf) {
        if (!Buffer.isBuffer(buf)) {
          throw new Error('buf must be a buffer');
        }
        var br = new Br(buf);

        for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          rest[_key2 - 1] = arguments[_key2];
        }

        return this.asyncFromBr.apply(this, [br].concat(rest));
      }
    }, {
      key: 'fromFastBuffer',


      /**
       * The complement of toFastBuffer - see description for toFastBuffer
       */
      value: function fromFastBuffer(buf) {
        if (buf.length === 0) {
          return this;
        } else {
          for (var _len3 = arguments.length, rest = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            rest[_key3 - 1] = arguments[_key3];
          }

          return this.fromBuffer.apply(this, [buf].concat(rest));
        }
      }
    }, {
      key: 'toBuffer',


      /**
       * Convert the object into a buffer, i.e. serialize the object. This method
       * may block the main thread.
       */
      value: function toBuffer() {
        return this.toBw.apply(this, arguments).toBuffer();
      }
    }, {
      key: 'asyncToBuffer',
      value: function asyncToBuffer() {
        return this.asyncToBw.apply(this, arguments).then(function (bw) {
          return bw.toBuffer();
        });
      }

      /**
       * Sometimes the toBuffer method has cryptography and blocks the main thread,
       * and we need a non-blocking way to serialize an object. That is what
       * toFastBuffer is. Of course it defaults to just using toBuffer if an object
       * hasn't implemented it. If your regular toBuffer method blocks, like with
       * Bip32, then you should implement this method to be non-blocking. This
       * method is used to send objects to the workers. i.e., for converting a
       * Bip32 object to a string, we need to encode it as a buffer in a
       * non-blocking manner with toFastBuffer, send it to a worker, then the
       * worker converts it to a string, which is a blocking operation.
       *
       * It is very common to want to convert a blank object to a zero length
       * buffer, so we can transport a blank object to a worker. So that behavior
       * is included by default.
       */

    }, {
      key: 'toFastBuffer',
      value: function toFastBuffer() {
        if (Object.keys(this).length === 0) {
          return new Buffer(0);
        } else {
          return this.toBuffer.apply(this, arguments);
        }
      }
    }, {
      key: 'fromHex',
      value: function fromHex(hex) {
        var buf = void 0;
        try {
          buf = new Buffer(hex, 'hex');
        } catch (e) {
          throw new Error('invalid hex string');
        }

        for (var _len4 = arguments.length, rest = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          rest[_key4 - 1] = arguments[_key4];
        }

        return this.fromBuffer.apply(this, [buf].concat(rest));
      }
    }, {
      key: 'asyncFromHex',
      value: function asyncFromHex(hex) {
        var buf = void 0;
        try {
          buf = new Buffer(hex, 'hex');
        } catch (e) {
          throw new Error('invalid hex string');
        }

        for (var _len5 = arguments.length, rest = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          rest[_key5 - 1] = arguments[_key5];
        }

        return this.asyncFromBuffer.apply(this, [buf].concat(rest));
      }
    }, {
      key: 'fromFastHex',
      value: function fromFastHex(hex) {
        var buf = void 0;
        try {
          buf = new Buffer(hex, 'hex');
        } catch (e) {
          throw new Error('invalid hex string');
        }

        for (var _len6 = arguments.length, rest = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          rest[_key6 - 1] = arguments[_key6];
        }

        return this.fromFastBuffer.apply(this, [buf].concat(rest));
      }
    }, {
      key: 'toHex',
      value: function toHex() {
        return this.toBuffer.apply(this, arguments).toString('hex');
      }
    }, {
      key: 'asyncToHex',
      value: function asyncToHex() {
        return this.asyncToBuffer.apply(this, arguments).then(function (buf) {
          return buf.toString('hex');
        });
      }
    }, {
      key: 'toFastHex',
      value: function toFastHex() {
        return this.toFastBuffer.apply(this, arguments).toString('hex');
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        if (typeof str !== 'string') {
          throw new Error('str must be a string');
        }

        for (var _len7 = arguments.length, rest = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          rest[_key7 - 1] = arguments[_key7];
        }

        return this.fromHex.apply(this, [str].concat(rest));
      }
    }, {
      key: 'asyncFromString',
      value: function asyncFromString(str) {
        if (typeof str !== 'string') {
          throw new Error('str must be a string');
        }

        for (var _len8 = arguments.length, rest = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
          rest[_key8 - 1] = arguments[_key8];
        }

        return this.asyncFromHex.apply(this, [str].concat(rest));
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this.toHex.apply(this, arguments);
      }
    }, {
      key: 'asyncToString',
      value: function asyncToString() {
        return this.asyncToHex.apply(this, arguments);
      }
    }, {
      key: 'fromJSON',
      value: function fromJSON(json) {
        throw new Error('not implemented');
      }
    }, {
      key: 'asyncFromJSON',
      value: function asyncFromJSON(json) {
        throw new Error('not implemented');
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        var json = {};
        for (var val in this) {
          // arrays
          if (this[val] instanceof Array) {
            var arr = [];
            for (var i in this[val]) {
              if (typeof this[val][i].toJSON === 'function') {
                arr.push(this[val][i].toJSON());
              } else {
                arr.push(JSON.stringify(this[val][i]));
              }
            }
            json[val] = arr;
            // objects
          } else if (_typeof(this[val]) === 'object' && typeof this[val].toJSON === 'function') {
            json[val] = this[val].toJSON();
            // booleans, numbers, and strings
          } else if (typeof this[val] === 'boolean' || typeof this[val] === 'number' || typeof this[val] === 'string') {
            json[val] = this[val];
            // throw an error for objects that do not implement toJSON
          } else if (_typeof(this[val]) === 'object') {
            throw new Error('not implemented');
          }
        }
        return json;
        // throw new Error('not implemented')
      }
    }, {
      key: 'asyncToJSON',
      value: function asyncToJSON() {
        throw new Error('not implemented');
      }
    }, {
      key: 'clone',
      value: function clone() {
        // TODO: Should this be more intelligent about picking which clone method
        // to default to?
        return this.cloneByJSON();
      }
    }, {
      key: 'cloneByBuffer',
      value: function cloneByBuffer() {
        return new this.constructor().fromBuffer(this.toBuffer());
      }
    }, {
      key: 'cloneByFastBuffer',
      value: function cloneByFastBuffer() {
        return new this.constructor().fromFastBuffer(this.toFastBuffer());
      }
    }, {
      key: 'cloneByHex',
      value: function cloneByHex() {
        return new this.constructor().fromHex(this.toHex());
      }
    }, {
      key: 'cloneByString',
      value: function cloneByString() {
        return new this.constructor().fromString(this.toString());
      }
    }, {
      key: 'cloneByJSON',
      value: function cloneByJSON() {
        return new this.constructor().fromJSON(this.toJSON());
      }
    }], [{
      key: 'fromObject',
      value: function fromObject(obj) {
        return new this().fromObject(obj);
      }
    }, {
      key: 'fromBr',
      value: function fromBr(br) {
        return new this().fromBr(br);
      }
    }, {
      key: 'asyncFromBr',
      value: function asyncFromBr(br) {
        return new this().asyncFromBr(br);
      }
    }, {
      key: 'fromBuffer',
      value: function fromBuffer() {
        var _ref;

        return (_ref = new this()).fromBuffer.apply(_ref, arguments);
      }
    }, {
      key: 'asyncFromBuffer',
      value: function asyncFromBuffer(buf) {
        var _ref2;

        for (var _len9 = arguments.length, rest = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
          rest[_key9 - 1] = arguments[_key9];
        }

        return (_ref2 = new this()).asyncFromBuffer.apply(_ref2, [buf].concat(rest));
      }
    }, {
      key: 'fromFastBuffer',
      value: function fromFastBuffer() {
        var _ref3;

        return (_ref3 = new this()).fromFastBuffer.apply(_ref3, arguments);
      }
    }, {
      key: 'fromHex',
      value: function fromHex(hex) {
        var _ref4;

        for (var _len10 = arguments.length, rest = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
          rest[_key10 - 1] = arguments[_key10];
        }

        return (_ref4 = new this()).fromHex.apply(_ref4, [hex].concat(rest));
      }
    }, {
      key: 'asyncFromHex',
      value: function asyncFromHex(hex) {
        var _ref5;

        for (var _len11 = arguments.length, rest = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
          rest[_key11 - 1] = arguments[_key11];
        }

        return (_ref5 = new this()).asyncFromHex.apply(_ref5, [hex].concat(rest));
      }
    }, {
      key: 'fromFastHex',
      value: function fromFastHex(hex) {
        var _ref6;

        for (var _len12 = arguments.length, rest = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
          rest[_key12 - 1] = arguments[_key12];
        }

        return (_ref6 = new this()).fromFastHex.apply(_ref6, [hex].concat(rest));
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        var _ref7;

        for (var _len13 = arguments.length, rest = Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
          rest[_key13 - 1] = arguments[_key13];
        }

        return (_ref7 = new this()).fromString.apply(_ref7, [str].concat(rest));
      }
    }, {
      key: 'asyncFromString',
      value: function asyncFromString(str) {
        var _ref8;

        for (var _len14 = arguments.length, rest = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
          rest[_key14 - 1] = arguments[_key14];
        }

        return (_ref8 = new this()).asyncFromString.apply(_ref8, [str].concat(rest));
      }
    }, {
      key: 'fromJSON',
      value: function fromJSON(json) {
        var _ref9;

        for (var _len15 = arguments.length, rest = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
          rest[_key15 - 1] = arguments[_key15];
        }

        return (_ref9 = new this()).fromJSON.apply(_ref9, [json].concat(rest));
      }
    }, {
      key: 'asyncFromJSON',
      value: function asyncFromJSON(json) {
        var _ref10;

        for (var _len16 = arguments.length, rest = Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
          rest[_key16 - 1] = arguments[_key16];
        }

        return (_ref10 = new this()).asyncFromJSON.apply(_ref10, [json].concat(rest));
      }
    }]);

    return Struct;
  }();

  return Struct;
};

inject = require('injecter')(inject, dependencies);
var Struct = inject();
module.exports = Struct;

}).call(this,require("buffer").Buffer)

},{"./br":328,"./bw":329,"buffer":23,"injecter":381}],343:[function(require,module,exports){
(function (Buffer){
/**
 * Transaction Builder (experimental)
 * ==================================
 *
 * Transaction Builder. This is a, yet unfinished, convenience class for
 * building pubKeyHash and p2sh transactions, and also for verifying arbitrary
 * transactions (and their inputs). You can (or will be able to) pay to
 * pubKeyHash to p2sh and can spend pubKeyHash or p2sh-pubKeyHash or
 * p2sh-multisig.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Address: require('./address'),
  Constants: require('./constants').Default.TxBuilder,
  Bn: require('./bn'),
  PubKey: require('./pub-key'),
  Script: require('./script'),
  Sig: require('./sig'),
  Struct: require('./struct'),
  Tx: require('./tx'),
  TxIn: require('./tx-in'),
  TxOut: require('./tx-out'),
  TxOutMap: require('./tx-out-map'),
  VarInt: require('./var-int'),
  asink: require('asink')
};

var inject = function inject(deps) {
  var Address = deps.Address;
  var Constants = deps.Constants;
  var Bn = deps.Bn;
  var PubKey = deps.PubKey;
  var Script = deps.Script;
  var Sig = deps.Sig;
  var Struct = deps.Struct;
  var Tx = deps.Tx;
  var TxIn = deps.TxIn;
  var TxOut = deps.TxOut;
  var TxOutMap = deps.TxOutMap;
  var VarInt = deps.VarInt;
  var asink = deps.asink;

  var TxBuilder = function (_Struct) {
    _inherits(TxBuilder, _Struct);

    function TxBuilder() {
      var tx = arguments.length <= 0 || arguments[0] === undefined ? new Tx() : arguments[0];
      var txIns = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
      var txOuts = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
      var uTxOutMap = arguments.length <= 3 || arguments[3] === undefined ? new TxOutMap() : arguments[3];
      var changeScript = arguments[4];
      var feePerKbNum = arguments.length <= 5 || arguments[5] === undefined ? Constants.feePerKbNum : arguments[5];
      var nLockTime = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
      var versionBytesNum = arguments.length <= 7 || arguments[7] === undefined ? 1 : arguments[7];

      _classCallCheck(this, TxBuilder);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(TxBuilder).call(this, { tx: tx, txIns: txIns, txOuts: txOuts, uTxOutMap: uTxOutMap, changeScript: changeScript, feePerKbNum: feePerKbNum, nLockTime: nLockTime, versionBytesNum: versionBytesNum }));
    }

    _createClass(TxBuilder, [{
      key: 'toJSON',
      value: function toJSON() {
        var json = {};
        json.tx = this.tx.toHex();
        json.txIns = this.txIns.map(function (txIn) {
          return txIn.toHex();
        });
        json.txOuts = this.txOuts.map(function (txOut) {
          return txOut.toHex();
        });
        json.uTxOutMap = this.uTxOutMap.toJSON();
        if (this.changeScript) {
          json.changeScript = this.changeScript.toHex();
        }
        json.feePerKbNum = this.feePerKbNum;
        return json;
      }
    }, {
      key: 'fromJSON',
      value: function fromJSON(json) {
        this.tx = new Tx().fromHex(json.tx);
        this.txIns = json.txIns.map(function (txIn) {
          return TxIn.fromHex(txIn);
        });
        this.txOuts = json.txOuts.map(function (txOut) {
          return TxOut.fromHex(txOut);
        });
        this.uTxOutMap = new TxOutMap().fromJSON(json.uTxOutMap);
        if (json.changeScript) {
          this.changeScript = new Script().fromHex(json.changeScript);
        }
        this.feePerKbNum = json.feePerKbNum;
        return this;
      }
    }, {
      key: 'setFeePerKbNum',
      value: function setFeePerKbNum(feePerKbNum) {
        this.feePerKbNum = feePerKbNum;
        return this;
      }
    }, {
      key: 'setChangeAddress',
      value: function setChangeAddress(changeAddress) {
        this.changeScript = changeAddress.toScript();
        return this;
      }
    }, {
      key: 'setChangeScript',
      value: function setChangeScript(changeScript) {
        this.changeScript = changeScript;
        return this;
      }

      /**
       * nLockTime is an unsigned integer.
       */

    }, {
      key: 'setNLocktime',
      value: function setNLocktime(nLockTime) {
        this.nLockTime = nLockTime;
        return this;
      }
    }, {
      key: 'setVersion',
      value: function setVersion(versionBytesNum) {
        this.versionBytesNum = versionBytesNum;
        return this;
      }

      /**
       * Import a transaction partially signed by someone else. The only thing you
       * can do after this is sign one or more inputs. Usually used for multisig
       * transactions. uTxOutMap is optional. It is not necessary so long as you
       * pass in the txOut when you sign.
       */

    }, {
      key: 'importPartiallySignedTx',
      value: function importPartiallySignedTx(tx, uTxOutMap) {
        this.tx = tx;
        if (uTxOutMap) {
          this.uTxOutMap = uTxOutMap;
        }
        return this;
      }

      /**
       * Pay "from" a script - in other words, add an input to the transaction.
       */

    }, {
      key: 'inputFromScript',
      value: function inputFromScript(txHashBuf, txOutNum, txOut, script, nSequence) {
        if (!Buffer.isBuffer(txHashBuf) || !(typeof txOutNum === 'number') || !(txOut instanceof TxOut) || !(script instanceof Script)) {
          throw new Error('invalid one of: txHashBuf, txOutNum, txOut, script');
        }
        this.txIns.push(TxIn.fromProperties(txHashBuf, txOutNum, script, nSequence));
        this.uTxOutMap.add(txHashBuf, txOutNum, txOut);
        return this;
      }

      /**
       * Pay "from" a pubKeyHash output - in other words, add an input to the
       * transaction.
       */

    }, {
      key: 'inputFromPubKeyHash',
      value: function inputFromPubKeyHash(txHashBuf, txOutNum, txOut, pubKey, nSequence) {
        if (!Buffer.isBuffer(txHashBuf) || !(typeof txOutNum === 'number') || !(txOut instanceof TxOut) || !(pubKey instanceof PubKey)) {
          throw new Error('invalid one of: txHashBuf, txOutNum, txOut, pubKey');
        }
        this.txIns.push(new TxIn().fromObject({ nSequence: nSequence }).fromPubKeyHashTxOut(txHashBuf, txOutNum, txOut, pubKey));
        this.uTxOutMap.add(txHashBuf, txOutNum, txOut);
        return this;
      }

      /**
       * Pay "from" a scriptHash (p2sh) output - in other words, add an input to
       * the transaction.
       */

    }, {
      key: 'inputFromScriptHashMultiSig',
      value: function inputFromScriptHashMultiSig(txHashBuf, txOutNum, txOut, redeemScript, nSequence) {
        if (!Buffer.isBuffer(txHashBuf) || !(typeof txOutNum === 'number') || !(txOut instanceof TxOut) || !(redeemScript instanceof Script)) {
          throw new Error('invalid one of: txHashBuf, txOutNum, txOut, redeemScript');
        }
        this.txIns.push(new TxIn().fromObject({ nSequence: nSequence }).fromScriptHashMultiSigTxOut(txHashBuf, txOutNum, txOut, redeemScript));
        this.uTxOutMap.add(txHashBuf, txOutNum, txOut);
        return this;
      }

      /**
       * An address to send funds to, along with the amount. The amount should be
       * denominated in satoshis, not bitcoins.
       */

    }, {
      key: 'outputToAddress',
      value: function outputToAddress(valueBn, addr) {
        if (!(addr instanceof Address) || !(valueBn instanceof Bn)) {
          throw new Error('addr must be an Address, and valueBn must be a Bn');
        }
        var script = void 0;
        if (addr.type() === 'scriptHash') {
          script = new Script().fromScriptHash(addr.hashBuf);
        } else if (addr.type() === 'pubKeyHash') {
          script = new Script().fromPubKeyHash(addr.hashBuf);
        } else {
          throw new Error('invalid address type');
        }
        this.outputToScript(valueBn, script);
        return this;
      }

      /**
       * A script to send funds to, along with the amount. The amount should be
       * denominated in satoshis, not bitcoins.
       */

    }, {
      key: 'outputToScript',
      value: function outputToScript(valueBn, script) {
        if (!(script instanceof Script) || !(valueBn instanceof Bn)) {
          throw new Error('script must be a Script, and valueBn must be a Bn');
        }
        var txOut = TxOut.fromProperties(valueBn, script);
        this.txOuts.push(txOut);
        return this;
      }
    }, {
      key: 'buildOutputs',
      value: function buildOutputs() {
        var _this2 = this;

        var outamount = new Bn(0);
        this.txOuts.forEach(function (txOut) {
          outamount = outamount.add(txOut.valueBn);
          _this2.tx.addTxOut(txOut);
        });
        return outamount;
      }
    }, {
      key: 'buildInputs',
      value: function buildInputs(outamount) {
        var extraInputsNum = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        var inamount = new Bn(0);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.txIns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var txIn = _step.value;

            var txOut = this.uTxOutMap.get(txIn.txHashBuf, txIn.txOutNum);
            inamount = inamount.add(txOut.valueBn);
            this.tx.addTxIn(txIn);
            if (inamount.geq(outamount)) {
              if (extraInputsNum <= 0) {
                break;
              }
              extraInputsNum--;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (inamount.lt(outamount)) {
          throw new Error('not enough funds for output');
        }
        return inamount;
      }

      // For now this method only supports pubKeyHash inputs. It assumes we have
      // not yet added signatures to our inputs.
      // TODO: Support it when the signatures are already on the inputs.
      // TODO: Support p2sh inputs.

    }, {
      key: 'estimateSize',
      value: function estimateSize() {
        // largest possible sig size
        var sigsize = 1 + 1 + 1 + 1 + 32 + 1 + 1 + 32 + 1;
        var size = this.tx.toBuffer().length;
        size = size + sigsize * this.tx.txIns.length;
        size = size + 1; // assume txInsVi increases by 1 byte
        return size;
      }
    }, {
      key: 'estimateFee',
      value: function estimateFee() {
        // TODO: Support calculating fees from p2sh multisig.
        var fee = Math.ceil(this.estimateSize() / 1000) * this.feePerKbNum;
        return new Bn(fee);
      }

      /**
       * Builds the transaction and adds the appropriate fee by subtracting from
       * the change output. Note that by default the TxBuilder will use as many
       * inputs as necessary to pay the output amounts and the required fee. The
       * TxBuilder will not necessarily us all the inputs. To force the TxBuilder
       * to use all the inputs (such as if you wish to spend the entire balance
       * of a wallet), set the argument useAllInputs = true.
       */

    }, {
      key: 'build',
      value: function build() {
        var useAllInputs = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

        var changeAmount = void 0,
            shouldfeebn = void 0;
        for (var extraInputsNum = useAllInputs ? this.txIns.length - 1 : 0; extraInputsNum < this.txIns.length; extraInputsNum++) {
          this.tx = new Tx();
          var outamount = this.buildOutputs();
          var changeScript = this.changeScript;
          var changeTxOut = TxOut.fromProperties(new Bn(0), changeScript);
          this.tx.addTxOut(changeTxOut);

          var inamount = this.buildInputs(outamount, extraInputsNum);

          // TODO: What if change amount is less than dust?
          // Set change amount from inamount - outamount
          changeAmount = inamount.sub(outamount);
          this.tx.txOuts[this.tx.txOuts.length - 1].valueBn = changeAmount;

          shouldfeebn = this.estimateFee();
          if (changeAmount.geq(shouldfeebn) && changeAmount.sub(shouldfeebn).gt(Constants.dustNum)) {
            break;
          }
        }
        if (changeAmount.geq(shouldfeebn)) {
          // Subtract fee from change
          // TODO: What if change is less than dust? What if change is 0?
          changeAmount = changeAmount.sub(shouldfeebn);
          this.tx.txOuts[this.tx.txOuts.length - 1].valueBn = changeAmount;

          if (changeAmount.lt(Constants.dustNum)) {
            throw new Error('unable to create change amount greater than dust');
          }

          this.tx.nLockTime = this.nLockTime;
          this.tx.versionBytesNum = this.versionBytesNum;
          return this;
        } else {
          throw new Error('unable to gather enough inputs for outputs and fee');
        }
      }

      /**
       * Check if all signatures are present in a p2sh multisig input script.
       */

    }, {
      key: 'fillPubKeyHashSig',


      /**
       * Given the signature for a transaction, fill it in the appropriate place
       * for an input that spends a pubKeyHash output.
       */
      value: function fillPubKeyHashSig(i, keyPair, sig) {
        var txIn = this.tx.txIns[i];
        txIn.script.chunks[0] = new Script().writeBuffer(sig.toTxFormat()).chunks[0];
        txIn.scriptVi = VarInt.fromNumber(txIn.script.toBuffer().length);
        return this;
      }
    }, {
      key: 'fillScriptHashMultiSigSig',
      value: function fillScriptHashMultiSigSig(i, keyPair, sig, redeemScript) {
        var txIn = this.tx.txIns[i];
        var script = txIn.script;

        // three normal opCodes, and the rest are pubKeys
        var pubKeychunks = redeemScript.chunks.slice(1, redeemScript.chunks.length - 2);

        var pubKeybufs = pubKeychunks.map(function (chunk) {
          return chunk.buf;
        });
        var pubKeybuf = keyPair.pubKey.toBuffer();

        // find which pubKey in the redeemScript is the one we are trying to sign
        var thisPubKeyIndex = void 0;
        for (thisPubKeyIndex = 0; thisPubKeyIndex < pubKeybufs.length; thisPubKeyIndex++) {
          if (Buffer.compare(pubKeybuf, pubKeybufs[thisPubKeyIndex]) === 0) {
            break;
          }
          if (thisPubKeyIndex >= pubKeybufs.length - 1) {
            throw new Error('cannot sign; pubKey not found in input ' + i);
          }
        }

        script.chunks[thisPubKeyIndex + 1] = new Script().writeBuffer(sig.toTxFormat()).chunks[0];
        var m = redeemScript.chunks[0].opCodeNum - 0x50;
        if (TxBuilder.allSigsPresent(m, script)) {
          txIn.script = TxBuilder.removeBlankSigs(script);
        }
        txIn.scriptVi = VarInt.fromNumber(txIn.script.toBuffer().length);
        return this;
      }

      /**
       * Sign an input, but do not fill the signature into the transaction. Return
       * the signature.
       *
       * For a normal transaction, subScript is usually the scriptPubKey. For a
       * p2sh transaction, subScript is usually the redeemScript. If you're not
       * normal because you're using OP_CODESEPARATORs, you know what to do.
       */

    }, {
      key: 'getSig',
      value: function getSig(keyPair, nHashType, nIn, subScript) {
        nHashType = nHashType === undefined ? Sig.SIGHASH_ALL : nHashType;
        return this.tx.sign(keyPair, nHashType, nIn, subScript);
      }

      /**
       * Asynchronously sign an input in a worker, but do not fill the signature
       * into the transaction. Return the signature.
       */

    }, {
      key: 'asyncGetSig',
      value: function asyncGetSig(keyPair, nHashType, nIn, subScript) {
        nHashType = nHashType === undefined ? Sig.SIGHASH_ALL : nHashType;
        return this.tx.asyncSign(keyPair, nHashType, nIn, subScript);
      }

      /**
       * Sign ith input with keyPair and insert the signature into the transaction.
       * This method only works for some standard transaction types. For
       * non-standard transaction types, use getSig.
       */

    }, {
      key: 'sign',
      value: function sign(i, keyPair, txOut) {
        var txIn = this.tx.txIns[i];
        var script = txIn.script;
        if (script.isPubKeyHashIn()) {
          var txHashBuf = txIn.txHashBuf;
          var txOutNum = txIn.txOutNum;
          if (!txOut) {
            txOut = this.uTxOutMap.get(txHashBuf, txOutNum);
          }
          var outScript = txOut.script;
          var subScript = outScript; // true for standard script types
          var sig = this.getSig(keyPair, Sig.SIGHASH_ALL, i, subScript);
          this.fillPubKeyHashSig(i, keyPair, sig, subScript);
        } else if (script.isScriptHashIn()) {
          var redeemScript = new Script().fromBuffer(script.chunks[script.chunks.length - 1].buf);
          var _subScript = redeemScript;
          if (!redeemScript.isMultiSigOut()) {
            throw new Error('cannot sign non-multisig scriptHash script type for input ' + i);
          }
          var _sig = this.tx.sign(keyPair, Sig.SIGHASH_ALL, i, _subScript);
          this.fillScriptHashMultiSigSig(i, keyPair, _sig, redeemScript);
        } else {
          throw new Error('cannot sign unknown script type for input ' + i);
        }
        return this;
      }

      /**
       * Asynchronously sign ith input with keyPair in a worker and insert the
       * signature into the transaction.  This method only works for some standard
       * transaction types. For non-standard transaction types, use asyncGetSig.
       */

    }, {
      key: 'asyncSign',
      value: function asyncSign(i, keyPair, txOut) {
        return asink(regeneratorRuntime.mark(function _callee() {
          var txIn, script, txHashBuf, txOutNum, outScript, subScript, sig, redeemScript, _subScript2, _sig2;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  txIn = this.tx.txIns[i];
                  script = txIn.script;

                  if (!script.isPubKeyHashIn()) {
                    _context.next = 14;
                    break;
                  }

                  txHashBuf = txIn.txHashBuf;
                  txOutNum = txIn.txOutNum;

                  if (!txOut) {
                    txOut = this.uTxOutMap.get(txHashBuf, txOutNum);
                  }
                  outScript = txOut.script;
                  subScript = outScript; // true for standard script types

                  _context.next = 10;
                  return this.asyncGetSig(keyPair, Sig.SIGHASH_ALL, i, subScript);

                case 10:
                  sig = _context.sent;

                  this.fillPubKeyHashSig(i, keyPair, sig, subScript);
                  _context.next = 26;
                  break;

                case 14:
                  if (!script.isScriptHashIn()) {
                    _context.next = 25;
                    break;
                  }

                  redeemScript = new Script().fromBuffer(script.chunks[script.chunks.length - 1].buf);
                  _subScript2 = redeemScript;

                  if (redeemScript.isMultiSigOut()) {
                    _context.next = 19;
                    break;
                  }

                  throw new Error('cannot sign non-multisig scriptHash script type for input ' + i);

                case 19:
                  _context.next = 21;
                  return this.tx.asyncSign(keyPair, Sig.SIGHASH_ALL, i, _subScript2);

                case 21:
                  _sig2 = _context.sent;

                  this.fillScriptHashMultiSigSig(i, keyPair, _sig2, redeemScript);
                  _context.next = 26;
                  break;

                case 25:
                  throw new Error('cannot sign unknown script type for input ' + i);

                case 26:
                  return _context.abrupt('return', this);

                case 27:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }), this);
      }
    }], [{
      key: 'allSigsPresent',
      value: function allSigsPresent(m, script) {
        // The first element is a Famous MultiSig Bug OP_0, and last element is the
        // redeemScript. The rest are signatures.
        var present = 0;
        for (var i = 1; i < script.chunks.length - 1; i++) {
          if (script.chunks[i].buf) {
            present++;
          }
        }
        return present === m;
      }

      /**
       * Remove blank signatures in a p2sh multisig input script.
       */

    }, {
      key: 'removeBlankSigs',
      value: function removeBlankSigs(script) {
        // The first element is a Famous MultiSig Bug OP_0, and last element is the
        // redeemScript. The rest are signatures.
        script = new Script(script.chunks.slice()); // copy the script
        for (var i = 1; i < script.chunks.length - 1; i++) {
          if (!script.chunks[i].buf) {
            script.chunks.splice(i, 1); // remove ith element
          }
        }
        return script;
      }
    }]);

    return TxBuilder;
  }(Struct);

  return TxBuilder;
};

inject = require('injecter')(inject, dependencies);
var TxBuilder = inject();
module.exports = TxBuilder;

}).call(this,require("buffer").Buffer)

},{"./address":324,"./bn":327,"./constants":331,"./pub-key":338,"./script":340,"./sig":341,"./struct":342,"./tx":347,"./tx-in":344,"./tx-out":346,"./tx-out-map":345,"./var-int":348,"asink":352,"buffer":23,"injecter":381}],344:[function(require,module,exports){
(function (Buffer){
/*
 * Transaction Input
 * =================
 *
 * An input to a transaction. The way you probably want to use this is through
 * the convenient method of new TxIn(txHashBuf, txOutNum, script, nSequence) (i.e., you
 * can leave out the scriptVi, which is computed automatically if you leave it
 * out.)
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Bw: require('./bw'),
  VarInt: require('./var-int'),
  OpCode: require('./op-code'),
  Script: require('./script'),
  Struct: require('./struct')
};

var inject = function inject(deps) {
  var Bw = deps.Bw;
  var VarInt = deps.VarInt;
  var OpCode = deps.OpCode;
  var Script = deps.Script;
  var Struct = deps.Struct;

  var TxIn = function (_Struct) {
    _inherits(TxIn, _Struct);

    function TxIn(txHashBuf, txOutNum, scriptVi, script) {
      var nSequence = arguments.length <= 4 || arguments[4] === undefined ? 0xffffffff : arguments[4];

      _classCallCheck(this, TxIn);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(TxIn).call(this, { txHashBuf: txHashBuf, txOutNum: txOutNum, scriptVi: scriptVi, script: script, nSequence: nSequence }));
    }

    _createClass(TxIn, [{
      key: 'setScript',
      value: function setScript(script) {
        this.scriptVi = VarInt.fromNumber(script.toBuffer().length);
        this.script = script;
        return this;
      }
    }, {
      key: 'fromProperties',
      value: function fromProperties(txHashBuf, txOutNum, script, nSequence) {
        this.fromObject({ txHashBuf: txHashBuf, txOutNum: txOutNum, nSequence: nSequence });
        this.setScript(script);
        return this;
      }
    }, {
      key: 'fromJSON',
      value: function fromJSON(json) {
        this.fromObject({
          txHashBuf: new Buffer(json.txHashBuf, 'hex'),
          txOutNum: json.txOutNum,
          scriptVi: VarInt.fromJSON(json.scriptVi),
          script: Script.fromJSON(json.script),
          nSequence: json.nSequence
        });
        return this;
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return {
          txHashBuf: this.txHashBuf.toString('hex'),
          txOutNum: this.txOutNum,
          scriptVi: this.scriptVi.toJSON(),
          script: this.script.toJSON(),
          nSequence: this.nSequence
        };
      }
    }, {
      key: 'fromBr',
      value: function fromBr(br) {
        this.txHashBuf = br.read(32);
        this.txOutNum = br.readUInt32LE();
        this.scriptVi = VarInt.fromBuffer(br.readVarIntBuf());
        this.script = Script.fromBuffer(br.read(this.scriptVi.toNumber()));
        this.nSequence = br.readUInt32LE();
        return this;
      }
    }, {
      key: 'toBw',
      value: function toBw(bw) {
        if (!bw) {
          bw = new Bw();
        }
        bw.write(this.txHashBuf);
        bw.writeUInt32LE(this.txOutNum);
        bw.write(this.scriptVi.buf);
        bw.write(this.script.toBuffer());
        bw.writeUInt32LE(this.nSequence);
        return bw;
      }

      /**
       * Generate txIn with blank signatures from a txOut and its
       * txHashBuf+txOutNum. A "blank" signature is just an OP_0.
       */

    }, {
      key: 'fromPubKeyHashTxOut',
      value: function fromPubKeyHashTxOut(txHashBuf, txOutNum, txOut, pubKey) {
        var script = new Script();
        if (txOut.script.isPubKeyHashOut()) {
          script.writeOpCode(OpCode.OP_0); // blank signature
          script.writeBuffer(pubKey.toBuffer());
        } else {
          throw new Error('txOut must be of type pubKeyHash');
        }
        this.txHashBuf = txHashBuf;
        this.txOutNum = txOutNum;
        this.setScript(script);
        return this;
      }

      /**
       * Generate txIn with blank signatures from a txOut and its
       * txHashBuf+txOutNum. A "blank" signature is just an OP_0.
       *
       * TODO: Also support other types of p2sh outputs other than multisig.
       */

    }, {
      key: 'fromScriptHashMultiSigTxOut',
      value: function fromScriptHashMultiSigTxOut(txHashBuf, txOutNum, txOut, redeemScript) {
        var script = new Script();
        if (!txOut.script.isScriptHashOut()) {
          throw new Error('txOut must be of type scriptHash');
        }
        if (!redeemScript.isMultiSigOut()) {
          throw new Error('redeemScript must be multisig');
        }
        script.writeOpCode(OpCode.OP_0); // extra OP_0; famous multisig bug in bitcoin pops one too many items from the stack
        var numpubKeys = redeemScript.chunks.length - 3; // 3 normal opCodes, the rest pubKeys
        for (var i = 0; i < numpubKeys; i++) {
          script.writeOpCode(OpCode.OP_0); // one blank per pubKey (not per sig)
        }
        script.writeBuffer(redeemScript.toBuffer());
        this.fromProperties(txHashBuf, txOutNum, script);
        return this;
      }
    }, {
      key: 'hasNullInput',
      value: function hasNullInput() {
        var hex = this.txHashBuf.toString('hex');
        if (hex === '0000000000000000000000000000000000000000000000000000000000000000' && this.txOutNum === 0xffffffff) {
          return true;
        }
        return false;
      }

      /**
       * Analagous to bitcoind's SetNull in COutPoint
       */

    }, {
      key: 'setNullInput',
      value: function setNullInput() {
        this.txHashBuf = new Buffer(32);
        this.txHashBuf.fill(0);
        this.txOutNum = 0xffffffff; // -1 cast to unsigned int
      }
    }], [{
      key: 'fromProperties',
      value: function fromProperties(txHashBuf, txOutNum, script, nSequence) {
        return new this().fromProperties(txHashBuf, txOutNum, script, nSequence);
      }
    }, {
      key: 'fromScriptHashMultiSigTxOut',
      value: function fromScriptHashMultiSigTxOut(txHashBuf, txOutNum, txOut, redeemScript) {
        return new this().fromScriptHashMultiSigTxOut(txHashBuf, txOutNum, txOut, redeemScript);
      }
    }]);

    return TxIn;
  }(Struct);

  /* Interpret sequence numbers as relative lock-time constraints. */


  TxIn.LOCKTIME_VERIFY_SEQUENCE = 1 << 0;

  /* Setting nSequence to this value for every input in a transaction disables
   * nLockTime. */
  TxIn.SEQUENCE_FINAL = 0xffffffff;

  /* Below flags apply in the context of Bip 68*/
  /* If this flag set, txIn.nSequence is NOT interpreted as a relative lock-time.
   * */
  TxIn.SEQUENCE_LOCKTIME_DISABLE_FLAG = 1 << 31;

  /* If txIn.nSequence encodes a relative lock-time and this flag is set, the
   * relative lock-time has units of 512 seconds, otherwise it specifies blocks
   * with a granularity of 1. */
  TxIn.SEQUENCE_LOCKTIME_TYPE_FLAG = 1 << 22;

  /* If txIn.nSequence encodes a relative lock-time, this mask is applied to
   * extract that lock-time from the sequence field. */
  TxIn.SEQUENCE_LOCKTIME_MASK = 0x0000ffff;

  /* In order to use the same number of bits to encode roughly the same
   * wall-clock duration, and because blocks are naturally limited to occur
   * every 600s on average, the minimum granularity for time-based relative
   * lock-time is fixed at 512 seconds.  Converting from CTxIn::nSequence to
   * seconds is performed by multiplying by 512 = 2^9, or equivalently
   * shifting up by 9 bits. */
  TxIn.SEQUENCE_LOCKTIME_GRANULARITY = 9;

  return TxIn;
};

inject = require('injecter')(inject, dependencies);
var TxIn = inject();
module.exports = TxIn;

}).call(this,require("buffer").Buffer)

},{"./bw":329,"./op-code":335,"./script":340,"./struct":342,"./var-int":348,"buffer":23,"injecter":381}],345:[function(require,module,exports){
/**
 * Transaction Output Map
 * ======================
 *
 * A map from a transaction hash and output number to that particular output.
 * Note that the map is from the transaction *hash*, which is the value that
 * occurs in the blockchain, not the id, which is the reverse of the hash.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Struct: require('./struct'),
  TxOut: require('./tx-out')
};

var inject = function inject(deps) {
  var Struct = deps.Struct;
  var TxOut = deps.TxOut;

  var TxOutMap = function (_Struct) {
    _inherits(TxOutMap, _Struct);

    function TxOutMap() {
      var map = arguments.length <= 0 || arguments[0] === undefined ? new Map() : arguments[0];

      _classCallCheck(this, TxOutMap);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(TxOutMap).call(this, { map: map }));
    }

    _createClass(TxOutMap, [{
      key: 'toJSON',
      value: function toJSON() {
        var json = {};
        this.map.forEach(function (txOut, label) {
          json[label] = txOut.toHex();
        });
        return json;
      }
    }, {
      key: 'fromJSON',
      value: function fromJSON(json) {
        var _this2 = this;

        Object.keys(json).forEach(function (label) {
          _this2.map.set(label, TxOut.fromHex(json[label]));
        });
        return this;
      }
    }, {
      key: 'add',
      value: function add(txHashBuf, txOutNum, txOut) {
        var label = txHashBuf.toString('hex') + ':' + txOutNum;
        this.map.set(label, txOut);
        return this;
      }
    }, {
      key: 'get',
      value: function get(txHashBuf, txOutNum) {
        var label = txHashBuf.toString('hex') + ':' + txOutNum;
        return this.map.get(label);
      }
    }, {
      key: 'addTx',
      value: function addTx(tx) {
        var _this3 = this;

        var txhashhex = tx.hash().toString('hex');
        tx.txOuts.forEach(function (txOut, index) {
          var label = txhashhex + ':' + index;
          _this3.map.set(label, txOut);
        });
        return this;
      }
    }]);

    return TxOutMap;
  }(Struct);

  return TxOutMap;
};

inject = require('injecter')(inject, dependencies);
var TxOutMap = inject();
module.exports = TxOutMap;

},{"./struct":342,"./tx-out":346,"injecter":381}],346:[function(require,module,exports){
/**
 * Transaction Output
 * ==================
 *
 * An output to a transaction. The way you normally want to make one is with
 * new TxOut(valueBn, script) (i.e., just as with TxIn, you can leave out the
 * scriptVi, since it can be computed automatically.
*/
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Bn: require('./bn'),
  Bw: require('./bw'),
  Script: require('./script'),
  Struct: require('./struct'),
  VarInt: require('./var-int')
};

var inject = function inject(deps) {
  var Bn = deps.Bn;
  var Bw = deps.Bw;
  var Script = deps.Script;
  var Struct = deps.Struct;
  var VarInt = deps.VarInt;

  var TxOut = function (_Struct) {
    _inherits(TxOut, _Struct);

    function TxOut(valueBn, scriptVi, script) {
      _classCallCheck(this, TxOut);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(TxOut).call(this, { valueBn: valueBn, scriptVi: scriptVi, script: script }));
    }

    _createClass(TxOut, [{
      key: 'setScript',
      value: function setScript(script) {
        this.scriptVi = VarInt.fromNumber(script.toBuffer().length);
        this.script = script;
        return this;
      }
    }, {
      key: 'fromProperties',
      value: function fromProperties(valueBn, script) {
        this.fromObject({ valueBn: valueBn });
        this.setScript(script);
        return this;
      }
    }, {
      key: 'fromJSON',
      value: function fromJSON(json) {
        this.fromObject({
          valueBn: new Bn().fromJSON(json.valueBn),
          scriptVi: new VarInt().fromJSON(json.scriptVi),
          script: new Script().fromJSON(json.script)
        });
        return this;
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return {
          valueBn: this.valueBn.toJSON(),
          scriptVi: this.scriptVi.toJSON(),
          script: this.script.toJSON()
        };
      }
    }, {
      key: 'fromBr',
      value: function fromBr(br) {
        this.valueBn = br.readUInt64LEBn();
        this.scriptVi = VarInt.fromNumber(br.readVarIntNum());
        this.script = new Script().fromBuffer(br.read(this.scriptVi.toNumber()));
        return this;
      }
    }, {
      key: 'toBw',
      value: function toBw(bw) {
        if (!bw) {
          bw = new Bw();
        }
        bw.writeUInt64LEBn(this.valueBn);
        bw.write(this.scriptVi.buf);
        bw.write(this.script.toBuffer());
        return bw;
      }
    }], [{
      key: 'fromProperties',
      value: function fromProperties(valueBn, script) {
        return new this().fromProperties(valueBn, script);
      }
    }]);

    return TxOut;
  }(Struct);

  return TxOut;
};

inject = require('injecter')(inject, dependencies);
var TxOut = inject();
module.exports = TxOut;

},{"./bn":327,"./bw":329,"./script":340,"./struct":342,"./var-int":348,"injecter":381}],347:[function(require,module,exports){
(function (Buffer){
/**
 * Transaction
 * ===========
 *
 * A bitcoin transaction.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Bn: require('./bn'),
  Br: require('./br'),
  Bw: require('./bw'),
  Ecdsa: require('./ecdsa'),
  Hash: require('./hash'),
  Script: require('./script'),
  Sig: require('./sig'),
  Struct: require('./struct'),
  TxIn: require('./tx-in'),
  TxOut: require('./tx-out'),
  VarInt: require('./var-int'),
  Workers: require('./workers'),
  asink: require('asink')
};

var inject = function inject(deps) {
  var Bn = deps.Bn;
  var Br = deps.Br;
  var Bw = deps.Bw;
  var Ecdsa = deps.Ecdsa;
  var Hash = deps.Hash;
  var Script = deps.Script;
  var Sig = deps.Sig;
  var Struct = deps.Struct;
  var TxIn = deps.TxIn;
  var TxOut = deps.TxOut;
  var VarInt = deps.VarInt;
  var Workers = deps.Workers;
  var asink = deps.asink;

  var Tx = function (_Struct) {
    _inherits(Tx, _Struct);

    function Tx() {
      var versionBytesNum = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      var txInsVi = arguments.length <= 1 || arguments[1] === undefined ? VarInt.fromNumber(0) : arguments[1];
      var txIns = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
      var txOutsVi = arguments.length <= 3 || arguments[3] === undefined ? VarInt.fromNumber(0) : arguments[3];
      var txOuts = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
      var nLockTime = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];

      _classCallCheck(this, Tx);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Tx).call(this, { versionBytesNum: versionBytesNum, txInsVi: txInsVi, txIns: txIns, txOutsVi: txOutsVi, txOuts: txOuts, nLockTime: nLockTime }));
    }

    _createClass(Tx, [{
      key: 'fromJSON',
      value: function fromJSON(json) {
        var txIns = [];
        json.txIns.forEach(function (txIn) {
          txIns.push(new TxIn().fromJSON(txIn));
        });
        var txOuts = [];
        json.txOuts.forEach(function (txOut) {
          txOuts.push(new TxOut().fromJSON(txOut));
        });
        this.fromObject({
          versionBytesNum: json.versionBytesNum,
          txInsVi: new VarInt().fromJSON(json.txInsVi),
          txIns: txIns,
          txOutsVi: new VarInt().fromJSON(json.txOutsVi),
          txOuts: txOuts,
          nLockTime: json.nLockTime
        });
        return this;
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        var txIns = [];
        this.txIns.forEach(function (txIn) {
          txIns.push(txIn.toJSON());
        });
        var txOuts = [];
        this.txOuts.forEach(function (txOut) {
          txOuts.push(txOut.toJSON());
        });
        return {
          versionBytesNum: this.versionBytesNum,
          txInsVi: this.txInsVi.toJSON(),
          txIns: txIns,
          txOutsVi: this.txOutsVi.toJSON(),
          txOuts: txOuts,
          nLockTime: this.nLockTime
        };
      }
    }, {
      key: 'fromBr',
      value: function fromBr(br) {
        this.versionBytesNum = br.readUInt32LE();
        this.txInsVi = new VarInt(br.readVarIntBuf());
        var txInsNum = this.txInsVi.toNumber();
        this.txIns = [];
        for (var i = 0; i < txInsNum; i++) {
          this.txIns.push(new TxIn().fromBr(br));
        }
        this.txOutsVi = new VarInt(br.readVarIntBuf());
        var txOutsNum = this.txOutsVi.toNumber();
        this.txOuts = [];
        for (var _i = 0; _i < txOutsNum; _i++) {
          this.txOuts.push(new TxOut().fromBr(br));
        }
        this.nLockTime = br.readUInt32LE();
        return this;
      }
    }, {
      key: 'toBw',
      value: function toBw(bw) {
        if (!bw) {
          bw = new Bw();
        }
        bw.writeUInt32LE(this.versionBytesNum);
        bw.write(this.txInsVi.buf);
        for (var i = 0; i < this.txIns.length; i++) {
          this.txIns[i].toBw(bw);
        }
        bw.write(this.txOutsVi.buf);
        for (var _i2 = 0; _i2 < this.txOuts.length; _i2++) {
          this.txOuts[_i2].toBw(bw);
        }
        bw.writeUInt32LE(this.nLockTime);
        return bw;
      }

      /**
       * For a normal transaction, subScript is usually the scriptPubKey. For a
       * p2sh transaction, subScript is usually the redeemScript. If you're not
       * normal because you're using OP_CODESEPARATORs, you know what to do.
       */

    }, {
      key: 'sighash',
      value: function sighash(nHashType, nIn, subScript) {
        var txcopy = this.cloneByBuffer();

        subScript = new Script().fromBuffer(subScript.toBuffer());
        subScript.removeCodeseparators();

        for (var i = 0; i < txcopy.txIns.length; i++) {
          txcopy.txIns[i] = TxIn.fromBuffer(txcopy.txIns[i].toBuffer()).setScript(new Script());
        }

        txcopy.txIns[nIn] = TxIn.fromBuffer(txcopy.txIns[nIn].toBuffer()).setScript(subScript);

        if ((nHashType & 31) === Sig.SIGHASH_NONE) {
          txcopy.txOuts.length = 0;
          txcopy.txOutsVi = VarInt.fromNumber(0);

          for (var _i3 = 0; _i3 < txcopy.txIns.length; _i3++) {
            if (_i3 !== nIn) {
              txcopy.txIns[_i3].nSequence = 0;
            }
          }
        } else if ((nHashType & 31) === Sig.SIGHASH_SINGLE) {
          // The SIGHASH_SINGLE bug.
          // https://bitcointalk.org/index.php?topic=260595.0
          if (nIn > txcopy.txOuts.length - 1) {
            return new Buffer('0000000000000000000000000000000000000000000000000000000000000001', 'hex');
          }

          txcopy.txOuts.length = nIn + 1;
          txcopy.txOutsVi = VarInt.fromNumber(nIn + 1);

          for (var _i4 = 0; _i4 < txcopy.txOuts.length; _i4++) {
            if (_i4 < nIn) {
              txcopy.txOuts[_i4] = TxOut.fromProperties(new Bn().fromBuffer(new Buffer('ffffffffffffffff', 'hex')), new Script());
            }
          }

          for (var _i5 = 0; _i5 < txcopy.txIns.length; _i5++) {
            if (_i5 !== nIn) {
              txcopy.txIns[_i5].nSequence = 0;
            }
          }
        }
        // else, SIGHASH_ALL

        if (nHashType & Sig.SIGHASH_ANYONECANPAY) {
          txcopy.txIns[0] = txcopy.txIns[nIn];
          txcopy.txIns.length = 1;
          txcopy.txInsVi = VarInt.fromNumber(1);
        }

        var buf = new Bw().write(txcopy.toBuffer()).writeInt32LE(nHashType).toBuffer();
        return new Br(Hash.sha256Sha256(buf)).readReverse();
      }
    }, {
      key: 'asyncSighash',
      value: function asyncSighash(nHashType, nIn, subScript) {
        return asink(regeneratorRuntime.mark(function _callee() {
          var workersResult;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return Workers.asyncObjectMethod(this, 'sighash', [nHashType, nIn, subScript]);

                case 2:
                  workersResult = _context.sent;
                  return _context.abrupt('return', workersResult.resbuf);

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }), this);
      }

      // This function returns a signature but does not update any inputs

    }, {
      key: 'sign',
      value: function sign(keyPair, nHashType, nIn, subScript) {
        var hashBuf = this.sighash(nHashType, nIn, subScript);
        var sig = Ecdsa.sign(hashBuf, keyPair, 'little').fromObject({ nHashType: nHashType });
        return sig;
      }
    }, {
      key: 'asyncSign',
      value: function asyncSign(keyPair, nHashType, nIn, subScript) {
        return asink(regeneratorRuntime.mark(function _callee2() {
          var workersResult;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return Workers.asyncObjectMethod(this, 'sign', [keyPair, nHashType, nIn, subScript]);

                case 2:
                  workersResult = _context2.sent;
                  return _context2.abrupt('return', new Sig().fromFastBuffer(workersResult.resbuf));

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }), this);
      }

      // This function takes a signature as input and does not parse any inputs

    }, {
      key: 'verify',
      value: function verify(sig, pubKey, nIn, subScript) {
        var hashBuf = this.sighash(sig.nHashType, nIn, subScript);
        return Ecdsa.verify(hashBuf, sig, pubKey, 'little');
      }
    }, {
      key: 'asyncVerify',
      value: function asyncVerify(sig, pubKey, nIn, subScript) {
        return asink(regeneratorRuntime.mark(function _callee3() {
          var workersResult;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return Workers.asyncObjectMethod(this, 'verify', [sig, pubKey, nIn, subScript]);

                case 2:
                  workersResult = _context3.sent;
                  return _context3.abrupt('return', JSON.parse(workersResult.resbuf.toString()));

                case 4:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }), this);
      }
    }, {
      key: 'hash',
      value: function hash() {
        return Hash.sha256Sha256(this.toBuffer());
      }
    }, {
      key: 'asyncHash',
      value: function asyncHash() {
        return asink(regeneratorRuntime.mark(function _callee4() {
          var workersResult;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return Workers.asyncObjectMethod(this, 'hash', []);

                case 2:
                  workersResult = _context4.sent;
                  return _context4.abrupt('return', workersResult.resbuf);

                case 4:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }), this);
      }
    }, {
      key: 'id',
      value: function id() {
        return new Br(this.hash()).readReverse();
      }
    }, {
      key: 'asyncId',
      value: function asyncId() {
        return asink(regeneratorRuntime.mark(function _callee5() {
          var workersResult;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return Workers.asyncObjectMethod(this, 'id', []);

                case 2:
                  workersResult = _context5.sent;
                  return _context5.abrupt('return', workersResult.resbuf);

                case 4:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }), this);
      }
    }, {
      key: 'addTxIn',
      value: function addTxIn(txHashBuf, txOutNum, script, nSequence) {
        var txIn = void 0;
        if (txHashBuf instanceof TxIn) {
          txIn = txHashBuf;
        } else {
          txIn = new TxIn().fromObject({ txHashBuf: txHashBuf, txOutNum: txOutNum, nSequence: nSequence }).setScript(script);
        }
        this.txIns.push(txIn);
        this.txInsVi = VarInt.fromNumber(this.txInsVi.toNumber() + 1);
        return this;
      }
    }, {
      key: 'addTxOut',
      value: function addTxOut(valueBn, script) {
        var txOut = void 0;
        if (valueBn instanceof TxOut) {
          txOut = valueBn;
        } else {
          txOut = new TxOut().fromObject({ valueBn: valueBn }).setScript(script);
        }
        this.txOuts.push(txOut);
        this.txOutsVi = VarInt.fromNumber(this.txOutsVi.toNumber() + 1);
        return this;
      }

      /**
       * Analagous to bitcoind's IsCoinBase function in transaction.h
       */

    }, {
      key: 'isCoinbase',
      value: function isCoinbase() {
        return this.txIns.length === 1 && this.txIns[0].hasNullInput();
      }
    }]);

    return Tx;
  }(Struct);

  Tx.MAX_MONEY = 21000000 * 1e8;

  return Tx;
};

inject = require('injecter')(inject, dependencies);
var Tx = inject();
module.exports = Tx;

}).call(this,require("buffer").Buffer)

},{"./bn":327,"./br":328,"./bw":329,"./ecdsa":332,"./hash":333,"./script":340,"./sig":341,"./struct":342,"./tx-in":344,"./tx-out":346,"./var-int":348,"./workers":351,"asink":352,"buffer":23,"injecter":381}],348:[function(require,module,exports){
(function (Buffer){
/**
 * VarInt (a.k.a. Compact Size)
 * ============================
 *
 * A varInt is a varible sized integer, and it is a format that is unique to
 * bitcoin, and used throughout bitcoin to represent the length of binary data
 * in a compact format that can take up as little as 1 byte or as much as 9
 * bytes.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Br: require('./br'),
  Bw: require('./bw'),
  Struct: require('./struct')
};

var inject = function inject(deps) {
  var Br = deps.Br;
  var Bw = deps.Bw;
  var Struct = deps.Struct;

  var VarInt = function (_Struct) {
    _inherits(VarInt, _Struct);

    function VarInt(buf) {
      _classCallCheck(this, VarInt);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(VarInt).call(this, { buf: buf }));
    }

    _createClass(VarInt, [{
      key: 'fromJSON',
      value: function fromJSON(json) {
        this.fromObject({
          buf: new Buffer(json, 'hex')
        });
        return this;
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return this.buf.toString('hex');
      }
    }, {
      key: 'fromBuffer',
      value: function fromBuffer(buf) {
        this.buf = buf;
        return this;
      }
    }, {
      key: 'fromBr',
      value: function fromBr(br) {
        this.buf = br.readVarIntBuf();
        return this;
      }
    }, {
      key: 'fromBn',
      value: function fromBn(bn) {
        this.buf = new Bw().writeVarIntBn(bn).toBuffer();
        return this;
      }
    }, {
      key: 'fromNumber',
      value: function fromNumber(num) {
        this.buf = new Bw().writeVarIntNum(num).toBuffer();
        return this;
      }
    }, {
      key: 'toBuffer',
      value: function toBuffer() {
        return this.buf;
      }
    }, {
      key: 'toBn',
      value: function toBn() {
        return new Br(this.buf).readVarIntBn();
      }
    }, {
      key: 'toNumber',
      value: function toNumber() {
        return new Br(this.buf).readVarIntNum();
      }
    }], [{
      key: 'fromBn',
      value: function fromBn(bn) {
        return new this().fromBn(bn);
      }
    }, {
      key: 'fromNumber',
      value: function fromNumber(num) {
        return new this().fromNumber(num);
      }
    }]);

    return VarInt;
  }(Struct);

  return VarInt;
};

inject = require('injecter')(inject, dependencies);
var VarInt = inject();
module.exports = VarInt;

}).call(this,require("buffer").Buffer)

},{"./br":328,"./bw":329,"./struct":342,"buffer":23,"injecter":381}],349:[function(require,module,exports){
(function (Buffer){
/**
 * WorkersCmd
 * ==========
 *
 * A command sent to a worker. The idea is that you send the worker a object,
 * and a method to perform on that object, and the arguments to that method,
 * all contained inside a WorkersCmd object. The worker will send back a
 * result, which is a WorkersResult object.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Bw: require('./bw'),
  Struct: require('./struct')
};

var inject = function inject(deps) {
  var Bw = deps.Bw;
  var Struct = deps.Struct;

  var WorkersCmd = function (_Struct) {
    _inherits(WorkersCmd, _Struct);

    function WorkersCmd(objbuf, classname, methodname, args, id) {
      _classCallCheck(this, WorkersCmd);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(WorkersCmd).call(this, { objbuf: objbuf, classname: classname, methodname: methodname, args: args, id: id }));
    }

    /**
     * The arguments to a workers command can be normal javascript objects,
     * buffers, or Yours Bitcoin objects.
     */


    _createClass(WorkersCmd, [{
      key: 'toBw',
      value: function toBw(bw) {
        if (!bw) {
          bw = new Bw();
        }
        var classNameBuf = new Buffer(this.classname);
        bw.writeUInt8(Number(this.isobj));
        bw.writeVarIntNum(classNameBuf.length);
        bw.write(classNameBuf);
        var methodNameBuf = new Buffer(this.methodname);
        bw.writeVarIntNum(methodNameBuf.length);
        bw.write(methodNameBuf);
        bw.writeVarIntNum(this.objbuf.length);
        bw.write(this.objbuf);
        WorkersCmd.argsToBw(bw, this.args);
        bw.writeVarIntNum(this.id);
        return bw;
      }
    }, {
      key: 'fromBr',
      value: function fromBr(br, classes) {
        this.isobj = Boolean(br.readUInt8());
        var classNameLEn = br.readVarIntNum();
        this.classname = br.read(classNameLEn).toString();
        var methodNameLEn = br.readVarIntNum();
        this.methodname = br.read(methodNameLEn).toString();
        var objbuflen = br.readVarIntNum();
        this.objbuf = br.read(objbuflen);
        this.args = WorkersCmd.argsFromBr(br, classes);
        this.id = br.readVarIntNum();
        return this;
      }
    }, {
      key: 'fromObjectMethod',
      value: function fromObjectMethod(obj, methodname, args, id) {
        this.isobj = true;
        this.objbuf = obj.toFastBuffer();
        this.classname = obj.constructor.name;
        this.methodname = methodname;
        this.args = args;
        this.id = id;
        return this;
      }
    }, {
      key: 'fromClassMethod',
      value: function fromClassMethod(classname, methodname, args, id) {
        this.isobj = false;
        this.objbuf = new Buffer(0);
        this.classname = classname;
        this.methodname = methodname;
        this.args = args;
        this.id = id;
        return this;
      }
    }], [{
      key: 'argsToBw',
      value: function argsToBw(bw, args) {
        bw.writeVarIntNum(args.length);
        for (var index in args) {
          var arg = args[index];
          if (Buffer.isBuffer(arg)) {
            // argument is Buffer
            bw.writeUInt8(0); // header byte
            bw.writeVarIntNum(arg.length);
            bw.write(arg);
          } else if (arg instanceof Struct) {
            // argument is Yours Bitcoin object
            bw.writeUInt8(1); // header byte
            var classname = arg.constructor.name;
            bw.writeVarIntNum(classname.length);
            bw.write(new Buffer(classname));
            var buf = arg.toFastBuffer();
            bw.writeVarIntNum(buf.length);
            bw.write(buf);
          } else if (arg === undefined) {
            bw.writeUInt8(2); // header byte
          } else {
            // assume basic javascript type
            bw.writeUInt8(3); // header byte
            var _buf = new Buffer(JSON.stringify(arg));
            bw.writeVarIntNum(_buf.length);
            bw.write(_buf);
          }
        }
        return bw;
      }

      /**
       * The arguments to a workers command can be normal javascript objects,
       * buffers, or Yours Bitcoin objects.
       */

    }, {
      key: 'argsFromBr',
      value: function argsFromBr(br, classes) {
        var argslen = br.readVarIntNum();
        var args = [];
        for (var i = 0; i < argslen; i++) {
          var header = br.readUInt8();
          if (header === 0) {
            // argument is Buffer
            var len = br.readVarIntNum();
            var buf = br.read(len);
            args.push(buf);
          } else if (header === 1) {
            // argument is Yours Bitcoin object
            var classNameLEn = br.readVarIntNum();
            var classname = br.read(classNameLEn).toString();
            var buflen = br.readVarIntNum();
            var _buf2 = br.read(buflen);
            var obj = new classes[classname]().fromFastBuffer(_buf2);
            args.push(obj);
          } else if (header === 2) {
            args.push(undefined);
          } else if (header === 3) {
            // argument is basic javascript type
            var _len = br.readVarIntNum();
            var _buf3 = br.read(_len);
            var _obj = JSON.parse(_buf3.toString());
            args.push(_obj);
          } else {
            throw new Error('invalid header byte for argument');
          }
        }
        return args;
      }
    }, {
      key: 'fromObjectMethod',
      value: function fromObjectMethod(obj, methodname, args, id) {
        return new this().fromObjectMethod(obj, methodname, args, id);
      }
    }, {
      key: 'fromClassMethod',
      value: function fromClassMethod(classname, methodname, args, id) {
        return new this().fromClassMethod(classname, methodname, args, id);
      }
    }]);

    return WorkersCmd;
  }(Struct);

  return WorkersCmd;
};

inject = require('injecter')(inject, dependencies);
var WorkersCmd = inject();
module.exports = WorkersCmd;

}).call(this,require("buffer").Buffer)

},{"./bw":329,"./struct":342,"buffer":23,"injecter":381}],350:[function(require,module,exports){
(function (Buffer){
/**
 * WorkersResult
 * =============
 *
 * A response sent back from a worker to the main thread. Contains the "result"
 * of the computation in the form of a buffer, resbuf. If the actual result is
 * an object with a .toFastBuffer method, the object is converted to a buffer
 * using that method. Otherwise it is JSON serialized into a buffer. The result
 * can also be an error, in which case the isError flag is set.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dependencies = {
  Bw: require('./bw'),
  Struct: require('./struct')
};

var inject = function inject(deps) {
  var Bw = deps.Bw;
  var Struct = deps.Struct;

  var WorkersResult = function (_Struct) {
    _inherits(WorkersResult, _Struct);

    function WorkersResult(resbuf, isError, id) {
      _classCallCheck(this, WorkersResult);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(WorkersResult).call(this, { resbuf: resbuf, isError: isError, id: id }));
    }

    _createClass(WorkersResult, [{
      key: 'fromResult',
      value: function fromResult(result, id) {
        if (result.toFastBuffer) {
          this.resbuf = result.toFastBuffer();
        } else if (Buffer.isBuffer(result)) {
          this.resbuf = result;
        } else {
          this.resbuf = new Buffer(JSON.stringify(result));
        }
        this.isError = false;
        this.id = id;
        return this;
      }
    }, {
      key: 'fromError',
      value: function fromError(error, id) {
        this.resbuf = new Buffer(JSON.stringify(error.message));
        this.isError = true;
        this.id = id;
        return this;
      }
    }, {
      key: 'toBw',
      value: function toBw(bw) {
        if (!bw) {
          bw = new Bw();
        }
        bw.writeVarIntNum(this.resbuf.length);
        bw.write(this.resbuf);
        bw.writeUInt8(Number(this.isError));
        bw.writeVarIntNum(this.id);
        return bw;
      }
    }, {
      key: 'fromBr',
      value: function fromBr(br) {
        var resbuflen = br.readVarIntNum();
        this.resbuf = br.read(resbuflen);
        this.isError = Boolean(br.readUInt8());
        this.id = br.readVarIntNum();
        return this;
      }
    }], [{
      key: 'fromResult',
      value: function fromResult(result, id) {
        return new this().fromResult(result, id);
      }
    }]);

    return WorkersResult;
  }(Struct);

  return WorkersResult;
};

inject = require('injecter')(inject, dependencies);
var WorkersResult = inject();
module.exports = WorkersResult;

}).call(this,require("buffer").Buffer)

},{"./bw":329,"./struct":342,"buffer":23,"injecter":381}],351:[function(require,module,exports){
(function (process,Buffer,__dirname){
/* global self */
/**
 * Workers
 * =======
 *
 * Workers manages either processes (in node) or threads (in a browser). The
 * workers are intended to handle CPU-heavy tasks that block IO. This class is
 * a little unusual in that it must use different interfaces whether in node or
 * in the browser. In node, we use node's build-in child_process fork to create
 * new workers we can communicate with. In the browser, we use web workers.
 * Unfortunately, node and web browsers do not have a common interface for
 * workers. There is a node module called webworker-threads for node that
 * mimics the browser's web workers, but unfortunately it does not support
 * require(), and thus isn't very useful in our case. Therefore we fall back to
 * process forks.
 *
 * You probably don't need to use this class directly. Use Work, which will
 * automatically spawn new workers if needed.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dependencies = {
  Worker: !process.browser ? require('child_process').spawn : undefined,
  WorkersCmd: require('./workers-cmd'),
  WorkersResult: require('./workers-result'),
  path: !process.browser ? require('path') : undefined
};

var inject = function inject(deps) {
  var Worker = deps.Worker;
  var WorkersCmd = deps.WorkersCmd;
  var WorkersResult = deps.WorkersResult;
  var path = deps.path;

  var globalWorkers = void 0;

  var Workers = function () {
    function Workers() {
      var nativeWorkers = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
      var lastid = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var promisemap = arguments.length <= 2 || arguments[2] === undefined ? new Map() : arguments[2];

      _classCallCheck(this, Workers);

      this.nativeWorkers = nativeWorkers;
      this.lastid = lastid;
      this.promisemap = promisemap;
    }

    _createClass(Workers, [{
      key: 'spawnBrowser',
      value: function spawnBrowser() {
        // TODO: Support more than one worker
        this.nativeWorkers[0] = new Worker(process.env.YOURS_BITCOIN_JS_BASE_URL + process.env.YOURS_BITCOIN_JS_WORKER_FILE);
        this.handleBrowser();
        return this;
      }
    }, {
      key: 'handleBrowser',
      value: function handleBrowser() {
        this.nativeWorkers[0].onerror = function (event) {
          this.onError(event.message + ': ' + event.filename + ':' + event.lineno);
        }.bind(this);
        this.nativeWorkers[0].onmessage = function (event) {
          this.onStdoutData(new Buffer(event.data));
        }.bind(this);
        return this;
      }
    }, {
      key: 'spawnNode',
      value: function spawnNode() {
        // TODO: Support more than one worker
        // TODO: {maxBuffer: 1000*1024}
        this.nativeWorkers[0] = Worker('node', [path.join(__dirname, 'worker-node.js')]);
        this.handleNode();
        return this;
      }
    }, {
      key: 'handleNode',
      value: function handleNode() {
        var _this = this;

        this.nativeWorkers[0].on('error', function (error) {
          _this.onError(error);
        });
        this.nativeWorkers[0].on('exit', function () {
          _this.onError('unexpected exit');
        });
        this.nativeWorkers[0].on('close', function () {
          _this.onError('unexpected close');
        });
        this.nativeWorkers[0].on('disconnect', function () {
          _this.onError('unexpected disconnect');
        });
        this.nativeWorkers[0].stdout.on('data', function (buf) {
          _this.onStdoutData(buf);
        });
        return this;
      }
    }, {
      key: 'onStdoutData',
      value: function onStdoutData(buf) {
        var workersResult = new WorkersResult().fromFastBuffer(buf);
        return this.onResult(workersResult);
      }
    }, {
      key: 'onResult',
      value: function onResult(workersResult) {
        if (!workersResult.isError) {
          var resolve = this.promisemap.get(workersResult.id).resolve;
          resolve(workersResult);
        } else {
          // console.log(workersResult.resbuf.toString()) // throw an error in worker to see output here
          var error = new Error(JSON.parse(workersResult.resbuf.toString()));
          var reject = this.promisemap.get(workersResult.id).reject;
          reject(error);
        }
        this.promisemap.delete(workersResult.id);
        return this;
      }
    }, {
      key: 'onError',
      value: function onError(error) {
        // eslint-disable-line
        return this;
      }
    }, {
      key: 'spawn',
      value: function spawn() {
        if (globalWorkers) {
          console.log('Warning: Spooling up non-global workers.');
        }
        if (process.browser) {
          return this.spawnBrowser();
        } else {
          return this.spawnNode();
        }
      }
    }, {
      key: 'sendBuffer',
      value: function sendBuffer(buf) {
        var buflen = new Buffer(4);
        buflen.writeUInt32BE(buf.length);
        buf = Buffer.concat([buflen, buf]);
        if (process.browser) {
          this.nativeWorkers[0].postMessage(buf);
        } else {
          this.nativeWorkers[0].stdin.write(buf);
        }
        return this;
      }
    }, {
      key: 'asyncObjectMethod',
      value: function asyncObjectMethod(obj, methodname, args, id) {
        var _this2 = this;

        if (!args) {
          throw new Error('must specify args');
        }
        id = id !== undefined ? id : ++this.lastid;
        var workersCmd = new WorkersCmd().fromObjectMethod(obj, methodname, args, id);
        var buf = workersCmd.toFastBuffer();
        return new Promise(function (resolve, reject) {
          _this2.sendBuffer(buf);
          _this2.promisemap.set(id, {
            resolve: resolve,
            reject: reject
          });
        });
      }
    }, {
      key: 'asyncClassMethod',
      value: function asyncClassMethod(classname, methodname, args, id) {
        if (!args) {
          throw new Error('must specify args');
        }
        id = id !== undefined ? id : ++this.lastid;
        var workersCmd = new WorkersCmd().fromClassMethod(classname, methodname, args, id);
        var buf = workersCmd.toFastBuffer();
        return new Promise(function (resolve, reject) {
          this.sendBuffer(buf);
          this.promisemap.set(id, {
            resolve: resolve,
            reject: reject
          });
        }.bind(this));
      }
    }], [{
      key: 'asyncObjectMethod',
      value: function asyncObjectMethod(obj, methodname, args, id) {
        if (!globalWorkers) {
          globalWorkers = new Workers().spawn();
        }
        return globalWorkers.asyncObjectMethod(obj, methodname, args, id);
      }
    }, {
      key: 'asyncClassMethod',
      value: function asyncClassMethod(obj, methodname, args, id) {
        if (!globalWorkers) {
          globalWorkers = new Workers().spawn();
        }
        return globalWorkers.asyncClassMethod(obj, methodname, args, id);
      }
    }, {
      key: 'endGlobalWorkers',
      value: function endGlobalWorkers() {
        if (globalWorkers && !process.browser) {
          // TODO: Support multiple workers.
          globalWorkers.nativeWorkers[0].kill('SIGINT');
          globalWorkers = undefined;
        }
      }
    }]);

    return Workers;
  }();

  return Workers;
};

inject = require('injecter')(inject, dependencies);
var Workers = inject();
module.exports = Workers;

}).call(this,require('_process'),require("buffer").Buffer,"/node_modules/yours-bitcoin/lib")

},{"./workers-cmd":349,"./workers-result":350,"_process":322,"buffer":23,"child_process":22,"injecter":381,"path":321}],352:[function(require,module,exports){
/**
 * asink
 * =====
 *
 * asink is the same thing as, or a rename of, spawn. spawn in turn is a tool
 * for repeatedly calling the .thens of promises yielded by a generator.
 * Basically, this makes it possible to write asynchronous, promisified code
 * with normal try/catches that look just like synchronous code. It creates
 * shorter and easier to understand code. Hypothetically, there will be a
 * feature in the next version of javascript, ES7, called "async functions",
 * which do exactly what asink does. When/if that happens and we can access it
 * in node, we can simply remove all calls to asink and our code should behave
 * in the same way.
 *
 * See:
 * http://tc39.github.io/ecmascript-asyncawait/
 * https://github.com/tc39/ecmascript-asyncawait
 * https://gist.github.com/jakearchibald/31b89cba627924972ad6
 * http://www.html5rocks.com/en/tutorials/es6/promises/
 * https://blogs.windows.com/msedgedev/2015/09/30/asynchronous-code-gets-easier-with-es2016-async-function-support-in-chakra-and-microsoft-edge/
 */
'use strict';

function spawn(genF, self) {
  return new Promise(function (resolve, reject) {
    var gen = genF.call(self);
    function step(nextF) {
      var next;
      try {
        next = nextF();
      } catch (e) {
        // finished with failure, reject the promise
        reject(e);
        return;
      }
      if (next.done) {
        // finished with success, resolve the promise
        resolve(next.value);
        return;
      }
      // not finished, chain off the yielded promise and `step` again
      Promise.resolve(next.value).then(function (v) {
        step(function () {
          return gen.next(v);
        });
      }, function (e) {
        step(function () {
          return gen.throw(e);
        });
      });
    }
    step(function () {
      return gen.next(undefined);
    });
  });
}
module.exports = spawn;

},{}],353:[function(require,module,exports){
// base-x encoding
// Forked from https://github.com/cryptocoinjs/bs58
// Originally written by Mike Hearn for BitcoinJ
// Copyright (c) 2011 Google Inc
// Ported to JavaScript by Stefan Thomas
// Merged Buffer refactorings from base58-native by Stephen Pair
// Copyright (c) 2013 BitPay Inc

module.exports = function base (ALPHABET) {
  var ALPHABET_MAP = {}
  var BASE = ALPHABET.length
  var LEADER = ALPHABET.charAt(0)

  // pre-compute lookup table
  for (var i = 0; i < ALPHABET.length; i++) {
    ALPHABET_MAP[ALPHABET.charAt(i)] = i
  }

  function encode (source) {
    if (source.length === 0) return ''

    var digits = [0]
    for (var i = 0; i < source.length; ++i) {
      for (var j = 0, carry = source[i]; j < digits.length; ++j) {
        carry += digits[j] << 8
        digits[j] = carry % BASE
        carry = (carry / BASE) | 0
      }

      while (carry > 0) {
        digits.push(carry % BASE)
        carry = (carry / BASE) | 0
      }
    }

    // deal with leading zeros
    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) {
      digits.push(0)
    }

    // convert digits to a string
    for (var ii = 0, jj = digits.length - 1; ii <= jj; ++ii, --jj) {
      var tmp = ALPHABET[digits[ii]]
      digits[ii] = ALPHABET[digits[jj]]
      digits[jj] = tmp
    }

    return digits.join('')
  }

  function decode (string) {
    if (string.length === 0) return []

    var bytes = [0]
    for (var i = 0; i < string.length; i++) {
      var value = ALPHABET_MAP[string[i]]
      if (value === undefined) throw new Error('Non-base' + BASE + ' character')

      for (var j = 0, carry = value; j < bytes.length; ++j) {
        carry += bytes[j] * BASE
        bytes[j] = carry & 0xff
        carry >>= 8
      }

      while (carry > 0) {
        bytes.push(carry & 0xff)
        carry >>= 8
      }
    }

    // deal with leading zeros
    for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
      bytes.push(0)
    }

    return bytes.reverse()
  }

  return {
    encode: encode,
    decode: decode
  }
}

},{}],354:[function(require,module,exports){
(function (module, exports) {
  'use strict';

  // Utils
  function assert (val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }

  // Could use `inherits` module, but don't want to move from single file
  // architecture yet.
  function inherits (ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }

  // BN

  function BN (number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0;

    // Reduction context
    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }
  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;

  var Buffer;
  try {
    Buffer = require('buf' + 'fer').Buffer;
  } catch (e) {
  }

  BN.isBN = function isBN (num) {
    return num !== null && typeof num === 'object' &&
      num.constructor.name === 'BN' && Array.isArray(num.words);
  };

  BN.max = function max (left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min (left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init (number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }
    assert(base === (base | 0) && base >= 2 && base <= 36);

    number = number.toString().replace(/\s+/g, '');
    var start = 0;
    if (number[0] === '-') {
      start++;
    }

    if (base === 16) {
      this._parseHex(number, start);
    } else {
      this._parseBase(number, base, start);
    }

    if (number[0] === '-') {
      this.negative = 1;
    }

    this.strip();

    if (endian !== 'le') return;

    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initNumber = function _initNumber (number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }
    if (number < 0x4000000) {
      this.words = [ number & 0x3ffffff ];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff
      ];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff,
        1
      ];
      this.length = 3;
    }

    if (endian !== 'le') return;

    // Reverse the bytes
    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray (number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');
    if (number.length <= 0) {
      this.words = [ 0 ];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;
    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }
    return this.strip();
  };

  function parseHex (str, start, end) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r <<= 4;

      // 'a' - 'f'
      if (c >= 49 && c <= 54) {
        r |= c - 49 + 0xa;

      // 'A' - 'F'
      } else if (c >= 17 && c <= 22) {
        r |= c - 17 + 0xa;

      // '0' - '9'
      } else {
        r |= c & 0xf;
      }
    }
    return r;
  }

  BN.prototype._parseHex = function _parseHex (number, start) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    // Scan 24-bit chunks and add them to the number
    var off = 0;
    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
      w = parseHex(number, i, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
      off += 24;
      if (off >= 26) {
        off -= 26;
        j++;
      }
    }
    if (i + 6 !== start) {
      w = parseHex(number, start, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
    }
    this.strip();
  };

  function parseBase (str, start, end, mul) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r *= mul;

      // 'a'
      if (c >= 49) {
        r += c - 49 + 0xa;

      // 'A'
      } else if (c >= 17) {
        r += c - 17 + 0xa;

      // '0' - '9'
      } else {
        r += c;
      }
    }
    return r;
  }

  BN.prototype._parseBase = function _parseBase (number, base, start) {
    // Initialize as zero
    this.words = [ 0 ];
    this.length = 1;

    // Find length of limb in base
    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }
    limbLen--;
    limbPow = (limbPow / base) | 0;

    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;

    var word = 0;
    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);

      this.imuln(limbPow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }
  };

  BN.prototype.copy = function copy (dest) {
    dest.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }
    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  BN.prototype.clone = function clone () {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand (size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }
    return this;
  };

  // Remove leading `0` from `this`
  BN.prototype.strip = function strip () {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }
    return this._normSign();
  };

  BN.prototype._normSign = function _normSign () {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }
    return this;
  };

  BN.prototype.inspect = function inspect () {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  };

  /*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */

  var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
  ];

  var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
  ];

  var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
  ];

  BN.prototype.toString = function toString (base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;

    var out;
    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = (((w << off) | carry) & 0xffffff).toString(16);
        carry = (w >>> (24 - off)) & 0xffffff;
        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }
        off += 2;
        if (off >= 26) {
          off -= 26;
          i--;
        }
      }
      if (carry !== 0) {
        out = carry.toString(16) + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base];
      // var groupBase = Math.pow(base, groupSize);
      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;
      while (!c.isZero()) {
        var r = c.modn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }
      if (this.isZero()) {
        out = '0' + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber () {
    var ret = this.words[0];
    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }
    return (this.negative !== 0) ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON () {
    return this.toString(16);
  };

  BN.prototype.toBuffer = function toBuffer (endian, length) {
    assert(typeof Buffer !== 'undefined');
    return this.toArrayLike(Buffer, endian, length);
  };

  BN.prototype.toArray = function toArray (endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');

    this.strip();
    var littleEndian = endian === 'le';
    var res = new ArrayType(reqLength);

    var b, i;
    var q = this.clone();
    if (!littleEndian) {
      // Assume big-endian
      for (i = 0; i < reqLength - byteLength; i++) {
        res[i] = 0;
      }

      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[reqLength - i - 1] = b;
      }
    } else {
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[i] = b;
      }

      for (; i < reqLength; i++) {
        res[i] = 0;
      }
    }

    return res;
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits (w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits (w) {
      var t = w;
      var r = 0;
      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }
      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }
      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }
      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }
      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits (w) {
    // Short-cut
    if (w === 0) return 26;

    var t = w;
    var r = 0;
    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }
    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }
    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }
    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }
    if ((t & 0x1) === 0) {
      r++;
    }
    return r;
  };

  // Return number of used bits in a BN
  BN.prototype.bitLength = function bitLength () {
    var w = this.words[this.length - 1];
    var hi = this._countBits(w);
    return (this.length - 1) * 26 + hi;
  };

  function toBitArray (num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
    }

    return w;
  }

  // Number of trailing zero bits
  BN.prototype.zeroBits = function zeroBits () {
    if (this.isZero()) return 0;

    var r = 0;
    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);
      r += b;
      if (b !== 26) break;
    }
    return r;
  };

  BN.prototype.byteLength = function byteLength () {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos (width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }
    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos (width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }
    return this.clone();
  };

  BN.prototype.isNeg = function isNeg () {
    return this.negative !== 0;
  };

  // Return negative clone of `this`
  BN.prototype.neg = function neg () {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg () {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  };

  // Or `num` with `this` in-place
  BN.prototype.iuor = function iuor (num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this.strip();
  };

  BN.prototype.ior = function ior (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  };

  // Or `num` with `this`
  BN.prototype.or = function or (num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor (num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  };

  // And `num` with `this` in-place
  BN.prototype.iuand = function iuand (num) {
    // b = min-length(num, this)
    var b;
    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;

    return this.strip();
  };

  BN.prototype.iand = function iand (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  };

  // And `num` with `this`
  BN.prototype.and = function and (num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand (num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  };

  // Xor `num` with `this` in-place
  BN.prototype.iuxor = function iuxor (num) {
    // a.length > b.length
    var a;
    var b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;

    return this.strip();
  };

  BN.prototype.ixor = function ixor (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  };

  // Xor `num` with `this`
  BN.prototype.xor = function xor (num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor (num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  };

  // Not ``this`` with ``width`` bitwidth
  BN.prototype.inotn = function inotn (width) {
    assert(typeof width === 'number' && width >= 0);

    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26;

    // Extend the buffer with leading zeroes
    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    }

    // Handle complete words
    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    }

    // Handle the residue
    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
    }

    // And remove leading zeroes
    return this.strip();
  };

  BN.prototype.notn = function notn (width) {
    return this.clone().inotn(width);
  };

  // Set `bit` of `this`
  BN.prototype.setn = function setn (bit, val) {
    assert(typeof bit === 'number' && bit >= 0);

    var off = (bit / 26) | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | (1 << wbit);
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this.strip();
  };

  // Add `num` to `this` in-place
  BN.prototype.iadd = function iadd (num) {
    var r;

    // negative + positive
    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign();

    // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    }

    // a.length > b.length
    var a, b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;
    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++;
    // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  };

  // Add `num` to `this`
  BN.prototype.add = function add (num) {
    var res;
    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);

    return num.clone().iadd(this);
  };

  // Subtract `num` from `this` in-place
  BN.prototype.isub = function isub (num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign();

    // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    }

    // At this point both numbers are positive
    var cmp = this.cmp(num);

    // Optimization - zeroify
    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    }

    // a > b
    var a, b;
    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    // Copy rest of the words
    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this.strip();
  };

  // Subtract `num` from `this`
  BN.prototype.sub = function sub (num) {
    return this.clone().isub(num);
  };

  function smallMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = (self.length + num.length) | 0;
    out.length = len;
    len = (len - 1) | 0;

    // Peel one iteration (compiler can't do it, because of code complexity)
    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;

    var lo = r & 0x3ffffff;
    var carry = (r / 0x4000000) | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = (k - j) | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += (r / 0x4000000) | 0;
        rword = r & 0x3ffffff;
      }
      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }
    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out.strip();
  }

  // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).
  var comb10MulTo = function comb10MulTo (self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;

    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */
    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = (mid + Math.imul(ah0, bl0)) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */
    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = (mid + Math.imul(ah1, bl0)) | 0;
    hi = Math.imul(ah1, bh0);
    lo = (lo + Math.imul(al0, bl1)) | 0;
    mid = (mid + Math.imul(al0, bh1)) | 0;
    mid = (mid + Math.imul(ah0, bl1)) | 0;
    hi = (hi + Math.imul(ah0, bh1)) | 0;
    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */
    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = (mid + Math.imul(ah2, bl0)) | 0;
    hi = Math.imul(ah2, bh0);
    lo = (lo + Math.imul(al1, bl1)) | 0;
    mid = (mid + Math.imul(al1, bh1)) | 0;
    mid = (mid + Math.imul(ah1, bl1)) | 0;
    hi = (hi + Math.imul(ah1, bh1)) | 0;
    lo = (lo + Math.imul(al0, bl2)) | 0;
    mid = (mid + Math.imul(al0, bh2)) | 0;
    mid = (mid + Math.imul(ah0, bl2)) | 0;
    hi = (hi + Math.imul(ah0, bh2)) | 0;
    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */
    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = (mid + Math.imul(ah3, bl0)) | 0;
    hi = Math.imul(ah3, bh0);
    lo = (lo + Math.imul(al2, bl1)) | 0;
    mid = (mid + Math.imul(al2, bh1)) | 0;
    mid = (mid + Math.imul(ah2, bl1)) | 0;
    hi = (hi + Math.imul(ah2, bh1)) | 0;
    lo = (lo + Math.imul(al1, bl2)) | 0;
    mid = (mid + Math.imul(al1, bh2)) | 0;
    mid = (mid + Math.imul(ah1, bl2)) | 0;
    hi = (hi + Math.imul(ah1, bh2)) | 0;
    lo = (lo + Math.imul(al0, bl3)) | 0;
    mid = (mid + Math.imul(al0, bh3)) | 0;
    mid = (mid + Math.imul(ah0, bl3)) | 0;
    hi = (hi + Math.imul(ah0, bh3)) | 0;
    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */
    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = (mid + Math.imul(ah4, bl0)) | 0;
    hi = Math.imul(ah4, bh0);
    lo = (lo + Math.imul(al3, bl1)) | 0;
    mid = (mid + Math.imul(al3, bh1)) | 0;
    mid = (mid + Math.imul(ah3, bl1)) | 0;
    hi = (hi + Math.imul(ah3, bh1)) | 0;
    lo = (lo + Math.imul(al2, bl2)) | 0;
    mid = (mid + Math.imul(al2, bh2)) | 0;
    mid = (mid + Math.imul(ah2, bl2)) | 0;
    hi = (hi + Math.imul(ah2, bh2)) | 0;
    lo = (lo + Math.imul(al1, bl3)) | 0;
    mid = (mid + Math.imul(al1, bh3)) | 0;
    mid = (mid + Math.imul(ah1, bl3)) | 0;
    hi = (hi + Math.imul(ah1, bh3)) | 0;
    lo = (lo + Math.imul(al0, bl4)) | 0;
    mid = (mid + Math.imul(al0, bh4)) | 0;
    mid = (mid + Math.imul(ah0, bl4)) | 0;
    hi = (hi + Math.imul(ah0, bh4)) | 0;
    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */
    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = (mid + Math.imul(ah5, bl0)) | 0;
    hi = Math.imul(ah5, bh0);
    lo = (lo + Math.imul(al4, bl1)) | 0;
    mid = (mid + Math.imul(al4, bh1)) | 0;
    mid = (mid + Math.imul(ah4, bl1)) | 0;
    hi = (hi + Math.imul(ah4, bh1)) | 0;
    lo = (lo + Math.imul(al3, bl2)) | 0;
    mid = (mid + Math.imul(al3, bh2)) | 0;
    mid = (mid + Math.imul(ah3, bl2)) | 0;
    hi = (hi + Math.imul(ah3, bh2)) | 0;
    lo = (lo + Math.imul(al2, bl3)) | 0;
    mid = (mid + Math.imul(al2, bh3)) | 0;
    mid = (mid + Math.imul(ah2, bl3)) | 0;
    hi = (hi + Math.imul(ah2, bh3)) | 0;
    lo = (lo + Math.imul(al1, bl4)) | 0;
    mid = (mid + Math.imul(al1, bh4)) | 0;
    mid = (mid + Math.imul(ah1, bl4)) | 0;
    hi = (hi + Math.imul(ah1, bh4)) | 0;
    lo = (lo + Math.imul(al0, bl5)) | 0;
    mid = (mid + Math.imul(al0, bh5)) | 0;
    mid = (mid + Math.imul(ah0, bl5)) | 0;
    hi = (hi + Math.imul(ah0, bh5)) | 0;
    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */
    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = (mid + Math.imul(ah6, bl0)) | 0;
    hi = Math.imul(ah6, bh0);
    lo = (lo + Math.imul(al5, bl1)) | 0;
    mid = (mid + Math.imul(al5, bh1)) | 0;
    mid = (mid + Math.imul(ah5, bl1)) | 0;
    hi = (hi + Math.imul(ah5, bh1)) | 0;
    lo = (lo + Math.imul(al4, bl2)) | 0;
    mid = (mid + Math.imul(al4, bh2)) | 0;
    mid = (mid + Math.imul(ah4, bl2)) | 0;
    hi = (hi + Math.imul(ah4, bh2)) | 0;
    lo = (lo + Math.imul(al3, bl3)) | 0;
    mid = (mid + Math.imul(al3, bh3)) | 0;
    mid = (mid + Math.imul(ah3, bl3)) | 0;
    hi = (hi + Math.imul(ah3, bh3)) | 0;
    lo = (lo + Math.imul(al2, bl4)) | 0;
    mid = (mid + Math.imul(al2, bh4)) | 0;
    mid = (mid + Math.imul(ah2, bl4)) | 0;
    hi = (hi + Math.imul(ah2, bh4)) | 0;
    lo = (lo + Math.imul(al1, bl5)) | 0;
    mid = (mid + Math.imul(al1, bh5)) | 0;
    mid = (mid + Math.imul(ah1, bl5)) | 0;
    hi = (hi + Math.imul(ah1, bh5)) | 0;
    lo = (lo + Math.imul(al0, bl6)) | 0;
    mid = (mid + Math.imul(al0, bh6)) | 0;
    mid = (mid + Math.imul(ah0, bl6)) | 0;
    hi = (hi + Math.imul(ah0, bh6)) | 0;
    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */
    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = (mid + Math.imul(ah7, bl0)) | 0;
    hi = Math.imul(ah7, bh0);
    lo = (lo + Math.imul(al6, bl1)) | 0;
    mid = (mid + Math.imul(al6, bh1)) | 0;
    mid = (mid + Math.imul(ah6, bl1)) | 0;
    hi = (hi + Math.imul(ah6, bh1)) | 0;
    lo = (lo + Math.imul(al5, bl2)) | 0;
    mid = (mid + Math.imul(al5, bh2)) | 0;
    mid = (mid + Math.imul(ah5, bl2)) | 0;
    hi = (hi + Math.imul(ah5, bh2)) | 0;
    lo = (lo + Math.imul(al4, bl3)) | 0;
    mid = (mid + Math.imul(al4, bh3)) | 0;
    mid = (mid + Math.imul(ah4, bl3)) | 0;
    hi = (hi + Math.imul(ah4, bh3)) | 0;
    lo = (lo + Math.imul(al3, bl4)) | 0;
    mid = (mid + Math.imul(al3, bh4)) | 0;
    mid = (mid + Math.imul(ah3, bl4)) | 0;
    hi = (hi + Math.imul(ah3, bh4)) | 0;
    lo = (lo + Math.imul(al2, bl5)) | 0;
    mid = (mid + Math.imul(al2, bh5)) | 0;
    mid = (mid + Math.imul(ah2, bl5)) | 0;
    hi = (hi + Math.imul(ah2, bh5)) | 0;
    lo = (lo + Math.imul(al1, bl6)) | 0;
    mid = (mid + Math.imul(al1, bh6)) | 0;
    mid = (mid + Math.imul(ah1, bl6)) | 0;
    hi = (hi + Math.imul(ah1, bh6)) | 0;
    lo = (lo + Math.imul(al0, bl7)) | 0;
    mid = (mid + Math.imul(al0, bh7)) | 0;
    mid = (mid + Math.imul(ah0, bl7)) | 0;
    hi = (hi + Math.imul(ah0, bh7)) | 0;
    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */
    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = (mid + Math.imul(ah8, bl0)) | 0;
    hi = Math.imul(ah8, bh0);
    lo = (lo + Math.imul(al7, bl1)) | 0;
    mid = (mid + Math.imul(al7, bh1)) | 0;
    mid = (mid + Math.imul(ah7, bl1)) | 0;
    hi = (hi + Math.imul(ah7, bh1)) | 0;
    lo = (lo + Math.imul(al6, bl2)) | 0;
    mid = (mid + Math.imul(al6, bh2)) | 0;
    mid = (mid + Math.imul(ah6, bl2)) | 0;
    hi = (hi + Math.imul(ah6, bh2)) | 0;
    lo = (lo + Math.imul(al5, bl3)) | 0;
    mid = (mid + Math.imul(al5, bh3)) | 0;
    mid = (mid + Math.imul(ah5, bl3)) | 0;
    hi = (hi + Math.imul(ah5, bh3)) | 0;
    lo = (lo + Math.imul(al4, bl4)) | 0;
    mid = (mid + Math.imul(al4, bh4)) | 0;
    mid = (mid + Math.imul(ah4, bl4)) | 0;
    hi = (hi + Math.imul(ah4, bh4)) | 0;
    lo = (lo + Math.imul(al3, bl5)) | 0;
    mid = (mid + Math.imul(al3, bh5)) | 0;
    mid = (mid + Math.imul(ah3, bl5)) | 0;
    hi = (hi + Math.imul(ah3, bh5)) | 0;
    lo = (lo + Math.imul(al2, bl6)) | 0;
    mid = (mid + Math.imul(al2, bh6)) | 0;
    mid = (mid + Math.imul(ah2, bl6)) | 0;
    hi = (hi + Math.imul(ah2, bh6)) | 0;
    lo = (lo + Math.imul(al1, bl7)) | 0;
    mid = (mid + Math.imul(al1, bh7)) | 0;
    mid = (mid + Math.imul(ah1, bl7)) | 0;
    hi = (hi + Math.imul(ah1, bh7)) | 0;
    lo = (lo + Math.imul(al0, bl8)) | 0;
    mid = (mid + Math.imul(al0, bh8)) | 0;
    mid = (mid + Math.imul(ah0, bl8)) | 0;
    hi = (hi + Math.imul(ah0, bh8)) | 0;
    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */
    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = (mid + Math.imul(ah9, bl0)) | 0;
    hi = Math.imul(ah9, bh0);
    lo = (lo + Math.imul(al8, bl1)) | 0;
    mid = (mid + Math.imul(al8, bh1)) | 0;
    mid = (mid + Math.imul(ah8, bl1)) | 0;
    hi = (hi + Math.imul(ah8, bh1)) | 0;
    lo = (lo + Math.imul(al7, bl2)) | 0;
    mid = (mid + Math.imul(al7, bh2)) | 0;
    mid = (mid + Math.imul(ah7, bl2)) | 0;
    hi = (hi + Math.imul(ah7, bh2)) | 0;
    lo = (lo + Math.imul(al6, bl3)) | 0;
    mid = (mid + Math.imul(al6, bh3)) | 0;
    mid = (mid + Math.imul(ah6, bl3)) | 0;
    hi = (hi + Math.imul(ah6, bh3)) | 0;
    lo = (lo + Math.imul(al5, bl4)) | 0;
    mid = (mid + Math.imul(al5, bh4)) | 0;
    mid = (mid + Math.imul(ah5, bl4)) | 0;
    hi = (hi + Math.imul(ah5, bh4)) | 0;
    lo = (lo + Math.imul(al4, bl5)) | 0;
    mid = (mid + Math.imul(al4, bh5)) | 0;
    mid = (mid + Math.imul(ah4, bl5)) | 0;
    hi = (hi + Math.imul(ah4, bh5)) | 0;
    lo = (lo + Math.imul(al3, bl6)) | 0;
    mid = (mid + Math.imul(al3, bh6)) | 0;
    mid = (mid + Math.imul(ah3, bl6)) | 0;
    hi = (hi + Math.imul(ah3, bh6)) | 0;
    lo = (lo + Math.imul(al2, bl7)) | 0;
    mid = (mid + Math.imul(al2, bh7)) | 0;
    mid = (mid + Math.imul(ah2, bl7)) | 0;
    hi = (hi + Math.imul(ah2, bh7)) | 0;
    lo = (lo + Math.imul(al1, bl8)) | 0;
    mid = (mid + Math.imul(al1, bh8)) | 0;
    mid = (mid + Math.imul(ah1, bl8)) | 0;
    hi = (hi + Math.imul(ah1, bh8)) | 0;
    lo = (lo + Math.imul(al0, bl9)) | 0;
    mid = (mid + Math.imul(al0, bh9)) | 0;
    mid = (mid + Math.imul(ah0, bl9)) | 0;
    hi = (hi + Math.imul(ah0, bh9)) | 0;
    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */
    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = (mid + Math.imul(ah9, bl1)) | 0;
    hi = Math.imul(ah9, bh1);
    lo = (lo + Math.imul(al8, bl2)) | 0;
    mid = (mid + Math.imul(al8, bh2)) | 0;
    mid = (mid + Math.imul(ah8, bl2)) | 0;
    hi = (hi + Math.imul(ah8, bh2)) | 0;
    lo = (lo + Math.imul(al7, bl3)) | 0;
    mid = (mid + Math.imul(al7, bh3)) | 0;
    mid = (mid + Math.imul(ah7, bl3)) | 0;
    hi = (hi + Math.imul(ah7, bh3)) | 0;
    lo = (lo + Math.imul(al6, bl4)) | 0;
    mid = (mid + Math.imul(al6, bh4)) | 0;
    mid = (mid + Math.imul(ah6, bl4)) | 0;
    hi = (hi + Math.imul(ah6, bh4)) | 0;
    lo = (lo + Math.imul(al5, bl5)) | 0;
    mid = (mid + Math.imul(al5, bh5)) | 0;
    mid = (mid + Math.imul(ah5, bl5)) | 0;
    hi = (hi + Math.imul(ah5, bh5)) | 0;
    lo = (lo + Math.imul(al4, bl6)) | 0;
    mid = (mid + Math.imul(al4, bh6)) | 0;
    mid = (mid + Math.imul(ah4, bl6)) | 0;
    hi = (hi + Math.imul(ah4, bh6)) | 0;
    lo = (lo + Math.imul(al3, bl7)) | 0;
    mid = (mid + Math.imul(al3, bh7)) | 0;
    mid = (mid + Math.imul(ah3, bl7)) | 0;
    hi = (hi + Math.imul(ah3, bh7)) | 0;
    lo = (lo + Math.imul(al2, bl8)) | 0;
    mid = (mid + Math.imul(al2, bh8)) | 0;
    mid = (mid + Math.imul(ah2, bl8)) | 0;
    hi = (hi + Math.imul(ah2, bh8)) | 0;
    lo = (lo + Math.imul(al1, bl9)) | 0;
    mid = (mid + Math.imul(al1, bh9)) | 0;
    mid = (mid + Math.imul(ah1, bl9)) | 0;
    hi = (hi + Math.imul(ah1, bh9)) | 0;
    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */
    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = (mid + Math.imul(ah9, bl2)) | 0;
    hi = Math.imul(ah9, bh2);
    lo = (lo + Math.imul(al8, bl3)) | 0;
    mid = (mid + Math.imul(al8, bh3)) | 0;
    mid = (mid + Math.imul(ah8, bl3)) | 0;
    hi = (hi + Math.imul(ah8, bh3)) | 0;
    lo = (lo + Math.imul(al7, bl4)) | 0;
    mid = (mid + Math.imul(al7, bh4)) | 0;
    mid = (mid + Math.imul(ah7, bl4)) | 0;
    hi = (hi + Math.imul(ah7, bh4)) | 0;
    lo = (lo + Math.imul(al6, bl5)) | 0;
    mid = (mid + Math.imul(al6, bh5)) | 0;
    mid = (mid + Math.imul(ah6, bl5)) | 0;
    hi = (hi + Math.imul(ah6, bh5)) | 0;
    lo = (lo + Math.imul(al5, bl6)) | 0;
    mid = (mid + Math.imul(al5, bh6)) | 0;
    mid = (mid + Math.imul(ah5, bl6)) | 0;
    hi = (hi + Math.imul(ah5, bh6)) | 0;
    lo = (lo + Math.imul(al4, bl7)) | 0;
    mid = (mid + Math.imul(al4, bh7)) | 0;
    mid = (mid + Math.imul(ah4, bl7)) | 0;
    hi = (hi + Math.imul(ah4, bh7)) | 0;
    lo = (lo + Math.imul(al3, bl8)) | 0;
    mid = (mid + Math.imul(al3, bh8)) | 0;
    mid = (mid + Math.imul(ah3, bl8)) | 0;
    hi = (hi + Math.imul(ah3, bh8)) | 0;
    lo = (lo + Math.imul(al2, bl9)) | 0;
    mid = (mid + Math.imul(al2, bh9)) | 0;
    mid = (mid + Math.imul(ah2, bl9)) | 0;
    hi = (hi + Math.imul(ah2, bh9)) | 0;
    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */
    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = (mid + Math.imul(ah9, bl3)) | 0;
    hi = Math.imul(ah9, bh3);
    lo = (lo + Math.imul(al8, bl4)) | 0;
    mid = (mid + Math.imul(al8, bh4)) | 0;
    mid = (mid + Math.imul(ah8, bl4)) | 0;
    hi = (hi + Math.imul(ah8, bh4)) | 0;
    lo = (lo + Math.imul(al7, bl5)) | 0;
    mid = (mid + Math.imul(al7, bh5)) | 0;
    mid = (mid + Math.imul(ah7, bl5)) | 0;
    hi = (hi + Math.imul(ah7, bh5)) | 0;
    lo = (lo + Math.imul(al6, bl6)) | 0;
    mid = (mid + Math.imul(al6, bh6)) | 0;
    mid = (mid + Math.imul(ah6, bl6)) | 0;
    hi = (hi + Math.imul(ah6, bh6)) | 0;
    lo = (lo + Math.imul(al5, bl7)) | 0;
    mid = (mid + Math.imul(al5, bh7)) | 0;
    mid = (mid + Math.imul(ah5, bl7)) | 0;
    hi = (hi + Math.imul(ah5, bh7)) | 0;
    lo = (lo + Math.imul(al4, bl8)) | 0;
    mid = (mid + Math.imul(al4, bh8)) | 0;
    mid = (mid + Math.imul(ah4, bl8)) | 0;
    hi = (hi + Math.imul(ah4, bh8)) | 0;
    lo = (lo + Math.imul(al3, bl9)) | 0;
    mid = (mid + Math.imul(al3, bh9)) | 0;
    mid = (mid + Math.imul(ah3, bl9)) | 0;
    hi = (hi + Math.imul(ah3, bh9)) | 0;
    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */
    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = (mid + Math.imul(ah9, bl4)) | 0;
    hi = Math.imul(ah9, bh4);
    lo = (lo + Math.imul(al8, bl5)) | 0;
    mid = (mid + Math.imul(al8, bh5)) | 0;
    mid = (mid + Math.imul(ah8, bl5)) | 0;
    hi = (hi + Math.imul(ah8, bh5)) | 0;
    lo = (lo + Math.imul(al7, bl6)) | 0;
    mid = (mid + Math.imul(al7, bh6)) | 0;
    mid = (mid + Math.imul(ah7, bl6)) | 0;
    hi = (hi + Math.imul(ah7, bh6)) | 0;
    lo = (lo + Math.imul(al6, bl7)) | 0;
    mid = (mid + Math.imul(al6, bh7)) | 0;
    mid = (mid + Math.imul(ah6, bl7)) | 0;
    hi = (hi + Math.imul(ah6, bh7)) | 0;
    lo = (lo + Math.imul(al5, bl8)) | 0;
    mid = (mid + Math.imul(al5, bh8)) | 0;
    mid = (mid + Math.imul(ah5, bl8)) | 0;
    hi = (hi + Math.imul(ah5, bh8)) | 0;
    lo = (lo + Math.imul(al4, bl9)) | 0;
    mid = (mid + Math.imul(al4, bh9)) | 0;
    mid = (mid + Math.imul(ah4, bl9)) | 0;
    hi = (hi + Math.imul(ah4, bh9)) | 0;
    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */
    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = (mid + Math.imul(ah9, bl5)) | 0;
    hi = Math.imul(ah9, bh5);
    lo = (lo + Math.imul(al8, bl6)) | 0;
    mid = (mid + Math.imul(al8, bh6)) | 0;
    mid = (mid + Math.imul(ah8, bl6)) | 0;
    hi = (hi + Math.imul(ah8, bh6)) | 0;
    lo = (lo + Math.imul(al7, bl7)) | 0;
    mid = (mid + Math.imul(al7, bh7)) | 0;
    mid = (mid + Math.imul(ah7, bl7)) | 0;
    hi = (hi + Math.imul(ah7, bh7)) | 0;
    lo = (lo + Math.imul(al6, bl8)) | 0;
    mid = (mid + Math.imul(al6, bh8)) | 0;
    mid = (mid + Math.imul(ah6, bl8)) | 0;
    hi = (hi + Math.imul(ah6, bh8)) | 0;
    lo = (lo + Math.imul(al5, bl9)) | 0;
    mid = (mid + Math.imul(al5, bh9)) | 0;
    mid = (mid + Math.imul(ah5, bl9)) | 0;
    hi = (hi + Math.imul(ah5, bh9)) | 0;
    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */
    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = (mid + Math.imul(ah9, bl6)) | 0;
    hi = Math.imul(ah9, bh6);
    lo = (lo + Math.imul(al8, bl7)) | 0;
    mid = (mid + Math.imul(al8, bh7)) | 0;
    mid = (mid + Math.imul(ah8, bl7)) | 0;
    hi = (hi + Math.imul(ah8, bh7)) | 0;
    lo = (lo + Math.imul(al7, bl8)) | 0;
    mid = (mid + Math.imul(al7, bh8)) | 0;
    mid = (mid + Math.imul(ah7, bl8)) | 0;
    hi = (hi + Math.imul(ah7, bh8)) | 0;
    lo = (lo + Math.imul(al6, bl9)) | 0;
    mid = (mid + Math.imul(al6, bh9)) | 0;
    mid = (mid + Math.imul(ah6, bl9)) | 0;
    hi = (hi + Math.imul(ah6, bh9)) | 0;
    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */
    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = (mid + Math.imul(ah9, bl7)) | 0;
    hi = Math.imul(ah9, bh7);
    lo = (lo + Math.imul(al8, bl8)) | 0;
    mid = (mid + Math.imul(al8, bh8)) | 0;
    mid = (mid + Math.imul(ah8, bl8)) | 0;
    hi = (hi + Math.imul(ah8, bh8)) | 0;
    lo = (lo + Math.imul(al7, bl9)) | 0;
    mid = (mid + Math.imul(al7, bh9)) | 0;
    mid = (mid + Math.imul(ah7, bl9)) | 0;
    hi = (hi + Math.imul(ah7, bh9)) | 0;
    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */
    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = (mid + Math.imul(ah9, bl8)) | 0;
    hi = Math.imul(ah9, bh8);
    lo = (lo + Math.imul(al8, bl9)) | 0;
    mid = (mid + Math.imul(al8, bh9)) | 0;
    mid = (mid + Math.imul(ah8, bl9)) | 0;
    hi = (hi + Math.imul(ah8, bh9)) | 0;
    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */
    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = (mid + Math.imul(ah9, bl9)) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;
    if (c !== 0) {
      o[19] = c;
      out.length++;
    }
    return out;
  };

  // Polyfill comb
  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;

    var carry = 0;
    var hncarry = 0;
    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;

        var lo = r & 0x3ffffff;
        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
        lo = (lo + rword) | 0;
        rword = lo & 0x3ffffff;
        ncarry = (ncarry + (lo >>> 26)) | 0;

        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }
      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }
    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out.strip();
  }

  function jumboMulTo (self, num, out) {
    var fftm = new FFTM();
    return fftm.mulp(self, num, out);
  }

  BN.prototype.mulTo = function mulTo (num, out) {
    var res;
    var len = this.length + num.length;
    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  };

  // Cooley-Tukey algorithm for FFT
  // slightly revisited to rely on looping instead of recursion

  function FFTM (x, y) {
    this.x = x;
    this.y = y;
  }

  FFTM.prototype.makeRBT = function makeRBT (N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;
    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }

    return t;
  };

  // Returns binary-reversed representation of `x`
  FFTM.prototype.revBin = function revBin (x, l, N) {
    if (x === 0 || x === N - 1) return x;

    var rb = 0;
    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << (l - i - 1);
      x >>= 1;
    }

    return rb;
  };

  // Performs "tweedling" phase, therefore 'emulating'
  // behaviour of the recursive algorithm
  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };

  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);

    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;

      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);

      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;

        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];

          var ro = rtws[p + j + s];
          var io = itws[p + j + s];

          var rx = rtwdf_ * ro - itwdf_ * io;

          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;

          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;

          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;

          /* jshint maxdepth : false */
          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };

  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;
    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }

    return 1 << i + 1 + odd;
  };

  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
    if (N <= 1) return;

    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];

      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;

      t = iws[i];

      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };

  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
    var carry = 0;
    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
        Math.round(ws[2 * i] / N) +
        carry;

      ws[i] = w & 0x3ffffff;

      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }

    return ws;
  };

  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
    var carry = 0;
    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);

      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
    }

    // Pad with zeroes
    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }

    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };

  FFTM.prototype.stub = function stub (N) {
    var ph = new Array(N);
    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }

    return ph;
  };

  FFTM.prototype.mulp = function mulp (x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);

    var rbt = this.makeRBT(N);

    var _ = this.stub(N);

    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);

    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);

    var rmws = out.words;
    rmws.length = N;

    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);

    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);

    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }

    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);

    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out.strip();
  };

  // Multiply `this` by `num`
  BN.prototype.mul = function mul (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  };

  // Multiply employing FFT
  BN.prototype.mulf = function mulf (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  };

  // In-place Multiplication
  BN.prototype.imul = function imul (num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);

    // Carry
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += (w / 0x4000000) | 0;
      // NOTE: lo is 27bit maximum
      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.muln = function muln (num) {
    return this.clone().imuln(num);
  };

  // `this` * `this`
  BN.prototype.sqr = function sqr () {
    return this.mul(this);
  };

  // `this` * `this` in-place
  BN.prototype.isqr = function isqr () {
    return this.imul(this.clone());
  };

  // Math.pow(`this`, `num`)
  BN.prototype.pow = function pow (num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1);

    // Skip leading zeroes
    var res = this;
    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;

        res = res.mul(q);
      }
    }

    return res;
  };

  // Shift-left in-place
  BN.prototype.iushln = function iushln (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = ((this.words[i] | 0) - newCarry) << r;
        this.words[i] = c | carry;
        carry = newCarry >>> (26 - r);
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this.strip();
  };

  BN.prototype.ishln = function ishln (bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  };

  // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits
  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;
    if (hint) {
      h = (hint - (hint % 26)) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
    var maskedWords = extended;

    h -= s;
    h = Math.max(0, h);

    // Extended mode, copy masked part
    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }
      maskedWords.length = s;
    }

    if (s === 0) {
      // No-op, we should not move anything at all
    } else if (this.length > s) {
      this.length -= s;
      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;
    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = (carry << (26 - r)) | (word >>> r);
      carry = word & mask;
    }

    // Push carried bits as a mask
    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this.strip();
  };

  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  };

  // Shift-left
  BN.prototype.shln = function shln (bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln (bits) {
    return this.clone().iushln(bits);
  };

  // Shift-right
  BN.prototype.shrn = function shrn (bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn (bits) {
    return this.clone().iushrn(bits);
  };

  // Test if n bit is set
  BN.prototype.testn = function testn (bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) return false;

    // Check bit and return
    var w = this.words[s];

    return !!(w & q);
  };

  // Return only lowers bits of number (in-place)
  BN.prototype.imaskn = function imaskn (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;

    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (r !== 0) {
      s++;
    }
    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      this.words[this.length - 1] &= mask;
    }

    return this.strip();
  };

  // Return only lowers bits of number
  BN.prototype.maskn = function maskn (bits) {
    return this.clone().imaskn(bits);
  };

  // Add plain number `num` to `this`
  BN.prototype.iaddn = function iaddn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num);

    // Possible sign change
    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) < num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    }

    // Add without checks
    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn (num) {
    this.words[0] += num;

    // Carry
    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;
      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }
    this.length = Math.max(this.length, i + 1);

    return this;
  };

  // Subtract plain number `num` from `this`
  BN.prototype.isubn = function isubn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this.strip();
  };

  BN.prototype.addn = function addn (num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn (num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs () {
    this.negative = 0;

    return this;
  };

  BN.prototype.abs = function abs () {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;
    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - ((right / 0x4000000) | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }
    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this.strip();

    // Subtraction overflow
    assert(carry === -1);
    carry = 0;
    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }
    this.negative = 1;

    return this.strip();
  };

  BN.prototype._wordDiv = function _wordDiv (num, mode) {
    var shift = this.length - num.length;

    var a = this.clone();
    var b = num;

    // Normalize
    var bhi = b.words[b.length - 1] | 0;
    var bhiBits = this._countBits(bhi);
    shift = 26 - bhiBits;
    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    }

    // Initialize quotient
    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);
      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);
    if (diff.negative === 0) {
      a = diff;
      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
        (a.words[b.length + j - 1] | 0);

      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)
      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);
      while (a.negative !== 0) {
        qj--;
        a.negative = 0;
        a._ishlnsubmul(b, 1, j);
        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }
      if (q) {
        q.words[j] = qj;
      }
    }
    if (q) {
      q.strip();
    }
    a.strip();

    // Denormalize
    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  };

  // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested
  BN.prototype.divmod = function divmod (num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;
    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    }

    // Both numbers are positive at this point

    // Strip both numbers to approximate shift value
    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    }

    // Very short reduction
    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  };

  // Find `this` / `num`
  BN.prototype.div = function div (num) {
    return this.divmod(num, 'div', false).div;
  };

  // Find `this` % `num`
  BN.prototype.mod = function mod (num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod (num) {
    return this.divmod(num, 'mod', true).mod;
  };

  // Find Round(`this` / `num`)
  BN.prototype.divRound = function divRound (num) {
    var dm = this.divmod(num);

    // Fast case - exact division
    if (dm.mod.isZero()) return dm.div;

    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half);

    // Round down
    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

    // Round up
    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modn = function modn (num) {
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;

    var acc = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return acc;
  };

  // In-place division by number
  BN.prototype.idivn = function idivn (num) {
    assert(num <= 0x3ffffff);

    var carry = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = (w / num) | 0;
      carry = w % num;
    }

    return this.strip();
  };

  BN.prototype.divn = function divn (num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    }

    // A * x + B * y = x
    var A = new BN(1);
    var B = new BN(0);

    // C * x + D * y = y
    var C = new BN(0);
    var D = new BN(1);

    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        x.iushrn(i);
        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        y.iushrn(j);
        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  };

  // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed
  BN.prototype._invmp = function _invmp (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);

    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        a.iushrn(i);
        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        b.iushrn(j);
        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;
    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd (num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();

    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0;

    // Remove common factor of two
    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }
      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);
      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  };

  // Invert number in the field F(num)
  BN.prototype.invm = function invm (num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven () {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd () {
    return (this.words[0] & 1) === 1;
  };

  // And first word and num
  BN.prototype.andln = function andln (num) {
    return this.words[0] & num;
  };

  // Increment at the bit position in-line
  BN.prototype.bincn = function bincn (bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) {
      this._expand(s + 1);
      this.words[s] |= q;
      return this;
    }

    // Add bit and propagate, if needed
    var carry = q;
    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };

  BN.prototype.isZero = function isZero () {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn (num) {
    var negative = num < 0;

    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;

    this.strip();

    var res;
    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');

      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`
  BN.prototype.cmp = function cmp (num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;

    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Unsigned comparison
  BN.prototype.ucmp = function ucmp (num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;

    var res = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;

      if (a === b) continue;
      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }
      break;
    }
    return res;
  };

  BN.prototype.gtn = function gtn (num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt (num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten (num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte (num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn (num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt (num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten (num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte (num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn (num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq (num) {
    return this.cmp(num) === 0;
  };

  //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //
  BN.red = function red (num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed () {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed (ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd (num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd (num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub (num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub (num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl (num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr () {
    assert(this.red, 'redSqr works only with red numbers');
    this.red._verify1(this);
    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr () {
    assert(this.red, 'redISqr works only with red numbers');
    this.red._verify1(this);
    return this.red.isqr(this);
  };

  // Square root over p
  BN.prototype.redSqrt = function redSqrt () {
    assert(this.red, 'redSqrt works only with red numbers');
    this.red._verify1(this);
    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm () {
    assert(this.red, 'redInvm works only with red numbers');
    this.red._verify1(this);
    return this.red.invm(this);
  };

  // Return negative clone of `this` % `red modulo`
  BN.prototype.redNeg = function redNeg () {
    assert(this.red, 'redNeg works only with red numbers');
    this.red._verify1(this);
    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow (num) {
    assert(this.red && !num.red, 'redPow(normalNum)');
    this.red._verify1(this);
    return this.red.pow(this, num);
  };

  // Prime numbers with efficient reduction
  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  };

  // Pseudo-Mersenne prime
  function MPrime (name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);

    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp () {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce (num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      r.strip();
    }

    return r;
  };

  MPrime.prototype.split = function split (input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK (num) {
    return num.imul(this.k);
  };

  function K256 () {
    MPrime.call(
      this,
      'k256',
      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }
  inherits(K256, MPrime);

  K256.prototype.split = function split (input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;

    var outLen = Math.min(input.length, 9);
    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }
    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    }

    // Shift by 9 limbs
    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
      prev = next;
    }
    prev >>>= 22;
    input.words[i - 10] = prev;
    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK (num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2;

    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
    var lo = 0;
    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + ((lo / 0x4000000) | 0);
    }

    // Fast length reduction
    if (num.words[num.length - 1] === 0) {
      num.length--;
      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }
    return num;
  };

  function P224 () {
    MPrime.call(
      this,
      'p224',
      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }
  inherits(P224, MPrime);

  function P192 () {
    MPrime.call(
      this,
      'p192',
      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }
  inherits(P192, MPrime);

  function P25519 () {
    // 2 ^ 255 - 19
    MPrime.call(
      this,
      '25519',
      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }
  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK (num) {
    // K = 0x13
    var carry = 0;
    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;

      num.words[i] = lo;
      carry = hi;
    }
    if (carry !== 0) {
      num.words[num.length++] = carry;
    }
    return num;
  };

  // Exported mostly for testing purposes, use plain name instead
  BN._prime = function prime (name) {
    // Cached version of prime
    if (primes[name]) return primes[name];

    var prime;
    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }
    primes[name] = prime;

    return prime;
  };

  //
  // Base reduction engine
  //
  function Red (m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);
      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1 (a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2 (a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red,
      'red works only with red numbers');
  };

  Red.prototype.imod = function imod (a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    return a.umod(this.m)._forceRed(this);
  };

  Red.prototype.neg = function neg (a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add (a, b) {
    this._verify2(a, b);

    var res = a.add(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd (a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res;
  };

  Red.prototype.sub = function sub (a, b) {
    this._verify2(a, b);

    var res = a.sub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.isub = function isub (a, b) {
    this._verify2(a, b);

    var res = a.isub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res;
  };

  Red.prototype.shl = function shl (a, num) {
    this._verify1(a);
    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul (a, b) {
    this._verify2(a, b);
    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul (a, b) {
    this._verify2(a, b);
    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr (a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr (a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt (a) {
    if (a.isZero()) return a.clone();

    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1);

    // Fast case
    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    }

    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)
    var q = this.m.subn(1);
    var s = 0;
    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }
    assert(!q.isZero());

    var one = new BN(1).toRed(this);
    var nOne = one.redNeg();

    // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.
    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;
    while (t.cmp(one) !== 0) {
      var tmp = t;
      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }
      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));

      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm (a) {
    var inv = a._invmp(this.m);
    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow (a, num) {
    if (num.isZero()) return new BN(1);
    if (num.cmpn(1) === 0) return a.clone();

    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;
    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;
    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];
      for (var j = start - 1; j >= 0; j--) {
        var bit = (word >> j) & 1;
        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }
      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo (num) {
    var r = num.umod(this.m);

    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom (num) {
    var res = num.clone();
    res.red = null;
    return res;
  };

  //
  // Montgomery method engine
  //

  BN.mont = function mont (num) {
    return new Mont(num);
  };

  function Mont (m) {
    Red.call(this, m);

    this.shift = this.m.bitLength();
    if (this.shift % 26 !== 0) {
      this.shift += 26 - (this.shift % 26);
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);

    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }
  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo (num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom (num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul (a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul (a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm (a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})(typeof module === 'undefined' || module, this);

},{}],355:[function(require,module,exports){
var r;

module.exports = function rand(len) {
  if (!r)
    r = new Rand(null);

  return r.generate(len);
};

function Rand(rand) {
  this.rand = rand;
}
module.exports.Rand = Rand;

Rand.prototype.generate = function generate(len) {
  return this._rand(len);
};

if (typeof window === 'object') {
  if (window.crypto && window.crypto.getRandomValues) {
    // Modern browsers
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      window.crypto.getRandomValues(arr);
      return arr;
    };
  } else if (window.msCrypto && window.msCrypto.getRandomValues) {
    // IE
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      window.msCrypto.getRandomValues(arr);
      return arr;
    };
  } else {
    // Old junk
    Rand.prototype._rand = function() {
      throw new Error('Not implemented yet');
    };
  }
} else {
  // Node.js or Web worker
  try {
    var crypto = require('cry' + 'pto');

    Rand.prototype._rand = function _rand(n) {
      return crypto.randomBytes(n);
    };
  } catch (e) {
    // Emulate crypto API using randy
    Rand.prototype._rand = function _rand(n) {
      var res = new Uint8Array(n);
      for (var i = 0; i < res.length; i++)
        res[i] = this.rand.getByte();
      return res;
    };
  }
}

},{}],356:[function(require,module,exports){
var basex = require('base-x')
var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
var base58 = basex(ALPHABET)

module.exports = {
  encode: base58.encode,
  decode: base58.decode
}

},{"base-x":353}],357:[function(require,module,exports){
'use strict';

var elliptic = exports;

elliptic.version = require('../package.json').version;
elliptic.utils = require('./elliptic/utils');
elliptic.rand = require('brorand');
elliptic.hmacDRBG = require('./elliptic/hmac-drbg');
elliptic.curve = require('./elliptic/curve');
elliptic.curves = require('./elliptic/curves');

// Protocols
elliptic.ec = require('./elliptic/ec');
elliptic.eddsa = require('./elliptic/eddsa');

},{"../package.json":373,"./elliptic/curve":360,"./elliptic/curves":363,"./elliptic/ec":364,"./elliptic/eddsa":367,"./elliptic/hmac-drbg":370,"./elliptic/utils":372,"brorand":355}],358:[function(require,module,exports){
'use strict';

var BN = require('bn.js');
var elliptic = require('../../elliptic');
var utils = elliptic.utils;
var getNAF = utils.getNAF;
var getJSF = utils.getJSF;
var assert = utils.assert;

function BaseCurve(type, conf) {
  this.type = type;
  this.p = new BN(conf.p, 16);

  // Use Montgomery, when there is no fast reduction for the prime
  this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);

  // Useful for many curves
  this.zero = new BN(0).toRed(this.red);
  this.one = new BN(1).toRed(this.red);
  this.two = new BN(2).toRed(this.red);

  // Curve configuration, optional
  this.n = conf.n && new BN(conf.n, 16);
  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

  // Temporary arrays
  this._wnafT1 = new Array(4);
  this._wnafT2 = new Array(4);
  this._wnafT3 = new Array(4);
  this._wnafT4 = new Array(4);

  // Generalized Greg Maxwell's trick
  var adjustCount = this.n && this.p.div(this.n);
  if (!adjustCount || adjustCount.cmpn(100) > 0) {
    this.redN = null;
  } else {
    this._maxwellTrick = true;
    this.redN = this.n.toRed(this.red);
  }
}
module.exports = BaseCurve;

BaseCurve.prototype.point = function point() {
  throw new Error('Not implemented');
};

BaseCurve.prototype.validate = function validate() {
  throw new Error('Not implemented');
};

BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
  assert(p.precomputed);
  var doubles = p._getDoubles();

  var naf = getNAF(k, 1);
  var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
  I /= 3;

  // Translate into more windowed form
  var repr = [];
  for (var j = 0; j < naf.length; j += doubles.step) {
    var nafW = 0;
    for (var k = j + doubles.step - 1; k >= j; k--)
      nafW = (nafW << 1) + naf[k];
    repr.push(nafW);
  }

  var a = this.jpoint(null, null, null);
  var b = this.jpoint(null, null, null);
  for (var i = I; i > 0; i--) {
    for (var j = 0; j < repr.length; j++) {
      var nafW = repr[j];
      if (nafW === i)
        b = b.mixedAdd(doubles.points[j]);
      else if (nafW === -i)
        b = b.mixedAdd(doubles.points[j].neg());
    }
    a = a.add(b);
  }
  return a.toP();
};

BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
  var w = 4;

  // Precompute window
  var nafPoints = p._getNAFPoints(w);
  w = nafPoints.wnd;
  var wnd = nafPoints.points;

  // Get NAF form
  var naf = getNAF(k, w);

  // Add `this`*(N+1) for every w-NAF index
  var acc = this.jpoint(null, null, null);
  for (var i = naf.length - 1; i >= 0; i--) {
    // Count zeroes
    for (var k = 0; i >= 0 && naf[i] === 0; i--)
      k++;
    if (i >= 0)
      k++;
    acc = acc.dblp(k);

    if (i < 0)
      break;
    var z = naf[i];
    assert(z !== 0);
    if (p.type === 'affine') {
      // J +- P
      if (z > 0)
        acc = acc.mixedAdd(wnd[(z - 1) >> 1]);
      else
        acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg());
    } else {
      // J +- J
      if (z > 0)
        acc = acc.add(wnd[(z - 1) >> 1]);
      else
        acc = acc.add(wnd[(-z - 1) >> 1].neg());
    }
  }
  return p.type === 'affine' ? acc.toP() : acc;
};

BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
                                                       points,
                                                       coeffs,
                                                       len,
                                                       jacobianResult) {
  var wndWidth = this._wnafT1;
  var wnd = this._wnafT2;
  var naf = this._wnafT3;

  // Fill all arrays
  var max = 0;
  for (var i = 0; i < len; i++) {
    var p = points[i];
    var nafPoints = p._getNAFPoints(defW);
    wndWidth[i] = nafPoints.wnd;
    wnd[i] = nafPoints.points;
  }

  // Comb small window NAFs
  for (var i = len - 1; i >= 1; i -= 2) {
    var a = i - 1;
    var b = i;
    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
      naf[a] = getNAF(coeffs[a], wndWidth[a]);
      naf[b] = getNAF(coeffs[b], wndWidth[b]);
      max = Math.max(naf[a].length, max);
      max = Math.max(naf[b].length, max);
      continue;
    }

    var comb = [
      points[a], /* 1 */
      null, /* 3 */
      null, /* 5 */
      points[b] /* 7 */
    ];

    // Try to avoid Projective points, if possible
    if (points[a].y.cmp(points[b].y) === 0) {
      comb[1] = points[a].add(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].add(points[b].neg());
    } else {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    }

    var index = [
      -3, /* -1 -1 */
      -1, /* -1 0 */
      -5, /* -1 1 */
      -7, /* 0 -1 */
      0, /* 0 0 */
      7, /* 0 1 */
      5, /* 1 -1 */
      1, /* 1 0 */
      3  /* 1 1 */
    ];

    var jsf = getJSF(coeffs[a], coeffs[b]);
    max = Math.max(jsf[0].length, max);
    naf[a] = new Array(max);
    naf[b] = new Array(max);
    for (var j = 0; j < max; j++) {
      var ja = jsf[0][j] | 0;
      var jb = jsf[1][j] | 0;

      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
      naf[b][j] = 0;
      wnd[a] = comb;
    }
  }

  var acc = this.jpoint(null, null, null);
  var tmp = this._wnafT4;
  for (var i = max; i >= 0; i--) {
    var k = 0;

    while (i >= 0) {
      var zero = true;
      for (var j = 0; j < len; j++) {
        tmp[j] = naf[j][i] | 0;
        if (tmp[j] !== 0)
          zero = false;
      }
      if (!zero)
        break;
      k++;
      i--;
    }
    if (i >= 0)
      k++;
    acc = acc.dblp(k);
    if (i < 0)
      break;

    for (var j = 0; j < len; j++) {
      var z = tmp[j];
      var p;
      if (z === 0)
        continue;
      else if (z > 0)
        p = wnd[j][(z - 1) >> 1];
      else if (z < 0)
        p = wnd[j][(-z - 1) >> 1].neg();

      if (p.type === 'affine')
        acc = acc.mixedAdd(p);
      else
        acc = acc.add(p);
    }
  }
  // Zeroify references
  for (var i = 0; i < len; i++)
    wnd[i] = null;

  if (jacobianResult)
    return acc;
  else
    return acc.toP();
};

function BasePoint(curve, type) {
  this.curve = curve;
  this.type = type;
  this.precomputed = null;
}
BaseCurve.BasePoint = BasePoint;

BasePoint.prototype.eq = function eq(/*other*/) {
  throw new Error('Not implemented');
};

BasePoint.prototype.validate = function validate() {
  return this.curve.validate(this);
};

BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  bytes = utils.toArray(bytes, enc);

  var len = this.p.byteLength();

  // uncompressed, hybrid-odd, hybrid-even
  if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
      bytes.length - 1 === 2 * len) {
    if (bytes[0] === 0x06)
      assert(bytes[bytes.length - 1] % 2 === 0);
    else if (bytes[0] === 0x07)
      assert(bytes[bytes.length - 1] % 2 === 1);

    var res =  this.point(bytes.slice(1, 1 + len),
                          bytes.slice(1 + len, 1 + 2 * len));

    return res;
  } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
              bytes.length - 1 === len) {
    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
  }
  throw new Error('Unknown point format');
};

BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
  return this.encode(enc, true);
};

BasePoint.prototype._encode = function _encode(compact) {
  var len = this.curve.p.byteLength();
  var x = this.getX().toArray('be', len);

  if (compact)
    return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x);

  return [ 0x04 ].concat(x, this.getY().toArray('be', len)) ;
};

BasePoint.prototype.encode = function encode(enc, compact) {
  return utils.encode(this._encode(compact), enc);
};

BasePoint.prototype.precompute = function precompute(power) {
  if (this.precomputed)
    return this;

  var precomputed = {
    doubles: null,
    naf: null,
    beta: null
  };
  precomputed.naf = this._getNAFPoints(8);
  precomputed.doubles = this._getDoubles(4, power);
  precomputed.beta = this._getBeta();
  this.precomputed = precomputed;

  return this;
};

BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
  if (!this.precomputed)
    return false;

  var doubles = this.precomputed.doubles;
  if (!doubles)
    return false;

  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
};

BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;

  var doubles = [ this ];
  var acc = this;
  for (var i = 0; i < power; i += step) {
    for (var j = 0; j < step; j++)
      acc = acc.dbl();
    doubles.push(acc);
  }
  return {
    step: step,
    points: doubles
  };
};

BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;

  var res = [ this ];
  var max = (1 << wnd) - 1;
  var dbl = max === 1 ? null : this.dbl();
  for (var i = 1; i < max; i++)
    res[i] = res[i - 1].add(dbl);
  return {
    wnd: wnd,
    points: res
  };
};

BasePoint.prototype._getBeta = function _getBeta() {
  return null;
};

BasePoint.prototype.dblp = function dblp(k) {
  var r = this;
  for (var i = 0; i < k; i++)
    r = r.dbl();
  return r;
};

},{"../../elliptic":357,"bn.js":354}],359:[function(require,module,exports){
'use strict';

var curve = require('../curve');
var elliptic = require('../../elliptic');
var BN = require('bn.js');
var inherits = require('inherits');
var Base = curve.base;

var assert = elliptic.utils.assert;

function EdwardsCurve(conf) {
  // NOTE: Important as we are creating point in Base.call()
  this.twisted = (conf.a | 0) !== 1;
  this.mOneA = this.twisted && (conf.a | 0) === -1;
  this.extended = this.mOneA;

  Base.call(this, 'edwards', conf);

  this.a = new BN(conf.a, 16).umod(this.red.m);
  this.a = this.a.toRed(this.red);
  this.c = new BN(conf.c, 16).toRed(this.red);
  this.c2 = this.c.redSqr();
  this.d = new BN(conf.d, 16).toRed(this.red);
  this.dd = this.d.redAdd(this.d);

  assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
  this.oneC = (conf.c | 0) === 1;
}
inherits(EdwardsCurve, Base);
module.exports = EdwardsCurve;

EdwardsCurve.prototype._mulA = function _mulA(num) {
  if (this.mOneA)
    return num.redNeg();
  else
    return this.a.redMul(num);
};

EdwardsCurve.prototype._mulC = function _mulC(num) {
  if (this.oneC)
    return num;
  else
    return this.c.redMul(num);
};

// Just for compatibility with Short curve
EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
  return this.point(x, y, z, t);
};

EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var x2 = x.redSqr();
  var rhs = this.c2.redSub(this.a.redMul(x2));
  var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));

  var y2 = rhs.redMul(lhs.redInvm());
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
  y = new BN(y, 16);
  if (!y.red)
    y = y.toRed(this.red);

  // x^2 = (y^2 - 1) / (d y^2 + 1)
  var y2 = y.redSqr();
  var lhs = y2.redSub(this.one);
  var rhs = y2.redMul(this.d).redAdd(this.one);
  var x2 = lhs.redMul(rhs.redInvm());

  if (x2.cmp(this.zero) === 0) {
    if (odd)
      throw new Error('invalid point');
    else
      return this.point(this.zero, y);
  }

  var x = x2.redSqrt();
  if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  if (x.isOdd() !== odd)
    x = x.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.validate = function validate(point) {
  if (point.isInfinity())
    return true;

  // Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
  point.normalize();

  var x2 = point.x.redSqr();
  var y2 = point.y.redSqr();
  var lhs = x2.redMul(this.a).redAdd(y2);
  var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));

  return lhs.cmp(rhs) === 0;
};

function Point(curve, x, y, z, t) {
  Base.BasePoint.call(this, curve, 'projective');
  if (x === null && y === null && z === null) {
    this.x = this.curve.zero;
    this.y = this.curve.one;
    this.z = this.curve.one;
    this.t = this.curve.zero;
    this.zOne = true;
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    this.z = z ? new BN(z, 16) : this.curve.one;
    this.t = t && new BN(t, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
    if (this.t && !this.t.red)
      this.t = this.t.toRed(this.curve.red);
    this.zOne = this.z === this.curve.one;

    // Use extended coordinates
    if (this.curve.extended && !this.t) {
      this.t = this.x.redMul(this.y);
      if (!this.zOne)
        this.t = this.t.redMul(this.z.redInvm());
    }
  }
}
inherits(Point, Base.BasePoint);

EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point.fromJSON(this, obj);
};

EdwardsCurve.prototype.point = function point(x, y, z, t) {
  return new Point(this, x, y, z, t);
};

Point.fromJSON = function fromJSON(curve, obj) {
  return new Point(curve, obj[0], obj[1], obj[2]);
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.x.cmpn(0) === 0 &&
         this.y.cmp(this.z) === 0;
};

Point.prototype._extDbl = function _extDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #doubling-dbl-2008-hwcd
  // 4M + 4S

  // A = X1^2
  var a = this.x.redSqr();
  // B = Y1^2
  var b = this.y.redSqr();
  // C = 2 * Z1^2
  var c = this.z.redSqr();
  c = c.redIAdd(c);
  // D = a * A
  var d = this.curve._mulA(a);
  // E = (X1 + Y1)^2 - A - B
  var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
  // G = D + B
  var g = d.redAdd(b);
  // F = G - C
  var f = g.redSub(c);
  // H = D - B
  var h = d.redSub(b);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projDbl = function _projDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #doubling-dbl-2008-bbjlp
  //     #doubling-dbl-2007-bl
  // and others
  // Generally 3M + 4S or 2M + 4S

  // B = (X1 + Y1)^2
  var b = this.x.redAdd(this.y).redSqr();
  // C = X1^2
  var c = this.x.redSqr();
  // D = Y1^2
  var d = this.y.redSqr();

  var nx;
  var ny;
  var nz;
  if (this.curve.twisted) {
    // E = a * C
    var e = this.curve._mulA(c);
    // F = E + D
    var f = e.redAdd(d);
    if (this.zOne) {
      // X3 = (B - C - D) * (F - 2)
      nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F^2 - 2 * F
      nz = f.redSqr().redSub(f).redSub(f);
    } else {
      // H = Z1^2
      var h = this.z.redSqr();
      // J = F - 2 * H
      var j = f.redSub(h).redISub(h);
      // X3 = (B-C-D)*J
      nx = b.redSub(c).redISub(d).redMul(j);
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F * J
      nz = f.redMul(j);
    }
  } else {
    // E = C + D
    var e = c.redAdd(d);
    // H = (c * Z1)^2
    var h = this.curve._mulC(this.c.redMul(this.z)).redSqr();
    // J = E - 2 * H
    var j = e.redSub(h).redSub(h);
    // X3 = c * (B - E) * J
    nx = this.curve._mulC(b.redISub(e)).redMul(j);
    // Y3 = c * E * (C - D)
    ny = this.curve._mulC(e).redMul(c.redISub(d));
    // Z3 = E * J
    nz = e.redMul(j);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  // Double in extended coordinates
  if (this.curve.extended)
    return this._extDbl();
  else
    return this._projDbl();
};

Point.prototype._extAdd = function _extAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #addition-add-2008-hwcd-3
  // 8M

  // A = (Y1 - X1) * (Y2 - X2)
  var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
  // B = (Y1 + X1) * (Y2 + X2)
  var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
  // C = T1 * k * T2
  var c = this.t.redMul(this.curve.dd).redMul(p.t);
  // D = Z1 * 2 * Z2
  var d = this.z.redMul(p.z.redAdd(p.z));
  // E = B - A
  var e = b.redSub(a);
  // F = D - C
  var f = d.redSub(c);
  // G = D + C
  var g = d.redAdd(c);
  // H = B + A
  var h = b.redAdd(a);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projAdd = function _projAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #addition-add-2008-bbjlp
  //     #addition-add-2007-bl
  // 10M + 1S

  // A = Z1 * Z2
  var a = this.z.redMul(p.z);
  // B = A^2
  var b = a.redSqr();
  // C = X1 * X2
  var c = this.x.redMul(p.x);
  // D = Y1 * Y2
  var d = this.y.redMul(p.y);
  // E = d * C * D
  var e = this.curve.d.redMul(c).redMul(d);
  // F = B - E
  var f = b.redSub(e);
  // G = B + E
  var g = b.redAdd(e);
  // X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
  var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
  var nx = a.redMul(f).redMul(tmp);
  var ny;
  var nz;
  if (this.curve.twisted) {
    // Y3 = A * G * (D - a * C)
    ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
    // Z3 = F * G
    nz = f.redMul(g);
  } else {
    // Y3 = A * G * (D - C)
    ny = a.redMul(g).redMul(d.redSub(c));
    // Z3 = c * F * G
    nz = this.curve._mulC(f).redMul(g);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.add = function add(p) {
  if (this.isInfinity())
    return p;
  if (p.isInfinity())
    return this;

  if (this.curve.extended)
    return this._extAdd(p);
  else
    return this._projAdd(p);
};

Point.prototype.mul = function mul(k) {
  if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else
    return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, false);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, true);
};

Point.prototype.normalize = function normalize() {
  if (this.zOne)
    return this;

  // Normalize coordinates
  var zi = this.z.redInvm();
  this.x = this.x.redMul(zi);
  this.y = this.y.redMul(zi);
  if (this.t)
    this.t = this.t.redMul(zi);
  this.z = this.curve.one;
  this.zOne = true;
  return this;
};

Point.prototype.neg = function neg() {
  return this.curve.point(this.x.redNeg(),
                          this.y,
                          this.z,
                          this.t && this.t.redNeg());
};

Point.prototype.getX = function getX() {
  this.normalize();
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  this.normalize();
  return this.y.fromRed();
};

Point.prototype.eq = function eq(other) {
  return this === other ||
         this.getX().cmp(other.getX()) === 0 &&
         this.getY().cmp(other.getY()) === 0;
};

Point.prototype.eqXToP = function eqXToP(x) {
  var rx = x.toRed(this.curve.red).redMul(this.z);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(this.z);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
  return false;
};

// Compatibility with BaseCurve
Point.prototype.toP = Point.prototype.normalize;
Point.prototype.mixedAdd = Point.prototype.add;

},{"../../elliptic":357,"../curve":360,"bn.js":354,"inherits":380}],360:[function(require,module,exports){
'use strict';

var curve = exports;

curve.base = require('./base');
curve.short = require('./short');
curve.mont = require('./mont');
curve.edwards = require('./edwards');

},{"./base":358,"./edwards":359,"./mont":361,"./short":362}],361:[function(require,module,exports){
'use strict';

var curve = require('../curve');
var BN = require('bn.js');
var inherits = require('inherits');
var Base = curve.base;

var elliptic = require('../../elliptic');
var utils = elliptic.utils;

function MontCurve(conf) {
  Base.call(this, 'mont', conf);

  this.a = new BN(conf.a, 16).toRed(this.red);
  this.b = new BN(conf.b, 16).toRed(this.red);
  this.i4 = new BN(4).toRed(this.red).redInvm();
  this.two = new BN(2).toRed(this.red);
  this.a24 = this.i4.redMul(this.a.redAdd(this.two));
}
inherits(MontCurve, Base);
module.exports = MontCurve;

MontCurve.prototype.validate = function validate(point) {
  var x = point.normalize().x;
  var x2 = x.redSqr();
  var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
  var y = rhs.redSqrt();

  return y.redSqr().cmp(rhs) === 0;
};

function Point(curve, x, z) {
  Base.BasePoint.call(this, curve, 'projective');
  if (x === null && z === null) {
    this.x = this.curve.one;
    this.z = this.curve.zero;
  } else {
    this.x = new BN(x, 16);
    this.z = new BN(z, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
  }
}
inherits(Point, Base.BasePoint);

MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  return this.point(utils.toArray(bytes, enc), 1);
};

MontCurve.prototype.point = function point(x, z) {
  return new Point(this, x, z);
};

MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point.fromJSON(this, obj);
};

Point.prototype.precompute = function precompute() {
  // No-op
};

Point.prototype._encode = function _encode() {
  return this.getX().toArray('be', this.curve.p.byteLength());
};

Point.fromJSON = function fromJSON(curve, obj) {
  return new Point(curve, obj[0], obj[1] || curve.one);
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};

Point.prototype.dbl = function dbl() {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
  // 2M + 2S + 4A

  // A = X1 + Z1
  var a = this.x.redAdd(this.z);
  // AA = A^2
  var aa = a.redSqr();
  // B = X1 - Z1
  var b = this.x.redSub(this.z);
  // BB = B^2
  var bb = b.redSqr();
  // C = AA - BB
  var c = aa.redSub(bb);
  // X3 = AA * BB
  var nx = aa.redMul(bb);
  // Z3 = C * (BB + A24 * C)
  var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
  return this.curve.point(nx, nz);
};

Point.prototype.add = function add() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.diffAdd = function diffAdd(p, diff) {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
  // 4M + 2S + 6A

  // A = X2 + Z2
  var a = this.x.redAdd(this.z);
  // B = X2 - Z2
  var b = this.x.redSub(this.z);
  // C = X3 + Z3
  var c = p.x.redAdd(p.z);
  // D = X3 - Z3
  var d = p.x.redSub(p.z);
  // DA = D * A
  var da = d.redMul(a);
  // CB = C * B
  var cb = c.redMul(b);
  // X5 = Z1 * (DA + CB)^2
  var nx = diff.z.redMul(da.redAdd(cb).redSqr());
  // Z5 = X1 * (DA - CB)^2
  var nz = diff.x.redMul(da.redISub(cb).redSqr());
  return this.curve.point(nx, nz);
};

Point.prototype.mul = function mul(k) {
  var t = k.clone();
  var a = this; // (N / 2) * Q + Q
  var b = this.curve.point(null, null); // (N / 2) * Q
  var c = this; // Q

  for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
    bits.push(t.andln(1));

  for (var i = bits.length - 1; i >= 0; i--) {
    if (bits[i] === 0) {
      // N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
      a = a.diffAdd(b, c);
      // N * Q = 2 * ((N / 2) * Q + Q))
      b = b.dbl();
    } else {
      // N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
      b = a.diffAdd(b, c);
      // N * Q + Q = 2 * ((N / 2) * Q + Q)
      a = a.dbl();
    }
  }
  return b;
};

Point.prototype.mulAdd = function mulAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.jumlAdd = function jumlAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.eq = function eq(other) {
  return this.getX().cmp(other.getX()) === 0;
};

Point.prototype.normalize = function normalize() {
  this.x = this.x.redMul(this.z.redInvm());
  this.z = this.curve.one;
  return this;
};

Point.prototype.getX = function getX() {
  // Normalize coordinates
  this.normalize();

  return this.x.fromRed();
};

},{"../../elliptic":357,"../curve":360,"bn.js":354,"inherits":380}],362:[function(require,module,exports){
'use strict';

var curve = require('../curve');
var elliptic = require('../../elliptic');
var BN = require('bn.js');
var inherits = require('inherits');
var Base = curve.base;

var assert = elliptic.utils.assert;

function ShortCurve(conf) {
  Base.call(this, 'short', conf);

  this.a = new BN(conf.a, 16).toRed(this.red);
  this.b = new BN(conf.b, 16).toRed(this.red);
  this.tinv = this.two.redInvm();

  this.zeroA = this.a.fromRed().cmpn(0) === 0;
  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

  // If the curve is endomorphic, precalculate beta and lambda
  this.endo = this._getEndomorphism(conf);
  this._endoWnafT1 = new Array(4);
  this._endoWnafT2 = new Array(4);
}
inherits(ShortCurve, Base);
module.exports = ShortCurve;

ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
  // No efficient endomorphism
  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
    return;

  // Compute beta and lambda, that lambda * P = (beta * Px; Py)
  var beta;
  var lambda;
  if (conf.beta) {
    beta = new BN(conf.beta, 16).toRed(this.red);
  } else {
    var betas = this._getEndoRoots(this.p);
    // Choose the smallest beta
    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
    beta = beta.toRed(this.red);
  }
  if (conf.lambda) {
    lambda = new BN(conf.lambda, 16);
  } else {
    // Choose the lambda that is matching selected beta
    var lambdas = this._getEndoRoots(this.n);
    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
      lambda = lambdas[0];
    } else {
      lambda = lambdas[1];
      assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
    }
  }

  // Get basis vectors, used for balanced length-two representation
  var basis;
  if (conf.basis) {
    basis = conf.basis.map(function(vec) {
      return {
        a: new BN(vec.a, 16),
        b: new BN(vec.b, 16)
      };
    });
  } else {
    basis = this._getEndoBasis(lambda);
  }

  return {
    beta: beta,
    lambda: lambda,
    basis: basis
  };
};

ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
  // Find roots of for x^2 + x + 1 in F
  // Root = (-1 +- Sqrt(-3)) / 2
  //
  var red = num === this.p ? this.red : BN.mont(num);
  var tinv = new BN(2).toRed(red).redInvm();
  var ntinv = tinv.redNeg();

  var s = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);

  var l1 = ntinv.redAdd(s).fromRed();
  var l2 = ntinv.redSub(s).fromRed();
  return [ l1, l2 ];
};

ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
  // aprxSqrt >= sqrt(this.n)
  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

  // 3.74
  // Run EGCD, until r(L + 1) < aprxSqrt
  var u = lambda;
  var v = this.n.clone();
  var x1 = new BN(1);
  var y1 = new BN(0);
  var x2 = new BN(0);
  var y2 = new BN(1);

  // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
  var a0;
  var b0;
  // First vector
  var a1;
  var b1;
  // Second vector
  var a2;
  var b2;

  var prevR;
  var i = 0;
  var r;
  var x;
  while (u.cmpn(0) !== 0) {
    var q = v.div(u);
    r = v.sub(q.mul(u));
    x = x2.sub(q.mul(x1));
    var y = y2.sub(q.mul(y1));

    if (!a1 && r.cmp(aprxSqrt) < 0) {
      a0 = prevR.neg();
      b0 = x1;
      a1 = r.neg();
      b1 = x;
    } else if (a1 && ++i === 2) {
      break;
    }
    prevR = r;

    v = u;
    u = r;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
  }
  a2 = r.neg();
  b2 = x;

  var len1 = a1.sqr().add(b1.sqr());
  var len2 = a2.sqr().add(b2.sqr());
  if (len2.cmp(len1) >= 0) {
    a2 = a0;
    b2 = b0;
  }

  // Normalize signs
  if (a1.negative) {
    a1 = a1.neg();
    b1 = b1.neg();
  }
  if (a2.negative) {
    a2 = a2.neg();
    b2 = b2.neg();
  }

  return [
    { a: a1, b: b1 },
    { a: a2, b: b2 }
  ];
};

ShortCurve.prototype._endoSplit = function _endoSplit(k) {
  var basis = this.endo.basis;
  var v1 = basis[0];
  var v2 = basis[1];

  var c1 = v2.b.mul(k).divRound(this.n);
  var c2 = v1.b.neg().mul(k).divRound(this.n);

  var p1 = c1.mul(v1.a);
  var p2 = c2.mul(v2.a);
  var q1 = c1.mul(v1.b);
  var q2 = c2.mul(v2.b);

  // Calculate answer
  var k1 = k.sub(p1).sub(p2);
  var k2 = q1.add(q2).neg();
  return { k1: k1, k2: k2 };
};

ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  // XXX Is there any way to tell if the number is odd without converting it
  // to non-red form?
  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

ShortCurve.prototype.validate = function validate(point) {
  if (point.inf)
    return true;

  var x = point.x;
  var y = point.y;

  var ax = this.a.redMul(x);
  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
  return y.redSqr().redISub(rhs).cmpn(0) === 0;
};

ShortCurve.prototype._endoWnafMulAdd =
    function _endoWnafMulAdd(points, coeffs, jacobianResult) {
  var npoints = this._endoWnafT1;
  var ncoeffs = this._endoWnafT2;
  for (var i = 0; i < points.length; i++) {
    var split = this._endoSplit(coeffs[i]);
    var p = points[i];
    var beta = p._getBeta();

    if (split.k1.negative) {
      split.k1.ineg();
      p = p.neg(true);
    }
    if (split.k2.negative) {
      split.k2.ineg();
      beta = beta.neg(true);
    }

    npoints[i * 2] = p;
    npoints[i * 2 + 1] = beta;
    ncoeffs[i * 2] = split.k1;
    ncoeffs[i * 2 + 1] = split.k2;
  }
  var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

  // Clean-up references to points and coefficients
  for (var j = 0; j < i * 2; j++) {
    npoints[j] = null;
    ncoeffs[j] = null;
  }
  return res;
};

function Point(curve, x, y, isRed) {
  Base.BasePoint.call(this, curve, 'affine');
  if (x === null && y === null) {
    this.x = null;
    this.y = null;
    this.inf = true;
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    // Force redgomery representation when loading from JSON
    if (isRed) {
      this.x.forceRed(this.curve.red);
      this.y.forceRed(this.curve.red);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    this.inf = false;
  }
}
inherits(Point, Base.BasePoint);

ShortCurve.prototype.point = function point(x, y, isRed) {
  return new Point(this, x, y, isRed);
};

ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
  return Point.fromJSON(this, obj, red);
};

Point.prototype._getBeta = function _getBeta() {
  if (!this.curve.endo)
    return;

  var pre = this.precomputed;
  if (pre && pre.beta)
    return pre.beta;

  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
  if (pre) {
    var curve = this.curve;
    var endoMul = function(p) {
      return curve.point(p.x.redMul(curve.endo.beta), p.y);
    };
    pre.beta = beta;
    beta.precomputed = {
      beta: null,
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(endoMul)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(endoMul)
      }
    };
  }
  return beta;
};

Point.prototype.toJSON = function toJSON() {
  if (!this.precomputed)
    return [ this.x, this.y ];

  return [ this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  } ];
};

Point.fromJSON = function fromJSON(curve, obj, red) {
  if (typeof obj === 'string')
    obj = JSON.parse(obj);
  var res = curve.point(obj[0], obj[1], red);
  if (!obj[2])
    return res;

  function obj2point(obj) {
    return curve.point(obj[0], obj[1], red);
  }

  var pre = obj[2];
  res.precomputed = {
    beta: null,
    doubles: pre.doubles && {
      step: pre.doubles.step,
      points: [ res ].concat(pre.doubles.points.map(obj2point))
    },
    naf: pre.naf && {
      wnd: pre.naf.wnd,
      points: [ res ].concat(pre.naf.points.map(obj2point))
    }
  };
  return res;
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  return this.inf;
};

Point.prototype.add = function add(p) {
  // O + P = P
  if (this.inf)
    return p;

  // P + O = P
  if (p.inf)
    return this;

  // P + P = 2P
  if (this.eq(p))
    return this.dbl();

  // P + (-P) = O
  if (this.neg().eq(p))
    return this.curve.point(null, null);

  // P + Q = O
  if (this.x.cmp(p.x) === 0)
    return this.curve.point(null, null);

  var c = this.y.redSub(p.y);
  if (c.cmpn(0) !== 0)
    c = c.redMul(this.x.redSub(p.x).redInvm());
  var nx = c.redSqr().redISub(this.x).redISub(p.x);
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.dbl = function dbl() {
  if (this.inf)
    return this;

  // 2P = O
  var ys1 = this.y.redAdd(this.y);
  if (ys1.cmpn(0) === 0)
    return this.curve.point(null, null);

  var a = this.curve.a;

  var x2 = this.x.redSqr();
  var dyinv = ys1.redInvm();
  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.getX = function getX() {
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  return this.y.fromRed();
};

Point.prototype.mul = function mul(k) {
  k = new BN(k, 16);

  if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else if (this.curve.endo)
    return this.curve._endoWnafMulAdd([ this ], [ k ]);
  else
    return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs, true);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
};

Point.prototype.eq = function eq(p) {
  return this === p ||
         this.inf === p.inf &&
             (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
};

Point.prototype.neg = function neg(_precompute) {
  if (this.inf)
    return this;

  var res = this.curve.point(this.x, this.y.redNeg());
  if (_precompute && this.precomputed) {
    var pre = this.precomputed;
    var negate = function(p) {
      return p.neg();
    };
    res.precomputed = {
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(negate)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(negate)
      }
    };
  }
  return res;
};

Point.prototype.toJ = function toJ() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);

  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
  return res;
};

function JPoint(curve, x, y, z) {
  Base.BasePoint.call(this, curve, 'jacobian');
  if (x === null && y === null && z === null) {
    this.x = this.curve.one;
    this.y = this.curve.one;
    this.z = new BN(0);
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    this.z = new BN(z, 16);
  }
  if (!this.x.red)
    this.x = this.x.toRed(this.curve.red);
  if (!this.y.red)
    this.y = this.y.toRed(this.curve.red);
  if (!this.z.red)
    this.z = this.z.toRed(this.curve.red);

  this.zOne = this.z === this.curve.one;
}
inherits(JPoint, Base.BasePoint);

ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
  return new JPoint(this, x, y, z);
};

JPoint.prototype.toP = function toP() {
  if (this.isInfinity())
    return this.curve.point(null, null);

  var zinv = this.z.redInvm();
  var zinv2 = zinv.redSqr();
  var ax = this.x.redMul(zinv2);
  var ay = this.y.redMul(zinv2).redMul(zinv);

  return this.curve.point(ax, ay);
};

JPoint.prototype.neg = function neg() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};

JPoint.prototype.add = function add(p) {
  // O + P = P
  if (this.isInfinity())
    return p;

  // P + O = P
  if (p.isInfinity())
    return this;

  // 12M + 4S + 7A
  var pz2 = p.z.redSqr();
  var z2 = this.z.redSqr();
  var u1 = this.x.redMul(pz2);
  var u2 = p.x.redMul(z2);
  var s1 = this.y.redMul(pz2.redMul(p.z));
  var s2 = p.y.redMul(z2.redMul(this.z));

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(p.z).redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mixedAdd = function mixedAdd(p) {
  // O + P = P
  if (this.isInfinity())
    return p.toJ();

  // P + O = P
  if (p.isInfinity())
    return this;

  // 8M + 3S + 7A
  var z2 = this.z.redSqr();
  var u1 = this.x;
  var u2 = p.x.redMul(z2);
  var s1 = this.y;
  var s2 = p.y.redMul(z2).redMul(this.z);

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.dblp = function dblp(pow) {
  if (pow === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!pow)
    return this.dbl();

  if (this.curve.zeroA || this.curve.threeA) {
    var r = this;
    for (var i = 0; i < pow; i++)
      r = r.dbl();
    return r;
  }

  // 1M + 2S + 1A + N * (4S + 5M + 8A)
  // N = 1 => 6M + 6S + 9A
  var a = this.curve.a;
  var tinv = this.curve.tinv;

  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  // Reuse results
  var jyd = jy.redAdd(jy);
  for (var i = 0; i < pow; i++) {
    var jx2 = jx.redSqr();
    var jyd2 = jyd.redSqr();
    var jyd4 = jyd2.redSqr();
    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

    var t1 = jx.redMul(jyd2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);
    var dny = c.redMul(t2);
    dny = dny.redIAdd(dny).redISub(jyd4);
    var nz = jyd.redMul(jz);
    if (i + 1 < pow)
      jz4 = jz4.redMul(jyd4);

    jx = nx;
    jz = nz;
    jyd = dny;
  }

  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
};

JPoint.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  if (this.curve.zeroA)
    return this._zeroDbl();
  else if (this.curve.threeA)
    return this._threeDbl();
  else
    return this._dbl();
};

JPoint.prototype._zeroDbl = function _zeroDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 14A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a; a = 0
    var m = xx.redAdd(xx).redIAdd(xx);
    // T = M ^ 2 - 2*S
    var t = m.redSqr().redISub(s).redISub(s);

    // 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);

    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2*Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-dbl-2009-l
    // 2M + 5S + 13A

    // A = X1^2
    var a = this.x.redSqr();
    // B = Y1^2
    var b = this.y.redSqr();
    // C = B^2
    var c = b.redSqr();
    // D = 2 * ((X1 + B)^2 - A - C)
    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
    d = d.redIAdd(d);
    // E = 3 * A
    var e = a.redAdd(a).redIAdd(a);
    // F = E^2
    var f = e.redSqr();

    // 8 * C
    var c8 = c.redIAdd(c);
    c8 = c8.redIAdd(c8);
    c8 = c8.redIAdd(c8);

    // X3 = F - 2 * D
    nx = f.redISub(d).redISub(d);
    // Y3 = E * (D - X3) - 8 * C
    ny = e.redMul(d.redISub(nx)).redISub(c8);
    // Z3 = 2 * Y1 * Z1
    nz = this.y.redMul(this.z);
    nz = nz.redIAdd(nz);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._threeDbl = function _threeDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 15A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a
    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
    // T = M^2 - 2 * S
    var t = m.redSqr().redISub(s).redISub(s);
    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2 * Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
    // 3M + 5S

    // delta = Z1^2
    var delta = this.z.redSqr();
    // gamma = Y1^2
    var gamma = this.y.redSqr();
    // beta = X1 * gamma
    var beta = this.x.redMul(gamma);
    // alpha = 3 * (X1 - delta) * (X1 + delta)
    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
    alpha = alpha.redAdd(alpha).redIAdd(alpha);
    // X3 = alpha^2 - 8 * beta
    var beta4 = beta.redIAdd(beta);
    beta4 = beta4.redIAdd(beta4);
    var beta8 = beta4.redAdd(beta4);
    nx = alpha.redSqr().redISub(beta8);
    // Z3 = (Y1 + Z1)^2 - gamma - delta
    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
    // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
    var ggamma8 = gamma.redSqr();
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._dbl = function _dbl() {
  var a = this.curve.a;

  // 4M + 6S + 10A
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  var jx2 = jx.redSqr();
  var jy2 = jy.redSqr();

  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

  var jxd4 = jx.redAdd(jx);
  jxd4 = jxd4.redIAdd(jxd4);
  var t1 = jxd4.redMul(jy2);
  var nx = c.redSqr().redISub(t1.redAdd(t1));
  var t2 = t1.redISub(nx);

  var jyd8 = jy2.redSqr();
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  var ny = c.redMul(t2).redISub(jyd8);
  var nz = jy.redAdd(jy).redMul(jz);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.trpl = function trpl() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);

  // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
  // 5M + 10S + ...

  // XX = X1^2
  var xx = this.x.redSqr();
  // YY = Y1^2
  var yy = this.y.redSqr();
  // ZZ = Z1^2
  var zz = this.z.redSqr();
  // YYYY = YY^2
  var yyyy = yy.redSqr();
  // M = 3 * XX + a * ZZ2; a = 0
  var m = xx.redAdd(xx).redIAdd(xx);
  // MM = M^2
  var mm = m.redSqr();
  // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
  e = e.redIAdd(e);
  e = e.redAdd(e).redIAdd(e);
  e = e.redISub(mm);
  // EE = E^2
  var ee = e.redSqr();
  // T = 16*YYYY
  var t = yyyy.redIAdd(yyyy);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  // U = (M + E)^2 - MM - EE - T
  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
  // X3 = 4 * (X1 * EE - 4 * YY * U)
  var yyu4 = yy.redMul(u);
  yyu4 = yyu4.redIAdd(yyu4);
  yyu4 = yyu4.redIAdd(yyu4);
  var nx = this.x.redMul(ee).redISub(yyu4);
  nx = nx.redIAdd(nx);
  nx = nx.redIAdd(nx);
  // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  // Z3 = (Z1 + E)^2 - ZZ - EE
  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mul = function mul(k, kbase) {
  k = new BN(k, kbase);

  return this.curve._wnafMul(this, k);
};

JPoint.prototype.eq = function eq(p) {
  if (p.type === 'affine')
    return this.eq(p.toJ());

  if (this === p)
    return true;

  // x1 * z2^2 == x2 * z1^2
  var z2 = this.z.redSqr();
  var pz2 = p.z.redSqr();
  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
    return false;

  // y1 * z2^3 == y2 * z1^3
  var z3 = z2.redMul(this.z);
  var pz3 = pz2.redMul(p.z);
  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
};

JPoint.prototype.eqXToP = function eqXToP(x) {
  var zs = this.z.redSqr();
  var rx = x.toRed(this.curve.red).redMul(zs);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(zs);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
  return false;
};

JPoint.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC JPoint Infinity>';
  return '<EC JPoint x: ' + this.x.toString(16, 2) +
      ' y: ' + this.y.toString(16, 2) +
      ' z: ' + this.z.toString(16, 2) + '>';
};

JPoint.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};

},{"../../elliptic":357,"../curve":360,"bn.js":354,"inherits":380}],363:[function(require,module,exports){
'use strict';

var curves = exports;

var hash = require('hash.js');
var elliptic = require('../elliptic');

var assert = elliptic.utils.assert;

function PresetCurve(options) {
  if (options.type === 'short')
    this.curve = new elliptic.curve.short(options);
  else if (options.type === 'edwards')
    this.curve = new elliptic.curve.edwards(options);
  else
    this.curve = new elliptic.curve.mont(options);
  this.g = this.curve.g;
  this.n = this.curve.n;
  this.hash = options.hash;

  assert(this.g.validate(), 'Invalid curve');
  assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
}
curves.PresetCurve = PresetCurve;

function defineCurve(name, options) {
  Object.defineProperty(curves, name, {
    configurable: true,
    enumerable: true,
    get: function() {
      var curve = new PresetCurve(options);
      Object.defineProperty(curves, name, {
        configurable: true,
        enumerable: true,
        value: curve
      });
      return curve;
    }
  });
}

defineCurve('p192', {
  type: 'short',
  prime: 'p192',
  p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
  b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
  n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
  hash: hash.sha256,
  gRed: false,
  g: [
    '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
    '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811'
  ]
});

defineCurve('p224', {
  type: 'short',
  prime: 'p224',
  p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
  b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
  n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
  hash: hash.sha256,
  gRed: false,
  g: [
    'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
    'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34'
  ]
});

defineCurve('p256', {
  type: 'short',
  prime: null,
  p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
  a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
  b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
  n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
  hash: hash.sha256,
  gRed: false,
  g: [
    '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
    '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5'
  ]
});

defineCurve('p384', {
  type: 'short',
  prime: null,
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 ffffffff',
  a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 fffffffc',
  b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
     '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
  n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
     'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
  hash: hash.sha384,
  gRed: false,
  g: [
    'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
    '5502f25d bf55296c 3a545e38 72760ab7',
    '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
    '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f'
  ]
});

defineCurve('p521', {
  type: 'short',
  prime: null,
  p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff',
  a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff fffffffc',
  b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
     '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
     '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
  n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
     'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
  hash: hash.sha512,
  gRed: false,
  g: [
    '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
    '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
    'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
    '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
    '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
    '3fad0761 353c7086 a272c240 88be9476 9fd16650'
  ]
});

defineCurve('curve25519', {
  type: 'mont',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '76d06',
  b: '0',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '9'
  ]
});

defineCurve('ed25519', {
  type: 'edwards',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '-1',
  c: '1',
  // -121665 * (121666^(-1)) (mod P)
  d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

    // 4/5
    '6666666666666666666666666666666666666666666666666666666666666658'
  ]
});

var pre;
try {
  pre = require('./precomputed/secp256k1');
} catch (e) {
  pre = undefined;
}

defineCurve('secp256k1', {
  type: 'short',
  prime: 'k256',
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
  a: '0',
  b: '7',
  n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
  h: '1',
  hash: hash.sha256,

  // Precomputed endomorphism
  beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
  lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
  basis: [
    {
      a: '3086d221a7d46bcde86c90e49284eb15',
      b: '-e4437ed6010e88286f547fa90abfe4c3'
    },
    {
      a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
      b: '3086d221a7d46bcde86c90e49284eb15'
    }
  ],

  gRed: false,
  g: [
    '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
    '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
    pre
  ]
});

},{"../elliptic":357,"./precomputed/secp256k1":371,"hash.js":374}],364:[function(require,module,exports){
'use strict';

var BN = require('bn.js');
var elliptic = require('../../elliptic');
var utils = elliptic.utils;
var assert = utils.assert;

var KeyPair = require('./key');
var Signature = require('./signature');

function EC(options) {
  if (!(this instanceof EC))
    return new EC(options);

  // Shortcut `elliptic.ec(curve-name)`
  if (typeof options === 'string') {
    assert(elliptic.curves.hasOwnProperty(options), 'Unknown curve ' + options);

    options = elliptic.curves[options];
  }

  // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
  if (options instanceof elliptic.curves.PresetCurve)
    options = { curve: options };

  this.curve = options.curve.curve;
  this.n = this.curve.n;
  this.nh = this.n.ushrn(1);
  this.g = this.curve.g;

  // Point on curve
  this.g = options.curve.g;
  this.g.precompute(options.curve.n.bitLength() + 1);

  // Hash for function for DRBG
  this.hash = options.hash || options.curve.hash;
}
module.exports = EC;

EC.prototype.keyPair = function keyPair(options) {
  return new KeyPair(this, options);
};

EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
  return KeyPair.fromPrivate(this, priv, enc);
};

EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
  return KeyPair.fromPublic(this, pub, enc);
};

EC.prototype.genKeyPair = function genKeyPair(options) {
  if (!options)
    options = {};

  // Instantiate Hmac_DRBG
  var drbg = new elliptic.hmacDRBG({
    hash: this.hash,
    pers: options.pers,
    entropy: options.entropy || elliptic.rand(this.hash.hmacStrength),
    nonce: this.n.toArray()
  });

  var bytes = this.n.byteLength();
  var ns2 = this.n.sub(new BN(2));
  do {
    var priv = new BN(drbg.generate(bytes));
    if (priv.cmp(ns2) > 0)
      continue;

    priv.iaddn(1);
    return this.keyFromPrivate(priv);
  } while (true);
};

EC.prototype._truncateToN = function truncateToN(msg, truncOnly) {
  var delta = msg.byteLength() * 8 - this.n.bitLength();
  if (delta > 0)
    msg = msg.ushrn(delta);
  if (!truncOnly && msg.cmp(this.n) >= 0)
    return msg.sub(this.n);
  else
    return msg;
};

EC.prototype.sign = function sign(msg, key, enc, options) {
  if (typeof enc === 'object') {
    options = enc;
    enc = null;
  }
  if (!options)
    options = {};

  key = this.keyFromPrivate(key, enc);
  msg = this._truncateToN(new BN(msg, 16));

  // Zero-extend key to provide enough entropy
  var bytes = this.n.byteLength();
  var bkey = key.getPrivate().toArray('be', bytes);

  // Zero-extend nonce to have the same byte size as N
  var nonce = msg.toArray('be', bytes);

  // Instantiate Hmac_DRBG
  var drbg = new elliptic.hmacDRBG({
    hash: this.hash,
    entropy: bkey,
    nonce: nonce,
    pers: options.pers,
    persEnc: options.persEnc
  });

  // Number of bytes to generate
  var ns1 = this.n.sub(new BN(1));

  for (var iter = 0; true; iter++) {
    var k = options.k ?
        options.k(iter) :
        new BN(drbg.generate(this.n.byteLength()));
    k = this._truncateToN(k, true);
    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
      continue;

    var kp = this.g.mul(k);
    if (kp.isInfinity())
      continue;

    var kpX = kp.getX();
    var r = kpX.umod(this.n);
    if (r.cmpn(0) === 0)
      continue;

    var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
    s = s.umod(this.n);
    if (s.cmpn(0) === 0)
      continue;

    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
                        (kpX.cmp(r) !== 0 ? 2 : 0);

    // Use complement of `s`, if it is > `n / 2`
    if (options.canonical && s.cmp(this.nh) > 0) {
      s = this.n.sub(s);
      recoveryParam ^= 1;
    }

    return new Signature({ r: r, s: s, recoveryParam: recoveryParam });
  }
};

EC.prototype.verify = function verify(msg, signature, key, enc) {
  msg = this._truncateToN(new BN(msg, 16));
  key = this.keyFromPublic(key, enc);
  signature = new Signature(signature, 'hex');

  // Perform primitive values validation
  var r = signature.r;
  var s = signature.s;
  if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
    return false;
  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
    return false;

  // Validate signature
  var sinv = s.invm(this.n);
  var u1 = sinv.mul(msg).umod(this.n);
  var u2 = sinv.mul(r).umod(this.n);

  if (!this.curve._maxwellTrick) {
    var p = this.g.mulAdd(u1, key.getPublic(), u2);
    if (p.isInfinity())
      return false;

    return p.getX().umod(this.n).cmp(r) === 0;
  }

  // NOTE: Greg Maxwell's trick, inspired by:
  // https://git.io/vad3K

  var p = this.g.jmulAdd(u1, key.getPublic(), u2);
  if (p.isInfinity())
    return false;

  // Compare `p.x` of Jacobian point with `r`,
  // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
  // inverse of `p.z^2`
  return p.eqXToP(r);
};

EC.prototype.recoverPubKey = function(msg, signature, j, enc) {
  assert((3 & j) === j, 'The recovery param is more than two bits');
  signature = new Signature(signature, enc);

  var n = this.n;
  var e = new BN(msg);
  var r = signature.r;
  var s = signature.s;

  // A set LSB signifies that the y-coordinate is odd
  var isYOdd = j & 1;
  var isSecondKey = j >> 1;
  if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
    throw new Error('Unable to find sencond key candinate');

  // 1.1. Let x = r + jn.
  if (isSecondKey)
    r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
  else
    r = this.curve.pointFromX(r, isYOdd);

  var eNeg = n.sub(e);

  // 1.6.1 Compute Q = r^-1 (sR -  eG)
  //               Q = r^-1 (sR + -eG)
  var rInv = signature.r.invm(n);
  return this.g.mulAdd(eNeg, r, s).mul(rInv);
};

EC.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
  signature = new Signature(signature, enc);
  if (signature.recoveryParam !== null)
    return signature.recoveryParam;

  for (var i = 0; i < 4; i++) {
    var Qprime;
    try {
      Qprime = this.recoverPubKey(e, signature, i);
    } catch (e) {
      continue;
    }

    if (Qprime.eq(Q))
      return i;
  }
  throw new Error('Unable to find valid recovery factor');
};

},{"../../elliptic":357,"./key":365,"./signature":366,"bn.js":354}],365:[function(require,module,exports){
'use strict';

var BN = require('bn.js');

function KeyPair(ec, options) {
  this.ec = ec;
  this.priv = null;
  this.pub = null;

  // KeyPair(ec, { priv: ..., pub: ... })
  if (options.priv)
    this._importPrivate(options.priv, options.privEnc);
  if (options.pub)
    this._importPublic(options.pub, options.pubEnc);
}
module.exports = KeyPair;

KeyPair.fromPublic = function fromPublic(ec, pub, enc) {
  if (pub instanceof KeyPair)
    return pub;

  return new KeyPair(ec, {
    pub: pub,
    pubEnc: enc
  });
};

KeyPair.fromPrivate = function fromPrivate(ec, priv, enc) {
  if (priv instanceof KeyPair)
    return priv;

  return new KeyPair(ec, {
    priv: priv,
    privEnc: enc
  });
};

KeyPair.prototype.validate = function validate() {
  var pub = this.getPublic();

  if (pub.isInfinity())
    return { result: false, reason: 'Invalid public key' };
  if (!pub.validate())
    return { result: false, reason: 'Public key is not a point' };
  if (!pub.mul(this.ec.curve.n).isInfinity())
    return { result: false, reason: 'Public key * N != O' };

  return { result: true, reason: null };
};

KeyPair.prototype.getPublic = function getPublic(compact, enc) {
  // compact is optional argument
  if (typeof compact === 'string') {
    enc = compact;
    compact = null;
  }

  if (!this.pub)
    this.pub = this.ec.g.mul(this.priv);

  if (!enc)
    return this.pub;

  return this.pub.encode(enc, compact);
};

KeyPair.prototype.getPrivate = function getPrivate(enc) {
  if (enc === 'hex')
    return this.priv.toString(16, 2);
  else
    return this.priv;
};

KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
  this.priv = new BN(key, enc || 16);

  // Ensure that the priv won't be bigger than n, otherwise we may fail
  // in fixed multiplication method
  this.priv = this.priv.umod(this.ec.curve.n);
};

KeyPair.prototype._importPublic = function _importPublic(key, enc) {
  if (key.x || key.y) {
    this.pub = this.ec.curve.point(key.x, key.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(key, enc);
};

// ECDH
KeyPair.prototype.derive = function derive(pub) {
  return pub.mul(this.priv).getX();
};

// ECDSA
KeyPair.prototype.sign = function sign(msg, enc, options) {
  return this.ec.sign(msg, this, enc, options);
};

KeyPair.prototype.verify = function verify(msg, signature) {
  return this.ec.verify(msg, signature, this);
};

KeyPair.prototype.inspect = function inspect() {
  return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
         ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
};

},{"bn.js":354}],366:[function(require,module,exports){
'use strict';

var BN = require('bn.js');

var elliptic = require('../../elliptic');
var utils = elliptic.utils;
var assert = utils.assert;

function Signature(options, enc) {
  if (options instanceof Signature)
    return options;

  if (this._importDER(options, enc))
    return;

  assert(options.r && options.s, 'Signature without r or s');
  this.r = new BN(options.r, 16);
  this.s = new BN(options.s, 16);
  if (options.recoveryParam === undefined)
    this.recoveryParam = null;
  else
    this.recoveryParam = options.recoveryParam;
}
module.exports = Signature;

function Position() {
  this.place = 0;
}

function getLength(buf, p) {
  var initial = buf[p.place++];
  if (!(initial & 0x80)) {
    return initial;
  }
  var octetLen = initial & 0xf;
  var val = 0;
  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
    val <<= 8;
    val |= buf[off];
  }
  p.place = off;
  return val;
}

function rmPadding(buf) {
  var i = 0;
  var len = buf.length - 1;
  while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
    i++;
  }
  if (i === 0) {
    return buf;
  }
  return buf.slice(i);
}

Signature.prototype._importDER = function _importDER(data, enc) {
  data = utils.toArray(data, enc);
  var p = new Position();
  if (data[p.place++] !== 0x30) {
    return false;
  }
  var len = getLength(data, p);
  if ((len + p.place) !== data.length) {
    return false;
  }
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var rlen = getLength(data, p);
  var r = data.slice(p.place, rlen + p.place);
  p.place += rlen;
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var slen = getLength(data, p);
  if (data.length !== slen + p.place) {
    return false;
  }
  var s = data.slice(p.place, slen + p.place);
  if (r[0] === 0 && (r[1] & 0x80)) {
    r = r.slice(1);
  }
  if (s[0] === 0 && (s[1] & 0x80)) {
    s = s.slice(1);
  }

  this.r = new BN(r);
  this.s = new BN(s);
  this.recoveryParam = null;

  return true;
};

function constructLength(arr, len) {
  if (len < 0x80) {
    arr.push(len);
    return;
  }
  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
  arr.push(octets | 0x80);
  while (--octets) {
    arr.push((len >>> (octets << 3)) & 0xff);
  }
  arr.push(len);
}

Signature.prototype.toDER = function toDER(enc) {
  var r = this.r.toArray();
  var s = this.s.toArray();

  // Pad values
  if (r[0] & 0x80)
    r = [ 0 ].concat(r);
  // Pad values
  if (s[0] & 0x80)
    s = [ 0 ].concat(s);

  r = rmPadding(r);
  s = rmPadding(s);

  while (!s[0] && !(s[1] & 0x80)) {
    s = s.slice(1);
  }
  var arr = [ 0x02 ];
  constructLength(arr, r.length);
  arr = arr.concat(r);
  arr.push(0x02);
  constructLength(arr, s.length);
  var backHalf = arr.concat(s);
  var res = [ 0x30 ];
  constructLength(res, backHalf.length);
  res = res.concat(backHalf);
  return utils.encode(res, enc);
};

},{"../../elliptic":357,"bn.js":354}],367:[function(require,module,exports){
'use strict';

var hash = require('hash.js');
var elliptic = require('../../elliptic');
var utils = elliptic.utils;
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var KeyPair = require('./key');
var Signature = require('./signature');

function EDDSA(curve) {
  assert(curve === 'ed25519', 'only tested with ed25519 so far');

  if (!(this instanceof EDDSA))
    return new EDDSA(curve);

  var curve = elliptic.curves[curve].curve;
  this.curve = curve;
  this.g = curve.g;
  this.g.precompute(curve.n.bitLength() + 1);

  this.pointClass = curve.point().constructor;
  this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
  this.hash = hash.sha512;
}

module.exports = EDDSA;

/**
* @param {Array|String} message - message bytes
* @param {Array|String|KeyPair} secret - secret bytes or a keypair
* @returns {Signature} - signature
*/
EDDSA.prototype.sign = function sign(message, secret) {
  message = parseBytes(message);
  var key = this.keyFromSecret(secret);
  var r = this.hashInt(key.messagePrefix(), message);
  var R = this.g.mul(r);
  var Rencoded = this.encodePoint(R);
  var s_ = this.hashInt(Rencoded, key.pubBytes(), message)
               .mul(key.priv());
  var S = r.add(s_).umod(this.curve.n);
  return this.makeSignature({ R: R, S: S, Rencoded: Rencoded });
};

/**
* @param {Array} message - message bytes
* @param {Array|String|Signature} sig - sig bytes
* @param {Array|String|Point|KeyPair} pub - public key
* @returns {Boolean} - true if public key matches sig of message
*/
EDDSA.prototype.verify = function verify(message, sig, pub) {
  message = parseBytes(message);
  sig = this.makeSignature(sig);
  var key = this.keyFromPublic(pub);
  var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
  var SG = this.g.mul(sig.S());
  var RplusAh = sig.R().add(key.pub().mul(h));
  return RplusAh.eq(SG);
};

EDDSA.prototype.hashInt = function hashInt() {
  var hash = this.hash();
  for (var i = 0; i < arguments.length; i++)
    hash.update(arguments[i]);
  return utils.intFromLE(hash.digest()).umod(this.curve.n);
};

EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
  return KeyPair.fromPublic(this, pub);
};

EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
  return KeyPair.fromSecret(this, secret);
};

EDDSA.prototype.makeSignature = function makeSignature(sig) {
  if (sig instanceof Signature)
    return sig;
  return new Signature(this, sig);
};

/**
* * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
*
* EDDSA defines methods for encoding and decoding points and integers. These are
* helper convenience methods, that pass along to utility functions implied
* parameters.
*
*/
EDDSA.prototype.encodePoint = function encodePoint(point) {
  var enc = point.getY().toArray('le', this.encodingLength);
  enc[this.encodingLength - 1] |= point.getX().isOdd() ? 0x80 : 0;
  return enc;
};

EDDSA.prototype.decodePoint = function decodePoint(bytes) {
  bytes = utils.parseBytes(bytes);

  var lastIx = bytes.length - 1;
  var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~0x80);
  var xIsOdd = (bytes[lastIx] & 0x80) !== 0;

  var y = utils.intFromLE(normed);
  return this.curve.pointFromY(y, xIsOdd);
};

EDDSA.prototype.encodeInt = function encodeInt(num) {
  return num.toArray('le', this.encodingLength);
};

EDDSA.prototype.decodeInt = function decodeInt(bytes) {
  return utils.intFromLE(bytes);
};

EDDSA.prototype.isPoint = function isPoint(val) {
  return val instanceof this.pointClass;
};

},{"../../elliptic":357,"./key":368,"./signature":369,"hash.js":374}],368:[function(require,module,exports){
'use strict';

var elliptic = require('../../elliptic');
var utils = elliptic.utils;
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var cachedProperty = utils.cachedProperty;

/**
* @param {EDDSA} eddsa - instance
* @param {Object} params - public/private key parameters
*
* @param {Array<Byte>} [params.secret] - secret seed bytes
* @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
* @param {Array<Byte>} [params.pub] - public key point encoded as bytes
*
*/
function KeyPair(eddsa, params) {
  this.eddsa = eddsa;
  this._secret = parseBytes(params.secret);
  if (eddsa.isPoint(params.pub))
    this._pub = params.pub;
  else
    this._pubBytes = parseBytes(params.pub);
}

KeyPair.fromPublic = function fromPublic(eddsa, pub) {
  if (pub instanceof KeyPair)
    return pub;
  return new KeyPair(eddsa, { pub: pub });
};

KeyPair.fromSecret = function fromSecret(eddsa, secret) {
  if (secret instanceof KeyPair)
    return secret;
  return new KeyPair(eddsa, { secret: secret });
};

KeyPair.prototype.secret = function secret() {
  return this._secret;
};

cachedProperty(KeyPair, 'pubBytes', function pubBytes() {
  return this.eddsa.encodePoint(this.pub());
});

cachedProperty(KeyPair, 'pub', function pub() {
  if (this._pubBytes)
    return this.eddsa.decodePoint(this._pubBytes);
  return this.eddsa.g.mul(this.priv());
});

cachedProperty(KeyPair, 'privBytes', function privBytes() {
  var eddsa = this.eddsa;
  var hash = this.hash();
  var lastIx = eddsa.encodingLength - 1;

  var a = hash.slice(0, eddsa.encodingLength);
  a[0] &= 248;
  a[lastIx] &= 127;
  a[lastIx] |= 64;

  return a;
});

cachedProperty(KeyPair, 'priv', function priv() {
  return this.eddsa.decodeInt(this.privBytes());
});

cachedProperty(KeyPair, 'hash', function hash() {
  return this.eddsa.hash().update(this.secret()).digest();
});

cachedProperty(KeyPair, 'messagePrefix', function messagePrefix() {
  return this.hash().slice(this.eddsa.encodingLength);
});

KeyPair.prototype.sign = function sign(message) {
  assert(this._secret, 'KeyPair can only verify');
  return this.eddsa.sign(message, this);
};

KeyPair.prototype.verify = function verify(message, sig) {
  return this.eddsa.verify(message, sig, this);
};

KeyPair.prototype.getSecret = function getSecret(enc) {
  assert(this._secret, 'KeyPair is public only');
  return utils.encode(this.secret(), enc);
};

KeyPair.prototype.getPublic = function getPublic(enc) {
  return utils.encode(this.pubBytes(), enc);
};

module.exports = KeyPair;

},{"../../elliptic":357}],369:[function(require,module,exports){
'use strict';

var BN = require('bn.js');
var elliptic = require('../../elliptic');
var utils = elliptic.utils;
var assert = utils.assert;
var cachedProperty = utils.cachedProperty;
var parseBytes = utils.parseBytes;

/**
* @param {EDDSA} eddsa - eddsa instance
* @param {Array<Bytes>|Object} sig -
* @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
* @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
* @param {Array<Bytes>} [sig.Rencoded] - R point encoded
* @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
*/
function Signature(eddsa, sig) {
  this.eddsa = eddsa;

  if (typeof sig !== 'object')
    sig = parseBytes(sig);

  if (Array.isArray(sig)) {
    sig = {
      R: sig.slice(0, eddsa.encodingLength),
      S: sig.slice(eddsa.encodingLength)
    };
  }

  assert(sig.R && sig.S, 'Signature without R or S');

  if (eddsa.isPoint(sig.R))
    this._R = sig.R;
  if (sig.S instanceof BN)
    this._S = sig.S;

  this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
  this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
}

cachedProperty(Signature, 'S', function S() {
  return this.eddsa.decodeInt(this.Sencoded());
});

cachedProperty(Signature, 'R', function R() {
  return this.eddsa.decodePoint(this.Rencoded());
});

cachedProperty(Signature, 'Rencoded', function Rencoded() {
  return this.eddsa.encodePoint(this.R());
});

cachedProperty(Signature, 'Sencoded', function Sencoded() {
  return this.eddsa.encodeInt(this.S());
});

Signature.prototype.toBytes = function toBytes() {
  return this.Rencoded().concat(this.Sencoded());
};

Signature.prototype.toHex = function toHex() {
  return utils.encode(this.toBytes(), 'hex').toUpperCase();
};

module.exports = Signature;

},{"../../elliptic":357,"bn.js":354}],370:[function(require,module,exports){
'use strict';

var hash = require('hash.js');
var elliptic = require('../elliptic');
var utils = elliptic.utils;
var assert = utils.assert;

function HmacDRBG(options) {
  if (!(this instanceof HmacDRBG))
    return new HmacDRBG(options);
  this.hash = options.hash;
  this.predResist = !!options.predResist;

  this.outLen = this.hash.outSize;
  this.minEntropy = options.minEntropy || this.hash.hmacStrength;

  this.reseed = null;
  this.reseedInterval = null;
  this.K = null;
  this.V = null;

  var entropy = utils.toArray(options.entropy, options.entropyEnc);
  var nonce = utils.toArray(options.nonce, options.nonceEnc);
  var pers = utils.toArray(options.pers, options.persEnc);
  assert(entropy.length >= (this.minEntropy / 8),
         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
  this._init(entropy, nonce, pers);
}
module.exports = HmacDRBG;

HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
  var seed = entropy.concat(nonce).concat(pers);

  this.K = new Array(this.outLen / 8);
  this.V = new Array(this.outLen / 8);
  for (var i = 0; i < this.V.length; i++) {
    this.K[i] = 0x00;
    this.V[i] = 0x01;
  }

  this._update(seed);
  this.reseed = 1;
  this.reseedInterval = 0x1000000000000;  // 2^48
};

HmacDRBG.prototype._hmac = function hmac() {
  return new hash.hmac(this.hash, this.K);
};

HmacDRBG.prototype._update = function update(seed) {
  var kmac = this._hmac()
                 .update(this.V)
                 .update([ 0x00 ]);
  if (seed)
    kmac = kmac.update(seed);
  this.K = kmac.digest();
  this.V = this._hmac().update(this.V).digest();
  if (!seed)
    return;

  this.K = this._hmac()
               .update(this.V)
               .update([ 0x01 ])
               .update(seed)
               .digest();
  this.V = this._hmac().update(this.V).digest();
};

HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
  // Optional entropy enc
  if (typeof entropyEnc !== 'string') {
    addEnc = add;
    add = entropyEnc;
    entropyEnc = null;
  }

  entropy = utils.toBuffer(entropy, entropyEnc);
  add = utils.toBuffer(add, addEnc);

  assert(entropy.length >= (this.minEntropy / 8),
         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

  this._update(entropy.concat(add || []));
  this.reseed = 1;
};

HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
  if (this.reseed > this.reseedInterval)
    throw new Error('Reseed is required');

  // Optional encoding
  if (typeof enc !== 'string') {
    addEnc = add;
    add = enc;
    enc = null;
  }

  // Optional additional data
  if (add) {
    add = utils.toArray(add, addEnc);
    this._update(add);
  }

  var temp = [];
  while (temp.length < len) {
    this.V = this._hmac().update(this.V).digest();
    temp = temp.concat(this.V);
  }

  var res = temp.slice(0, len);
  this._update(add);
  this.reseed++;
  return utils.encode(res, enc);
};

},{"../elliptic":357,"hash.js":374}],371:[function(require,module,exports){
module.exports = {
  doubles: {
    step: 4,
    points: [
      [
        'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
        'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821'
      ],
      [
        '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
        '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf'
      ],
      [
        '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
        'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695'
      ],
      [
        '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
        '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9'
      ],
      [
        '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
        '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36'
      ],
      [
        '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
        '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f'
      ],
      [
        'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
        '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999'
      ],
      [
        '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
        'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09'
      ],
      [
        'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
        '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d'
      ],
      [
        'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
        'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088'
      ],
      [
        'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
        '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d'
      ],
      [
        '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
        '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8'
      ],
      [
        '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
        '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a'
      ],
      [
        '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
        '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453'
      ],
      [
        '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
        '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160'
      ],
      [
        '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
        '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0'
      ],
      [
        '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
        '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6'
      ],
      [
        '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
        '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589'
      ],
      [
        '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
        'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17'
      ],
      [
        'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
        '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda'
      ],
      [
        'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
        '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd'
      ],
      [
        '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
        '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2'
      ],
      [
        '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
        '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6'
      ],
      [
        'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
        '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f'
      ],
      [
        '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
        'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01'
      ],
      [
        'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
        '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3'
      ],
      [
        'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
        'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f'
      ],
      [
        'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
        '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7'
      ],
      [
        'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
        'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78'
      ],
      [
        'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
        '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1'
      ],
      [
        '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
        'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150'
      ],
      [
        '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
        '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82'
      ],
      [
        'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
        '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc'
      ],
      [
        '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
        'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b'
      ],
      [
        'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
        '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51'
      ],
      [
        'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
        '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45'
      ],
      [
        'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
        'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120'
      ],
      [
        '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
        '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84'
      ],
      [
        '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
        '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d'
      ],
      [
        '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
        'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d'
      ],
      [
        '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
        '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8'
      ],
      [
        'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
        '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8'
      ],
      [
        '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
        '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac'
      ],
      [
        '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
        'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f'
      ],
      [
        '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
        '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962'
      ],
      [
        'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
        '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907'
      ],
      [
        '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
        'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec'
      ],
      [
        'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
        'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d'
      ],
      [
        'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
        '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414'
      ],
      [
        '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
        'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd'
      ],
      [
        '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
        'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0'
      ],
      [
        'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
        '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811'
      ],
      [
        'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
        '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1'
      ],
      [
        'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
        '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c'
      ],
      [
        '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
        'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73'
      ],
      [
        '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
        '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd'
      ],
      [
        'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
        'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405'
      ],
      [
        '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
        'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589'
      ],
      [
        '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
        '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e'
      ],
      [
        '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
        '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27'
      ],
      [
        'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
        'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1'
      ],
      [
        '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
        '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482'
      ],
      [
        '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
        '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945'
      ],
      [
        'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
        '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573'
      ],
      [
        'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
        'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82'
      ]
    ]
  },
  naf: {
    wnd: 7,
    points: [
      [
        'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
        '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672'
      ],
      [
        '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
        'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6'
      ],
      [
        '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
        '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da'
      ],
      [
        'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
        'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37'
      ],
      [
        '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
        'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b'
      ],
      [
        'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
        'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81'
      ],
      [
        'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
        '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58'
      ],
      [
        'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
        '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77'
      ],
      [
        '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
        '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a'
      ],
      [
        '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
        '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c'
      ],
      [
        '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
        '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67'
      ],
      [
        '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
        '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402'
      ],
      [
        'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
        'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55'
      ],
      [
        'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
        '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482'
      ],
      [
        '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
        'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82'
      ],
      [
        '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
        'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396'
      ],
      [
        '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
        '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49'
      ],
      [
        '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
        '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf'
      ],
      [
        '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
        '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a'
      ],
      [
        '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
        'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7'
      ],
      [
        'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
        'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933'
      ],
      [
        '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
        '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a'
      ],
      [
        '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
        '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6'
      ],
      [
        'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
        'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37'
      ],
      [
        '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
        '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e'
      ],
      [
        'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
        'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6'
      ],
      [
        'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
        'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476'
      ],
      [
        '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
        '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40'
      ],
      [
        '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
        '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61'
      ],
      [
        '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
        '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683'
      ],
      [
        'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
        '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5'
      ],
      [
        '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
        '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b'
      ],
      [
        'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
        '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417'
      ],
      [
        '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
        'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868'
      ],
      [
        '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
        'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a'
      ],
      [
        'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
        'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6'
      ],
      [
        '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
        '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996'
      ],
      [
        '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
        'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e'
      ],
      [
        'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
        'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d'
      ],
      [
        '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
        '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2'
      ],
      [
        '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
        'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e'
      ],
      [
        '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
        '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437'
      ],
      [
        '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
        'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311'
      ],
      [
        'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
        '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4'
      ],
      [
        '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
        '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575'
      ],
      [
        '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
        'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d'
      ],
      [
        '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
        'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d'
      ],
      [
        'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
        'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629'
      ],
      [
        'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
        'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06'
      ],
      [
        '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
        '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374'
      ],
      [
        '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
        '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee'
      ],
      [
        'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
        '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1'
      ],
      [
        'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
        'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b'
      ],
      [
        '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
        '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661'
      ],
      [
        '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
        '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6'
      ],
      [
        'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
        '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e'
      ],
      [
        '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
        '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d'
      ],
      [
        'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
        'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc'
      ],
      [
        '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
        'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4'
      ],
      [
        '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
        '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c'
      ],
      [
        'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
        '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b'
      ],
      [
        'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
        '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913'
      ],
      [
        '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
        '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154'
      ],
      [
        '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
        '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865'
      ],
      [
        '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
        'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc'
      ],
      [
        '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
        'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224'
      ],
      [
        '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
        '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e'
      ],
      [
        '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
        '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6'
      ],
      [
        '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
        '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511'
      ],
      [
        '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
        'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b'
      ],
      [
        'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
        'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2'
      ],
      [
        '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
        'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c'
      ],
      [
        'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
        '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3'
      ],
      [
        'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
        '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d'
      ],
      [
        'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
        '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700'
      ],
      [
        'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
        '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4'
      ],
      [
        '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
        'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196'
      ],
      [
        '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
        '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4'
      ],
      [
        '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
        'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257'
      ],
      [
        'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
        'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13'
      ],
      [
        'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
        '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096'
      ],
      [
        'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
        'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38'
      ],
      [
        'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
        '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f'
      ],
      [
        '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
        '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448'
      ],
      [
        'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
        '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a'
      ],
      [
        'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
        '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4'
      ],
      [
        '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
        '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437'
      ],
      [
        '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
        'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7'
      ],
      [
        'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
        '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d'
      ],
      [
        'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
        '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a'
      ],
      [
        'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
        '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54'
      ],
      [
        '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
        '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77'
      ],
      [
        'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
        'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517'
      ],
      [
        '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
        'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10'
      ],
      [
        'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
        'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125'
      ],
      [
        'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
        '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e'
      ],
      [
        '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
        'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1'
      ],
      [
        'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
        '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2'
      ],
      [
        'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
        '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423'
      ],
      [
        'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
        '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8'
      ],
      [
        '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
        'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758'
      ],
      [
        '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
        'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375'
      ],
      [
        'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
        '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d'
      ],
      [
        '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
        'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec'
      ],
      [
        '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
        '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0'
      ],
      [
        '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
        'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c'
      ],
      [
        'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
        'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4'
      ],
      [
        '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
        'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f'
      ],
      [
        '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
        '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649'
      ],
      [
        '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
        'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826'
      ],
      [
        '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
        '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5'
      ],
      [
        'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
        'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87'
      ],
      [
        '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
        '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b'
      ],
      [
        'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
        '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc'
      ],
      [
        '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
        '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c'
      ],
      [
        'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
        'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f'
      ],
      [
        'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
        '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a'
      ],
      [
        'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
        'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46'
      ],
      [
        '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
        'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f'
      ],
      [
        '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
        '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03'
      ],
      [
        '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
        'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08'
      ],
      [
        '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
        '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8'
      ],
      [
        '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
        '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373'
      ],
      [
        '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
        'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3'
      ],
      [
        '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
        '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8'
      ],
      [
        '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
        '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1'
      ],
      [
        '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
        '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9'
      ]
    ]
  }
};

},{}],372:[function(require,module,exports){
'use strict';

var utils = exports;
var BN = require('bn.js');

utils.assert = function assert(val, msg) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
};

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg !== 'string') {
    for (var i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
    return res;
  }
  if (!enc) {
    for (var i = 0; i < msg.length; i++) {
      var c = msg.charCodeAt(i);
      var hi = c >> 8;
      var lo = c & 0xff;
      if (hi)
        res.push(hi, lo);
      else
        res.push(lo);
    }
  } else if (enc === 'hex') {
    msg = msg.replace(/[^a-z0-9]+/ig, '');
    if (msg.length % 2 !== 0)
      msg = '0' + msg;
    for (var i = 0; i < msg.length; i += 2)
      res.push(parseInt(msg[i] + msg[i + 1], 16));
  }
  return res;
}
utils.toArray = toArray;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
utils.zero2 = zero2;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
utils.toHex = toHex;

utils.encode = function encode(arr, enc) {
  if (enc === 'hex')
    return toHex(arr);
  else
    return arr;
};

// Represent num in a w-NAF form
function getNAF(num, w) {
  var naf = [];
  var ws = 1 << (w + 1);
  var k = num.clone();
  while (k.cmpn(1) >= 0) {
    var z;
    if (k.isOdd()) {
      var mod = k.andln(ws - 1);
      if (mod > (ws >> 1) - 1)
        z = (ws >> 1) - mod;
      else
        z = mod;
      k.isubn(z);
    } else {
      z = 0;
    }
    naf.push(z);

    // Optimization, shift by word if possible
    var shift = (k.cmpn(0) !== 0 && k.andln(ws - 1) === 0) ? (w + 1) : 1;
    for (var i = 1; i < shift; i++)
      naf.push(0);
    k.iushrn(shift);
  }

  return naf;
}
utils.getNAF = getNAF;

// Represent k1, k2 in a Joint Sparse Form
function getJSF(k1, k2) {
  var jsf = [
    [],
    []
  ];

  k1 = k1.clone();
  k2 = k2.clone();
  var d1 = 0;
  var d2 = 0;
  while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {

    // First phase
    var m14 = (k1.andln(3) + d1) & 3;
    var m24 = (k2.andln(3) + d2) & 3;
    if (m14 === 3)
      m14 = -1;
    if (m24 === 3)
      m24 = -1;
    var u1;
    if ((m14 & 1) === 0) {
      u1 = 0;
    } else {
      var m8 = (k1.andln(7) + d1) & 7;
      if ((m8 === 3 || m8 === 5) && m24 === 2)
        u1 = -m14;
      else
        u1 = m14;
    }
    jsf[0].push(u1);

    var u2;
    if ((m24 & 1) === 0) {
      u2 = 0;
    } else {
      var m8 = (k2.andln(7) + d2) & 7;
      if ((m8 === 3 || m8 === 5) && m14 === 2)
        u2 = -m24;
      else
        u2 = m24;
    }
    jsf[1].push(u2);

    // Second phase
    if (2 * d1 === u1 + 1)
      d1 = 1 - d1;
    if (2 * d2 === u2 + 1)
      d2 = 1 - d2;
    k1.iushrn(1);
    k2.iushrn(1);
  }

  return jsf;
}
utils.getJSF = getJSF;

function cachedProperty(obj, name, computer) {
  var key = '_' + name;
  obj.prototype[name] = function cachedProperty() {
    return this[key] !== undefined ? this[key] :
           this[key] = computer.call(this);
  };
}
utils.cachedProperty = cachedProperty;

function parseBytes(bytes) {
  return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
                                     bytes;
}
utils.parseBytes = parseBytes;

function intFromLE(bytes) {
  return new BN(bytes, 'hex', 'le');
}
utils.intFromLE = intFromLE;


},{"bn.js":354}],373:[function(require,module,exports){
module.exports={
  "_args": [
    [
      {
        "raw": "elliptic@https://registry.npmjs.org/elliptic/-/elliptic-6.3.1.tgz",
        "scope": null,
        "escapedName": "elliptic",
        "name": "elliptic",
        "rawSpec": "https://registry.npmjs.org/elliptic/-/elliptic-6.3.1.tgz",
        "spec": "https://registry.npmjs.org/elliptic/-/elliptic-6.3.1.tgz",
        "type": "remote"
      },
      "/home/iluvpool19/Desktop/xbt/yours-channels/node_modules/yours-bitcoin"
    ]
  ],
  "_from": "elliptic@6.3.1",
  "_id": "elliptic@6.3.1",
  "_inCache": true,
  "_location": "/yours-bitcoin/elliptic",
  "_phantomChildren": {},
  "_requested": {
    "raw": "elliptic@https://registry.npmjs.org/elliptic/-/elliptic-6.3.1.tgz",
    "scope": null,
    "escapedName": "elliptic",
    "name": "elliptic",
    "rawSpec": "https://registry.npmjs.org/elliptic/-/elliptic-6.3.1.tgz",
    "spec": "https://registry.npmjs.org/elliptic/-/elliptic-6.3.1.tgz",
    "type": "remote"
  },
  "_requiredBy": [
    "/yours-bitcoin",
    "/yours-bitcoin/browserify-sign",
    "/yours-bitcoin/create-ecdh"
  ],
  "_resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.3.1.tgz",
  "_shasum": "17781f2109ab0ec686b146bdcff5d2e8c6aeceda",
  "_shrinkwrap": null,
  "_spec": "elliptic@https://registry.npmjs.org/elliptic/-/elliptic-6.3.1.tgz",
  "_where": "/home/iluvpool19/Desktop/xbt/yours-channels/node_modules/yours-bitcoin",
  "author": {
    "name": "Fedor Indutny",
    "email": "fedor@indutny.com"
  },
  "bugs": {
    "url": "https://github.com/indutny/elliptic/issues"
  },
  "dependencies": {
    "bn.js": "^4.4.0",
    "brorand": "^1.0.1",
    "hash.js": "^1.0.0",
    "inherits": "^2.0.1"
  },
  "description": "EC cryptography",
  "devDependencies": {
    "brfs": "^1.4.3",
    "coveralls": "^2.11.3",
    "grunt": "^0.4.5",
    "grunt-browserify": "^5.0.0",
    "grunt-contrib-connect": "^1.0.0",
    "grunt-contrib-copy": "^1.0.0",
    "grunt-contrib-uglify": "^1.0.1",
    "grunt-mocha-istanbul": "^3.0.1",
    "grunt-saucelabs": "^8.6.2",
    "istanbul": "^0.4.2",
    "jscs": "^2.9.0",
    "jshint": "^2.6.0",
    "mocha": "^2.1.0"
  },
  "files": [
    "lib"
  ],
  "homepage": "https://github.com/indutny/elliptic",
  "keywords": [
    "EC",
    "Elliptic",
    "curve",
    "Cryptography"
  ],
  "license": "MIT",
  "main": "lib/elliptic.js",
  "name": "elliptic",
  "optionalDependencies": {},
  "readme": "# Elliptic [![Build Status](https://secure.travis-ci.org/indutny/elliptic.png)](http://travis-ci.org/indutny/elliptic) [![Coverage Status](https://coveralls.io/repos/indutny/elliptic/badge.svg?branch=master&service=github)](https://coveralls.io/github/indutny/elliptic?branch=master) [![Code Climate](https://codeclimate.com/github/indutny/elliptic/badges/gpa.svg)](https://codeclimate.com/github/indutny/elliptic)\n\n[![Saucelabs Test Status](https://saucelabs.com/browser-matrix/gh-indutny-elliptic.svg)](https://saucelabs.com/u/gh-indutny-elliptic)\n\nFast elliptic-curve cryptography in a plain javascript implementation.\n\nNOTE: Please take a look at http://safecurves.cr.yp.to/ before choosing a curve\nfor your cryptography operations.\n\n## Incentive\n\nECC is much slower than regular RSA cryptography, the JS implementations are\neven more slower.\n\n## Benchmarks\n\n```bash\n$ node benchmarks/index.js\nBenchmarking: sign\nelliptic#sign x 262 ops/sec ±0.51% (177 runs sampled)\neccjs#sign x 55.91 ops/sec ±0.90% (144 runs sampled)\n------------------------\nFastest is elliptic#sign\n========================\nBenchmarking: verify\nelliptic#verify x 113 ops/sec ±0.50% (166 runs sampled)\neccjs#verify x 48.56 ops/sec ±0.36% (125 runs sampled)\n------------------------\nFastest is elliptic#verify\n========================\nBenchmarking: gen\nelliptic#gen x 294 ops/sec ±0.43% (176 runs sampled)\neccjs#gen x 62.25 ops/sec ±0.63% (129 runs sampled)\n------------------------\nFastest is elliptic#gen\n========================\nBenchmarking: ecdh\nelliptic#ecdh x 136 ops/sec ±0.85% (156 runs sampled)\n------------------------\nFastest is elliptic#ecdh\n========================\n```\n\n## API\n\n### ECDSA\n\n```javascript\nvar EC = require('elliptic').ec;\n\n// Create and initialize EC context\n// (better do it once and reuse it)\nvar ec = new EC('secp256k1');\n\n// Generate keys\nvar key = ec.genKeyPair();\n\n// Sign message (must be an array, or it'll be treated as a hex sequence)\nvar msg = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];\nvar signature = key.sign(msg);\n\n// Export DER encoded signature in Array\nvar derSign = signature.toDER();\n\n// Verify signature\nconsole.log(key.verify(msg, derSign));\n\n// CHECK WITH NO PRIVATE KEY\n\n// Public key as '04 + x + y'\nvar pub = '04bb1fa3...';\n\n// Signature MUST be either:\n// 1) hex-string of DER-encoded signature; or\n// 2) DER-encoded signature as buffer; or\n// 3) object with two hex-string properties (r and s)\n\nvar signature = 'b102ac...'; // case 1\nvar signature = new Buffer('...'); // case 2\nvar signature = { r: 'b1fc...', s: '9c42...' }; // case 3\n\n// Import public key\nvar key = ec.keyFromPublic(pub, 'hex');\n\n// Verify signature\nconsole.log(key.verify(msg, signature));\n```\n\n### EdDSA\n\n```javascript\nvar EdDSA = require('elliptic').eddsa;\n\n// Create and initialize EdDSA context\n// (better do it once and reuse it)\nvar ec = new EdDSA('ed25519');\n\n// Create key pair from secret\nvar key = ec.keyFromSecret('693e3c...'); // hex string, array or Buffer\n\n// Sign message (must be an array, or it'll be treated as a hex sequence)\nvar msg = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];\nvar signature = key.sign(msg).toHex();\n\n// Verify signature\nconsole.log(key.verify(msg, signature));\n\n// CHECK WITH NO PRIVATE KEY\n\n// Import public key\nvar pub = '0a1af638...';\nvar key = ec.keyFromPublic(pub, 'hex');\n\n// Verify signature\nvar signature = '70bed1...';\nconsole.log(key.verify(msg, signature));\n```\n\n### ECDH\n\n```javascript\n// Generate keys\nvar key1 = ec.genKeyPair();\nvar key2 = ec.genKeyPair();\n\nvar shared1 = key1.derive(key2.getPublic());\nvar shared2 = key2.derive(key1.getPublic());\n\nconsole.log('Both shared secrets are BN instances');\nconsole.log(shared1.toString(16));\nconsole.log(shared2.toString(16));\n```\n\nNOTE: `.derive()` returns a [BN][1] instance.\n\n## Supported curves\n\nElliptic.js support following curve types:\n\n* Short Weierstrass\n* Montgomery\n* Edwards\n* Twisted Edwards\n\nFollowing curve 'presets' are embedded into the library:\n\n* `secp256k1`\n* `p192`\n* `p224`\n* `p256`\n* `p384`\n* `p521`\n* `curve25519`\n* `ed25519`\n\nNOTE: That `curve25519` could not be used for ECDSA, use `ed25519` instead.\n\n### Implementation details\n\nECDSA is using deterministic `k` value generation as per [RFC6979][0]. Most of\nthe curve operations are performed on non-affine coordinates (either projective\nor extended), various windowing techniques are used for different cases.\n\nAll operations are performed in reduction context using [bn.js][1], hashing is\nprovided by [hash.js][2]\n\n### Related projects\n\n* [eccrypto][3]: isomorphic implementation of ECDSA, ECDH and ECIES for both\n  browserify and node (uses `elliptic` for browser and [secp256k1-node][4] for\n  node)\n\n#### LICENSE\n\nThis software is licensed under the MIT License.\n\nCopyright Fedor Indutny, 2014.\n\nPermission is hereby granted, free of charge, to any person obtaining a\ncopy of this software and associated documentation files (the\n\"Software\"), to deal in the Software without restriction, including\nwithout limitation the rights to use, copy, modify, merge, publish,\ndistribute, sublicense, and/or sell copies of the Software, and to permit\npersons to whom the Software is furnished to do so, subject to the\nfollowing conditions:\n\nThe above copyright notice and this permission notice shall be included\nin all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\nOR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\nMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\nNO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\nDAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\nOTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\nUSE OR OTHER DEALINGS IN THE SOFTWARE.\n\n[0]: http://tools.ietf.org/html/rfc6979\n[1]: https://github.com/indutny/bn.js\n[2]: https://github.com/indutny/hash.js\n[3]: https://github.com/bitchan/eccrypto\n[4]: https://github.com/wanderer/secp256k1-node\n",
  "readmeFilename": "README.md",
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/indutny/elliptic.git"
  },
  "scripts": {
    "jscs": "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
    "jshint": "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
    "lint": "npm run jscs && npm run jshint",
    "test": "npm run lint && npm run unit",
    "unit": "istanbul test _mocha --reporter=spec test/index.js",
    "version": "grunt dist && git add dist/"
  },
  "version": "6.3.1"
}

},{}],374:[function(require,module,exports){
var hash = exports;

hash.utils = require('./hash/utils');
hash.common = require('./hash/common');
hash.sha = require('./hash/sha');
hash.ripemd = require('./hash/ripemd');
hash.hmac = require('./hash/hmac');

// Proxy hash functions to the main object
hash.sha1 = hash.sha.sha1;
hash.sha256 = hash.sha.sha256;
hash.sha224 = hash.sha.sha224;
hash.sha384 = hash.sha.sha384;
hash.sha512 = hash.sha.sha512;
hash.ripemd160 = hash.ripemd.ripemd160;

},{"./hash/common":375,"./hash/hmac":376,"./hash/ripemd":377,"./hash/sha":378,"./hash/utils":379}],375:[function(require,module,exports){
var hash = require('../hash');
var utils = hash.utils;
var assert = utils.assert;

function BlockHash() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = 'big';

  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
exports.BlockHash = BlockHash;

BlockHash.prototype.update = function update(msg, enc) {
  // Convert message to array, pad it, and join into 32bit blocks
  msg = utils.toArray(msg, enc);
  if (!this.pending)
    this.pending = msg;
  else
    this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;

  // Enough data, try updating
  if (this.pending.length >= this._delta8) {
    msg = this.pending;

    // Process pending data in blocks
    var r = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r, msg.length);
    if (this.pending.length === 0)
      this.pending = null;

    msg = utils.join32(msg, 0, msg.length - r, this.endian);
    for (var i = 0; i < msg.length; i += this._delta32)
      this._update(msg, i, i + this._delta32);
  }

  return this;
};

BlockHash.prototype.digest = function digest(enc) {
  this.update(this._pad());
  assert(this.pending === null);

  return this._digest(enc);
};

BlockHash.prototype._pad = function pad() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - ((len + this.padLength) % bytes);
  var res = new Array(k + this.padLength);
  res[0] = 0x80;
  for (var i = 1; i < k; i++)
    res[i] = 0;

  // Append length
  len <<= 3;
  if (this.endian === 'big') {
    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;

    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = len & 0xff;
  } else {
    res[i++] = len & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;

    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;
  }

  return res;
};

},{"../hash":374}],376:[function(require,module,exports){
var hmac = exports;

var hash = require('../hash');
var utils = hash.utils;
var assert = utils.assert;

function Hmac(hash, key, enc) {
  if (!(this instanceof Hmac))
    return new Hmac(hash, key, enc);
  this.Hash = hash;
  this.blockSize = hash.blockSize / 8;
  this.outSize = hash.outSize / 8;
  this.inner = null;
  this.outer = null;

  this._init(utils.toArray(key, enc));
}
module.exports = Hmac;

Hmac.prototype._init = function init(key) {
  // Shorten key, if needed
  if (key.length > this.blockSize)
    key = new this.Hash().update(key).digest();
  assert(key.length <= this.blockSize);

  // Add padding to key
  for (var i = key.length; i < this.blockSize; i++)
    key.push(0);

  for (var i = 0; i < key.length; i++)
    key[i] ^= 0x36;
  this.inner = new this.Hash().update(key);

  // 0x36 ^ 0x5c = 0x6a
  for (var i = 0; i < key.length; i++)
    key[i] ^= 0x6a;
  this.outer = new this.Hash().update(key);
};

Hmac.prototype.update = function update(msg, enc) {
  this.inner.update(msg, enc);
  return this;
};

Hmac.prototype.digest = function digest(enc) {
  this.outer.update(this.inner.digest());
  return this.outer.digest(enc);
};

},{"../hash":374}],377:[function(require,module,exports){
var hash = require('../hash');
var utils = hash.utils;

var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_3 = utils.sum32_3;
var sum32_4 = utils.sum32_4;
var BlockHash = hash.common.BlockHash;

function RIPEMD160() {
  if (!(this instanceof RIPEMD160))
    return new RIPEMD160();

  BlockHash.call(this);

  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
  this.endian = 'little';
}
utils.inherits(RIPEMD160, BlockHash);
exports.ripemd160 = RIPEMD160;

RIPEMD160.blockSize = 512;
RIPEMD160.outSize = 160;
RIPEMD160.hmacStrength = 192;
RIPEMD160.padLength = 64;

RIPEMD160.prototype._update = function update(msg, start) {
  var A = this.h[0];
  var B = this.h[1];
  var C = this.h[2];
  var D = this.h[3];
  var E = this.h[4];
  var Ah = A;
  var Bh = B;
  var Ch = C;
  var Dh = D;
  var Eh = E;
  for (var j = 0; j < 80; j++) {
    var T = sum32(
      rotl32(
        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
        s[j]),
      E);
    A = E;
    E = D;
    D = rotl32(C, 10);
    C = B;
    B = T;
    T = sum32(
      rotl32(
        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
        sh[j]),
      Eh);
    Ah = Eh;
    Eh = Dh;
    Dh = rotl32(Ch, 10);
    Ch = Bh;
    Bh = T;
  }
  T = sum32_3(this.h[1], C, Dh);
  this.h[1] = sum32_3(this.h[2], D, Eh);
  this.h[2] = sum32_3(this.h[3], E, Ah);
  this.h[3] = sum32_3(this.h[4], A, Bh);
  this.h[4] = sum32_3(this.h[0], B, Ch);
  this.h[0] = T;
};

RIPEMD160.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'little');
  else
    return utils.split32(this.h, 'little');
};

function f(j, x, y, z) {
  if (j <= 15)
    return x ^ y ^ z;
  else if (j <= 31)
    return (x & y) | ((~x) & z);
  else if (j <= 47)
    return (x | (~y)) ^ z;
  else if (j <= 63)
    return (x & z) | (y & (~z));
  else
    return x ^ (y | (~z));
}

function K(j) {
  if (j <= 15)
    return 0x00000000;
  else if (j <= 31)
    return 0x5a827999;
  else if (j <= 47)
    return 0x6ed9eba1;
  else if (j <= 63)
    return 0x8f1bbcdc;
  else
    return 0xa953fd4e;
}

function Kh(j) {
  if (j <= 15)
    return 0x50a28be6;
  else if (j <= 31)
    return 0x5c4dd124;
  else if (j <= 47)
    return 0x6d703ef3;
  else if (j <= 63)
    return 0x7a6d76e9;
  else
    return 0x00000000;
}

var r = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
];

var rh = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
];

var s = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
];

var sh = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
];

},{"../hash":374}],378:[function(require,module,exports){
var hash = require('../hash');
var utils = hash.utils;
var assert = utils.assert;

var rotr32 = utils.rotr32;
var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_4 = utils.sum32_4;
var sum32_5 = utils.sum32_5;
var rotr64_hi = utils.rotr64_hi;
var rotr64_lo = utils.rotr64_lo;
var shr64_hi = utils.shr64_hi;
var shr64_lo = utils.shr64_lo;
var sum64 = utils.sum64;
var sum64_hi = utils.sum64_hi;
var sum64_lo = utils.sum64_lo;
var sum64_4_hi = utils.sum64_4_hi;
var sum64_4_lo = utils.sum64_4_lo;
var sum64_5_hi = utils.sum64_5_hi;
var sum64_5_lo = utils.sum64_5_lo;
var BlockHash = hash.common.BlockHash;

var sha256_K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

var sha512_K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

var sha1_K = [
  0x5A827999, 0x6ED9EBA1,
  0x8F1BBCDC, 0xCA62C1D6
];

function SHA256() {
  if (!(this instanceof SHA256))
    return new SHA256();

  BlockHash.call(this);
  this.h = [ 0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
             0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19 ];
  this.k = sha256_K;
  this.W = new Array(64);
}
utils.inherits(SHA256, BlockHash);
exports.sha256 = SHA256;

SHA256.blockSize = 512;
SHA256.outSize = 256;
SHA256.hmacStrength = 192;
SHA256.padLength = 64;

SHA256.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f = this.h[5];
  var g = this.h[6];
  var h = this.h[7];

  assert(this.k.length === W.length);
  for (var i = 0; i < W.length; i++) {
    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
    var T2 = sum32(s0_256(a), maj32(a, b, c));
    h = g;
    g = f;
    f = e;
    e = sum32(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32(T1, T2);
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
  this.h[5] = sum32(this.h[5], f);
  this.h[6] = sum32(this.h[6], g);
  this.h[7] = sum32(this.h[7], h);
};

SHA256.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};

function SHA224() {
  if (!(this instanceof SHA224))
    return new SHA224();

  SHA256.call(this);
  this.h = [ 0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
             0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
}
utils.inherits(SHA224, SHA256);
exports.sha224 = SHA224;

SHA224.blockSize = 512;
SHA224.outSize = 224;
SHA224.hmacStrength = 192;
SHA224.padLength = 64;

SHA224.prototype._digest = function digest(enc) {
  // Just truncate output
  if (enc === 'hex')
    return utils.toHex32(this.h.slice(0, 7), 'big');
  else
    return utils.split32(this.h.slice(0, 7), 'big');
};

function SHA512() {
  if (!(this instanceof SHA512))
    return new SHA512();

  BlockHash.call(this);
  this.h = [ 0x6a09e667, 0xf3bcc908,
             0xbb67ae85, 0x84caa73b,
             0x3c6ef372, 0xfe94f82b,
             0xa54ff53a, 0x5f1d36f1,
             0x510e527f, 0xade682d1,
             0x9b05688c, 0x2b3e6c1f,
             0x1f83d9ab, 0xfb41bd6b,
             0x5be0cd19, 0x137e2179 ];
  this.k = sha512_K;
  this.W = new Array(160);
}
utils.inherits(SHA512, BlockHash);
exports.sha512 = SHA512;

SHA512.blockSize = 1024;
SHA512.outSize = 512;
SHA512.hmacStrength = 192;
SHA512.padLength = 128;

SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
  var W = this.W;

  // 32 x 32bit words
  for (var i = 0; i < 32; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i += 2) {
    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
    var c1_hi = W[i - 14];  // i - 7
    var c1_lo = W[i - 13];
    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
    var c3_hi = W[i - 32];  // i - 16
    var c3_lo = W[i - 31];

    W[i] = sum64_4_hi(c0_hi, c0_lo,
                      c1_hi, c1_lo,
                      c2_hi, c2_lo,
                      c3_hi, c3_lo);
    W[i + 1] = sum64_4_lo(c0_hi, c0_lo,
                          c1_hi, c1_lo,
                          c2_hi, c2_lo,
                          c3_hi, c3_lo);
  }
};

SHA512.prototype._update = function _update(msg, start) {
  this._prepareBlock(msg, start);

  var W = this.W;

  var ah = this.h[0];
  var al = this.h[1];
  var bh = this.h[2];
  var bl = this.h[3];
  var ch = this.h[4];
  var cl = this.h[5];
  var dh = this.h[6];
  var dl = this.h[7];
  var eh = this.h[8];
  var el = this.h[9];
  var fh = this.h[10];
  var fl = this.h[11];
  var gh = this.h[12];
  var gl = this.h[13];
  var hh = this.h[14];
  var hl = this.h[15];

  assert(this.k.length === W.length);
  for (var i = 0; i < W.length; i += 2) {
    var c0_hi = hh;
    var c0_lo = hl;
    var c1_hi = s1_512_hi(eh, el);
    var c1_lo = s1_512_lo(eh, el);
    var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
    var c3_hi = this.k[i];
    var c3_lo = this.k[i + 1];
    var c4_hi = W[i];
    var c4_lo = W[i + 1];

    var T1_hi = sum64_5_hi(c0_hi, c0_lo,
                           c1_hi, c1_lo,
                           c2_hi, c2_lo,
                           c3_hi, c3_lo,
                           c4_hi, c4_lo);
    var T1_lo = sum64_5_lo(c0_hi, c0_lo,
                           c1_hi, c1_lo,
                           c2_hi, c2_lo,
                           c3_hi, c3_lo,
                           c4_hi, c4_lo);

    var c0_hi = s0_512_hi(ah, al);
    var c0_lo = s0_512_lo(ah, al);
    var c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
    var c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

    hh = gh;
    hl = gl;

    gh = fh;
    gl = fl;

    fh = eh;
    fl = el;

    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
    el = sum64_lo(dl, dl, T1_hi, T1_lo);

    dh = ch;
    dl = cl;

    ch = bh;
    cl = bl;

    bh = ah;
    bl = al;

    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
  }

  sum64(this.h, 0, ah, al);
  sum64(this.h, 2, bh, bl);
  sum64(this.h, 4, ch, cl);
  sum64(this.h, 6, dh, dl);
  sum64(this.h, 8, eh, el);
  sum64(this.h, 10, fh, fl);
  sum64(this.h, 12, gh, gl);
  sum64(this.h, 14, hh, hl);
};

SHA512.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};

function SHA384() {
  if (!(this instanceof SHA384))
    return new SHA384();

  SHA512.call(this);
  this.h = [ 0xcbbb9d5d, 0xc1059ed8,
             0x629a292a, 0x367cd507,
             0x9159015a, 0x3070dd17,
             0x152fecd8, 0xf70e5939,
             0x67332667, 0xffc00b31,
             0x8eb44a87, 0x68581511,
             0xdb0c2e0d, 0x64f98fa7,
             0x47b5481d, 0xbefa4fa4 ];
}
utils.inherits(SHA384, SHA512);
exports.sha384 = SHA384;

SHA384.blockSize = 1024;
SHA384.outSize = 384;
SHA384.hmacStrength = 192;
SHA384.padLength = 128;

SHA384.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h.slice(0, 12), 'big');
  else
    return utils.split32(this.h.slice(0, 12), 'big');
};

function SHA1() {
  if (!(this instanceof SHA1))
    return new SHA1();

  BlockHash.call(this);
  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe,
             0x10325476, 0xc3d2e1f0 ];
  this.W = new Array(80);
}

utils.inherits(SHA1, BlockHash);
exports.sha1 = SHA1;

SHA1.blockSize = 512;
SHA1.outSize = 160;
SHA1.hmacStrength = 80;
SHA1.padLength = 64;

SHA1.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];

  for(; i < W.length; i++)
    W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];

  for (var i = 0; i < W.length; i++) {
    var s = ~~(i / 20);
    var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
    e = d;
    d = c;
    c = rotl32(b, 30);
    b = a;
    a = t;
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
};

SHA1.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};

function ch32(x, y, z) {
  return (x & y) ^ ((~x) & z);
}

function maj32(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}

function p32(x, y, z) {
  return x ^ y ^ z;
}

function s0_256(x) {
  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
}

function s1_256(x) {
  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
}

function g0_256(x) {
  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
}

function g1_256(x) {
  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
}

function ft_1(s, x, y, z) {
  if (s === 0)
    return ch32(x, y, z);
  if (s === 1 || s === 3)
    return p32(x, y, z);
  if (s === 2)
    return maj32(x, y, z);
}

function ch64_hi(xh, xl, yh, yl, zh, zl) {
  var r = (xh & yh) ^ ((~xh) & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function ch64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ ((~xl) & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_hi(xh, xl, yh, yl, zh, zl) {
  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 28);
  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 28);
  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 14);
  var c1_hi = rotr64_hi(xh, xl, 18);
  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 14);
  var c1_lo = rotr64_lo(xh, xl, 18);
  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 1);
  var c1_hi = rotr64_hi(xh, xl, 8);
  var c2_hi = shr64_hi(xh, xl, 7);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 1);
  var c1_lo = rotr64_lo(xh, xl, 8);
  var c2_lo = shr64_lo(xh, xl, 7);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 19);
  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
  var c2_hi = shr64_hi(xh, xl, 6);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 19);
  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
  var c2_lo = shr64_lo(xh, xl, 6);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

},{"../hash":374}],379:[function(require,module,exports){
var utils = exports;
var inherits = require('inherits');

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === 'string') {
    if (!enc) {
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        var hi = c >> 8;
        var lo = c & 0xff;
        if (hi)
          res.push(hi, lo);
        else
          res.push(lo);
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (var i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (var i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
utils.toArray = toArray;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
utils.toHex = toHex;

function htonl(w) {
  var res = (w >>> 24) |
            ((w >>> 8) & 0xff00) |
            ((w << 8) & 0xff0000) |
            ((w & 0xff) << 24);
  return res >>> 0;
}
utils.htonl = htonl;

function toHex32(msg, endian) {
  var res = '';
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === 'little')
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
utils.toHex32 = toHex32;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
utils.zero2 = zero2;

function zero8(word) {
  if (word.length === 7)
    return '0' + word;
  else if (word.length === 6)
    return '00' + word;
  else if (word.length === 5)
    return '000' + word;
  else if (word.length === 4)
    return '0000' + word;
  else if (word.length === 3)
    return '00000' + word;
  else if (word.length === 2)
    return '000000' + word;
  else if (word.length === 1)
    return '0000000' + word;
  else
    return word;
}
utils.zero8 = zero8;

function join32(msg, start, end, endian) {
  var len = end - start;
  assert(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === 'big')
      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
    else
      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
utils.join32 = join32;

function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === 'big') {
      res[k] = m >>> 24;
      res[k + 1] = (m >>> 16) & 0xff;
      res[k + 2] = (m >>> 8) & 0xff;
      res[k + 3] = m & 0xff;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = (m >>> 16) & 0xff;
      res[k + 1] = (m >>> 8) & 0xff;
      res[k] = m & 0xff;
    }
  }
  return res;
}
utils.split32 = split32;

function rotr32(w, b) {
  return (w >>> b) | (w << (32 - b));
}
utils.rotr32 = rotr32;

function rotl32(w, b) {
  return (w << b) | (w >>> (32 - b));
}
utils.rotl32 = rotl32;

function sum32(a, b) {
  return (a + b) >>> 0;
}
utils.sum32 = sum32;

function sum32_3(a, b, c) {
  return (a + b + c) >>> 0;
}
utils.sum32_3 = sum32_3;

function sum32_4(a, b, c, d) {
  return (a + b + c + d) >>> 0;
}
utils.sum32_4 = sum32_4;

function sum32_5(a, b, c, d, e) {
  return (a + b + c + d + e) >>> 0;
}
utils.sum32_5 = sum32_5;

function assert(cond, msg) {
  if (!cond)
    throw new Error(msg || 'Assertion failed');
}
utils.assert = assert;

utils.inherits = inherits;

function sum64(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];

  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
exports.sum64 = sum64;

function sum64_hi(ah, al, bh, bl) {
  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
};
exports.sum64_hi = sum64_hi;

function sum64_lo(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
};
exports.sum64_lo = sum64_lo;

function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;

  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
};
exports.sum64_4_hi = sum64_4_hi;

function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
};
exports.sum64_4_lo = sum64_4_lo;

function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = (lo + el) >>> 0;
  carry += lo < el ? 1 : 0;

  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
};
exports.sum64_5_hi = sum64_5_hi;

function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;

  return lo >>> 0;
};
exports.sum64_5_lo = sum64_5_lo;

function rotr64_hi(ah, al, num) {
  var r = (al << (32 - num)) | (ah >>> num);
  return r >>> 0;
};
exports.rotr64_hi = rotr64_hi;

function rotr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
};
exports.rotr64_lo = rotr64_lo;

function shr64_hi(ah, al, num) {
  return ah >>> num;
};
exports.shr64_hi = shr64_hi;

function shr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
};
exports.shr64_lo = shr64_lo;

},{"inherits":380}],380:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],381:[function(require,module,exports){
/**
 * Injecter
 * ========
 *
 * This is a dependency injector specifically designed for use with Yours
 * Bitcoin. In order to allow injecting dependencies, Yours Bitcoin classes
 * provide an "inject" method that makes a new class with injected
 * dependencies. However, that method by itself presents a problem, because it
 * creates a new class every time it is used, leaving the burden of caching the
 * classes to the user. Thus the injector allows us to easily wrap an inject
 * method that keeps a cache of the created classes, lowing memory burden, and
 * allowing the instanceof operator to work correctly.
 */
'use strict'
let classmaps = new Map()

module.exports = function injector (inject, dependencies) {
  if (classmaps.get(inject) === undefined) {
    classmaps.set(inject, new Map())
  }

  let classmap = classmaps.get(inject)
  let meminject = function (deps) {
    let Class = classmap.get(deps)
    if (Class !== undefined) {
      return Class
    }

    Class = inject(Object.assign({}, dependencies, deps))
    classmap.set(deps, Class)

    // The "inject" and "injected" properties are non-enumerable so they don't
    // ruin any code that may enumerate properties of your classes.
    Object.defineProperty(Class, 'inject', {
      value: meminject,
      enumerable: false
    })
    Object.defineProperty(Class, 'injected', {
      value: deps,
      enumerable: false
    })
    return Class
  }

  return meminject
}

},{}],382:[function(require,module,exports){
(function (process,global,Buffer){
'use strict'

function oldBrowser () {
  throw new Error('secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11')
}

var crypto = global.crypto || global.msCrypto

if (crypto && crypto.getRandomValues) {
  module.exports = randomBytes
} else {
  module.exports = oldBrowser
}

function randomBytes (size, cb) {
  // phantomjs needs to throw
  if (size > 65536) throw new Error('requested too many random bytes')
  // in case browserify  isn't using the Uint8Array version
  var rawBytes = new global.Uint8Array(size)

  // This will not work in older browsers.
  // See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
  if (size > 0) {  // getRandomValues fails on IE if size == 0
    crypto.getRandomValues(rawBytes)
  }
  // phantomjs doesn't like a buffer being passed here
  var bytes = new Buffer(rawBytes.buffer)

  if (typeof cb === 'function') {
    return process.nextTick(function () {
      cb(null, bytes)
    })
  }

  return bytes
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)

},{"_process":322,"buffer":23}]},{},[1])