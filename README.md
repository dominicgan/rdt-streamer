# rdt-streamer
A rudimentary node.js app to stream reddit comments in the cli.

## Getting started

1. Clone repository
2. Create a `.env` file in the app project directory:

    ```
    CLIENT_ID=<client_id_here>  
    CLIENT_SECRET=<client_secret_here>  
    REDDIT_USER=<username_here>  
    REDDIT_PASS=<password_here>   
    ```

3. run `npm install`
4. run `node app <args>` to start app

## Options

|Argument|Description|
|-|-|
|`--url <reddit_post_url>`|watches a post for new comments and emits to console when detected.|
|`--sub <reddit_subreddit_name>`|watches sub for new comments on any post and emits to console when detected.|

If no args are passed, app will **/r/all** for new comments.
