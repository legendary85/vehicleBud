$(document).ready(function() {
  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postServiceSelect = $("#service");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleRequestDelete);
  $(document).on("click", "button.edit", handleRequestEdit);
  postServiceSelect.on("change", handleServiceChange);
  var requests;

  // This function grabs posts from the database and updates the view
  function getRequest(service) {
    var serviceString = service || "";
    if (serviceString) {
      serviceString = "/service/" + serviceString;
    }
    $.get("/api/requests" + serviceString, function(data) {
      console.log("Requests", data);
      requests = data;
      if (!requests || !requests.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/requests/" + id
    }).then(function() {
      getRequest(postServiceSelect.val());
    });
  }

  // Getting the initial list of posts
  getRequest();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    blogContainer.empty();
    var requestsToAdd = [];
    for (var i = 0; i < requests.length; i++) {
      requestsToAdd.push(createNewRow(requests[i]));
    }
    blogContainer.append(requestsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newRequestCard = $("<div>");
    newRequestCard.addClass("card");
    var newRequestCardHeading = $("<div>");
    newRequestCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    // var newRequestTitle = $("<h2>");
    var newRequestDate = $("<small>");
    var newRequestService = $("<h5>");
    newRequestService.text(request.service);
    newRequestService.css({
      float: "right",
      "font-weight": "700",
      "margin-top": "-15px"
    });
    var newRequestCardBody = $("<div>");
    newPostRequestBody.addClass("card-body");
    var newRequestBody = $("<p>");
    newRequestTitle.text(post.title + " ");
    newRequestBody.text(post.body);
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newRequestDate.text(formattedDate);
    newRequestTitle.append(newRequestDate);
    newRequestCardHeading.append(deleteBtn);
    newRequestCardHeading.append(editBtn);
    newRequestCardHeading.append(newRequestTitle);
    newRequestCardHeading.append(newRequestCategory);
    newRequestCardBody.append(newRequestBody);
    newRequestCard.append(newRequestCardHeading);
    newRequestCard.append(newRequestCardBody);
    newRequestCard.data("request", request);
    return newRequestCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handleRequestDelete() {
    var currentRequest = $(this)
      .parent()
      .parent()
      .data("request");
    deletePost(currentRequest.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handleRequestEdit() {
    var currentRequest = $(this)
      .parent()
      .parent()
      .data("request");
    window.location.href = "/cms?request_id=" + currentRequest.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new post."
    );
    blogContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleServiceChange() {
    var newRequestService = $(this).val();
    getRequest(newRequestService);
  }
});
