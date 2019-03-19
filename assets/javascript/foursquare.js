// Client ID
// FEMSVD3N0IBIMAYZZU0DDZK3FUL3RPUI10XOPQ2YA3555ASP
// Client Secret
// K0H2FTFUQJM2LXRZBZVTJFADEK0K0HJZXNAXPWJFI3VK3E5P

// $.ajax({
//     url: "https://api.foursquare.com/v2/venues/categories" +"FEMSVD3N0IBIMAYZZU0DDZK3FUL3RPUI10XOPQ2YA3555ASP" + "K0H2FTFUQJM2LXRZBZVTJFADEK0K0HJZXNAXPWJFI3VK3E5P",
//     method: "GET"
// }).then(function(response){
//     console.log(response)
// });

//endpoint for nearby venues/search 
// parameters for nearby lat/long = 40.7629212,-73.9935085; query = ShopMart; intent = browse; radius = 500
//credentials above
//===================================================================================
// use geolocation to get lon and lat

var lat, lon, acc;

var options = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 10
};

function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    lat = crd.latitude;
    lon = crd.longitude;
    acc = crd.accuracy;

}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
// run geolocation code. success, failure, and the last argument failure. 
navigator.geolocation.getCurrentPosition(success, error, options);

// display information on page
function display() {
    $("#lat").text(lat);
    $("#lon").text(lon);
    $("#accuracy").text(acc);
    console.log(lat);
    console.log(lon);
    console.log(acc);
}

setTimeout(display, 5000);

// ==================================================================================
//== get foursquare data

function getFoureSquareData() {

    var creds = "client_id=FEMSVD3N0IBIMAYZZU0DDZK3FUL3RPUI10XOPQ2YA3555ASP&client_secret=K0H2FTFUQJM2LXRZBZVTJFADEK0K0HJZXNAXPWJFI3VK3E5P";
    var sQueryURL = 'https://api.foursquare.com/v2/venues/search?' + creds + '&v=20180323&limit=5&ll=30.2870995,-97.72883279999999&query=bars&intent=browse&radius=5000'

    $.ajax({
        url: sQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
    console.log(sQueryURL);
    console.log("*************");
    $.ajax({
        url: 'https://api.foursquare.com/v2/venues/VENUE_ID=4ce2a3b278ddf04dfde8b198/photos' + creds,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}

setTimeout(getFoureSquareData, 7000);