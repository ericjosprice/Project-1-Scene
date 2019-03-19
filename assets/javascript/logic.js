///Lynn's code starts////

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
  
  $("#likebtn").on("click", function() {
  likeCounter++;
  console.log(likeCounter);
  })
  
  $("#dislikebtn").on("click", function() {
  dislikeCounter++;
  })

/////////////////////// Lynn's code above  

$("#create-post").on("click", function(){
    $("#create-post").addClass("animated pulse");
    var wait = setTimeout(function(){
        $("#create-post").removeClass("animated pulse") 
    }, 1000)
    $("#post-form").toggleClass("hide").addClass("animated fadeInUp");
})