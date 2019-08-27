#This is a twitter bot called HOT GOSS

## Non Code Setup 
- Either create a twitter account or use one you are comfortable making into a bot.  
- You'll need to [sign up](https://apps.twitter.com/) to create a Twitter App
- Once you create the application, there are 4 important things to note down over at the “Keys and Access Tokens” tab:
* Consumer Key
* Consumer Secret
* Access Token Key
* Access Token Secret

> A good breakdown of these past steps can be found [here](Follow these steps: https://dev.to/omarhashimoto/how-to-build-a-simple-twitter-bot-in-17-lines-ofcode-2aan)


## Initializing the Project
- create a project in github making sure to add a .gitignore shaped around node and an MIT License
- git clone the project in the terminal.
- Open the project in your text editor and in your terminal, type `npm init`.  You can fill the information any way you please.
- We will install a few npm packages.  Run `npm install twit dotenv --save`.  This will install `twit` api client for node, documentation [here](https://github.com/ttezel/twit), which will help us create all the actions we need for our bot.  The `dotenv` package will help us conceal our api keys.

- Lets start by creating our `.env` file. Inside of this file we create 4 variable names to set equal to our keys.  Name them what you will but here's an example of what's in the file. 
<pre><code>
BOT_CONSUMER_KEY=YourKeyHere

BOT_CONSUMER_SECRET=YourKeyHere

BOT_ACCESS_TOKEN=YourKeyHere

BOT_ACCESS_TOKEN_SECRET=YourKeyHere
</code></pre>

- Let's start with creating a folder called /src.  Inside this folder we will create a file called `config.js`.  

- inside the config file, add the following code.  Note that the variable names I'm using here are the same ones we used in the `.env` file.  

<pre><code>
require('dotenv').config()

module.exports = ({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});
</code></pre>

## Initializing the Project