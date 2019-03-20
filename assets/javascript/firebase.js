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
// function renderContent(){
//     database.ref().on("child_added", function (childSnapshot) {
//         // storing the snapshot.val() in a variable for convenience
//         var sv = childSnapshot.val();

//         // Console.loging the last user's data
//         console.log(sv);
//         console.log(sv.business);
//         console.log(sv.address);
//         console.log(sv.deal);
//         console.log(sv.time);
//         // console.log("moment: " + moment().startOf(sv.time).fromNow());
//         // console.log("minutes till train: " + moment(sv.time, 'HH:mm').diff(moment(), "minutes"))

//         // store time variable for display
//         // var sArrival = moment(sv.time, 'HH:mm').format('hh:mm a');
//         // var sMinutes = moment(sv.time, 'HH:mm').diff(moment(), "minutes");

//         // if (sMinutes <= 0) {
//         //     sMinutes = "Departed";
//         // }


//         $("#feed").append("<div class='jumbotron'><div id='bar-name'>" +
//             sv.business +
//             " </div><div id='bar-location'>" + sv.address +
//             " </div><div id='deal-description'>" + sv.deal +
//             //convert sv.time to a usable format for moment.js then format for display in hh, which displays hours in standard time
//             " </div><div id='deal-timeframe'>" + sv.time +
//             " </div><div id='listing-buttons-left'></div><a class= 'listing-button' href='#'><i class='fab fa-yelp'></i></a><a class= 'listing-button' href='#'><i class='fas fa-map-marker-alt'></i></a></div><div id='listing-buttons-right'><a class= 'listing-button' href='#'><i class='fas fa-thumbs-up'></i></a><div class= 'listing-value'></div><a class= 'listing-button' href='#'><i class='fas fa-thumbs-down'></i></a><div class= 'listing-value'></div></div></div></div>");
//         //   $("#train-table").append(row)
//         //   $("#train-name-display").text(sv.name);
//         //   $("#destination-display").text(sv.destination);
//         //   $("#time-display").text(sv.time);
//         //   $("#frequency-display").text(sv.frequency);

//         // Handle the errors
//     }, function (errorObject) {
//         console.log("Errors handled: " + errorObject.code);
//     });
// }






