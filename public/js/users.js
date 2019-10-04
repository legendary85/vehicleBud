// Get references to page elements
var $userFirstName = $("#firstName");
var $userLastName = $("#lastName");
var $userEmail = $("#userEmail");
var $userPassword = $("#userPassword");
var $userVehicleType = $("#vehicleType");
var $userVehicleMake = $("#vehicleMake");
var $userVehicleModel = $("#vehicleModel");
var $userVehicleYear = $("#vehicleYear");
var $submitBtn = $("#submit");

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function (newUser) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(newUser)
    });
  },
  getUser: function () {
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  deleteUser: function (id) {
    return $.ajax({
      url: "api/users/" + id,
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
var handleFormSubmit = function (event) {
  event.preventDefault();
  console.log("anything");
  var newUser = {
    firstName: $userFirstName.val().trim(),
    lastName: $userLastName.val().trim(),
    userEmail: $userEmail.val().trim(),
    vehicleType: $userVehicleType.val().trim(),
    vehicleMake: $userVehicleMake.val().trim(),
    vehicleModel: $userVehicleModel.val().trim(),
    vehicleYear: $userVehicleYear.val().trim(),
    userPassword: $userPassword.val()
  };

  if (
    !(
      newUser.firstName ||
      newUser.lastName ||
      newUser.userEmail ||
      newUser.vehicleType ||
      newUser.vehicleMake ||
      newUser.vehicleModel ||
      newUser.vehicleYear ||
      newUser.userPassword
    )
  ) {
    alert("You must enter fill out all fields before submitting.");
    return;
  }

  API.saveUser(newUser).then(function () {
    refreshUsers();
  });

  window.location.replace("/");
};

//Log in request
$("#logsubmit").on("click", function (event) {
  var $loginMessage = $('#login-message');
  $loginMessage.hide();
  event.preventDefault();
  console.log(5);

  var userLogin = {
    userEmail: $("#userEmail")
      .val()
      .trim(),
    userPassword: $("#userPassword").val()
  };
  $.ajax("/api/login", {
    type: "POST",
    data: userLogin
  })
    .then(function (userdata) {
      // console.log(userdata);
      if (userdata.status === 'error') {
        $loginMessage.text(userdata.message).show();
      } else {
        localStorage.setItem("login", userdata.id);
        //Move browser to new window after logging in.
        window.location.replace("/profile/" + userdata.id);
      }

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
