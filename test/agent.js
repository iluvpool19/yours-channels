/* global describe,it */
'use strict'
let should = require('should')
let Agent = require('../lib/agent.js')
let Wallet = require('../lib/wallet.js')
let asink = require('asink')
let Privkey = require('fullnode/lib/privkey')
let Pubkey = require('fullnode/lib/pubkey')
let BN = require('fullnode/lib/bn')

describe('Agent', function () {
  it('should exist', function () {
    should.exist(Agent)
    should.exist(new Agent())
    should.exist(Agent())
  })

  describe('#asyncInitialize', function () {
    it('asyncInitialize should exist', function () {
      let agent = Agent()
      should.exist(agent.asyncInitialize)
    })

    it('asyncInitialize should set a multisig script and address', function () {
      return asink(function *() {
        let alice = Agent('Alice')
        Object.keys(alice).should.deepEqual([ 'name' ])
        yield alice.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())

        should.exist(alice.privkey)
        should.exist(alice.pubkey)
        should.exist(alice.address)
        should.exist(alice.keypair)

        should.exist(alice.msPrivkey)
        should.exist(alice.msPubkey)

        should.exist(alice.wallet)

        should.exist(alice.htlcSecret)
        should.exist(alice.htlcSecret.buf)
        should.exist(alice.htlcSecret.hash)

        alice.initialized.should.equal(true)
      }, this)
    })
  })

  it('asyncInitializeOther should set a multisig script and address', function () {
    return asink(function *() {
      let alice = Agent('Alice')
      yield alice.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())

      let bob = Agent('Bob')
      yield bob.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())
      yield bob.asyncGenerateRevocationSecret()

      yield alice.asyncInitializeOther(bob.pubkey, bob.msPubkey, bob.revocationSecret.hidden())

      should.exist(alice.other.revocationSecrets)
      should.exist(alice.other.pubkey)
      should.exist(alice.other.address)
      should.exist(alice.other.msPubkey)
      alice.other.initialized.should.equal(true)
    }, this)
  })

  describe('#asyncBuildMultisig', function () {
    it('asyncBuildMultisig should create a multisig address', function () {
      return asink(function *() {
        let alice = Agent('Alice')
        yield alice.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())

        let bob = Agent('Bob')
        yield bob.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())
        yield bob.asyncGenerateRevocationSecret()

        yield alice.asyncInitializeOther(bob.pubkey, bob.msPubkey, bob.revocationSecret.hidden())
        yield alice.asyncBuildMultisig()

        should.exist(alice.multisig)
      }, this)
    })
  })

  /* funding the channel */

  describe('#asyncBuildFundingTxb', function () {
    it('asyncBuildFundingTxb should create a funding tx', function () {
      return asink(function *() {
        let alice = Agent('Alice')
        yield alice.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())

        let bob = Agent('Bob')
        yield bob.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())
        yield bob.asyncGenerateRevocationSecret()

        yield alice.asyncInitializeOther(bob.pubkey, bob.msPubkey, bob.revocationSecret.hidden())
        yield alice.asyncBuildMultisig()

        // build output to be spent in funding transaction
        let amount = BN(2e7)
        let wallet = Wallet()
        let output = wallet.getUnspentOutput(amount, alice.address)
        let tx = yield alice.asyncBuildFundingTx(amount, output.txhashbuf, output.txoutnum, output.txout, output.pubkey)

        let outValbn0 = tx.txouts[0].valuebn
        let outValbn1 = tx.txouts[1].valuebn

        // first output should equal amount
        outValbn0.eq(amount).should.equal(true)
        // sum of outputs should be smaller than inputs
        outValbn0.add(outValbn1).lt(BN(1e10)).should.equal(true)
        // there should be one output
        tx.toJSON().txins.length.should.equal(1)
        // and two inputs
        tx.toJSON().txouts.length.should.equal(2)
        ;(tx.toJSON().txouts[0].valuebn).should.equal(amount.toString())
        // agents balane should be updated
        alice.balance.should.equal(amount)
      }, this)
    })
  })

  describe('#asyncGenerateRevocationSecret', function () {
    it('asyncGenerateRevocationSecret should create a htlc and revocation secret', function () {
      return asink(function *() {
        let alice = Agent('Alice')
        yield alice.asyncGenerateRevocationSecret()

        should.exist(alice.revocationSecret)
        should.exist(alice.revocationSecret.buf)
        should.exist(alice.revocationSecret.hash)
      }, this)
    })
  })

  describe('#storeOtherRevocationSecret', function () {
    it('storeOtherRevocationSecret store the other users hidden htlc and revocation secret', function () {
      return asink(function *() {
        let alice = Agent('Alice')
        yield alice.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())
        yield alice.asyncGenerateRevocationSecret()

        let bob = Agent('Bob')
        yield bob.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())
        yield bob.asyncGenerateRevocationSecret()

        yield alice.asyncInitializeOther(bob.pubkey, bob.msPubkey, bob.revocationSecret.hidden())
        yield bob.asyncInitializeOther(alice.pubkey, alice.msPubkey, bob.revocationSecret.hidden())

        bob.storeOtherRevocationSecret(alice.revocationSecret.hidden())

        should.exist(bob.other.revocationSecret)
        should.exist(bob.other.revocationSecret.hash)
        should.not.exist(bob.other.revocationSecret.buf)
      }, this)
    })

    it('storeOtherSecrets should throw an error when called with a non-hidden secret', function () {
      return asink(function *() {
        let alice = Agent('Alice')
        yield alice.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())
        yield alice.asyncGenerateRevocationSecret()

        let bob = Agent('Bob')
        yield bob.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())
        yield bob.asyncGenerateRevocationSecret()

        yield alice.asyncInitializeOther(bob.pubkey, bob.msPubkey, bob.revocationSecret.hidden())
        yield bob.asyncInitializeOther(alice.pubkey, alice.msPubkey, bob.revocationSecret.hidden())

        bob.storeOtherRevocationSecret.bind(alice.revocationSecret).should.throw()
      }, this)
    })
  })

  /* building a payment */

  describe('#asyncBuildCommitmentTxb', function () {
    it('asyncBuildCommitmentTxb should create a partial payment tx', function () {
      return asink(function *() {
        let alice = Agent('Alice')
        yield alice.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())
        yield alice.asyncGenerateRevocationSecret()

        let bob = Agent('Bob')
        yield bob.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())
        yield bob.asyncGenerateRevocationSecret()

        yield alice.asyncInitializeOther(bob.pubkey, bob.msPubkey, bob.revocationSecret.hidden())
        yield alice.asyncBuildMultisig()

        yield bob.asyncInitializeOther(alice.pubkey, alice.msPubkey, bob.revocationSecret.hidden())
        yield bob.asyncBuildMultisig()

        let unspentAmount = BN(1e8)
        let output = alice.wallet.getUnspentOutput(unspentAmount, alice.address)
        yield alice.asyncBuildFundingTx(unspentAmount, output.txhashbuf, output.txoutnum, output.txout, output.pubkey)

        alice.storeOtherRevocationSecret(bob.revocationSecret.hidden())
        bob.storeOtherRevocationSecret(alice.revocationSecret.hidden())

        let txb = yield alice.asyncBuildCommitmentTxb(BN(5e6), BN(5e6))
        let tx = txb.tx

        tx.toJSON().txins.length.should.equal(1)
        tx.toJSON().txouts.length.should.equal(3)
        ;(tx.toJSON().txouts[0].valuebn).should.equal(BN(5e6).toString())
        ;(tx.toJSON().txouts[1].valuebn).should.equal(BN(5e6).toString())
      }, this)
    })
  })

  describe('#asyncAcceptCommitmentTxb', function () {
    it('asyncAcceptCommitmentTxb should create a htlc tx', function () {
      return asink(function *() {
        let alice = Agent('Alice')
        yield alice.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())
        yield alice.asyncGenerateRevocationSecret()

        let bob = Agent('Bob')
        yield bob.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())
        yield bob.asyncGenerateRevocationSecret()

        yield alice.asyncInitializeOther(bob.pubkey, bob.msPubkey, bob.revocationSecret.hidden())
        yield alice.asyncBuildMultisig()

        yield bob.asyncInitializeOther(alice.pubkey, alice.msPubkey, bob.revocationSecret.hidden())
        yield bob.asyncBuildMultisig()

        let unspentAmount = BN(1e8)
        let output = alice.wallet.getUnspentOutput(unspentAmount, alice.address)
        yield alice.asyncBuildFundingTx(unspentAmount, output.txhashbuf, output.txoutnum, output.txout, output.pubkey)

        alice.storeOtherRevocationSecret(bob.revocationSecret.hidden())
        bob.storeOtherRevocationSecret(alice.revocationSecret.hidden())

        let txb = yield alice.asyncBuildCommitmentTxb(BN(5e6), BN(5e6))
        let tx = yield bob.asyncAcceptCommitmentTx(txb)

        tx.toJSON().txins.length.should.equal(1)
        tx.toJSON().txouts.length.should.equal(3)
        ;(tx.toJSON().txouts[0].valuebn).should.equal(BN(5e6).toString())
        ;(tx.toJSON().txouts[1].valuebn).should.equal(BN(5e6).toString())
      }, this)
    })
  })

  describe('#asyncOpenChannel', function () {
    it('asyncOpenChannel should store the other agents addeses and build a multisig address', function () {
      return asink(function *() {
        let alice = Agent('Alice')
        yield alice.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())
        let bob = Agent('Bob')
        yield bob.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())

        // right now Alice and Bob communicate by storing a reference to one another
        // eventually this will be replaced by some form of remote proceedure calls
        alice.remoteAgent = bob
        bob.remoteAgent = alice

        should.not.exist(alice.fundingTx)
        should.not.exist(alice.fundingTxhashbuf)
        should.not.exist(bob.fundingTx)
        should.not.exist(bob.fundingTxhashbuf)

        // Alice opens a channel to bob
        alice.funder = true
        yield bob.asyncOpenChannel(BN(1e6), alice.pubkey, alice.msPubkey, alice.htlcSecret.hidden())

        should.exist(alice.multisig)
        should.exist(alice.fundingTx)
        should.exist(alice.other)
        should.exist(alice.other.htlcSecret)
        should.exist(alice.other.htlcSecret.hash)
        should.not.exist(alice.other.htlcSecret.buf)

        should.exist(bob.multisig)
        should.not.exist(bob.fundingTx)
        should.exist(bob.other)
        should.exist(bob.other.htlcSecret)
        should.exist(bob.other.htlcSecret.hash)
        should.not.exist(bob.other.htlcSecret.buf)
      }, this)
    })
  })

  describe('#asyncSend', function () {
    it('asyncSend should store the other agents addeses and build a multisig address', function () {
      return asink(function *() {
        let alice = Agent('Alice')
        yield alice.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())

        let bob = Agent('Bob')
        yield bob.asyncInitialize(Privkey().fromRandom(), Privkey().fromRandom())

        // right now Alice and Bob communicate by storing a reference to one another
        // eventually this will be replaced by some form of remote proceedure calls
        alice.remoteAgent = bob
        bob.remoteAgent = alice

        // Alice opens a channel to bob
        alice.funder = true
        yield bob.asyncOpenChannel(BN(1e6), alice.pubkey, alice.msPubkey, alice.htlcSecret.hidden())
        // Alice and Bob generate new secrets for upcoming payment
        alice.sender = true
        yield alice.asyncGenerateRevocationSecret()
        yield bob.asyncGenerateRevocationSecret()

        // they also should not have a funding trasnaction
        should.exists(alice.fundingTx)
        should.exists(alice.fundingTxhashbuf)
        should.not.exists(bob.fundingTx)
        should.exists(bob.fundingTxhashbuf)

        yield bob.asyncSend(BN(1e5), BN(1e5), alice.revocationSecret.hidden())

        // after the initialization phase of the protocol, both should have secrest
        should.exist(alice.other.revocationSecret)
        should.exist(bob.other.revocationSecret)
        should.exist(alice.other.htlcSecret)
        should.exist(bob.other.htlcSecret)

        should.exist(alice.commitmentTx)
        should.exist(bob.commitmentTx)

        alice.other.revocationSecrets.length.should.equal(1)
        // alice.revocationSecret.should
      }, this)
    })
  })
})
