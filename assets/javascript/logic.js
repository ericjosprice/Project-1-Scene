$(document).ready(function() {
$("#create-post").on("click", function(){
  $("#create-post").addClass("animated pulse");
  var wait = setTimeout(function(){
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
  
  $(".fas.fa-thumbs-up").on("click", function(event) {
    event.preventDefault();
    likeCounter++;
    database.ref("/yesCounter").set({
        yesCount : likeCounter
    })
  })
  

  $(".fas.fa-thumbs-down").on("click", function(event) {
    event.preventDefault();
    dislikeCounter++;
    database.ref("/noCounter").set({
        dislikeCount : dislikeCounter
    })
  })

//display number of likes and dislikes
$("#thumbup").text(likeCounter);
/////////////////////// Lynn's code above  
})
