const request = require('request')
geocode = (address,callback) =>{
    geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidWphaW4zNTAiLCJhIjoiY2s3dTd6bjd5MHdhZDNlbjExc3B6NDh6aSJ9.LginkqRkF6YPpj7YMl6nVw&limit=1';
    request({url:geocodeURL, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to weather service!', undefined);
        }else if(response.body.features.length===0){
            callback('Unable to find the Location!',undefined);
        }else{
            callback(undefined, {
                Location: response.body.features[0].place_name,
                Latitude: response.body.features[0].center[1],
                Longitude: response.body.features[0].center[0],
            })
        }
    })
}
module.exports = geocode;