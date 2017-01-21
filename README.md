# Yours Channels

A Bitcoin micropayment protocol built in Javascript. Based on our [Javascript
implementation of Bitcoin](https://github.com/yoursnetwork/yours-bitcoin).

Check out our  [gentle introduction to the lightning
network](https://github.com/yoursnetwork/yours-channels/blob/master/docs/gentle-lightning.md).
We also have a [prospectus system
description](https://github.com/yoursnetwork/yours-channels/blob/master/docs/yours-lightning.md)
that we are keeping more or less in sync with the implementation.

This is a work in progress and will change all the time.

To build bundle: 
`npm install` (if not already installed)
`gulp`

`var myXPrv = YoursBitcoin.Bip32.fromRandom()`

`var myAgent = new YoursChannels.Agent()`

`var myChannel = new YoursChannels.Channel()`
