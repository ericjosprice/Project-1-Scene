$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyASKSOl-vh7Ctml-gBjg70xwgNB77GAdco",
    authDomain: "yayornay-a4231.firebaseapp.com",
    databaseURL: "https://yayornay-a4231.firebaseio.com",
    projectId: "yayornay-a4231",
    storageBucket: "yayornay-a4231.appspot.com",
    messagingSenderId: "473437635582"
  };
  firebase.initializeApp(config);
  
  
  var database = firebase.database();

// Wes' code starts

  $("#create-post").on("click", function(){
    $("#create-post").addClass("animated pulse");
    setTimeout(function(){
        $("#create-post").removeClass("animated pulse") 
    }, 1000);
    $("#post-form").toggleClass("hide").addClass("animated fadeInUp");
  });

  $("#foursquare-button").on("click", function(){
    $("#foursquare-button").addClass("animated pulse");
    setTimeout(function(){
        $("#foursquare-button").removeClass("animated pulse") 
    }, 1000);
    $("#foursquare").toggleClass("hide").addClass("animated fadeInUp");
  });

  $("#get-directions").on("click", function(){
    $("#directions-container").removeClass("hide");
  });

  $("#close-directions").on("click", function(){
    $("#directions-container").addClass("hide");
  });

  $("#form-submit").on("click", function(){

    event.preventDefault();

    // Form inputs
    var businessInput = $("#business-input").val().trim();
    var addressInput = $("#address-input").val().trim();
    var dealInput = $("#deal-input").val().trim();
    var timeframeInput = $("#timeframe-input").val().trim();

    if (businessInput === "" ||
        addressInput === "" ||
        dealInput === "" ||
        timeframeInput === "") {
        alert("Complete all fields to continue.");
        return;
    } else {
        // Code for handling the push
        database.ref().push({
            business: businessInput,
            address: addressInput,
            deal: dealInput,
            time: timeframeInput,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        $("#business-input").val("")
        $("#address-input").val("")
        $("#deal-input").val("")
        $("#timeframe-input").val("")
    }

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function (childSnapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = childSnapshot.val();

    // HTML elements created with jQuery
    var jumbotron = $("<div>").addClass("jumbotron");
    var post = $("<div>").attr("id", "post");
    var businessDisplay = $("<div>").attr("id", "business-display").text(sv.business);
    var addressDisplay = $("<div>").attr("id", "address-display").text(sv.address);
    var dealDisplay = $("<div>").attr("id", "deal-display").text(sv.deal);
    var timeframeDisplay = $("<div>").attr("id", "timeframe-display").text(sv.time);
    var listingButtons = $("<div>").attr("id", "listing-buttons");
    var getDirections = $("<div>").attr("id", "get-directions").addClass("fas fa-location-arrow listing-button");
    var thumbsUp = $("<div>").attr("data-id", "0").addClass("fas fa-thumbs-up listing-button thumbs-up");
    var thumbsUpCount = $("<div>").attr("id", "thumbs-up-0").addClass("listing-value").text("");
    var thumbsDown = $("<div>").attr("data-id", "0").addClass("fas fa-thumbs-down listing-button thumbs-down");
    var thumbsDownCount = $("<div>").attr("id", "thumbs-down-0").addClass("listing-value").text("");
    var directionsContainer = $("<div>").attr("id", "directions-container").addClass("hide");
    var directions = $("<div>").attr("id", "directions").text("THESE ARE DIRECTIONS");
    var closeDirections = $("<div>").attr("id", "close-directions").addClass("far fa-times-circle listing-button");
 
    // creating the post
    $("#feed").prepend(jumbotron);
    jumbotron.append(post);
    post.append(businessDisplay, addressDisplay, dealDisplay, timeframeDisplay);
    post.append("<hr>");
    post.append(listingButtons);
    listingButtons.append(getDirections, thumbsUp, thumbsUpCount, thumbsDown, thumbsDownCount);
    jumbotron.append(directionsContainer);
    directionsContainer.append("<hr>");
    directionsContainer.append(directions, closeDirections);

  });

///Lynn's code starts////

  //initialize variables
  var likeCounter = 0;
  var dislikeCounter = 0;
  
  $(document).on("click", ".fas.fa-thumbs-up", function(event) {
    event.preventDefault();
    likeCounter++;
    database.ref("/yesCounter").set({
        yesCount : likeCounter
    })
  })
  

  $(document).on("click", ".fas.fa-thumbs-down", function(event) {
    event.preventDefault();
    dislikeCounter++;
    database.ref("/noCounter").set({
        dislikeCount : dislikeCounter
    })
  })

//display number of likes and dislikes
$("#thumbs-up-0").text(likeCounter);
/////////////////////// Lynn's code above  
})

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
