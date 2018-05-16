require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');
const prettyjson = require('prettyjson');

// START: Snoo Polling Setup
// Build Snoowrap and Snoosatorm clients
const r = new Snoowrap({
	userAgent: 'reddit-bot-example-node',
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	username: process.env.REDDIT_USER,
	password: process.env.REDDIT_PASS
});

const client = new Snoostorm(r);
// END: Snoo Polling Setup

module.exports = client;
