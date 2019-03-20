$(document).ready(function () {
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



  
////////////////////////////
// SUBMIT BUTTON FUNCTION //
////////////////////////////
  $("#form-submit").on("click", function () {
    event.preventDefault();

    // Form inputs
    var businessInput = $("#business-input").val().trim();
    var addressInput = $("#address-input").val().trim();
    var dealInput = $("#deal-input").val().trim();
    var timeframeInput = $("#timeframe-input").val().trim();
    var likeCounter = 0;
    var dislikeCounter = 0;

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
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
        like : likeCounter,
        dislike : dislikeCounter
      });

      // clearing the forms after submitting
      $("#business-input").val("")
      $("#address-input").val("")
      $("#deal-input").val("")
      $("#timeframe-input").val("")
    }
  });



    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function (childSnapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = childSnapshot.val();
      var key = childSnapshot.key;

      // HTML elements created with jQuery 
      //all cards and their elements have been given a unique element
      var jumbotron = $("<div>").addClass("jumbotron" + " " + key);
      var post = $("<div>").attr("id", "post");
      post.attr("class", key);
      var businessDisplay = $("<div>").attr("id", "business-display").text(sv.business);
      businessDisplay.attr("class", key)
      


      var addressDisplay = $("<div>").attr("id", "address-display").text(sv.address);
      addressDisplay.addClass("address-display" + key);



      var dealDisplay = $("<div>").attr("id", "deal-display").text(sv.deal);
      dealDisplay.addClass(key);
      var timeframeDisplay = $("<div>").attr("id", "timeframe-display").text(sv.time);
      timeframeDisplay.addClass(key);
      var listingButtons = $("<div>").attr("id", "listing-buttons");
      listingButtons.addClass(key);
      var getDirections = $("<div>").attr("id", "get-directions").addClass("fas fa-location-arrow listing-button" + " " + key);
      var thumbsUp = $("<div>").attr("data-id", "0").addClass("fas fa-thumbs-up listing-button thumbs-up" + " " + key);
      var thumbsUpCount = $("<div>").attr("id", "thumbs-up-0").addClass("listing-value" + " " + key).text("");
      var thumbsDown = $("<div>").attr("data-id", "0").addClass("fas fa-thumbs-down listing-button thumbs-down" + " " + key);
      var thumbsDownCount = $("<div>").attr("id", "thumbs-down-0").addClass("listing-value" + " " + key).text("");
      var directionsContainer = $("<div>").attr("id", "directions-container").addClass("hide" + " " + key);
      var directions = $("<div>").attr("id", "directions").text("THESE ARE DIRECTIONS");
      getDirections.attr("data-item", key);
      var closeDirections = $("<div>").attr("id", "close-directions").addClass("far fa-times-circle listing-button" + " " + key);

      database.ref(key + "/likes").on("value", function (likesSnapshot) {
        // console.log(key + " got a like:", likesSnapshot.val());
      });
      database.ref(key + "/dislikes").on("value", function (likesSnapshot) {
        // console.log(key + " got a dislike:", likesSnapshot.val());
      });

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
    
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);

    })


  // Click functions for navigating the document
  $("#create-post").on("click", function () {
    $("#create-post").addClass("animated pulse");
    setTimeout(function () {
      $("#create-post").removeClass("animated pulse")
    }, 1000);
    $("#post-form").toggleClass("hide").addClass("animated fadeInUp");
  });

  $("#foursquare-button").on("click", function () {
    $("#foursquare-button").addClass("animated pulse");
    setTimeout(function () {
      $("#foursquare-button").removeClass("animated pulse")
    }, 1000);
    $("#foursquare").toggleClass("hide").addClass("animated fadeInUp");
  });

  $("#get-directions").on("click", function () {
    $("#directions-container").removeClass("hide");
  });

  $("#close-directions").on("click", function () {
    $("#directions-container").addClass("hide");
  });

});