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
	var h1Total = $('<h1>');
	var table = $('<table>');
	var thead = $('<thead>');
	var tr = $('<tr>');
	var th = $('<th>').text("Track your Calories");
	tr.append(th);
	thead.append(tr);
	table.append(thead);
	var total = 0;
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
		input.text('edit');
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
		
		total += tracker.calories;
		console.log("lenght:  " + tracker.size);
		console.log("tracker.calories: " + tracker.calories);
		console.log("total:  " + total);
		h1Total.text("total Calories: " + total);
		tr.append(td);
		tr.append(input);
		tr.append(deleteItem);
		tbody.append(tr);
		table.append(tbody);
	})
	$('#table').append(table);
	$('#table').append(h1Total);
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
	backbutton.text('submit changes');
	backbutton.on('click', function() {
		$.ajax({
		    type: "PUT",
		    url: "rest/trackers/" + $(this).attr('id'),             //indicates updating quiz with id=1
		    dataType: "json",
		    contentType: 'application/json',  //setting the request headers content-type
		    data: JSON.stringify(trackerObj)        //the data being added to the request body
		});
		startUp();
		console.log("back button clicked");
		$("#content").empty();

		var tablediv = $("<div>");
		tablediv.attr('id', 'table');
		$("#content").append(tablediv);
	});
	$("body").append(backbutton);
}
