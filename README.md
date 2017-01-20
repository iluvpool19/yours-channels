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
`npm install -g gulp` (if not already installed)
`gulp`

Line 18658 of the bundle is `Worker: !process.browser ? require('child_process') : self.Worker,`
it is the only line that isn't functional for self not being defined at this point.
it can be changed to `Worker: require('child_process')` and it will work fine as far as I know.

