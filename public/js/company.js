// Get references to page elements
var $companyName = $("#companyName");
var $companyFirstName = $("#companyFirstName");
var $companyLastName = $("#companyLastName");
var $companyEmail = $("#companyEmail");
var $companyPassword = $("#companyPassword");
var $companyService = $("#companyService");

var $submitBtn = $("#submit");

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function(newCompany) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/companies",
      data: JSON.stringify(newCompany)
    });
  },
  getUser: function() {
    return $.ajax({
      url: "api/companies",
      type: "GET"
    });
  },
  deleteUser: function(id) {
    return $.ajax({
      url: "api/companies/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new User
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("anything");
  var newCompany = {
    companyName: $companyName.val().trim(),
    companyService: $companyService.val().trim(),
    companyFirstName: $companyFirstName.val().trim(),
    companyLastName: $companyLastName.val().trim(),
    companyEmail: $companyEmail.val().trim(),
    companyPassword: $companyPassword.val().trim()
  };
  console.log(companyService);

  if (
    !(
      newCompany.companyName ||
      newCompany.companyService ||
      newCompany.companyFirstName ||
      newCompany.companyLastName ||
      newCompany.companyEmail ||
      newCompany.companyPassword
    )
  ) {
    alert("You must enter fill out all fields before submitting.");
    return;
  }

  API.saveUser(newCompany).then(function() {
    refreshUsers();
  });

  window.location.replace("/companylogin");
};

//Log in request
$("#logsubmit").on("click", function(event) {
  alert("Hello!");
  event.preventDefault();
  console.log(5);

  var companyLogin = {
    companyEmail: $("#companyEmail")
      .val()
      .trim(),
    companyPassword: $("#companyPassword").val()
  };
  $.ajax("/api/companylogin", {
    type: "POST",
    data: companyLogin
  }).then(function(companydata) {
    // console.log(window.location);
    console.log(companydata);

    //Move browser to new window after logging in.
    window.location.replace("/companyprofile/" + companydata.id);
  });
});
//DYNAMICALLY ADD USER DATA TO PROFILE.HANDLEBARS
// var id = 4;
// $.get("/api/users/" + id, function(data) {
//   console.log(data);
//   var profileSection = $("<div>");
//   profileSection.addClass("well");
//   profileSection.attr("id", "user-well-");
//   $(".name").append(profileSection);

//   $("#user-well-").append(
//     "<h2 class='nameplate'>" + data.firstName + " " + data.lastName + "<h2>"
//   );

//   $("#user-well-").append(
//     "<h5>Vehicle Type" + ": " + data.vehicleType + "<h5>"
//   );
//   $("#user-well-").append(
//     "<h5>Vehicle Make" + ": " + data.vehicleMake + "<h5>"
//   );
//   $("#user-well-").append(
//     "<h5>Vehicle Model" + ": " + data.vehicleModel + "<h5>"
//   );
//   $("#user-well-").append(
//     "<h5>Vehicle Year" + ": " + data.vehicleYear + "<h5>"
//   );
// });

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteUser(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
