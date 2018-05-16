require('dotenv').config();

const minimist = require('minimist');
const client = require('./snoo.js');
const prettyjson = require('prettyjson');

let argv = minimist(process.argv);
const subreddit = argv.sub ? argv.sub :'all';
console.log('watching subreddit: '+subreddit);

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
