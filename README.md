#This is a twitter bot called SHEEPLE (@sheeplefollows)

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

## Creating core Functionality

- create a file called `index.js`.  At the  top, add our required packages:

<pre><code>
const config = require('./src/config');
const Twit = require('twit');
</code></pre>
This allows us to use our concealed api keys and brings in the twit package.  

- create a new instance of your bot by setting ait equal to a variable, like so: `const Bot = new Twit(config)`.  Of course, you can call the variable anything you want.

- I personally use variables to store my times because their written in milliseconds and var name is less confusing.  So because we are going to test our twitter bot, there's no need have long run times.  Create a variable that is set to ten seconds like so: `var tenSeconds = 10000`

- Next, create a function called tweet like so:
<pre><code>
    function tweet(txt) {
        Bot.post('statuses/update', {
            status: txt
        }, (err, data, response) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`${data.text} tweeted!`)
        }
    })
    }
</code></pre>
This code takes a string as it's param.  The Bot var uses a twit post command that specifically targets your tweeter posts (here read as 'statuses/update') and takes as it's status the parameter.  If it errors out the console will receive an error message, else log a successful tweet.  

- Next is function I created to help me tweet a random number.  Why random? Because twitter will not post 2 duplicate statuses in a row. So for the sake of just making something work, I created a `tweetRandomNumber` function like so:
<pre><code>
function tweetRandomNumber(){
    var randomNumber = Math.floor(Math.random()*1000)
    tweet(randomNumber)
}
</code></pre>

- Then finally at the bottom of the file, we call fire off our functions using javascripts built in function `setInterval`, taking as it's parameters our tweetRandomNumber function and the amount of time, here tenSeconds:
<pre><code>
setInterval(tweetRandomNumber, tenSeconds);
</code></pre>

- To test to see if this works, go to terminal and type, `node index.js`.  Check your twitter feed to see that it works. Check console for logs or errors.  




## Launching to Heroku

- If you don't have one, get a heroku account [here](https://devcenter.heroku.com/articles/heroku-cli) and follow the install instructions
- In the terminal, type `heroku login` and press any key to be taken to the web browser to login OR If you’d prefer to stay in the CLI to enter your credentials, you may run `heroku login -i`

- in package.json file add this:
<pre><code>
  "scripts": {
    "start": "node index.js"
  },
</code></pre>






### And that's where I leave you.  Feel free to continue on from there using the twit documentation to expand on other twitter api features. 

<hr>

-please note [twitter limitations](https://help.twitter.com/en/rules-and-policies/twitter-limits)

-additional documenation for the twitter api can be found [here](https://developer.twitter.com/en/docs/api-reference-index) and [here](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets) 

