require('dotenv').config();

const minimist = require('minimist');
const boxen = require('boxen');
const client = require('./snoo.js');
const prettyjson = require('prettyjson');

// Configure options for stream: subreddit & results per query
const streamOpts = {
	subreddit: 'all',
	results: 25
};

const argv = minimist(process.argv);
const subreddit = argv.sub ? argv.sub :'all';
const posturl = argv.url;

let postid;
let postsub;

// parse post url
if (posturl) {
	// get the post id from url (../comments/POST_ID/post-title...)
	postid = posturl.split('/comments/')[1].split('/')[0];
	// get the post subreddit from url (...eddit.com/r/SUBREDDIT/...)
	postsub = posturl.split('reddit.com/r/')[1].split('/')[0];
	streamOpts.subreddit = postsub;

	console.log(postsub, postid);
} else {
	if (argv.sub) {
		streamOpts.subreddit = argv.sub;
	}
}



console.log('watching subreddit: '+streamOpts.subreddit);

const prettyJsonOpts = {
	noColor: false
};

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

let printFilteredData = function(comment) {
	let fData= {
		sub: '/'+comment.subreddit_name_prefixed,
		post: comment.link_title,
		comment: comment.body,
		user: '/u/'+comment.author.name,
		url: 'https://www.reddit.com'+comment.permalink
	};

	console.log(
		boxen(
			prettyjson.render(fData, prettyJsonOpts),
			{padding: 1}
		)
	);

	return true;

}

// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {
	// console.log('https://www.reddit.com' + comment.permalink);
	if (posturl) {
		if (comment.link_id.split('t3_')[1] === postid) {
			// print only comments from post
			printFilteredData(comment);
		}
	} else {
		// print all comments
		printFilteredData(comment);
	}
	// console.log(typeof comment);
});
