// Get references to page elements
var actName = $("#actName");
var category = $("#Category");
var Description = $("#actDescription");
var submitBtn = $("#choose");
var exampleList = $("#example-list");
var lazyBtn = $("#lazy");
var brainBtn = $("#brain");
var energizeBtn = $("#energize");
// The API object contains methods for each kind of request we'll make
var API = {
    saveActivity: function (activity) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/activities",
            data: JSON.stringify(activity)
        });
    },
    getActivity: function () {
        return $.ajax({
            url: "api/activities",
            type: "GET"
        });
    },
    deleteActivity: function (id) {
        return $.ajax({
            url: "api/activities/:" + id,
            type: "DELETE" 
        });
    }
};
// refreshExamples gets new examples from the db and repopulates the list
var refreshActivity = function () {
    API.getActivity().then(function (data) {
        var activity = data.map(function (activity) {
            var a = $("<a>")
                .text(activity.category)
                .attr("href", "/activity/" + activity.id);
            var li = $("<li>")
                .attr({
                    class: "list-group-item",
                    "data-id": activity.id
                })
                .append(a);
            var button = $("<button>")
                .addClass("btn btn-danger float-right delete")
                .text("ｘ");
            li.append(button);
            return li;
        });
        exampleList.empty();
        exampleList.append(activity);
    });
};
// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
    event.preventDefault();
    var activity = {
        act_name: actName.val().trim(),
        category: category.val().trim(),
        description: Description.val().trim(),

    };
    if (!(activity.category && activity.description)) {
        alert("You must enter an activity category and description!");
        return;
    }
    API.saveActivity(activity).then(function () {
        refreshActivity();
    });
    category.val("");
    Description.val("");
};
// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
        .parent()
        .attr("data-id");
    API.deleteActivity(idToDelete).then(function () {
        refreshActivity();
    });
};
// Add event listeners to the submit and delete buttons
submitBtn.on("click", handleFormSubmit);
exampleList.on("click", ".delete", handleDeleteBtnClick);
lazyBtn.on("click", refreshActivity);
brainBtn.on("click", refreshActivity);
energizeBtn.on("click", refreshActivity);