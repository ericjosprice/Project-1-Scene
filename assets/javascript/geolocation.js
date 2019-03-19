
// Private API KEY:
// prj_test_sk_9267d86b9e551f011c3f3dec90f5dccc41e576c7

// tomtom API key
// D7UhAWdiN4SKQg0hVBm1ESG3Ak7ezX9P

// {"message":"Malformed request"}

// https://api.tomtom.com/geofencing/1/register?key=D7UhAWdiN4SKQg0hVBm1ESG3Ak7ezX9P{“secret”: “your_secret”}

// returned admin key: {
//     "adminKey": "b1S4EFwdJcvrOEajiFxbdWtZUExwyIOK3a6Pg9c8Y2lnpgLW"
// }

//add new geofencing point such as a business


$.ajax({
    url: "https://api.tomtom.com/geofencing" + "D7UhAWdiN4SKQg0hVBm1ESG3Ak7ezX9P" + "&b1S4EFwdJcvrOEajiFxbdWtZUExwyIOK3a6Pg9c8Y2lnpgLW",
    type: "POST",
    id:1,
    name: "Home",
        "type": "Feature",
        "geometry": {
          "radius": 1600,
          "type": "Point",
          "shapeType": "Circle",
          "coordinates": [-97.705940, 30.289310]
        }
      }).done(function(data){
    console.log("success")
    console.log(data)
});

// add a new object, which will trigger when inside the fence

$.ajax({
    url: "https://api.tomtom.com/geofencing" + "D7UhAWdiN4SKQg0hVBm1ESG3Ak7ezX9P",
    method: "GET"
}).then(function(response){
console.log(response);

});