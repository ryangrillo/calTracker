$(document).ready(function() {
	console.log("loaded");
	startUp();

});

var startUp = function() {
	var myReq = $.ajax({
		type : "GET",
		url : "rest/trackers",
		dataType : "json"
	});
	myReq.done(function(data, status) {
		buildList(data);
	});
	myReq.fail(function(xhr, status, error) {
		console.log('It blew up again');
		console.log(error);
	});
}
var buildList = function(data) {
	var table = $('<table>');
	var thead = $('<thead>');
	var tr = $('<tr>');
	var th = $('<th>').text("Track your Calories");
	tr.append(th);
	thead.append(tr);
	table.append(thead);
	data.forEach(function(tracker, idx, array) {
		if (idx % 2) {
			var tr = $('<tr>').css("background-color", "#ff9999");
		} else {
			var tr = $('<tr>')
		}
		var tbody = $('<tbody>');
		var td = $('<td>');
		var input = $('<button>');
		input.addClass('button');
		input.attr('id', tracker.id);
		input.text('Description');
		input.on('click', function() {
			var myReq = $.ajax({
				type : "GET",
				url : "rest/trackers/" + $(this).attr('id'),
				dataType : "json"
			});
			myReq.done(function(data, status) {
				console.log(data);
				console.log(status);
				$("#table").empty();
				buildDesc(data);
			});
			myReq.fail(function(xhr, status, error) {
				console.log('It blew up again');
				console.log(error);
			});
		})
		var deleteItem = $('<button>');
		deleteItem.addClass('button');
		deleteItem.attr('id', tracker.id);
		deleteItem.text('Delete Item');
		deleteItem.on('click', function() {
			var myReq = $.ajax({
				type : "DELETE",
				url : "rest/trackers/" + $(this).attr('id'),
			});
			myReq.done(function(data, status) {
				console.log(data);
				console.log(status);
				$("#content").empty();
				var tablediv = $("<div>");
				tablediv.attr('id', 'table');
				$("#content").append(tablediv);
				startUp();
			});
			myReq.fail(function(xhr, status, error) {
				console.log('It blew up again');
				console.log(error);
			});
		})
		td.text(tracker.id + ". " + tracker.foodItem + " " +  tracker.calories);
		tr.append(td);
		tr.append(input);
		tr.append(deleteItem);
		tbody.append(tr);
		table.append(tbody);
	})
	$('#table').append(table);
	var createTracker = $("<h3>");
	createTracker.text("Add food and Calories");
	$("#table").append(createTracker);
	var foodName = $("<input/>").attr({
		type : "text",
		id : "foodItem",
		placeholder : "name"
	}).appendTo("#table");
	var calories = $("<input/>").attr({
		type : "text",
		id : "calories",
		placeholder : "calories"
	}).appendTo("#table");
	var createTrackerButton = $('<button>');
	createTrackerButton.addClass('button').text("Add Food Item").appendTo(
			"#table");
	createTrackerButton.on('click', function() {
		var trackerObj = {
			foodItem : $("#foodItem").val(),
			calories : $("#calories").val(),
		};
		console.log(trackerObj);
		var myPost = $.ajax({
			type : "POST",
			url : "rest/trackers",
			dataType : "json",
			contentType : 'application/json',
			data : JSON.stringify(trackerObj)
		});
		myPost.done(function(data, status) {
			console.log(data);
			console.log(status);
			// start(buildList); //check and fix?
			// $("#content").empty();
			$("body").empty();
			buildDesc(data);
		});
		myPost.fail(function(xhr, status, error) {
			console.log('It blew up again');
			console.log(error);
		});
		$("#table").append(createTrackerButton);
	})
}
var buildDesc = function(tracker) {
	$("#content").empty();
	$("body").css('background-image',
			'url(http://wallpapercave.com/wp/d4emJ2t.jpg)');
	$("body").css('background-size', '100%');
	$("body").css('background-repeat', 'no-repeat');
	var img = $('<img>');
	var h1 = $('<h1>');
	var ul = $('<ul>');
	var li2 = $('<li>');
	var li3 = $('<li>');
	var li4 = $('<li>');
	var li5 = $("<li>");
	var li = $('<li>');
	h1.text(tracker.foodItem);
	$('body').append(h1);
	li2.text(tracker.calories + " calories");
	ul.append(li2);
	$('body').append(ul);
	var backbutton = $('<button>');
	backbutton.addClass('backbutton');
	backbutton.text('Return to home');
	backbutton.on('click', function() {
		startUp();
		console.log("back button clicked");
		$("#content").empty();
//		$("body").css('background-image',
//				'url(http://wallpapercave.com/wp/k4eop3o.jpg)');
//		$("body").css('background-position', 'center');
//		$("body").css('background-attachment', 'fixed');
//		$("body").css('background-size', 'cover');
		var tablediv = $("<div>");
		tablediv.attr('id', 'table');
		$("#content").append(tablediv);
	});
	$("body").append(backbutton);
}
