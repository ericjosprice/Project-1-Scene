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


    $("#form-submit").disabled = true;
    $("#form-submit").val("Submit");
    // Code for handling the push
    database.ref().push({
      business: businessInput,
      address: addressInput,
      deal: dealInput,
      time: timeframeInput,
      dateAdded: firebase.database.ServerValue.TIMESTAMP,
      like: likeCounter,
      dislike: dislikeCounter
    });

    // clearing the forms after submitting
    $("#business-input").val("")
    $("#address-input").val("")
    $("#deal-input").val("")
    $("#timeframe-input").val("")

  });

  var likeClickVal = 0;


  // button hide and show below

  $("#form-submit").disabled = true;
  $("#form-submit").hide();

  $(".form-control").on("change", function () {
    event.preventDefault();

    if ($("#business-input").val() != "" &&
      $("#address-input").val() != "" &&
      $("#deal-input").val() != "" &&
      $("#timeframe-input").val() != "") {
      $("#form-submit").show();
      $("#form-submit").disabled = false;
      $("#ins").hide();
    }
  });













  ///////////////////////////////////
  // like/dislike button functions///
  ///////////////////////////////////
  function updateLikes(key) {
    var updatedCurrentClicks;
    database.ref("/" + key + "/like").transaction(function (currentClicks) {
      ///manually done toggle button...///
      if (likeClickVal === 1) {
        updatedCurrentClicks = (currentClicks || 0) - 1;
      }
      else {
        updatedCurrentClicks = (currentClicks || 0) + 1;
      }
      return updatedCurrentClicks;
    });

    if (likeClickVal == 1) {
      likeClickVal = 0;
    }
    else {
      likeClickVal = 1;
    }
    $("#thumbs-up-count-" + key).html(updatedCurrentClicks);
  };

  var dislikeClickVal = 0;
  function updateDislikes(key) {
    var updatedCurrentClicks;
    database.ref("/" + key + "/dislike").transaction(function (currentClicks) {
      ///manually done toggle button...///
      if (dislikeClickVal === 1) {
        updatedCurrentClicks = (currentClicks || 0) - 1;
      }
      else {
        updatedCurrentClicks = (currentClicks || 0) + 1;
      }
      return updatedCurrentClicks;
    });

    if (dislikeClickVal == 1) {
      dislikeClickVal = 0;
    }
    else {
      dislikeClickVal = 1;
    }
    $("#thumbs-down-count-" + key).html(updatedCurrentClicks);
  };

  $(document).on("click", ".fa-thumbs-up", function () {
    var likeClass = $(this).attr("data-item");
    updateLikes(likeClass);
  })

  $(document).on("click", ".fa-thumbs-down", function () {
    var dislikeClass = $(this).attr("data-item");
    updateDislikes(dislikeClass);
  })

  ////////////////////////////////////////
  // Firebase watcher .on("child_added" //
  ////////////////////////////////////////
  database.ref().on("child_added", function (childSnapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = childSnapshot.val();
    var key = childSnapshot.key;

    console.log(sv);
    console.log(key);
    // HTML elements created with jQuery 
    //all cards and their elements have been given a unique ID
    var jumbotron = $("<div>").addClass("jumbotron");
    jumbotron.attr("id", "jumbotron" + key);
    var post = $("<div>").addClass("post");
    post.attr("id", "post" + key);
    var businessDisplay = $("<div>").addClass("business-display").text(sv.business);
    businessDisplay.attr("id", "business-display" + key)
    var addressDisplay = $("<div>").addClass("address-display").text(sv.address);
    addressDisplay.attr("id", "address-display" + key);
    var dealDisplay = $("<div>").addClass("deal-display").text(sv.deal);
    dealDisplay.attr("id", "deal-display" + key);
    var timeframeDisplay = $("<div>").addClass("timeframe-display").text(sv.time);
    timeframeDisplay.attr("id", "timeframe-display" + key);
    var listingButtons = $("<div>").addClass("listing-buttons");
    listingButtons.attr("id", "listing-buttons" + key);
    //added get-directions + key so that toggle class on "this" will work
    var getDirections = $("<div>").attr("id", "get-directions" + key).addClass("fas fa-location-arrow listing-button get-directions");
    getDirections.attr("data-item", key);
    var thumbsUp = $("<div>").attr("id", "thumbs-up" + key).addClass("fas fa-thumbs-up listing-button thumbs-up");
    var thumbsUpCount = $("<div>").attr("id", "thumbs-up-count-" + key).addClass("listing-value" + " " + key).text(sv.like);
    var thumbsDown = $("<div>").attr("data-id", "0").addClass("fas fa-thumbs-down listing-button thumbs-down" + " " + key);
    var thumbsDownCount = $("<div>").attr("id", "thumbs-down-count-" + key).addClass("listing-value" + " " + key).text(sv.dislike);
    thumbsUp.attr("data-item", key);
    thumbsDown.attr("data-item", key);

    var directionsContainer = $("<div>").attr("id", "directions-container" + key).addClass("hide directions-container");


    var directions = $("<div>").addClass("directions data-directions").text("");
    directions.attr("id", "directions" + key);
    var closeDirections = $("<div>").attr("id", "close-directions" + key).addClass("far fa-times-circle listing-button close-directions").attr("key-value", key);

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

  }, function (errorObject) {
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

  $("#foursquare-cancel").on("click", function () {
    $("#foursquare").addClass("hide");
  });

  $(document).on("click", ".close-directions", function () {
    var sKey = $(this).attr("key-value")
    console.log("close has been clicked for key: " + sKey);
    $("#directions-container" + sKey).addClass("hide");
  });

});
