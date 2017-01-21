/**
 * "Agent" is the central component of a payment channel. An agent has all the
 * information about one of the sides of a payment channel.  To use the Agent
 * class:
 *
 * let Agent = require('yours-channels').Agent
 */
global.YoursChannels = {};


global.YoursChannels.Agent = require('./lib/agent.js');
global.YoursChannels.Channel = require('./lib/channel.js');
global.YoursChannels.Consts = require('./lib/consts.js');
global.YoursChannels.Output = require('./lib/output.js');
global.YoursChannels.Wallet = require('./lib/wallet.js');

module.exports = YoursChannels;
