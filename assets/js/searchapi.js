// SETUP VARIABLES
// ==========================================================

// This variable will be pre-programmed with our authentication key
// (the one we received when we registered)
// var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

var authKey = "7ad92bbe7f484d08a837b3e1e6a346a0";

// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
var numResults = 0;




// queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
// the user hits the search button
var queryURLBase = "http://api.giphy.com/v1/gifs/search?" +
	"&api_key=" +
	authKey;


console.log("This is the value of queryURLBase: " + queryURLBase);

// Counter to keep track of images numbers as they come in
var imageCounter = 0;

// FUNCTIONS
// ==========================================================

// This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)
function runQuery(numResults, queryURL) {

  // The AJAX function uses the queryURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "NYTData"

  console.log("I am coming into the runQuery function now");
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
	var results = response.data;

    // Logging the URL so we have access to it for troubleshooting
    console.log("------------------------------------");
    console.log("URL: " + queryURL);
    console.log("------------------------------------");

    // Log the results to console, where it will show up as an object
    console.log(results);
    console.log("------------------------------------");

    // Loop through and provide the correct number of images
	numPasses = 0;
          for (var i = 0; i < numResults; i++) {
			  numPasses++;
			if (numPasses = 1 ) {
            // Creating and storing a button tag
				renderButtons(numResults);
			}
//            var searchTopicBtn = $("<button>");
//			$("button").attr("type", "submit");
//			$("button").attr("id", "display-" + searchTerm);
//			$("button").attr("class", "btn btn-default");
//			$("button").append("<span>" + searchTerm + "</span>");

//			<button type="submit" class="btn btn-default" id="run-search"><i class="fa fa-search"></i> Search</button>
			
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var topicImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            topicImage.attr("src", results[i].images.fixed_height.url);

            // Adding attributes to the buttons and image tag 
//			var searchImages = "";
//			searchImages.append(p);
			topicImage.prepend(p);


			
//			console.log("This is the value of searchTopicBtn: " + searchTopicBtn);

            // Prependng the searchTopicBtn to the HTML page in the "#gifs-appear-here" button
   //         $("#gifs-buttons-appear-here").append(searchTopicBtn);			
            $("#gifs-appear-here").append(topicImage);
          }


	// Loop through and provide the correct number of images
 
  // Function for displaying search data
  function renderButtons() {

	// Deleting the buttons prior to adding new movies
	// (this is necessary otherwise you will have repeat buttons)
//	$("#gifs-buttons-appear-here").empty();

	// Looping through the array of gifs
	for (var i = 0; i < numResults; i++) {

	  // Then dynamicaly generating buttons for each search topic in the array
	  // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
	  var a = $("<button>");
	  // Adding a class of movie to our button
	  a.addClass("btn btn-default");
	  // Adding a data-attribute
	  a.attr("data-name", results[i]);
	  // Providing the initial button text
	  a.text(searchTerm);
	  // Adding the button to the buttons-view div
	  $("#gifs-buttons-appear-here").append(a);
	}
  }

});
}



// METHODS
// ==========================================================

// on.("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks).
  
    console.log("I am in the run-search onclick function 1 now");
	
  event.preventDefault();

  // Initially sets the imageCounter to 0
  imageCounter = 0;

  // Empties the region associated with the articles
  $("gifs-appear-here").empty();
  
  console.log("I am in the run-search onclick function 2 now");

  // Grabbing text the user typed into the search input
  searchTerm = $("#search-term").val().trim();
  var queryURL = queryURLBase + 
				"&q=" + 
				searchTerm;


  // Number of results the user would like displayed
  numResults = $("#num-records-select").val();

	queryURL = queryURL + 
				"&limit=" +
				numResults;

  // Then we will pass the final queryURL and the number of results to
  // include to the runQuery function
    console.log("I am in the run-search onclick function 3 now");
  runQuery(numResults, queryURL);
});

// This button clears the top articles section
$("#clear-all").on("click", function() {
  imageCounter = 0;
  $("gifs-appear-here").empty();
});

