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

const subreddit = 'singapore';

// Configure options for stream: subreddit & results per query
const streamOpts = {
	subreddit: subreddit,
	results: 25
};

const prettyJsonOpts = {
	noColor: false
};

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {
	let filteredData = {
		subreddit_name: comment.subreddit_name_prefixed,
		link_title: comment.link_title,
		body: comment.body,
		comment_author: comment.author.name,
		permalink: 'https://www.reddit.com'+comment.permalink
	};
	console.log(prettyjson.render(filteredData, prettyJsonOpts));
	console.log('\n');
	// console.log(typeof comment);
});
