// use geolocation to get lon and lat
var lat, lon, acc;

var options = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 10
};

// when user clicks the foursquare button run the geolocation function
$(document).on("click", "#foursquare-button", locationConsent)


function locationConsent() {
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
        var crd = pos.coords;
        lat = crd.latitude;
        lon = crd.longitude;
        acc = crd.accuracy;
        getFourSquareData();
    }
}

function getFourSquareData() {

    var creds = "client_id=FEMSVD3N0IBIMAYZZU0DDZK3FUL3RPUI10XOPQ2YA3555ASP&client_secret=K0H2FTFUQJM2LXRZBZVTJFADEK0K0HJZXNAXPWJFI3VK3E5P";

    var sQueryURL = 'https://api.foursquare.com/v2/venues/search?v=20180323&limit=5&ll=' + lat + ',' + lon + '&radius=900&categoryId=4d4b7105d754a06376d81259&'+ creds;

    $.ajax({
        url: sQueryURL,
        method: "GET"
    }).then(function (response) {
        $("#foursquare-data").empty();
        for (var i = 0; i < response.response.venues.length; i++) {
            var newDiv = $("<div>").addClass("foursquare-name");
            var newP = $("<p>");
            newDiv.attr("id", i);
            newDiv.text(response.response.venues[i].name)
            
            var FourSqBusAddress = response.response.venues[i].location.address;

            if (FourSqBusAddress == undefined) {
                newP.text("Address not provided.");
            } else {
                var linkToGMaps = "https://www.google.com/maps/dir/?api=1&origin=" + lat + ',' + lon + "&destination=" + FourSqBusAddress + "&mode=walking"

                var displayHyplink = `<p><a href="${linkToGMaps}" target='_blank'>${FourSqBusAddress}</a></p>`

                newP.append(displayHyplink);
            }

            newP.append("<hr>");
            // newDiv.append(newP);


            $("#foursquare-data").append(newDiv);
            $("#foursquare-data").append(newP);
        }



    });
}
