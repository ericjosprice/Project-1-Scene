// code to get the userLocation
navigator.geolocation.getCurrentPosition(success);

function success(pos) {
    var crd = pos.coords;

    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
    var lat = crd.latitude;
    var lon = crd.longitude;
    acc = crd.accuracy;

    console.log(lat);
    console.log(lon);
    userOrigin = (lat + "," + lon);

    $(document).ready(function () {

        $("#get-directions").on("click", function () {
            event.preventDefault();
            // gets the adress of the business directly from the display card
            var BusStreetAddress = $("#address-display").val();
            // add the city and state to the BusStreeAddress for the sake of ease
            var busAddress = BusStreetAddress + "+Austin" + "+TX"

            // generating the queryURL for the AJAX call
            var directionsQueryURL = "https://cors-ut-bootcamp.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=" + userOrigin + "&destination=" + busAddress + "&mode=walking&key=AIzaSyDBhbUBfUV_wtqtndcEiMxklXGIeIjITWw"

            // ajax call
            $.ajax({
                url: directionsQueryURL,
                method: "GET"
            }).then(function (response) {
                // creating the directions div to hold each leg of the journey
                var walkingJourney = $("<div id='journey-legs'>");

                var routeArray = response.routes[0].legs[0].steps
                
                // this for loop, cycles through the array and pulls out the HTML walking directions 
                for (var i = 0; i < routeArray.length; i++) {
                    // console.log(routeArray[i].html_instructions);

                    // puts each of the legs into a <p> tag so that they can be display one-by-one rather than as an entire string
                    var directionsToBusiness = $("<p>" + routeArray[i].html_instructions + "</p>");

                    // appends each leg with a <p> to the walkingJourney div created up top
                    walkingJourney.append(directionsToBusiness);
                    // calls the HTML id to display the directions on the DOM
                    $("#directions").html(walkingJourney);
                }

            });

        });

    });

}