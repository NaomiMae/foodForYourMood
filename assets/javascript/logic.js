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






    





});