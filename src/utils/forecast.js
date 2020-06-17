const request = require('request')
forecast = (Latitude,Longitude,callback) =>{
    url = 'https://api.darksky.net/forecast/72dfa43bb62ecd5103c5b924806b1a5a/' + Latitude + ',' + Longitude + '?units=si';
    request({url, json:true}, (error,response)=>{
        if(error){
            callback('Unable to connect to weather service!',undefined);
        }else if(response.body.error){
            callback('Unable to find the Location!',undefined)
        }else{
            callback(undefined,"it is currently " + response.body.currently.temperature + " degrees out. There is a " +response.body.currently.precipProbability + " chance of rain.")
        }
    })
}
module.exports = forecast;