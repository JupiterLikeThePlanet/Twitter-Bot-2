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

function getTrends(){
    Bot.get('trends/place', { id: '1' }, function (err, data, response) {
        if (err) {
            console.log("In the error")
            console.log(err);
        } else {
            console.log("In the data")
            var trendsLength = data[0].trends.length
            var randomTrend = Math.floor(Math.random()*trendsLength)
        
            console.log(data[0].trends[randomTrend].name);
            

        }
      })
}

getTrends();

// setInterval(tweetScheduler, tenSeconds);
