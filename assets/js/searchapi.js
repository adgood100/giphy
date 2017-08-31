// SETUP VARIABLES
// ==========================================================

// This variable will be pre-programmed with our authentication key
// (the one we received when we registered)
// var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

var searchTermArray = [];
var searchNumRecords = [];
var searchURLArray = [];


var authKey = "7ad92bbe7f484d08a837b3e1e6a346a0";

// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
var numResults = 0;
var	numPasses = 0;
var searchword = "";
var searchnum = 0;




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

          for (var i = 0; i < numResults; i++) {
			  numPasses++;
			  console.log("This is the value of numPasses: " + numPasses);
			
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

            // Prependng the searchTopicBtn to the HTML page in the "#gifs-appear-here" button
   //         $("#gifs-buttons-appear-here").append(searchTopicBtn);			
            $("#gifs-appear-here").append(topicImage);

			}


	// Loop through and provide the correct number of images
 
  // Function for displaying search data


});
}

  function renderButtons() {

	for (var i = 0; i < searchTermArray.length; i++) {
		// Then dynamicaly generating buttons for each search topic in the array
		// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
		var a = $("<button>");
		var searchword = searchTermArray[i];
		var searchnum = searchNumRecords[i];
		// Adding a class of btn btn-default to our button
		a.addClass("btn btn-default");
		// Adding a data-attribute
		a.attr("data-numget", searchNumRecords[i]);
		a.attr("data-searchget", searchTermArray[i]);
//		a.attr("id", "display-" + searchTermArray[i].replace(" ", "-"));
		a.attr("id", "display-gif");
		a.attr("onclick", "displaygif()");
		// Providing the initial button text
		a.text(searchTermArray[i]);
		// Adding the button to the buttons-view div
		$("#gifs-buttons-appear-here").append(a);
		numPasses++;
	}
//	} ---

//	} ---
  }


// METHODS
// ==========================================================

// This function handles events where one button is clicked
$("#add-button").on("click", function(event) {
	event.preventDefault();

// This line grabs the input from the textbox
	var searchTermsItem = $("#search-term").val().trim();
	var searchNumItem = $("#num-records-select").val().trim();

// The search keyword/number of images from the textbox is then added to our array
	searchTermArray.push(searchTermsItem);
	searchNumRecords.push(searchNumItem);
// Calling buildURLArray which handles the processing of our building URL array
	buildURLArray(searchTermsItem, searchNumItem);
// Calling renderButtons which handles the processing of our buttons array
	renderButtons();
});

function buildURLArray(term, num) {
		searchTerm = term;
		numResults = num;
		var queryURL = queryURLBase + 
			"&q=" + 
			searchTerm +
			"&limit=" +
			numResults;
		console.log("This is the value of queryURL: " + queryURL);
		searchURLArray.push(queryURL);
	
}



// on.("click") function associated with the Search Button
function displaygif(searchget, numget) {
//$(".display-gif").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks).
  
    console.log("I am in the display-gif onclick function 1 now");
	
  event.preventDefault();

  // Initially sets the imageCounter to 0
  imageCounter = 0;

  // Empties the region associated with the articles
  $("gifs-appear-here").empty();
  
  console.log("I am in the run-search onclick function 2 now");
	
	var searchType = document.getElementById('display-gif').getAttribute('data-searchget');
	var searchNum = document.getElementById('display-gif').getAttribute('data-numget');
	
	console.log("This is the value of searchType: " + searchType);
	console.log("This is the value of searchNum: " + searchNum);
	
  // Grabbing text the user typed into the search input
	for (i = 0; i < searchTermArray.length; i++) {
		
		if (searchType === searchTermArray[i]) {
			var queryURL = searchURLArray[i];
			var numResults = searchNumRecords[i];

		}
		
	}

	console.log("This is the value of queryURL: " + queryURL);
	console.log("This is the value of numResults: " + numResults);

	runQuery(numResults, queryURL);
//  renderButtons();
}

// This button clears the top articles section
$("#clear-all").on("click", function() {
  imageCounter = 0;
  numPasses = 0;
  $("gifs-appear-here").empty();
  $("#gifs-buttons-appear-here").empty();
});

