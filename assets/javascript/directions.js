$(document).ready(function () {
    // $("#address-input").val("2511 Speedway");
    // $("#city-input").val("Austin");
    // $("#state-input").val("TX");



    // capture business location on click
    $("#submit").on("click", function (event) {
        event.preventDefault();
        BusStreetAddress = $("#address-input").val().trim();
        var streetAddress = BusStreetAddress
        var city = $("#city-input").val().trim();
        var state = $("#state-input").val().trim();

        var busAddress = streetAddress + city + state
        // var directionsQueryURL = "https://maps.googleapis.com/maps/api/directions/json?origin=30.2292427,-97.7727751&destination=" + busAddress + "&mode=walking&key=AIzaSyDBhbUBfUV_wtqtndcEiMxklXGIeIjITWw"

        var directionsQueryURL = "https://cors-ut-bootcamp.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=30.2292427,-97.7727751&destination=" + busAddress + "&mode=walking&key=AIzaSyDBhbUBfUV_wtqtndcEiMxklXGIeIjITWw"


        // ajax call
        $.ajax({
            url: directionsQueryURL,
            method: "GET"
        }).then(function (response) {
            var routeArray = response.routes[0].legs[0].steps
            console.log(routeArray);
            console.log(response);


            for(var i = 0; i < routeArray.length; i++){
                console.log(routeArray[i].html_instructions);
                // var userWalkDir = routeArray[i].html_instructions;
                $("#walking-directions").append(routeArray[i].html_instructions);
                
            }
        });

    });



});