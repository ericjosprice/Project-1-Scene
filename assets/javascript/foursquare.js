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
//===================================================================================
// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyASKSOl-vh7Ctml-gBjg70xwgNB77GAdco",
//     authDomain: "yayornay-a4231.firebaseapp.com",
//     databaseURL: "https://yayornay-a4231.firebaseio.com",
//     projectId: "yayornay-a4231",
//     storageBucket: "yayornay-a4231.appspot.com",
//     messagingSenderId: "473437635582"
// };
// firebase.initializeApp(config);


// var database = firebase.database();


// // Capture Button Click
// $("#submit-btn").on("click", function (event) {
//     event.preventDefault();
//     console.log("clicked submit button")
//     // Grabbed values from text boxes
//     var sCoffeeShop = $("#business-input").val().trim();
//     var sAddress = $("#address-input").val().trim();
//     var sDeal = $("#deal-input").val().trim();
//     var sTime = $("#timeframe-input").val().trim();
//     if (sCoffeeShop === "" ||
//         sAddress === "" ||
//         sDeal === "" ||
//         sTime === "") {
//         alert("Complete all fields to continue.");
//         return;
//     } else {
//         // Code for handling the push
//         database.ref().push({
//             business: sCoffeeShop,
//             address: sAddress,
//             deal: sDeal,
//             time: sTime,
//             dateAdded: firebase.database.ServerValue.TIMESTAMP
//         });

//         $("#business-input").val("")
//         $("#address-input").val("")
//         $("#deal-input").val("")
//         $("#timeframe-input").val("")
//     }
// });

// // Firebase watcher .on("child_added"
// database.ref().on("child_added", function (childSnapshot) {
//     // storing the snapshot.val() in a variable for convenience
//     var sv = childSnapshot.val();

//     // Console.loging the last user's data
//     console.log(sv);
//     console.log(sv.business);
//     console.log(sv.address);
//     console.log(sv.deal);
//     console.log(sv.time);
//     // console.log("moment: " + moment().startOf(sv.time).fromNow());
//     // console.log("minutes till train: " + moment(sv.time, 'HH:mm').diff(moment(), "minutes"))

//     // store time variable for display
//     // var sArrival = moment(sv.time, 'HH:mm').format('hh:mm a');
//     // var sMinutes = moment(sv.time, 'HH:mm').diff(moment(), "minutes");

//     // if (sMinutes <= 0) {
//     //     sMinutes = "Departed";
//     // }


//     $("#feed").prepend("<div class='jumbotron'><div id='bar-name'>" +
//         sv.business +
//         " </div><div id='bar-location'>" + sv.address +
//         " </div><div id='deal-description'>" + sv.deal +
//         //convert sv.time to a usable format for moment.js then format for display in hh, which displays hours in standard time
//         " </div><div id='deal-timeframe'>" + sv.time +
//         " </div><div id='listing-buttons-left'></div><a class= 'listing-button' href='#'><i class='fab fa-yelp'></i></a><a class= 'listing-button' href='#'><i class='fas fa-map-marker-alt'></i></a></div><div id='listing-buttons-right'><a class= 'listing-button' href='#'><i class='fas fa-thumbs-up'></i></a><div class= 'listing-value'></div><a class= 'listing-button' href='#'><i class='fas fa-thumbs-down'></i></a><div class= 'listing-value'></div></div></div></div>");
//     //   $("#train-table").append(row)
//     //   $("#train-name-display").text(sv.name);
//     //   $("#destination-display").text(sv.destination);
//     //   $("#time-display").text(sv.time);
//     //   $("#frequency-display").text(sv.frequency);

setTimeout(getFoureSquareData, 4000);
console.log("yelp button was clicked")
}
