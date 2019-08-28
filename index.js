const config = require('./src/config');
const Twit = require('twit');



const Bot = new Twit(config)

/// setting time intervals
var thirtyMinutes = 1800000
var hourly = 3600000
var tenMinutes = 600000
var tenSeconds = 10000

///note: maybe refactor into another file, call into other files.
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


function tweetScheduler(){
    var randomNumber = Math.floor(Math.random()*1000)
    tweet(randomNumber)
}


function getTrend(){
    
    //id of 1 is global, 23424977 is United States  //https://blog.twitter.com/engineering/en_us/a/2010/woeids-in-twitters-trends.html
    Bot.get('trends/place', { id: '23424977' }, function (err, data, response) {
        if (err) {
            // console.log("In the error")
            console.log(err);
        } else {
            // console.log("In the data")
            var trendsLength = data[0].trends.length
            var randomTrend = Math.floor(Math.random()*trendsLength)
            
            // console.log(data[0].trends[randomTrend].name);

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
            ///////////////////////////////////////////////////////
            Bot.get('search/tweets', params, function(err, data) {
                // if there no errors
                if (!err) {
                    // grab ID of tweet to retweet
                    let retweetId
                    // var retweetId = data.statuses[0].id_str;
                    if(data.statuses[0] !== undefined){
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
                    // else{
                    //     Bot.post('statuses/update', {
                    //         status: "Smash that subscribe for more trending hash tag posts!"
                    //     }, (err, data, response) => {
                    //         if (err) {
                    //             console.log(err)
                    //         } else {
                    //             console.log(`${data.text} tweeted!`)
                    //     }
                    //     })

                    // }
                    
                }
                // if unable to Search a tweet
                else {
                    console.log('Something went wrong while SEARCHING...');
                }
            });
            ///////////////////////////////////////////////////////
        }

      })
   
}



// getTrend();




setInterval(getTrend, tenSeconds);
