$(document).ready(function() {
	console.log("loaded");
	console.log("loaded");
	loadTracker();
	
});

var loadTracker = function() {
	$.ajax({
		type : "GET",
		url : "rest/quizzes",
		dataType : "json",
	}).done(function(data, status) {
		console.log(data);
		displayTable(data);
	}).fail(function(xhr, status, error) {
		console.log('It blew up');
		console.log(error);
	});
};