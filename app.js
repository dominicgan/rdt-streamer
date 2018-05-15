require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

// Build Snoowrap and Snoosatorm clients
const r = new Snoowrap({
	userAgent: 'reddit-bot-example-node',
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	username: process.env.REDDIT_USER,
	password: process.env.REDDIT_PASS
});

const client = new Snoostorm(r);

// Configure options for stream: subreddit & results per query
const streamOpts = {
	subreddit: 'all',
	results: 25
};

let prettyjson = require('prettyjson');
let options = {
	noColor: false
};

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {
	console.log(prettyjson.render(comment, options));
	// console.log(typeof comment);
});
