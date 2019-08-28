const config = require('../src/config');
const Twit = require('twit');

const Bot = new Twit(config)

/// setting time intervals
var thirtyMinutes = 1800000
var hourly = 3600000
var tenMinutes = 600000
var minute = 60000
var fortyFiveSeconds = 45000
var tenSeconds = 10000


function getTrend(){
    
    //id of 1 is global, 23424977 is United States  //https://blog.twitter.com/engineering/en_us/a/2010/woeids-in-twitters-trends.html
    Bot.get('trends/place', { id: '23424977' }, function (err, data, response) {
        if (err) {
            console.log(err);
        } else {
            
            var trendsLength = data[0].trends.length
            var randomTrend = Math.floor(Math.random()*trendsLength)
            
    
            var rtArray = ["recent", "mixed"] //add popular?
            var rtLength = rtArray.length
            var random = Math.random() * (rtLength - 0) + 0
            var num = Math.floor(random)
            var rt = rtArray[num]

            var params = {
                q: `${data[0].trends[randomTrend].name}`,  // REQUIRED
                result_type: rt,
                lang: 'en'
            }
            
            Bot.get('search/tweets', params, function(err, data) {
                // if there no errors
                if (!err) {
                    
                    let retweetId
                    if(data.statuses[0] !== undefined){

                        // grab ID of tweet to retweet
                        retweetId = data.statuses[0].id_str;

                    // Tell TWITTER to retweet
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


setInterval(getTrend, fortyFiveSeconds);