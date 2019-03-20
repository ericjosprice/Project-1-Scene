$(document).ready(function () {
  $("#create-post").on("click", function () {
    $("#create-post").addClass("animated pulse");
    var wait = setTimeout(function () {
      $("#create-post").removeClass("animated pulse")
    }, 1000)
    $("#post-form").toggleClass("hide").addClass("animated fadeInUp");

  });



  ///Lynn's code starts////

  // Initialize Firebase
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

  //initialize variables
  var likeCounter = 0;
  var dislikeCounter = 0;

  ///initialize variables for form

  var addressInput = "";
  var specialInput = "";
  var timeFrame = "";

  /////////////////////
  ///click functions///
  ////////////////////
  $("#newinfo").on("click", function (event) {
      event.preventDefault();
      var businessName = $("#businessinput").val().trim();
      var addressInput = $("#addressinput").val().trim();
      var specialInput = $("#specialinput").val().trim();
      var timeFrame = $("#timeinput").val().trim();

      var newData = {
        business: businessName,
        address: addressInput,
        special: specialInput,
        timeframe: timeFrame,
      }

      database.ref("newdata").push(newData);

      //clear input boxes
      $("#businessinput").val("");
      $("#addressinput").val("");
      $("#specialinput").val("");
      $("#timeinput").val("");
    });

    database.ref("newdata").on("child_added", function (childSnapshot) {
      console.log(childSnapshot.val());

      var newBusiness = childSnapshot.val().business;
      var newAddress = childSnapshot.val().address;
      var newSpecial = childSnapshot.val().special;
      var newTime = childSnapshot.val().timeframe;



  //Create info dynamically and append them
  
  var div = $("<div>");
  div.addClass("animated zoomIn fadeIn");
  div.attr("id", "feed");
  $("#newcard").append(div);

  var jumboDiv = $("<div>");
  jumboDiv.addClass("jumbotron");
  $("#feed").append(jumboDiv);

  var businessDiv = $("<div>");
  businessDiv.attr("id", "business-name");
  $(".jumbotron").append(businessDiv);
  var addressDiv = $("<div>");
  addressDiv.attr("id", "address-location");
  $(".jumbotron").append(addressDiv);
  var dealDiv = $("<div>");
  dealDiv.attr("id", "deal-description");
  $(".jumbotron").append(dealDiv);
  var timeframeDiv = $("<div>");
  timeframeDiv.attr("id", "deal-timeframe");
  $(".jumbotron").append(timeframeDiv);
  $(".jumbotron").append("<hr>");

  var markerDiv = $("<div>");
  markerDiv.attr("id", "listing-buttons-left");
  $(".jumbotron").append(markerDiv);

  var listButton1 = $("<a>");
  listButton1.addClass("listing-button");
  listButton1.attr("id", "a1");
  listButton1.attr("href", "#");
  $("#listing-buttons-left").append(listButton1);

  var yelpI = $("<div>");
  yelpI.addClass("fab fa-yelp");
  $("#a1").append(yelpI);

  var listButton2 = $("<a>");
  listButton2.addClass("listing-button");
  listButton2.attr("id", "a2");
  listButton2.attr("href", "#");
  $("#a2").append(listButton2);

  var markerI = $("<div>");
  markerI.addClass("fas fa-map-marker-alt");
  $("a2").append(markerI);

  var thumbsDiv = $("<div>");
  thumbsDiv.attr("id", "listing-buttons-right");
  $(".jumbotron").append(thumbsDiv);
  var tu1Div = $("<div>");
  tu1Div.attr("data-id", "0");
  tu1Div.addClass("fas fa-thumbs-up listing-button thumbs-up");
  $("#listing-buttons-right").append(tu1Div);
  var tu2Div = $("<div>");
  tu2Div.attr("id", "thumbs-up-0");
  tu2Div.addClass("listing-value");
  $("#listing-buttons-right").append(tu2Div);
  var td1Div = $("<div>");
  td1Div.attr("data-id", "0");
  td1Div.addClass("fas fa-thumbs-down listing-button thumbs-down");
  $("#listing-buttons-right").append(td1Div);
  var td2Div = $("<div>");
  td2Div.attr("id", "thumbs-down-0");
  td2Div.addClass("listing-value");
  $("#listing-buttons-right").append(td2Div);















  })

  $(".thumbs-up").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr("data-id");
    var num = +($("#thumbs-up-" + id).text());
    num++;
    $("#thumbs-up-" + id).text(num);
    likeCounter++;
    database.ref("/yesCounter").set({
      yesCount: likeCounter
    })
  })

  $(".thumbs-down").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr("data-id");
    var num = +($("#thumbs-down-" + id).text());
    num++;
    $("#thumbs-down-" + id).text(num);
    dislikeCounter++;
    database.ref("/noCounter").set({
      dislikeCount: dislikeCounter
    })
  })

})



///////expired time attempts

/////

//////var now = new Date();
// var time = now.getTime();
// var expireTime = time + 1000*60;
// now.setTime(expireTime);
// var tempExp = 'Wed, 31 Oct 2012 08:50:17 GMT';
// document.cookie = aaa+'='+sStr+';expires='+now.toGMTString()+';path=/';function display() { 
//   var now = new Date();
//   var time = now.getTime();
//   var expireTime = time + 1000*36000;
//   now.setTime(expireTime);
//   var tempExp = 'Wed, 31 Oct 2012 08:50:17 GMT';
//   document.cookie = 'cookie=ok;expires='+now.toGMTString()+';path=/';
//   //console.log(document.cookie);
// }