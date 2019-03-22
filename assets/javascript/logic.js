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
    $("#post-form").addClass("hide");
 
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

  var likeClickVal = 0;
  ///////////////////////////////////
  // like/dislike button functions///
  ///////////////////////////////////
  function updateLikes(key) {
    var updatedCurrentClicks;
    database.ref("/" + key + "/like").transaction(function(currentClicks) {
    ///manually done toggle button...///
    if(likeClickVal === 1) {
      updatedCurrentClicks = (currentClicks || 0) - 1;
    }
    else {
      updatedCurrentClicks = (currentClicks || 0) + 1;
    }
    return updatedCurrentClicks;
      });
          
    if(likeClickVal == 1) {
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
    database.ref("/" + key + "/dislike").transaction(function(currentClicks) {
    ///manually done toggle button...///
    if(dislikeClickVal === 1) {
      updatedCurrentClicks = (currentClicks || 0) - 1;
    }
    else {
      updatedCurrentClicks = (currentClicks || 0) + 1;
    }
      return updatedCurrentClicks;
    });

    if(dislikeClickVal == 1) {
      dislikeClickVal = 0;
    }
    else {
      dislikeClickVal = 1;
    }
    $("#thumbs-down-count-" + key).html(updatedCurrentClicks);
  };

$(document).on("click", ".fa-thumbs-up", function() {
   var likeClass = $(this).attr("data-item");
   updateLikes(likeClass);
})

$(document).on("click", ".fa-thumbs-down", function() {
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
      //added get-directions + key so that toggle class on "this" will work
      var getDirections = $("<div>").attr("id", "get-directions").addClass("fas fa-location-arrow listing-button get-directions" + key);
      getDirections.attr("data-item", key);
      var thumbsUp = $("<div>").attr("data-id", "0").addClass("fas fa-thumbs-up listing-button thumbs-up" + " " + key);
      var thumbsUpCount = $("<div>").attr("id", "thumbs-up-count-" + key).addClass("listing-value" + " " + key).text(sv.like);
      var thumbsDown = $("<div>").attr("data-id", "0").addClass("fas fa-thumbs-down listing-button thumbs-down" + " " + key);
      var thumbsDownCount = $("<div>").attr("id", "thumbs-down-count-" + key).addClass("listing-value" + " " + key).text(sv.dislike);
      thumbsUp.attr("data-item", key);
      thumbsDown.attr("data-item", key);

      var directionsContainer = $("<div>").attr("id", "directions-container").addClass("hide directions-container"+ key);


      var directions = $("<div>").attr("id", "directions").text("");
      directions.addClass("data-directions" + key)
      var closeDirections = $("<div>").attr("id", "close-directions").addClass("far fa-times-circle listing-button").attr("key-value", key);

      //needed for thumbs up and thumbs down
      // database.ref(key + "/likes").on("value", function (likesSnapshot) {
      //   // console.log(key + " got a like:", likesSnapshot.val());
      // });
      // database.ref(key + "/dislikes").on("value", function (likesSnapshot) {
      //   // console.log(key + " got a dislike:", likesSnapshot.val());
      // });


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

  $("#foursquare-cancel").on("click", function(){
    $("#foursquare").addClass("hide");
  });


  // $(document).on("click", ".get-directions", function () {
  //   var sKeyValue = $(this).attr("data-item");
  //   console.log("we want to unhide the div. what is: " + sKeyValue)
  //   $(".hide " + sKeyValue).removeClass("hide")
  
  // });

  // $(document).on("click", ".get-directions", function () {
  //   var sKeyValue = $(this).attr("data-item");
  //   console.log("we want to hid the div. what is: " + sKeyValue)
  //   $(this).addClass("hide");
  // });

  // $("#get-directions").on("click", function () {
  //   $("#directions-container").removeClass("hide");
  // });

  $(document).on("click", "#close-directions", function () {
    var sKey = $(this).attr("key-value")
    console.log("close has been clicked for key: " + sKey);
    $(".directions-container"+ sKey).addClass("hide");
  });
  // $("#close-directions").on("click", function () {
  //   $("#directions-container").addClass("hide");
  // });

});
