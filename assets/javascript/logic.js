$(document).ready(function () {

    $('#zip').keypress(function (e) {
        var regex = new RegExp("^[0-9]");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }

        e.preventDefault();
        return false;
    });

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


    var transitionTime = 1500;

    // Food Varibles??? **WORK IN PROGRESS**

    var answer = "";
    var zip = "";

    $(".form-check-input").on("click", function () {
        var id = $(this).attr("id");
        answer = $("label[for='" + id + "']").text().trim();
        zip = $("#zip").val();
    });

    $("#submit").on("click", function (event) {
        event.preventDefault();

        $("#allForm").toggle(transitionTime);
        $("#allResults").toggle(transitionTime);
        $("#resetBtn").toggle(transitionTime);

        emotionAPI();
    });

    $("#resetBtn").on("click", function (event) {
        answer = "";
        zip = "";
        emotion = "";
        $("#zip").val("");
        $("tbody").empty();
        $("#yelpwidget").empty()
        $("#allForm").toggle(transitionTime);
        $("#allResults").toggle(transitionTime);
        $("#resetBtn").toggle(transitionTime);
    });

    var emotion = "";

    var emotionAPI = function () {

        var queryURL = "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/?text=" + answer;

        $.ajax({
            url: queryURL,
            headers: {
                "X-RapidAPI-Key": "GYSavRj3MOmshxASbcqk3TQQfpCTp1b8Hjwjsn2OPtTaCiNc5P"
            },
            method: "GET",
            error: function() {
                location.reload();
            }
        }).then(function (result) {
            // emotion = "joy";
            emotion = result.emotions_detected[0];
            console.log(emotion + ": retrieved from analysisAPI");

            // if ($("#zip")) {
            //     settings.url = "https://api.yelp.com/v3/businesses/search?term=delis&location=" + zip ;
            // } else {
            //     settings.url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" + crd.latitude + "&longitude=" + crd.longitude + "&term=" + food + "&limit=5";
            // };

            if ($("#zip").val()) {
                // alert('zip in use');
                success();
            } else {
                // alert("navigator used");
                navigator.geolocation.getCurrentPosition(success, error, options);
            }
            // });

            database.ref().push({
                emotion: emotion
            });
        });
    };







    // 1.) success function
    function success(pos) {

        var mood = {
            joy: $("<img>").attr("src", "assets/images/Joy.png").width('150px').height('150px').addClass("animated bounce headShake"),
            surprise: $("<img>").attr("src", "assets/images/Surprise.png").width('150px').height('150px').addClass("animated bounce headShake"),
            anger: $("<img>").attr("src", "assets/images/Anger.png").width('150px').height('150px').addClass("animated bounce headShake"),
            fear: $("<img>").attr("src", "assets/images/Fear.png").width('150px').height('150px').addClass("animated bounce headShake"),
            sadness: $("<img>").attr("src", "assets/images/Sadness.png").width('150px').height('150px').addClass("animated bounce headShake"),
        }


        var food = "";

        if (emotion === "joy") {
            food = "juice";
            $("#yelpResults").append(
                $("<tr>").append(
                    $("<th>").append(mood.joy),
                    $("<th>").text("JOY: Juicing extracts the insoluble fiber from the produce leaving just the amazing nutrients for your body to absorb! Plus, juicing is a great way to incorporate a wide variety of fruits and veggies into your diet rather than sticking to the same boring salad everyday."), )
            )

            var newMoodPic = $("<img>").attr("src", "assets/images/Joy.png").addClass("animated rubberBand");

            $("#currentMood").append(newMoodPic);
        } else if (emotion === "surprise") {
            food = "tea";
            $("#yelpResults").append(
                $("<tr>").append(
                    $("<th>").append(mood.surprise),
                    $("<th>").text("SURPRISE: If you’ve got a big interview or presentation coming up, try replacing your morning coffee (which can make you jittery) with a calming herbal tea. The calming effects of chamomile are so powerful that they have been found to reduce symptoms of mild to moderate generalised anxiety disorder, so try a cup of chamomile tea to help calm those last-minute nerves."), )
            )

        } else if (emotion === "anger") {
            food = "nuts";
            $("#yelpResults").append(
                $("<tr>").append(
                    $("<th>").append(mood.anger),
                    $("<th>").text("ANGER: Try reaching for some nuts and seeds to help calm you down. Research has shown that Omega-3 deficiency can contribute to aggressive behavior of adult offenders and children with severe behavioural difficulties, while a Japanese study has suggested that zinc may ease anger in women. To up your intake of these nutrients, try opting for walnuts and flaxseeds, which contain both zinc and Omega-3 fatty acids."), )
            )
        } else if (emotion === "disgust") {
            food = "smoothie";
        } else if (emotion === "fear") {
            $("#yelpResults").append(
                $("<tr>").append(
                    $("<th>").append(mood.fear),
                    $("<th>").text("DISGUST: Research suggests that folate deficiency may be behind irrational fears and anxiety, so try upping your intake of folate – as well as mood-boosting Omega-3 – by snacking on avocado."), )
            )

            food = "guacamole";
        } else if (emotion === "sadness") {
            $("#yelpResults").append(
                $("<tr>").append(
                    $("<th>").append(mood.sadness),
                    $("<th>").text("SADNESS: If you’re feeling in need of a happiness boost, try upping your intake of oily fish to boost your brain health and mood. Oily fish is not only rich in Omega-3 fatty acids, which can help ward off depression, negativity and mood swings, but wild salmon and tuna are good sources of vitamin B12, which helps to regulate the mood."), )
            )
            food = "seafood";
        } else {
            food = "ice cream";
        }




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

        if ($("#zip").val()) {
            settings.url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + food + "&location=" + zip + "&limit=6";
        } else {
            var crd = pos.coords;
            settings.url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" + crd.latitude + "&longitude=" + crd.longitude + "&term=" + food + "&limit=6";
        };

        $.ajax(settings).done(function (response) {
            display(response);
            console.log(response);
            // console.log(response);
        });


    }

    // 2.) error handler
    function error(err) {
        location.reload();
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };


    // 3.) Current Location
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };


    var display = function (response) {
        // $("#yelpwidget").empty();

        var data = response.businesses;

        data.forEach(function (business, i) {
            // console.log(i);
            // console.log(y);
            console.log(data);
            var yelpID = business.id;
            var name = business.name;
            var image_url = business.image_url;
            var price = business.price ? business.price : "";
            var phone = business.display_phone;
            var rating = String(business.rating);
            var rating2 = rating.replace(".","") + "stars.png";
            var reviews = business.review_count;
            var address = business.location;
            var bizUrl = business.url;

            var yelpReviewListing = $(`
                <div class="container yelpReview">
                    <div class="row">
                        <div class="col-md-4">
                            <a href="${bizUrl}"><img src="${image_url}" style="width: 125px; height: 125px" ></a>
                        </div>
                        <div class="col-md-4">
                            <a href="${bizUrl}"><h5 style="font-weight: bold;" >${name}</h5></a>
                            <a href="${bizUrl}"><img src="assets/images/${rating2}"></a>
                            <h6 >${reviews} reviews</h6>
                            <h6 >${price}</h6>
                        </div>
                        <div class="col-md-4">
                            <h6 >${phone}</h6>
                            <div>
                                <h6 >${address.address1} ${address.address2}</h6>
                                <h6 >${address.city}, ${address.state}</h6>
                            </div>
                        </div>
                        <br>
                    </div>
                    <br>
                </div>
                <br>
            `);

            $("#yelpwidget").append(yelpReviewListing);


        });

    };



});

