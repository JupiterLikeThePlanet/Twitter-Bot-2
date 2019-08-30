const config = require('./src/config');
const Twit = require('twit');



const Bot = new Twit(config)

/// setting time intervals
var thirtyMinutes = 1800000
var hourly = 3600000
var tenMinutes = 600000
var minute = 60000
var fortyFiveSeconds = 45000
var tenSeconds = 10000


function getTrendAndFollow(){
    
    // Get list of trending hashtags
    //https://developer.twitter.com/en/docs/trends/trends-for-location/api-reference/get-trends-place.html
    //id of 1 is global, 23424977 is United States  //https://blog.twitter.com/engineering/en_us/a/2010/woeids-in-twitters-trends.html
    Bot.get('trends/place', { id: '23424977' }, function (err, data, response) {
        if (err) {
            console.log(err);
        } else {
            
            // Grab a list of trending hashtags and get the length
            var trendsLength = data[0].trends.length

            // Select a random trending hashtag
            var randomTrend = Math.floor(Math.random()*trendsLength)

            // Select from either recent or mixed time periods,
            var rtArray = ["recent", "mixed"] //add popular?
            var rtLength = rtArray.length

            //Grab a random tweet from the previous constraints
            var random = Math.random() * (rtLength - 0) + 0
            var num = Math.floor(random)
            var rt = rtArray[num]

            //Setting params for search/tweets, adding a trending hashtag as the query, the rt grabs a randon tweet, and the language will be english
            var params = {
                q: `${data[0].trends[randomTrend].name}`,  // REQUIRED
                result_type: rt,
                lang: 'en'
            }

            // Search tweets with our trending hashtag
            //https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html
            Bot.get('search/tweets', params, function(err, data) {
                // if there no errors
                if (!err) {
                    
                    let retweetId,
                        userId,
                        screenName
                        
                    //this checks to see if the tweet is defined or not, which is important because if it isn't, it will error out
                    if(data.statuses[0] !== undefined){

                        // grab ID of tweet to retweet
                        retweetId = data.statuses[0].id_str;

                        // grab USER ID and SCREEN NAME from tweet to friend
                        userId = data.statuses[0].user.id
                        screenName = data.statuses[0].user.screen_name


                        // Tell TWITTER to retweet
                        //https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-retweet-id.html
                        Bot.post('statuses/retweet/:id', {
                            id: retweetId
                        }, function(err, data ,response) {
                            if (response) {
                                console.log(`${data.text} Retweeted!!!`);
                            }
                            // if there was an error while tweeting
                            if (err) {
                                console.log('Something went wrong while RETWEETING... Duplication maybe...');
                            }
                        });

                        // Tell Twitter to friend this tweeter
                        // https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-create.html
                        Bot.post('friendships/create', {
                            screen_name: screenName,
                            user_id: userId
                        }, function(err, data ,response) {
                            if (response) {
                                console.log(`${screenName} friended!!!`);
                            }
                            // if there was an error while friending
                            if (err) {
                                console.log('Something went wrong while FRIENDING... Duplication maybe...');
                            }
                        });

                    }
                    
                }
                // if unable to Search a tweet
                else {
                    console.log('Something went wrong while SEARCHING...');
                }
            });

        }

      })
   
}


// setInterval(getTrend, fortyFiveSeconds);
setInterval(getTrendAndFollow, minute);