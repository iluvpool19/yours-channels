/**
 * "Agent" is the central component of a payment channel. An agent has all the
 * information about one of the sides of a payment channel.  To use the Agent
 * class:
 *
 * let Agent = require('yours-channels').Agent
 */
const lib = {};
lib.Agent = require('./lib/agent.js');
lib.Channel = require('./lib/channel.js');
lib.Consts = require('./lib/consts.js');
lib.Output = require('./lib/output.js');
lib.Wallet = require('./lib/wallet.js');


module.exports = lib;
