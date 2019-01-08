$(document).ready(function () {
 

    
    // $("#top").show();
    // $("#opener").hide();


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
    //




    // Food Varibles??? **WORK IN PROGRESS**

    var answer = "";

    $(".form-check-input").on("click", function () {
        var id = $(this).attr("id");
        answer = $("label[for='" + id + "']").text().trim();
    });

    $("#submit").on("click", function (event) {
        event.preventDefault();
        emotionAPI();
    });

    var emotion = "";


    var emotionAPI = function () {

        var queryURL = "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/?text=" + answer;

        // $.ajax({
        //     url: queryURL,
        //     headers: {
        //         "X-RapidAPI-Key": "GYSavRj3MOmshxASbcqk3TQQfpCTp1b8Hjwjsn2OPtTaCiNc5P"
        //     },
        //     method: "GET"
        // }).then(function (result) {
        emotion = "joy";
        //     emotion = result.emotions_detected[0];
        //     console.log(emotion + ": retrieved from analysisAPI" );

        // if ($("#zip")) {
        //     settings.url = "https://api.yelp.com/v3/businesses/search?term=delis&location=" + zip + ;
        // } else {
        //     settings.url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" + crd.latitude + "&longitude=" + crd.longitude + "&term=" + food + "&limit=5";
        // };

        navigator.geolocation.getCurrentPosition(success, error, options);
        // });

    };







    // 1.) success function
    function success(pos) {

        var food = "";

        if (emotion === "joy") {
            food = "juice";
            $("#responses").show();
            $("#responses").text("Hello world!");
        } else if (emotion === "surprise") {
            food = "tea";
        } else if (emotion === "anger") {
            food = "nuts";
        } else if (emotion === "disgust") {
            food = "smoothie";
        } else if (emotion === "fear") {
            $("#responses").show();
            $("#responses").text("Research suggests that folate deficiency may be behind irrational fears and anxiety, so try upping your intake of folate – as well as mood-boosting Omega-3 – by snacking on avocado.");
            food = "guacamole";
        } else if (emotion === "sadness") {
            food = "seafood";
        } else {
            food = "ice cream";
        }


        var crd = pos.coords;


        // Yelp API Call


        var settings = {
            "async": true,
            "crossDomain": true,
            // "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" + crd.latitude + "&longitude=" + crd.longitude + "&term=" + food + "&limit=5",
            "method": "GET",
            "headers": {
                "Authorization": "Bearer lkPp8VDxUNfjBDvplX2HatfYM6gaE9YqmjR6WrUuopFT09zAvcSgi8g_zH_CIXuF2S0uX4N_muM9UfNejegk4KKmH-O1x5qbYgsZr22olO-45R8sX8jm_bvpS0AcXHYx",
                "cache-control": "no-cache",
                "Postman-Token": "247d0ac8-a92a-40d5-b60a-40935e80bbf0"
            }
        }

        if ($("#zip")) {
            var zip = $("#zip").val();
            settings.url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + food + "&location=" + zip + "&limit=5";
        } else {
            settings.url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" + crd.latitude + "&longitude=" + crd.longitude + "&term=" + food + "&limit=5";
        };

        $.ajax(settings).done(function (response) {
            display(response)
            // console.log(response);
        });


    }

    // 2.) error handler
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };


    // 3.) Current Location
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };


    var display = function (response) {
        $("#yelpwidget").empty();

        var data = response.businesses;

        data.forEach(function (y, i) {
            // console.log(i);
            // console.log(y);
            var yelpID = y.id;
            yelpEmbed(yelpID);
            // console.log(yelpResult);
            // console.log(yelpEmbed(yelpID));
            // console.log(yelpResult);
            // yelpResult.attr("id", yelpResult.attr("id") && i);
            // newDiv.append(yelpResult);
        });

    };


    var yelpEmbed = function (yelpID) {
        var id = yelpID;
        // console.log("yelp widget running");
        var s = document.createElement("script");
        s.async = true;
        // s.onload = s.onreadystatechange = function () {
        getYelpWidget(id, "400", "YLW", "y", "y", "0");
        // };
        s.src = 'http://chrisawren.com/widgets/yelp/yelpv2.js';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    }


    // brought in the code from the 3rd party widget and changed the html to append instead of replace
    function getYelpWidget(id, width, color, image, styled, reviewnum) {
        if ('withCredentials' in new XMLHttpRequest()) {

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    // document.getElementById('yelpwidget').innerHTML = xmlHttp.responseText;
                    $("#yelpwidget").append(xmlHttp.responseText);
                }
            };
            xmlHttp.open("GET", 'http://chrisawren.com/widgets/yelp/yelpv2.php?id=' + id + '&width=' + width + '&color=' + color + '&styled=' + styled + '&image=' + image + '&reviewnum=' + reviewnum, true);
            xmlHttp.send();
        }
        else {
            if (typeof XDomainRequest !== "undefined") {
                // 1. Create XDR object
                var xdr = new XDomainRequest();
                xdr.onload = function () {
                    // document.getElementById('yelpwidget').innerHTML = xdr.responseText;
                    $("#yelpwidget").append(xdr.responseText);
                };
                // 2. Open connection with server using GET method
                xdr.open("GET", 'http://chrisawren.com/widgets/yelp/yelpv2.php?id=' + id + '&width=' + width + '&color=' + color + '&styled=' + styled + '&image=' + image + '&reviewnum=' + reviewnum, true);
                // 3. Send string data to server
                xdr.send();
            }
        }
    }

});




// (function () {
//     var s = document.createElement("script");
//     s.async = true;
//     s.onload = s.onreadystatechange = function () {
//         getYelpWidget("yEXvgdOxH6EGrwGmELzQAQ", "400", "YLW", "y", "y", "");
//     };
//     s.src = 'http://chrisawren.com/widgets/yelp/yelpv2.js';
//     var x = document.getElementsByTagName('script')[0];
//     x.parentNode.insertBefore(s, x);
// })();









// var yelpDiv = $("<div id='yelp' style='width:400px;'>");
// var mainLink = $("<a>").attr('href', mainURL);
// var bizImg = $("<img style='box-shadow : 0px 0px 4px rgba(0, 0, 0, .4); margin-right : .5em; float : left ' id='businessimg'>").attr("src", bizURL);
// var yelpHeaderDiv = $("<div id='yelpheader' style='display:block'>");
// var yelpTitleDiv = $("<div style='font-weight:bold;' id='yelptitle' width='400px'></div>").text(yelpTitle);
// var starImg = $("<img id='yelpstarrating' width='115px'>").attr("src", starsURL);
// var br = $("<br>");
// mainLink used again in an 'a' tag;
// var buttonImg = $("<a id='yelpbutton' >").attr("src", buttonImgURL);
// var numreviewsDiv = $("<div style='font-weight:bold;' id='numreviews'>");


/*<div id="yelp" style="width:400px;">
    <a href="https://www.yelp.com/biz/strippd-cold-pressed-juice-philadelphia?adjust_creative=KIC1kljVCaw8KahDmWCSNw&amp;utm_campaign=yelp_api&amp;utm_medium=api_v2_business&amp;utm_source=KIC1kljVCaw8KahDmWCSNw">
        <img style="box-shadow : 0px 0px 4px rgba(0, 0, 0, .4); margin-right : .5em; float : left " id="businessimg" src="https://s3-media3.fl.yelpcdn.com/bphoto/ERg6G1fjRm_IV25ff24uRQ/ms.jpg">
        </a>
        <div id="yelpheader" style="display:block">
            <div style="font-weight:bold;" id="yelptitle" width="400px">Stripp'd Cold Pressed Juice</div>
            <img id="yelpstarrating" width="115px" src="https://s3-media2.fl.yelpcdn.com/assets/2/www/img/7f02623f2d55/ico/stars/v1/stars_large_4.png">
                <br>
                    <a href="https://www.yelp.com/biz/strippd-cold-pressed-juice-philadelphia?adjust_creative=KIC1kljVCaw8KahDmWCSNw&amp;utm_campaign=yelp_api&amp;utm_medium=api_v2_business&amp;utm_source=KIC1kljVCaw8KahDmWCSNw">
                        <img style="" id="yelpbutton" src="http://chrisawren.com/widgets/yelp/yelp/reviewsFromYelpYLW.gif">
                            <br>
            </a>
                            <div style="font-weight:bold;" id="numreviews">70 Reviews</div>
        </div>
                        <br>
    </div>
*/



// {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" + crd.latitude + "&longitude=" + crd.longitude + "&term=" + food + "&limit=5",
//     "method": "GET",
//     "headers": {
//         "Authorization": "Bearer lkPp8VDxUNfjBDvplX2HatfYM6gaE9YqmjR6WrUuopFT09zAvcSgi8g_zH_CIXuF2S0uX4N_muM9UfNejegk4KKmH-O1x5qbYgsZr22olO-45R8sX8jm_bvpS0AcXHYx",
//         "cache-control": "no-cache",
//         "Postman-Token": "247d0ac8-a92a-40d5-b60a-40935e80bbf0"
//     }
// }





        // temporary 
        // var yelpExampleResponse = {
        //     "businesses": [
        //         {
        //             "id": "yEXvgdOxH6EGrwGmELzQAQ",
        //             "alias": "strippd-cold-pressed-juice-philadelphia",
        //             "name": "Stripp'd Cold Pressed Juice",
        //             "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/ERg6G1fjRm_IV25ff24uRQ/o.jpg",
        //             "is_closed": false,
        //             "url": "https://www.yelp.com/biz/strippd-cold-pressed-juice-philadelphia?adjust_creative=0c0mfTmRd_6-qHgL7DTFGQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0c0mfTmRd_6-qHgL7DTFGQ", "review_count": 70,
        //             "categories": [
        //                 {
        //                     "alias": "juicebars",
        //                     "title": "Juice Bars & Smoothies"
        //                 }
        //             ],
        //             "rating": 4,
        //             "coordinates": {
        //                 "latitude": 39.9557445088613,
        //                 "longitude": -75.144189775091
        //             },
        //             "transactions": [],
        //             "price": "$$",
        //             "location": {
        //                 "address1": "263 N 3rd St",
        //                 "address2": "",
        //                 "address3": "",
        //                 "city": "Philadelphia",
        //                 "zip_code": "19106",
        //                 "country": "US",
        //                 "state": "PA",
        //                 "display_address": [
        //                     "263 N 3rd St", "Philadelphia, PA 19106"
        //                 ]
        //             },
        //             "phone": "+12675507877",
        //             "display_phone": "(267) 550-7877",
        //             "distance": 721.9049638940721
        //         }
        //     ],
        //     "total": 356,
        //     "region": {
        //         "center": {
        //             "longitude": -75.1442272,
        //             "latitude": 39.9622367
        //         }
        //     }
        // }
