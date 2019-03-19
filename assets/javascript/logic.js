$("#create-post").on("click", function(){
    $("#create-post").addClass("animated pulse");
    var wait = setTimeout(function(){
        $("#create-post").removeClass("animated pulse") 
    }, 1000)
    $("#post-form").toggleClass("hide").addClass("animated fadeInUp");
})