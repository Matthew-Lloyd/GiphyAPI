var topics = ["serious", "excited", "angry", "sad", "annoyed", "scared"]

var btnGen = function() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var gifBtn = $("<button>");
        gifBtn.addClass("gifButton Btn");
        gifBtn.attr("data-reaction", topics[i]);
        gifBtn.text(topics[i]);
        gifBtn.val(topics[i]);
        $("#buttons").append(gifBtn);
    }
};


$("#add-gif").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var gif = $("#gif-input").val().trim();
    // The movie from the textbox is then added to our array
    topics.push(gif);

    btnGen();
    $("#gif-input").val("");
});

// var gifGen = function() {
    
// }
$("#buttons").on("click", ".gifButton", function() {
    event.preventDefault();
    var gifSearch = $(this).val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
        url: queryURL,
        method: 'GET'
        }).done(function(response) {
            console.log(response)
            $("#gifdisp").empty();
            var emoDiv = $("<div class='rating'>");
            for (var i = 0; i < 10; i++) {                
                // var gifStills =  response.data[i].images.fixed_height_still.url;
                // var image = $("<img>");
                // var still = response.data[i].images.fixed_height_still.url;
                // var animate = response.data[i].images.fixed_height.url;
                
                // image.addClass("gif")                
                // image.attr("data-gif_s", still)                
                // image.attr("data-gif", animate)                
                // image.attr("datastate", "still")                
                // image.attr("src", still)                
                // $("#gifdisp").append(image);

                var emoData = response.data[i];

                // Retrieving the URL for the still image
                var imgURL = emoData.images.fixed_height_still.url;
                console.log(imgURL);

                var dataStill = emoData.images.fixed_height_still.url;
                var dataAnimate = emoData.images.fixed_height.url;

                // Creating an element to hold the still image
                var image = $("<img>").attr({ src: dataStill, still: dataStill, animate: dataAnimate, datastate: 'still', class: "gif" });
                // console.log(image);
                var rated = emoData.rating;

                // Creating an element to have the rating displayed above the image (makes floating things easier)
                var pOne = $("<p>").text("Rating: " + rated).append("<br>").append(image);

                // Displaying the rating
                emoDiv.append(pOne);

                // Putting the emotion gifs above the previous emotions
                $("#gifdisp").prepend(emoDiv);
            };
        });
});

$(".gif").on("click", function () {

    var state = $(this).attr("datastate");

    if (state === 'still') {
        $(this).attr("src", $(this).attr('animate'));
        $(this).attr("datastate", 'animate');
    }

    if (state === 'animate') {
        $(this).attr("src", $(this).attr('still'));
        $(this).attr("datastate", 'still');
    }

});
// $("#buttons").on("click", function(event) {
// gifGen();
// });
btnGen();