
// Firebase Initialization
var config = {
    apiKey: "AIzaSyBWRyj63kJmMlJquYYHELuAxtyA6oSo8Ic",
    authDomain: "project-one-3614c.firebaseapp.com",
    databaseURL: "https://project-one-3614c.firebaseio.com",
    projectId: "project-one-3614c",
    storageBucket: "",
    messagingSenderId: "1042255635290"
};

firebase.initializeApp(config);

var database = firebase.database();

// Food Varibles??? **WORK IN PROGRESS**
var food = "Salmon"; // Temporary

// Current Location
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;

    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);

    // Yelp API Call
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" + crd.latitude + "&longitude=" + crd.longitude + "&term=" + food + "&limit=5",
        "method": "GET",
        "headers": {
            "Authorization": "Bearer lkPp8VDxUNfjBDvplX2HatfYM6gaE9YqmjR6WrUuopFT09zAvcSgi8g_zH_CIXuF2S0uX4N_muM9UfNejegk4KKmH-O1x5qbYgsZr22olO-45R8sX8jm_bvpS0AcXHYx",
            "cache-control": "no-cache",
            "Postman-Token": "247d0ac8-a92a-40d5-b60a-40935e80bbf0"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

$(document).ready(function () {

    var answer = "";

    $(".form-check-input").on("click", function () {
        var id = $(this).attr("id");
        answer = $("label[for='" + id + "']").text().trim();
        // console.log(label);
    });




    $("#submit").on("click", function (event) {

        event.preventDefault();

        console.log(answer);

    });

    var queryURL = "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/?text=" +
        answer;
    // where we pull the info from our url.//
    console.log("after url");
    $.ajax({
        url: queryURL,
        headers: {
            "X-RapidAPI-Key": "GYSavRj3MOmshxASbcqk3TQQfpCTp1b8Hjwjsn2OPtTaCiNc5P"
        },
        method: "GET"
    }).then(function (result) {
        console.log(result);
        console.log(result.emotions_detected);
        // console.log(result.status, result.headers, result.body);
    })
});




    





});

