

$(document).ready(function () {

    var userOrigin;
    var busAddress;

    // code to get the userLocation
    $(document).on("click", ".fa-location-arrow", locationConsent)
    function locationConsent() {
        var thisKey = $(this).attr("data-item");
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
            clickedForDirections(thisKey);
        }
    }


    function clickedForDirections(key) {
        console.log("clickedForDirections", key);
        //display hiden directions div
        $(".directions-container" + key).removeClass("hide")

        // .oneClass.secondClass
        // gets the adress of the business directly from the display card
        var BusStreetAddress = $(".address-display" + key).text().trim();

        // str = str.replace(/\s+/g, '');
        console.log("BusStreetAddress " + BusStreetAddress.replace(/\s+/g, '+'));
        // add the city and state to the BusStreeAddress

        busAddress = BusStreetAddress.replace(/\s+/g, '+') + "+Austin" + "+TX"

        // generating the queryURL for the AJAX call
        var directionsQueryURL = "https://cors-ut-bootcamp.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=" + userOrigin + "&destination=" + busAddress + "&mode=walking&key=AIzaSyAWVvEMYJEt9Bq0oqqA1FE156FHs86msTg"


        console.log(directionsQueryURL);

        // ajax call
        $.ajax({
            url: directionsQueryURL,
            method: "GET"
        }).then(function (response) {
            // creating the directions div to hold each leg of the journey
            var walkingJourney = $("<div id='journey-legs'>");

            console.log(response);
            var routeArray = response.routes[0].legs[0].steps

            // var routeArray = response.routes[1].legs[4].steps

            // console.log("This should be the routeArray " + routeArray);

            // this for loop, cycles through the array and pulls out the HTML walking directions 
            for (var i = 0; i < routeArray.length; i++) {
                console.log(routeArray[i].html_instructions);

                // puts each of the legs into a <p> tag so that they can be display one-by-one rather than as an entire string
                var directionsToBusiness = $("<p>" + routeArray[i].html_instructions + "</p>");

                // console.log(directionsToBusiness);
                // appends each leg with a <p> to the walkingJourney div created up top
                walkingJourney.append(directionsToBusiness);
                // console.log(walkingJourney);
                // calls the HTML id to display the directions on the DOM
                // $("#directions").html(walkingJourney);
                // $("#directions-container").html(walkingJourney);

                $(".data-directions" + key).html(walkingJourney);
            }

            var linkToGoogleMaps = "https://www.google.com/maps/dir/?api=1&origin=" + userOrigin + "&destination=" + busAddress + "&mode=walking"
            console.log(linkToGoogleMaps);

        });
    };

    
        
    


    // attempt to create a google maps URL ======================================== 
    //  var googleMapsURL = "https://www.google.com/maps/dir/?api=1&origin=" + userOrigin + "&destination=" + busAddress + "&mode=walking"
    //  console.log(googleMapsURL);
    // ================================================================================


});





