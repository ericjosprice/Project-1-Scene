// use geolocation to get lon and lat
var lat, lon, acc;

var options = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 10
};

// when user clicks the foursquare button run the geolocation function
$(document).on("click", "#foursquare-button", clickedFourSquare)


function clickedFourSquare(){


function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    lat = crd.latitude;
    lon = crd.longitude;
    acc = crd.accuracy;
    display();
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
    //userOrigin defined in George's logic.js file
    //uncomment next line once George
    // userOrigin(lat, lon);
}


// ==================================================================================
//== get foursquare data

function getFoureSquareData() {

    var creds = "client_id=FEMSVD3N0IBIMAYZZU0DDZK3FUL3RPUI10XOPQ2YA3555ASP&client_secret=K0H2FTFUQJM2LXRZBZVTJFADEK0K0HJZXNAXPWJFI3VK3E5P";

    var sQueryURL = 'https://api.foursquare.com/v2/venues/search?' + creds + '&v=20180323&limit=5&ll=' + lat + ',' + lon + '&query=coffee&intent=browse&radius=1600'



    $.ajax({
        url: sQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.response.venues.length; i++) {
            var newDiv = $("<div>");
            var newP = $("<p>");
            newDiv.attr("id", i);
            newDiv.text(response.response.venues[i].name)
            newP.text(response.response.venues[i].location.address);
            newDiv.append(newP);
            $("#foursquare-data").append(newDiv);
        }



    });
    console.log(sQueryURL);

    // the below code is an attempt to get images from foursquare. this feature will be added if there is time
    // $.ajax({
    //     url: 'https://api.foursquare.com/v2/venues/VENUE_ID=4ce2a3b278ddf04dfde8b198/photos' + creds,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    // });
}

setTimeout(getFoureSquareData, 4000);
console.log("yelp button was clicked")
}